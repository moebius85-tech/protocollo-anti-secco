"use client";
import { useState, useEffect, useRef } from "react";

/* ==================================================================
   1. DATI DEL LOGO INTERNO E COMPONENTE OMINO (INTATTO)
================================================================== */
type Tratto = { nome: string; durata: number; pausa: number; d: string; maskD: string };

const TRATTI: Tratto[] = [
  { 
    nome: "struttura", 
    durata: 1800, 
    pausa: 140, 
    d: "M 131.73 128.15 C 131.09 128.25, 130.07 128.28, 129.43 128.04 C 128.80 127.80, 128.50 128.60, 127.91 126.73 C 127.31 124.86, 126.42 118.83, 125.84 116.82 C 125.26 114.81, 124.81 115.75, 124.42 114.68 C 124.02 113.61, 124.30 112.54, 123.48 110.40 C 122.66 108.26, 121.71 104.82, 119.50 101.84 C 117.28 98.85, 112.58 94.57, 110.17 92.51 C 107.76 90.44, 106.32 90.09, 105.02 89.45 C 103.72 88.81, 103.09 88.75, 102.37 88.68 C 101.65 88.60, 101.68 88.41, 100.69 89.00 C 99.69 89.58, 97.78 90.85, 96.41 92.18 C 95.03 93.50, 93.72 95.63, 92.43 96.96 C 91.14 98.29, 89.84 99.35, 88.67 100.15 C 87.49 100.96, 86.66 100.77, 85.40 101.81 C 84.14 102.85, 82.67 105.28, 81.12 106.40 C 79.56 107.51, 77.57 107.58, 76.07 108.48 C 74.57 109.38, 75.33 110.43, 72.09 111.79 C 68.86 113.15, 60.78 115.65, 56.65 116.62 C 52.52 117.60, 50.74 117.47, 47.32 117.64 C 43.91 117.81, 38.69 117.72, 36.16 117.63 C 33.64 117.53, 33.29 117.40, 32.19 117.06 C 31.08 116.73, 30.13 116.35, 29.54 115.60 C 28.95 114.84, 28.70 113.38, 28.64 112.54 C 28.59 111.70, 28.96 111.01, 29.22 110.55 C 29.48 110.10, 26.93 109.87, 30.20 109.81 C 33.47 109.74, 44.32 110.26, 48.85 110.16 C 53.39 110.07, 54.61 109.84, 57.42 109.22 C 60.22 108.60, 63.02 107.50, 65.67 106.43 C 68.33 105.35, 71.51 103.92, 73.34 102.75 C 75.18 101.58, 76.03 100.23, 76.68 99.42 C 77.34 98.60, 77.82 99.80, 77.27 97.86 C 76.72 95.92, 74.04 90.70, 73.38 87.77 C 72.72 84.84, 72.17 84.63, 73.33 80.28 C 74.49 75.92, 78.12 66.87, 80.33 61.62 C 82.55 56.37, 85.29 51.15, 86.62 48.78 C 87.95 46.41, 87.31 47.72, 88.30 47.42 C 89.30 47.11, 91.72 46.85, 92.58 46.93 C 93.45 47.00, 93.32 47.30, 93.48 47.86 C 93.64 48.42, 94.02 48.62, 93.57 50.31 C 93.11 51.99, 92.08 54.99, 90.76 57.95 C 89.43 60.91, 87.29 64.17, 85.63 68.04 C 83.97 71.92, 81.55 77.80, 80.82 81.19 C 80.10 84.58, 80.96 86.88, 81.26 88.38 C 81.57 89.88, 82.06 89.78, 82.65 90.21 C 83.23 90.65, 83.84 91.03, 84.79 91.00 C 85.73 90.98, 87.09 90.79, 88.30 90.04 C 89.51 89.30, 90.93 87.92, 92.05 86.54 C 93.17 85.17, 93.48 83.84, 95.03 81.80 C 96.58 79.77, 99.87 76.22, 101.32 74.31 C 102.77 72.40, 103.07 71.74, 103.75 70.34 C 104.42 68.93, 104.69 67.10, 105.36 65.90 C 106.04 64.70, 106.86 64.78, 107.79 63.15 C 108.72 61.52, 110.23 58.37, 110.93 56.10 C 111.64 53.84, 112.13 51.42, 112.03 49.54 C 111.93 47.66, 111.85 46.44, 110.32 44.80 C 108.79 43.17, 105.15 40.79, 102.83 39.71 C 100.51 38.64, 98.37 38.58, 96.41 38.35 C 94.44 38.12, 93.48 38.01, 91.06 38.31 C 88.63 38.61, 84.84 39.19, 81.88 40.16 C 78.92 41.13, 75.84 42.54, 73.32 44.13 C 70.80 45.72, 68.98 46.98, 66.77 49.69 C 64.56 52.41, 61.71 57.29, 60.06 60.40 C 58.41 63.51, 57.87 66.91, 56.87 68.35 C 55.87 69.79, 54.94 69.10, 54.05 69.03 C 53.16 68.95, 52.00 68.74, 51.53 67.89 C 51.07 67.04, 51.06 65.42, 51.26 63.91 C 51.47 62.41, 51.75 61.11, 52.76 58.87 C 53.77 56.63, 56.64 52.19, 57.34 50.46 C 58.04 48.73, 57.25 48.99, 56.96 48.51 C 56.66 48.03, 56.45 47.84, 55.58 47.57 C 54.71 47.30, 54.61 46.97, 51.76 46.88 C 48.90 46.80, 40.99 46.84, 38.46 47.05 C 35.92 47.26, 37.07 47.65, 36.55 48.17 C 36.02 48.68, 35.72 47.50, 35.31 50.15 C 34.91 52.80, 34.55 61.57, 34.10 64.07 C 33.66 66.57, 33.37 64.97, 32.65 65.16 C 31.92 65.36, 30.56 65.43, 29.74 65.24 C 28.92 65.05, 28.27 65.44, 27.75 64.00 C 27.23 62.55, 27.04 58.14, 26.63 56.57 C 26.22 55.01, 25.81 54.92, 25.31 54.63 C 24.80 54.34, 24.29 54.30, 23.62 54.85 C 22.96 55.40, 22.07 57.36, 21.33 57.93 C 20.59 58.49, 20.03 58.34, 19.19 58.25 C 18.35 58.15, 16.96 58.78, 16.28 57.35 C 15.61 55.93, 16.14 51.76, 15.15 49.69 C 14.16 47.63, 11.18 46.25, 10.37 44.95 C 9.55 43.65, 9.66 43.04, 10.27 41.90 C 10.88 40.75, 13.05 40.06, 14.03 38.07 C 15.00 36.09, 15.12 31.55, 16.14 29.97 C 17.15 28.39, 18.81 28.42, 20.11 28.57 C 21.41 28.72, 23.06 30.51, 23.93 30.89 C 24.80 31.26, 24.86 31.14, 25.31 30.80 C 25.75 30.47, 26.16 30.39, 26.61 28.90 C 27.07 27.41, 27.55 23.17, 28.02 21.87 C 28.49 20.56, 28.66 21.21, 29.43 21.08 C 30.21 20.94, 31.91 20.95, 32.65 21.05 C 33.38 21.14, 33.54 21.18, 33.87 21.62 C 34.20 22.07, 34.38 21.09, 34.63 23.70 C 34.88 26.31, 35.06 34.76, 35.36 37.31 C 35.66 39.86, 35.98 38.58, 36.41 38.99 C 36.85 39.40, 35.03 39.57, 38.00 39.79 C 40.96 40.01, 49.97 40.29, 54.20 40.29 C 58.44 40.29, 60.75 40.18, 63.38 39.78 C 66.00 39.37, 67.66 38.80, 69.95 37.85 C 72.25 36.90, 73.78 35.18, 77.14 34.07 C 80.50 32.96, 87.26 31.68, 90.14 31.19 C 93.02 30.70, 91.26 30.72, 94.42 31.12 C 97.58 31.51, 105.99 32.61, 109.10 33.57 C 112.21 34.53, 111.29 35.84, 113.07 36.87 C 114.86 37.90, 115.16 39.18, 119.80 39.75 C 124.44 40.32, 133.46 40.28, 140.90 40.29 C 148.34 40.30, 159.86 40.05, 164.45 39.82 C 169.04 39.59, 167.48 39.52, 168.43 38.92 C 169.37 38.32, 169.75 38.78, 170.13 36.24 C 170.52 33.70, 170.28 26.23, 170.73 23.70 C 171.19 21.18, 171.92 21.51, 172.86 21.09 C 173.80 20.67, 175.56 20.94, 176.38 21.19 C 177.19 21.44, 177.38 20.41, 177.75 22.59 C 178.13 24.77, 178.30 32.03, 178.63 34.25 C 178.97 36.47, 179.38 35.64, 179.74 35.93 C 180.10 36.21, 180.47 36.12, 180.81 35.97 C 181.15 35.82, 181.55 35.84, 181.78 35.02 C 182.01 34.19, 181.96 32.08, 182.20 31.04 C 182.44 29.99, 182.15 29.05, 183.22 28.75 C 184.29 28.45, 187.36 27.89, 188.61 29.24 C 189.86 30.60, 189.73 34.82, 190.71 36.85 C 191.70 38.88, 193.83 40.09, 194.53 41.44 C 195.22 42.79, 195.55 43.68, 194.89 44.95 C 194.23 46.23, 191.44 47.10, 190.57 49.08 C 189.70 51.07, 190.18 55.41, 189.68 56.87 C 189.17 58.34, 188.40 57.74, 187.54 57.88 C 186.67 58.03, 185.30 58.17, 184.48 57.77 C 183.66 57.37, 183.04 58.33, 182.62 55.50 C 182.20 52.68, 182.26 43.51, 181.96 40.83 C 181.66 38.14, 181.26 39.57, 180.81 39.39 C 180.36 39.21, 179.73 38.75, 179.28 39.76 C 178.84 40.76, 178.27 42.25, 178.15 45.41 C 178.03 48.57, 178.61 55.76, 178.56 58.72 C 178.52 61.67, 178.15 62.16, 177.86 63.15 C 177.58 64.14, 177.47 64.35, 176.83 64.68 C 176.20 65.01, 175.05 65.28, 174.08 65.15 C 173.11 65.01, 171.67 64.88, 171.02 63.86 C 170.38 62.84, 170.37 61.41, 170.20 59.02 C 170.03 56.64, 170.23 51.40, 169.99 49.54 C 169.75 47.68, 169.46 48.28, 168.76 47.86 C 168.07 47.44, 167.54 47.09, 165.83 47.04 C 164.11 46.99, 160.14 47.25, 158.49 47.53 C 156.83 47.81, 157.90 45.82, 155.89 48.73 C 153.88 51.64, 149.21 61.37, 146.43 64.98 C 143.65 68.60, 141.31 69.35, 139.22 70.41 C 137.13 71.46, 135.55 71.41, 133.87 71.32 C 132.19 71.24, 131.18 71.59, 129.13 69.90 C 127.08 68.20, 123.20 62.87, 121.55 61.16 C 119.89 59.45, 119.92 59.76, 119.19 59.63 C 118.46 59.51, 118.08 59.38, 117.18 60.40 C 116.27 61.42, 114.58 64.17, 113.76 65.75 C 112.94 67.33, 113.08 68.32, 112.26 69.88 C 111.45 71.43, 109.68 73.32, 108.85 75.08 C 108.03 76.83, 107.33 79.15, 107.31 80.43 C 107.30 81.70, 107.93 82.04, 108.74 82.72 C 109.55 83.40, 109.72 82.42, 112.16 84.51 C 114.60 86.60, 120.76 92.27, 123.38 95.26 C 126.01 98.25, 126.62 100.13, 127.89 102.45 C 129.15 104.77, 130.31 107.21, 130.97 109.17 C 131.63 111.14, 131.44 112.82, 131.85 114.22 C 132.26 115.62, 133.09 115.57, 133.43 117.58 C 133.77 119.60, 133.93 124.65, 133.90 126.30 C 133.87 127.95, 133.62 127.15, 133.26 127.46 C 132.89 127.77, 132.36 128.06, 131.73 128.15 Z M 135.42 63.76 C 136.29 63.57, 137.03 63.42, 138.15 62.44 C 139.27 61.46, 140.84 59.91, 142.13 57.89 C 143.41 55.87, 145.29 51.86, 145.88 50.31 C 146.46 48.75, 145.99 49.07, 145.64 48.54 C 145.30 48.01, 144.85 47.40, 143.81 47.13 C 142.76 46.85, 142.02 46.92, 139.37 46.88 C 136.72 46.83, 130.30 46.75, 127.91 46.88 C 125.51 47.01, 125.70 47.21, 125.00 47.65 C 124.30 48.09, 123.80 48.64, 123.73 49.54 C 123.67 50.44, 123.39 50.89, 124.63 53.06 C 125.88 55.22, 129.83 60.79, 131.22 62.54 C 132.61 64.29, 132.25 63.36, 132.95 63.56 C 133.65 63.77, 134.56 63.95, 135.42 63.76 Z", 
    maskD: "M 5 125 Q 100 220 195 125 M 5 125 Q 100 170 100 200 M 195 125 Q 100 170 100 200"
  },
];

function LogoInterno({ attivo = false }: { attivo: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    const maskPaths = Array.from(svg.querySelectorAll<SVGPathElement>(".mask-path"));

    maskPaths.forEach((p) => {
      const L = p.getTotalLength();
      p.style.transition = "none";
      p.style.strokeDasharray = String(L);
      p.style.strokeDashoffset = String(L);
      p.getBoundingClientRect(); // reflow
    });

    if (!attivo) return;

    let t = 0;
    maskPaths.forEach((p, i) => {
      const dur = TRATTI[i].durata;
      const gap = TRATTI[i].pausa;

      timers.current.push(
        setTimeout(() => {
          p.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(.45,.05,.3,1)`;
          p.style.strokeDashoffset = "0";
        }, t)
      );

      t += dur + gap;
    });

    return () => timers.current.forEach(clearTimeout);
  }, [attivo]);

  return (
    <svg x="190" y="190" width="120" height="120" viewBox="0 0 200 200" ref={svgRef} className="overflow-visible">
      <defs>
        {TRATTI.map((t) => (
          <mask id={`mask-${t.nome}`} key={`mask-${t.nome}`}>
            <path
              className="mask-path"
              d={t.maskD}
              fill="none"
              stroke="white"
              strokeWidth={35}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        ))}
      </defs>

      {TRATTI.map((t) => (
        <path
          key={t.nome}
          d={t.d}
          fill="#84cc16"
          mask={`url(#mask-${t.nome})`}
        />
      ))}
    </svg>
  );
}

/* ==================================================================
   2. PAGINA PRINCIPALE CON L'ANIMAZIONE COMPLETA
================================================================== */
export default function TestLogo() {
  const [fase, setFase] = useState(0);

  useEffect(() => {
    if (fase === 0) {
      // Fase 0->1: Lo schermo verde (La "I" gigante) fa zoom-out e si posiziona
      const timer = setTimeout(() => setFase(1), 1200);
      return () => clearTimeout(timer);
    } else if (fase === 1) {
      // Fase 1->2: La "A" scende da sotto la "I"
      const timer = setTimeout(() => setFase(2), 1000);
      return () => clearTimeout(timer);
    } else if (fase === 2) {
      // Fase 2->3: Appare l'anello (La "O") e l'omino
      const timer = setTimeout(() => setFase(3), 1200);
      return () => clearTimeout(timer);
    } else if (fase === 3) {
      // Fase 3->4: La "A", la "I" e l'omino sfumano. La O slitta e appare MNIFIT.
      const timer = setTimeout(() => setFase(4), 3000); 
      return () => clearTimeout(timer);
    }
  }, [fase]);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans p-4">
      
      <div className="absolute top-10 flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-xl z-50 text-sm z-[100]">
        <button onClick={() => setFase(0)} className="px-5 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-all">
          Riavvia Intro Completa
        </button>
      </div>

      {/* CONTENITORE PRINCIPALE */}
      <div className="relative flex items-center justify-center w-full max-w-[800px] h-[500px]">
        
        {/* LA CARTA BIANCA DIETRO TUTTO (Si allarga in Fase 4 per incorniciare il logo) */}
        <div 
          className={`absolute bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-[70px] transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${
            fase >= 4 ? 'w-[740px] h-[180px] opacity-100' : 'w-[200px] h-[200px] opacity-0 scale-50'
          }`}
        />

        <svg viewBox="0 0 800 500" className="absolute w-full h-full overflow-visible z-10">
          
          {/* GRUPPO CENTRALE (I + A + O + Omino). In Fase 4 si sposta a sinistra */}
          <g 
            className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) origin-center ${
              fase >= 4 ? 'translate-x-[-300px] scale-[0.45]' : 'translate-x-0 scale-100'
            }`}
            style={{ transformOrigin: '400px 250px' }}
          >
             
            {/* LA "I" VERDE CHE NASCE COME SCHERMO INTERO E FA ZOOM-OUT */}
            <g 
              className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] origin-center
                ${fase === 0 ? 'scale-[100] opacity-100' : 'scale-100 opacity-100'}
                ${fase >= 4 ? 'opacity-0' : 'opacity-100'}
              `}
              style={{ transformOrigin: '400px 40px' }} // Il centro della "I"
            >
               <path transform="translate(375, -5) scale(0.5)" d="M 8 0 H 92 Q 100 0 100 8 V 27 Q 100 35 92 35 H 73 Q 65 35 65 43 V 137 Q 65 145 73 145 H 92 Q 100 145 100 153 V 172 Q 100 180 92 180 H 8 Q 0 180 0 172 V 153 Q 0 145 8 145 H 27 Q 35 145 35 137 V 43 Q 35 35 27 35 H 8 Q 0 35 0 27 V 8 Q 0 0 8 0 Z" fill="#84cc16"/>
            </g>

            {/* L'ANIMAZIONE DELLA "A" (Scende dopo lo zoom della "I") */}
            <g className={`transition-all duration-[1000ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${fase < 2 ? 'translate-y-[-80px] opacity-0' : 'translate-y-0 opacity-100'}`}>
              <circle cx="400" cy="250" r="109" fill="none" stroke="#84cc16" strokeWidth="48" strokeDasharray="685" strokeDashoffset={fase >= 3 ? 0 : 685} style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              
              {/* Questa è la A grigia (In Fase 4 svanisce) */}
              <path className={`transition-opacity duration-1000 ${fase >= 4 ? 'opacity-0' : 'opacity-100'}`} fillRule="evenodd" d="M 376.66 85 H 423.33 L 573.33 445 H 531.33 L 506.34 385 H 293.66 L 268.67 445 H 226.66 Z M 400 129.8 L 314.5 335 H 485.5 Z" fill="#334155" />
              
              <circle cx="400" cy="250" r="109" fill="none" stroke="#84cc16" strokeWidth="48" strokeDasharray="685" strokeDashoffset={fase >= 3 ? 0 : 685} style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              
              {/* Le toppe grigie maschera (Svaniscono in Fase 4) */}
              <g className={`transition-opacity duration-1000 ${fase >= 4 ? 'opacity-0' : 'opacity-100'}`}>
                <path d="M 376.66 85 H 423.33 L 479.59 220 H 437.59 L 400 129.8 L 362.41 220 H 320.41 Z" fill="#334155" />
                <polygon points="272.5,335 527.5,335 548.34,385 251.66,385" fill="#334155" />
              </g>
            </g>

            {/* Sfondo cerchio bianco (Svanisce in Fase 4) */}
            <circle cx="400" cy="250" r="85" fill="#f1f5f9" className={`transition-all duration-[1200ms] ease-out origin-center ${fase >= 4 ? 'opacity-0' : fase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transformOrigin: '400px 250px' }} />

            {/* L'OMINO CHE COMPAIE E SVANISCE IN FASE 4 */}
            <g className={`transition-opacity duration-1000 ${fase >= 4 ? 'opacity-0' : 'opacity-100'}`}>
               <LogoInterno attivo={fase >= 3} />
            </g>

          </g>

          {/* SCRITTA "MNIFIT" CHE ENTRA IN FASE 4 */}
          <g className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${fase >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[40px]'}`}>
             <text x="165" y="298" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="140" letterSpacing="-4" fill="#475569">
                MNI<tspan fill="#84cc16">FIT</tspan>
             </text>
          </g>

        </svg>
      </div>
    </div>
  );
}
