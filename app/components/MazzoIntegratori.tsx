"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, cards.length - 1));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

  const handlePanEnd = (e: any, info: any) => {
    // Traccia lo swipe verticale per scorrere il mazzo
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y > 40) {
        goNext(); // Trascini verso il basso -> sfogli in avanti
      } else if (info.offset.y < -40) {
        goPrev(); // Trascini verso l'alto -> torni indietro
      }
    }
  };

  const handleDragEnd = (event: any, info: any, cardId: string) => {
    const x = info.offset.x;
    if (x > 100 || x < -100) {
      alert("Prodotto aggiunto alla Dispensa!");
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      if (indiceAttuale >= cards.length - 1) {
        setIndiceAttuale(Math.max(cards.length - 2, 0));
      }
    }
  };

  return (
    <motion.div 
      // rimosso 'overflow-hidden' per permettere alle carte di uscire e creare l'effetto 3D
      className="relative w-full h-[450px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
    >
      {cards.map((card, index) => {
        const isFront = index === indiceAttuale;
        const isFuture = index > indiceAttuale;
        const isPast = index < indiceAttuale;
        const distanza = Math.abs(index - indiceAttuale);

        // Calcolo millimetrico delle posizioni per ricalcare la tua immagine
        let yPos = 0;
        let scaleCard = 1;
        let opacityCard = 1;
        let zIndexCard = 50 - distanza;

        if (isFront) {
          yPos = 0; // Carta al centro
        } else if (isFuture) {
          yPos = -distanza * 35; // Carte in attesa: salgono verso l'alto creando il mazzo
          scaleCard = 1 - (distanza * 0.06); // Si rimpiccioliscono in prospettiva
          opacityCard = 1 - (distanza * 0.2); // Sbiadiscono gradualmente
        } else if (isPast) {
          yPos = 250 + (distanza * 20); // Carta passata: scende in basso e fa "capolino"
          scaleCard = 1; 
          opacityCard = distanza === 1 ? 1 : 0; // Lasciamo visibile solo l'ultima sfogliata per pulizia visiva
        }

        return (
          <motion.div
            key={card.id}
            className="absolute w-[240px] h-[310px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.8)]"
            
            // Il trucco per rimuovere lo sfarfallio: inseriamo lo zIndex dentro animate!
            animate={{ 
              y: yPos, 
              scale: scaleCard, 
              opacity: opacityCard,
              zIndex: zIndexCard 
            }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            
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
    </motion.div>
  );
};
