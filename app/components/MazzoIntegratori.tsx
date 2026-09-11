"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// MOCK DI 20 CARTE
const integratoriMock = [
  { id: '1', nome: 'L-CITRULLINA', tag: 'SCHEDA ESTRATTA', icon: '💊' },
  { id: '2', nome: 'CREATINA', tag: 'SCHEDA ESTRATTA', icon: '⚡' },
  { id: '3', nome: 'OMEGA 3', tag: 'SCHEDA ESTRATTA', icon: '🐟' },
  { id: '4', nome: 'MAGNESIO', tag: 'SCHEDA ESTRATTA', icon: '🧬' },
  { id: '5', nome: 'ZINCO', tag: 'SCHEDA ESTRATTA', icon: '🛡️' },
  { id: '6', nome: 'ASHWAGANDHA', tag: 'SCHEDA ESTRATTA', icon: '🌿' },
  { id: '7', nome: 'VITAMINA D3', tag: 'SCHEDA ESTRATTA', icon: '☀️' },
  { id: '8', nome: 'PROTEINE WHEY', tag: 'SCHEDA ESTRATTA', icon: '🥛' },
  { id: '9', nome: 'MULTIVITAMINICO', tag: 'SCHEDA ESTRATTA', icon: '🍎' },
  { id: '10', nome: 'BCAA', tag: 'SCHEDA ESTRATTA', icon: '💪' },
  { id: '11', nome: 'MELATONINA', tag: 'SCHEDA ESTRATTA', icon: '🌙' },
  { id: '12', nome: 'CAFFEINA', tag: 'SCHEDA ESTRATTA', icon: '☕' },
  { id: '13', nome: 'BETA ALANINA', tag: 'SCHEDA ESTRATTA', icon: '🔥' },
  { id: '14', nome: 'GLUTAMMINA', tag: 'SCHEDA ESTRATTA', icon: '🧪' },
  { id: '15', nome: 'GINSENG', tag: 'SCHEDA ESTRATTA', icon: '🌱' },
  { id: '16', nome: 'MACA', tag: 'SCHEDA ESTRATTA', icon: '⛰️' },
  { id: '17', nome: 'L-CARNITINA', tag: 'SCHEDA ESTRATTA', icon: '🩸' },
  { id: '18', nome: 'SPIRULINA', tag: 'SCHEDA ESTRATTA', icon: '🦠' },
  { id: '19', nome: 'COLLAGENE', tag: 'SCHEDA ESTRATTA', icon: '🦴' },
  { id: '20', nome: 'TRIBULUS', tag: 'SCHEDA ESTRATTA', icon: '🌿' }
];

export const MazzoIntegratori = () => {
  const [cards, setCards] = useState(integratoriMock);
  const [indiceAttuale, setIndiceAttuale] = useState(0);
  const [isNearPocket, setIsNearPocket] = useState(false);

  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, cards.length - 1));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

  // GESTORE SCROLL: Funziona in tutta l'area perché è attaccato al contenitore
  const handlePanEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y > 40) goNext(); 
      else if (info.offset.y < -40) goPrev();
    }
  };

  // GESTORE DISPENSA (Swipe Laterale)
  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setIsNearPocket(false); // Spegne sempre il neon
    
    const x = info.offset.x;
    
    if (x > 100 || x < -100) {
      alert("Prodotto aggiunto alla Dispensa!");
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      if (indiceAttuale >= cards.length - 1) {
        setIndiceAttuale(Math.max(cards.length - 2, 0));
      }
    }
  };

  // ACCENSIONE NEON
  const handleDrag = (e: any, info: any) => {
    const near = info.offset.x > 50;
    if (near !== isNearPocket) setIsNearPocket(near);
  };

  return (
    <motion.div 
      className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
      onClick={(e) => e.stopPropagation()} // Impedisce al click del mouse di chiudere lo sfondo
    >
      
      {/* 
        BANDA INFINITA: 
        1. bg-slate-700 per uno stacco delicato
        2. right: -2000px e top/bottom -1000px nascondono i confini per sempre
        3. z-[200] garantisce che la carta ci scivoli sotto
      */}
      <div 
        className={`absolute top-[-1000px] bottom-[-1000px] z-[200] pointer-events-none flex items-center justify-start pl-3 sm:pl-4 rounded-l-[2rem] border-l-[3px] transition-all duration-300 ${
          isNearPocket
            ? 'bg-slate-700 border-orange-500 shadow-[-10px_0_30px_rgba(249,115,22,0.6),inset_5px_0_20px_rgba(249,115,22,0.2)]'
            : 'bg-slate-700 border-slate-500 shadow-[-10px_0_30px_rgba(0,0,0,0.4)]'
        }`}
        style={{ left: 'calc(50% + 140px)', right: '-2000px' }}
      >
        <span className={`text-[11px] font-black tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180 transition-colors duration-300 ${
          isNearPocket ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'text-slate-400 drop-shadow-sm'
        }`}>
          DISPENSA
        </span>
      </div>

      <AnimatePresence initial={false}>
        {cards.map((card, index) => {
          const isFront = index === indiceAttuale;
          const isFuture = index > indiceAttuale;
          const isPast = index < indiceAttuale;
          const distanza = Math.abs(index - indiceAttuale);

          let yPos = 0;
          let scaleCard = 1;
          let opacityCard = 1;
          let zIndexCard = 50;

          if (isFront) {
            yPos = 0;
            zIndexCard = 100; // Carta attiva domina su tutte
          } else if (isFuture) {
            yPos = -distanza * 30;
            scaleCard = 1 - (distanza * 0.05);
            opacityCard = 1 - (distanza * 0.15);
            zIndexCard = 50 - distanza; 
          } else if (isPast) {
            yPos = 260 + (distanza * 38); 
            scaleCard = 1 + (distanza * 0.08); 
            opacityCard = distanza <= 5 ? 1 : 0; 
            
            // LA CORREZIONE DEL LIVELLO: 
            // Distanza 2 (più vecchia) ha z-index 52. Distanza 1 (più nuova) ha z-index 51.
            // La prima copre perfettamente la seconda!
            zIndexCard = 50 + distanza; 
          }

          return (
            <motion.div
              key={card.id}
              className={`absolute w-[240px] h-[310px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}
              style={{
                boxShadow: isPast 
                  ? "6px 6px 14px rgba(163,177,198,0.4), -6px -6px 14px rgba(255,255,255,0.6)"
                  : "5px 5px 12px rgba(163,177,198,0.35), -5px -5px 12px rgba(255,255,255,0.55)"
              }}
              animate={{ 
                y: yPos, 
                scale: scaleCard, 
                opacity: opacityCard,
                zIndex: zIndexCard 
              }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              
              // Svincola il drag orizzontale (carta) dal pan verticale (sfondo)
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              
              onDrag={isFront ? handleDrag : undefined}
              onDragEnd={isFront ? (e, info) => handleDragEnd(e, info, card.id) : undefined}
            >
              <div className="w-20 h-20 bg-[#E0E5EC] rounded-[1.5rem] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] flex items-center justify-center mb-6 text-4xl pointer-events-none">
                {card.icon}
              </div>
              <h3 className="text-slate-800 font-black tracking-widest text-lg text-center uppercase pointer-events-none">
                {card.nome}
              </h3>
              <span className="text-orange-500 font-black text-[9px] uppercase tracking-[0.2em] mt-3 pointer-events-none">
                {card.tag}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
