"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button onClick={() => setFase(0)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">0. Reset (Solo I)</button>
        <button onClick={() => setFase(1)} className="px-4 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">1. Scende A</button>
        <button onClick={() => setFase(2)} className="px-4 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all">2. Incastro Perfetto (O + Logo)</button>
        <button onClick={() => setFase(3)} className="px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition-all">3. Trasforma in MNIFIT</button>
      </div>

      <div className="text-center mb-6 mt-20">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Incastro Geometrico</p>
         <p className="text-slate-700 font-black text-lg mt-1">Verifica Tangenze e Piani di Sovrapposizione</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[460px] h-[540px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox="0 0 400 480" className="w-full h-full overflow-visible">
            
            {/* GRUPPO CENTRALE: Slitta verso sinistra nella Fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-100px]' : 'translate-x-0'}`}>

               {/* ========================================================= */}
               {/* LIVELLO 1 (DIETRO): IL CERCHIO VERDE DELLA "O"            */}
               {/* ========================================================= */}
               {/* Passa dietro la A. Risulta visibile sui lati esterni e     */}
               {/* nell'angolo superiore interno (vertice del triangolo).    */}
               <circle 
                   cx="200" cy="245" r="98" fill="none" stroke="#84cc16" strokeWidth="36"
                   strokeDasharray="616" strokeDashoffset={fase >= 2 ? 0 : 616}
                   style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* ========================================================= */}
               {/* LIVELLO 2 (INTERMEDIO): LA LETTERA "A" INTEGRATA          */}
               {/* ========================================================= */}
               {/* È un unico tracciato vettoriale solido (fillRule evenodd). */}
               {/* La sbarra orizzontale è continua e robusta da lato a lato. */}
               <path 
                  className={`transition-all duration-1000 ease-out 
                     ${fase < 1 ? 'translate-y-[-60px] opacity-0' : 'translate-y-0 opacity-100'}
                     ${fase >= 3 ? '!opacity-0' : ''}
                  `}
                  d="
                     M 172 110 H 228 L 340 410 H 285 L 255 330 H 145 L 115 410 H 60 Z 
                     M 200 138 L 248 275 H 152 Z
                  "
                  fill="#334155"
                  fillRule="evenodd"
               />

               {/* ========================================================= */}
               {/* LIVELLO 3 (PRIMO PIANO): IL CERCHIO CHIARO (OBLÒ)         */}
               {/* ========================================================= */}
               {/* Ha r=80. A Y=245 i lati esterni della A distano 80 dal     */}
               {/* centro: la A è esattamente TANGENTE al cerchio chiaro!     */}
               <circle 
                   cx="200" cy="245" r="80" fill="#f1f5f9" 
                   className={`transition-opacity duration-700 ${fase >= 2 ? 'opacity-100' : 'opacity-0'}`}
               />

               {/* ========================================================= */}
               {/* LIVELLO 4: IL LOGO CENTRALE (OMINO E FOGLIE)              */}
               {/* ========================================================= */}
               <g 
                  className={`transition-opacity duration-700 ${fase >= 2 && fase < 3 ? 'opacity-100 delay-300' : 'opacity-0'}`} 
                  stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round"
               >
                  {/* Foglie inferiori ricalcate sulla curvatura interna */}
                  <path d="M 200 316 C 168 316 154 298 154 288 C 174 288 188 302 200 316 Z" strokeWidth="3.8" />
                  <path d="M 200 316 C 232 316 246 298 246 288 C 226 288 212 302 200 316 Z" strokeWidth="3.8" />
                  
                  {/* Bilanciere */}
                  <line x1="148" y1="230" x2="252" y2="230" strokeWidth="4" />
                  <line x1="153" y1="223" x2="153" y2="237" strokeWidth="4" />
                  <line x1="247" y1="223" x2="247" y2="237" strokeWidth="4" />
                  
                  {/* Atleta: Testa */}
                  <circle cx="218" cy="212" r="5.5" strokeWidth="3.5" />
                  
                  {/* Atleta: Schiena e Braccia */}
                  <path d="M 194 230 Q 185 248 194 268" strokeWidth="4" />
                  <path d="M 194 234 L 208 244 L 222 230" strokeWidth="3.8" />
                  
                  {/* Atleta: Gambe in affondo */}
                  <path d="M 194 268 L 176 254 L 162 268" strokeWidth="3.8" />
                  <path d="M 194 268 L 214 282 L 226 282" strokeWidth="3.8" />
               </g>

               {/* ========================================================= */}
               {/* LIVELLO SUPERIORE: LA LETTERA "I"                         */}
               {/* ========================================================= */}
               <g className={`transition-all duration-[1200ms] ease-out origin-top
                  ${fase === 0 ? 'scale-[15] opacity-100 translate-y-[120px]' : 'scale-100 opacity-100 translate-y-0'}
                  ${fase >= 3 ? 'opacity-0' : ''}
               `}>
                  <path 
                     d="M 170 25 H 230 V 37 H 212 V 83 H 230 V 95 H 170 V 83 H 188 V 37 H 170 Z" 
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
               <text x="210" y="278" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="105" letterSpacing="-4" fill="#334155">
                  MNI<tspan fill="#84cc16">FIT</tspan>
               </text>
            </g>

        </svg>

      </div>
    </div>
  );
}
