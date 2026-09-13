"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. IL DIZIONARIO DEI TEMI (Centralizzato per tutta l'app)
export const TEMI = {
  chiaro: {
    nome: 'Chiaro',
    sfondoCarta: '#E0E5EC', sfondoIcona: '#E0E5EC', testoNome: 'text-slate-800', testoTag: 'text-orange-500',
    ombraCartaPast: '6px 6px 14px rgba(163,177,198,0.4), -6px -6px 14px rgba(255,255,255,0.6)',
    ombraCartaFront: '5px 5px 12px rgba(163,177,198,0.35), -5px -5px 12px rgba(255,255,255,0.55)',
    ombraIcona: 'inset 3px 3px 6px rgba(163,177,198,0.3), inset -3px -3px 6px rgba(255,255,255,0.7)',
    barraColor1: '#1e293b', barraColor2: '#0f172a', barraText1: '#64748b', barraText2: '#ff6600',
    barraBorder1: '#475569', barraBorder2: '#ff6600'
  },
  scuro: {
    nome: 'Scuro',
    sfondoCarta: '#1E293B', sfondoIcona: '#0F172A', testoNome: 'text-slate-100', testoTag: 'text-emerald-400',
    ombraCartaPast: '6px 6px 14px rgba(0,0,0,0.5), -6px -6px 14px rgba(255,255,255,0.05)',
    ombraCartaFront: '5px 5px 12px rgba(0,0,0,0.4), -5px -5px 12px rgba(255,255,255,0.03)',
    ombraIcona: 'inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.1)',
    barraColor1: '#0f172a', barraColor2: '#020617', barraText1: '#475569', barraText2: '#10b981',
    barraBorder1: '#334155', barraBorder2: '#10b981'
  },
  neon: {
    nome: 'Neon',
    sfondoCarta: '#09090B', sfondoIcona: '#18181B', testoNome: 'text-fuchsia-400', testoTag: 'text-cyan-400',
    ombraCartaPast: '0px 0px 15px rgba(192,38,211,0.2), 0px 0px 5px rgba(34,211,238,0.1)',
    ombraCartaFront: '0px 0px 20px rgba(192,38,211,0.3), 0px 0px 10px rgba(34,211,238,0.2)',
    ombraIcona: 'inset 2px 2px 5px rgba(0,0,0,0.8), inset -1px -1px 3px rgba(255,255,255,0.05)',
    barraColor1: '#18181B', barraColor2: '#27272A', barraText1: '#52525B', barraText2: '#c026d3',
    barraBorder1: '#3f3f46', barraBorder2: '#22d3ee'
  }
};

type NomeTema = keyof typeof TEMI;

interface ThemeContextType {
  temaCorrente: NomeTema;
  temaInfo: typeof TEMI['chiaro'];
  cambiaTema: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. IL PROVIDER CHE AVVOLGE L'APP
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [temaCorrente, setTemaCorrente] = useState<NomeTema>('chiaro');

  useEffect(() => {
    // Applica una classe globale al documento HTML per poter usare il CSS
    const root = document.documentElement;
    root.classList.remove('chiaro', 'scuro', 'neon');
    root.classList.add(temaCorrente);
  }, [temaCorrente]);

  const cambiaTema = () => {
    if (temaCorrente === 'chiaro') setTemaCorrente('scuro');
    else if (temaCorrente === 'scuro') setTemaCorrente('neon');
    else setTemaCorrente('chiaro');
  };

  return (
    <ThemeContext.Provider value={{ temaCorrente, temaInfo: TEMI[temaCorrente], cambiaTema }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizzato per usare il tema ovunque
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme deve essere usato dentro ThemeProvider");
  return context;
};

// 3. IL BOTTONE GLOBALE
export const ThemeToggle = () => {
  const { temaInfo, cambiaTema } = useTheme();
  return (
    <button 
      onClick={cambiaTema}
      className="px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-500 shadow-lg"
      style={{ 
        backgroundColor: temaInfo.sfondoCarta, 
        color: temaInfo.barraText2,
        boxShadow: temaInfo.ombraCartaFront
      }}
    >
      Tema: {temaInfo.nome}
    </button>
  );
};
