import React from 'react';

// ==========================================
// LIBRERIA ANIMAZIONI SVG - PROTOCOLLO ANTI-SECCO
// ==========================================

// --- LOTTO 1: PETTO ---

const ChestBarbell = ({ color }: { color: string }) => (
  <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-md">
    {/* Panca */}
    <line x1="5" y1="35" x2="45" y2="35" stroke="#444" strokeWidth="4" strokeLinecap="round" />
    <line x1="12" y1="35" x2="12" y2="45" stroke="#444" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="35" x2="38" y2="45" stroke="#444" strokeWidth="2" strokeLinecap="round" />
    
    {/* Frame 1: Bilanciere al petto */}
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="32" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 19 33 L 32 33 L 40 42 L 40 48" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 23 33 L 26 26 L 23 20" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="20" x2="35" y2="20" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />
      <rect x="12" y="14" width="3" height="12" fill="#e5e5e5" rx="1" />
      <rect x="35" y="14" width="3" height="12" fill="#e5e5e5" rx="1" />
    </g>
    
    {/* Frame 2: Bilanciere in alto (Spinta) */}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="32" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 19 33 L 32 33 L 40 42 L 40 48" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 23 33 L 23 10" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="10" x2="35" y2="10" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />
      <rect x="12" y="4" width="3" height="12" fill="#e5e5e5" rx="1" />
      <rect x="35" y="4" width="3" height="12" fill="#e5e5e5" rx="1" />
    </g>
  </svg>
);

const ChestMachine = ({ color }: { color: string }) => (
  <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-md">
    {/* Struttura Macchinario e Seduta */}
    <path d="M 10 15 L 10 45 L 20 45" stroke="#444" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="25" y1="10" x2="25" y2="40" stroke="#555" strokeWidth="3" strokeLinecap="round" />
    <line x1="15" y1="40" x2="35" y2="40" stroke="#555" strokeWidth="3" strokeLinecap="round" />
    
    {/* Frame 1: Partenza (Mani vicine al petto) */}
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="20" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 14 24 L 14 35 L 25 45" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 14 24 L 20 28 L 22 24" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="20" x2="22" y2="28" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" />
      <rect x="20" y="15" width="4" height="15" fill="#e5e5e5" rx="1" />
    </g>
    
    {/* Frame 2: Spinta in avanti */}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="20" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 14 24 L 14 35 L 25 45" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 14 24 L 35 24" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="35" y1="20" x2="35" y2="28" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" />
      <rect x="33" y="15" width="4" height="15" fill="#e5e5e5" rx="1" />
    </g>
  </svg>
);

const ChestDumbbell = ({ color }: { color: string }) => (
  <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-md">
    {/* Panca */}
    <line x1="5" y1="35" x2="45" y2="35" stroke="#444" strokeWidth="4" strokeLinecap="round" />
    
    {/* Frame 1: Manubri in basso (Allungamento) */}
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="32" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 19 33 L 32 33 L 40 42" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 23 33 L 26 26 L 22 20" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="2.5" fill="#e5e5e5" />
      <circle cx="26" cy="20" r="2.5" fill="#e5e5e5" />
    </g>
    
    {/* Frame 2: Manubri chiusi in alto (Contrazione) */}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="32" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 19 33 L 32 33 L 40 42" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 23 33 L 23 10" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="10" r="2.5" fill="#e5e5e5" />
      <circle cx="26" cy="10" r="2.5" fill="#e5e5e5" />
    </g>
  </svg>
);

const ChestFlyeDb = ({ color }: { color: string }) => (
  <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-md">
    {/* Panca vista frontale (spessa) */}
    <line x1="20" y1="25" x2="30" y2="25" stroke="#444" strokeWidth="6" strokeLinecap="round" />
    
    {/* Frame 1: Braccia aperte */}
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="25" cy="20" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 25 24 L 25 45" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 25 24 L 10 20 M 25 24 L 40 20" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6" y="16" width="6" height="8" fill="#e5e5e5" rx="2" />
      <rect x="38" y="16" width="6" height="8" fill="#e5e5e5" rx="2" />
    </g>
    
    {/* Frame 2: Braccia chiuse in alto */}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="25" cy="20" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 25 24 L 25 45" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 25 24 L 22 10 M 25 24 L 28 10" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="18" y="6" width="6" height="8" fill="#e5e5e5" rx="2" />
      <rect x="26" y="6" width="6" height="8" fill="#e5e5e5" rx="2" />
    </g>
  </svg>
);


// ==========================================
// IL CERVELLO CHE ESPORTA L'ICONA CORRETTA A PAGE.TSX
// ==========================================
export const MediaVisualizer = ({ animKey, color }: { animKey: string, color: string }) => {
  return (
    <div className="w-16 h-16 bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center shadow-inner shrink-0 p-1">
      {(() => {
        switch (animKey) {
          // --- LOTTO 1: PETTO ---
          case 'chest_barbell': return <ChestBarbell color={color} />;
          case 'chest_machine': return <ChestMachine color={color} />;
          case 'chest_dumbbell': return <ChestDumbbell color={color} />;
          case 'chest_flye_db': return <ChestFlyeDb color={color} />;
          
          // Se l'animazione non è ancora stata creata, mostra un ingranaggio
          default: return (
             <div className="flex flex-col items-center opacity-50">
               <span className="text-xl">⚙️</span>
               <span className="text-[6px] text-white mt-1 uppercase">In Arrivo</span>
             </div>
          );
        }
      })()}
    </div>
  );
};
