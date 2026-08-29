import React from 'react';

export const PPianaBilAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="72" y1="15" x2="72" y2="90" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
        <rect x="15" y="52" width="65" height="6" fill="#333" rx="1"/>
        <line x1="25" y1="58" x2="25" y2="90" stroke="#444" strokeWidth="3"/>
        <line x1="65" y1="58" x2="65" y2="90" stroke="#444" strokeWidth="3"/>
        <circle cx="65" cy="47" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="60" y1="49.5" x2="35" y2="49.5" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 35 49.5 L 25 70 L 25 90 M 25 90 L 15 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 53 49.5 L 50 65 L 53 40" stroke="#f97316" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <line x1="35" y1="40" x2="68" y2="40" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="33" y="30" width="4" height="20" fill="#e5e5e5" rx="1"/>
          <rect x="66" y="30" width="4" height="20" fill="#e5e5e5" rx="1"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="53" y1="49.5" x2="53" y2="18" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="35" y1="18" x2="68" y2="18" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="33" y="8" width="4" height="20" fill="#e5e5e5" rx="1"/>
          <rect x="66" y="8" width="4" height="20" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const ChestPressAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="45" y1="62" x2="70" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="68" y1="62" x2="68" y2="20" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="55" y1="62" x2="55" y2="90" stroke="#444" strokeWidth="4"/>
        <line x1="68" y1="62" x2="68" y2="90" stroke="#444" strokeWidth="4"/>
        <circle cx="63" cy="20" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="63" y1="27" x2="63" y2="58" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 63 58 L 42 58 L 42 90 M 42 90 L 32 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 63 35 L 75 42 L 55 35" stroke="#3b82f6" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <line x1="55" y1="15" x2="55" y2="45" stroke="#555" strokeWidth="3"/>
          <rect x="53" y="30" width="4" height="10" fill="#e5e5e5" rx="1"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="63" y1="35" x2="25" y2="35" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="25" y1="15" x2="25" y2="45" stroke="#555" strokeWidth="3"/>
          <line x1="68" y1="15" x2="25" y2="15" stroke="#444" strokeWidth="2"/>
          <rect x="23" y="30" width="4" height="10" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const PianaManubriAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="15" y="52" width="65" height="6" fill="#333" rx="1"/>
        <line x1="25" y1="58" x2="25" y2="90" stroke="#444" strokeWidth="3"/>
        <line x1="65" y1="58" x2="65" y2="90" stroke="#444" strokeWidth="3"/>
        <circle cx="65" cy="47" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="60" y1="49.5" x2="35" y2="49.5" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 35 49.5 L 25 70 L 25 90 M 25 90 L 15 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 53 49.5 L 50 65 L 53 40" stroke="#3b82f6" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
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

        <line x1="40" y1="62" x2="60" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="58" y1="62" x2="78" y2="30" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="45" y1="62" x2="45" y2="90" stroke="#444" strokeWidth="4"/>
        <line x1="65" y1="52" x2="65" y2="90" stroke="#444" strokeWidth="4"/>
        <circle cx="80" cy="24" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="75" y1="32" x2="55" y2="58" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 55 58 L 40 62 L 40 90 M 40 90 L 30 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 68 41 L 72 55 L 65 42" stroke="#f97316" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <line x1="61" y1="42" x2="69" y2="42" stroke="#e5e5e5" strokeWidth="2.5"/>
          <ellipse cx="61" cy="42" rx="2" ry="8" fill="#e5e5e5"/>
          <ellipse cx="69" cy="42" rx="2" ry="8" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="68" y1="41" x2="68" y2="15" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="64" y1="15" x2="72" y2="15" stroke="#e5e5e5" strokeWidth="2.5"/>
          <ellipse cx="64" cy="15" rx="2" ry="8" fill="#e5e5e5"/>
          <ellipse cx="72" cy="15" rx="2" ry="8" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const InclinataBilAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="72" y1="10" x2="72" y2="90" stroke="#444" strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="62" x2="60" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="58" y1="62" x2="78" y2="30" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="45" y1="62" x2="45" y2="90" stroke="#444" strokeWidth="4"/>
        <line x1="65" y1="52" x2="65" y2="90" stroke="#444" strokeWidth="4"/>
        <circle cx="80" cy="24" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="75" y1="32" x2="55" y2="58" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 55 58 L 40 62 L 40 90 M 40 90 L 30 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 68 41 L 72 55 L 65 42" stroke="#3b82f6" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <line x1="48" y1="42" x2="80" y2="42" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="46" y="32" width="4" height="20" fill="#e5e5e5" rx="1"/>
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

        <line x1="45" y1="62" x2="70" y2="62" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="68" y1="62" x2="78" y2="20" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
        <line x1="55" y1="62" x2="55" y2="90" stroke="#444" strokeWidth="4"/>
        <line x1="68" y1="62" x2="68" y2="90" stroke="#444" strokeWidth="4"/>
        <circle cx="75" cy="18" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="74" y1="26" x2="65" y2="58" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 65 58 L 42 58 L 42 90 M 42 90 L 32 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 70 38 L 80 48 L 60 40" stroke="#3b82f6" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <line x1="60" y1="20" x2="60" y2="50" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
          <rect x="58" y="35" width="4" height="10" fill="#e5e5e5" rx="1"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <line x1="70" y1="38" x2="35" y2="25" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="35" y1="10" x2="35" y2="40" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
          <line x1="75" y1="15" x2="35" y2="10" stroke="#444" strokeWidth="2"/>
          <rect x="33" y="20" width="4" height="10" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const PecDeckAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="42" y="10" width="16" height="80" fill="#333" rx="2"/>
        <rect x="30" y="60" width="40" height="8" fill="#222" rx="2"/>
        <circle cx="50" cy="20" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <rect x="42" y="27" width="16" height="33" fill="none" stroke="#3b82f6" strokeWidth="3" rx="2"/>
        <path d="M 45 60 L 40 80 L 40 90 M 35 90 L 45 90" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
        <path d="M 55 60 L 60 80 L 60 90 M 55 90 L 65 90" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 42 33 L 20 33 L 20 20" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <path d="M 58 33 L 80 33 L 80 20" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <polyline points="50,15 20,15 20,25" stroke="#555" strokeWidth="3" fill="none"/>
          <polyline points="50,15 80,15 80,25" stroke="#555" strokeWidth="3" fill="none"/>
          <rect x="18" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
          <rect x="78" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 42 33 L 42 20" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 58 33 L 58 20" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <polyline points="50,15 42,15 42,25" stroke="#555" strokeWidth="3" fill="none"/>
          <polyline points="50,15 58,15 58,25" stroke="#555" strokeWidth="3" fill="none"/>
          <rect x="40" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
          <rect x="56" y="25" width="4" height="15" fill="#e5e5e5" rx="1"/>
        </g>
      </svg>
);

export const CaviSedutoAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="35" y="65" width="30" height="10" fill="#333" rx="2"/>
        <line x1="10" y1="10" x2="10" y2="90" stroke="#444" strokeWidth="6"/>
        <line x1="90" y1="10" x2="90" y2="90" stroke="#444" strokeWidth="6"/>
        <circle cx="50" cy="25" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <rect x="42" y="32" width="16" height="33" fill="none" stroke="#3b82f6" strokeWidth="3" rx="2"/>
        <path d="M 45 65 L 40 85 M 55 65 L 60 85" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 42 38 L 25 45 M 58 38 L 75 45" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <line x1="10" y1="40" x2="25" y2="45" stroke="#777" strokeWidth="1.5"/>
          <line x1="90" y1="40" x2="75" y2="45" stroke="#777" strokeWidth="1.5"/>
          <circle cx="25" cy="45" r="3" fill="#e5e5e5"/>
          <circle cx="75" cy="45" r="3" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 42 38 L 47 48 M 58 38 L 53 48" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <line x1="10" y1="40" x2="47" y2="48" stroke="#777" strokeWidth="1.5"/>
          <line x1="90" y1="40" x2="53" y2="48" stroke="#777" strokeWidth="1.5"/>
          <circle cx="47" cy="48" r="3" fill="#e5e5e5"/>
          <circle cx="53" cy="48" r="3" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const CrociManubriAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="42" y="65" width="16" height="35" fill="#333" rx="2"/>
        <rect x="35" y="65" width="30" height="8" fill="#444" rx="2"/>
        <circle cx="50" cy="53" r="8" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="38" y1="65" x2="62" y2="65" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 38 65 L 20 75 L 15 70" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <path d="M 62 65 L 80 75 L 85 70" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <circle cx="15" cy="70" r="3" fill="#e5e5e5"/>
          <circle cx="85" cy="70" r="3" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 38 65 L 45 40 L 48 35" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <path d="M 62 65 L 55 40 L 52 35" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <circle cx="48" cy="35" r="3" fill="#e5e5e5"/>
          <circle cx="52" cy="35" r="3" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const CrociCaviPianaAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="10" y1="10" x2="10" y2="95" stroke="#444" strokeWidth="6"/>
        <line x1="90" y1="10" x2="90" y2="95" stroke="#444" strokeWidth="6"/>
        <circle cx="15" cy="85" r="4" fill="#555"/>
        <circle cx="85" cy="85" r="4" fill="#555"/>
        <rect x="42" y="65" width="16" height="35" fill="#333" rx="2"/>
        <rect x="35" y="65" width="30" height="8" fill="#222" rx="2"/>
        <circle cx="50" cy="53" r="8" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="38" y1="65" x2="62" y2="65" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="15" y1="85" x2="15" y2="70" stroke="#777" strokeWidth="1.5"/>
          <line x1="85" y1="85" x2="85" y2="70" stroke="#777" strokeWidth="1.5"/>
          <path d="M 38 65 L 20 75 L 15 70" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <path d="M 62 65 L 80 75 L 85 70" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <circle cx="15" cy="70" r="2" fill="#e5e5e5"/>
          <circle cx="85" cy="70" r="2" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="15" y1="85" x2="48" y2="35" stroke="#777" strokeWidth="1.5"/>
          <line x1="85" y1="85" x2="52" y2="35" stroke="#777" strokeWidth="1.5"/>
          <path d="M 38 65 L 45 40 L 48 35" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <path d="M 62 65 L 55 40 L 52 35" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
          <circle cx="48" cy="35" r="2" fill="#e5e5e5"/>
          <circle cx="52" cy="35" r="2" fill="#e5e5e5"/>
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
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0;1;0" keyTimes="0;0.25;0.5;0.75;1" dur="2.4s" repeatCount="indefinite" calcMode="discrete"/>
          <path d="M 38 28 L 25 35 L 30 25" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 28 L 75 35 L 70 25" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx="30" cy="25" r="5" fill="#e5e5e5"/>
          <circle cx="70" cy="25" r="5" fill="#e5e5e5"/>
        </g>
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
        <path d="M 50 55 L 42 90 M 35 90 L 49 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 50 55 L 58 90 M 51 90 L 65 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 40 28 L 32 40 L 32 32" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 60 28 L 68 40 L 68 32" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="20" y1="32" x2="80" y2="32" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round"/>
          <rect x="22" y="22" width="4" height="20" fill="#e5e5e5" rx="1"/>
          <rect x="74" y="22" width="4" height="20" fill="#e5e5e5" rx="1"/>
        </g>
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

        <rect x="35" y="65" width="30" height="10" fill="#333" rx="2"/> 
        <rect x="42" y="20" width="16" height="50" fill="#222" rx="2"/> 
        <line x1="20" y1="10" x2="20" y2="90" stroke="#444" strokeWidth="4"/> 
        <line x1="80" y1="10" x2="80" y2="90" stroke="#444" strokeWidth="4"/> 
        <circle cx="50" cy="20" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="26" x2="50" y2="65" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <line x1="38" y1="28" x2="62" y2="28" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 65 L 35 90 M 28 90 L 42 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 55 65 L 65 90 M 58 90 L 72 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 38 28 L 28 40 L 28 32" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 28 L 72 40 L 72 32" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="15" y1="32" x2="35" y2="32" stroke="#555" strokeWidth="4" strokeLinecap="round"/>
          <line x1="85" y1="32" x2="65" y2="32" stroke="#555" strokeWidth="4" strokeLinecap="round"/>
        </g>
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

        <line x1="10" y1="10" x2="10" y2="95" stroke="#444" strokeWidth="6"/>
        <line x1="90" y1="10" x2="90" y2="95" stroke="#444" strokeWidth="6"/>
        <circle cx="15" cy="85" r="4" fill="#555"/>
        <circle cx="85" cy="85" r="4" fill="#555"/>
        <circle cx="50" cy="18" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="28" x2="50" y2="55" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="28" x2="60" y2="28" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 55 L 40 90 M 35 90 L 45 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 55 55 L 60 90 M 55 90 L 65 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 40 28 L 47 48" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 60 28 L 53 48" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <line x1="15" y1="85" x2="53" y2="48" stroke="#777" strokeWidth="1.5"/>
          <line x1="85" y1="85" x2="47" y2="48" stroke="#777" strokeWidth="1.5"/>
          <circle cx="47" cy="48" r="3" fill="#e5e5e5"/>
          <circle cx="53" cy="48" r="3" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 40 28 L 15 35" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 60 28 L 85 35" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <line x1="15" y1="85" x2="85" y2="35" stroke="#777" strokeWidth="1.5"/>
          <line x1="85" y1="85" x2="15" y2="35" stroke="#777" strokeWidth="1.5"/>
          <circle cx="15" cy="35" r="3" fill="#e5e5e5"/>
          <circle cx="85" cy="35" r="3" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const AlzateManubriAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <circle cx="50" cy="18" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="28" x2="50" y2="55" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="28" x2="60" y2="28" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 55 L 40 90 M 35 90 L 45 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 55 55 L 60 90 M 55 90 L 65 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 40 28 L 35 45 L 35 55" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <path d="M 60 28 L 65 45 L 65 55" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <ellipse cx="35" cy="57" rx="3" ry="7" fill="#e5e5e5"/>
          <ellipse cx="65" cy="57" rx="3" ry="7" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 40 28 L 25 32 L 15 35" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <path d="M 60 28 L 75 32 L 85 35" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/>
          <ellipse cx="15" cy="37" rx="3" ry="7" fill="#e5e5e5"/>
          <ellipse cx="85" cy="37" rx="3" ry="7" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const AlzateMacchinaAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="35" y="55" width="30" height="15" fill="#333" rx="2"/>
        <rect x="45" y="20" width="10" height="35" fill="#222" rx="2"/>
        <circle cx="50" cy="18" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="28" x2="50" y2="55" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <line x1="40" y1="28" x2="60" y2="28" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 55 L 35 90 M 28 90 L 42 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <path d="M 55 55 L 65 90 M 58 90 L 72 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 40 28 L 35 45 L 35 30" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 60 28 L 65 45 L 65 30" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <rect x="32" y="38" width="6" height="12" fill="#e5e5e5" rx="1"/>
          <rect x="62" y="38" width="6" height="12" fill="#e5e5e5" rx="1"/>
          <path d="M 50 20 L 35 45" stroke="#555" strokeWidth="2" fill="none"/>
          <path d="M 50 20 L 65 45" stroke="#555" strokeWidth="2" fill="none"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.8s" repeatCount="indefinite"/>
          <path d="M 40 28 L 20 28 L 20 15" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 60 28 L 80 28 L 80 15" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <rect x="17" y="22" width="6" height="12" fill="#e5e5e5" rx="1"/>
          <rect x="77" y="22" width="6" height="12" fill="#e5e5e5" rx="1"/>
          <path d="M 50 20 L 20 28" stroke="#555" strokeWidth="2" fill="none"/>
          <path d="M 50 20 L 80 28" stroke="#555" strokeWidth="2" fill="none"/>
        </g>
      </svg>
);

export const LatLargaFrontaleAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="35" y="70" width="30" height="10" fill="#333" rx="2"/> 
        <rect x="30" y="55" width="40" height="8" fill="#222" rx="4"/> 
        <circle cx="50" cy="25" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="50" y1="31" x2="50" y2="65" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <line x1="38" y1="33" x2="62" y2="33" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 45 65 L 45 90 M 55 65 L 55 90" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="50" y1="0" x2="50" y2="15" stroke="#777" strokeWidth="1.5"/>
          <path d="M 35 15 L 65 15 M 35 15 L 20 25 M 65 15 L 80 25" stroke="#e5e5e5" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 38 33 L 24 22" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M 62 33 L 76 22" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <circle cx="24" cy="22" r="2.5" fill="#e5e5e5"/>
          <circle cx="76" cy="22" r="2.5" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="50" y1="0" x2="50" y2="35" stroke="#777" strokeWidth="1.5"/>
          <path d="M 35 35 L 65 35 M 35 35 L 20 45 M 65 35 L 80 45" stroke="#e5e5e5" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 38 33 L 28 52 L 24 42" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M 62 33 L 72 52 L 76 42" stroke="#f97316" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx="24" cy="42" r="2.5" fill="#e5e5e5"/>
          <circle cx="76" cy="42" r="2.5" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const LatLargaProfiloAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="25" y="70" width="25" height="10" fill="#333" rx="2"/> 
        <rect x="55" y="52" width="10" height="15" fill="#222" rx="4"/> 
        <circle cx="35" cy="27" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <line x1="38" y1="33" x2="48" y2="70" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 48 70 L 60 70 L 60 95" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round"/> 
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="55" y1="0" x2="55" y2="15" stroke="#777" strokeWidth="1.5"/> 
          <path d="M 38 33 L 55 15" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <line x1="45" y1="18" x2="65" y2="12" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="55" y1="0" x2="55" y2="40" stroke="#777" strokeWidth="1.5"/> 
          <path d="M 38 33 L 30 55 L 53 40" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="43" y1="43" x2="63" y2="37" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/> 
        </g>
      </svg>
);

export const TrazioniSchienaAnimation = () => (
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
        <circle cx="35" cy="27" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="38" y1="33" x2="48" y2="70" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 48 70 L 60 70 L 60 95" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/> 
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="55" y1="0" x2="55" y2="15" stroke="#777" strokeWidth="1.5"/> 
          <polygon points="52,15 58,15 55,5" fill="none" stroke="#e5e5e5" strokeWidth="1.5"/> 
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

export const RematoreBilanciereAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <path d="M 40 42 L 45 60 L 45 85" stroke="#c2410c" strokeWidth="4" fill="none" strokeLinejoin="round"/>
        <line x1="25" y1="45" x2="60" y2="25" stroke="#f97316" strokeWidth="9" strokeLinecap="round"/>
        <circle cx="70" cy="18" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <path d="M 25 45 L 30 65 L 30 90" stroke="#f97316" strokeWidth="6" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="65" y1="22" x2="70" y2="60" stroke="#c2410c" strokeWidth="3" strokeLinecap="round"/>
          <line x1="15" y1="75" x2="85" y2="55" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx="80" cy="56" rx="2.5" ry="12" fill="#3b82f6"/>
          <line x1="55" y1="28" x2="40" y2="68" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
          <ellipse cx="20" cy="73" rx="4" ry="18" fill="#3b82f6"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 65 22 L 50 10 L 55 40" stroke="#c2410c" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="20" y1="52" x2="90" y2="32" stroke="#e5e5e5" strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx="85" cy="33" rx="2.5" ry="12" fill="#3b82f6"/>
          <path d="M 55 28 L 40 15 L 45 45" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <ellipse cx="25" cy="50" rx="4" ry="18" fill="#3b82f6"/>
        </g>
      </svg>
);

export const PulleyBassoAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="20" y="70" width="25" height="10" fill="#333" rx="2"/> 
        <line x1="85" y1="65" x2="85" y2="85" stroke="#444" strokeWidth="4"/> 
        <circle cx="95" cy="75" r="4" fill="#555"/> 
        <path d="M 35 70 L 65 60 L 85 70" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <circle cx="50" cy="25" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
          <line x1="35" y1="70" x2="45" y2="35" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
          <line x1="45" y1="35" x2="75" y2="45" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round"/>
          <line x1="95" y1="75" x2="75" y2="45" stroke="#777" strokeWidth="1.5"/>
          <polygon points="72,45 78,45 75,37" fill="none" stroke="#e5e5e5" strokeWidth="1.5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <circle cx="30" cy="25" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
          <line x1="35" y1="70" x2="30" y2="35" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
          <path d="M 30 35 L 10 45 L 35 55" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="95" y1="75" x2="35" y2="55" stroke="#777" strokeWidth="1.5"/>
          <polygon points="32,55 38,55 35,47" fill="none" stroke="#e5e5e5" strokeWidth="1.5"/>
        </g>
      </svg>
);

export const RemManubrioPancaAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="20" y="55" width="50" height="8" fill="#333" rx="2"/>
        <line x1="25" y1="63" x2="25" y2="90" stroke="#444" strokeWidth="3"/>
        <line x1="65" y1="63" x2="65" y2="90" stroke="#444" strokeWidth="3"/>
        <line x1="60" y1="45" x2="60" y2="55" stroke="#1d4ed8" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M 30 45 L 30 55 L 15 55" stroke="#1d4ed8" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        <circle cx="70" cy="40" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <line x1="30" y1="45" x2="60" y2="45" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round"/> 
        <path d="M 30 45 L 35 70 L 35 90" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinejoin="round"/>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="60" y1="45" x2="60" y2="80" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
          <line x1="56" y1="80" x2="64" y2="80" stroke="#e5e5e5" strokeWidth="2.5"/>
          <ellipse cx="56" cy="80" rx="2" ry="7" fill="#e5e5e5"/>
          <ellipse cx="64" cy="80" rx="2" ry="7" fill="#e5e5e5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 60 45 L 45 25 L 60 45" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="56" y1="45" x2="64" y2="45" stroke="#e5e5e5" strokeWidth="2.5"/>
          <ellipse cx="56" cy="45" rx="2" ry="7" fill="#e5e5e5"/>
          <ellipse cx="64" cy="45" rx="2" ry="7" fill="#e5e5e5"/>
        </g>
      </svg>
);

export const CurlBilanciereAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <g stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 38 28 L 50 24 L 62 28 M 50 24 L 50 55 M 42 55 L 50 55 L 58 55"/>
          <path d="M 42 55 L 38 75 L 35 95 M 58 55 L 62 75 L 65 95"/>
          <path d="M 38 28 L 35 50 M 62 28 L 65 50"/>
        </g>
        <circle cx="50" cy="15" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <g fill="#e5e5e5">
          <circle cx="50" cy="24" r="2.5"/> <circle cx="38" cy="28" r="2.5"/> <circle cx="62" cy="28" r="2.5"/>
          <circle cx="50" cy="55" r="2.5"/> <circle cx="42" cy="55" r="2.5"/> <circle cx="58" cy="55" r="2.5"/>
          <circle cx="38" cy="75" r="2.5"/> <circle cx="62" cy="75" r="2.5"/>
          <circle cx="35" cy="50" r="3"/> <circle cx="65" cy="50" r="3"/>
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 35 50 L 25 72 M 65 50 L 75 72" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="25" cy="72" r="2.5" fill="#e5e5e5"/> <circle cx="75" cy="72" r="2.5" fill="#e5e5e5"/>
          <line x1="12" y1="72" x2="88" y2="72" stroke="#71717a" strokeWidth="3" strokeLinecap="round"/>
          <rect x="14" y="60" width="7" height="24" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="2"/>
          <rect x="79" y="60" width="7" height="24" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="2"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 35 50 L 30 26 M 65 50 L 70 26" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="30" cy="26" r="2.5" fill="#e5e5e5"/> <circle cx="70" cy="26" r="2.5" fill="#e5e5e5"/>
          <line x1="17" y1="26" x2="83" y2="26" stroke="#71717a" strokeWidth="3" strokeLinecap="round"/>
          <rect x="19" y="14" width="7" height="24" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="2"/>
          <rect x="74" y="14" width="7" height="24" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="2"/>
        </g>
      </svg>
);

export const CurlAlternatoAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 38 28 L 50 24 L 62 28 M 50 24 L 50 55 M 42 55 L 50 55 L 58 55"/>
          <path d="M 42 55 L 38 75 L 35 95 M 58 55 L 62 75 L 65 95"/>
          <path d="M 38 28 L 35 50 M 62 28 L 65 50"/>
        </g>
        <circle cx="50" cy="15" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <g fill="#e5e5e5">
          <circle cx="50" cy="24" r="2.5"/> <circle cx="38" cy="28" r="2.5"/> <circle cx="62" cy="28" r="2.5"/>
          <circle cx="50" cy="55" r="2.5"/> <circle cx="42" cy="55" r="2.5"/> <circle cx="58" cy="55" r="2.5"/>
          <circle cx="38" cy="75" r="2.5"/> <circle cx="62" cy="75" r="2.5"/>
          <circle cx="35" cy="50" r="3"/> <circle cx="65" cy="50" r="3"/>
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" repeatCount="indefinite"/>
          <path d="M 35 50 L 30 28 M 65 50 L 75 72" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="30" cy="28" r="2.5" fill="#e5e5e5"/> <circle cx="75" cy="72" r="2.5" fill="#e5e5e5"/>
          <line x1="22" y1="28" x2="38" y2="28" stroke="#71717a" strokeWidth="2.5"/>
          <ellipse cx="22" cy="28" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/> 
          <ellipse cx="38" cy="28" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
          <line x1="67" y1="72" x2="83" y2="72" stroke="#71717a" strokeWidth="2.5"/>
          <ellipse cx="67" cy="72" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/> 
          <ellipse cx="83" cy="72" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" repeatCount="indefinite"/>
          <path d="M 35 50 L 25 72 M 65 50 L 70 28" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="25" cy="72" r="2.5" fill="#e5e5e5"/> <circle cx="70" cy="28" r="2.5" fill="#e5e5e5"/>
          <line x1="17" y1="72" x2="33" y2="72" stroke="#71717a" strokeWidth="2.5"/>
          <ellipse cx="17" cy="72" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/> 
          <ellipse cx="33" cy="72" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
          <line x1="62" y1="28" x2="78" y2="28" stroke="#71717a" strokeWidth="2.5"/>
          <ellipse cx="62" cy="28" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/> 
          <ellipse cx="78" cy="28" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
        </g>
      </svg>
);

export const CurlPancaScottAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="70" y="65" width="20" height="8" fill="#27272a" rx="2"/> 
        <line x1="80" y1="73" x2="80" y2="95" stroke="#444" strokeWidth="4"/> 
        <line x1="55" y1="35" x2="30" y2="65" stroke="#27272a" strokeWidth="8" strokeLinecap="round"/> 
        <line x1="45" y1="50" x2="45" y2="95" stroke="#444" strokeWidth="4"/> 
        <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 75 28 L 72 65"/> 
          <path d="M 72 65 L 55 75 L 55 95"/> 
          <path d="M 75 28 L 52 50"/> 
        </g>
        <circle cx="75" cy="18" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <g fill="#e5e5e5">
          <circle cx="75" cy="28" r="2.5"/> 
          <circle cx="72" cy="65" r="2.5"/> 
          <circle cx="55" cy="75" r="2.5"/> 
          <circle cx="52" cy="50" r="3"/> 
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 52 50 L 32 72" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="32" cy="72" r="2.5" fill="#e5e5e5"/> 
          <line x1="14" y1="72" x2="50" y2="72" stroke="#71717a" strokeWidth="3" strokeLinecap="round"/>
          <ellipse cx="17" cy="72" rx="3.5" ry="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
          <ellipse cx="47" cy="72" rx="3.5" ry="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 52 50 L 52 24" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="52" cy="24" r="2.5" fill="#e5e5e5"/> 
          <line x1="34" y1="24" x2="70" y2="24" stroke="#71717a" strokeWidth="3" strokeLinecap="round"/>
          <ellipse cx="37" cy="24" rx="3.5" ry="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
          <ellipse cx="67" cy="24" rx="3.5" ry="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
        </g>
      </svg>
);

export const PushdownCaviAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="20" y1="10" x2="20" y2="95" stroke="#333" strokeWidth="6"/> 
        <circle cx="25" cy="15" r="4" fill="#555"/> 
        <g stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 50 25 L 45 55"/> 
          <path d="M 45 55 L 40 75 L 45 95"/>
          <path d="M 50 25 L 45 45"/>
        </g>
        <circle cx="53" cy="15" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
        <g fill="#e5e5e5">
          <circle cx="50" cy="25" r="2.5"/> 
          <circle cx="45" cy="55" r="2.5"/> 
          <circle cx="40" cy="75" r="2.5"/> 
          <circle cx="45" cy="45" r="3"/>   
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="45" y1="45" x2="25" y2="45" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="25" cy="45" r="2.5" fill="#e5e5e5"/> 
          <line x1="25" y1="15" x2="25" y2="45" stroke="#71717a" strokeWidth="1.5"/>
          <line x1="22" y1="45" x2="28" y2="45" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="45" y1="45" x2="35" y2="65" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="35" cy="65" r="2.5" fill="#e5e5e5"/> 
          <line x1="25" y1="15" x2="35" y2="65" stroke="#71717a" strokeWidth="1.5"/>
          <line x1="31" y1="63" x2="39" y2="67" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round"/>
        </g>
      </svg>
);

export const FrenchPressAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="15" y="60" width="60" height="8" fill="#27272a" rx="2"/> 
        <line x1="25" y1="68" x2="25" y2="95" stroke="#444" strokeWidth="4"/> 
        <line x1="65" y1="68" x2="65" y2="95" stroke="#444" strokeWidth="4"/> 
        <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 30 55 L 60 55"/> 
          <path d="M 60 55 L 65 75 L 65 95"/>
          <path d="M 35 55 L 30 35"/>
        </g>
        <circle cx="20" cy="55" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <g fill="#e5e5e5">
          <circle cx="35" cy="55" r="2.5"/> 
          <circle cx="60" cy="55" r="2.5"/> 
          <circle cx="65" cy="75" r="2.5"/> 
          <circle cx="30" cy="35" r="3"/>   
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="30" y1="35" x2="15" y2="40" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="15" cy="40" r="2.5" fill="#e5e5e5"/> 
          <line x1="10" y1="45" x2="20" y2="35" stroke="#71717a" strokeWidth="2"/>
          <ellipse cx="15" cy="40" rx="3.5" ry="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" transform="rotate(45 15 40)"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="30" y1="35" x2="25" y2="15" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="25" cy="15" r="2.5" fill="#e5e5e5"/> 
          <line x1="17" y1="15" x2="33" y2="15" stroke="#71717a" strokeWidth="2"/>
          <ellipse cx="25" cy="15" rx="3.5" ry="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
        </g>
      </svg>
);

export const EstensioniManAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="45" y="70" width="20" height="8" fill="#27272a" rx="2"/> 
        <rect x="65" y="50" width="6" height="25" fill="#27272a" rx="2"/> 
        <line x1="55" y1="78" x2="55" y2="95" stroke="#444" strokeWidth="4"/> 
        <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 60 45 L 60 70"/> 
          <path d="M 60 70 L 40 80 L 40 95"/>
          <path d="M 60 45 L 60 25"/>
        </g>
        <circle cx="55" cy="35" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
        <g fill="#e5e5e5">
          <circle cx="60" cy="45" r="2.5"/> 
          <circle cx="60" cy="70" r="2.5"/> 
          <circle cx="40" cy="80" r="2.5"/> 
          <circle cx="60" cy="25" r="3"/>   
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="60" y1="25" x2="72" y2="40" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="72" cy="40" r="2.5" fill="#e5e5e5"/> 
          <line x1="65" y1="40" x2="79" y2="40" stroke="#71717a" strokeWidth="2.5"/>
          <ellipse cx="65" cy="40" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
          <ellipse cx="79" cy="40" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="60" y1="25" x2="60" y2="5" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="60" cy="5" r="2.5" fill="#e5e5e5"/> 
          <line x1="53" y1="5" x2="67" y2="5" stroke="#71717a" strokeWidth="2.5"/>
          <ellipse cx="53" cy="5" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
          <ellipse cx="67" cy="5" rx="2.5" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
        </g>
      </svg>
);

export const SquatBilanciereAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <circle cx="55" cy="90" r="2.5" fill="#e5e5e5"/> 
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 55 90 L 60 67 L 55 45 L 55 20" stroke="#f97316" strokeWidth="5" fill="none" strokeLinejoin="round"/>
          <circle cx="55" cy="12" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
          <circle cx="60" cy="67" r="2.5" fill="#e5e5e5"/> 
          <circle cx="55" cy="45" r="2.5" fill="#e5e5e5"/> 
          <circle cx="55" cy="20" r="2.5" fill="#e5e5e5"/> 
          <line x1="45" y1="20" x2="65" y2="20" stroke="#71717a" strokeWidth="3"/>
          <ellipse cx="55" cy="20" rx="4" ry="16" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 55 90 L 65 70 L 40 70 L 50 40" stroke="#f97316" strokeWidth="5" fill="none" strokeLinejoin="round"/>
          <circle cx="50" cy="32" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
          <circle cx="65" cy="70" r="2.5" fill="#e5e5e5"/> 
          <circle cx="40" cy="70" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="40" r="2.5" fill="#e5e5e5"/> 
          <line x1="40" y1="40" x2="60" y2="40" stroke="#71717a" strokeWidth="3"/>
          <ellipse cx="50" cy="40" rx="4" ry="16" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
        </g>
      </svg>
);

export const LegPress45Animation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="10" y1="85" x2="40" y2="85" stroke="#333" strokeWidth="6"/> 
        <line x1="40" y1="85" x2="15" y2="50" stroke="#333" strokeWidth="8" strokeLinecap="round"/> 
        <line x1="30" y1="90" x2="90" y2="30" stroke="#444" strokeWidth="4"/> 
        <path d="M 15 50 L 30 70" stroke="#3b82f6" strokeWidth="5" fill="none"/> 
        <circle cx="10" cy="42" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
        <circle cx="30" cy="70" r="2.5" fill="#e5e5e5"/> 
        <circle cx="15" cy="50" r="2.5" fill="#e5e5e5"/> 
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 30 70 L 40 55 L 50 45" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinejoin="round"/>
          <circle cx="40" cy="55" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="45" r="2.5" fill="#e5e5e5"/> 
          <line x1="43" y1="38" x2="57" y2="52" stroke="#e5e5e5" strokeWidth="4" strokeLinecap="round"/> 
          <rect x="52" y="47" width="12" height="20" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" transform="rotate(-45 52 47)"/> 
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 30 70 L 50 50 L 70 30" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinejoin="round"/>
          <circle cx="50" cy="50" r="2.5" fill="#e5e5e5"/> 
          <circle cx="70" cy="30" r="2.5" fill="#e5e5e5"/> 
          <line x1="63" y1="23" x2="77" y2="37" stroke="#e5e5e5" strokeWidth="4" strokeLinecap="round"/>
          <rect x="72" y="32" width="12" height="20" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" transform="rotate(-45 72 32)"/> 
        </g>
      </svg>
);

export const AffondiManubriAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <circle cx="30" cy="95" r="2.5" fill="#e5e5e5"/> 
        <circle cx="70" cy="95" r="2.5" fill="#e5e5e5"/> 
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 30 95 L 40 75 L 50 55 L 65 70 L 70 95" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinejoin="round"/>
          <path d="M 50 55 L 50 20" stroke="#3b82f6" strokeWidth="5" fill="none"/> 
          <circle cx="50" cy="12" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
          <path d="M 50 20 L 50 50" stroke="#3b82f6" strokeWidth="4"/>
          <line x1="42" y1="50" x2="58" y2="50" stroke="#71717a" strokeWidth="2.5"/>
          <ellipse cx="42" cy="50" rx="2.5" ry="8" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
          <ellipse cx="58" cy="50" rx="2.5" ry="8" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
          <circle cx="40" cy="75" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="55" r="2.5" fill="#e5e5e5"/> 
          <circle cx="65" cy="70" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="20" r="2.5" fill="#e5e5e5"/> 
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 30 95 L 50 95 L 50 75 L 70 75 L 70 95" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinejoin="round"/>
          <path d="M 50 75 L 50 40" stroke="#3b82f6" strokeWidth="5" fill="none"/> 
          <circle cx="50" cy="32" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
          <path d="M 50 40 L 50 70" stroke="#3b82f6" strokeWidth="4"/>
          <line x1="42" y1="70" x2="58" y2="70" stroke="#71717a" strokeWidth="2.5"/>
          <ellipse cx="42" cy="70" rx="2.5" ry="8" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
          <ellipse cx="58" cy="70" rx="2.5" ry="8" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2"/>
          <circle cx="50" cy="95" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="75" r="2.5" fill="#e5e5e5"/> 
          <circle cx="70" cy="75" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="40" r="2.5" fill="#e5e5e5"/> 
        </g>
      </svg>
);

export const LegExtensionAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="25" y1="65" x2="65" y2="65" stroke="#27272a" strokeWidth="10" strokeLinecap="round"/>
        <line x1="30" y1="65" x2="20" y2="25" stroke="#27272a" strokeWidth="10" strokeLinecap="round"/>
        <line x1="50" y1="70" x2="50" y2="95" stroke="#444" strokeWidth="4"/>
        <g stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 40 60 L 30 30"/> 
          <path d="M 40 60 L 70 60"/> 
        </g>
        <circle cx="28" cy="20" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/> 
        <g fill="#e5e5e5">
          <circle cx="30" cy="30" r="2.5"/> 
          <circle cx="40" cy="60" r="2.5"/> 
          <circle cx="70" cy="60" r="3"/>   
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="70" y1="60" x2="60" y2="85" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="60" cy="85" r="2.5" fill="#e5e5e5"/> 
          <rect x="53" y="78" width="16" height="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="4" transform="rotate(-20 60 85)"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="70" y1="60" x2="95" y2="60" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="95" cy="60" r="2.5" fill="#e5e5e5"/> 
          <rect x="87" y="54" width="16" height="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="4" transform="rotate(0 95 60)"/>
        </g>
      </svg>
);

export const LegCurlSdraiatoAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <path d="M 10 70 L 45 60 L 80 65" stroke="#27272a" strokeWidth="10" fill="none" strokeLinejoin="round"/>
        <line x1="25" y1="70" x2="25" y2="95" stroke="#444" strokeWidth="4"/>
        <line x1="65" y1="65" x2="65" y2="95" stroke="#444" strokeWidth="4"/>
        <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 45 55 L 15 65"/> 
          <path d="M 45 55 L 75 60"/> 
          <path d="M 15 65 L 15 80 L 30 80" strokeWidth="3.5"/> 
        </g>
        <circle cx="10" cy="65" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
        <g fill="#e5e5e5">
          <circle cx="15" cy="65" r="2.5"/> 
          <circle cx="45" cy="55" r="2.5"/> 
          <circle cx="75" cy="60" r="3"/>   
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="75" y1="60" x2="95" y2="65" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="95" cy="65" r="2.5" fill="#e5e5e5"/> 
          <rect x="90" y="52" width="12" height="16" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="4" transform="rotate(15 95 65)"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="75" y1="60" x2="60" y2="35" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="60" cy="35" r="2.5" fill="#e5e5e5"/> 
          <rect x="61" y="27" width="12" height="16" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="4" transform="rotate(30 60 35)"/>
        </g>
      </svg>
);

export const CalfRaiseInPiediAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <rect x="55" y="85" width="25" height="15" fill="#27272a"/> 
        <line x1="15" y1="10" x2="15" y2="95" stroke="#444" strokeWidth="4"/> 
        <circle cx="60" cy="85" r="3" fill="#e5e5e5"/> 
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 50 93 L 50 63 L 50 38 L 50 15"/> 
            <line x1="50" y1="93" x2="60" y2="85" strokeWidth="3.5"/> 
          </g>
          <circle cx="50" cy="4" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
          <circle cx="50" cy="15" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="38" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="63" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="93" r="2.5" fill="#e5e5e5"/> 
          <rect x="40" y="10" width="20" height="8" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="3"/>
          <line x1="15" y1="14" x2="40" y2="14" stroke="#71717a" strokeWidth="3"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 55 72 L 55 42 L 55 17 L 55 -6"/> 
            <line x1="55" y1="72" x2="60" y2="85" strokeWidth="3.5"/> 
          </g>
          <circle cx="55" cy="-6" r="2.5" fill="#e5e5e5"/> 
          <circle cx="55" cy="17" r="2.5" fill="#e5e5e5"/> 
          <circle cx="55" cy="42" r="2.5" fill="#e5e5e5"/> 
          <circle cx="55" cy="72" r="2.5" fill="#e5e5e5"/> 
          <rect x="45" y="-11" width="20" height="8" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="3"/>
          <line x1="15" y1="-7" x2="45" y2="-7" stroke="#71717a" strokeWidth="3"/>
        </g>
      </svg>
);

export const CrunchATerraAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="10" y1="85" x2="90" y2="85" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
        <g stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 45 80 L 25 55 L 15 85"/>
          <line x1="45" y1="80" x2="55" y2="80"/>
        </g>
        <g fill="#e5e5e5">
          <circle cx="15" cy="85" r="2.5"/> 
          <circle cx="25" cy="55" r="2.5"/> 
          <circle cx="45" cy="80" r="2.5"/> 
          <circle cx="55" cy="80" r="2.5"/> 
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="55" y1="80" x2="75" y2="80" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="82" cy="76" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/> 
          <path d="M 75 80 L 85 65 L 82 76" stroke="#f97316" strokeWidth="3" fill="none" strokeLinejoin="round"/>
          <circle cx="75" cy="80" r="2.5" fill="#e5e5e5"/> 
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <line x1="55" y1="80" x2="68" y2="62" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="72" cy="54" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/> 
          <path d="M 68 62 L 78 47 L 72 54" stroke="#f97316" strokeWidth="3" fill="none" strokeLinejoin="round"/>
          <circle cx="68" cy="62" r="2.5" fill="#e5e5e5"/> 
        </g>
      </svg>
);

export const LegRaisesospesoAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="30" y1="15" x2="70" y2="15" stroke="#71717a" strokeWidth="4" strokeLinecap="round"/>
        <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="50" y1="15" x2="50" y2="35"/> 
          <line x1="50" y1="35" x2="50" y2="60"/> 
        </g>
        <circle cx="43" cy="25" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
        <g fill="#e5e5e5">
          <circle cx="50" cy="15" r="2.5"/> 
          <circle cx="50" cy="35" r="2.5"/> 
          <circle cx="50" cy="60" r="3"/>   
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 50 60 L 50 80 L 50 95" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          <circle cx="50" cy="80" r="2.5" fill="#e5e5e5"/> 
          <circle cx="50" cy="95" r="2.5" fill="#e5e5e5"/> 
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 50 60 L 30 60 L 10 60" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          <circle cx="30" cy="60" r="2.5" fill="#e5e5e5"/> 
          <circle cx="10" cy="60" r="2.5" fill="#e5e5e5"/> 
        </g>
      </svg>
);

export const PlankFrontaleAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="5" y1="85" x2="95" y2="85" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="55" cy="62" fill="#ef4444" opacity="0">
          <animate attributeName="r" values="0; 15; 0" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0; 0.6; 0" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="55" cy="62" fill="#f97316" opacity="0">
          <animate attributeName="r" values="0; 8; 0" dur="2s" repeatCount="indefinite" begin="0.2s"/>
          <animate attributeName="opacity" values="0; 0.8; 0" dur="2s" repeatCount="indefinite" begin="0.2s"/>
        </circle>
        <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 32 55 L 55 62 L 75 68 L 88 72"/>
          <path d="M 32 55 L 32 82 L 18 82"/>
          <path d="M 88 72 L 92 85"/>
        </g>
        <circle cx="22" cy="48" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
        <g fill="#e5e5e5">
          <circle cx="32" cy="55" r="2.5"/> 
          <circle cx="32" cy="82" r="2.5"/> 
          <circle cx="18" cy="82" r="2.5"/> 
          <circle cx="55" cy="62" r="2.5"/> 
          <circle cx="75" cy="68" r="2.5"/> 
          <circle cx="88" cy="72" r="2.5"/> 
        </g>
      </svg>
);

export const RussianTwistAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="10" y1="85" x2="90" y2="85" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
        <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 50 80 L 40 55 L 45 70"/> 
          <path d="M 50 80 L 60 55 L 55 70"/> 
        </g>
        <g fill="#e5e5e5">
          <circle cx="50" cy="80" r="3"/> 
          <circle cx="40" cy="55" r="2.5"/> 
          <circle cx="60" cy="55" r="2.5"/> 
          <circle cx="45" cy="70" r="2.5"/> 
          <circle cx="55" cy="70" r="2.5"/> 
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" repeatCount="indefinite"/>
          <path d="M 50 80 L 42 45" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/> 
          <circle cx="42" cy="35" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
          <line x1="33" y1="47" x2="51" y2="43" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/> 
          <path d="M 33 47 L 20 60 L 25 70" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/> 
          <circle cx="33" cy="47" r="2.5" fill="#e5e5e5"/> 
          <circle cx="51" cy="43" r="2.5" fill="#e5e5e5"/> 
          <circle cx="25" cy="70" r="2.5" fill="#e5e5e5"/> 
          <circle cx="25" cy="75" r="6" fill="#cbd5e1"/> 
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" repeatCount="indefinite"/>
          <path d="M 50 80 L 58 45" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/> 
          <circle cx="58" cy="35" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
          <line x1="49" y1="43" x2="67" y2="47" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/> 
          <path d="M 67 47 L 80 60 L 75 70" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round"/> 
          <circle cx="49" cy="43" r="2.5" fill="#e5e5e5"/> 
          <circle cx="67" cy="47" r="2.5" fill="#e5e5e5"/> 
          <circle cx="75" cy="70" r="2.5" fill="#e5e5e5"/> 
          <circle cx="75" cy="75" r="6" fill="#cbd5e1"/> 
        </g>
      </svg>
);

export const AbWheelAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="10" y1="85" x2="95" y2="85" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="20" cy="85" r="3" fill="#e5e5e5"/> 
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 20 85 L 45 75 L 75 80"/> 
            <path d="M 75 80 L 85 80"/> 
          </g>
          <circle cx="70" cy="72" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
          <circle cx="45" cy="75" r="2.5" fill="#e5e5e5"/> 
          <circle cx="75" cy="80" r="2.5" fill="#e5e5e5"/> 
          <circle cx="85" cy="80" r="2.5" fill="#e5e5e5"/> 
          <circle cx="85" cy="80" r="5" fill="none" stroke="#cbd5e1" strokeWidth="2"/>
          <circle cx="85" cy="80" r="2" fill="#475569"/>
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 20 85 L 35 60 C 45 50, 55 55, 60 65"/> 
            <path d="M 60 65 L 60 80"/> 
          </g>
          <circle cx="65" cy="55" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
          <circle cx="35" cy="60" r="2.5" fill="#e5e5e5"/> 
          <circle cx="60" cy="65" r="2.5" fill="#e5e5e5"/> 
          <circle cx="60" cy="80" r="2.5" fill="#e5e5e5"/> 
          <circle cx="60" cy="80" r="5" fill="none" stroke="#cbd5e1" strokeWidth="2"/>
          <circle cx="60" cy="80" r="2" fill="#475569"/>
        </g>
      </svg>
);

export const CableCrunchAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">

        <line x1="15" y1="10" x2="15" y2="85" stroke="#333" strokeWidth="6"/> 
        <circle cx="15" cy="15" r="4" fill="#555"/> 
        <line x1="10" y1="85" x2="90" y2="85" stroke="#444" strokeWidth="4"/> 
        <g stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 85 85 L 65 85 L 65 55"/> 
        </g>
        <g fill="#e5e5e5">
          <circle cx="85" cy="85" r="2.5"/> 
          <circle cx="65" cy="85" r="2.5"/> 
          <circle cx="65" cy="55" r="3"/>   
        </g>
        <g>
          <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 65 55 L 55 25" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="48" cy="18" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
          <path d="M 55 25 L 60 15 L 52 15" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinejoin="round"/> 
          <circle cx="55" cy="25" r="2.5" fill="#e5e5e5"/> 
          <circle cx="52" cy="15" r="2.5" fill="#e5e5e5"/> 
          <line x1="15" y1="15" x2="52" y2="15" stroke="#71717a" strokeWidth="1.5"/>
          <rect x="48" y="13" width="6" height="4" fill="#cbd5e1" rx="1"/> 
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
          <path d="M 65 55 C 55 45, 45 50, 40 60" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          <circle cx="35" cy="68" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/> 
          <path d="M 40 60 L 45 50 L 38 52" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinejoin="round"/> 
          <circle cx="40" cy="60" r="2.5" fill="#e5e5e5"/> 
          <circle cx="38" cy="52" r="2.5" fill="#e5e5e5"/> 
          <line x1="15" y1="15" x2="38" y2="52" stroke="#71717a" strokeWidth="1.5"/>
          <rect x="36" y="50" width="6" height="4" fill="#cbd5e1" rx="1" transform="rotate(45 36 50)"/>
        </g>
      </svg>
);



export const TricepDipsAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <line x1="20" y1="60" x2="80" y2="60" stroke="#333" strokeWidth="6" strokeLinecap="round" />
    <line x1="30" y1="60" x2="30" y2="95" stroke="#222" strokeWidth="6" />
    <line x1="70" y1="60" x2="70" y2="95" stroke="#222" strokeWidth="6" />
    <circle cx="50" cy="60" r="3" fill="#e5e5e5" /> 
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 50 60 L 30 45 L 50 45" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
      <circle cx="30" cy="45" r="2.5" fill="#e5e5e5"/>
      <circle cx="50" cy="45" r="2.5" fill="#e5e5e5"/>
      <path d="M 50 45 L 50 80 L 35 90 L 45 80" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" /> 
      <circle cx="50" cy="37" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="80" r="2.5" fill="#e5e5e5"/>
      <circle cx="35" cy="90" r="2.5" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 50 60 L 45 40 L 50 20" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
      <circle cx="45" cy="40" r="2.5" fill="#e5e5e5"/>
      <circle cx="50" cy="20" r="2.5" fill="#e5e5e5"/>
      <path d="M 50 20 L 50 55 L 35 65 L 45 55" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" /> 
      <circle cx="50" cy="12" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="55" r="2.5" fill="#e5e5e5"/>
      <circle cx="35" cy="65" r="2.5" fill="#e5e5e5"/>
    </g>
  </svg>
);

export const PulloverManubrioAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <rect x="30" y="60" width="40" height="10" fill="#333" rx="2" />
    <line x1="10" y1="95" x2="90" y2="95" stroke="#222" strokeWidth="4" />
    <path d="M 35 60 L 20 60 L 20 95" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <circle cx="35" cy="60" r="2.5" fill="#e5e5e5"/>
    <circle cx="20" cy="60" r="2.5" fill="#e5e5e5"/>
    <circle cx="75" cy="65" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite"/>
      <line x1="35" y1="60" x2="55" y2="60" stroke="#3b82f6" strokeWidth="4.5" />
      <circle cx="55" cy="60" r="2.5" fill="#e5e5e5"/>
      <path d="M 55 60 L 75 40 L 90 50" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <circle cx="75" cy="40" r="2.5" fill="#e5e5e5"/>
      <circle cx="90" cy="50" r="2.5" fill="#e5e5e5"/>
      <line x1="90" y1="42" x2="90" y2="58" stroke="#71717a" strokeWidth="2" />
      <ellipse cx="90" cy="42" rx="6" ry="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
      <ellipse cx="90" cy="58" rx="6" ry="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite"/>
      <line x1="35" y1="60" x2="55" y2="60" stroke="#3b82f6" strokeWidth="4.5" />
      <circle cx="55" cy="60" r="2.5" fill="#e5e5e5"/>
      <path d="M 55 60 L 50 30 L 45 15" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <circle cx="50" cy="30" r="2.5" fill="#e5e5e5"/>
      <circle cx="45" cy="15" r="2.5" fill="#e5e5e5"/>
      <line x1="37" y1="15" x2="53" y2="15" stroke="#71717a" strokeWidth="2" />
      <ellipse cx="37" cy="15" rx="2" ry="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
      <ellipse cx="53" cy="15" rx="2" ry="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
    </g>
  </svg>
);

export const RematoreTBarAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <circle cx="40" cy="90" r="3" fill="#e5e5e5"/>
    <path d="M 40 90 L 30 60 L 55 45" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <circle cx="63" cy="37" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <g fill="#e5e5e5">
      <circle cx="30" cy="60" r="2.5"/>
      <circle cx="55" cy="45" r="2.5"/>
      <circle cx="10" cy="90" r="4" fill="#333" />
    </g>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <line x1="10" y1="90" x2="75" y2="70" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" />
      <rect x="62" y="65" width="8" height="20" fill="#cbd5e1" rx="1" transform="rotate(-15 66 75)" />
      <path d="M 55 45 L 55 60 L 63 73" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <circle cx="55" cy="60" r="2.5" fill="#e5e5e5"/>
      <circle cx="63" cy="73" r="2.5" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <line x1="10" y1="90" x2="68" y2="50" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" />
      <rect x="55" y="45" width="8" height="20" fill="#cbd5e1" rx="1" transform="rotate(-30 59 55)" />
      <path d="M 55 45 L 40 40 L 58 53" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <circle cx="40" cy="40" r="2.5" fill="#e5e5e5"/>
      <circle cx="58" cy="53" r="2.5" fill="#e5e5e5"/>
    </g>
  </svg>
);

export const CalfSedutoAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <rect x="20" y="55" width="20" height="6" fill="#333" rx="2" />
    <rect x="65" y="90" width="15" height="10" fill="#222" rx="1" />
    <line x1="30" y1="55" x2="30" y2="25" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="30" cy="15" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <circle cx="30" cy="55" r="2.5" fill="#e5e5e5"/>
    <circle cx="30" cy="25" r="2.5" fill="#e5e5e5"/>
    <line x1="30" y1="25" x2="55" y2="45" stroke="#3b82f6" strokeWidth="3.5" />
    <circle cx="55" cy="45" r="2" fill="#e5e5e5"/> 
    <circle cx="70" cy="90" r="3" fill="#e5e5e5"/> 
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 30 55 L 60 63 L 65 95 L 70 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
      <circle cx="60" cy="63" r="2.5" fill="#e5e5e5"/>
      <circle cx="65" cy="95" r="2.5" fill="#e5e5e5"/>
      <rect x="55" y="55" width="12" height="6" fill="#71717a" rx="3" />
      <line x1="61" y1="55" x2="61" y2="35" stroke="#71717a" strokeWidth="2" />
      <rect x="56" y="25" width="10" height="10" fill="#cbd5e1" rx="1" />
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 30 55 L 58 50 L 63 75 L 70 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
      <circle cx="58" cy="50" r="2.5" fill="#e5e5e5"/>
      <circle cx="63" cy="75" r="2.5" fill="#e5e5e5"/>
      <rect x="53" y="42" width="12" height="6" fill="#71717a" rx="3" />
      <line x1="59" y1="42" x2="59" y2="22" stroke="#71717a" strokeWidth="2" />
      <rect x="54" y="12" width="10" height="10" fill="#cbd5e1" rx="1" />
    </g>
  </svg>
);

export const SpiderCurlAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <line x1="20" y1="90" x2="80" y2="30" stroke="#333" strokeWidth="6" strokeLinecap="round" />
    <line x1="40" y1="70" x2="40" y2="95" stroke="#444" strokeWidth="4" />
    <line x1="70" y1="40" x2="70" y2="95" stroke="#444" strokeWidth="4" />
    <circle cx="85" cy="25" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <line x1="80" y1="30" x2="50" y2="60" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
    <circle cx="75" cy="35" r="2.5" fill="#e5e5e5"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 75 35 L 75 60 L 75 75" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="75" cy="60" r="2.5" fill="#e5e5e5"/>
      <circle cx="75" cy="75" r="2.5" fill="#e5e5e5"/>
      <line x1="65" y1="75" x2="85" y2="75" stroke="#71717a" strokeWidth="3"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 75 35 L 75 60 L 65 40" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="75" cy="60" r="2.5" fill="#e5e5e5"/>
      <circle cx="65" cy="40" r="2.5" fill="#e5e5e5"/>
      <line x1="55" y1="40" x2="75" y2="40" stroke="#71717a" strokeWidth="3"/>
    </g>
  </svg>
);

export const SealRowAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <rect x="20" y="45" width="60" height="8" fill="#333" rx="2" />
    <line x1="30" y1="53" x2="30" y2="95" stroke="#444" strokeWidth="4" />
    <line x1="70" y1="53" x2="70" y2="95" stroke="#444" strokeWidth="4" />
    <circle cx="85" cy="49" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
    <line x1="25" y1="49" x2="80" y2="49" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
    <circle cx="70" cy="49" r="2.5" fill="#e5e5e5"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 70 49 L 70 70 L 70 85" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="70" cy="70" r="2.5" fill="#e5e5e5"/>
      <circle cx="70" cy="85" r="2.5" fill="#e5e5e5"/>
      <line x1="55" y1="85" x2="85" y2="85" stroke="#e5e5e5" strokeWidth="2.5"/>
      <ellipse cx="60" cy="85" rx="3" ry="10" fill="#3b82f6"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 70 49 L 60 30 L 70 55" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="60" cy="30" r="2.5" fill="#e5e5e5"/>
      <circle cx="70" cy="55" r="2.5" fill="#e5e5e5"/>
      <line x1="55" y1="55" x2="85" y2="55" stroke="#e5e5e5" strokeWidth="2.5"/>
      <ellipse cx="60" cy="55" rx="3" ry="10" fill="#3b82f6"/>
    </g>
  </svg>
);

export const ChestSupportedRowAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <line x1="30" y1="80" x2="70" y2="30" stroke="#333" strokeWidth="8" strokeLinecap="round" />
    <line x1="50" y1="55" x2="50" y2="95" stroke="#444" strokeWidth="4" />
    <circle cx="75" cy="24" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <line x1="70" y1="30" x2="40" y2="67" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
    <circle cx="65" cy="36" r="2.5" fill="#e5e5e5"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 65 36 L 75 55 L 85 70" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="75" cy="55" r="2.5" fill="#e5e5e5"/>
      <circle cx="85" cy="70" r="2.5" fill="#e5e5e5"/>
      <line x1="85" y1="70" x2="95" y2="60" stroke="#71717a" strokeWidth="3"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 65 36 L 50 40 L 70 55" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="50" cy="40" r="2.5" fill="#e5e5e5"/>
      <circle cx="70" cy="55" r="2.5" fill="#e5e5e5"/>
      <line x1="70" y1="55" x2="80" y2="45" stroke="#71717a" strokeWidth="3"/>
    </g>
  </svg>
);

export const SissySquatAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <line x1="10" y1="90" x2="90" y2="90" stroke="#333" strokeWidth="4" strokeLinecap="round" />
    <rect x="70" y="80" width="15" height="10" fill="#222" rx="2" /> 
    <circle cx="75" cy="85" r="3" fill="#e5e5e5"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 75 85 L 75 55 L 75 25" stroke="#f97316" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="75" cy="17" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
      <circle cx="75" cy="55" r="2.5" fill="#e5e5e5"/>
      <circle cx="75" cy="25" r="2.5" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 75 85 L 50 70 L 25 55 L 15 35" stroke="#f97316" strokeWidth="5" fill="none" strokeLinejoin="round" />
      <circle cx="10" cy="25" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="70" r="2.5" fill="#e5e5e5"/>
      <circle cx="25" cy="55" r="2.5" fill="#e5e5e5"/>
      <circle cx="15" cy="35" r="2.5" fill="#e5e5e5"/>
    </g>
  </svg>
);


export const TricepDipsAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <line x1="20" y1="60" x2="80" y2="60" stroke="#333" strokeWidth="6" strokeLinecap="round" />
    <line x1="30" y1="60" x2="30" y2="95" stroke="#222" strokeWidth="6" />
    <line x1="70" y1="60" x2="70" y2="95" stroke="#222" strokeWidth="6" />
    <circle cx="50" cy="60" r="3" fill="#e5e5e5" /> 
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 50 60 L 30 45 L 50 45" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
      <circle cx="30" cy="45" r="2.5" fill="#e5e5e5"/>
      <circle cx="50" cy="45" r="2.5" fill="#e5e5e5"/>
      <path d="M 50 45 L 50 80 L 35 90 L 45 80" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" /> 
      <circle cx="50" cy="37" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="80" r="2.5" fill="#e5e5e5"/>
      <circle cx="35" cy="90" r="2.5" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 50 60 L 45 40 L 50 20" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
      <circle cx="45" cy="40" r="2.5" fill="#e5e5e5"/>
      <circle cx="50" cy="20" r="2.5" fill="#e5e5e5"/>
      <path d="M 50 20 L 50 55 L 35 65 L 45 55" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" /> 
      <circle cx="50" cy="12" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="55" r="2.5" fill="#e5e5e5"/>
      <circle cx="35" cy="65" r="2.5" fill="#e5e5e5"/>
    </g>
  </svg>
);

export const PulloverManubrioAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <rect x="30" y="60" width="40" height="10" fill="#333" rx="2" />
    <line x1="10" y1="95" x2="90" y2="95" stroke="#222" strokeWidth="4" />
    <path d="M 35 60 L 20 60 L 20 95" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <circle cx="35" cy="60" r="2.5" fill="#e5e5e5"/>
    <circle cx="20" cy="60" r="2.5" fill="#e5e5e5"/>
    <circle cx="75" cy="65" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite"/>
      <line x1="35" y1="60" x2="55" y2="60" stroke="#3b82f6" strokeWidth="4.5" />
      <circle cx="55" cy="60" r="2.5" fill="#e5e5e5"/>
      <path d="M 55 60 L 75 40 L 90 50" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <circle cx="75" cy="40" r="2.5" fill="#e5e5e5"/>
      <circle cx="90" cy="50" r="2.5" fill="#e5e5e5"/>
      <line x1="90" y1="42" x2="90" y2="58" stroke="#71717a" strokeWidth="2" />
      <ellipse cx="90" cy="42" rx="6" ry="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
      <ellipse cx="90" cy="58" rx="6" ry="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite"/>
      <line x1="35" y1="60" x2="55" y2="60" stroke="#3b82f6" strokeWidth="4.5" />
      <circle cx="55" cy="60" r="2.5" fill="#e5e5e5"/>
      <path d="M 55 60 L 50 30 L 45 15" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <circle cx="50" cy="30" r="2.5" fill="#e5e5e5"/>
      <circle cx="45" cy="15" r="2.5" fill="#e5e5e5"/>
      <line x1="37" y1="15" x2="53" y2="15" stroke="#71717a" strokeWidth="2" />
      <ellipse cx="37" cy="15" rx="2" ry="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
      <ellipse cx="53" cy="15" rx="2" ry="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
    </g>
  </svg>
);

export const RematoreTBarAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <circle cx="40" cy="90" r="3" fill="#e5e5e5"/>
    <path d="M 40 90 L 30 60 L 55 45" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round"/>
    <circle cx="63" cy="37" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <g fill="#e5e5e5">
      <circle cx="30" cy="60" r="2.5"/>
      <circle cx="55" cy="45" r="2.5"/>
      <circle cx="10" cy="90" r="4" fill="#333" />
    </g>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <line x1="10" y1="90" x2="75" y2="70" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" />
      <rect x="62" y="65" width="8" height="20" fill="#cbd5e1" rx="1" transform="rotate(-15 66 75)" />
      <path d="M 55 45 L 55 60 L 63 73" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <circle cx="55" cy="60" r="2.5" fill="#e5e5e5"/>
      <circle cx="63" cy="73" r="2.5" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <line x1="10" y1="90" x2="68" y2="50" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" />
      <rect x="55" y="45" width="8" height="20" fill="#cbd5e1" rx="1" transform="rotate(-30 59 55)" />
      <path d="M 55 45 L 40 40 L 58 53" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <circle cx="40" cy="40" r="2.5" fill="#e5e5e5"/>
      <circle cx="58" cy="53" r="2.5" fill="#e5e5e5"/>
    </g>
  </svg>
);

export const CalfSedutoAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <rect x="20" y="55" width="20" height="6" fill="#333" rx="2" />
    <rect x="65" y="90" width="15" height="10" fill="#222" rx="1" />
    <line x1="30" y1="55" x2="30" y2="25" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="30" cy="15" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <circle cx="30" cy="55" r="2.5" fill="#e5e5e5"/>
    <circle cx="30" cy="25" r="2.5" fill="#e5e5e5"/>
    <line x1="30" y1="25" x2="55" y2="45" stroke="#3b82f6" strokeWidth="3.5" />
    <circle cx="55" cy="45" r="2" fill="#e5e5e5"/> 
    <circle cx="70" cy="90" r="3" fill="#e5e5e5"/> 
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 30 55 L 60 63 L 65 95 L 70 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
      <circle cx="60" cy="63" r="2.5" fill="#e5e5e5"/>
      <circle cx="65" cy="95" r="2.5" fill="#e5e5e5"/>
      <rect x="55" y="55" width="12" height="6" fill="#71717a" rx="3" />
      <line x1="61" y1="55" x2="61" y2="35" stroke="#71717a" strokeWidth="2" />
      <rect x="56" y="25" width="10" height="10" fill="#cbd5e1" rx="1" />
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 30 55 L 58 50 L 63 75 L 70 90" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
      <circle cx="58" cy="50" r="2.5" fill="#e5e5e5"/>
      <circle cx="63" cy="75" r="2.5" fill="#e5e5e5"/>
      <rect x="53" y="42" width="12" height="6" fill="#71717a" rx="3" />
      <line x1="59" y1="42" x2="59" y2="22" stroke="#71717a" strokeWidth="2" />
      <rect x="54" y="12" width="10" height="10" fill="#cbd5e1" rx="1" />
    </g>
  </svg>
);

export const SpiderCurlAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <line x1="20" y1="90" x2="80" y2="30" stroke="#333" strokeWidth="6" strokeLinecap="round" />
    <line x1="40" y1="70" x2="40" y2="95" stroke="#444" strokeWidth="4" />
    <line x1="70" y1="40" x2="70" y2="95" stroke="#444" strokeWidth="4" />
    <circle cx="85" cy="25" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <line x1="80" y1="30" x2="50" y2="60" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
    <circle cx="75" cy="35" r="2.5" fill="#e5e5e5"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 75 35 L 75 60 L 75 75" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="75" cy="60" r="2.5" fill="#e5e5e5"/>
      <circle cx="75" cy="75" r="2.5" fill="#e5e5e5"/>
      <line x1="65" y1="75" x2="85" y2="75" stroke="#71717a" strokeWidth="3"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 75 35 L 75 60 L 65 40" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="75" cy="60" r="2.5" fill="#e5e5e5"/>
      <circle cx="65" cy="40" r="2.5" fill="#e5e5e5"/>
      <line x1="55" y1="40" x2="75" y2="40" stroke="#71717a" strokeWidth="3"/>
    </g>
  </svg>
);

export const SealRowAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <rect x="20" y="45" width="60" height="8" fill="#333" rx="2" />
    <line x1="30" y1="53" x2="30" y2="95" stroke="#444" strokeWidth="4" />
    <line x1="70" y1="53" x2="70" y2="95" stroke="#444" strokeWidth="4" />
    <circle cx="85" cy="49" r="5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
    <line x1="25" y1="49" x2="80" y2="49" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
    <circle cx="70" cy="49" r="2.5" fill="#e5e5e5"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 70 49 L 70 70 L 70 85" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="70" cy="70" r="2.5" fill="#e5e5e5"/>
      <circle cx="70" cy="85" r="2.5" fill="#e5e5e5"/>
      <line x1="55" y1="85" x2="85" y2="85" stroke="#e5e5e5" strokeWidth="2.5"/>
      <ellipse cx="60" cy="85" rx="3" ry="10" fill="#3b82f6"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 70 49 L 60 30 L 70 55" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="60" cy="30" r="2.5" fill="#e5e5e5"/>
      <circle cx="70" cy="55" r="2.5" fill="#e5e5e5"/>
      <line x1="55" y1="55" x2="85" y2="55" stroke="#e5e5e5" strokeWidth="2.5"/>
      <ellipse cx="60" cy="55" rx="3" ry="10" fill="#3b82f6"/>
    </g>
  </svg>
);

export const ChestSupportedRowAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <line x1="30" y1="80" x2="70" y2="30" stroke="#333" strokeWidth="8" strokeLinecap="round" />
    <line x1="50" y1="55" x2="50" y2="95" stroke="#444" strokeWidth="4" />
    <circle cx="75" cy="24" r="5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
    <line x1="70" y1="30" x2="40" y2="67" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
    <circle cx="65" cy="36" r="2.5" fill="#e5e5e5"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 65 36 L 75 55 L 85 70" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="75" cy="55" r="2.5" fill="#e5e5e5"/>
      <circle cx="85" cy="70" r="2.5" fill="#e5e5e5"/>
      <line x1="85" y1="70" x2="95" y2="60" stroke="#71717a" strokeWidth="3"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 65 36 L 50 40 L 70 55" stroke="#3b82f6" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="50" cy="40" r="2.5" fill="#e5e5e5"/>
      <circle cx="70" cy="55" r="2.5" fill="#e5e5e5"/>
      <line x1="70" y1="55" x2="80" y2="45" stroke="#71717a" strokeWidth="3"/>
    </g>
  </svg>
);

export const SissySquatAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <line x1="10" y1="90" x2="90" y2="90" stroke="#333" strokeWidth="4" strokeLinecap="round" />
    <rect x="70" y="80" width="15" height="10" fill="#222" rx="2" /> 
    <circle cx="75" cy="85" r="3" fill="#e5e5e5"/>
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 75 85 L 75 55 L 75 25" stroke="#f97316" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="75" cy="17" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
      <circle cx="75" cy="55" r="2.5" fill="#e5e5e5"/>
      <circle cx="75" cy="25" r="2.5" fill="#e5e5e5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 75 85 L 50 70 L 25 55 L 15 35" stroke="#f97316" strokeWidth="5" fill="none" strokeLinejoin="round" />
      <circle cx="10" cy="25" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="70" r="2.5" fill="#e5e5e5"/>
      <circle cx="25" cy="55" r="2.5" fill="#e5e5e5"/>
      <circle cx="15" cy="35" r="2.5" fill="#e5e5e5"/>
    </g>
  </svg>
);

export const DeadliftAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <line x1="10" y1="90" x2="90" y2="90" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="50" cy="90" r="3" fill="#e5e5e5"/> 
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2.5s" repeatCount="indefinite"/>
      <path d="M 50 90 L 55 65 L 35 55 L 45 25" stroke="#f97316" strokeWidth="5" fill="none" strokeLinejoin="round"/>
      <circle cx="48" cy="17" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
      <line x1="45" y1="25" x2="45" y2="75" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
      <circle cx="55" cy="65" r="2.5" fill="#e5e5e5"/> 
      <circle cx="35" cy="55" r="2.5" fill="#e5e5e5"/> 
      <circle cx="45" cy="25" r="2.5" fill="#e5e5e5"/> 
      <circle cx="45" cy="75" r="2.5" fill="#e5e5e5"/> 
      <line x1="30" y1="75" x2="60" y2="75" stroke="#71717a" strokeWidth="3"/>
      <ellipse cx="45" cy="75" rx="4" ry="14" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2.5s" repeatCount="indefinite"/>
      <path d="M 50 90 L 50 65 L 50 40 L 50 15" stroke="#f97316" strokeWidth="5" fill="none" strokeLinejoin="round"/>
      <circle cx="50" cy="7" r="5.5" stroke="#f97316" strokeWidth="2.5" fill="none"/>
      <line x1="50" y1="15" x2="50" y2="55" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round"/>
      <circle cx="50" cy="65" r="2.5" fill="#e5e5e5"/> 
      <circle cx="50" cy="40" r="2.5" fill="#e5e5e5"/> 
      <circle cx="50" cy="15" r="2.5" fill="#e5e5e5"/> 
      <circle cx="50" cy="55" r="2.5" fill="#e5e5e5"/> 
      <line x1="35" y1="55" x2="65" y2="55" stroke="#71717a" strokeWidth="3"/>
      <ellipse cx="50" cy="55" rx="4" ry="14" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
    </g>
  </svg>
);

export const HipThrustAnimation = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <rect x="15" y="45" width="20" height="45" fill="#27272a" rx="2"/> 
    <line x1="10" y1="90" x2="95" y2="90" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="35" cy="45" r="3" fill="#e5e5e5"/> 
    <circle cx="85" cy="90" r="3" fill="#e5e5e5"/> 
    <g>
      <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 35 45 L 45 80 L 75 60 L 85 90" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinejoin="round"/>
      <circle cx="27" cy="43" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
      <circle cx="45" cy="80" r="2.5" fill="#e5e5e5"/> 
      <circle cx="75" cy="60" r="2.5" fill="#e5e5e5"/> 
      <line x1="30" y1="75" x2="60" y2="75" stroke="#71717a" strokeWidth="3"/>
      <ellipse cx="45" cy="75" rx="4" ry="14" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
      <path d="M 35 45 L 60 45 L 85 55 L 85 90" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinejoin="round"/>
      <circle cx="27" cy="45" r="5.5" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
      <circle cx="60" cy="45" r="2.5" fill="#e5e5e5"/> 
      <circle cx="85" cy="55" r="2.5" fill="#e5e5e5"/> 
      <line x1="45" y1="40" x2="75" y2="40" stroke="#71717a" strokeWidth="3"/>
      <ellipse cx="60" cy="40" rx="4" ry="14" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5"/>
    </g>
  </svg>
);

const animationRegistry: Record<string, React.FC> = {
  // Spinta
  'chest_barbell_flat': PPianaBilAnimation,
  'chest_machine_flat': ChestPressAnimation,
  'chest_db_flat': PianaManubriAnimation,
  'chest_db_incline': InclinataManAnimation,
  'chest_barbell_incline': InclinataBilAnimation,
  'chest_machine_incline': PressaInclinataAnimation,
  'chest_pec_deck': PecDeckAnimation,
  'chest_cable_seated': CaviSedutoAnimation,
  'chest_flye_db': CrociManubriAnimation,
  'chest_cable_flat': CrociCaviPianaAnimation,
  'shoulder_db_seated': LentoManubriAnimation,
  'shoulder_military': MilitaryPressAnimation,
  'shoulder_machine': ShoulderMachAnimation,
  'lateral_cable': AlzateCaviAnimation,
  'lateral_db': AlzateManubriAnimation,
  'lateral_machine': AlzateMacchinaAnimation,
  'tricep_close_grip': FrenchPressAnimation,
  'tricep_french_press': FrenchPressAnimation,
  'tricep_dips': TricepDipsAnimation,
  'tricep_pushdown': PushdownCaviAnimation,
  'tricep_overhead': EstensioniManAnimation,
  
  // Tirata
  'back_pullup': TrazioniSchienaAnimation,
  'back_pulldown': LatLargaFrontaleAnimation,
  'back_pulldown_triangle': LatPresaStrettaAnimation,
  'back_row_barbell': RematoreBilanciereAnimation,
  'back_row_db': RemManubrioPancaAnimation,
  'back_pulley': PulleyBassoAnimation,
  'back_row_machine': ChestSupportedRowAnimation,
  'back_pullover_cable': LatPresaStrettaAnimation,
  'back_pullover_db': PulloverManubrioAnimation,
  'back_t_bar': RematoreTBarAnimation,
  'back_seal_row': SealRowAnimation,
  'bicep_barbell': CurlBilanciereAnimation,
  'bicep_db': CurlAlternatoAnimation,
  'bicep_cable': CurlPancaScottAnimation,
  'bicep_spider_curl': SpiderCurlAnimation,
  
  // Gambe
  'leg_squat': SquatBilanciereAnimation,
  'leg_press': LegPress45Animation,
  'leg_lunge': AffondiManubriAnimation,
  'leg_extension': LegExtensionAnimation,
  'leg_deadlift': DeadliftAnimation,
  'leg_curl': LegCurlSdraiatoAnimation,
  'leg_calf': CalfRaiseInPiediAnimation,
  'leg_calf_seated': CalfSedutoAnimation,
  'leg_sissy_squat': SissySquatAnimation,

  // Addome
  'crunch': CrunchATerraAnimation,
  'leg_raise': LegRaisesospesoAnimation,
  'plank': PlankFrontaleAnimation,
  'russian_twist': RussianTwistAnimation,
  'ab_wheel': AbWheelAnimation,
  'cable_crunch': CableCrunchAnimation,
  'hip_thrust': HipThrustAnimation,
};

export interface MediaVisualizerProps {
  animKey: string;
  color?: string;
  size?: number;
  className?: string;
}

export const MediaVisualizer: React.FC<MediaVisualizerProps> = ({ 
  animKey, 
  color = "#f97316", 
  size = 150, 
  className = "" 
}) => {
  const AnimationComponent = animationRegistry[animKey?.toLowerCase()];

  if (!AnimationComponent) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-neutral-800 rounded-xl flex items-center justify-center border border-neutral-700 ${className}`}
      >
        <span className="text-neutral-500 text-xs text-center p-2">Manca:<br/>{animKey}</span>
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
