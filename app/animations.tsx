import React from 'react';

export const PPianaBilAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Struttura Panca -->
        <line x1="72" y1="15" x2="72" y2="90" stroke="#444" strokeWidth="4" strokeLinecap="round"/> <!-- Rack -->
        <rect x="15" y="52" width="65" height="6" fill="#333" rx="1"/> <!-- Cuscino -->
        <line x1="25" y1="58" x2="25" y2="90" stroke="#444" strokeWidth="3"/> <!-- Gamba panca sx -->
        <line x1="65" y1="58" x2="65" y2="90" stroke="#444" strokeWidth="3"/> <!-- Gamba panca dx -->
        
        <!-- Omino Rigging Fisso -->
        <circle cx="65" cy="47" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/> <!-- Testa -->
        <line x1="60" y1="49.5" x2="35" y2="49.5" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/> <!-- Busto -->
        <!-- Gambe piantate -->
        <path d="M 35 49.5 L 25 70 L 25 90 M 25 90 L 15 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- Animazione Braccia e Bilanciere -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 53 49.5 L 50 65 L 53 40" stroke="#f97316" strokeWidth="3.5" fill="none" strokeLinejoin="round"/> <!-- Braccio giù -->
          <line x1="35" y1="40" x2="68" y2="40" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/> <!-- Bilanciere -->
          <rect x="33" y="30" width="4" height="20" fill="#e5e5e5" rx="1"/>
          <rect x="66" y="30" width="4" height="20" fill="#e5e5e5" rx="1"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="53" y1="49.5" x2="53" y2="18" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round"/> <!-- Braccio su -->
          <line x1="35" y1="18" x2="68" y2="18" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/> <!-- Bilanciere -->
          <rect x="33" y="8" width="4" height="20" fill="#e5e5e5" rx="1"/>
          <rect x="66" y="8" width="4" height="20" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const ChestPressAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Struttura Macchina -->
        <line x1="45" y1="62" x2="70" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/> <!-- Seduta -->
        <line x1="68" y1="62" x2="68" y2="20" stroke="#333" strokeWidth="6" strokeLinecap="round"/> <!-- Schienale -->
        <line x1="55" y1="62" x2="55" y2="90" stroke="#444" strokeWidth="4"/>
        <line x1="68" y1="62" x2="68" y2="90" stroke="#444" strokeWidth="4"/>
        
        <!-- Omino Rigging Fisso -->
        <circle cx="63" cy="20" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="63" y1="27" x2="63" y2="58" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 63 58 L 42 58 L 42 90 M 42 90 L 32 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- Animazione Braccia e Macchina -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 63 35 L 75 42 L 55 35" stroke="#3b82f6" strokeWidth="3.5" fill="none" strokeLinejoin="round"/> <!-- Braccio tirato indietro -->
          <line x1="55" y1="15" x2="55" y2="45" stroke="#555" strokeWidth="3"/> <!-- Braccio Macchina -->
          <rect x="53" y="30" width="4" height="10" fill="#e5e5e5" rx="1"/> <!-- Impugnatura -->
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="63" y1="35" x2="25" y2="35" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round"/> <!-- Braccio disteso avanti -->
          <line x1="25" y1="15" x2="25" y2="45" stroke="#555" strokeWidth="3"/> <!-- Braccio Macchina -->
          <line x1="68" y1="15" x2="25" y2="15" stroke="#444" strokeWidth="2"/> <!-- Asta di collegamento -->
          <rect x="23" y="30" width="4" height="10" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const PianaManubriAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Panca e Omino FISSI (Identici alla base) -->
        <rect x="15" y="52" width="65" height="6" fill="#333" rx="1"/>
        <line x1="25" y1="58" x2="25" y2="90" stroke="#444" strokeWidth="3"/>
        <line x1="65" y1="58" x2="65" y2="90" stroke="#444" strokeWidth="3"/>
        <circle cx="65" cy="47" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="60" y1="49.5" x2="35" y2="49.5" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 35 49.5 L 25 70 L 25 90 M 25 90 L 15 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- Animazione Manubri separati -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 53 49.5 L 50 65 L 53 40" stroke="#3b82f6" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <!-- Manubrio singolo profilato -->
          <line x1="49" y1="40" x2="57" y2="40" stroke="#e5e5e5" strokeWidth="2.5"/>
          <ellipse cx="49" cy="40" rx="2" ry="8" fill="#e5e5e5"/>
          <ellipse cx="57" cy="40" rx="2" ry="8" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="53" y1="49.5" x2="53" y2="18" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="49" y1="18" x2="57" y2="18" stroke="#e5e5e5" strokeWidth="2.5"/>
          <ellipse cx="49" cy="18" rx="2" ry="8" fill="#e5e5e5"/>
          <ellipse cx="57" cy="18" rx="2" ry="8" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const InclinataManAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Struttura Panca Inclinata 45° -->
        <line x1="40" y1="62" x2="60" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/> <!-- Seduta -->
        <line x1="58" y1="62" x2="78" y2="30" stroke="#333" strokeWidth="6" strokeLinecap="round"/> <!-- Schienale -->
        <line x1="45" y1="62" x2="45" y2="90" stroke="#444" strokeWidth="4"/>
        <line x1="65" y1="52" x2="65" y2="90" stroke="#444" strokeWidth="4"/>
        
        <!-- Omino Rigging Fisso -->
        <circle cx="80" cy="24" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="75" y1="32" x2="55" y2="58" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/> <!-- Busto inclinato -->
        <path d="M 55 58 L 40 62 L 40 90 M 40 90 L 30 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- Animazione Braccia e Manubri (Spinta Verticale) -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 68 41 L 72 55 L 65 42" stroke="#f97316" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <line x1="61" y1="42" x2="69" y2="42" stroke="#e5e5e5" strokeWidth="2.5"/> <!-- Impugnatura manubrio -->
          <ellipse cx="61" cy="42" rx="2" ry="8" fill="#e5e5e5"/>
          <ellipse cx="69" cy="42" rx="2" ry="8" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="68" y1="41" x2="68" y2="15" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round"/> <!-- Braccio dritto in alto -->
          <line x1="64" y1="15" x2="72" y2="15" stroke="#e5e5e5" strokeWidth="2.5"/>
          <ellipse cx="64" cy="15" rx="2" ry="8" fill="#e5e5e5"/>
          <ellipse cx="72" cy="15" rx="2" ry="8" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const InclinataBilAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Struttura Rack e Panca -->
        <line x1="72" y1="10" x2="72" y2="90" stroke="#444" strokeWidth="4" strokeLinecap="round"/> <!-- Rack -->
        <line x1="40" y1="62" x2="60" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="58" y1="62" x2="78" y2="30" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="45" y1="62" x2="45" y2="90" stroke="#444" strokeWidth="4"/>
        <line x1="65" y1="52" x2="65" y2="90" stroke="#444" strokeWidth="4"/>
        
        <!-- Omino Rigging Fisso -->
        <circle cx="80" cy="24" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="75" y1="32" x2="55" y2="58" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 55 58 L 40 62 L 40 90 M 40 90 L 30 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- Animazione Braccia e Bilanciere -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 68 41 L 72 55 L 65 42" stroke="#3b82f6" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <line x1="48" y1="42" x2="80" y2="42" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/> <!-- Barra lunga bilanciere -->
          <rect x="46" y="32" width="4" height="20" fill="#e5e5e5" rx="1"/> <!-- Dischi -->
          <rect x="78" y="32" width="4" height="20" fill="#e5e5e5" rx="1"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="68" y1="41" x2="68" y2="15" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="48" y1="15" x2="80" y2="15" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="46" y="5" width="4" height="20" fill="#e5e5e5" rx="1"/>
          <rect x="78" y="5" width="4" height="20" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const PressaInclinataAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Struttura Macchinario Inclinato -->
        <line x1="45" y1="62" x2="70" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="68" y1="62" x2="78" y2="20" stroke="#333" strokeWidth="6" strokeLinecap="round"/> <!-- Schienale 45° -->
        <line x1="55" y1="62" x2="55" y2="90" stroke="#444" strokeWidth="4"/>
        <line x1="68" y1="62" x2="68" y2="90" stroke="#444" strokeWidth="4"/>
        
        <!-- Omino Rigging Fisso -->
        <circle cx="75" cy="18" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="74" y1="26" x2="65" y2="58" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 65 58 L 42 58 L 42 90 M 42 90 L 32 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- Animazione Braccia e Meccanica -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 70 38 L 80 48 L 60 40" stroke="#3b82f6" strokeWidth="3.5" fill="none" strokeLinejoin="round"/> <!-- Braccio giù al petto -->
          <line x1="60" y1="20" x2="60" y2="50" stroke="#555" strokeWidth="3" strokeLinecap="round"/> <!-- Maniglie giù -->
          <rect x="58" y="35" width="4" height="10" fill="#e5e5e5" rx="1"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="70" y1="38" x2="35" y2="25" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round"/> <!-- Braccio teso in alto/avanti -->
          <line x1="35" y1="10" x2="35" y2="40" stroke="#555" strokeWidth="3" strokeLinecap="round"/> <!-- Maniglie su -->
          <line x1="75" y1="15" x2="35" y2="10" stroke="#444" strokeWidth="2"/> <!-- Asta di spinta obliqua -->
          <rect x="33" y="20" width="4" height="10" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const ChestPressAnimation2 = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Struttura Macchina -->
        <line x1="45" y1="62" x2="70" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="68" y1="62" x2="68" y2="20" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="55" y1="62" x2="55" y2="90" stroke="#444" strokeWidth="4"/>
        <line x1="68" y1="62" x2="68" y2="90" stroke="#444" strokeWidth="4"/>
        
        <!-- Omino Rigging Fisso -->
        <circle cx="63" cy="20" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="63" y1="27" x2="63" y2="58" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 63 58 L 42 58 L 42 90 M 42 90 L 32 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- Animazione -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 63 35 L 75 42 L 55 35" stroke="#f97316" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <line x1="55" y1="15" x2="55" y2="45" stroke="#555" strokeWidth="3"/>
          <rect x="53" y="30" width="4" height="10" fill="#e5e5e5" rx="1"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="63" y1="35" x2="25" y2="35" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="25" y1="15" x2="25" y2="45" stroke="#555" strokeWidth="3"/>
          <line x1="68" y1="15" x2="25" y2="15" stroke="#444" strokeWidth="2"/>
          <rect x="23" y="30" width="4" height="10" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const PecDeckAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Macchina Frontale -->
        <rect x="42" y="10" width="16" height="80" fill="#333" rx="2"/> <!-- Schienale e colonna -->
        <rect x="30" y="60" width="40" height="8" fill="#222" rx="2"/> <!-- Seduta -->
        
        <!-- Omino Rigging Fisso -->
        <circle cx="50" cy="20" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <rect x="42" y="27" width="16" height="33" fill="none" stroke="#3b82f6" strokeWidth="3" rx="2"/> <!-- Torace largo frontale -->
        <path d="M 45 60 L 40 80 L 40 90 M 35 90 L 45 90" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
        <path d="M 55 60 L 60 80 L 60 90 M 55 90 L 65 90" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
        
        <!-- Animazione Braccia (Apertura e chiusura a L sui cuscinetti) -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <!-- Braccia larghe -->
          <path d="M 42 33 L 20 33 L 20 20" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <path d="M 58 33 L 80 33 L 80 20" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <!-- Bracci macchina aperti -->
          <polyline points="50,15 20,15 20,25" stroke="#555" strokeWidth="3" fill="none"/>
          <polyline points="50,15 80,15 80,25" stroke="#555" strokeWidth="3" fill="none"/>
          <rect x="18" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/> <!-- Cuscinetto SX -->
          <rect x="78" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/> <!-- Cuscinetto DX -->
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <!-- Braccia chiuse al centro -->
          <path d="M 42 33 L 42 20" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 58 33 L 58 20" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <!-- Bracci macchina chiusi -->
          <polyline points="50,15 42,15 42,25" stroke="#555" strokeWidth="3" fill="none"/>
          <polyline points="50,15 58,15 58,25" stroke="#555" strokeWidth="3" fill="none"/>
          <rect x="40" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
          <rect x="56" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const CaviSedutoAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Panca Seduta -->
        <rect x="35" y="65" width="30" height="10" fill="#333" rx="2"/>
        <!-- Torrette laterali dei cavi -->
        <line x1="10" y1="10" x2="10" y2="90" stroke="#444" strokeWidth="6"/>
        <line x1="90" y1="10" x2="90" y2="90" stroke="#444" strokeWidth="6"/>
        
        <!-- Omino Rigging Fisso -->
        <circle cx="50" cy="25" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <rect x="42" y="32" width="16" height="33" fill="none" stroke="#3b82f6" strokeWidth="3" rx="2"/>
        <path d="M 45 65 L 40 85 M 55 65 L 60 85" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
        
        <!-- Animazione Braccia e Cavi -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <!-- Apertura -->
          <path d="M 42 38 L 25 45 M 58 38 L 75 45" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <line x1="10" y1="40" x2="25" y2="45" stroke="#777" strokeWidth="1.5"/> <!-- Cavo sx -->
          <line x1="90" y1="40" x2="75" y2="45" stroke="#777" strokeWidth="1.5"/> <!-- Cavo dx -->
          <circle cx="25" cy="45" r="3" fill="#e5e5e5"/>
          <circle cx="75" cy="45" r="3" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <!-- Chiusura al centro (avanti al petto) -->
          <path d="M 42 38 L 47 48 M 58 38 L 53 48" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <line x1="10" y1="40" x2="47" y2="48" stroke="#777" strokeWidth="1.5"/> <!-- Cavo sx -->
          <line x1="90" y1="40" x2="53" y2="48" stroke="#777" strokeWidth="1.5"/> <!-- Cavo dx -->
          <circle cx="47" cy="48" r="3" fill="#e5e5e5"/>
          <circle cx="53" cy="48" r="3" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const CrociManubriAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Panca Sezione Trasversale -->
        <rect x="42" y="65" width="16" height="35" fill="#333" rx="2"/>
        <rect x="35" y="65" width="30" height="8" fill="#444" rx="2"/>

        <!-- Testa e Spalle -->
        <circle cx="50" cy="53" r="8" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="38" y1="65" x2="62" y2="65" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>

        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <!-- Stretch (Basso) -->
          <path d="M 38 65 L 20 75 L 15 70" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <path d="M 62 65 L 80 75 L 85 70" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <circle cx="15" cy="70" r="3" fill="#e5e5e5"/>
          <circle cx="85" cy="70" r="3" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <!-- Contrazione (Alto) -->
          <path d="M 38 65 L 45 40 L 48 35" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <path d="M 62 65 L 55 40 L 52 35" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <circle cx="48" cy="35" r="3" fill="#e5e5e5"/>
          <circle cx="52" cy="35" r="3" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const CrociCaviPianaAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Torrette e Pulegge basse -->
        <line x1="10" y1="10" x2="10" y2="95" stroke="#444" strokeWidth="6"/>
        <line x1="90" y1="10" x2="90" y2="95" stroke="#444" strokeWidth="6"/>
        <circle cx="15" cy="85" r="4" fill="#555"/>
        <circle cx="85" cy="85" r="4" fill="#555"/>

        <!-- Panca Sezione Trasversale -->
        <rect x="42" y="65" width="16" height="35" fill="#333" rx="2"/>
        <rect x="35" y="65" width="30" height="8" fill="#222" rx="2"/>

        <!-- Testa e Spalle -->
        <circle cx="50" cy="53" r="8" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="38" y1="65" x2="62" y2="65" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>

        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <!-- Cavi in tensione dal basso -->
          <line x1="15" y1="85" x2="15" y2="70" stroke="#777" strokeWidth="1.5"/>
          <line x1="85" y1="85" x2="85" y2="70" stroke="#777" strokeWidth="1.5"/>
          <!-- Stretch -->
          <path d="M 38 65 L 20 75 L 15 70" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <path d="M 62 65 L 80 75 L 85 70" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <circle cx="15" cy="70" r="2" fill="#e5e5e5"/>
          <circle cx="85" cy="70" r="2" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <!-- Cavi tirati verso l'alto -->
          <line x1="15" y1="85" x2="48" y2="35" stroke="#777" strokeWidth="1.5"/>
          <line x1="85" y1="85" x2="52" y2="35" stroke="#777" strokeWidth="1.5"/>
          <!-- Contrazione -->
          <path d="M 38 65 L 45 40 L 48 35" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <path d="M 62 65 L 55 40 L 52 35" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <circle cx="48" cy="35" r="2" fill="#e5e5e5"/>
          <circle cx="52" cy="35" r="2" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const PectoralMachineAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Telaio Macchina: Colonna centrale e trave superiore con i perni -->
        <rect x="42" y="10" width="16" height="80" fill="#333" rx="2"/>
        <rect x="30" y="60" width="40" height="8" fill="#222" rx="2"/>
        <line x1="20" y1="10" x2="80" y2="10" stroke="#444" strokeWidth="4" strokeLinecap="round"/> 
        <circle cx="20" cy="10" r="3" fill="#666"/>
        <circle cx="80" cy="10" r="3" fill="#666"/>

        <!-- Omino Rigging Fisso (Seduto) -->
        <circle cx="50" cy="20" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="28" x2="50" y2="55" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <line x1="38" y1="28" x2="62" y2="28" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 50 55 L 40 70 L 40 90 M 35 90 L 45 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 50 55 L 60 70 L 60 90 M 55 90 L 65 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>

        <!-- Animazione Bracci Macchina e Braccia Omino -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          
          <!-- Bracci meccanici in APERTURA (Verticali) -->
          <line x1="42" y1="10" x2="15" y2="10" stroke="#555" strokeWidth="3" strokeLinecap="round"/> 
          <line x1="58" y1="10" x2="85" y2="10" stroke="#555" strokeWidth="3" strokeLinecap="round"/> 
          <line x1="15" y1="10" x2="15" y2="35" stroke="#555" strokeWidth="3" strokeLinecap="round"/> 
          <line x1="85" y1="10" x2="85" y2="35" stroke="#555" strokeWidth="3" strokeLinecap="round"/> 
          <rect x="13" y="16" width="4" height="15" fill="#e5e5e5" rx="1"/> 
          <rect x="83" y="16" width="4" height="15" fill="#e5e5e5" rx="1"/> 

          <!-- Braccia Omino (Flesse a L) aperte -->
          <path d="M 38 28 L 15 32 L 15 16" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 28 L 85 32 L 85 16" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        </g>

        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          
          <!-- Bracci meccanici in CHIUSURA (Traslano dritti al centro) -->
          <line x1="42" y1="10" x2="45" y2="10" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
          <line x1="58" y1="10" x2="55" y2="10" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
          <line x1="45" y1="10" x2="45" y2="35" stroke="#555" strokeWidth="3" strokeLinecap="round"/> 
          <line x1="55" y1="10" x2="55" y2="35" stroke="#555" strokeWidth="3" strokeLinecap="round"/> 
          <rect x="43" y="16" width="4" height="15" fill="#e5e5e5" rx="1"/> 
          <rect x="53" y="16" width="4" height="15" fill="#e5e5e5" rx="1"/> 

          <!-- Braccia Omino chiuse al centro a 90° -->
          <path d="M 38 28 L 45 32 L 45 16" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 28 L 55 32 L 55 16" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        </g>
      </svg>
);

export const LentoManubriAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="35" y="65" width="30" height="10" fill="#333" rx="2"/> 
        <rect x="42" y="20" width="16" height="50" fill="#222" rx="2"/> 
        
        <circle cx="50" cy="20" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="26" x2="50" y2="65" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <line x1="38" y1="28" x2="62" y2="28" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 65 L 35 90 M 28 90 L 42 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 55 65 L 65 90 M 58 90 L 72 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- FASE 1: Partenza con presa supina (Gomiti chiusi) -->
        <g>
          <animate attributeName="opacity" values="1;0;0;0;1" keyTimes="0;0.25;0.5;0.75;1" dur="2.4s" repeatCount="indefinite" calcMode="discrete"/>
          <path d="M 38 28 L 42 45 L 42 32" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 28 L 58 45 L 58 32" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="38" y1="32" x2="46" y2="32" stroke="#e5e5e5" strokeWidth="2"/>
          <ellipse cx="38" cy="32" rx="2" ry="7" fill="#e5e5e5"/>
          <ellipse cx="46" cy="32" rx="2" ry="7" fill="#e5e5e5"/>
          <line x1="54" y1="32" x2="62" y2="32" stroke="#e5e5e5" strokeWidth="2"/>
          <ellipse cx="54" cy="32" rx="2" ry="7" fill="#e5e5e5"/>
          <ellipse cx="62" cy="32" rx="2" ry="7" fill="#e5e5e5"/>
        </g>

        <!-- FASE 2: Extrarotazione -->
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0;1;0" keyTimes="0;0.25;0.5;0.75;1" dur="2.4s" repeatCount="indefinite" calcMode="discrete"/>
          <path d="M 38 28 L 25 35 L 30 25" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 28 L 75 35 L 70 25" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx="30" cy="25" r="5" fill="#e5e5e5"/>
          <circle cx="70" cy="25" r="5" fill="#e5e5e5"/>
        </g>

        <!-- FASE 3: Chiusura Prona -->
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.25;0.5;0.75;1" dur="2.4s" repeatCount="indefinite" calcMode="discrete"/>
          <path d="M 38 28 L 35 18 L 32 10" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 28 L 65 18 L 68 10" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="28" y1="10" x2="36" y2="10" stroke="#e5e5e5" strokeWidth="2"/>
          <ellipse cx="28" cy="10" rx="2" ry="7" fill="#e5e5e5"/>
          <ellipse cx="36" cy="10" rx="2" ry="7" fill="#e5e5e5"/>
          <line x1="64" y1="10" x2="72" y2="10" stroke="#e5e5e5" strokeWidth="2"/>
          <ellipse cx="64" cy="10" rx="2" ry="7" fill="#e5e5e5"/>
          <ellipse cx="72" cy="10" rx="2" ry="7" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const MilitaryPressAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <circle cx="50" cy="20" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="26" x2="50" y2="55" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="28" x2="60" y2="28" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <!-- Gambe in piedi -->
        <path d="M 50 55 L 42 90 M 35 90 L 49 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 50 55 L 58 90 M 51 90 L 65 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- FASE 1: Bilanciere al petto -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 40 28 L 32 40 L 32 32" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 60 28 L 68 40 L 68 32" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="20" y1="32" x2="80" y2="32" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round"/>
          <rect x="22" y="22" width="4" height="20" fill="#e5e5e5" rx="1"/>
          <rect x="74" y="22" width="4" height="20" fill="#e5e5e5" rx="1"/>
        </g>

        <!-- FASE 2: Bilanciere in alto -->
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 40 28 L 32 10" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 60 28 L 68 10" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <line x1="20" y1="10" x2="80" y2="10" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round"/>
          <rect x="22" y="0" width="4" height="20" fill="#e5e5e5" rx="1"/>
          <rect x="74" y="0" width="4" height="20" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const ShoulderMachAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Struttura Macchina -->
        <rect x="35" y="65" width="30" height="10" fill="#333" rx="2"/> 
        <rect x="42" y="20" width="16" height="50" fill="#222" rx="2"/> 
        <line x1="20" y1="10" x2="20" y2="90" stroke="#444" strokeWidth="4"/> <!-- Guida SX -->
        <line x1="80" y1="10" x2="80" y2="90" stroke="#444" strokeWidth="4"/> <!-- Guida DX -->
        
        <circle cx="50" cy="20" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="26" x2="50" y2="65" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <line x1="38" y1="28" x2="62" y2="28" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <!-- Gambe sedute -->
        <path d="M 45 65 L 35 90 M 28 90 L 42 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 55 65 L 65 90 M 58 90 L 72 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        
        <!-- FASE 1: Maniglie in basso -->
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 38 28 L 28 40 L 28 32" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 28 L 72 40 L 72 32" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="15" y1="32" x2="35" y2="32" stroke="#555" strokeWidth="4" strokeLinecap="round"/>
          <line x1="85" y1="32" x2="65" y2="32" stroke="#555" strokeWidth="4" strokeLinecap="round"/>
        </g>
        
        <!-- FASE 2: Maniglie in alto -->
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 38 28 L 28 10" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 62 28 L 72 10" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <line x1="15" y1="10" x2="35" y2="10" stroke="#555" strokeWidth="4" strokeLinecap="round"/>
          <line x1="85" y1="10" x2="65" y2="10" stroke="#555" strokeWidth="4" strokeLinecap="round"/>
        </g>
      </svg>
);

export const AlzateCaviAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Torrette ai lati -->
        <line x1="10" y1="10" x2="10" y2="95" stroke="#444" strokeWidth="6"/>
        <line x1="90" y1="10" x2="90" y2="95" stroke="#444" strokeWidth="6"/>
        <circle cx="15" cy="85" r="4" fill="#555"/> <!-- Puleggia bassa SX -->
        <circle cx="85" cy="85" r="4" fill="#555"/> <!-- Puleggia bassa DX -->

        <!-- Omino in piedi -->
        <circle cx="50" cy="18" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="28" x2="50" y2="55" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="28" x2="60" y2="28" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 55 L 40 90 M 35 90 L 45 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 55 55 L 60 90 M 55 90 L 65 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>

        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <!-- Partenza: Mani incrociate davanti al bacino -->
          <path d="M 40 28 L 47 48" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 60 28 L 53 48" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <!-- Cavi incrociati dal basso -->
          <line x1="15" y1="85" x2="53" y2="48" stroke="#777" strokeWidth="1.5"/> <!-- Cavo da SX a mano DX -->
          <line x1="85" y1="85" x2="47" y2="48" stroke="#777" strokeWidth="1.5"/> <!-- Cavo da DX a mano SX -->
          <circle cx="47" cy="48" r="3" fill="#e5e5e5"/>
          <circle cx="53" cy="48" r="3" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <!-- Arrivo: Braccia larghe parallele al terreno -->
          <path d="M 40 28 L 15 35" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 60 28 L 85 35" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <!-- Cavi incrociati in trazione -->
          <line x1="15" y1="85" x2="85" y2="35" stroke="#777" strokeWidth="1.5"/>
          <line x1="85" y1="85" x2="15" y2="35" stroke="#777" strokeWidth="1.5"/>
          <circle cx="15" cy="35" r="3" fill="#e5e5e5"/>
          <circle cx="85" cy="35" r="3" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const AlzateManubriAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Omino in piedi -->
        <circle cx="50" cy="18" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="28" x2="50" y2="55" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="28" x2="60" y2="28" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 55 L 40 90 M 35 90 L 45 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 55 55 L 60 90 M 55 90 L 65 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>

        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <!-- Partenza: Braccia lungo i fianchi, gomito sbloccato -->
          <path d="M 40 28 L 35 45 L 35 55" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <path d="M 60 28 L 65 45 L 65 55" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <ellipse cx="35" cy="57" rx="3" ry="7" fill="#e5e5e5"/>
          <ellipse cx="65" cy="57" rx="3" ry="7" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <!-- Arrivo: Braccia larghe -->
          <path d="M 40 28 L 25 32 L 15 35" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <path d="M 60 28 L 75 32 L 85 35" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <ellipse cx="15" cy="37" rx="3" ry="7" fill="#e5e5e5"/>
          <ellipse cx="85" cy="37" rx="3" ry="7" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const AlzateMacchinaAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Macchina: Panca e blocco centrale -->
        <rect x="35" y="55" width="30" height="15" fill="#333" rx="2"/>
        <rect x="45" y="20" width="10" height="35" fill="#222" rx="2"/>
        
        <!-- Omino Seduto -->
        <circle cx="50" cy="18" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="28" x2="50" y2="55" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="28" x2="60" y2="28" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 55 L 35 90 M 28 90 L 42 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 55 55 L 65 90 M 58 90 L 72 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>

        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <!-- Partenza: Braccia piegate a 90° lungo il busto -->
          <path d="M 40 28 L 35 45 L 35 30" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 60 28 L 65 45 L 65 30" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <!-- Cuscinetti macchina in basso (sui gomiti) -->
          <rect x="32" y="38" width="6" height="12" fill="#e5e5e5" rx="1"/>
          <rect x="62" y="38" width="6" height="12" fill="#e5e5e5" rx="1"/>
          <path d="M 50 20 L 35 45" stroke="#555" strokeWidth="2" fill="none"/> <!-- Braccio macchina -->
          <path d="M 50 20 L 65 45" stroke="#555" strokeWidth="2" fill="none"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <!-- Arrivo: Gomiti in alto, omero orizzontale, avambraccio in avanti/su -->
          <path d="M 40 28 L 20 28 L 20 15" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 60 28 L 80 28 L 80 15" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <!-- Cuscinetti macchina in alto -->
          <rect x="17" y="22" width="6" height="12" fill="#e5e5e5" rx="1"/>
          <rect x="77" y="22" width="6" height="12" fill="#e5e5e5" rx="1"/>
          <path d="M 50 20 L 20 28" stroke="#555" strokeWidth="2" fill="none"/>
          <path d="M 50 20 L 80 28" stroke="#555" strokeWidth="2" fill="none"/>
        </g>
      </svg>
);

export const LatLargafrontaleAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <!-- Macchina -->
        <rect x="35" y="70" width="30" height="10" fill="#333" rx="2"/> 
        <rect x="30" y="55" width="40" height="8" fill="#222" rx="4"/> 
        
        <!-- Omino Rigging Fisso (Frontale) -->
        <circle cx="50" cy="25" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="31" x2="50" y2="65" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <line x1="38" y1="33" x2="62" y2="33" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 65 L 45 90 M 55 65 L 55 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinecap="round"/>

        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <!-- FASE STRETCH: Sbarra in alto sagomata -->
          <line x1="50" y1="0" x2="50" y2="15" stroke="#777" strokeWidth="1.5"/> <!-- Cavo -->
          <!-- Sbarra sagomata (piatta al centro, piegata in basso ai lati) -->
          <path d="M 35 15 L 65 15 M 35 15 L 20 25 M 65 15 L 80 25" stroke="#e5e5e5" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <!-- Braccia che vanno verso l'esterno -->
          <path d="M 38 33 L 24 22" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 62 33 L 76 22" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <!-- Mani inclinate verso l'esterno sulla piega -->
          <circle cx="24" cy="22" r="2.5" fill="#e5e5e5"/>
          <circle cx="76" cy="22" r="2.5" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <!-- FASE CONTRAZIONE: Sbarra giù al petto -->
          <line x1="50" y1="0" x2="50" y2="35" stroke="#777" strokeWidth="1.5"/>
          <path d="M 35 35 L 65 35 M 35 35 L 20 45 M 65 35 L 80 45" stroke="#e5e5e5" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 38 33 L 28 52 L 24 42" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 33 L 72 52 L 76 42" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx="24" cy="42" r="2.5" fill="#e5e5e5"/>
          <circle cx="76" cy="42" r="2.5" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const LatLargaprofiloAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="25" y="70" width="25" height="10" fill="#333" rx="2"/> 
        <rect x="55" y="52" width="10" height="15" fill="#222" rx="4"/> 
        
        <!-- Omino Profilo con SCHIENA INCLINATA INDIETRO -->
        <!-- La testa e le spalle sono spostate a sinistra rispetto al bacino -->
        <circle cx="35" cy="27" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="38" y1="33" x2="48" y2="70" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/> <!-- Schiena in diagonale -->
        <path d="M 48 70 L 60 70 L 60 95" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/> 

        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="55" y1="0" x2="55" y2="15" stroke="#777" strokeWidth="1.5"/> 
          <!-- Braccio teso avanti/alto -->
          <path d="M 38 33 L 55 15" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <line x1="45" y1="18" x2="65" y2="12" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/> <!-- Sbarra prospettiva lato -->
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="55" y1="0" x2="55" y2="40" stroke="#777" strokeWidth="1.5"/> 
          <!-- Trazione al petto alto, gomito scende verso il basso/dietro -->
          <path d="M 38 33 L 30 55 L 53 40" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="43" y1="43" x2="63" y2="37" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/> 
        </g>
      </svg>
);

export const TrazionischienaAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="10" y1="15" x2="90" y2="15" stroke="#e5e5e5" strokeWidth="3.5" strokeLinecap="round"/>
        
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <circle cx="50" cy="45" r="5" fill="#3b82f6"/> 
          <line x1="50" y1="48" x2="50" y2="75" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round"/> 
          <line x1="36" y1="50" x2="64" y2="50" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round"/> 
          <path d="M 36 50 L 25 15" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <path d="M 64 50 L 75 15" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <path d="M 50 75 L 45 90 L 55 90 Z" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinejoin="round"/> 
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <circle cx="50" cy="12" r="5" fill="#3b82f6"/>
          <line x1="50" y1="15" x2="50" y2="42" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round"/>
          <line x1="36" y1="17" x2="64" y2="17" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round"/>
          <path d="M 36 17 L 28 35 L 25 15" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 64 17 L 72 35 L 75 15" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 50 42 L 45 57 L 55 57 Z" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinejoin="round"/>
        </g>
      </svg>
);

export const LatPresaStrettaAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="25" y="70" width="25" height="10" fill="#333" rx="2"/> 
        <rect x="55" y="52" width="8" height="15" fill="#222" rx="4"/> 
        
        <!-- Omino Profilo -->
        <circle cx="35" cy="27" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="38" y1="33" x2="48" y2="70" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 48 70 L 60 70 L 60 95" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/> 

        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="55" y1="0" x2="55" y2="15" stroke="#777" strokeWidth="1.5"/> 
          <polygon points="52,15 58,15 55,5" fill="none" stroke="#e5e5e5" strokeWidth="1.5"/> <!-- Triangolo -->
          <path d="M 38 33 L 55 15" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="55" y1="0" x2="55" y2="45" stroke="#777" strokeWidth="1.5"/> 
          <polygon points="52,45 58,45 55,35" fill="none" stroke="#e5e5e5" strokeWidth="1.5"/> 
          <path d="M 38 33 L 28 55 L 52 45" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        </g>
      </svg>
);

const animationRegistry: Record<string, React.FC> = {
  'p-piana-bil': PPianaBilAnimation,
  'chest-press': ChestPressAnimation,
  'piana-manubri': PianaManubriAnimation,
  'inclinata-man': InclinataManAnimation,
  'inclinata-bil': InclinataBilAnimation,
  'pressa-inclinata': PressaInclinataAnimation,
  'chest-press': ChestPressAnimation2,
  'pec-deck': PecDeckAnimation,
  'cavi-seduto': CaviSedutoAnimation,
  'croci-manubri': CrociManubriAnimation,
  'croci-cavi-piana': CrociCaviPianaAnimation,
  'pectoral-machine': PectoralMachineAnimation,
  'lento-manubri': LentoManubriAnimation,
  'military-press': MilitaryPressAnimation,
  'shoulder-mach': ShoulderMachAnimation,
  'alzate-cavi': AlzateCaviAnimation,
  'alzate-manubri': AlzateManubriAnimation,
  'alzate-macchina': AlzateMacchinaAnimation,
  'lat-largafrontale': LatLargafrontaleAnimation,
  'lat-largaprofilo': LatLargaprofiloAnimation,
  'trazionischiena': TrazionischienaAnimation,
  'lat-presa-stretta': LatPresaStrettaAnimation,
};

export interface ExerciseIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const ExerciseIcon: React.FC<ExerciseIconProps> = ({ 
  name, 
  size = 150, 
  className = "" 
}) => {
  const AnimationComponent = animationRegistry[name.toLowerCase()];

  if (!AnimationComponent) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-neutral-800 rounded-xl flex items-center justify-center border border-neutral-700 ${className}`}
      >
        <span className="text-neutral-500 text-xs text-center p-2">Manca:<br/>{name}</span>
      </div>
    );
  }

  return (
    <div 
      style={{ width: size, height: size }} 
      className={`bg-[#171717] rounded-[20px] p-[15px] border-2 border-neutral-700 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] ${className}`}
    >
      <AnimationComponent />
    </div>
  );
};
