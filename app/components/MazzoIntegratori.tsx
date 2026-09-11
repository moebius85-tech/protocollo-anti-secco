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
  const [isNearPocket, setIsNearPocket] = useState(false);

  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, cards.length - 1));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

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
      className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
    >
      
      {/* --- TASCA LATERALE INFALLIBILE (Incollata al bordo schermo) --- */}
      <div className={`fixed right-0 top-1/2 -translate-y-1/2 h-[350px] w-[50px] rounded-l-[1.5rem] flex items-center justify-center transition-all duration-300 pointer-events-none z-[10000] ${
        isNearPocket 
          ? 'bg-slate-800 shadow-[-10px_0_30px_rgba(249,115,22,0.4)] border-l-2 border-orange-500' 
          : 'bg-slate-800/90 shadow-[-5px_0_20px_rgba(0,0,0,0.5)] border-l border-white/10'
      }`}>
        <span className={`text-[10px] font-black tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180 transition-colors duration-300 ${
          isNearPocket ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'text-slate-400'
        }`}>
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
              // Aggiungiamo un z-index base inferiore a quello della tasca, così scivola sotto
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
              
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 180 }}
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
