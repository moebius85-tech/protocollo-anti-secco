"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE - SOLO A e O */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button onClick={() => setFase(0)} className="px-5 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">0. Reset</button>
        <button onClick={() => setFase(1)} className="px-5 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">1. Scende A (Solida)</button>
        <button onClick={() => setFase(2)} className="px-5 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all shadow-lg shadow-lime-500/30">2. Incastro (O)</button>
      </div>

      <div className="text-center mb-8 mt-16">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Costruzione Monolitica + Maschere Frontali</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE (Centro Esatto: 250, 250) */}
      <div className="relative flex items-center justify-center w-[500px] h-[500px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
            
            {/* ========================================================= */}
            {/* L1: LA LETTERA "A" (UN SOLO TRACCIATO SOLIDO)             */}
            {/* Essendo un unico elemento, sfuma senza "pezze" scure!     */}
            {/* ========================================================= */}
            <path 
               className={`transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1)
                  ${fase < 1 ? 'translate-y-[-80px] opacity-0' : 'translate-y-0 opacity-100'}
               `}
               fillRule="evenodd"
               d="
                  M 226.66 85 H 273.33 
                  L 423.33 445 H 381.33 
                  L 356.34 385 H 143.66 
                  L 118.67 445 H 76.66 Z 
                  
                  M 250 129.8 
                  L 164.5 335 H 335.5 Z
               "
               fill="#334155"
            />

            {/* ========================================================= */}
            {/* L2: L'ANELLO VERDE (DAVANTI ALLA "A")                     */}
            {/* Coprirà le gambe della A scendendo fino alla barra.       */}
            {/* ========================================================= */}
            <circle 
                cx="250" cy="250" r="109" fill="none" stroke="#84cc16" strokeWidth="48"
                className={`transition-opacity duration-300 ${fase >= 2 ? 'opacity-100' : 'opacity-0'}`}
                strokeDasharray="685" strokeDashoffset={fase >= 2 ? 0 : 685}
                style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s' }}
            />

            {/* ========================================================= */}
            {/* L3: LE TOPPE DI MASCHERAMENTO (PIANO DI CHIUSURA)         */}
            {/* Queste toppe appaiono solo in Fase 2. Sono identiche al   */}
            {/* colore della A e servono solo a coprire i pezzi di anello */}
            {/* verde che non devono vedersi in alto e in basso.          */}
            {/* ========================================================= */}
            <g className={`${fase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
               
               {/* TOPPA IN ALTO: Copre l'anello verde SULLA punta della A, ma 
                   lascia aperto il foro centrale (da Y=129.8 in giù), 
                   rivelando il verde all'interno del triangolo! */}
               <polygon 
                  points="226.66,85 273.33,85 292,129.8 250,129.8 208,129.8" 
                  fill="#334155" 
               />
               
               {/* TOPPA IN BASSO: Copre l'anello verde sotto al cerchio bianco.
                   È esattamente larga quanto la sbarra della A. */}
               <polygon 
                  points="122.5,335 377.5,335 398.33,385 101.67,385" 
                  fill="#334155" 
               />
            </g>

            {/* ========================================================= */}
            {/* L4: IL CERCHIO BIANCO (PRIMISSIMO PIANO)                  */}
            {/* Tangenza esterna R=85. Passando sopra le gambe interne    */}
            {/* della A, crea le punte taglienti dei tuoi cerchietti!     */}
            {/* ========================================================= */}
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
