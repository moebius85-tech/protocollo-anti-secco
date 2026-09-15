"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button onClick={() => setFase(0)} className="px-5 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">0. Reset (Solo I)</button>
        <button onClick={() => setFase(1)} className="px-5 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">1. Scende la A (Pulita)</button>
        <button onClick={() => setFase(2)} className="px-5 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all shadow-lg shadow-lime-500/30">2. Incastro Tangente</button>
        <button onClick={() => setFase(3)} className="px-5 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition-all">3. OMNIFIT</button>
      </div>

      <div className="text-center mb-8 mt-16">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Geometria Perfetta + Discesa Raggruppata</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE (Centro Esatto: 250, 250) */}
      <div className="relative flex items-center justify-center w-[500px] h-[500px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
            
            {/* GRUPPO CENTRALE (I, A, O): Slitta verso sinistra nella Fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-120px]' : 'translate-x-0'}`}>

               {/* ========================================================= */}
               {/* IL GRUPPO DELLA DISCESA: LA VERA MAGIA                    */}
               {/* Spostando qui l'opacità e la discesa, il browser fonde i  */}
               {/* livelli interni in un blocco unico. ZERO PEZZE SCURE!     */}
               {/* ========================================================= */}
               <g className={`transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1)
                  ${fase < 1 ? 'translate-y-[-80px] opacity-0' : 'translate-y-0 opacity-100'}
               `}>

                  {/* L1: L'ANELLO VERDE (DIETRO) */}
                  <circle 
                      cx="250" cy="250" r="109" fill="none" stroke="#84cc16" strokeWidth="48"
                      strokeDasharray="685" strokeDashoffset={fase >= 2 ? 0 : 685}
                      style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  />

                  {/* L2: LA LETTERA "A" COMPLETA (Svanisce in Fase 3) */}
                  <path 
                     className={`transition-opacity duration-1000 ${fase >= 3 ? 'opacity-0' : 'opacity-100'}`}
                     fillRule="evenodd"
                     d="
                        M 226.66 85 H 273.33 L 423.33 445 H 381.33 L 356.34 385 H 143.66 L 118.67 445 H 76.66 Z 
                        M 250 129.8 L 335.5 335 H 164.5 Z
                     "
                     fill="#334155"
                  />

                  {/* L3: L'ANELLO VERDE (DAVANTI) */}
                  <circle 
                      cx="250" cy="250" r="109" fill="none" stroke="#84cc16" strokeWidth="48"
                      strokeDasharray="685" strokeDashoffset={fase >= 2 ? 0 : 685}
                      style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  />

                  {/* L4: VERTICE E BARRA - QUESTI CREANO GLI ANGOLI (Svaniscono in Fase 3) */}
                  <g className={`transition-opacity duration-1000 ${fase >= 3 ? 'opacity-0' : 'opacity-100'}`}>
                     <path d="M 226.66 85 H 273.33 L 329.59 220 H 287.59 L 250 129.8 L 212.41 220 H 170.41 Z" fill="#334155" />
                     <polygon points="122.5,335 377.5,335 398.34,385 101.66,385" fill="#334155" />
                  </g>

               </g>

               {/* ========================================================= */}
               {/* L5: CERCHIO BIANCO (PIANO FRONTALE)                       */}
               {/* È rimasto fuori dal gruppo di discesa perché lui NON deve */}
               {/* scendere, ma scalare in Fase 2!                           */}
               {/* ========================================================= */}
               <circle 
                   cx="250" cy="250" r="85" fill="#f1f5f9" 
                   className={`transition-all duration-[1200ms] ease-out origin-center
                      ${fase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                   `}
                   style={{ transformOrigin: '250px 250px' }}
               />

               {/* ========================================================= */}
               {/* LA LETTERA "I" IN CIMA                                    */}
               {/* ========================================================= */}
               <g className={`transition-all duration-[1200ms] ease-out origin-top
                  ${fase === 0 ? 'scale-[20] opacity-100 translate-y-[100px]' : 'scale-100 opacity-100 translate-y-0'}
                  ${fase >= 3 ? 'opacity-0' : ''}
               `}>
                  <path d="M 210 10 H 270 V 22 H 250 V 58 H 270 V 70 H 210 V 58 H 230 V 22 H 210 Z" fill="#84cc16" />
               </g>

            </g>

            {/* ========================================================= */}
            {/* SCRITTA "MNIFIT" (Slitta da destra nella Fase 3)          */}
            {/* ========================================================= */}
            <g className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1)
               ${fase >= 3 ? 'opacity-100 translate-x-[20px]' : 'opacity-0 translate-x-[80px]'}
            `}>
               <text x="245" y="258" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="115" letterSpacing="-5" fill="#334155">
                  MNI<tspan fill="#84cc16">FIT</tspan>
               </text>
            </g>

        </svg>

      </div>
    </div>
  );
}
