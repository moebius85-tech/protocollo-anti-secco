"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button onClick={() => setFase(0)} className="px-5 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">0. Reset</button>
        <button onClick={() => setFase(1)} className="px-5 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">1. Scende la A</button>
        <button onClick={() => setFase(2)} className="px-5 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all shadow-lg shadow-lime-500/30">2. Incastro Tangente</button>
      </div>

      <div className="text-center mb-8 mt-16">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Isolamento Tangenze ed Incastro a 5 Piani</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE (Centro Esatto: 250, 250) */}
      <div className="relative flex items-center justify-center w-[500px] h-[500px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
            
            {/* ========================================================= */}
            {/* L1: LIVELLO 1 - L'ANELLO VERDE (DIETRO)                   */}
            {/* ========================================================= */}
            <circle 
                cx="250" cy="250" r="115" fill="none" stroke="#84cc16" strokeWidth="36"
                strokeDasharray="723" strokeDashoffset={fase >= 2 ? 0 : 723}
                style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* ========================================================= */}
            {/* L2: LIVELLO 2 - LA LETTERA "A" COMPLETA (PIANO MEDIO)     */}
            {/* ========================================================= */}
            <path 
               className={`transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1)
                  ${fase < 1 ? 'translate-y-[-80px] opacity-0' : 'translate-y-0 opacity-100'}
               `}
               fillRule="evenodd"
               d="
                  M 226.66 85 H 273.33 L 423.33 445 H 381.33 L 356.34 385 H 143.66 L 118.67 445 H 76.66 Z 
                  M 250 129.8 L 335.5 335 H 164.5 Z
               "
               fill="#334155"
            />

            {/* ========================================================= */}
            {/* L3: LIVELLO 3 - L'ANELLO VERDE (DAVANTI)                  */}
            {/* Si sovrappone alla A grigia, coprendone le gambe.         */}
            {/* ========================================================= */}
            <circle 
                cx="250" cy="250" r="115" fill="none" stroke="#84cc16" strokeWidth="36"
                strokeDasharray="723" strokeDashoffset={fase >= 2 ? 0 : 723}
                style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* ========================================================= */}
            {/* L4: LIVELLO 4 - VERTICE FORATO E BARRA (L'INCASTRO)       */}
            {/* Tornano in primo piano e coprono l'anello verde superiore */}
            {/* e inferiore, lasciando il foro svelato al centro!         */}
            {/* ========================================================= */}
            <g className={`transition-opacity duration-1000 ${fase < 1 ? 'opacity-0' : 'opacity-100'}`}>
               
               {/* Vertice in alto: Copre il verde sui lati, svela il verde nel foro */}
               <path d="M 226.66 85 H 273.33 L 329.59 220 H 287.59 L 250 129.8 L 212.41 220 H 170.41 Z" fill="#334155" />
               
               {/* Barra orizzontale: Poggia perfettamente sotto il cerchio (Y=335) e copre il verde in basso */}
               <polygon points="164.5,335 335.5,335 356.34,385 143.66,385" fill="#334155" />
            </g>

            {/* ========================================================= */}
            {/* L5: LIVELLO 5 - CERCHIO BIANCO (PIANO FRONTALE)           */}
            {/* ========================================================= */}
            {/* Il cerchio (R=85) taglia chirurgicamente le gambe interne */}
            {/* della A (Livello 4), creando gli angoli perfetti (i tuoi  */}
            {/* cerchietti rossi). Tangenza esterna matematica!           */}
            <circle 
                cx="250" cy="250" r="85" fill="#f1f5f9" 
                className={`transition-all duration-[1200ms] ease-out origin-center
                   ${fase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                `}
                style={{ transformOrigin: '250px 250px' }}
            />

        </svg>

      </div>
    </div>
  );
}
