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
        <button onClick={() => setFase(2)} className="px-3 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600">2. Incastro 5 Livelli</button>
        <button onClick={() => setFase(3)} className="px-3 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600">3. MNIFIT</button>
        <button onClick={() => setFase(4)} className="px-3 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600">4. Pulizia</button>
      </div>

      <div className="text-center mb-6 mt-20">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Geometria Pura</p>
         <p className="text-slate-700 font-black text-lg mt-1">Tangenza Esterna e Incastro a 5 Piani</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[550px] h-[550px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* ViewBox allargato per gestire lo slittamento a sinistra */}
        <svg viewBox="-50 0 550 450" className="w-full h-full overflow-visible">
            
            {/* GRUPPO CENTRALE (I, A, O): Slitta verso sinistra nella Fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-120px]' : 'translate-x-0'}`}>

               {/* ========================================================= */}
               {/* L1: LIVELLO 1 - L'ANELLO VERDE (DIETRO)                   */}
               {/* ========================================================= */}
               <circle 
                   cx="240" cy="220" r="95" fill="none" stroke="#84cc16" strokeWidth="30"
                   strokeDasharray="600" strokeDashoffset={fase >= 2 ? 0 : 600}
                   style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* ========================================================= */}
               {/* L2: LIVELLO 2 - LA LETTERA "A" COMPLETA (PIANO MEDIO)     */}
               {/* ========================================================= */}
               {/* Più stretta, ma mantiene le pendenze per la tangenza!     */}
               <path 
                  className={`transition-all duration-1000 ease-out 
                     ${fase < 1 ? 'translate-y-[-60px] opacity-0' : 'translate-y-0 opacity-100'}
                     ${fase >= 3 ? '!opacity-0' : ''}
                  `}
                  fillRule="evenodd"
                  d="
                     M 211.67 80 H 268.33 L 401.67 400 H 356.67 L 331.67 340 H 148.33 L 123.33 400 H 78.33 Z 
                     M 240 120 L 315 300 H 165 Z
                  "
                  fill="#334155"
               />

               {/* ========================================================= */}
               {/* L3: LIVELLO 3 - L'ANELLO VERDE (DAVANTI)                  */}
               {/* Identico al Livello 1. Si sovrappone alla A grigia.       */}
               {/* ========================================================= */}
               <circle 
                   cx="240" cy="220" r="95" fill="none" stroke="#84cc16" strokeWidth="30"
                   strokeDasharray="600" strokeDashoffset={fase >= 2 ? 0 : 600}
                   style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* ========================================================= */}
               {/* L4: LIVELLO 4 - VERTICE FORATO E BARRA (L'INCASTRO)       */}
               {/* ========================================================= */}
               <g className={`transition-opacity duration-1000 
                   ${fase < 1 ? 'opacity-0' : 'opacity-100'}
                   ${fase >= 3 ? '!opacity-0' : ''}
               `}>
                  {/* Vertice in alto FORATO: Copre l'anello verde ai lati, ma lascia il BUCO centrale svelando il verde sottostante! */}
                  <path d="M 211.67 80 H 268.33 L 301.67 160 H 256.67 L 240 120 L 223.33 160 H 178.33 Z" fill="#334155" />
                  
                  {/* Barra orizzontale in basso: Poggia perfettamente sul cerchio bianco a Y=300 */}
                  <path d="M 165 300 H 315 L 331.67 340 H 148.33 Z" fill="#334155" />
               </g>

               {/* ========================================================= */}
               {/* L5: LIVELLO 5 - CERCHIO BIANCO + LOGO (PIANO FRONTALE)    */}
               {/* ========================================================= */}
               {/* Il cerchio R=80 è TANGENTE ESATTO alle linee esterne della A! */}
               <g className={`transition-opacity duration-700 ${fase >= 2 ? 'opacity-100 delay-100' : 'opacity-0'}`}>
                  {/* Cerchio di Sfondo Bianco (Taglia le gambe della A!) */}
                  <circle cx="240" cy="220" r="80" fill="#f1f5f9" />
                  
                  {/* Logo (Svanisce in Fase 4 per pulire la O) */}
                  <g 
                     className={`transition-opacity duration-700 ${fase >= 4 ? 'opacity-0' : 'opacity-100'}`} 
                     stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  >
                     {/* Foglie inferiori */}
                     <path d="M 240 280 C 195 280 180 250 180 240 C 205 240 220 260 240 280 Z" strokeWidth="4" />
                     <path d="M 240 280 C 285 280 300 250 300 240 C 275 240 260 260 240 280 Z" strokeWidth="4" />
                     {/* Bilanciere */}
                     <line x1="170" y1="190" x2="310" y2="190" strokeWidth="4.5" />
                     <line x1="176" y1="182" x2="176" y2="198" strokeWidth="4.5" />
                     <line x1="304" y1="182" x2="304" y2="198" strokeWidth="4.5" />
                     {/* Omino: Testa */}
                     <circle cx="260" cy="165" r="6" strokeWidth="4" />
                     {/* Omino: Schiena e Braccio */}
                     <path d="M 235 190 Q 220 215 235 240" strokeWidth="4.5" />
                     <path d="M 235 195 L 255 208 L 275 190" strokeWidth="4.5" />
                     {/* Omino: Gambe */}
                     <path d="M 235 240 L 210 225 L 185 245" strokeWidth="4.5" />
                     <path d="M 235 240 L 255 255 L 275 255" strokeWidth="4.5" />
                  </g>
               </g>

               {/* ========================================================= */}
               {/* LA LETTERA "I" IN CIMA                                    */}
               {/* ========================================================= */}
               <g className={`transition-all duration-[1200ms] ease-out origin-top
                  ${fase === 0 ? 'scale-[20] opacity-100 translate-y-[100px]' : 'scale-100 opacity-100 translate-y-0'}
                  ${fase >= 3 ? 'opacity-0' : ''}
               `}>
                  <path 
                     d="M 210 10 H 270 V 22 H 250 V 58 H 270 V 70 H 210 V 58 H 230 V 22 H 210 Z" 
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
