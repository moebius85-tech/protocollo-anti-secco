"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-2 bg-white p-3 rounded-2xl shadow-xl z-50 text-sm">
        <button onClick={() => setFase(0)} className="px-3 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300">0. Start (Solo I)</button>
        <button onClick={() => setFase(1)} className="px-3 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800">1. Scende A</button>
        <button onClick={() => setFase(2)} className="px-3 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600">2. Incastro Tangente Perfetto</button>
        <button onClick={() => setFase(3)} className="px-3 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600">3. MNIFIT Completo</button>
      </div>

      <div className="text-center mb-6 mt-20">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Tangenza Matematica Esterna</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[550px] h-[550px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Griglia calcolata: Centro esatto su X=250, Y=250 */}
        <svg viewBox="-50 0 550 500" className="w-full h-full overflow-visible">
            
            {/* GRUPPO CENTRALE: Slitta verso sinistra nella Fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-120px]' : 'translate-x-0'}`}>

               {/* ========================================================= */}
               {/* LIVELLO 1: IL CERCHIO VERDE DI FONDO                      */}
               {/* ========================================================= */}
               {/* È un cerchio pieno posto dietro tutto. Riempe i vuoti!    */}
               <circle 
                   cx="250" cy="250" r="145" fill="#84cc16"
                   className={`transition-all duration-1000 ease-out ${fase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                   style={{ transformOrigin: '250px 250px' }}
               />

               {/* ========================================================= */}
               {/* LIVELLO 2: LA LETTERA "A" (CON FORO E SBARRA)             */}
               {/* ========================================================= */}
               {/* Tracciato unico con foro (fillRule="evenodd").            */}
               {/* Le diagonali esterne distano esattamente 100 dal centro!  */}
               <path 
                  className={`transition-all duration-1000 ease-out 
                     ${fase < 1 ? 'translate-y-[-60px] opacity-0' : 'translate-y-0 opacity-100'}
                  `}
                  fillRule="evenodd"
                  d="
                     M 19 450 
                     L 232.7 80 
                     L 267.3 80 
                     L 481 450 
                     L 441 450 
                     L 406.3 390 
                     L 93.7 390 
                     L 59 450 
                     Z 
                     M 250 119 
                     L 116.8 350 
                     L 383.2 350 
                     Z
                  "
                  fill="#334155"
               />

               {/* ========================================================= */}
               {/* LIVELLO 3: IL CERCHIO BIANCO + LOGO (PIANO FRONTALE)      */}
               {/* ========================================================= */}
               {/* R=100. Poggia ESATTAMENTE su Y=350 (la sbarra della A).   */}
               {/* È perfettamente tangente ai lati esterni della A.         */}
               <g className={`transition-opacity duration-700 ${fase >= 2 ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                  
                  {/* Cerchio Bianco che 'taglia' le gambe della A */}
                  <circle cx="250" cy="250" r="100" fill="#f1f5f9" />
                  
                  {/* Logo Verde (Centrato nel cerchio bianco) */}
                  <g stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round">
                     {/* Foglie inferiori */}
                     <path d="M 250 330 C 200 330 180 300 180 290 C 210 290 230 310 250 330 Z" strokeWidth="4.5" />
                     <path d="M 250 330 C 300 330 320 300 320 290 C 290 290 270 310 250 330 Z" strokeWidth="4.5" />
                     {/* Bilanciere */}
                     <line x1="180" y1="210" x2="320" y2="210" strokeWidth="5" />
                     <line x1="185" y1="202" x2="185" y2="218" strokeWidth="5" />
                     <line x1="315" y1="202" x2="315" y2="218" strokeWidth="5" />
                     {/* Omino: Testa */}
                     <circle cx="270" cy="180" r="7" strokeWidth="5" />
                     {/* Omino: Corpo e Braccia */}
                     <path d="M 245 210 Q 230 235 245 260" strokeWidth="5" />
                     <path d="M 245 215 L 265 228 L 285 210" strokeWidth="4.5" />
                     {/* Omino: Gambe in affondo */}
                     <path d="M 245 260 L 220 245 L 190 265" strokeWidth="4.5" />
                     <path d="M 245 260 L 265 275 L 290 275" strokeWidth="4.5" />
                  </g>
               </g>

               {/* ========================================================= */}
               {/* LA LETTERA "I" IN CIMA                                    */}
               {/* ========================================================= */}
               <g className={`transition-all duration-[1200ms] ease-out origin-top
                  ${fase === 0 ? 'scale-[20] opacity-100 translate-y-[150px]' : 'scale-100 opacity-100 translate-y-0'}
               `}>
                  <path 
                     d="M 220 10 H 280 V 25 H 255 V 55 H 280 V 70 H 220 V 70 H 245 V 25 H 220 Z" 
                     fill="#84cc16" 
                  />
               </g>

            </g>

            {/* ========================================================= */}
            {/* SCRITTA "MNIFIT" (Slitta da destra nella Fase 3)          */}
            {/* ========================================================= */}
            <g className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1)
               ${fase >= 3 ? 'opacity-100 translate-x-[20px]' : 'opacity-0 translate-x-[80px]'}
            `}>
               <text x="255" y="285" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="120" letterSpacing="-5" fill="#334155">
                  MNI<tspan fill="#84cc16">FIT</tspan>
               </text>
            </g>

        </svg>

      </div>
    </div>
  );
}
