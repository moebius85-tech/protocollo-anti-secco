import { NextResponse } from "next/server";

// Proxy server-side verso Open Food Facts.
// Perché serve: da browser non si può impostare l'header User-Agent (bloccato per
// sicurezza), ma OFF lo richiede esplicitamente per le chiamate pubbliche — senza,
// le richieste vengono penalizzate/rallentate in modo incostante, causando il
// comportamento "a volte funziona, a volte no" del mazzo integratori.

const USER_AGENT = "OmniCoach/1.0 (protocollo-anti-secco.vercel.app)";
const TIMEOUT_MS = 6000;

async function fetchConTimeout(url: string, tentativi = 2): Promise<Response> {
  let ultimoErrore: unknown = null;

  for (let i = 0; i < tentativi; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) return res;
      ultimoErrore = new Error(`OFF ha risposto ${res.status}`);
    } catch (err) {
      clearTimeout(timeoutId);
      ultimoErrore = err;
    }
    // breve attesa prima del secondo tentativo
    if (i < tentativi - 1) await new Promise((r) => setTimeout(r, 400));
  }

  throw ultimoErrore;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const termine = searchParams.get("q");

  if (!termine) {
    return NextResponse.json({ products: [] }, { status: 400 });
  }

  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
    termine
  )}&search_simple=1&action=process&json=1&page_size=10&fields=code,product_name,brands,image_front_url,image_url,image_small_url,nutriments`;

  try {
    const res = await fetchConTimeout(url);
    const data = await res.json();
    return NextResponse.json({ products: data.products || [] });
  } catch (err) {
    console.error("Errore proxy Open Food Facts:", err);
    // Non è un errore bloccante per l'utente: il chiamante ha comunque un fallback.
    return NextResponse.json({ products: [] }, { status: 200 });
  }
}
