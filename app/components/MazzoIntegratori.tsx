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
  card: Card;
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

  // Gestione unificata del drag per TUTTE le direzioni
  const handleDragEnd = (_e: any, info: any) => {
    const offX = info.offset.x;
    const offY = info.offset.y;

    // Se l'utente ha mosso il dito più in verticale che in orizzontale...
    if (Math.abs(offY) > Math.abs(offX)) {
      onDragProgress?.(0); // Azzera l'interfaccia laterale se aperta
      if (offY > 40) onSwipeVerticale?.(1); // Swipe verso il basso
      else if (offY < -40) onSwipeVerticale?.(-1); // Swipe verso l'alto
      return;
    }

    // Altrimenti, se il movimento è stato prevalentemente orizzontale
    if (offX > SOGLIA_ARCHIVIAZIONE || offX < -SOGLIA_ARCHIVIAZIONE) {
      const direzione = offX > 0 ? 1 : -1;
      onArchivia?.(direzione);
    } else {
      onDragProgress?.(0);
    }
  };

  return (
    <motion.div
      className={`absolute w-[240px] h-[310px] bg-[#E0E5EC] rounded-[2rem] flex flex-col items-center justify-center p-6 touch-none ${
        isFront ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      style={{
        x,
        WebkitFontSmoothing: 'antialiased',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
        pointerEvents: isFront ? 'auto' : 'none',
        boxShadow: isPast
          ? '6px 6px 14px rgba(163,177,198,0.4), -6px -6px 14px rgba(255,255,255,0.6)'
          : '5px 5px 12px rgba(163,177,198,0.35), -5px -5px 12px rgba(255,255,255,0.55)',
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
      
      // SBLOCCATO: Ora il drag è libero (true) su entrambi gli assi
      drag={isFront ? true : false} 
      
      // VINCOLI AL CENTRO: La carta farà resistenza elastica su tutti i 4 lati
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      
      onDrag={
        isFront
          ? (_e, info) => {
              // Animiamo la barra laterale "DISPENSA" solo usando l'offset X
              const progress = info.offset.x > 0 ? Math.min(info.offset.x / SOGLIA_ARCHIVIAZIONE, 1) : 0;
              onDragProgress?.(progress);
            }
          : undefined
      }
      onDragEnd={isFront ? handleDragEnd : undefined}
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
}
