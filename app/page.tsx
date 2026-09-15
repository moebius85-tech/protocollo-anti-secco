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
         <p className="text-slate-700 font-black text-lg mt-1">Animazione Vettoriale Organica</p>
      </div>

      {/* CONTENITORE DELL'ANIMAZIONE */}
      <div className="relative flex items-center justify-center w-[400px] h-[400px] border-2 border-dashed border-slate-300 rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* ViewBox calibrato sulle esatte proporzioni del disegno (0-210) */}
        <svg viewBox="0 0 210 210" className="w-[80%] h-[80%] overflow-visible">
            
            {/* ========================================================= */}
            {/* 1. IL BILANCIERE E I DISCHI (Ritardo: 0s)                 */}
            {/* ========================================================= */}
            <g 
               fill="none" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400"
               style={{ strokeDashoffset: isDrawing ? 0 : 400, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0s' }}
            >
                {/* Asta centrale */}
                <path d="M 35 60 L 175 60" />
                {/* Dischi Sinistri (Interno lungo, esterno corto) */}
                <path d="M 55 42 L 55 78" />
                <path d="M 43 50 L 43 70" />
                {/* Dischi Destri (Interno lungo, esterno corto) */}
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
                {/* Testa (Vuota all'interno, solo tratto) */}
                <circle cx="110" cy="35" r="8" />
                
                {/* Braccio sinistro (Posteriore) - Morbido arco dal bilanciere alla schiena */}
                <path d="M 80 60 Q 65 85 92 88" />
            </g>

            {/* ========================================================= */}
            {/* 3. IL CORPO E GLI ARTI ANTERIORI (Ritardo: 0.6s)          */}
            {/* ========================================================= */}
            <g 
               fill="none" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400"
               style={{ strokeDashoffset: isDrawing ? 0 : 400, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s' }}
            >
                {/* Schiena + Gamba Sinistra (Posteriore) - UNICA CURVA MORBIDA */}
                {/* Parte dal collo, scende all'anca e "spazza" all'indietro  */}
                <path d="M 110 60 Q 95 90 50 115" />
                
                {/* Braccio destro (Anteriore) - Forma a V */}
                <path d="M 110 60 L 130 85 L 145 60" />
                
                {/* Gamba destra (Anteriore) - Linea dritta diagonale dall'anca */}
                <path d="M 90 88 L 115 130" />
            </g>

            {/* ========================================================= */}
            {/* 4. LE FOGLIE INFERIORI (Ritardo: 0.9s)                    */}
            {/* ========================================================= */}
            <g 
               fill="none" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400"
               style={{ strokeDashoffset: isDrawing ? 0 : 400, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.9s' }}
            >
                {/* Curva inferiore unica (Parabola ampia) */}
                {/* Il vertice matematico esatto è a (105, 177.5) */}
                <path d="M 30 145 Q 105 210 180 145" />
                
                {/* Bordo superiore Foglia Sinistra (Dalla punta sinistra al vertice basso) */}
                <path d="M 30 145 Q 80 155 105 177.5" />
                
                {/* Bordo superiore Foglia Destra (Dalla punta destra al vertice basso) */}
                <path d="M 180 145 Q 130 155 105 177.5" />
            </g>

        </svg>

      </div>
    </div>
  );
}
