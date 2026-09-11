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
  
  // Stato per illuminare la tasca quando ti avvicini
  const [isNearPocket, setIsNearPocket] = useState(false);

  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, cards.length - 1));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

  // RIPRISTINATO LO SCROLL ORIGINALE FUNZIONANTE
  const handlePanEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y > 40) goNext(); 
      else if (info.offset.y < -40) goPrev();
    }
  };

  const handleDrag = (e: any, info: any) => {
    if (info.offset.x > 80) {
      if (!isNearPocket) setIsNearPocket(true);
    } else {
      if (isNearPocket) setIsNearPocket(false);
    }
  };

  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setIsNearPocket(false);
    const x = info.offset.x;
    
    if (x > 120) {
      alert("Prodotto inserito nella Dispensa!");
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      if (indiceAttuale >= cards.length - 1) {
        setIndiceAttuale(Math.max(cards.length - 2, 0));
      }
    }
  };

  return (
    <motion.div 
      // RIMOSSO IL MAX-W CHE ROMPEVA LO SCROLL: ORA È W-FULL E FUNZIONA OVUNQUE
      className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
    >
      
      {/* --- LA TASCA "A FORMA DI C" (Esattamente come il tuo schizzo) --- */}
      <div className="absolute right-0 top-0 bottom-0 w-[45px] flex flex-col z-[70] pointer-events-none">
        
        {/* Blocco Superiore: DISPENSA */}
        <div className="flex-1 bg-slate-800 rounded-bl-[1.5rem] shadow-[-4px_4px_10px_rgba(0,0,0,0.3)] flex items-end justify-center pb-4">
          <span className={`text-[10px] font-black tracking-[0.2em] uppercase [writing-mode:vertical-rl] rotate-180 transition-colors duration-300 ${isNearPocket ? 'text-orange-400' : 'text-slate-400'}`}>
            DISPENSA
          </span>
        </div>

        {/* L'Intarsio Curvo (La "Bocca" dello Slot) */}
        <div className="h-[250px] w-full flex justify-end items-center relative">
          <div className={`w-2 h-[80%] rounded-l-[1rem] transition-all duration-300 ${isNearPocket ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]' : 'bg-slate-800 shadow-[-2px_0_8px_rgba(0,0,0,0.4)]'}`}></div>
          {/* Frecce indicative che compaiono */}
          <div className={`absolute right-4 text-orange-400 text-xl font-bold transition-opacity duration-300 ${isNearPocket ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>
            &raquo;
          </div>
        </div>

        {/* Blocco Inferiore: INTEGRATORI */}
        <div className="flex-1 bg-slate-800 rounded-tl-[1.5rem] shadow-[-4px_-4px_10px_rgba(0,0,0,0.3)] flex items-start justify-center pt-4">
          <span className={`text-[10px] font-black tracking-[0.2em] uppercase [writing-mode:vertical-rl] rotate-180 transition-colors duration-300 ${isNearPocket ? 'text-orange-400' : 'text-slate-400'}`}>
            INTEGRATORI
          </span>
        </div>

      </div>

      <AnimatePresence>
        {cards.map((card, index) => {
          const isFront = index === indiceAttuale;
          const isFuture = index > indiceAttuale;
          const isPast = index < indiceAttuale;
          const distanza = Math.abs(index - indiceAttuale);

          // LOGICA 3D PERFETTA: INTONSA E RIPRISTINATA!
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
              
              // EVENTI DRAG AGGIORNATI
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 150 }}
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
