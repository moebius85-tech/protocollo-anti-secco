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

  // GESTISCE SIA L'ACCENSIONE DEL NEON CHE LO SPEGNIMENTO
  const handleDrag = (e: any, info: any) => {
    if (info.offset.x > 60) setIsNearPocket(true);
    else setIsNearPocket(false);
  };

  // MOTORE UNICO INFALLIBILE: GESTISCE SIA LO SCROLL CHE L'ARCHIVIAZIONE
  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setIsNearPocket(false); // Spegne sempre il neon
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;

    // Se il movimento laterale è più forte di quello verticale
    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      if (offsetX > 100) {
        alert("Prodotto aggiunto alla Dispensa!");
        setCards((prev) => prev.filter((c) => c.id !== cardId));
        if (indiceAttuale >= cards.length - 1) {
          setIndiceAttuale(Math.max(cards.length - 2, 0));
        }
      } else if (offsetX < -100) {
        setCards((prev) => prev.filter((c) => c.id !== cardId));
        if (indiceAttuale >= cards.length - 1) {
          setIndiceAttuale(Math.max(cards.length - 2, 0));
        }
      }
    } 
    // Altrimenti è uno scorrimento (su/giù)
    else {
      if (offsetY > 40) goNext(); 
      else if (offsetY < -40) goPrev();
    }
  };

  return (
    // CONTENITORE FLEX A 3 COLONNE (Impossibile che si sovrappongano)
    <div className="w-full max-w-[420px] mx-auto h-[480px] flex flex-row items-center justify-between touch-none overflow-visible mb-6">
      
      {/* 1. COLONNA SINISTRA (Sipario fisso) */}
      <div className="relative w-10 sm:w-14 h-full bg-slate-800 z-[100] border-r border-slate-500 shadow-[10px_0_20px_rgba(0,0,0,0.6)] rounded-r-[2rem] pointer-events-none shrink-0">
      </div>

      {/* 2. COLONNA CENTRALE (Mazzo) */}
      <div className="relative w-[240px] h-[310px] flex items-center justify-center shrink-0">
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
                className={`absolute w-full h-full bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}
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
                
                // DRAG ATTIVO SOLO SULLA CARTA CENTRALE
                drag={isFront ? true : false} 
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
                dragElastic={0.6} // Rende la molla molto fluida e appagante
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
      </div>

      {/* 3. COLONNA DESTRA (Sipario Dispensa con Neon) */}
      <div className={`relative w-10 sm:w-14 h-full z-[100] border-l-2 rounded-l-[2rem] flex items-center justify-center transition-all duration-300 pointer-events-none shrink-0 ${
        isNearPocket 
          ? 'bg-slate-800 border-orange-500 shadow-[-10px_0_30px_rgba(249,115,22,0.8),inset_5px_0_20px_rgba(249,115,22,0.2)]' 
          : 'bg-slate-800 border-slate-500 shadow-[-10px_0_20px_rgba(0,0,0,0.6)]'
      }`}>
        <span className={`text-[10px] font-black tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180 transition-colors duration-300 ${
          isNearPocket ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'text-slate-400 drop-shadow-sm'
        }`}>
          DISPENSA
        </span>
      </div>

    </div>
  );
};
