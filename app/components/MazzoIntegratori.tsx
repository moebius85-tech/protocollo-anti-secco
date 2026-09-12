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

  const handlePanEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y > 40) goNext(); 
      else if (info.offset.y < -40) goPrev();
    }
  };

  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setIsNearPocket(false);
    const x = info.offset.x;
    
    if (x > 80 || x < -80) { 
      // RIMOZIONE ALERT: Niente più blocchi del browser o freeze dell'interfaccia!
      setCards((prev) => {
        const remainingCards = prev.filter((c) => c.id !== cardId);
        // Aggiorna l'indice in modo sicuro senza mai sforare la lunghezza del nuovo array
        setIndiceAttuale((currIdx) => {
          if (currIdx >= remainingCards.length) return Math.max(0, remainingCards.length - 1);
          return currIdx;
        });
        return remainingCards;
      });
    }
  };

  return (
    <motion.div 
      className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
      onClick={(e) => e.stopPropagation()} 
    >
      
      {/* 
        BARRA LATERALE TOTALMENTE REATTIVA
        Cambia colore di sfondo (più scuro per far risaltare il neon), e accende bordo e testo.
      */}
      <div 
        className="absolute top-[-1000px] bottom-[-1000px] z-[999] pointer-events-none flex items-center justify-start pl-3 sm:pl-4 rounded-l-[2rem] transition-all duration-200"
        style={{ 
          left: 'calc(50% + 140px)', 
          right: '-2000px',
          backgroundColor: isNearPocket ? '#020617' : '#1e293b', 
          borderLeftStyle: 'solid',
          borderLeftWidth: isNearPocket ? '4px' : '3px', 
          borderColor: isNearPocket ? '#ff6600' : '#475569',
        }}
      >
        <span 
          className="text-[11px] font-black tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180 transition-colors duration-200"
          style={{
            color: isNearPocket ? '#ff6600' : '#64748b',
          }}
        >
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

          // LA MATEMATICA DEFINITIVA DEI LIVELLI (Esattamente come l'hai chiesta)
          if (isFront) {
            yPos = 0;
            zIndexCard = 50; // La carta in uso sta a 50
          } else if (isFuture) {
            yPos = -distanza * 30;
            scaleCard = 1 - (distanza * 0.05);
            opacityCard = 1 - (distanza * 0.15);
            zIndexCard = 50 - distanza; // Quelle da svelare stanno dietro (49, 48...)
          } else if (isPast) {
            yPos = 260 + (distanza * 38); 
            scaleCard = 1 + (distanza * 0.08); 
            opacityCard = distanza <= 5 ? 1 : 0; 
            
            // LA MAGIA: 100 - distanza. 
            // Distanza 1 (appena scesa) = 99. Distanza 2 (scesa prima) = 98. 
            // La 99 copre la 98. Entrambe coprono la Centrale (50). Perfetto.
            zIndexCard = 100 - distanza; 
          }

          return (
            <motion.div
              key={card.id}
              className={`absolute w-[240px] h-[310px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 touch-none ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}
              
              // Z-Index e Ombre inserite qui in modo fisso per prevenire ogni singolo sfarfallio
              style={{
                zIndex: zIndexCard, 
                boxShadow: isPast 
                  ? "6px 6px 14px rgba(163,177,198,0.4), -6px -6px 14px rgba(255,255,255,0.6)"
                  : "5px 5px 12px rgba(163,177,198,0.35), -5px -5px 12px rgba(255,255,255,0.55)",
                WebkitFontSmoothing: "antialiased",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)",
                willChange: "transform, opacity"
              }}
              
              initial={{ 
                y: yPos, 
                scale: scaleCard, 
                opacity: opacityCard 
              }}
              animate={{ 
                y: yPos, 
                scale: scaleCard, 
                opacity: opacityCard
              }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              
              // IL SENSORE DEL COLORE DELLA BARRA: Si accende morbidamente
              onDrag={isFront ? (e, info) => {
                const isNear = info.offset.x > 30;
                if (isNear !== isNearPocket) setIsNearPocket(isNear);
              } : undefined}
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
