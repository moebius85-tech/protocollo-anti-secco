"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Rimosso AnimatePresence che causava i blocchi

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

// Interpola tra due colori esadecimali in base a un valore "progress" da 0 a 1.
// Serve per far cambiare colore il banner GRADUALMENTE mentre trascini,
// invece di scattare di colpo a una soglia fissa.
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

// Distanza (in px) oltre la quale la carta viene archiviata.
// Aumentata rispetto a prima per dare più "spazio" a chi trascina piano
// di vedere l'effetto del banner cambiare colore prima dell'archiviazione.
const SOGLIA_ARCHIVIAZIONE = 120;

export const MazzoIntegratori = () => {
  const [cards, setCards] = useState(integratoriMock);
  const [indiceAttuale, setIndiceAttuale] = useState(0);
  // Non più un booleano acceso/spento: un numero da 0 (carta ferma) a 1
  // (carta al punto di archiviazione), aggiornato ad ogni movimento del dito.
  const [dragProgress, setDragProgress] = useState(0);

  const goNext = () => setIndiceAttuale((prev) => Math.min(prev + 1, cards.length - 1));
  const goPrev = () => setIndiceAttuale((prev) => Math.max(prev - 1, 0));

  const handlePanEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y > 40) goNext(); 
      else if (info.offset.y < -40) goPrev();
    }
  };

  const handleDragEnd = (event: any, info: any, cardId: string) => {
    setDragProgress(0);
    const x = info.offset.x;
    
    // ARCHIVIAZIONE ISTANTANEA
    if (x > SOGLIA_ARCHIVIAZIONE || x < -SOGLIA_ARCHIVIAZIONE) { 
      setCards((prevCards) => {
        const newCards = prevCards.filter((c) => c.id !== cardId);
        setIndiceAttuale((currIdx) => {
          if (currIdx >= newCards.length) return Math.max(0, newCards.length - 1);
          return currIdx;
        });
        return newCards;
      });
    }
  };

  return (
    <motion.div 
      className="relative w-full h-[480px] flex justify-center items-center bg-transparent mb-6 touch-none"
      onPanEnd={handlePanEnd}
      onClick={(e) => e.stopPropagation()} 
    >
      
      {/* BARRA LATERALE COLORATA — ora cambia colore GRADUALMENTE in base a quanto trascini */}
      <div 
        className="absolute top-[-1000px] bottom-[-1000px] z-[999] pointer-events-none flex items-center justify-start pl-3 sm:pl-4 rounded-l-[2rem]"
        style={{ 
          left: 'calc(50% + 140px)', 
          right: '-2000px',
          backgroundColor: interpolaColore('#1e293b', '#0f172a', dragProgress),
          borderLeftStyle: 'solid',
          borderLeftWidth: `${3 + dragProgress}px`,
          borderColor: interpolaColore('#475569', '#ff6600', dragProgress),
          // Transizione breve: segue il dito quasi in tempo reale mentre trascini,
          // ma quando rilasci (dragProgress torna a 0) fa un piccolo "assestamento" morbido.
          transition: 'background-color 0.12s linear, border-color 0.12s linear, border-left-width 0.12s linear',
        }}
      >
        <span 
          className="text-[11px] font-black tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180"
          style={{
            color: interpolaColore('#64748b', '#ff6600', dragProgress),
            transition: 'color 0.12s linear',
          }}
        >
          DISPENSA
        </span>
      </div>

      {cards.map((card, index) => {
        const isFront = index === indiceAttuale;
        const isFuture = index > indiceAttuale;
        const isPast = index < indiceAttuale;
        const distanza = Math.abs(index - indiceAttuale);

        let yPos = 0;
        let scaleCard = 1;
        let opacityCard = 1;
        let zIndexCard = 50;

        // LA LOGICA MATEMATICA CORRETTA PER I LIVELLI
        if (isFront) {
          yPos = 0;
          zIndexCard = 50; 
        } else if (isFuture) {
          yPos = -distanza * 30;
          scaleCard = 1 - (distanza * 0.05);
          opacityCard = 1 - (distanza * 0.15);
          zIndexCard = 50 - distanza; // Più lontane nel futuro = più basse
        } else if (isPast) {
          yPos = 260 + (distanza * 38); 
          scaleCard = 1 + (distanza * 0.08); 
          opacityCard = distanza <= 5 ? 1 : 0; 
          
          // LA REGOLA MAGICA CHE AVEVI CHIESTO:
          // Le carte più lontane nel passato (es. L-Citrullina, la prima scesa) hanno distanza maggiore
          // Quindi 50 + distanza dà un livello Z-Index altissimo (Es. 53).
          // Questo le mette IN PRIMO PIANO rispetto a quelle scese dopo (es. 52, 51).
          zIndexCard = 50 + distanza; 
        }

        return (
          <motion.div
            key={card.id}
            className={`absolute w-[240px] h-[310px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 touch-none ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}
            
            // Stile Fisso per le performance: niente lag!
            style={{
              WebkitFontSmoothing: "antialiased",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
              willChange: "transform, opacity",
              // Le carte non in primo piano non devono MAI intercettare il tocco,
              // altrimenti possono "rubare" il gesto alla carta giusta durante la transizione.
              pointerEvents: isFront ? "auto" : "none",
              boxShadow: isPast 
                ? "6px 6px 14px rgba(163,177,198,0.4), -6px -6px 14px rgba(255,255,255,0.6)"
                : "5px 5px 12px rgba(163,177,198,0.35), -5px -5px 12px rgba(255,255,255,0.55)"
            }}
            
            // initial={false} spegne il chaos di rimescolamento delle carte all'apertura del componente
            initial={false}
            animate={{ 
              y: yPos, 
              scale: scaleCard, 
              opacity: opacityCard,
              zIndex: zIndexCard
            }}
            transition={{ 
              y: { type: "tween", duration: 0.35, ease: "easeOut" },
              scale: { type: "tween", duration: 0.35, ease: "easeOut" },
              opacity: { type: "tween", duration: 0.35, ease: "easeOut" },
              // QUESTO è il punto chiave: se una carta sta DIVENTANDO "passata",
              // il suo z-index sale solo DOPO che ha finito di muoversi (0.35s),
              // così non copre mai la nuova carta in primo piano durante il tragitto.
              // Se invece sta diventando "in primo piano" o "futura", lo z-index
              // cambia subito, per restare sempre toccabile/coerente.
              zIndex: { delay: isPast ? 0.35 : 0, duration: 0 }
            }}
            
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            
            onDrag={isFront ? (e, info) => {
              // Solo lo scorrimento verso destra "riempie" il banner della dispensa.
              const progress = info.offset.x > 0 
                ? Math.min(info.offset.x / SOGLIA_ARCHIVIAZIONE, 1) 
                : 0;
              setDragProgress(progress);
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
    </motion.div>
  );
};
