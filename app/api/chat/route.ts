import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Se il primo modello è sovraccarico (503), si tenta con questi in ordine.
const MODEL_FALLBACK_CHAIN = ["gemini-3.6-flash", "gemini-2.5-flash", "gemini-2.0-flash"];
const MAX_RETRIES_PER_MODEL = 2;
const RETRY_BASE_DELAY_MS = 700;

function isOverloadedError(error: any) {
  const msg = String(error?.message || "");
  return error?.status === 503 || msg.includes("503") || msg.toLowerCase().includes("overloaded") || msg.toLowerCase().includes("high demand");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithRetryAndFallback(genAI: GoogleGenerativeAI, promptParts: any[]) {
  let lastError: any = null;

  for (const modelName of MODEL_FALLBACK_CHAIN) {
    const model = genAI.getGenerativeModel({ model: modelName });

    for (let attempt = 0; attempt < MAX_RETRIES_PER_MODEL; attempt++) {
      try {
        const result = await model.generateContent(promptParts);
        return await result.response;
      } catch (error: any) {
        lastError = error;

        // Errore non transitorio (es. chiave errata, contenuto bloccato): non ha senso ritentare/fallback.
        if (!isOverloadedError(error)) {
          throw error;
        }

        // Ultimo tentativo su questo modello: passiamo al successivo della catena.
        if (attempt < MAX_RETRIES_PER_MODEL - 1) {
          await sleep(RETRY_BASE_DELAY_MS * (attempt + 1));
        }
      }
    }
  }

  throw lastError;
}

export async function POST(req: Request) {
  try {
    const { message, context, file } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: "Errore: API Key mancante sul server." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Prepariamo la richiesta base
    const promptParts: any[] = [
      `Contesto utente:\n${context}\n\nDomanda: ${message}`
    ];

    // Se c'è un file allegato (Immagine o PDF), lo aggiungiamo al pacchetto
    if (file) {
      promptParts.push({
        inlineData: {
          data: file.data,
          mimeType: file.mimeType
        }
      });
    }

    const response = await generateWithRetryAndFallback(genAI, promptParts);
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error(error);

    const reply = isOverloadedError(error)
      ? "⚠️ Il Coach AI è momentaneamente sovraccarico (troppe richieste su Google in questo momento). Riprova tra qualche secondo."
      : `Errore di Google: ${error.message}`;

    return NextResponse.json({ reply }, { status: 503 });
  }
}
