"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// MOCK DI 20 CARTE PER TESTARE LO SCROLL E LA SEQUENZA LUNGA
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
  { id: '10', nome: 'BCAA 8:1:1', tag: 'SCHEDA ESTRATTA', icon: '💪' },
  { id: '11', nome: 'MELATONINA', tag: 'SCHEDA ESTRATTA', icon: '🌙' },
  { id: '12', nome: 'CAFFEINA', tag: 'SCHEDA ESTRATTA', icon: '☕' },
  { id: '13', nome: 'BETA ALANINA', tag: 'SCHEDA ESTRATTA', icon: '🔥' },
  { id: '14', nome: 'GLUTAMMINA', tag: 'SCHEDA ESTRATTA', icon: '🧪' },
  { id: '15', nome: 'GINSENG', tag: 'SCHEDA ESTRATTA', icon: '根' },
  { id: '16', nome: 'MACA PERUVIANA', tag: 'SCHEDA ESTRATTA', icon: '⛰️' },
  { id: '17', nome: 'L-CARNITINA', tag: 'SCHEDA ESTRATTA', icon: '🩸' },
  { id: '18', nome: 'SPIRULINA', tag: 'SCHEDA ESTRATTA', icon: '🦠' },
  { id: '19', nome: 'COLLAGENE', tag: 'SCHEDA ESTRATTA', icon: '🦴' },
  { id: '20', nome: 'TRIBULUS', tag: 'SCHEDA ESTRATTA', icon: '🌱' }
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

  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setIsNearPocket(false);
    const x = info.offset.x;
    
    // ARCHIVIAZIONE CARTA (Swipe Destra)
    if (x > 100) {
      alert("Prodotto aggiunto alla Dispensa!");
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      // Se era l'ultima carta della lista, indietreggia l'indice, altrimenti lascialo fermo
      setIndiceAttuale((prev) => prev >= cards.length - 1 ? Math.max(0, cards.length - 2) : prev);
    } 
    // SCARTO CARTA (Swipe Sinistra)
    else if (x < -100) {
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      setIndiceAttuale((prev) => prev >= cards.length - 1 ? Math.max(0, cards.length - 2) : prev);
    }
  };

  return (
    <motion.div 
      className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
      // BLOCCA IL CLICK DESKTOP PER NON FAR CHIUDERE LA SCHERMATA
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* 
        BANDA "DISPENSA"
        z-[999] garantisce che la carta scivoli sotto.
        left: calc(50% + 140px) e right: -1000px la rendono distante dalla carta e senza fine.
      */}
      <div 
        className={`absolute top-[-500px] bottom-[-500px] z-[999] pointer-events-none flex items-center justify-start pl-3 sm:pl-4 rounded-l-[2rem] border-l-[3px] transition-all duration-300 ${
          isNearPocket
            ? 'bg-slate-700 border-orange-500 shadow-[-10px_0_30px_rgba(249,115,22,0.6),inset_5px_0_20px_rgba(249,115,22,0.2)]'
            : 'bg-slate-700/80 backdrop-blur-md border-slate-500 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]'
        }`}
        style={{ left: 'calc(50% + 140px)', right: '-1000px' }}
      >
        <span className={`text-[11px] font-black tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180 transition-colors duration-300 ${
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

          // RISOLTO ORDINE Z-INDEX
          if (isFront) {
            yPos = 0;
            zIndexCard = 50; // La carta centrale parte da 50
          } else if (isFuture) {
            yPos = -distanza * 30;
            scaleCard = 1 - (distanza * 0.05);
            opacityCard = 1 - (distanza * 0.15);
            zIndexCard = 40 - distanza; // Le carte da scorrere (in alto) stanno DIETRO la centrale (es. 39, 38)
          } else if (isPast) {
            yPos = 260 + (distanza * 38); 
            scaleCard = 1 + (distanza * 0.08); 
            opacityCard = distanza <= 5 ? 1 : 0; // Mostra fino a 5 carte in basso
            zIndexCard = 60 + distanza; // Le carte in basso COPRONO la centrale (es. 61, 62)
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
              // exit garantisce che quando una carta viene eliminata, sparisca morbidamente
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                y: yPos, 
                scale: scaleCard, 
                opacity: opacityCard,
                zIndex: zIndexCard 
              }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              
              // ACCENSIONE NEON
              onDrag={isFront ? (e, info) => setIsNearPocket(info.offset.x > 60) : undefined}
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
