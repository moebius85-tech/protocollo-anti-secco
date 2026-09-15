"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE (Solo l'essenziale) */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button onClick={() => setFase(0)} className="px-5 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">0. Reset</button>
        <button onClick={() => setFase(1)} className="px-5 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">1. Scende la A (Solida)</button>
        <button onClick={() => setFase(2)} className="px-5 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all shadow-lg shadow-lime-500/30">2. Incastro (ClipPath)</button>
      </div>

      <div className="text-center mb-8 mt-16">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Costruzione Monolitica senza Sovrapposizioni</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE (Centro Esatto: 250, 250) */}
      <div className="relative flex items-center justify-center w-[500px] h-[500px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
            
            <defs>
                {/* 
                   LA MASCHERA MAGICA: Questa taglia l'anello verde frontale. 
                   Gli permette di esistere SOLO da Y=129.8 a Y=335 (esattamente 
                   sotto la punta della A e sopra la barra della A). 
                */}
                <clipPath id="fascia-centrale">
                    <rect x="0" y="129.8" width="500" height="205.2" />
                </clipPath>
            </defs>

            {/* ========================================================= */}
            {/* L1: L'ANELLO VERDE (DIETRO A TUTTO)                       */}
            {/* Si vedrà solo attraverso i fori o fuori dai bordi della A */}
            {/* ========================================================= */}
            <circle 
                cx="250" cy="250" r="109" fill="none" stroke="#84cc16" strokeWidth="48"
                strokeDasharray="685" strokeDashoffset={fase >= 2 ? 0 : 685}
                style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* ========================================================= */}
            {/* L2: LA LETTERA "A" (UN SOLO TRACCIATO SOLIDO)             */}
            {/* Essendo un unico elemento, sfuma senza ALCUNA pezza!      */}
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
            {/* L3: L'ANELLO VERDE (DAVANTI - CLIPPATO)                   */}
            {/* Disegna le parti verdi sopra le gambe della A, fermandosi */}
            {/* millimetricamente prima della barra e della punta.        */}
            {/* ========================================================= */}
            <circle 
                cx="250" cy="250" r="109" fill="none" stroke="#84cc16" strokeWidth="48"
                clipPath="url(#fascia-centrale)"
                strokeDasharray="685" strokeDashoffset={fase >= 2 ? 0 : 685}
                style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* ========================================================= */}
            {/* L4: IL CERCHIO BIANCO (PIANO FRONTALE)                    */}
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
