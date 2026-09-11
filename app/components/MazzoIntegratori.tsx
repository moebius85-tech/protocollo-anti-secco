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

  // GESTORE UNICO DI TUTTI I MOVIMENTI (Sia Desktop che Mobile)
  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setIsNearPocket(false); // Spegne sempre il neon al rilascio
    
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;

    // SCROLL VERTICALE (Se il movimento Y è maggiore del movimento X)
    if (Math.abs(offsetY) > Math.abs(offsetX)) {
      if (offsetY > 40) {
        setIndiceAttuale((prev) => Math.min(prev + 1, cards.length - 1)); // Scorri Giù
      } else if (offsetY < -40) {
        setIndiceAttuale((prev) => Math.max(prev - 1, 0)); // Scorri Su
      }
    } 
    // ARCHIVIAZIONE ORIZZONTALE (Se il movimento X è maggiore)
    else {
      if (offsetX > 100) {
        // Swipe Destra (Dispensa)
        alert("Prodotto aggiunto alla Dispensa!");
        setCards((prev) => prev.filter((c) => c.id !== cardId));
        if (indiceAttuale >= cards.length - 1) {
          setIndiceAttuale(Math.max(cards.length - 2, 0));
        }
      } else if (offsetX < -100) {
        // Swipe Sinistra (Scarta)
        setCards((prev) => prev.filter((c) => c.id !== cardId));
        if (indiceAttuale >= cards.length - 1) {
          setIndiceAttuale(Math.max(cards.length - 2, 0));
        }
      }
    }
  };

  // ACCENSIONE NEON OTTIMIZZATA (Niente lag)
  const handleDrag = (e: any, info: any) => {
    if (info.offset.x > 60) {
      if (!isNearPocket) setIsNearPocket(true);
    } else {
      if (isNearPocket) setIsNearPocket(false);
    }
  };

  return (
    // Larghezza fissa (max-w-[360px]) e margin auto per tenere le bande sempre vicine alle carte su Desktop
    <motion.div 
      className="relative w-full max-w-[360px] mx-auto h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
    >
      {/* === BANDA LATERALE SINISTRA (Absolute: abbraccia il contenitore, non lo schermo) === */}
      <div className="absolute left-[-20px] top-0 bottom-0 w-12 bg-slate-800 shadow-[20px_0_40px_rgba(0,0,0,0.8)] z-[100] pointer-events-none flex items-center justify-center border-r border-slate-500 rounded-r-[2rem]">
      </div>

      {/* === BANDA LATERALE DESTRA (Absolute: abbraccia il contenitore, non lo schermo) === */}
      <div className={`absolute right-[-20px] top-0 bottom-0 w-12 transition-all duration-300 z-[100] pointer-events-none flex items-center justify-center rounded-l-[2rem] border-l-2 ${
        isNearPocket 
          ? 'bg-slate-800 border-orange-500 shadow-[-10px_0_30px_rgba(249,115,22,0.6),inset_5px_0_20px_rgba(249,115,22,0.2)]' 
          : 'bg-slate-800 border-slate-500 shadow-[-20px_0_40px_rgba(0,0,0,0.8)]'
      }`}>
        <span className={`text-[10px] font-black tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180 transition-colors duration-300 ${
          isNearPocket ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'text-slate-400 drop-shadow-sm'
        }`}>
          DISPENSA
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
              
              // ORA LA CARTA E' LIBERA DI MUOVERSI IN TUTTE LE DIREZIONI
              drag={isFront ? true : false} 
              // MA TORNA SEMPRE AL CENTRO COME UN ELASTICO
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
              dragElastic={0.6} // Rende il trascinamento morbido e soddisfacente
              
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
