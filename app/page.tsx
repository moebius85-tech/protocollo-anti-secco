"use client";
import { useState } from 'react';

export default function TestLogo() {
  const [fase, setFase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO MANUALE */}
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50">
        <button onClick={() => setFase(0)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">0. Reset</button>
        <button onClick={() => setFase(1)} className="px-4 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">1. Scendono I e A</button>
        <button onClick={() => setFase(2)} className="px-4 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-all">2. Appare O (Oblò)</button>
        <button onClick={() => setFase(3)} className="px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition-all">3. OMNIFIT Completo</button>
      </div>

      <div className="text-center mb-8 mt-24">
         <p className="text-slate-400 font-bold tracking-widest uppercase">Laboratorio Incastro Vettoriale</p>
         <p className="text-slate-500 text-sm mt-2">Usa i pulsanti per testare le sovrapposizioni</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE (Griglia 600x400) */}
      <div className="relative flex items-center justify-center w-[600px] h-[400px] border-2 border-dashed border-slate-300 rounded-3xl bg-[#f1f5f9] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* L'UNICO SVG. Il centro della A e della O è a coordinate X=300, Y=200 */}
        <svg viewBox="0 0 600 400" className="w-full h-full overflow-visible">
            
            {/* GRUPPO CENTRALE (I, A, O). Slitta a sinistra nella fase 3 */}
            <g className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 3 ? 'translate-x-[-100px]' : 'translate-x-0'}`}>

                {/* ======================================================== */}
                {/* LIVELLO 1 (SOTTOFONDO): LA "O" E IL LOGO                 */}
                {/* ======================================================== */}
                <g className="relative">
                    {/* Sfondo solido per l'oblò (simula il vuoto). Essendo dietro la A, non copre la A! */}
                    <circle cx="300" cy="225" r="45" fill="#f1f5f9" className={`transition-opacity duration-700 ${fase >= 2 ? 'opacity-100' : 'opacity-0'}`} />
                    
                    {/* Anello Verde della O */}
                    <circle cx="300" cy="225" r="45" fill="none" stroke="#84cc16" strokeWidth="20" strokeLinecap="square"
                        strokeDasharray="283"
                        strokeDashoffset={fase >= 2 ? 0 : 283}
                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                    />

                    {/* Logo Interno (Omino e Foglie) */}
                    <g 
                      className={`transition-opacity duration-700 ease-in-out ${fase >= 2 && fase < 4 ? 'opacity-100' : 'opacity-0'}`}
                      stroke="#84cc16" fill="none" strokeLinecap="round" strokeLinejoin="round"
                    >
                        {/* Foglie */}
                        <path d="M 300 258 C 265 258 255 240 255 230 C 275 230 290 245 300 258 Z" strokeWidth="4" />
                        <path d="M 300 258 C 335 258 345 240 345 230 C 325 230 310 245 300 258 Z" strokeWidth="4" />
                        
                        {/* Bilanciere */}
                        <line x1="265" y1="210" x2="335" y2="210" strokeWidth="4.5" />
                        <line x1="270" y1="205" x2="270" y2="215" strokeWidth="4.5" />
                        <line x1="330" y1="205" x2="330" y2="215" strokeWidth="4.5" />

                        {/* Testa */}
                        <circle cx="315" cy="195" r="5" strokeWidth="4" />

                        {/* Corpo e Braccia */}
                        <path d="M 292 210 Q 285 225 292 240" strokeWidth="4.5" />
                        <path d="M 292 215 L 305 225 L 316 210" strokeWidth="4" />

                        {/* Gambe */}
                        <path d="M 292 240 L 280 230 L 265 240" strokeWidth="4" />
                        <path d="M 292 240 L 305 250 L 315 250" strokeWidth="4" />
                    </g>
                </g>

                {/* ======================================================== */}
                {/* LIVELLO 2 (MEDIO): LA LETTERA "A"                        */}
                {/* ======================================================== */}
                <g className={`transition-all duration-1000 ease-out 
                   ${fase < 1 ? 'translate-y-[-100px] opacity-0' : 'translate-y-0 opacity-100'}
                   ${fase >= 3 ? 'opacity-0' : 'opacity-100'}
                `}>
                    {/* Tracciato A. Essendo disegnato *dopo* la O, si posiziona in primo piano! */}
                    <path 
                        d="M 275 90 H 325 L 380 280 H 340 L 325 230 H 275 L 260 280 H 220 Z M 282 205 H 318 L 300 130 Z" 
                        fill="#334155" 
                    />
                </g>

                {/* ======================================================== */}
                {/* LIVELLO 3 (FRONTALE): LA LETTERA "I"                     */}
                {/* ======================================================== */}
                <g className={`transition-all duration-[1200ms] ease-out origin-top
                   ${fase === 0 ? 'scale-[25] opacity-100' : 'scale-100 opacity-100'}
                   ${fase >= 3 ? 'opacity-0' : ''}
                `}>
                    <path 
                        d="M 265 20 H 335 V 40 H 310 V 110 H 335 V 130 H 265 V 110 H 290 V 40 H 265 Z" 
                        fill="#84cc16" 
                    />
                </g>

            </g>

            {/* ======================================================== */}
            {/* TESTO "MNIFIT" (Appare nella fase 3 slittando da destra) */}
            {/* ======================================================== */}
            <g className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1)
               ${fase >= 3 ? 'opacity-100 translate-x-[-10px]' : 'opacity-0 translate-x-[40px]'}
            `}>
                <text x="360" y="250" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="90" letterSpacing="-4" fill="#334155">
                    MNI<tspan fill="#84cc16">FIT</tspan>
                </text>
            </g>

        </svg>

      </div>
    </div>
  );
}
