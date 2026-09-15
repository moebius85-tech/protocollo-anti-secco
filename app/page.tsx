"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-2 bg-white p-3 rounded-2xl shadow-xl z-50 text-sm">
        <button onClick={() => setFase(0)} className="px-3 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300">0. Start</button>
        <button onClick={() => setFase(1)} className="px-3 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800">1. Scende A</button>
        <button onClick={() => setFase(2)} className="px-3 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600">2. Incastro Tangente (5 Livelli)</button>
        <button onClick={() => setFase(3)} className="px-3 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600">3. MNIFIT</button>
        <button onClick={() => setFase(4)} className="px-3 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600">4. Pulizia</button>
      </div>

      <div className="text-center mb-6 mt-20">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Tangenza Esterna e Incastro a 5 Piani</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[550px] h-[550px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Il centro matematico di tutta l'architettura è X=240, Y=240 */}
        <svg viewBox="-50 0 550 500" className="w-full h-full overflow-visible">
            
            {/* GRUPPO CENTRALE (I, A, O): Slitta verso sinistra nella Fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-120px]' : 'translate-x-0'}`}>

               {/* ========================================================= */}
               {/* L1: LIVELLO 1 - L'ANELLO VERDE (DIETRO)                   */}
               {/* ========================================================= */}
               <circle 
                   cx="240" cy="240" r="105" fill="none" stroke="#84cc16" strokeWidth="30"
                   strokeDasharray="660" strokeDashoffset={fase >= 2 ? 0 : 660}
                   style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* ========================================================= */}
               {/* L2: LIVELLO 2 - LA LETTERA "A" COMPLETA (PIANO MEDIO)     */}
               {/* ========================================================= */}
               <path 
                  className={`transition-all duration-1000 ease-out 
                     ${fase < 1 ? 'translate-y-[-60px] opacity-0' : 'translate-y-0 opacity-100'}
                     ${fase >= 3 ? '!opacity-0' : ''}
                  `}
                  fillRule="evenodd"
                  d="
                     M 220 80 H 260 L 410 440 H 340 L 240 110 L 140 440 H 70 Z 
                     M 240 110 L 340 440 H 140 Z
                  "
                  fill="#334155"
               />

               {/* ========================================================= */}
               {/* L3: LIVELLO 3 - L'ANELLO VERDE (DAVANTI)                  */}
               {/* Sovrappone la A grigia. Coprirebbe tutto, ma...           */}
               {/* ========================================================= */}
               <circle 
                   cx="240" cy="240" r="105" fill="none" stroke="#84cc16" strokeWidth="30"
                   strokeDasharray="660" strokeDashoffset={fase >= 2 ? 0 : 660}
                   style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* ========================================================= */}
               {/* L4: LIVELLO 4 - VERTICE E BARRA (L'INCASTRO MAGICO)       */}
               {/* Riposizionati IN PRIMO PIANO coprono l'anello verde       */}
               {/* superiore e inferiore, svelando il foro centrale!         */}
               {/* ========================================================= */}
               <g className={`transition-opacity duration-1000 
                   ${fase < 1 ? 'opacity-0' : 'opacity-100'}
                   ${fase >= 3 ? '!opacity-0' : ''}
               `}>
                  {/* Vertice in alto. Sagomato per mantenere il foro interno a V! */}
                  <polygon points="220,80 260,80 276.6,120 243,120 240,110 237,120 203.4,120" fill="#334155" />
                  
                  {/* Barra orizzontale. Poggia esatta sotto il cerchio bianco (Y=320) e copre l'anello */}
                  <polygon points="120,320 360,320 376.6,360 103.4,360" fill="#334155" />
               </g>

               {/* ========================================================= */}
               {/* L5: LIVELLO 5 - CERCHIO BIANCO + LOGO (PIANO FRONTALE)    */}
               {/* ========================================================= */}
               {/* R=80 garantisce la tangenza matematica con i lati esterni */}
               {/* Y=240, quindi il fondo tocca esattamente Y=320 (la barra) */}
               <g className={`transition-opacity duration-700 ${fase >= 2 ? 'opacity-100 delay-100' : 'opacity-0'}`}>
                  
                  {/* Cerchio di Sfondo Bianco (Taglia visivamente i gambi della A) */}
                  <circle cx="240" cy="240" r="80" fill="#f1f5f9" />
                  
                  {/* Logo Verde (Svanisce in Fase 4 per la pulizia finale) */}
                  <g 
                     className={`transition-opacity duration-700 ${fase >= 4 ? 'opacity-0' : 'opacity-100'}`} 
                     stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  >
                     {/* Foglie */}
                     <path d="M 240 305 C 195 305 180 275 180 265 C 205 265 220 285 240 305 Z" strokeWidth="4.5" />
                     <path d="M 240 305 C 285 305 300 275 300 265 C 275 265 260 285 240 305 Z" strokeWidth="4.5" />
                     {/* Bilanciere */}
                     <line x1="180" y1="215" x2="300" y2="215" strokeWidth="4.5" />
                     <line x1="186" y1="207" x2="186" y2="223" strokeWidth="4.5" />
                     <line x1="294" y1="207" x2="294" y2="223" strokeWidth="4.5" />
                     {/* Omino: Testa */}
                     <circle cx="260" cy="190" r="6.5" strokeWidth="4.5" />
                     {/* Omino: Corpo */}
                     <path d="M 235 215 Q 220 240 235 265" strokeWidth="4.5" />
                     <path d="M 235 220 L 255 232 L 275 215" strokeWidth="4.5" />
                     {/* Omino: Gambe */}
                     <path d="M 235 265 L 210 250 L 185 270" strokeWidth="4.5" />
                     <path d="M 235 265 L 255 280 L 275 280" strokeWidth="4.5" />
                  </g>
               </g>

               {/* ========================================================= */}
               {/* LA LETTERA "I" IN CIMA                                    */}
               {/* ========================================================= */}
               <g className={`transition-all duration-[1200ms] ease-out origin-top
                  ${fase === 0 ? 'scale-[25] opacity-100 translate-y-[120px]' : 'scale-100 opacity-100 translate-y-0'}
                  ${fase >= 3 ? 'opacity-0' : ''}
               `}>
                  <path 
                     d="M 215 10 H 265 V 22 H 245 V 58 H 265 V 70 H 215 V 58 H 235 V 22 H 215 Z" 
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
               <text x="245" y="278" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="115" letterSpacing="-5" fill="#334155">
                  MNI<tspan fill="#84cc16">FIT</tspan>
               </text>
            </g>

        </svg>

      </div>
    </div>
  );
}
