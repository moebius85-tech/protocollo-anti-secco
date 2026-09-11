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
  
  // STATO PER LA TASCA LATERALE
  const [isNearPocket, setIsNearPocket] = useState(false);

  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, cards.length - 1));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

  const handlePanEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y > 40) goNext(); 
      else if (info.offset.y < -40) goPrev();
    }
  };

  // RILEVA QUANDO LA CARTA SI AVVICINA ALLA TASCA
  const handleDrag = (e: any, info: any) => {
    if (info.offset.x > 80) {
      setIsNearPocket(true); // Accende la tasca
    } else {
      setIsNearPocket(false); // Spegne la tasca
    }
  };

  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setIsNearPocket(false); // Resetta sempre la tasca al rilascio
    const x = info.offset.x;
    
    // Se la carta supera i 120px verso destra, viene archiviata
    if (x > 120) {
      alert("Prodotto aggiunto alla Dispensa!");
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      if (indiceAttuale >= cards.length - 1) {
        setIndiceAttuale(Math.max(cards.length - 2, 0));
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
    >
      {/* --- TASCA LATERALE "DISPENSA" --- */}
      <div 
        className={`absolute right-[-10px] top-1/2 -translate-y-1/2 w-[70px] h-[310px] rounded-l-[2rem] flex items-center justify-center transition-all duration-300 z-10 ${
          isNearPocket 
            ? 'bg-slate-700 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.1)] border-l border-orange-500/50' 
            : 'bg-slate-800/40 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] border-l border-white/10'
        }`}
      >
        <span 
          className={`text-[10px] font-black tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180 select-none transition-colors duration-300 ${
            isNearPocket ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'text-slate-400/50'
          }`}
        >
          DISPENSA INTEGRATORI
        </span>
      </div>

      <AnimatePresence>
        {cards.map((card, index) => {
          const isFront = index === indiceAttuale;
          const isFuture = index > indiceAttuale;
          const isPast = index < indiceAttuale;
          const distanza = Math.abs(index - indiceAttuale);

          // LOGICA POSIZIONI INTONSA - ESATTAMENTE COME PRIMA
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
              className="absolute w-[240px] h-[310px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6"
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
              
              // EVENTI DRAG AGGIORNATI PER LA TASCA
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 130 }} // Consente di tirare la carta a destra verso la tasca
              onDrag={isFront ? handleDrag : undefined} // Controlla l'avvicinamento
              onDragEnd={isFront ? (e, info) => handleDragEnd(e, info, card.id) : undefined}
            >
              <div className="w-20 h-20 bg-[#E0E5EC] rounded-[1.5rem] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] flex items-center justify-center mb-6 text-4xl">
                {card.icon}
              </div>
              <h3 className="text-slate-800 font-black tracking-widest text-lg text-center uppercase">
                {card.nome}
              </h3>
              <span className="text-orange-500 font-black text-[9px] uppercase tracking-[0.2em] mt-3">
                {card.tag}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
