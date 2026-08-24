// ==========================================
// NUOVE AGGIUNTE: FIX ASSOCIAZIONI E MANCANTI
// ==========================================

// 1. CROCI MANUBRI (Visuale dall'Alto / Top-Down)
const ChestFlyeDbFlat = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    {/* Panca vista dall'alto */}
    <rect x="40" y="20" width="20" height="70" fill="#333" rx="2"/>
    {/* Omino (Testa, Spalle) */}
    <circle cx="50" cy="20" r="6" fill={color}/>
    <line x1="38" y1="30" x2="62" y2="30" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      {/* Braccia Aperte (Gomito leggermente flesso) */}
      <path d="M 38 30 L 20 30 L 15 25" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <path d="M 62 30 L 80 30 L 85 25" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <circle cx="15" cy="25" r="3" fill="#e5e5e5"/>
      <circle cx="85" cy="25" r="3" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      {/* Braccia Chiuse (Incontrano i manubri al centro del petto) */}
      <path d="M 38 30 L 45 25 L 48 35" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <path d="M 62 30 L 55 25 L 52 35" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
      <circle cx="48" cy="35" r="3" fill="#e5e5e5"/>
      <circle cx="52" cy="35" r="3" fill="#e5e5e5"/>
    </g>
  </svg>
);

// 2. PANCA STRETTA TRICIPITI (Profilo: gomiti stretti)
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
      {/* Braccio stretto: il gomito scende a piombo sotto il corpo */}
      <path d="M 53 49.5 L 53 65 L 53 42" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
      <ellipse cx="53" cy="42" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="45" y1="42" x2="61" y2="42" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      {/* Braccio teso in alto */}
      <line x1="53" y1="49.5" x2="53" y2="15" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="53" cy="15" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="45" y1="15" x2="61" y2="15" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
  </svg>
);

// 3. ESTENSIONI NUCA (Tricep Overhead - Profilo)
const TricepOverhead = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    {/* Corpo fisso dritto (Omero puntato in alto) */}
    <circle cx="50" cy="35" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="50" y1="43" x2="50" y2="70" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 50 70 L 50 90 M 42 90 L 58 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    {/* Omero fisso in alto (Spalla 43 -> Gomito 15) */}
    <line x1="50" y1="43" x2="50" y2="15" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      {/* Avambraccio flesso dietro la nuca */}
      <line x1="50" y1="15" x2="35" y2="35" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="20" y1="10" x2="35" y2="35" stroke="#777" strokeWidth="2"/> {/* Cavo */}
      <circle cx="35" cy="35" r="2.5" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      {/* Avambraccio teso in alto */}
      <line x1="50" y1="15" x2="50" y2="0" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="20" y1="10" x2="50" y2="0" stroke="#777" strokeWidth="2"/> {/* Cavo */}
      <circle cx="50" cy="0" r="2.5" fill="#e5e5e5"/>
    </g>
  </svg>
);

// 4. CROCI CAVI (Cable Crossover - Frontale)
const ChestCableFlye = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    {/* Torrette laterali */}
    <line x1="15" y1="10" x2="15" y2="90" stroke="#444" strokeWidth="6" strokeLinecap="round"/>
    <line x1="85" y1="10" x2="85" y2="90" stroke="#444" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="50" cy="20" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="50" y1="28" x2="50" y2="60" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    {/* Gambe stabili divaricate */}
    <path d="M 50 60 L 40 90 M 35 90 L 45 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <path d="M 50 60 L 60 90 M 55 90 L 65 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      {/* Braccia aperte in alto */}
      <path d="M 50 28 L 30 35 M 50 28 L 70 35" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <line x1="15" y1="20" x2="30" y2="35" stroke="#777" strokeWidth="1.5"/>
      <line x1="85" y1="20" x2="70" y2="35" stroke="#777" strokeWidth="1.5"/>
      <circle cx="30" cy="35" r="3" fill="#e5e5e5"/>
      <circle cx="70" cy="35" r="3" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      {/* Braccia chiuse avanti al petto/addome */}
      <path d="M 50 28 L 47 48 M 50 28 L 53 48" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <line x1="15" y1="20" x2="47" y2="48" stroke="#777" strokeWidth="1.5"/>
      <line x1="85" y1="20" x2="53" y2="48" stroke="#777" strokeWidth="1.5"/>
      <circle cx="47" cy="48" r="3" fill="#e5e5e5"/>
      <circle cx="53" cy="48" r="3" fill="#e5e5e5"/>
    </g>
  </svg>
);

// 5. MILITARY PRESS (Standing Barbell Press - Profilo)
const ShoulderMilitary = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <line x1="20" y1="90" x2="80" y2="90" stroke="#333" strokeWidth="3"/>
    <circle cx="50" cy="25" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <line x1="50" y1="33" x2="50" y2="60" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    <path d="M 50 60 L 50 75 L 50 90 M 42 90 L 58 90" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      {/* Bilanciere al petto alto */}
      <path d="M 50 33 L 45 45 L 55 35" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
      <ellipse cx="55" cy="35" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="45" y1="35" x2="65" y2="35" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
      {/* Bilanciere in alto (dritto) */}
      <line x1="50" y1="33" x2="50" y2="10" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="50" cy="10" rx="3" ry="10" fill="#e5e5e5"/>
      <line x1="40" y1="10" x2="60" y2="10" stroke="#e5e5e5" strokeWidth="2"/>
    </g>
  </svg>
);
