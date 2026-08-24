import React from 'react';

// ==========================================
// LIBRERIA ANIMAZIONI SVG (Lotto 1: Spinta / Petto)
// ==========================================

const ChestBarbell = ({ color }: { color: string }) => (
  <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-md">
    <line x1="5" y1="35" x2="45" y2="35" stroke="#444" strokeWidth="4" strokeLinecap="round" />
    <line x1="12" y1="35" x2="12" y2="45" stroke="#444" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="35" x2="38" y2="45" stroke="#444" strokeWidth="2" strokeLinecap="round" />
    
    {/* Frame 1: Bilanciere al petto */}
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="32" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 19 33 L 32 33 L 40 42 L 40 48" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 23 33 L 26 26 L 23 20" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="20" x2="35" y2="20" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="12" y="12" width="3" height="16" fill="#e5e5e5" rx="1.5" />
      <rect x="35" y="12" width="3" height="16" fill="#e5e5e5" rx="1.5" />
    </g>
    
    {/* Frame 2: Bilanciere in spinta */}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="32" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 19 33 L 32 33 L 40 42 L 40 48" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 23 33 L 23 10" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="10" x2="35" y2="10" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="12" y="2" width="3" height="16" fill="#e5e5e5" rx="1.5" />
      <rect x="35" y="2" width="3" height="16" fill="#e5e5e5" rx="1.5" />
    </g>
  </svg>
);

const ChestMachine = ({ color }: { color: string }) => (
  <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-md">
    <path d="M 10 15 L 10 45 L 20 45" stroke="#444" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="25" y1="10" x2="25" y2="40" stroke="#555" strokeWidth="3" strokeLinecap="round" />
    <line x1="15" y1="40" x2="35" y2="40" stroke="#555" strokeWidth="3" strokeLinecap="round" />
    
    {/* Frame 1: Braccia al petto */}
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="20" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 14 24 L 14 35 L 25 45" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 14 24 L 20 28 L 22 24" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="20" x2="22" y2="28" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" />
      <rect x="20" y="15" width="4" height="15" fill="#e5e5e5" rx="1" />
    </g>
    
    {/* Frame 2: Braccia tese */}
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
    <line x1="5" y1="35" x2="45" y2="35" stroke="#444" strokeWidth="4" strokeLinecap="round" />
    
    {/* Frame 1: Manubri in basso */}
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="32" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 19 33 L 32 33 L 40 42" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 23 33 L 26 26 L 22 20" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="20" x2="24" y2="20" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="20" r="3" fill="#e5e5e5" /><circle cx="26" cy="20" r="3" fill="#e5e5e5" />
    </g>
    
    {/* Frame 2: Manubri in alto uniti */}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="16" cy="32" r="3.5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 19 33 L 32 33 L 40 42" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 23 33 L 23 10" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="10" x2="25" y2="10" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="19" cy="10" r="3" fill="#e5e5e5" /><circle cx="27" cy="10" r="3" fill="#e5e5e5" />
    </g>
  </svg>
);

const PecDeckMachine = ({ color }: { color: string }) => (
  <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-md">
    <line x1="25" y1="10" x2="25" y2="40" stroke="#555" strokeWidth="3" strokeLinecap="round" />
    
    {/* Frame 1: Braccia aperte */}
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="25" cy="25" r="4" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 21 25 C 10 25 10 15 20 15 M 29 25 C 40 25 40 15 30 15" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    
    {/* Frame 2: Braccia chiuse */}
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" />
      <circle cx="25" cy="25" r="4" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 21 25 L 21 12 M 29 25 L 29 12" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);


// ==========================================
// IL CERVELLO DELLE ANIMAZIONI (MediaVisualizer Modulare)
// ==========================================
export const MediaVisualizer = ({ animKey, color }: { animKey: string, color: string }) => {
  // Un box contenitore con sfondo uniforme per dare risalto al vettoriale
  return (
    <div className="w-16 h-16 bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center shadow-inner shrink-0 p-1">
      {(() => {
        switch (animKey) {
          case 'chest_barbell': return <ChestBarbell color={color} />;
          case 'chest_machine': return <ChestMachine color={color} />;
          case 'chest_dumbbell': return <ChestDumbbell color={color} />;
          case 'chest_flye_machine': return <PecDeckMachine color={color} />;
          
          // Fallback temporaneo per le animazioni che non abbiamo ancora modellato
          default: return (
             <div className="flex flex-col items-center opacity-50">
               <span className="text-xl">⚙️</span>
               <span className="text-[6px] text-white mt-1">IN ARRIVO</span>
             </div>
          );
        }
      })()}
    </div>
  );
};
