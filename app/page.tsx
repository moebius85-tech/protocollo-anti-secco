"use client";
import { useState, useEffect } from 'react';

export default function LogoAnimato() {
  const [fase, setFase] = useState(0);

  // GESTIONE AUTOMATICA DELL'ANIMAZIONE
  useEffect(() => {
    if (fase === 0) {
      // Dopo mezzo secondo, fa scendere la "A"
      const timer = setTimeout(() => setFase(1), 500);
      return () => clearTimeout(timer);
    } else if (fase === 1) {
      // Dopo 1.2 secondi, disegna gli anelli e il cerchio centrale
      const timer = setTimeout(() => setFase(2), 1200);
      return () => clearTimeout(timer);
    }
  }, [fase]);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[500px] h-[500px] overflow-hidden">
        
        {/* Il ViewBox è centrato esattamente sulla coordinata 250, 250 */}
        <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
            
            {/* ========================================================= */}
            {/* GRUPPO DI DISCESA DELLA "A" E DEGLI ANELLI                */}
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

               {/* L2: LA LETTERA "A" (TRACCIATO UNICO, NO PEZZE SCURE) */}
               <path 
                  fillRule="evenodd"
                  d="
                     M 226.66 85 H 273.33 
                     L 423.33 445 H 381.33 
                     L 356.34 385 H 143.66 
                     L 118.67 445 H 76.66 Z 
                     
                     M 250 129.8 
                     L 164.5 335 H 335.5 Z
                  "
                  fill="#334155"
               />

               {/* L3: L'ANELLO VERDE (DAVANTI, COPRE LE GAMBE INTERNE) */}
               <circle 
                   cx="250" cy="250" r="109" fill="none" stroke="#84cc16" strokeWidth="48"
                   strokeDasharray="685" strokeDashoffset={fase >= 2 ? 0 : 685}
                   style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
               />

               {/* L4: VERTICE E BARRA (L'INCASTRO) */}
               {/* Riportano la A in primo piano sopra il cerchio verde */}
               <g>
                  {/* Vertice in alto: copre l'anello ma mantiene il buco centrale! */}
                  <path d="M 226.66 85 H 273.33 L 329.59 220 H 287.59 L 250 129.8 L 212.41 220 H 170.41 Z" fill="#334155" />
                  
                  {/* Barra orizzontale: taglia l'anello in basso */}
                  <polygon points="122.5,335 377.5,335 398.34,385 101.66,385" fill="#334155" />
               </g>

            </g>

            {/* ========================================================= */}
            {/* L5: IL CERCHIO BIANCO (PRIMISSIMO PIANO)                  */}
            {/* Tangenza esterna R=85. Passando sopra le gambe interne    */}
            {/* della A (L4), crea gli angoli appuntiti perfetti.         */}
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
