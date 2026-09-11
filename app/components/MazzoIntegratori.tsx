"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mockup dei dati - li collegheremo poi al vero database
const integratoriMock = [
  { id: '1', nome: 'L-CITRULLINA', tag: 'SCHEDA ESTRATTA', icon: '💊' },
  { id: '2', nome: 'CREATINA', tag: 'SCHEDA ESTRATTA', icon: '⚡' },
  { id: '3', nome: 'OMEGA 3', tag: 'SCHEDA ESTRATTA', icon: '🐟' },
  { id: '4', nome: 'MAGNESIO', tag: 'SCHEDA ESTRATTA', icon: '🧬' },
  { id: '5', nome: 'ZINCO', tag: 'SCHEDA ESTRATTA', icon: '🛡️' },
];

export const MazzoIntegratori = () => {
  const [indiceAttuale, setIndiceAttuale] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    const soglia = 50; // Quanti pixel bastano per attivare il movimento
    const { x, y } = info.offset;

    // Il motore calcola se l'utente ha mosso il dito più in orizzontale o in verticale
    if (Math.abs(x) > Math.abs(y)) {
      // SWAP LATERALE (X) = SALVA IN DISPENSA
      if (x > soglia || x < -soglia) {
        alert(`Aggiunto alla dispensa: ${integratoriMock[indiceAttuale].nome}!`);
        // Dopo averlo salvato, passa automaticamente al prossimo
        setIndiceAttuale((prev) => Math.min(prev + 1, integratoriMock.length - 1));
      }
    } else {
      // SCORRIMENTO VERTICALE (Y) = SFOGLIA L'ARCHIVIO
      if (y < -soglia) {
        // Swipe su = Tira fuori la prossima carta
        setIndiceAttuale((prev) => Math.min(prev + 1, integratoriMock.length - 1));
      } else if (y > soglia) {
        // Swipe giù = Torna alla carta precedente
        setIndiceAttuale((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  return (
    <div className="relative w-full h-[450px] flex justify-center items-center overflow-hidden bg-transparent mb-6">
      <AnimatePresence>
        {integratoriMock.map((card, index) => {
          // Ottimizzazione: calcoliamo solo le carte visibili
          if (index < indiceAttuale - 1 || index > indiceAttuale + 4) return null;

          const isFront = index === indiceAttuale;
          const isPast = index < indiceAttuale; // Le carte già sfogliate
          const distanza = index - indiceAttuale; // Quante carte ci sono in mezzo

          return (
            <motion.div
              key={card.id}
              // ESTETICA NEUMORFICA IDENTICA ALLA TUA IMMAGINE
              className="absolute w-[240px] h-[310px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.8)] cursor-grab active:cursor-grabbing"
              style={{ zIndex: 50 - Math.abs(distanza) }}
              
              // ANIMAZIONE ROLLO/SCHEDARIO
              initial={false}
              animate={{
                // Se sfogliata scende giù, altrimenti si impila indietro
                y: isPast ? 400 : -distanza * 30,
                scale: isPast ? 1 : 1 - distanza * 0.05,
                opacity: isPast ? 0 : 1 - (distanza * 0.15),
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              
              // REGOLE DI FISICA
              drag={isFront ? true : false} // Attiva il trascinamento a 360° solo per la carta davanti
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }} // Crea l'effetto molla per farla tornare al centro se non superi la soglia
              onDragEnd={isFront ? handleDragEnd : undefined}
            >
              
              {/* --- CONTENUTO CARTA --- */}
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
      
      {indiceAttuale >= integratoriMock.length && (
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Archivio terminato</p>
      )}
    </div>
  );
};
