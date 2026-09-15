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
        <button onClick={() => setFase(2)} className="px-3 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600">2. Incastro (Tangenza Esterna)</button>
        <button onClick={() => setFase(3)} className="px-3 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600">3. MNIFIT</button>
        <button onClick={() => setFase(4)} className="px-3 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600">4. Pulizia</button>
      </div>

      <div className="text-center mb-6 mt-20">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Tangenza Esterna e Incastro a 5 Piani</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[550px] h-[550px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox="-50 0 550 450" className="w-full h-full overflow-visible">
            
            {/* GRUPPO CENTRALE (I, A, O): Slitta verso sinistra nella Fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-120px]' : 'translate-x-0'}`}>

               {/* ========================================================= */}
               {/* L1: LA LETTERA "A" COMPLETA (PIANO DI FONDO)              */}
               {/* ========================================================= */}
               <path 
                  className={`transition-all duration-1000 ease-out 
                     ${fase < 1 ? 'translate-y-[-60px] opacity-0' : 'translate-y-0 opacity-100'}
                     ${fase >= 3 ? '!opacity-0' : ''}
                  `}
                  fillRule="evenodd"
                  d="
                     M 210 70 H 270 L 380 400 H 336.67 L 315.33 336 H 164.67 L 143.33 400 H 100 Z 
                     M 240 110 L 178 296 H 302 Z
                  "
                  fill="#334155"
               />

               {/* ========================================================= */}
               {/* L2: L'ANELLO VERDE (PIANO MEDIO)                          */}
               {/* Passa sopra la A, coprendone le gambe                     */}
               {/* ========================================================= */}
               <circle 
                   cx="240" cy="220" r="91" fill="none" stroke="#84cc16" strokeWidth="30"
                   strokeDasharray="600" strokeDashoffset={fase >= 2 ? 0 : 600}
                   style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* ========================================================= */}
               {/* L3: VERTICE E BARRA DELLA A (PIANO DI CHIUSURA)           */}
               {/* Tornano in primo piano e coprono l'anello verde           */}
               {/* ========================================================= */}
               <g className={`transition-opacity duration-1000 
                   ${fase < 1 ? 'opacity-0' : 'opacity-100'}
                   ${fase >= 3 ? '!opacity-0' : ''}
               `}>
                  {/* Vertice in alto (Svela l'anello verde nell'angolo interno!) */}
                  <path d="M 210 70 H 270 L 283.33 110 L 240 110 L 196.67 110 Z" fill="#334155" />
                  
                  {/* Barra orizzontale in basso (Copre l'anello verde inferiore) */}
                  <polygon points="134.67,296 345.33,296 358.67,336 121.33,336" fill="#334155" />
               </g>

               {/* ========================================================= */}
               {/* L4: CERCHIO BIANCO + LOGO (PIANO FRONTALE)                */}
               {/* ========================================================= */}
               {/* R=76 è la tangenza matematica esatta ai bordi esterni!    */}
               {/* Si poggia perfettamente sulla barra Y=296                 */}
               <g className={`transition-opacity duration-700 ${fase >= 2 ? 'opacity-100 delay-100' : 'opacity-0'}`}>
                  
                  {/* Cerchio di Sfondo Bianco */}
                  <circle cx="240" cy="220" r="76" fill="#f1f5f9" />
                  
                  {/* Logo Verde Centrale */}
                  <g 
                     className={`transition-opacity duration-700 ${fase >= 4 ? 'opacity-0' : 'opacity-100'}`} 
                     stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  >
                     {/* Foglie inferiori */}
                     <path d="M 240 285 C 200 285 185 260 185 250 C 210 250 225 270 240 285 Z" strokeWidth="4.5" />
                     <path d="M 240 285 C 280 285 295 260 295 250 C 270 250 255 270 240 285 Z" strokeWidth="4.5" />
                     {/* Bilanciere */}
                     <line x1="180" y1="195" x2="300" y2="195" strokeWidth="4.5" />
                     <line x1="186" y1="187" x2="186" y2="203" strokeWidth="4.5" />
                     <line x1="294" y1="187" x2="294" y2="203" strokeWidth="4.5" />
                     {/* Omino: Testa */}
                     <circle cx="260" cy="170" r="6.5" strokeWidth="4.5" />
                     {/* Omino: Corpo */}
                     <path d="M 235 195 Q 220 220 235 245" strokeWidth="4.5" />
                     <path d="M 235 200 L 255 212 L 275 195" strokeWidth="4.5" />
                     {/* Omino: Gambe */}
                     <path d="M 235 245 L 210 230 L 185 250" strokeWidth="4.5" />
                     <path d="M 235 245 L 255 260 L 275 260" strokeWidth="4.5" />
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
               <text x="245" y="258" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="115" letterSpacing="-5" fill="#334155">
                  MNI<tspan fill="#84cc16">FIT</tspan>
               </text>
            </g>

        </svg>

      </div>
    </div>
  );
}
