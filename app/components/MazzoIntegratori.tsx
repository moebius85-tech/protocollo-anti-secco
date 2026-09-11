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

  // IL MOTORE UNICO: Gestisce sia lo swipe (Dispensa) che lo scroll (Su/Giù)
  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setIsNearPocket(false); // Spegne sempre il neon
    
    const x = info.offset.x;
    const y = info.offset.y;
    const vX = info.velocity.x;
    const vY = info.velocity.y;

    // Se l'utente muove il dito più in orizzontale che in verticale
    if (Math.abs(x) > Math.abs(y)) {
      if (x > 80 || vX > 400) { // Dispensa (Destra)
        alert("Prodotto aggiunto alla Dispensa!");
        setCards((prev) => prev.filter((c) => c.id !== cardId));
        setIndiceAttuale((prev) => prev >= cards.length - 1 ? Math.max(0, cards.length - 2) : prev);
      } else if (x < -80 || vX < -400) { // Scarta (Sinistra)
        setCards((prev) => prev.filter((c) => c.id !== cardId));
        setIndiceAttuale((prev) => prev >= cards.length - 1 ? Math.max(0, cards.length - 2) : prev);
      }
    } 
    // Se l'utente muove il dito più in verticale che in orizzontale (SCROLL)
    else {
      if (y > 40 || vY > 300) goNext(); // Scorri Giù
      else if (y < -40 || vY < -300) goPrev(); // Scorri Su
    }
  };

  // ACCENSIONE NEON ANTI-FLICKER
  const handleDrag = (e: any, info: any) => {
    const near = info.offset.x > 50;
    if (near !== isNearPocket) setIsNearPocket(near);
  };

  return (
    <div 
      className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onClick={(e) => e.stopPropagation()} // Impedisce al click del mouse di chiudere lo sfondo
    >
      
      {/* 
        BANDA INFINITA: 
        1. bg-[#1e293b] è leggermente più chiaro per staccarsi dallo sfondo nero
        2. right: -1000px nasconde i bordi tagliati all'infinito sia su desk che mobile
        3. Nessun effetto blur che fa sfarfallare gli smartphone
      */}
      <div 
        className={`absolute top-[-500px] bottom-[-500px] z-[999] pointer-events-none flex items-center justify-start pl-3 sm:pl-4 rounded-l-[2rem] border-l-[3px] transition-all duration-300 ${
          isNearPocket
            ? 'bg-[#1e293b] border-orange-500 shadow-[-10px_0_30px_rgba(249,115,22,0.6),inset_5px_0_20px_rgba(249,115,22,0.2)]'
            : 'bg-[#1e293b] border-slate-600 shadow-[-10px_0_30px_rgba(0,0,0,0.4)]'
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
          
          // LA REGOLA D'ORO PER I LIVELLI: La carta centrale è sempre la più alta (100)
          const zIndexCard = 100 - distanza;

          if (isFront) {
            yPos = 0;
          } else if (isFuture) {
            yPos = -distanza * 30;
            scaleCard = 1 - (distanza * 0.05);
            opacityCard = 1 - (distanza * 0.15);
          } else if (isPast) {
            yPos = 260 + (distanza * 38); 
            scaleCard = 1 + (distanza * 0.08); 
            opacityCard = distanza <= 5 ? 1 : 0; // Mostra le 5 carte inferiori
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
              // Animazioni pulite: rimosso initial/exit per distruggere il flickering
              animate={{ 
                y: yPos, 
                scale: scaleCard, 
                opacity: opacityCard,
                zIndex: zIndexCard 
              }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              
              // TRASCINAMENTO LIBERO (Il motore fa tutto in onDragEnd)
              drag={isFront ? true : false}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.7}
              
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
  );
};
