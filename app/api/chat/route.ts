import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "Errore: Chiave API Gemini mancante nel server." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Sei il "Coach IA" ufficiale dell'app Protocollo Anti-Secco Pro.
      Rispondi in modo diretto, tecnico, motivante e conciso (massimo 3-4 frasi).
      Contesto attuale dell'atleta: ${context}

      Domanda dell'utente: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "Si è verificato un errore durante l'elaborazione con Gemini." }, { status: 500 });
  }
}