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

  // Funzioni di scorrimento verticale
  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, cards.length - 1));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

  // Rileva lo swipe verticale su tutto il mazzo
  const handlePanEnd = (e: any, info: any) => {
    // Rileva solo se il movimento è prevalentemente verticale (ignora gli swipe laterali)
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y > 40) {
        // Swipe verso il Basso -> Tira in avanti le carte sul retro
        goNext();
      } else if (info.offset.y < -40) {
        // Swipe verso l'Alto -> Riporta su le carte finite in basso
        goPrev();
      }
    }
  };

  // Rileva lo swap laterale (solo sulla carta centrale) per archiviare
  const handleDragEnd = (event: any, info: any, cardId: string) => {
    const x = info.offset.x;
    if (x > 100 || x < -100) {
      alert("Prodotto aggiunto alla Dispensa!");
      
      // Elimina la carta dal mazzo
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      
      // Controllo di sicurezza se archiviamo l'ultima carta rimasta
      if (indiceAttuale >= cards.length - 1) {
        setIndiceAttuale(Math.max(cards.length - 2, 0));
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full h-[450px] flex justify-center items-center overflow-hidden bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
    >
      <AnimatePresence>
        {cards.map((card, index) => {
          // Logica delle posizioni
          const isFront = index === indiceAttuale; // CARTA CENTRALE
          const isPast = index < indiceAttuale;    // CARTE IN BASSO (Primo piano)
          const isFuture = index > indiceAttuale;  // CARTE IN ALTO (Profondità)
          const distanza = Math.abs(index - indiceAttuale);

          // Calcoliamo la grafica in base a dove si trova la carta
          let yPos = 0;
          let scaleCard = 1;
          let opacityCard = 1;

          if (isFront) {
            yPos = 0;
            scaleCard = 1;
            opacityCard = 1;
          } else if (isFuture) {
            // Stack in profondità (Dietro)
            yPos = -distanza * 35;
            scaleCard = 1 - (distanza * 0.05);
            opacityCard = 1 - (distanza * 0.15);
          } else if (isPast) {
            // Stack in primo piano (Basso)
            yPos = 260 + (distanza * 30); 
            scaleCard = 1; // Mantiene la dimensione reale
            opacityCard = 1;
          }

          return (
            <motion.div
              key={card.id}
              className="absolute w-[240px] h-[310px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.8)]"
              // Il trucco magico: la carta centrale ha z-index 50, quelle lontane hanno 49, 48, ecc.
              style={{ zIndex: 50 - distanza }}
              
              // Animazione FLUIDA (Niente molla, usa un glissando "tween")
              animate={{ y: yPos, scale: scaleCard, opacity: opacityCard }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              
              // Effetto sparizione quando la lanci via
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              
              // SWAP LATERALE (Permesso solo sulla carta centrale)
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={isFront ? (e, info) => handleDragEnd(e, info, card.id) : undefined}
            >
              
              {/* --- GRAFICA DELLA CARTA --- */}
              <div className="w-20 h-20 bg-[#E0E5EC] rounded-[1.5rem] shadow-[inset_5px_5px_10px_rgba(163,177,198,0.5),inset_-5px_-5px_10px_rgba(255,255,255,0.9)] flex items-center justify-center mb-6 text-4xl">
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
      
      {cards.length === 0 && (
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Archivio vuoto</p>
      )}
    </motion.div>
  );
};
