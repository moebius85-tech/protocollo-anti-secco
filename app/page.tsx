"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-4 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button onClick={() => setFase(0)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">Reset (Solo I)</button>
        <button onClick={() => setFase(1)} className="px-4 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">1. Scende A</button>
        <button onClick={() => setFase(2)} className="px-4 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all">2. Appare O (Oblò)</button>
        <button onClick={() => setFase(3)} className="px-4 py-2 bg-lime-600 text-white font-bold rounded-lg shadow-lg transition-all">3. Logo Interno</button>
      </div>

      <div className="text-center mb-12">
         <p className="text-slate-400 font-bold tracking-widest uppercase">Laboratorio Incastro Vettoriale</p>
         <p className="text-slate-500 text-sm mt-2">Test dei 3 Piani Visivi</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[400px] h-[400px] border-2 border-dashed border-slate-300 rounded-3xl overflow-hidden bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">
        
        {/* L'UNICO SVG: A, O e Logo condividono la stessa griglia */}
        <svg viewBox="0 0 200 200" className="w-[250px] h-[250px] overflow-visible">
            
            {/* PIANO DI FONDO: LA LETTERA "A" con sbarra */}
            <g className={`transition-all duration-1000 ease-out ${fase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-[-50px] opacity-0'}`}>
                {/* Tracciato matematico della A */}
                <path 
                    d="M 80 20 H 120 L 180 180 H 140 L 125 140 H 75 L 60 180 H 20 Z M 82 110 H 118 L 100 40 Z" 
                    fill="#334155" 
                />
            </g>

            {/* PIANO INTERMEDIO: L'OBLÒ "O" */}
            <g className={`transition-all duration-1000 ease-out ${fase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transformOrigin: '100px 125px' }}>
                
                {/* Il cerchio riempito con lo stesso colore dello sfondo della pagina! Buca visivamente la "A" */}
                <circle cx="100" cy="125" r="38" fill="#f1f5f9" />
                
                {/* L'anello verde della O. */}
                <circle cx="100" cy="125" r="38" fill="none" stroke="#84cc16" strokeWidth="18" strokeLinecap="square"
                    strokeDasharray="240"
                    strokeDashoffset={fase >= 2 ? 0 : 240}
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                />
            </g>

            {/* PIANO FRONTALE: IL LOGO (Omino e Foglie) */}
            <g 
               className={`transition-opacity duration-700 ease-in-out ${fase >= 3 ? 'opacity-100' : 'opacity-0'}`}
               stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round"
            >
                {/* Le foglie incastrate sulla curva */}
                <path d="M 100 152 C 70 152 65 138 65 130 C 80 130 92 142 100 152 Z" strokeWidth="3" />
                <path d="M 100 152 C 130 152 135 138 135 130 C 120 130 108 142 100 152 Z" strokeWidth="3" />
                
                {/* Il Bilanciere */}
                <line x1="72" y1="112" x2="128" y2="112" strokeWidth="3.5" />
                <line x1="76" y1="108" x2="76" y2="116" strokeWidth="3.5" />
                <line x1="124" y1="108" x2="124" y2="116" strokeWidth="3.5" />

                {/* La Testa dell'Omino */}
                <circle cx="112" cy="100" r="4" strokeWidth="3" />

                {/* Il Corpo e le Braccia */}
                <path d="M 94 112 Q 88 122 94 135" strokeWidth="3.5" />
                <path d="M 94 115 L 105 124 L 114 112" strokeWidth="3" />

                {/* Le Gambe (Affondo) */}
                <path d="M 94 135 L 85 125 L 75 135" strokeWidth="3" />
                <path d="M 94 135 L 105 145 L 110 145" strokeWidth="3" />
            </g>

            {/* FASE 1: LA LETTERA "I" IN ALTO */}
            <g className="transition-all duration-1000 ease-out" style={{ transformOrigin: '100px 30px' }}>
                <path 
                    d="M 65 10 H 135 V 25 H 110 V 85 H 135 V 100 H 65 V 85 H 90 V 25 H 65 Z" 
                    fill="#84cc16" 
                />
            </g>

        </svg>

      </div>
    </div>
  );
}
