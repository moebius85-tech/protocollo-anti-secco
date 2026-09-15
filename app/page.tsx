"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button onClick={() => setFase(0)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">0. Reset</button>
        <button onClick={() => setFase(1)} className="px-4 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">1. Scende A</button>
        <button onClick={() => setFase(2)} className="px-4 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all">2. Incastro Tangente Perfetto</button>
        <button onClick={() => setFase(3)} className="px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition-all">3. Trasforma in MNIFIT</button>
      </div>

      <div className="text-center mb-6 mt-20">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Metodo Stencil a Livelli Matematici</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE (Allargato per accogliere la A in discesa) */}
      <div className="relative flex items-center justify-center w-[500px] h-[550px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox="0 0 480 480" className="w-full h-full overflow-visible">
            
            {/* GRUPPO CENTRALE: Slitta verso sinistra nella Fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-120px]' : 'translate-x-0'}`}>

               {/* ========================================================= */}
               {/* LIVELLO 1: L'ANELLO VERDE (Sfondo)                        */}
               {/* ========================================================= */}
               {/* Sbuca ai lati e si vede attraverso il foro in alto.       */}
               <circle 
                   cx="240" cy="220" r="90" fill="none" stroke="#84cc16" strokeWidth="60"
                   strokeDasharray="566" strokeDashoffset={fase >= 2 ? 0 : 566}
                   style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* ========================================================= */}
               {/* LIVELLO 2: LA LETTERA "A" (Lo Stencil)                    */}
               {/* ========================================================= */}
               {/* È UN SINGOLO TRACCIATO che include il buco in alto e      */}
               {/* la sbarra abbassata. Copre l'anello in modo millimetrico. */}
               <path 
                  className={`transition-all duration-1000 ease-out 
                     ${fase < 1 ? 'translate-y-[-60px] opacity-0' : 'translate-y-0 opacity-100'}
                     ${fase >= 3 ? '!opacity-0' : ''}
                  `}
                  fillRule="evenodd"
                  d="
                     M 211.5 80
                     L 268.5 80
                     L 441.6 380
                     L 401.6 380
                     L 378.5 340
                     L 101.5 340
                     L 78.4 380
                     L 38.4 380
                     Z
                     M 240 100
                     L 136.1 280
                     L 343.9 280
                     Z
                  "
                  fill="#334155"
               />

               {/* ========================================================= */}
               {/* LIVELLO 3: IL CERCHIO CHIARO (Piano di Lavoro Logo)       */}
               {/* ========================================================= */}
               {/* Ha r=60. È TANGENTE perfetto ai bordi interni della A     */}
               {/* e poggia millimetricamente sulla sbarra orizzontale.      */}
               <circle 
                   cx="240" cy="220" r="60" fill="#f1f5f9" 
                   className={`transition-opacity duration-700 ${fase >= 2 ? 'opacity-100 delay-100' : 'opacity-0'}`}
               />

               {/* ========================================================= */}
               {/* LIVELLO 4: IL LOGO CENTRALE (Omino e Foglie)              */}
               {/* ========================================================= */}
               {/* Ricalibrato per vivere esattamente dentro il cerchio chiaro*/}
               <g 
                  className={`transition-opacity duration-700 ${fase >= 2 && fase < 3 ? 'opacity-100 delay-300' : 'opacity-0'}`} 
                  stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round"
               >
                  {/* Foglie */}
                  <path d="M 240 268 C 205 268 190 248 190 238 C 215 238 225 253 240 268 Z" strokeWidth="4" />
                  <path d="M 240 268 C 275 268 290 248 290 238 C 265 238 255 253 240 268 Z" strokeWidth="4" />
                  
                  {/* Bilanciere */}
                  <line x1="188" y1="188" x2="292" y2="188" strokeWidth="4.5" />
                  <line x1="194" y1="182" x2="194" y2="194" strokeWidth="4.5" />
                  <line x1="286" y1="182" x2="286" y2="194" strokeWidth="4.5" />
                  
                  {/* Atleta: Testa */}
                  <circle cx="260" cy="165" r="5.5" strokeWidth="4" />
                  
                  {/* Atleta: Corpo e Braccia */}
                  <path d="M 235 188 Q 225 208 235 228" strokeWidth="4.5" />
                  <path d="M 235 193 L 250 203 L 265 188" strokeWidth="4" />
                  
                  {/* Atleta: Gambe in affondo */}
                  <path d="M 235 228 L 215 213 L 195 228" strokeWidth="4" />
                  <path d="M 235 228 L 255 243 L 270 243" strokeWidth="4" />
               </g>

               {/* ========================================================= */}
               {/* LA LETTERA "I" IN CIMA                                    */}
               {/* ========================================================= */}
               <g className={`transition-all duration-[1200ms] ease-out origin-top
                  ${fase === 0 ? 'scale-[20] opacity-100 translate-y-[100px]' : 'scale-100 opacity-100 translate-y-0'}
                  ${fase >= 3 ? 'opacity-0' : ''}
               `}>
                  <path 
                     d="M 211.5 15 H 268.5 V 27 H 250 V 63 H 268.5 V 75 H 211.5 V 63 H 230 V 27 H 211.5 Z" 
                     fill="#84cc16" 
                  />
               </g>

            </g>

            {/* ========================================================= */}
            {/* SCRITTA "MNIFIT" (Slitta da destra nella Fase 3)          */}
            {/* ========================================================= */}
            <g className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1)
               ${fase >= 3 ? 'opacity-100 translate-x-[15px]' : 'opacity-0 translate-x-[70px]'}
            `}>
               <text x="255" y="260" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="110" letterSpacing="-4" fill="#334155">
                  MNI<tspan fill="#84cc16">FIT</tspan>
               </text>
            </g>

        </svg>

      </div>
    </div>
  );
}
