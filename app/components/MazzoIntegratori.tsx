import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Questi sono dati di esempio, poi li collegheremo al tuo database reale
const integratoriMock = [
  { id: '1', nome: 'L-CITRULLINA', tag: 'SCHEDA ESTRATTA', icon: '💊' },
  { id: '2', nome: 'CREATINA', tag: 'SCHEDA ESTRATTA', icon: '⚡' },
  { id: '3', nome: 'OMEGA 3', tag: 'SCHEDA ESTRATTA', icon: '🐟' },
  { id: '4', nome: 'MAGNESIO', tag: 'SCHEDA ESTRATTA', icon: '🧬' },
];

export const MazzoIntegratori = () => {
  const [cards, setCards] = useState(integratoriMock);

  // Funzione che scatta quando lasci andare la carta
  const handleDragEnd = (event: any, info: any, cardId: string) => {
    const swipeThreshold = 100; // Quanti pixel devi trascinare per archiviarla
    
    if (info.offset.x > swipeThreshold || info.offset.x < -swipeThreshold) {
      // SWIPE COMPLETATO: Rimuove la carta dal mazzo (qui poi aggiungeremo la logica per salvare nel carrello)
      setCards((prev) => prev.filter((card) => card.id !== cardId));
      console.log("Archiviato:", cardId); 
    }
  };

  return (
    <div className="relative w-full h-[400px] flex justify-center items-center overflow-hidden">
      <AnimatePresence>
        {cards.map((card, index) => {
          const isFront = index === 0; // Solo la prima carta si può muovere
          
          return (
            <motion.div
              key={card.id}
              // STILE GRAFICO IDENTICO ALLA TUA IMMAGINE
              className="absolute w-[240px] h-[300px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.5),-12px_-12px_24px_rgba(255,255,255,0.8)] cursor-grab active:cursor-grabbing"
              style={{ zIndex: cards.length - index }}
              
              // ANIMAZIONI 3D E FISICA
              initial={{ scale: 0.8, y: -60, opacity: 0 }}
              animate={{
                scale: 1 - index * 0.05, // Le carte dietro sono più piccole (1, 0.95, 0.90...)
                y: -index * 35,          // Le carte dietro sono spostate in alto per fare l'effetto mazzo
                opacity: 1 - index * 0.2 // Le carte dietro sfumano leggermente
              }}
              // Animazione di uscita quando fai lo swipe
              exit={{ x: 300, opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
              
              // TRASCINAMENTO (Drag)
              drag={isFront ? "x" : false} // Solo asse X (destra/sinistra)
              dragConstraints={{ left: 0, right: 0 }} // Effetto elastico
              onDragEnd={(e, info) => isFront && handleDragEnd(e, info, card.id)}
            >
              
              {/* --- CONTENUTO DELLA CARTA (Esattamente come il tuo design) --- */}
              <div className="w-20 h-20 bg-[#E0E5EC] rounded-3xl shadow-[inset_6px_6px_12px_rgba(163,177,198,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.8)] flex items-center justify-center mb-6 text-4xl">
                {card.icon}
              </div>
              <h3 className="text-slate-800 font-black tracking-wide text-lg text-center uppercase">
                {card.nome}
              </h3>
              <span className="text-orange-500 font-black text-[9px] uppercase tracking-[0.2em] mt-2">
                {card.tag}
              </span>
              
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {cards.length === 0 && (
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Hai sfogliato tutto!</p>
      )}
    </div>
  );
};
