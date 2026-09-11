"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const integratoriMock = [
  { id: '1', nome: 'L-CITRULLINA', tag: 'SCHEDA ESTRATTA', icon: '💊' },
  { id: '2', nome: 'CREATINA', tag: 'SCHEDA ESTRATTA', icon: '⚡' },
  { id: '3', nome: 'OMEGA 3', tag: 'SCHEDA ESTRATTA', icon: '🐟' },
  { id: '4', nome: 'MAGNESIO', tag: 'SCHEDA ESTRATTA', icon: '🧬' },
  { id: '5', nome: 'ZINCO', tag: 'SCHEDA ESTRATTA', icon: '🛡️' },
  { id: '6', nome: 'ASHWAGANDHA', tag: 'SCHEDA ESTRATTA', icon: '🌿' },
];

export const MazzoIntegratori = () => {
  const [cards, setCards] = useState(integratoriMock);
  const [indiceAttuale, setIndiceAttuale] = useState(0);
  const [isNearPocket, setIsNearPocket] = useState(false); // Effetto magnetico tasca

  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, cards.length - 1));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

  const handlePanEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y > 40) goNext(); 
      else if (info.offset.y < -40) goPrev();
    }
  };

  const handleDrag = (e: any, info: any) => {
    // Se trasciniamo la carta verso destra oltre gli 80px, accendiamo il magnete della tasca
    if (info.offset.x > 80) {
      setIsNearPocket(true);
    } else {
      setIsNearPocket(false);
    }
  };

  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setIsNearPocket(false);
    const x = info.offset.x;
    if (x > 120) {
      // SWIPE VERSO LA TASCA DESTRA: ARCHIVIAZIONE
      alert("Prodotto inglobato nella Dispensa!");
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      if (indiceAttuale >= cards.length - 1) {
        setIndiceAttuale(Math.max(cards.length - 2, 0));
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full max-w-[360px] h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
    >
      {/* --- LA TASCA / BARRA LATERALE DESTRA A CONTRASTO CON INTARSIO --- */}
      <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-14 h-[330px] bg-[#d3dbe6] rounded-l-[2rem] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] flex items-center justify-center border-l border-white/40 z-20 pointer-events-none">
        
        {/* Intarsio curvo della forma della carta */}
        <div className={`absolute right-2 w-4 h-32 rounded-full transition-all duration-300 ${isNearPocket ? 'bg-orange-400/40 shadow-[0_0_15px_rgba(249,115,22,0.6)]' : 'bg-[#c5d0de] shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff]'}`}></div>

        {/* Scritta verticale */}
        <span className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-500 [writing-mode:vertical-rl] rotate-180 drop-shadow-sm select-none">
          DISPENSA INTEGRATORI
        </span>
      </div>

      <AnimatePresence>
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
            zIndexCard = 50;
          } else if (isFuture) {
            yPos = -distanza * 30;
            scaleCard = 1 - (distanza * 0.05);
            opacityCard = 1 - (distanza * 0.15);
            zIndexCard = 50 - distanza; 
          } else if (isPast) {
            yPos = 260 + (distanza * 38); 
            scaleCard = 1 + (distanza * 0.08); 
            opacityCard = distanza <= 5 ? 1 : 0; 
            zIndexCard = 60 + distanza; 
          }

          return (
            <motion.div
              key={card.id}
              className="absolute w-[240px] h-[310px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 cursor-grab active:cursor-grabbing"
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
              
              // TRASCINAMENTO ORIZZONTALE E VERTICALE PER LA TASCA
              drag={isFront ? "x" : false}
              dragConstraints={{ left: -10, right: 150 }} // Permette di tirarla verso la tasca a destra
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
