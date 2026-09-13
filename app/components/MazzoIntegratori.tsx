"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate as animateValore } from 'framer-motion';
// Importa l'hook globale del tema
import { useTheme } from './ThemeProvider';

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
  { id: '10', nome: 'BCAA', tag: 'SCHEDA ESTRATTA', icon: '💪' }
];

type Card = typeof integratoriMock[number];
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
  card, ruolo, distanza, direzioneUscita, onDragProgress, onArchivia, onSwipeVerticale, onUscitaCompletata,
}: {
  card: Card; ruolo: Ruolo; distanza: number; direzioneUscita?: 1 | -1;
  onDragProgress?: (p: number) => void; onArchivia?: (direzione: 1 | -1) => void;
  onSwipeVerticale?: (direzione: 1 | -1) => void; onUscitaCompletata?: () => void;
}) {
  const { temaInfo } = useTheme(); // LEGGE IL TEMA GLOBALE
  
  const x = useMotionValue(0);
  const isFront = ruolo === 'front'; const isFuture = ruolo === 'future'; const isPast = ruolo === 'past'; const isExiting = ruolo === 'exiting';

  useEffect(() => { if (!isFront && !isExiting) x.set(0); }, [isFront, isExiting, x]);
  useEffect(() => {
    if (isExiting && direzioneUscita) {
      const controls = animateValore(x, direzioneUscita * DISTANZA_USCITA, { duration: DURATA_USCITA, ease: 'easeIn' });
      controls.then(() => onUscitaCompletata?.());
      return () => controls.stop();
    }
  }, [isExiting, direzioneUscita]);

  let yPos = 0; let scaleCard = 1; let opacityCard = 1; let zIndexCard = 50;
  if (isFront) { yPos = 0; zIndexCard = 50; }
  else if (isFuture) { yPos = -distanza * 30; scaleCard = 1 - distanza * 0.05; opacityCard = 1 - distanza * 0.15; zIndexCard = 50 - distanza; }
  else if (isPast) { yPos = 260 + distanza * 38; scaleCard = 1 + distanza * 0.08; opacityCard = distanza <= 5 ? 1 : 0; zIndexCard = 50 + distanza; }
  else if (isExiting) { yPos = 0; zIndexCard = 100; }

  const handleDragEnd = (_e: any, info: any) => {
    const offX = info.offset.x; const offY = info.offset.y;
    if (Math.abs(offY) > Math.abs(offX)) {
      onDragProgress?.(0); 
      if (offY > 40) onSwipeVerticale?.(1); else if (offY < -40) onSwipeVerticale?.(-1); 
      return;
    }
    if (offX > SOGLIA_ARCHIVIAZIONE || offX < -SOGLIA_ARCHIVIAZIONE) onArchivia?.(offX > 0 ? 1 : -1);
    else onDragProgress?.(0);
  };

  const handlePanEnd = (_e: any, info: any) => {
    const offX = info.offset.x; const offY = info.offset.y;
    if (Math.abs(offY) > Math.abs(offX)) {
      if (offY > 40) onSwipeVerticale?.(1); else if (offY < -40) onSwipeVerticale?.(-1); 
    }
  };

  return (
    <motion.div
      className={`absolute w-[240px] h-[310px] rounded-[2rem] flex flex-col items-center justify-center p-6 touch-none ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}
      style={{
        x, backgroundColor: temaInfo.sfondoCarta, WebkitFontSmoothing: 'antialiased', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)', willChange: 'transform, opacity, background-color',
        pointerEvents: isExiting || opacityCard === 0 ? 'none' : 'auto',
        boxShadow: isPast ? temaInfo.ombraCartaPast : temaInfo.ombraCartaFront,
        transition: 'background-color 0.4s ease, box-shadow 0.4s ease'
      }}
      initial={false}
      animate={{ y: yPos, scale: scaleCard, opacity: isExiting ? 0 : opacityCard, zIndex: zIndexCard }}
      transition={{
        y: { type: 'tween', duration: 0.35, ease: 'easeOut' }, scale: { type: 'tween', duration: 0.35, ease: 'easeOut' },
        opacity: { type: 'tween', duration: isExiting ? DURATA_USCITA : 0.35, ease: 'easeOut' }, zIndex: { delay: isPast ? 0.35 : 0, duration: 0 }
      }}
      drag={isFront ? true : false} dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.8}
      onDrag={isFront ? (_e, info) => onDragProgress?.(info.offset.x > 0 ? Math.min(info.offset.x / SOGLIA_ARCHIVIAZIONE, 1) : 0) : undefined}
      onDragEnd={isFront ? handleDragEnd : undefined} onPanEnd={!isFront ? handlePanEnd : undefined}
    >
      <div 
        className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-6 text-4xl pointer-events-none"
        style={{ backgroundColor: temaInfo.sfondoIcona, boxShadow: temaInfo.ombraIcona, transition: 'background-color 0.4s ease, box-shadow 0.4s ease' }}
      >
        {card.icon}
      </div>
      <h3 className={`${temaInfo.testoNome} font-black tracking-widest text-lg text-center uppercase pointer-events-none transition-colors duration-400`}>
        {card.nome}
      </h3>
      <span className={`${temaInfo.testoTag} font-black text-[9px] uppercase tracking-[0.2em] mt-3 pointer-events-none transition-colors duration-400`}>
        {card.tag}
      </span>
    </motion.div>
  );
}

export const MazzoIntegratori = () => {
  const [cards, setCards] = useState<Card[]>(integratoriMock);
  const [indiceAttuale, setIndiceAttuale] = useState(0);
  const [dragProgress, setDragProgress] = useState(0);
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [direzioneUscita, setDirezioneUscita] = useState<1 | -1>(1);
  
  const { temaInfo } = useTheme(); // LEGGE IL TEMA GLOBALE

  const visibleCards = exitingId ? cards.filter((c) => c.id !== exitingId) : cards;

  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, Math.max(0, visibleCards.length - 1)));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

  const handleSwipeVerticale = (direzione: 1 | -1) => direzione === 1 ? goNext() : goPrev();

  const handleArchivia = (cardId: string, direzione: 1 | -1) => {
    setExitingId(cardId); setDirezioneUscita(direzione); setDragProgress(1);
    setIndiceAttuale((curr) => { const nuovaLunghezza = cards.length - 1; return curr >= nuovaLunghezza ? Math.max(0, nuovaLunghezza - 1) : curr; });
  };

  const handleUscitaCompletata = () => {
    setCards((prev) => prev.filter((c) => c.id !== exitingId)); setExitingId(null); setDragProgress(0);
  };

  const indiceVisibile = new Map<string, number>();
  visibleCards.forEach((c, i) => indiceVisibile.set(c.id, i));

  return (
    <div className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6" onClick={(e) => e.stopPropagation()}>
      <div
        className="absolute top-[-1000px] bottom-[-1000px] z-[999] pointer-events-none flex items-center justify-start pl-3 sm:pl-4 rounded-l-[2rem]"
        style={{
          left: 'calc(50% + 140px)', right: '-2000px',
          backgroundColor: interpolaColore(temaInfo.barraColor1, temaInfo.barraColor2, dragProgress),
          borderLeftStyle: 'solid', borderLeftWidth: `${3 + dragProgress}px`,
          borderColor: interpolaColore(temaInfo.barraBorder1, temaInfo.barraBorder2, dragProgress),
          transition: 'background-color 0.12s linear, border-color 0.12s linear, border-left-width 0.12s linear',
        }}
      >
        <span
          className="text-[11px] font-black tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180"
          style={{ color: interpolaColore(temaInfo.barraText1, temaInfo.barraText2, dragProgress), transition: 'color 0.12s linear' }}
        >
          DISPENSA
        </span>
      </div>

      {cards.map((card) => {
        if (card.id === exitingId) return <Carta key={card.id} card={card} ruolo="exiting" distanza={0} direzioneUscita={direzioneUscita} onUscitaCompletata={handleUscitaCompletata} />;
        const idx = indiceVisibile.get(card.id)!;
        const isFront = idx === indiceAttuale; const isFuture = idx > indiceAttuale; const distanza = Math.abs(idx - indiceAttuale);
        const ruolo: Ruolo = isFront ? 'front' : isFuture ? 'future' : 'past';

        return (
          <Carta
            key={card.id} card={card} ruolo={ruolo} distanza={distanza}
            onDragProgress={ruolo === 'front' ? setDragProgress : undefined}
            onArchivia={ruolo === 'front' ? (dir) => handleArchivia(card.id, dir) : undefined}
            onSwipeVerticale={handleSwipeVerticale} 
          />
        );
      })}
    </div>
  );
};
