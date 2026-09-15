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
        <button onClick={() => setFase(2)} className="px-4 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all">2. Incastro O + Logo</button>
        <button onClick={() => setFase(3)} className="px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition-all">3. Trasforma in MNIFIT</button>
      </div>

      <div className="text-center mb-8 mt-24">
         <p className="text-slate-400 font-bold tracking-widest uppercase">Laboratorio 5 Livelli</p>
         <p className="text-slate-500 text-sm mt-2">Test dell'incastro perfetto I-A-O</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE (Griglia 400x600 per contenere I e A in verticale) */}
      <div className="relative flex items-center justify-center w-[500px] h-[550px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox="0 -100 400 500" className="w-full h-full overflow-visible">
            
            {/* GRUPPO CENTRALE. Slitta a sinistra nella Fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-90px]' : 'translate-x-0'}`}>

               {/* ========================================================= */}
               {/* L1: LIVELLO 1 - CERCHIO VERDE DIETRO                      */}
               {/* ========================================================= */}
               <circle cx="200" cy="200" r="90" fill="none" stroke="#84cc16" strokeWidth="40"
                   strokeDasharray="566" strokeDashoffset={fase >= 2 ? 0 : 566}
                   style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
               />

               {/* ========================================================= */}
               {/* L2: LIVELLO 2 - LA LETTERA "A" COMPLETA                   */}
               {/* Svanisce nella Fase 3 per far restare solo la O           */}
               {/* ========================================================= */}
               <path className={`transition-all duration-1000 ease-out 
                   ${fase < 1 ? 'translate-y-[-100px] opacity-0' : 'translate-y-0 opacity-100'}
                   ${fase >= 3 ? '!opacity-0' : ''}
                  `}
                  d="M 160 40 H 240 L 350 370 H 290 L 276.7 330 H 123.3 L 110 370 H 50 Z M 200 100 L 143.3 270 H 256.7 Z"
                  fill="#334155"
               />

               {/* ========================================================= */}
               {/* L3: LIVELLO 3 - CERCHIO VERDE DAVANTI                     */}
               {/* Disegnato insieme a L1, passa SOPRA la A appena disegnata */}
               {/* ========================================================= */}
               <circle cx="200" cy="200" r="90" fill="none" stroke="#84cc16" strokeWidth="40"
                   strokeDasharray="566" strokeDashoffset={fase >= 2 ? 0 : 566}
                   style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
               />

               {/* ========================================================= */}
               {/* L4: LIVELLO 4 - PUNTA E SBARRA DELLA A (L'INCASTRO)       */}
               {/* Passano sopra L3, nascondendo il cerchio sopra e sotto!   */}
               {/* Svaniscono insieme alla A nella Fase 3                    */}
               {/* ========================================================= */}
               <g className={`transition-opacity duration-1000 ${fase >= 3 ? 'opacity-0' : 'opacity-100'}`}>
                  {/* Punta della A (Nasconde il cerchio superiore) */}
                  <polygon points="160,40 240,40 270,130 200,100 130,130" fill="#334155" />
                  {/* Barra orizzontale (Nasconde il cerchio inferiore) */}
                  <polygon points="143.3,270 256.7,270 276.7,330 123.3,330" fill="#334155" />
               </g>

               {/* ========================================================= */}
               {/* L5: LIVELLO 5 - CERCHIO PIENO SFONDO + LOGO OMINO         */}
               {/* ========================================================= */}
               <g className={`transition-opacity duration-1000 ${fase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  
                  {/* Cerchio "vuoto" grigio chiaro */}
                  <circle cx="200" cy="200" r="70" fill="#f1f5f9" />

                  {/* Logo Verde Centrale (Svanisce in Fase 3, lasciando la O) */}
                  <g className={`transition-opacity duration-700 ${fase >= 3 ? 'opacity-0' : 'opacity-100'}`} stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round">
                     {/* Foglie inferiori */}
                     <path d="M 200 260 C 165 260 150 240 150 230 C 170 230 185 245 200 260 Z" strokeWidth="4" />
                     <path d="M 200 260 C 235 260 250 240 250 230 C 230 230 215 245 200 260 Z" strokeWidth="4" />
                     {/* Bilanciere */}
                     <line x1="150" y1="185" x2="250" y2="185" strokeWidth="4.5" />
                     <line x1="155" y1="178" x2="155" y2="192" strokeWidth="4.5" />
                     <line x1="245" y1="178" x2="245" y2="192" strokeWidth="4.5" />
                     {/* Testa dell'omino */}
                     <circle cx="220" cy="165" r="6" strokeWidth="4" />
                     {/* Corpo e Braccia */}
                     <path d="M 195 185 Q 185 205 195 225" strokeWidth="4.5" />
                     <path d="M 195 190 L 210 200 L 225 185" strokeWidth="4" />
                     {/* Gambe */}
                     <path d="M 195 225 L 175 210 L 160 225" strokeWidth="4" />
                     <path d="M 195 225 L 215 240 L 225 240" strokeWidth="4" />
                  </g>
               </g>

               {/* ========================================================= */}
               {/* LA LETTERA "I" (Incolonnata sopra la A)                   */}
               {/* ========================================================= */}
               <g className={`transition-all duration-[1200ms] ease-out origin-top
                  ${fase === 0 ? 'scale-[20] opacity-100 translate-y-[150px]' : 'scale-100 opacity-100 translate-y-0'}
                  ${fase >= 3 ? 'opacity-0' : ''}
               `}>
                  <path d="M 140 -80 H 260 V -60 H 220 V 0 H 260 V 20 H 140 V 0 H 180 V -60 H 140 Z" fill="#84cc16" />
               </g>

            </g>

            {/* ========================================================= */}
            {/* SCRITTA "MNIFIT" (Slitta da destra nella Fase 3)          */}
            {/* ========================================================= */}
            <g className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1)
               ${fase >= 3 ? 'opacity-100 translate-x-[20px]' : 'opacity-0 translate-x-[80px]'}
            `}>
               <text x="210" y="235" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="110" letterSpacing="-4" fill="#334155">
                  MNI<tspan fill="#84cc16">FIT</tspan>
               </text>
            </g>

        </svg>

      </div>
    </div>
  );
}
