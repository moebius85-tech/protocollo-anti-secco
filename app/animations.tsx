import React from 'react';

// ==========================================
// LIBRERIA ANIMAZIONI SVG (RIGGING ANATOMICO)
// ==========================================

// --- LOTTO 1: SPINTA (PETTO) ---

const ChestBarbellFlat = ({ color }: { color: string }) => (
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

const ChestBarbellIncline = ({ color }: { color: string }) => (
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
      <line x1="48" y1="42" x2="80" y2="42" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="46" y="32" width="4" height="20" fill="#e5e5e5" rx="1"/>
      <rect x="78" y="32" width="4" height="20" fill="#e5e5e5" rx="1"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="68" y1="41" x2="68" y2="15" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="48" y1="15" x2="80" y2="15" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="46" y="5" width="4" height="20" fill="#e5e5e5" rx="1"/>
      <rect x="78" y="5" width="4" height="20" fill="#e5e5e5" rx="1"/>
    </g>
  </svg>
);

const ChestDumbbellFlat = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <rect x="15" y="52" width="65" height="6" fill="#333" rx="1"/>
    <line x1="25" y1="58" x2="25" y2="90" stroke="#444" strokeWidth="3"/>
    <line x1="65" y1="58" x2="65" y2="90" stroke="#444" strokeWidth="3"/>
    <circle cx="65" cy="47" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="60" y1="49.5" x2="35" y2="49.5" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 35 49.5 L 25 70 L 25 90 M 25 90 L 15 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 53 49.5 L 50 65 L 53 40" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="49" y1="40" x2="57" y2="40" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="49" cy="40" rx="2" ry="8" fill="#e5e5e5"/>
      <ellipse cx="57" cy="40" rx="2" ry="8" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="53" y1="49.5" x2="53" y2="18" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="49" y1="18" x2="57" y2="18" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="49" cy="18" rx="2" ry="8" fill="#e5e5e5"/>
      <ellipse cx="57" cy="18" rx="2" ry="8" fill="#e5e5e5"/>
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

const ChestMachineFlat = ({ color }: { color: string }) => (
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

const ChestMachineIncline = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="45" y1="62" x2="70" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
    <line x1="68" y1="62" x2="78" y2="20" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
    <line x1="55" y1="62" x2="55" y2="90" stroke="#444" strokeWidth="4"/>
    <line x1="68" y1="62" x2="68" y2="90" stroke="#444" strokeWidth="4"/>
    <circle cx="75" cy="18" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="74" y1="26" x2="65" y2="58" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 65 58 L 42 58 L 42 90 M 42 90 L 32 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 70 38 L 80 48 L 60 40" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="60" y1="20" x2="60" y2="50" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
      <rect x="58" y="35" width="4" height="10" fill="#e5e5e5" rx="1"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="70" y1="38" x2="35" y2="25" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="35" y1="10" x2="35" y2="40" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
      <line x1="75" y1="15" x2="35" y2="10" stroke="#444" strokeWidth="2"/>
      <rect x="33" y="20" width="4" height="10" fill="#e5e5e5" rx="1"/>
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

const ChestFlyeDbFlat = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <rect x="40" y="20" width="20" height="70" fill="#333" rx="2"/>
    <circle cx="50" cy="20" r="6" fill={color}/>
    <line x1="38" y1="30" x2="62" y2="30" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 38 30 L 20 30 L 15 25" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <path d="M 62 30 L 80 30 L 85 25" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <circle cx="15" cy="25" r="3" fill="#e5e5e5"/>
      <circle cx="85" cy="25" r="3" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 38 30 L 45 25 L 48 35" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <path d="M 62 30 L 55 25 L 52 35" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <circle cx="48" cy="35" r="3" fill="#e5e5e5"/>
      <circle cx="52" cy="35" r="3" fill="#e5e5e5"/>
    </g>
  </svg>
);

const ChestCableFlye = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="15" y1="10" x2="15" y2="90" stroke="#444" strokeWidth="6" strokeLinecap="round"/>
    <line x1="85" y1="10" x2="85" y2="90" stroke="#444" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="50" cy="20" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="50" y1="28" x2="50" y2="60" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 50 60 L 40 90 M 35 90 L 45 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <path d="M 50 60 L 60 90 M 55 90 L 65 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 50 28 L 30 35 M 50 28 L 70 35" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <line x1="15" y1="20" x2="30" y2="35" stroke="#777" strokeWidth="1.5"/>
      <line x1="85" y1="20" x2="70" y2="35" stroke="#777" strokeWidth="1.5"/>
      <circle cx="30" cy="35" r="3" fill="#e5e5e5"/>
      <circle cx="70" cy="35" r="3" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 50 28 L 47 48 M 50 28 L 53 48" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <line x1="15" y1="20" x2="47" y2="48" stroke="#777" strokeWidth="1.5"/>
      <line x1="85" y1="20" x2="53" y2="48" stroke="#777" strokeWidth="1.5"/>
      <circle cx="47" cy="48" r="3" fill="#e5e5e5"/>
      <circle cx="53" cy="48" r="3" fill="#e5e5e5"/>
    </g>
  </svg>
);


// --- LOTTO 2: SPALLE E TRICIPITI ---
const ShoulderMilitary = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="20" y1="90" x2="80" y2="90" stroke="#333" strokeWidth="3"/>
    <circle cx="50" cy="25" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="50" y1="33" x2="50" y2="60" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 50 60 L 50 75 L 50 90 M 42 90 L 58 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 50 33 L 45 45 L 55 35" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
      <ellipse cx="55" cy="35" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="45" y1="35" x2="65" y2="35" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="50" y1="33" x2="50" y2="10" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="50" cy="10" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="40" y1="10" x2="60" y2="10" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
  </svg>
);

const ShoulderDb = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="35" y1="64" x2="68" y2="64" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
    <line x1="65" y1="64" x2="65" y2="25" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
    <line x1="45" y1="64" x2="45" y2="90" stroke="#444" strokeWidth="4"/>
    <line x1="65" y1="64" x2="65" y2="90" stroke="#444" strokeWidth="4"/>
    <circle cx="60" cy="27" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="60" y1="33" x2="60" y2="60" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 60 60 L 35 60 L 35 90 M 35 90 L 25 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 60 36 L 66 48 L 56 40" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <ellipse cx="56" cy="40" rx="2.5" ry="7" fill="#e5e5e5"/>
      <line x1="52" y1="40" x2="60" y2="40" stroke="#ccc" strokeWidth="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="60" y1="36" x2="60" y2="10" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="60" cy="10" rx="2.5" ry="7" fill="#e5e5e5"/>
      <line x1="56" y1="10" x2="64" y2="10" stroke="#ccc" strokeWidth="2"/>
    </g>
  </svg>
);

const LateralDb = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <circle cx="50" cy="18" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="40" y1="28" x2="60" y2="28" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <line x1="50" y1="28" x2="50" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <line x1="45" y1="55" x2="55" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 45 55 L 40 70 L 40 90 M 35 90 L 45 90" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <path d="M 55 55 L 60 70 L 60 90 M 55 90 L 65 90" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 40 28 L 35 40 L 35 55" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M 60 28 L 65 40 L 65 55" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="35" cy="57" r="3" fill="#e5e5e5"/>
      <circle cx="65" cy="57" r="3" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 40 28 L 25 32 L 15 35" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M 60 28 L 75 32 L 85 35" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="15" cy="36" r="3" fill="#e5e5e5"/>
      <circle cx="85" cy="36" r="3" fill="#e5e5e5"/>
    </g>
  </svg>
);

const TricepCable = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="25" y1="5" x2="25" y2="95" stroke="#444" strokeWidth="6" strokeLinecap="round"/>
    <line x1="25" y1="15" x2="40" y2="15" stroke="#555" strokeWidth="4"/>
    <circle cx="40" cy="15" r="4" fill="#666"/>
    <circle cx="53" cy="20" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="53" y1="26" x2="60" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 60 55 L 65 72 L 60 90 M 52 90 L 68 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <line x1="55" y1="28" x2="58" y2="48" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="58" y1="48" x2="40" y2="38" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="40" y1="15" x2="40" y2="38" stroke="#888" strokeWidth="1.5"/>
      <rect x="38" y="36" width="4" height="6" fill="#e5e5e5" rx="1"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="58" y1="48" x2="45" y2="68" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="40" y1="15" x2="45" y2="68" stroke="#888" strokeWidth="1.5"/>
      <rect x="43" y="66" width="4" height="6" fill="#e5e5e5" rx="1"/>
    </g>
  </svg>
);

const TricepCloseGrip = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="72" y1="15" x2="72" y2="90" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
    <rect x="15" y="52" width="65" height="6" fill="#333" rx="1"/>
    <line x1="25" y1="58" x2="25" y2="90" stroke="#444" strokeWidth="3"/>
    <line x1="65" y1="58" x2="65" y2="90" stroke="#444" strokeWidth="3"/>
    <circle cx="65" cy="47" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="60" y1="49.5" x2="35" y2="49.5" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 35 49.5 L 25 70 L 25 90 M 25 90 L 15 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 53 49.5 L 53 65 L 53 42" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
      <ellipse cx="53" cy="42" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="45" y1="42" x2="61" y2="42" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="53" y1="49.5" x2="53" y2="15" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="53" cy="15" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="45" y1="15" x2="61" y2="15" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
  </svg>
);

const TricepOverhead = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <circle cx="50" cy="35" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="50" y1="43" x2="50" y2="70" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 50 70 L 50 90 M 42 90 L 58 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <line x1="50" y1="43" x2="50" y2="15" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="50" y1="15" x2="35" y2="35" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="20" y1="10" x2="35" y2="35" stroke="#777" strokeWidth="2"/> 
      <circle cx="35" cy="35" r="2.5" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="50" y1="15" x2="50" y2="0" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="20" y1="10" x2="50" y2="0" stroke="#777" strokeWidth="2"/> 
      <circle cx="50" cy="0" r="2.5" fill="#e5e5e5"/>
    </g>
  </svg>
);

const TricepBarbell = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <rect x="15" y="52" width="65" height="6" fill="#333" rx="1"/>
    <line x1="25" y1="58" x2="25" y2="90" stroke="#444" strokeWidth="3"/>
    <line x1="65" y1="58" x2="65" y2="90" stroke="#444" strokeWidth="3"/>
    <circle cx="65" cy="47" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="60" y1="49.5" x2="35" y2="49.5" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 35 49.5 L 25 70 L 25 90 M 25 90 L 15 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <line x1="53" y1="49.5" x2="53" y2="22" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="53" y1="22" x2="68" y2="35" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="68" cy="35" r="3" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="53" y1="22" x2="53" y2="5" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="45" y1="5" x2="61" y2="5" stroke="#e5e5e5" strokeWidth="2.5"/>
    </g>
  </svg>
);

const TricepDips = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="15" y1="50" x2="85" y2="50" stroke="#555" strokeWidth="6" strokeLinecap="round"/>
    <line x1="30" y1="50" x2="30" y2="95" stroke="#444" strokeWidth="4"/>
    <line x1="70" y1="50" x2="70" y2="95" stroke="#444" strokeWidth="4"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <circle cx="58" cy="27" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <path d="M 55 35 L 65 45 L 45 50" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="55" y1="35" x2="45" y2="60" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 45 60 L 55 85 L 70 80" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <circle cx="50" cy="5" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <path d="M 48 15 L 47 32 L 45 50" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="48" y1="15" x2="40" y2="45" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 40" y1="45" x2="50" y2="70" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="50" y1="70" x2="65" y2="65" stroke={color} strokeWidth="4.5" strokeLinecap="round"/>
    </g>
  </svg>
);


// --- LOTTO 3: SCHIENA E BICIPITI (Tirata) ---
const BackPullup = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="10" y1="15" x2="90" y2="15" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <circle cx="50" cy="35" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="42" y1="43" x2="58" y2="43" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <line x1="50" y1="43" x2="50" y2="70" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <line x1="45" y1="70" x2="55" y2="70" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 45 70 L 45 95 M 55 70 L 55 95" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <path d="M 30 15 L 36 30 L 42 43" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M 70 15 L 64 30 L 58 43" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <circle cx="50" cy="15" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="42" y1="23" x2="58" y2="23" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <line x1="50" y1="23" x2="50" y2="50" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <line x1="45" y1="50" x2="55" y2="50" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 45 50 L 45 75 M 55 50 L 55 75" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <path d="M 30 15 L 25 35 L 42 23" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M 70 15 L 75 35 L 58 23" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    </g>
  </svg>
);

const LatMachineFrontal = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="30" y1="70" x2="70" y2="70" stroke="#333" strokeWidth="6"/>
    <line x1="50" y1="70" x2="50" y2="95" stroke="#444" strokeWidth="4"/>
    <line x1="35" y1="60" x2="65" y2="60" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="50" cy="35" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="42" y1="43" x2="58" y2="43" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <line x1="50" y1="43" x2="50" y2="70" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 45 70 L 45 95 M 35 95 L 50 95" stroke={color} strokeWidth="4.5" fill="none"/>
    <path d="M 55 70 L 55 95 M 50 95 L 65 95" stroke={color} strokeWidth="4.5" fill="none"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <line x1="20" y1="15" x2="80" y2="15" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round"/>
      <line x1="50" y1="0" x2="50" y2="15" stroke="#666" strokeWidth="2"/>
      <path d="M 42 43 L 35 25 L 25 15" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M 58 43 L 65 25 L 75 15" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <line x1="20" y1="45" x2="80" y2="45" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round"/>
      <line x1="50" y1="0" x2="50" y2="45" stroke="#666" strokeWidth="2"/>
      <path d="M 42 43 L 30 55 L 25 45" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M 58 43 L 70 55 L 75 45" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    </g>
  </svg>
);

const BackRowBarbell = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="10" y1="90" x2="90" y2="90" stroke="#333" strokeWidth="3"/>
    <circle cx="68" cy="27" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="60" y1="35" x2="30" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 30 55 L 40 70 L 40 90 M 32 90 L 48 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 60 35 L 60 55 L 60 70" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="45" y1="70" x2="75" y2="70" stroke="#e5e5e5" strokeWidth="2.5"/>
      <rect x="43" y="60" width="4" height="20" fill="#e5e5e5" rx="1"/>
      <rect x="73" y="60" width="4" height="20" fill="#e5e5e5" rx="1"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 60 35 L 40 25 L 50 48" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="35" y1="48" x2="65" y2="48" stroke="#e5e5e5" strokeWidth="2.5"/>
      <rect x="33" y="38" width="4" height="20" fill="#e5e5e5" rx="1"/>
      <rect x="63" y="38" width="4" height="20" fill="#e5e5e5" rx="1"/>
    </g>
  </svg>
);

const BackRowCable = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="10" y1="75" x2="70" y2="75" stroke="#333" strokeWidth="4"/> 
    <line x1="80" y1="40" x2="80" y2="90" stroke="#444" strokeWidth="6" strokeLinecap="round"/>
    <rect x="70" y="65" width="10" height="10" fill="#555" rx="2"/> 
    <circle cx="80" cy="50" r="4" fill="#666"/>
    <circle cx="30" cy="27" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="30" y1="35" x2="30" y2="70" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 30 70 L 55 60 L 70 70" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 30 35 L 45 42 L 60 50" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="60" y1="50" x2="80" y2="50" stroke="#888" strokeWidth="1.5"/>
      <rect x="58" y="47" width="4" height="6" fill="#e5e5e5" rx="1"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 30 35 L 15 42 L 35 50" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="35" y1="50" x2="80" y2="50" stroke="#888" strokeWidth="1.5"/>
      <rect x="33" y="47" width="4" height="6" fill="#e5e5e5" rx="1"/>
    </g>
  </svg>
);

const BicepBarbell = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="20" y1="90" x2="80" y2="90" stroke="#333" strokeWidth="3"/>
    <circle cx="50" cy="15" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="50" y1="23" x2="50" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 50 55 L 50 72 L 50 90 M 42 90 L 58 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <line x1="50" y1="23" x2="50" y2="45" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="50" y1="45" x2="55" y2="65" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="55" cy="65" rx="3" ry="3" fill="#e5e5e5"/>
      <line x1="45" y1="65" x2="65" y2="65" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="50" y1="45" x2="65" y2="30" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="65" cy="30" rx="3" ry="3" fill="#e5e5e5"/>
      <line x1="55" y1="30" x2="75" y2="30" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
  </svg>
);


// --- LOTTO 4: GAMBE ---
const LegSquat = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="10" y1="90" x2="90" y2="90" stroke="#333" strokeWidth="3"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <circle cx="50" cy="15" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="50" y1="20" x2="50" y2="45" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 50 45 L 53 65 L 50 85 M 50 85 L 58 85" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M 50 20 L 45 28 L 50 20" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
      <ellipse cx="50" cy="20" rx="3" ry="12" fill="#e5e5e5"/>
      <line x1="45" y1="20" x2="55" y2="20" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <circle cx="53" cy="36" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="50" y1="42" x2="35" y2="65" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 35 65 L 60 65 L 50 85 M 50 85 L 58 85" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M 50 42 L 45 50 L 50 42" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
      <ellipse cx="50" cy="42" rx="3" ry="12" fill="#e5e5e5"/>
      <line x1="45" y1="42" x2="55" y2="42" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
  </svg>
);

const LegPress = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="20" y1="90" x2="80" y2="90" stroke="#333" strokeWidth="4"/>
    <line x1="80" y1="90" x2="30" y2="20" stroke="#444" strokeWidth="6" strokeLinecap="round"/>
    <polygon points="45,90 65,90 75,75 55,75" fill="#222"/>
    <circle cx="68" cy="70" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="65" y1="75" x2="50" y2="85" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 50 85 L 45 65 L 35 70" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="30" y1="65" x2="40" y2="75" stroke="#e5e5e5" strokeWidth="4" strokeLinecap="round"/>
      <line x1="35" y1="70" x2="55" y2="40" stroke="#555" strokeWidth="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <line x1="50" y1="85" x2="20" y2="50" stroke={color} strokeWidth="4.5" strokeLinecap="round"/>
      <line x1="15" y1="45" x2="25" y2="55" stroke="#e5e5e5" strokeWidth="4" strokeLinecap="round"/>
      <line x1="20" y1="50" x2="40" y2="20" stroke="#555" strokeWidth="2"/>
    </g>
  </svg>
);

const LegExtension = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="25" y1="60" x2="55" y2="60" stroke="#333" strokeWidth="6"/>
    <line x1="25" y1="60" x2="25" y2="20" stroke="#333" strokeWidth="6"/>
    <line x1="35" y1="60" x2="35" y2="90" stroke="#444" strokeWidth="4"/>
    <line x1="50" y1="60" x2="50" y2="90" stroke="#444" strokeWidth="4"/>
    <circle cx="30" cy="18" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="30" y1="25" x2="30" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <line x1="30" y1="55" x2="55" y2="55" stroke={color} strokeWidth="4.5" strokeLinecap="round"/>
    <path d="M 30 25 L 35 40 L 30 55" stroke={color} strokeWidth="3" fill="none" strokeLinejoin="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 55 55 L 55 80 M 50 80 L 60 80" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="55" cy="75" r="4" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 55 55 L 80 55 M 80 50 L 80 60" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="75" cy="55" r="4" fill="#e5e5e5"/>
    </g>
  </svg>
);

const LegCurl = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="20" y1="55" x2="80" y2="55" stroke="#333" strokeWidth="6"/>
    <line x1="30" y1="55" x2="30" y2="90" stroke="#444" strokeWidth="4"/>
    <line x1="70" y1="55" x2="70" y2="90" stroke="#444" strokeWidth="4"/>
    <circle cx="20" cy="52" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="26" y1="52" x2="45" y2="52" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <line x1="45" y1="52" x2="70" y2="52" stroke={color} strokeWidth="4.5" strokeLinecap="round"/>
    <path d="M 26 52 L 20 65 L 15 55" stroke={color} strokeWidth="3" fill="none" strokeLinejoin="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 70 52 L 95 52 M 95 52 L 95 58" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="90" cy="50" r="4" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      <path d="M 70 52 L 60 28 M 60 28 L 65 24" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="63" cy="30" r="4" fill="#e5e5e5"/>
    </g>
  </svg>
);

const LegDeadlift = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="10" y1="90" x2="90" y2="90" stroke="#333" strokeWidth="3"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <circle cx="65" cy="40" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="60" y1="45" x2="35" y2="65" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 35 65 L 55 70 L 55 90 M 45 90 L 65 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <line x1="60" y1="45" x2="60" y2="75" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="60" cy="75" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="50" y1="75" x2="70" y2="75" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <circle cx="50" cy="15" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="50" y1="23" x2="50" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 50 55 L 50 72 L 50 90 M 42 90 L 58 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <line x1="50" y1="23" x2="50" y2="55" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="50" cy="55" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="40" y1="55" x2="60" y2="55" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
  </svg>
);

const LegLunges = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="10" y1="90" x2="90" y2="90" stroke="#333" strokeWidth="3"/>
    <circle cx="50" cy="15" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="50" y1="23" x2="50" y2="50" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="50" cy="50" rx="2" ry="6" fill="#e5e5e5"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <line x1="50" y1="23" x2="50" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 50 55 L 35 72 L 35 90 M 25 90 L 40 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <path d="M 50 55 L 65 72 L 75 90 M 70 90 L 80 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <line x1="50" y1="40" x2="50" y2="70" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M 50 70 L 35 70 L 35 90 M 25 90 L 40 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <path d="M 50 70 L 65 85 L 75 90 M 70 90 L 80 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    </g>
    <g opacity="0">
       <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
       <circle cx="50" cy="32" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
       <line x1="50" y1="40" x2="50" y2="67" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
       <ellipse cx="50" cy="67" rx="2" ry="6" fill="#e5e5e5"/>
    </g>
  </svg>
);

const LegCalf = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <rect x="30" y="85" width="20" height="15" fill="#333"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite"/>
      <circle cx="50" cy="20" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="50" y1="28" x2="50" y2="55" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <line x1="50" y1="28" x2="50" y2="55" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M 50 55 L 50 72 L 50 85 M 50 85 L 40 85 L 40 95" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite"/>
      <circle cx="50" cy="15" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="50" y1="23" x2="50" y2="50" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <line x1="50" y1="23" x2="50" y2="50" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M 50 50 L 50 67 L 50 80 M 50 80 L 40 85" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    </g>
  </svg>
);


// ==========================================
// IL CERVELLO CHE ESPORTA L'ICONA CORRETTA
// ==========================================
export const MediaVisualizer = ({ animKey, color }: { animKey: string, color: string }) => {
  return (
    <div className="w-16 h-16 bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center shadow-inner shrink-0 p-1">
      {(() => {
        switch (animKey) {
          // --- SPINTA / PETTO ---
          case 'chest_barbell_flat': return <ChestBarbellFlat color={color} />;
          case 'chest_barbell_incline': return <ChestBarbellIncline color={color} />;
          case 'chest_dumbbell_flat': return <ChestDumbbellFlat color={color} />;
          case 'chest_dumbbell_incline': return <ChestDumbbellIncline color={color} />;
          case 'chest_machine_flat': return <ChestMachineFlat color={color} />;
          case 'chest_machine_incline': return <ChestMachineIncline color={color} />;
          case 'chest_flye_machine': return <PecDeckFrontal color={color} />;
          case 'chest_flye_db': return <ChestFlyeDbFlat color={color} />; 
          case 'chest_cable': return <ChestCableFlye color={color} />; 

          // --- SPALLE E TRICIPITI ---
          case 'shoulder_db': return <ShoulderDb color={color} />;
          case 'shoulder_barbell': return <ShoulderDb color={color} />; // Fallback a DB
          case 'shoulder_machine': return <ShoulderDb color={color} />; // Fallback a DB
          case 'shoulder_barbell_standing': return <ShoulderMilitary color={color} />; 
          case 'lateral_cable': return <LateralDb color={color} />; 
          case 'lateral_db': return <LateralDb color={color} />;
          case 'lateral_machine': return <LateralDb color={color} />;
          
          case 'tricep_barbell': return <TricepBarbell color={color} />;
          case 'tricep_close_grip': return <TricepCloseGrip color={color} />; 
          case 'tricep_dips': return <TricepDips color={color} />;
          case 'tricep_cable': return <TricepCable color={color} />;
          case 'tricep_overhead': return <TricepOverhead color={color} />; 

          // --- TIRATA / SCHIENA E BICIPITI ---
          case 'back_pullup': return <BackPullup color={color} />;
          case 'back_pulldown': return <LatMachineFrontal color={color} />; 
          case 'back_pulldown_triangle': return <LatMachineFrontal color={color} />; 
          case 'back_row_barbell': return <BackRowBarbell color={color} />;
          case 'back_row_db': return <BackRowBarbell color={color} />; 
          case 'back_row_cable': return <BackRowCable color={color} />;
          case 'back_row_machine': return <BackRowCable color={color} />; 
          
          case 'bicep_barbell': return <BicepBarbell color={color} />;
          case 'bicep_db': return <BicepBarbell color={color} />;
          case 'bicep_cable': return <BicepBarbell color={color} />;

          // --- GAMBE ---
          case 'leg_squat': return <LegSquat color={color} />;
          case 'leg_machine_squat': return <LegSquat color={color} />; // Fallback 
          case 'leg_press': return <LegPress color={color} />;
          case 'leg_extension': return <LegExtension color={color} />;
          case 'leg_curl': return <LegCurl color={color} />;
          case 'leg_deadlift': return <LegDeadlift color={color} />; 
          case 'leg_lunge': return <LegLunges color={color} />; 
          case 'leg_calf': return <LegCalf color={color} />; 
          
          default: return (
             <div className="flex flex-col items-center opacity-50">
               <span className="text-xl">⚙️</span>
               <span className="text-[6px] text-white mt-1 uppercase text-center">{animKey}</span>
             </div>
          );
        }
      })()}
    </div>
  );
};
