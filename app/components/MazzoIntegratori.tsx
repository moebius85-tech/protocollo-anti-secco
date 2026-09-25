"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OffProduct = {
  id: string; tipologia: string; marchio: string;
  cho: string; pro: string; fat: string; immagine?: string;
};

type Props = {
  categoria: string; // Es. "L-Citrullina" o "Creatina"
  onClose: () => void;
  onSave: (item: OffProduct) => void;
  onCustom: () => void; // Trigger per aprire lo scanner AI
};

export function MazzoIntegratori({ categoria, onClose, onSave, onCustom }: Props) {
  const [cards, setCards] = useState<OffProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch live da Open Food Facts all'apertura
  useEffect(() => {
    async function fetchDaOpenFoodFacts() {
      setLoading(true);
      try {
        // Puliamo il termine di ricerca per OFF
        const termineRicerca = categoria.toLowerCase().replace("l-", ""); 
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${termineRicerca}&search_simple=1&action=process&json=1&page_size=8`);
        const data = await res.json();
        
        const risultati: OffProduct[] = data.products
          .filter((p: any) => p.image_front_url) // Mostriamo solo quelli con un'immagine bella
          .map((p: any) => ({
            id: p.code,
            tipologia: categoria,
            marchio: p.brands ? `${p.brands.split(',')[0]} - ${p.product_name}` : p.product_name,
            immagine: p.image_front_url,
            cho: (p.nutriments?.carbohydrates_100g || 0).toString(),
            pro: (p.nutriments?.proteins_100g || 0).toString(),
            fat: (p.nutriments?.fat_100g || 0).toString(),
          }));

        setCards(risultati);
      } catch (err) {
        console.error("Errore fetch OFF:", err);
      }
      setLoading(false);
    }
    fetchDaOpenFoodFacts();
  }, [categoria]);

  // Gestione dello swipe
  const handleDragEnd = (event: any, info: any, card: OffProduct | 'CUSTOM') => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      // Swipe a Destra = SALVA
      if (card === 'CUSTOM') {
        onCustom();
      } else {
        onSave(card);
      }
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe a Sinistra = SCARTA (Rimuove la carta dall'array locale)
      if (card !== 'CUSTOM') {
        setCards((prev) => prev.slice(0, -1));
      } else {
        onClose(); // Se scarti la custom, chiudi il mazzo
      }
    }
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center pointer-events-auto">
      <div className="absolute -top-12 text-center w-full z-50">
        <h3 className="text-white font-black uppercase tracking-widest text-sm drop-shadow-md">
          {categoria}
        </h3>
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-1">
          Swipe Destra = Salva in dispensa
        </p>
      </div>

      <button onClick={onClose} className="absolute -top-14 right-0 text-white text-3xl font-bold opacity-50 hover:opacity-100 z-50 transition-opacity">
        &times;
      </button>

      {loading ? (
        <div className="w-64 h-80 bg-[var(--superficie-alt)] border border-[var(--bordo-tenue)] rounded-[2rem] flex flex-col items-center justify-center animate-pulse">
           <div className="w-10 h-10 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mb-4"></div>
           <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Cerco nel Database...</span>
        </div>
      ) : (
        <AnimatePresence>
          {/* CARTA FALLBACK CUSTOM (Sempre l'ultima in fondo al mazzo) */}
          <motion.div
            key="custom-card"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => handleDragEnd(e, info, 'CUSTOM')}
            className="absolute w-64 h-80 bg-[var(--superficie-alt)] border-2 border-lime-500 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center p-6 cursor-grab active:cursor-grabbing"
            style={{ zIndex: 0 }}
          >
            <span className="text-4xl mb-4">📸</span>
            <h4 className="text-white font-black text-center text-lg uppercase tracking-wide">Scatta tu</h4>
            <p className="text-[10px] text-slate-400 font-bold text-center mt-2">Non trovi il tuo marchio? Swipe a destra per scansionare l'etichetta con l'A.I.</p>
          </motion.div>

          {/* CARTE TROVATE SU OPEN FOOD FACTS */}
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => handleDragEnd(e, info, card)}
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ x: 300, opacity: 0, rotate: 15 }} // Animazione quando scartata/salvata
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute w-64 h-80 bg-[var(--superficie)] border border-[var(--bordo-card)] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden cursor-grab active:cursor-grabbing"
              style={{
                zIndex: index + 1, // Le carte più in alto nell'array stanno sopra
                transform: `rotate(${Math.random() * 4 - 2}deg)`, // Leggera inclinazione random
              }}
            >
              {card.immagine ? (
                 <div className="w-full h-40 bg-white flex items-center justify-center p-4">
                   <img src={card.immagine} alt={card.marchio} className="max-h-full object-contain mix-blend-multiply" />
                 </div>
              ) : (
                 <div className="w-full h-40 bg-slate-800 flex items-center justify-center">
                   <span className="text-4xl">💊</span>
                 </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between bg-[var(--superficie-card)]">
                 <h4 className="text-white font-black text-[13px] uppercase leading-tight line-clamp-2">{card.marchio}</h4>
                 <div className="flex justify-between items-center mt-4 pt-3 border-t border-[var(--bordo-tenue)]">
                    <span className="text-[9px] font-bold text-slate-500">C: <span className="text-lime-500">{card.cho}g</span></span>
                    <span className="text-[9px] font-bold text-slate-500">P: <span className="text-slate-300">{card.pro}g</span></span>
                    <span className="text-[9px] font-bold text-slate-500">F: <span className="text-slate-300">{card.fat}g</span></span>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
