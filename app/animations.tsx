import React from 'react';

// ==========================================
// LIBRERIA ANIMAZIONI SVG - PROTOCOLLO ANTI-SECCO
// ==========================================

// --- LOTTO 1: PETTO ---

const ChestBarbell = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="72" y1="15" x2="72" y2="90" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
    <line x1="68" y1="35" x2="72" y2="35" stroke="#555" strokeWidth="3"/>
    <rect x="15" y="52" width="65" height="6" fill="#333" rx="1"/>
    <line x1="25" y1="58" x2="25" y2="90" stroke="#444" strokeWidth="3"/>
    <line x1="65" y1="58" x2="65" y2="90" stroke="#444" strokeWidth="3"/>
    <circle cx="65" cy="47" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="60" y1="49.5" x2="35" y2="49.5" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 35 49.5 L 25 70 L 25 90 M 25 90 L 15 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 53 49.5 L 50 65 L 53 40" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="35" y1="40" x2="68" y2="40" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="33" y="30" width="4" height="20" fill="#e5e5e5" rx="1"/>
      <rect x="66" y="30" width="4" height="20" fill="#e5e5e5" rx="1"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="53" y1="49.5" x2="53" y2="18" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="35" y1="18" x2="68" y2="18" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="33" y="8" width="4" height="20" fill="#e5e5e5" rx="1"/>
      <rect x="66" y="8" width="4" height="20" fill="#e5e5e5" rx="1"/>
    </g>
  </svg>
);

const ChestDumbbellIncline = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="40" y1="62" x2="60" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
    <line x1="58" y1="62" x2="78" y2="30" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
    <line x1="45" y1="62" x2="45" y2="90" stroke="#444" strokeWidth="4"/>
    <line x1="65" y1="52" x2="65" y2="90" stroke="#444" strokeWidth="4"/>
    <circle cx="80" cy="24" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="75" y1="32" x2="55" y2="58" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 55 58 L 40 62 L 40 90 M 40 90 L 30 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 68 41 L 72 55 L 65 42" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="60" y1="42" x2="70" y2="42" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="58" y="36" width="3" height="12" fill="#e5e5e5" rx="1"/>
      <rect x="69" y="36" width="3" height="12" fill="#e5e5e5" rx="1"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="68" y1="41" x2="68" y2="15" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="63" y1="15" x2="73" y2="15" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="61" y="9" width="3" height="12" fill="#e5e5e5" rx="1"/>
      <rect x="72" y="9" width="3" height="12" fill="#e5e5e5" rx="1"/>
    </g>
  </svg>
);

const ChestMachine = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="45" y1="62" x2="70" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
    <line x1="68" y1="62" x2="68" y2="20" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
    <line x1="55" y1="62" x2="55" y2="90" stroke="#444" strokeWidth="4"/>
    <line x1="68" y1="62" x2="68" y2="90" stroke="#444" strokeWidth="4"/>
    <circle cx="63" cy="20" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="63" y1="27" x2="63" y2="58" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 63 58 L 42 58 L 42 90 M 42 90 L 32 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 63 35 L 75 42 L 55 35" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="55" y1="15" x2="55" y2="45" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
      <rect x="53" y="30" width="4" height="10" fill="#e5e5e5" rx="1"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="63" y1="35" x2="25" y2="35" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="25" y1="15" x2="25" y2="45" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
      <line x1="68" y1="15" x2="25" y2="15" stroke="#444" strokeWidth="2"/>
      <rect x="23" y="30" width="4" height="10" fill="#e5e5e5" rx="1"/>
    </g>
  </svg>
);

const PecDeckFrontal = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <rect x="42" y="10" width="16" height="80" fill="#333" rx="2"/>
    <rect x="30" y="60" width="40" height="8" fill="#222" rx="2"/>
    <circle cx="50" cy="20" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <rect x="42" y="27" width="16" height="33" fill="none" stroke={color} strokeWidth="3" rx="2"/>
    <path d="M 45 60 L 40 80 L 40 90 M 35 90 L 45 90" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round"/>
    <path d="M 55 60 L 60 80 L 60 90 M 55 90 L 65 90" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 42 33 L 20 33 L 20 20" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round"/>
      <path d="M 58 33 L 80 33 L 80 20" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round"/>
      <polyline points="50,15 20,15 20,25" stroke="#555" strokeWidth="3" fill="none"/>
      <polyline points="50,15 80,15 80,25" stroke="#555" strokeWidth="3" fill="none"/>
      <rect x="18" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
      <rect x="78" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 42 33 L 42 20" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M 58 33 L 58 20" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <polyline points="50,15 42,15 42,25" stroke="#555" strokeWidth="3" fill="none"/>
      <polyline points="50,15 58,15 58,25" stroke="#555" strokeWidth="3" fill="none"/>
      <rect x="40" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
      <rect x="56" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
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
          case 'chest_dumbbell': return <ChestDumbbellIncline color={color} />;
          case 'chest_flye_machine': return <PecDeckFrontal color={color} />;
          
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
