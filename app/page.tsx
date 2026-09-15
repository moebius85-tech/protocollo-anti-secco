"use client";
import { useState, useEffect, useRef } from 'react';

/* ------------------------------------------------------------------
   I TRACCIATI SCHELETRICI MATEMATICI (Pure Line-Art)
   Niente poligoni chiusi, solo curve di Bezier (Q) e linee (L) pure.
   ------------------------------------------------------------------ */
type Tratto = { nome: string; durata: number; pausa: number; d: string };

const TRATTI: Tratto[] = [
  { 
    nome: "bilanciere", 
    durata: 1000, 
    pausa: 150, 
    d: "M 35 60 L 165 60 M 55 42 L 55 78 M 43 50 L 43 70 M 145 42 L 145 78 M 157 50 L 157 70" 
  },
  { 
    nome: "testa_braccio_posteriore", 
    durata: 800, 
    pausa: 50, 
    d: "M 100 24 A 7 7 0 1 1 99.9 24 M 75 60 Q 60 85 88 88" 
  },
  { 
    nome: "corpo_arti_anteriori", 
    durata: 1200, 
    pausa: 150, 
    d: "M 100 60 Q 85 95 45 120 M 100 60 L 120 85 L 135 60 M 88 88 L 115 135" 
  },
  { 
    nome: "foglie", 
    durata: 1500, 
    pausa: 0, 
    // Una singola linea continua che disegna entrambe le foglie senza mai staccare la penna!
    d: "M 30 145 Q 100 205 170 145 Q 125 155 100 178 Q 75 155 30 145" 
  }
];

/* ------------------------------------------------------------------
   IL COMPONENTE (Mantenuta la tua fantastica logica React)
   ------------------------------------------------------------------ */
type Props = {
  attivo?: boolean;
  dimensione?: number;
  colore?: string;
  spessore?: number;
  velocita?: number;
  className?: string;
};

function LogoOmnifitLineArt({
  attivo = true,
  dimensione = 250,
  colore = "#84cc16",
  spessore = 5.5,
  velocita = 1,
  className = "",
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));

    // Setta le linee a zero (nascoste)
    paths.forEach((p) => {
      const L = p.getTotalLength();
      p.style.transition = "none";
      p.style.strokeDasharray = String(L);
      p.style.strokeDashoffset = String(L);
      p.getBoundingClientRect(); // forza l'applicazione immediata
    });

    if (!attivo) return;

    let t = 0;
    paths.forEach((p, i) => {
      const dur = TRATTI[i].durata * velocita;
      const gap = TRATTI[i].pausa * velocita;

      // Animazione fluida stile "penna"
      timers.current.push(
        setTimeout(() => {
          p.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(.45,.05,.3,1)`;
          p.style.strokeDashoffset = "0";
        }, t)
      );

      t += dur + gap;
    });

    return () => timers.current.forEach(clearTimeout);
  }, [attivo, velocita]);

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" width={dimensione} height={dimensione} className={className}>
      {TRATTI.map((t) => (
        <path
          key={t.nome}
          d={t.d}
          fill="none"               // Niente riempimento! Solo linee vettoriali pure
          stroke={colore}
          strokeWidth={spessore}
          strokeLinecap="round"     // Crea le estremità arrotondate perfette
          strokeLinejoin="round"    // Arrotonda gli spigoli taglienti
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------
   PAGINA DI TEST PER VEDERE IL RISULTATO
   ------------------------------------------------------------------ */
export default function LaboratorioLineArt() {
  const [attivo, setAttivo] = useState(false);

  // Auto-play
  useEffect(() => {
    const timer = setTimeout(() => setAttivo(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const resetAnimation = () => {
    setAttivo(false);
    setTimeout(() => setAttivo(true), 100);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button 
           onClick={resetAnimation} 
           className="px-6 py-2 bg-lime-500 text-white font-bold tracking-wider rounded-lg hover:bg-lime-600 transition-all shadow-lg shadow-lime-500/30"
        >
           ↺ Ridisegna Line Art
        </button>
      </div>

      <div className="text-center mb-8 mt-16">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Sviluppo Tracciati Scheletrici</p>
      </div>

      <div className="relative flex items-center justify-center w-[400px] h-[400px] border-2 border-dashed border-slate-300 rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
         {/* Inseriamo il tuo componente ripulito */}
         <LogoOmnifitLineArt attivo={attivo} dimensione={250} />
      </div>

    </div>
  );
}
