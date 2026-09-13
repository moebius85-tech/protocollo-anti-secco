@import "tailwindcss";
 
:root {
  --background: #ffffff;
  --foreground: #171717;
}
 
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
 
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
 
body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
 
/* =========================================================================
   SISTEMA TEMI: chiaro (default) / scuro / neon
   Riusiamo la STESSA struttura neumorfica (doppia ombra chiara+scura) già
   presente in tutta l'app: cambiano solo i VALORI dei colori, non la logica
   né la struttura del componente. Per il tema "neon" la "luce" diventa un
   bagliore ciano/viola invece di un riflesso bianco: lo stesso identico
   meccanismo di ombre produce un effetto "glow" invece che "soft UI".
   ========================================================================= */
 
:root,
[data-theme="chiaro"] {
  --superficie: #E0E5EC;
  --superficie-alt: #e4ebf5;
  --ombra-scura: #a3b1c6;
  --ombra-scura-alt: #c3d0e0;
  --ombra-chiara: #ffffff;
 
  --testo-forte: #334155;
  --testo-medio: #475569;
  --testo-debole: #64748b;
  --testo-tenue: #94a3b8;
 
  --bordo-tenue: rgba(100, 116, 139, 0.25);
 
  /* "Velo" semi-trasparente per gli effetti vetro sopra le card (alimenti/workout) */
  --velo-20: rgba(255, 255, 255, 0.2);
  --velo-30: rgba(255, 255, 255, 0.3);
  --velo-40: rgba(255, 255, 255, 0.4);
  --velo-50: rgba(255, 255, 255, 0.5);
  --velo-60: rgba(255, 255, 255, 0.6);
 
  /* Colore "firma" dell'app: verde lime -> smeraldo, invariato nel tema chiaro */
  --accento-1: #a3e635;
  --accento-2: #10b981;
  --accento-glow: rgba(16, 185, 129, 0.35);
}
 
[data-theme="scuro"] {
  --superficie: #2a2f3a;
  --superficie-alt: #232730;
  --ombra-scura: #1c1f27;
  --ombra-scura-alt: #17191f;
  --ombra-chiara: #363c48;
 
  --testo-forte: #e2e8f0;
  --testo-medio: #cbd5e1;
  --testo-debole: #94a3b8;
  --testo-tenue: #64748b;
 
  --bordo-tenue: rgba(148, 163, 184, 0.15);
 
  --velo-20: rgba(255, 255, 255, 0.03);
  --velo-30: rgba(255, 255, 255, 0.04);
  --velo-40: rgba(255, 255, 255, 0.06);
  --velo-50: rgba(255, 255, 255, 0.08);
  --velo-60: rgba(255, 255, 255, 0.1);
 
  /* Colore "firma" del tema scuro: indaco -> viola, al posto del verde lime */
  --accento-1: #818cf8;
  --accento-2: #c084fc;
  --accento-glow: rgba(129, 140, 248, 0.35);
}
 
[data-theme="neon"] {
  --superficie: #141824;
  --superficie-alt: #10131c;
  --ombra-scura: rgba(0, 0, 0, 0.6);
  --ombra-scura-alt: rgba(0, 0, 0, 0.65);
  --ombra-chiara: rgba(56, 189, 248, 0.35);
 
  --testo-forte: #f0f9ff;
  --testo-medio: #bae6fd;
  --testo-debole: #7dd3fc;
  --testo-tenue: #38bdf8;
 
  --bordo-tenue: rgba(56, 189, 248, 0.25);
 
  --velo-20: rgba(56, 189, 248, 0.04);
  --velo-30: rgba(56, 189, 248, 0.06);
  --velo-40: rgba(56, 189, 248, 0.08);
  --velo-50: rgba(56, 189, 248, 0.11);
  --velo-60: rgba(56, 189, 248, 0.14);
 
  /* Colore "firma" del tema neon: ciano -> magenta, coerente col riferimento "liquid glass" */
  --accento-1: #22d3ee;
  --accento-2: #e879f9;
  --accento-glow: rgba(34, 211, 238, 0.45);
}
 
/* Il body segue il tema: fondamentale per scuro/neon, dove lo sfondo non è
   più il chiaro di default. */
[data-theme="scuro"] body,
[data-theme="neon"] body {
  background: var(--superficie);
}
 
/* Override delle classi Tailwind "text-slate-*" / "border-slate-*" più usate
   nell'app: permette al testo di restare leggibile sui temi scuro/neon senza
   dover riscrivere ogni singola classNam nel codice esistente. */
[data-theme="scuro"] .text-slate-700,
[data-theme="scuro"] .text-slate-800,
[data-theme="neon"] .text-slate-700,
[data-theme="neon"] .text-slate-800 {
  color: var(--testo-forte) !important;
}
 
[data-theme="scuro"] .text-slate-600,
[data-theme="neon"] .text-slate-600 {
  color: var(--testo-medio) !important;
}
 
[data-theme="scuro"] .text-slate-500,
[data-theme="neon"] .text-slate-500 {
  color: var(--testo-debole) !important;
}
 
[data-theme="scuro"] .text-slate-400,
[data-theme="scuro"] .text-slate-300,
[data-theme="neon"] .text-slate-400,
[data-theme="neon"] .text-slate-300 {
  color: var(--testo-tenue) !important;
}
 
[data-theme="scuro"] .border-slate-200,
[data-theme="scuro"] .border-slate-300,
[data-theme="neon"] .border-slate-200,
[data-theme="neon"] .border-slate-300 {
  border-color: var(--bordo-tenue) !important;
}
 
/* Nel tema neon, un leggero bagliore diffuso in più sulle card principali,
   oltre alla doppia ombra colorata: rifinisce l'effetto "vetro luminoso"
   senza toccare la struttura dei componenti. */
[data-theme="neon"] .anim-pop {
  filter: drop-shadow(0 0 18px rgba(56, 189, 248, 0.12));
}
 
/* =========================================================================
   COLORE "FIRMA": nei temi scuro/neon il verde lime/smeraldo dell'app viene
   sostituito dal colore d'accento del tema (vedi variabili --accento-1/2
   sopra), sia per i solidi che per i gradienti, senza dover riscrivere ogni
   singolo bottone/badge nel codice.
   ========================================================================= */
 
/* Gradiente principale: aggiunta la classe "accento-grad" accanto alle
   classi Tailwind esistenti (bg-gradient-to-r/br from-lime-400 to-emerald-500)
   ovunque compaiano — il gradiente resta identico nel tema chiaro, cambia
   colore negli altri due. */
[data-theme="scuro"] .accento-grad,
[data-theme="neon"] .accento-grad {
  background-image: linear-gradient(to right, var(--accento-1), var(--accento-2)) !important;
}
 
/* Testi, sfondi, bordi e anelli solidi in verde lime/smeraldo */
[data-theme="scuro"] .text-lime-500,
[data-theme="scuro"] .text-lime-600,
[data-theme="neon"] .text-lime-500,
[data-theme="neon"] .text-lime-600 {
  color: var(--accento-1) !important;
}
 
[data-theme="scuro"] .bg-lime-400,
[data-theme="scuro"] .bg-lime-500,
[data-theme="scuro"] .bg-emerald-500,
[data-theme="neon"] .bg-lime-400,
[data-theme="neon"] .bg-lime-500,
[data-theme="neon"] .bg-emerald-500 {
  background-color: var(--accento-1) !important;
}
 
[data-theme="scuro"] .border-lime-400,
[data-theme="neon"] .border-lime-400 {
  border-color: var(--accento-1) !important;
}
 
[data-theme="scuro"] .ring-lime-400,
[data-theme="scuro"] .ring-lime-500,
[data-theme="neon"] .ring-lime-400,
[data-theme="neon"] .ring-lime-500 {
  --tw-ring-color: var(--accento-1) !important;
}
 
[data-theme="scuro"] .hover\:text-emerald-500:hover,
[data-theme="neon"] .hover\:text-emerald-500:hover {
  color: var(--accento-1) !important;
}
 
[data-theme="scuro"] .focus\:ring-emerald-400\/40:focus,
[data-theme="neon"] .focus\:ring-emerald-400\/40:focus {
  --tw-ring-color: var(--accento-glow) !important;
}
