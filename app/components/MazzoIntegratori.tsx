"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate as animateValore } from 'framer-motion';

// --- TIPI AGGIORNATI PER SUPPORTARE OPEN FOOD FACTS ---
export type OffProduct = {
  id: string;
  tipologia: string;
  marchio: string;
  nome: string; 
  cho: string;
  pro: string;
  fat: string;
  immagine?: string;
  tag: string;
  icon?: string;
};

type Ruolo = 'front' | 'past' | 'future' | 'exiting';

function interpolaColore(hexA: string, hexB: string, progress: number) {
  const p = Math.min(Math.max(progress, 0), 1);
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const rA = (a >> 16) & 255, gA = (a >> 8) & 255, bA = a & 255;
  const rB = (b >> 16) & 255, gB = (b >> 8) & 255, bB = b & 255;
  const r = Math.round(rA + (rB - rA) * p);
  const g = Math.round(gA + (gB - gA) * p);
  const bl = Math.round(bA + (bB - bA) * p);
  return `rgb(${r}, ${g}, ${bl})`;
}

const SOGLIA_ARCHIVIAZIONE = 120;
const DURATA_USCITA = 0.28;
const DISTANZA_USCITA = 650;

function Carta({
  card,
  ruolo,
  distanza,
  direzioneUscita,
  onDragProgress,
  onArchivia,
  onSwipeVerticale,
  onUscitaCompletata,
}: {
  card: OffProduct;
  ruolo: Ruolo;
  distanza: number;
  direzioneUscita?: 1 | -1;
  onDragProgress?: (p: number) => void;
  onArchivia?: (direzione: 1 | -1) => void;
  onSwipeVerticale?: (direzione: 1 | -1) => void;
  onUscitaCompletata?: () => void;
}) {
  const x = useMotionValue(0);
  const isFront = ruolo === 'front';
  const isFuture = ruolo === 'future';
  const isPast = ruolo === 'past';
  const isExiting = ruolo === 'exiting';

  useEffect(() => {
    if (!isFront && !isExiting) {
      x.set(0);
    }
  }, [isFront, isExiting, x]);

  useEffect(() => {
    if (isExiting && direzioneUscita) {
      const controls = animateValore(x, direzioneUscita * DISTANZA_USCITA, {
        duration: DURATA_USCITA,
        ease: 'easeIn',
      });
      controls.then(() => {
        onUscitaCompletata?.();
      });
      return () => controls.stop();
    }
  }, [isExiting, direzioneUscita]);

  let yPos = 0;
  let scaleCard = 1;
  let opacityCard = 1;
  let zIndexCard = 50;

  if (isFront) {
    yPos = 0;
    zIndexCard = 50;
  } else if (isFuture) {
    yPos = -distanza * 30;
    scaleCard = 1 - distanza * 0.05;
    opacityCard = 1 - distanza * 0.15;
    zIndexCard = 50 - distanza;
  } else if (isPast) {
    yPos = 260 + distanza * 38;
    scaleCard = 1 + distanza * 0.08;
    opacityCard = distanza <= 5 ? 1 : 0;
    zIndexCard = 50 + distanza;
  } else if (isExiting) {
    yPos = 0;
    zIndexCard = 100; 
  }

  const handleDragEnd = (_e: any, info: any) => {
    const offX = info.offset.x;
    const offY = info.offset.y;

    if (Math.abs(offY) > Math.abs(offX)) {
      onDragProgress?.(0); 
      if (offY > 40) onSwipeVerticale?.(1); 
      else if (offY < -40) onSwipeVerticale?.(-1); 
      return;
    }

    if (offX > SOGLIA_ARCHIVIAZIONE || offX < -SOGLIA_ARCHIVIAZIONE) {
      const direzione = offX > 0 ? 1 : -1;
      onArchivia?.(direzione);
    } else {
      onDragProgress?.(0);
    }
  };

  const handlePanEnd = (_e: any, info: any) => {
    const offX = info.offset.x;
    const offY = info.offset.y;

    if (Math.abs(offY) > Math.abs(offX)) {
      if (offY > 40) onSwipeVerticale?.(1); 
      else if (offY < -40) onSwipeVerticale?.(-1); 
    }
  };

  return (
    <motion.div
      className={`absolute w-[240px] h-[310px] bg-[var(--superficie)] rounded-[2rem] flex flex-col items-center justify-center p-6 touch-none ${
        isFront ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      style={{
        x,
        WebkitFontSmoothing: 'antialiased',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
        pointerEvents: isExiting || opacityCard === 0 ? 'none' : 'auto',
        boxShadow: isPast
          ? '6px 6px 14px var(--ombra-scura), -6px -6px 14px var(--ombra-chiara)'
          : '5px 5px 12px var(--ombra-scura), -5px -5px 12px var(--ombra-chiara)',
      }}
      initial={false}
      animate={{
        y: yPos,
        scale: scaleCard,
        opacity: isExiting ? 0 : opacityCard,
        zIndex: zIndexCard,
      }}
      transition={{
        y: { type: 'tween', duration: 0.35, ease: 'easeOut' },
        scale: { type: 'tween', duration: 0.35, ease: 'easeOut' },
        opacity: { type: 'tween', duration: isExiting ? DURATA_USCITA : 0.35, ease: 'easeOut' },
        zIndex: { delay: isPast ? 0.35 : 0, duration: 0 },
      }}
      drag={isFront ? true : false} 
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDrag={
        isFront
          ? (_e, info) => {
              const progress = info.offset.x > 0 ? Math.min(info.offset.x / SOGLIA_ARCHIVIAZIONE, 1) : 0;
              onDragProgress?.(progress);
            }
          : undefined
      }
      onDragEnd={isFront ? handleDragEnd : undefined}
      onPanEnd={!isFront ? handlePanEnd : undefined}
    >
      {/* RIQUADRO NEUMORFICO ORIGINALE */}
      <div className="w-20 h-20 bg-[var(--superficie)] rounded-[1.5rem] shadow-[inset_3px_3px_6px_var(--ombra-scura),inset_-3px_-3px_6px_var(--ombra-chiara)] flex items-center justify-center mb-6 text-4xl pointer-events-none overflow-hidden relative shrink-0">
        {card.immagine ? (
           <div className="w-full h-full bg-white flex items-center justify-center p-2">
             <img src={card.immagine} alt={card.nome} className="max-h-full max-w-full object-contain mix-blend-multiply" />
           </div>
        ) : (
           <span>{card.icon || '💊'}</span>
        )}
      </div>

      <h3 className="text-slate-800 font-black tracking-widest text-[15px] text-center uppercase pointer-events-none leading-tight line-clamp-2 w-full px-2">
        {card.nome}
      </h3>
      <span className="text-orange-500 font-black text-[9px] uppercase tracking-[0.2em] mt-3 pointer-events-none">
        {card.tag}
      </span>
    </motion.div>
  );
}

type Props = {
  categoria: string;
  onClose: () => void;
  onSave: (item: OffProduct) => void;
  onCustom: () => void;
};

export const MazzoIntegratori = ({ categoria, onClose, onSave, onCustom }: Props) => {
  const [cards, setCards] = useState<OffProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [indiceAttuale, setIndiceAttuale] = useState(0);
  const [dragProgress, setDragProgress] = useState(0);
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [direzioneUscita, setDirezioneUscita] = useState<1 | -1>(1);

  // FETCH LIVE CON RETE DI SICUREZZA (ANTI-CRASH)
  useEffect(() => {
    async function fetchDaOpenFoodFacts() {
      setLoading(true);
      let risultatiFormattati: OffProduct[] = [];

      try {
        const termineRicerca = categoria.toLowerCase().replace("l-", "").replace("d3", "d").trim(); 
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${termineRicerca}&search_simple=1&action=process&json=1&page_size=10`);
        const data = await res.json();
        
        // Verifica se l'API ha restituito davvero dei prodotti
        const prodottiTrovati = Array.isArray(data.products) ? data.products : [];

        risultatiFormattati = prodottiTrovati
          .filter((p: any) => p.image_front_url && p.product_name) 
          .slice(0, 8) 
          .map((p: any) => ({
            id: p.code,
            tipologia: categoria,
            marchio: p.brands ? p.brands.split(',')[0] : 'Sconosciuto',
            nome: p.brands ? `${p.brands.split(',')[0]}` : p.product_name,
            immagine: p.image_front_url,
            cho: Math.round(p.nutriments?.carbohydrates_100g || 0).toString(),
            pro: Math.round(p.nutriments?.proteins_100g || 0).toString(),
            fat: Math.round(p.nutriments?.fat_100g || 0).toString(),
            tag: 'DATABASE ONLINE'
          }));
      } catch (err) {
        console.error("Errore fetch OFF (il sistema userà il fallback):", err);
      }

      // SE IL DATABASE NON TROVA NULLA O VA IN ERRORE, CREA UNA CARTA GENERICA 
      if (risultatiFormattati.length === 0) {
        risultatiFormattati.push({
          id: `generic-${Date.now()}`,
          tipologia: categoria,
          marchio: 'Generico',
          nome: categoria.toUpperCase(),
          tag: 'SCHEDA GENERICA',
          icon: '💊',
          cho: '0', pro: '0', fat: '0'
        });
      }

      // LA TUA CARTA SCANNER A.I. ORIGINALE SEMPRE ALLA FINE
      const customCard: OffProduct = { 
        id: 'custom', tipologia: categoria, marchio: 'Custom', 
        nome: 'SCANSIONA ETICHETTA', tag: 'A.I. SCANNER', icon: '📸', 
        cho: '0', pro: '0', fat: '0' 
      };

      setCards([...risultatiFormattati, customCard]);
      setLoading(false);
    }

    if (categoria) {
      fetchDaOpenFoodFacts();
    }
  }, [categoria]);

  const visibleCards = exitingId ? cards.filter((c) => c.id !== exitingId) : cards;

  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, Math.max(0, visibleCards.length - 1)));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

  const handleSwipeVerticale = (direzione: 1 | -1) => {
    if (direzione === 1) goNext();
    else goPrev();
  };

  const handleArchivia = (cardId: string, direzione: 1 | -1) => {
    setExitingId(cardId);
    setDirezioneUscita(direzione);
    setDragProgress(1);

    setIndiceAttuale((curr) => {
      const nuovaLunghezza = cards.length - 1;
      if (curr >= nuovaLunghezza) return Math.max(0, nuovaLunghezza - 1);
      return curr;
    });
  };

  const handleUscitaCompletata = () => {
    const swipedCard = cards.find(c => c.id === exitingId);
    
    setCards((prev) => prev.filter((c) => c.id !== exitingId));
    setExitingId(null);
    setDragProgress(0);

    if (direzioneUscita === 1 && swipedCard) {
      if (swipedCard.id === 'custom') {
        onCustom(); 
      } else {
        onSave(swipedCard); 
      }
    } else if (direzioneUscita === -1 && swipedCard?.id === 'custom') {
      onClose();
    }
  };

  const indiceVisibile = new Map<string, number>();
  visibleCards.forEach((c, i) => indiceVisibile.set(c.id, i));

  if (loading) {
    return (
      <div className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6" onClick={(e) => e.stopPropagation()}>
         <div className="w-[240px] h-[310px] bg-[var(--superficie)] rounded-[2rem] shadow-[5px_5px_12px_var(--ombra-scura),-5px_-5px_12px_var(--ombra-chiara)] flex flex-col items-center justify-center p-6 animate-pulse border border-[var(--bordo-tenue)]">
            <div className="w-20 h-20 bg-[var(--superficie)] rounded-[1.5rem] shadow-[inset_3px_3px_6px_var(--ombra-scura),inset_-3px_-3px_6px_var(--ombra-chiara)] flex items-center justify-center mb-6">
               <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-slate-400 font-black tracking-widest text-[14px] text-center uppercase">RICERCA...</h3>
         </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6" onClick={(e) => e.stopPropagation()}>
      
      {/* LINGUETTA LATERALE DISPENSA ARANCIONE */}
      <div
        className="absolute top-[-1000px] bottom-[-1000px] z-[999] pointer-events-none flex items-center justify-start pl-3 sm:pl-4 rounded-l-[2rem]"
        style={{
          left: 'calc(50% + 140px)',
          right: '-2000px',
          backgroundColor: interpolaColore('#1e293b', '#0f172a', dragProgress),
          borderLeftStyle: 'solid',
          borderLeftWidth: `${3 + dragProgress}px`,
          borderColor: interpolaColore('#475569', '#ff6600', dragProgress),
          transition: 'background-color 0.12s linear, border-color 0.12s linear, border-left-width 0.12s linear',
        }}
      >
        <span
          className="text-[11px] font-black tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180"
          style={{ color: interpolaColore('#64748b', '#ff6600', dragProgress), transition: 'color 0.12s linear' }}
        >
          SALVA IN DISPENSA
        </span>
      </div>

      <button onClick={onClose} className="absolute top-0 right-4 text-slate-400 hover:text-white text-3xl font-bold z-[100] transition-colors bg-transparent border-none cursor-pointer">
        &times;
      </button>

      {/* RENDER CARTE CON LOGICA SCORRIMENTO */}
      {cards.map((card) => {
        if (card.id === exitingId) {
          return (
            <Carta
              key={card.id}
              card={card}
              ruolo="exiting"
              distanza={0}
              direzioneUscita={direzioneUscita}
              onUscitaCompletata={handleUscitaCompletata}
            />
          );
        }

        const idx = indiceVisibile.get(card.id)!;
        const isFront = idx === indiceAttuale;
        const isFuture = idx > indiceAttuale;
        const distanza = Math.abs(idx - indiceAttuale);
        const ruolo: Ruolo = isFront ? 'front' : isFuture ? 'future' : 'past';

        return (
          <Carta
            key={card.id}
            card={card}
            ruolo={ruolo}
            distanza={distanza}
            onDragProgress={ruolo === 'front' ? setDragProgress : undefined}
            onArchivia={ruolo === 'front' ? (dir) => handleArchivia(card.id, dir) : undefined}
            onSwipeVerticale={handleSwipeVerticale} 
          />
        );
      })}
    </div>
  );
};
