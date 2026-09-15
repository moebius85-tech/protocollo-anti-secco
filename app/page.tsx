"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button onClick={() => setFase(0)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">0. Start (Solo I)</button>
        <button onClick={() => setFase(1)} className="px-4 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">1. Scende A</button>
        <button onClick={() => setFase(2)} className="px-4 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all">2. Incastro 5 Livelli</button>
        <button onClick={() => setFase(3)} className="px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition-all">3. Trasforma in MNIFIT</button>
      </div>

      <div className="text-center mb-6 mt-20">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Incastro Geometrico</p>
         <p className="text-slate-700 font-black text-lg mt-1">Architettura a 5 Livelli Sovrapposti</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[480px] h-[560px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox="0 0 400 480" className="w-full h-full overflow-visible">
            
            <defs>
                {/* Maschera per il Livello 3: mostra il cerchio verde SOLO sui laterali della A */}
                <clipPath id="laterali">
                    <rect x="0" y="160" width="400" height="155" />
                </clipPath>
            </defs>

            {/* GRUPPO CENTRALE: Slitta verso sinistra nella Fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-100px]' : 'translate-x-0'}`}>

               {/* ========================================================= */}
               {/* L1: LIVELLO 1 - CERCHIO VERDE DI FONDO                    */}
               {/* ========================================================= */}
               <circle 
                   cx="200" cy="255" r="104" fill="none" stroke="#84cc16" strokeWidth="32"
                   strokeDasharray="653" strokeDashoffset={fase >= 2 ? 0 : 653}
                   style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* ========================================================= */}
               {/* L2: LIVELLO 2 - LA LETTERA "A" (V-Shape)                  */}
               {/* ========================================================= */}
               <path 
                  className={`transition-all duration-1000 ease-out 
                     ${fase < 1 ? 'translate-y-[-60px] opacity-0' : 'translate-y-0 opacity-100'}
                     ${fase >= 3 ? 'opacity-0' : ''}
                  `}
                  d="M 170 80 H 230 L 347 400 H 277 L 200 120 L 123 400 H 53 Z"
                  fill="#334155"
               />

               {/* ========================================================= */}
               {/* L3: LIVELLO 3 - CERCHIO VERDE LATERALE SUPERIORE          */}
               {/* ========================================================= */}
               {/* Usa la clipPath per coprire le gambe della A solo ai lati!*/}
               <circle 
                   cx="200" cy="255" r="104" fill="none" stroke="#84cc16" strokeWidth="32"
                   clipPath="url(#laterali)"
                   strokeDasharray="653" strokeDashoffset={fase >= 2 ? 0 : 653}
                   style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* ========================================================= */}
               {/* L4: LIVELLO 4 - BARRA ORIZZONTALE DELLA A                 */}
               {/* ========================================================= */}
               {/* Più in basso, chiude l'incastro coprendo il cerchio verde */}
               <polygon 
                  points="140,320 260,320 275,370 125,370" 
                  fill="#334155"
                  className={`transition-all duration-1000 ease-out 
                     ${fase < 1 ? 'translate-y-[-60px] opacity-0' : 'translate-y-0 opacity-100'}
                     ${fase >= 3 ? 'opacity-0' : ''}
                  `}
               />

               {/* ========================================================= */}
               {/* L5: LIVELLO 5 - CERCHIO GRIGIO + LOGO (PIANO FRONTALE)    */}
               {/* ========================================================= */}
               <g className={`transition-opacity duration-700 ${fase >= 2 ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                  {/* Cerchio "Vuoto" di diametro ridotto per tangenza perfetta */}
                  <circle cx="200" cy="255" r="88" fill="#f1f5f9" />
                  
                  {/* Logo Omino e Foglie (Svanisce in Fase 3) */}
                  <g className={`transition-opacity duration-700 ${fase >= 3 ? 'opacity-0' : 'opacity-100'}`} stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M 200 325 C 160 325 145 300 145 290 C 170 290 185 310 200 325 Z" strokeWidth="4" />
                     <path d="M 200 325 C 240 325 255 300 255 290 C 230 290 215 310 200 325 Z" strokeWidth="4" />
                     <line x1="140" y1="225" x2="260" y2="225" strokeWidth="4.5" />
                     <line x1="145" y1="217" x2="145" y2="233" strokeWidth="4.5" />
                     <line x1="255" y1="217" x2="255" y2="233" strokeWidth="4.5" />
                     <circle cx="225" cy="200" r="6.5" strokeWidth="4.5" />
                     <path d="M 195 225 Q 185 245 195 265" strokeWidth="4.5" />
                     <path d="M 195 230 L 210 240 L 230 225" strokeWidth="4.5" />
                     <path d="M 195 265 L 175 250 L 155 265" strokeWidth="4" />
                     <path d="M 195 265 L 215 280 L 230 280" strokeWidth="4" />
                  </g>
               </g>

               {/* ========================================================= */}
               {/* LA LETTERA "I" (Ancorata e incolonnata)                   */}
               {/* ========================================================= */}
               <g className={`transition-all duration-[1200ms] ease-out origin-top
                  ${fase === 0 ? 'scale-[15] opacity-100 translate-y-[120px]' : 'scale-100 opacity-100 translate-y-0'}
                  ${fase >= 3 ? 'opacity-0' : ''}
               `}>
                  <path d="M 170 10 H 230 V 22 H 212 V 58 H 230 V 70 H 170 V 58 H 188 V 22 H 170 Z" fill="#84cc16" />
               </g>

            </g>

            {/* ========================================================= */}
            {/* TESTO "MNIFIT" (Fase 3)                                   */}
            {/* ========================================================= */}
            <g className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1)
               ${fase >= 3 ? 'opacity-100 translate-x-[15px]' : 'opacity-0 translate-x-[70px]'}
            `}>
               <text x="215" y="290" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="115" letterSpacing="-5" fill="#334155">
                  MNI<tspan fill="#84cc16">FIT</tspan>
               </text>
            </g>

        </svg>

      </div>
    </div>
  );
}
