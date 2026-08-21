import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, context, file } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: "Errore: API Key mancante sul server." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

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

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ reply: `Errore di Google: ${error.message}` }, { status: 500 });
  }
}
