"use client";
import { useState, useEffect } from 'react';

export default function LineArtLogo() {
  const [isDrawing, setIsDrawing] = useState(false);

  // Auto-play all'avvio
  useEffect(() => {
    const timer = setTimeout(() => setIsDrawing(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Funzione per far ripartire l'animazione da zero
  const replayAnimation = () => {
    setIsDrawing(false);
    setTimeout(() => setIsDrawing(true), 100);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      {/* PANNELLO DI CONTROLLO */}
      <div className="absolute top-10 flex justify-center bg-white p-3 rounded-2xl shadow-xl z-50 text-sm">
        <button 
           onClick={replayAnimation} 
           className="px-6 py-2 bg-lime-500 text-white font-black tracking-wider rounded-lg hover:bg-lime-600 transition-all shadow-lg shadow-lime-500/30"
        >
           ↺ RIDISEGNA LOGO
        </button>
      </div>

      <div className="text-center mb-10 mt-12">
         <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Laboratorio Line Art</p>
         <p className="text-slate-700 font-black text-lg mt-1">Animazione Vettoriale Sequenziale</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[400px] h-[400px] border-2 border-dashed border-slate-300 rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* ViewBox calibrato sulle esatte proporzioni del disegno */}
        <svg viewBox="0 0 210 210" className="w-[80%] h-[80%] overflow-visible">
            
            {/* ========================================================= */}
            {/* 1. IL BILANCIERE E I DISCHI (Ritardo: 0s)                 */}
            {/* ========================================================= */}
            {/* Gli stili sono stati passati come attributi SVG puri per far felice TypeScript */}
            <g 
               fill="none" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400"
               style={{ strokeDashoffset: isDrawing ? 0 : 400, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0s' }}
            >
                {/* Asta centrale */}
                <path d="M 35 60 L 175 60" />
                {/* Dischi Sinistri (Interno più alto, esterno più basso) */}
                <path d="M 55 42 L 55 78" />
                <path d="M 43 50 L 43 70" />
                {/* Dischi Destri (Interno più alto, esterno più basso) */}
                <path d="M 155 42 L 155 78" />
                <path d="M 167 50 L 167 70" />
            </g>

            {/* ========================================================= */}
            {/* 2. LA TESTA E IL BRACCIO POSTERIORE (Ritardo: 0.3s)       */}
            {/* ========================================================= */}
            <g 
               fill="none" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400"
               style={{ strokeDashoffset: isDrawing ? 0 : 400, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s' }}
            >
                {/* Testa */}
                <circle cx="115" cy="35" r="7.5" />
                {/* Braccio sinistro (Quello dietro che afferra la barra) */}
                <path d="M 80 60 Q 75 85 102 80" />
            </g>

            {/* ========================================================= */}
            {/* 3. IL CORPO, LA GAMBA E IL BRACCIO FRONTALE (Ritardo: 0.6s)*/}
            {/* ========================================================= */}
            <g 
               fill="none" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400"
               style={{ strokeDashoffset: isDrawing ? 0 : 400, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s' }}
            >
                {/* Torso e Gamba Sinistra (Singola curva armonica a C) */}
                <path d="M 115 65 Q 65 110 45 130" />
                
                {/* Braccio destro (Quello davanti piegato) */}
                <path d="M 115 65 L 132 85 L 148 60" />
                
                {/* Gamba destra (Piegata in affondo, parte dall'anca) */}
                <path d="M 90 97 L 115 115 L 125 145" />
            </g>

            {/* ========================================================= */}
            {/* 4. LE FOGLIE INFERIORI (Ritardo: 0.9s)                    */}
            {/* ========================================================= */}
            <g 
               fill="none" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400"
               style={{ strokeDashoffset: isDrawing ? 0 : 400, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.9s' }}
            >
                {/* Curva inferiore unica (Unisce perfettamente i due lati) */}
                <path d="M 35 150 C 70 210, 140 210, 175 150" />
                
                {/* Bordo superiore Foglia Sinistra (Parte dalla punta e si unisce al centro esatto) */}
                <path d="M 35 150 Q 85 165 105 195" />
                
                {/* Bordo superiore Foglia Destra (Parte dalla punta e si unisce al centro esatto) */}
                <path d="M 175 150 Q 125 165 105 195" />
            </g>

        </svg>

      </div>
    </div>
  );
}
