"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";
import { MediaVisualizer } from './animations';

// Configurazione Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqawxoocwtxfkahzyduq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chiave-temporanea-per-il-build";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 1. DATABASE ALLENAMENTO MASTER (Paziente Zero)
// Ogni alternativa è mappata ESATTAMENTE con l'animazione corretta
// ==========================================
const baseDbAllenamento = {
  Spinta: {
    focus: "SPINTA (Petto, Spalle, Tricipiti)",
    esercizi: [
      { id: "e1", nome: "Panca piana bilanciere", anim: "chest_barbell_flat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "BILANCIERE: Disteso su panca piana. Scendi fino a sfiorare il petto e spingi verso l'alto con forza.", 
        alternative: [
          { nome: "Chest Press Convergente", anim: "chest_machine_flat", note: "Stesso asse di spinta", dettaglio: "MACCHINARIO: Siediti in appoggio. Impugna le maniglie e spingi in avanti contraendo il petto." }, 
          { nome: "Panca piana manubri", anim: "chest_db_flat", note: "Maggiore ROM", dettaglio: "MANUBRI: Disteso su panca piana, spingi verso l'alto chiudendo il movimento al centro." }
        ] 
      },
      { id: "e3", nome: "Panca inclinata manubri", anim: "chest_db_incline", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "MANUBRI: Panca a 30-45°. Spingi i manubri verso l'alto concentrandoti sui fasci clavicolari.", 
        alternative: [
          { nome: "Panca inclinata bilanciere", anim: "chest_barbell_incline", note: "Focus forza", dettaglio: "BILANCIERE: Panca inclinata. Scendi al livello della clavicola e spingi forte per il petto alto." }, 
          { nome: "Chest Press Inclinata", anim: "chest_machine_incline", note: "Tensione costante", dettaglio: "MACCHINARIO: Usa la variante inclinata della pressa. Mantieni le spalle basse e il petto in fuori." }
        ] 
      },
      { id: "e4", nome: "Chest press", anim: "chest_machine_flat", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "MACCHINARIO: Esercizio guidato per isolare il pettorale. Controlla il movimento.", 
        alternative: [
          { nome: "Pectoral Machine", anim: "chest_pec_deck", note: "Isolamento sternale", dettaglio: "MACCHINARIO: Tieni i gomiti alti e chiudi le braccia stringendo il petto al centro." }, 
          { nome: "Croci cavi seduto", anim: "chest_cable_seated", note: "Picco di tensione", dettaglio: "CAVI: Posiziona una panca al centro. Chiudi le maniglie davanti al petto in tensione continua." }
        ] 
      },
      { id: "e5", nome: "Croci ai manubri", anim: "chest_flye_db", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "MANUBRI: Panca piana. Allarga le braccia flettendo i gomiti. Tira il petto al massimo e richiudi.", 
        alternative: [
          { nome: "Croci cavi piana", anim: "chest_cable_flat", note: "Tensione continua", dettaglio: "CAVI: Dai cavi bassi. Chiudi le braccia al centro, strizzando i pettorali a fine movimento." }, 
          { nome: "Pec Deck (Fly)", anim: "chest_pec_deck", note: "Pump controllato", dettaglio: "MACCHINARIO: Usa il pec deck a braccia tese per isolare completamente il pettorale." }
        ] 
      },
      { id: "e18", nome: "Lento avanti manubri", anim: "shoulder_db_seated", fase: "Fase 1: Forza Spalle", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "MANUBRI: Seduto a 90°. Parti con i manubri alle orecchie e spingi dritto sopra la testa.", 
        alternative: [
          { nome: "Military Press", anim: "shoulder_military", note: "Carico massimo", dettaglio: "BILANCIERE: In piedi, spingi dal petto alto fin sopra la testa." }, 
          { nome: "Shoulder Press", anim: "shoulder_machine", note: "Spinta guidata", dettaglio: "MACCHINARIO: Esercizio di spinta verticale vincolato per caricare in sicurezza." }
        ] 
      },
      { id: "e20", nome: "Alzate laterali cavi", anim: "lateral_cable", fase: "Fase 3: Pump Spalle", rep: "3-4 serie, 10-12 rep | Rec: 45 sec", dettaglio: "CAVI: Tira il cavo lateralmente dal basso per colpire il deltoide mediale.", 
        alternative: [
          { nome: "Alzate manubri", anim: "lateral_db", note: "Focus classico", dettaglio: "MANUBRI: In piedi, solleva lateralmente i manubri controllando la discesa." }, 
          { nome: "Alzate macchina", anim: "lateral_machine", note: "No compensazioni", dettaglio: "MACCHINARIO: Isola i deltoidi bloccando le braccia. Nessuno slancio con la schiena." }
        ] 
      },
      { id: "e22", nome: "Panca stretta", anim: "tricep_close_grip", fase: "Fase 1: Forza Tricipiti", rep: "4-5 serie, 6-8 rep | Rec: 2 min", dettaglio: "BILANCIERE: Presa stretta. Gomiti incollati al busto e spingi esplodendo in alto.", 
        alternative: [
          { nome: "French Press", anim: "tricep_french_press", note: "Stretch capo lungo", dettaglio: "BILANCIERE EZ: Disteso, porta il bilanciere alla fronte flettendo i gomiti e distendi in alto." }, 
          { nome: "Dips parallele", anim: "tricep_dips", note: "Catena chiusa", dettaglio: "LIBERO/ZAVORRA: Scendi piegando le braccia e tenendo il busto dritto, spingi sui tricipiti." }
        ] 
      },
      { id: "e27", nome: "Push down corda", anim: "tricep_pushdown", fase: "Fase 3: Pump Tricipiti", rep: "3-4 serie, 12-15 rep | Rec: 45 sec", dettaglio: "CAVI: Spingi verso il basso e apri le estremità verso l'esterno per strizzare i tricipiti.", 
        alternative: [
          { nome: "Push down sbarra", anim: "tricep_pushdown", note: "Carico maggiore", dettaglio: "CAVI: Sbarra dritta. Spingi il carico in basso bloccando i gomiti lungo i fianchi." }, 
          { nome: "Estensioni nuca", anim: "tricep_overhead", note: "Enfasi capo lungo", dettaglio: "CAVI: Dai cavi bassi, porta la corda dietro la testa e distendi verso l'alto." }
        ] 
      }
    ]
  },
  Tirata: {
    focus: "TIRATA (Schiena, Bicipiti)",
    esercizi: [
      { id: "e6", nome: "Trazioni", anim: "back_pullup", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "CORPO LIBERO: Appeso alla sbarra, tira il corpo verso l'alto abbassando i gomiti.", 
        alternative: [
          { nome: "Lat Machine Larga", anim: "back_pulldown", note: "Carichi modulabili", dettaglio: "MACCHINARIO: Presa larga prono. Tira la sbarra verso il petto inarcando la schiena." }, 
          { nome: "Lat Machine Triang.", anim: "back_pulldown_triangle", note: "Focus centrale", dettaglio: "MACCHINARIO: Triangolo presa stretta, tira verso il petto basso." }
        ] 
      },
      { id: "e7", nome: "Rematore bilanciere", anim: "back_row_barbell", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "BILANCIERE: Busto a 45°. Tira verso l'ombelico, schiena piatta.", 
        alternative: [
          { nome: "Rematore Manubrio", anim: "back_row_db", note: "Unilaterale", dettaglio: "MANUBRI: In appoggio su panca. Tira il manubrio portando il gomito dietro la schiena." }, 
          { nome: "Rematore T-Bar", anim: "back_t_bar", note: "Tirata esplosiva", dettaglio: "MACCHINARIO: Afferra il T-Bar e tira il peso verso il petto strizzando le scapole." }
        ] 
      },
      { id: "e9", nome: "Pulley seduto", anim: "back_pulley", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "CAVI: Seduto, tira la maniglia verso l'addome basso (busto immobile).", 
        alternative: [
          { nome: "Chest Supported", anim: "back_chest_supported", note: "Zero carico lombare", dettaglio: "MACCHINARIO: Petto in appoggio. Tira le maniglie lavorando i dorsali." }, 
          { nome: "Seal Row", anim: "back_seal_row", note: "Puro isolamento", dettaglio: "BILANCIERE: Sdraiato prono su panca alta, tira il peso senza usare alcuno slancio." }
        ] 
      },
      { id: "e10", nome: "Pullover ai cavi", anim: "back_pullover_cable", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "CAVI: Cavo alto con sbarra. Spingi verso le cosce a braccia tese per isolare il dorso.", 
        alternative: [
          { nome: "Pullover Macchina", anim: "back_pullover_cable", note: "Tensione continua", dettaglio: "MACCHINARIO: Macchina specifica, flettendo le braccia sui cuscinetti." }, 
          { nome: "Pullover Manubrio", anim: "back_pullover_db", note: "Stretch toracico", dettaglio: "MANUBRI: Di traverso su panca. Abbassa il manubrio dietro la testa." }
        ] 
      },
      { id: "e23", nome: "Curl bilanciere EZ", anim: "bicep_barbell", fase: "Fase 1: Forza Bicipiti", rep: "4-5 serie, 6-8 rep | Rec: 2 min", dettaglio: "BILANCIERE EZ: In piedi. Solleva verso le spalle senza muovere i gomiti.", 
        alternative: [
          { nome: "Curl Manubri Alt.", anim: "bicep_db", note: "Lavoro unilaterale", dettaglio: "MANUBRI: Fletti un braccio alla volta ruotando il polso in salita." }, 
          { nome: "Curl Cavo Basso", anim: "bicep_cable", note: "Tensione continua", dettaglio: "CAVI: Cavo basso con sbarra corta. Tensione bruciante continua." }
        ] 
      },
      { id: "e26", nome: "Curl cavi corda", anim: "bicep_cable", fase: "Fase 3: Pump Bicipiti", rep: "3-4 serie, 12-15 rep | Rec: 45 sec", dettaglio: "CAVI: Fune al cavo basso. Presa a martello per colpire anche il brachiale.", 
        alternative: [
          { nome: "Curl Inclinata", anim: "bicep_db", note: "Stretch capo lungo", dettaglio: "MANUBRI: Seduto su panca a 45°, lascia cadere le braccia indietro e fletti." }, 
          { nome: "Spider Curl", anim: "bicep_spider_curl", note: "Picco bicipite", dettaglio: "BILANCIERE: Petto in appoggio su panca inclinata, fletti verso le spalle." }
        ] 
      }
    ]
  },
  Gambe: {
    focus: "GAMBE E POLPACCI",
    esercizi: [
      { id: "e11", nome: "Squat bilanciere", anim: "leg_squat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "BILANCIERE: Sui trapezi. Scendi sotto il parallelo e sali potente dai talloni.", 
        alternative: [
          { nome: "Front Squat", anim: "leg_squat", note: "Focus quadricipite", dettaglio: "BILANCIERE: Appoggiato sulle clavicole anteriori. Busto dritto, isola i quadricipiti." }, 
          { nome: "Hack Squat Libero", anim: "leg_squat", note: "Carico posteriore", dettaglio: "BILANCIERE: Bilanciere dietro le gambe (stile stacco). Spingi forte sui quadricipiti." }
        ] 
      },
      { id: "e12", nome: "Hack squat", anim: "leg_squat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "MACCHINARIO: Poggia schiena. Scendi e spingi su isolando le gambe senza la bassa schiena.", 
        alternative: [
          { nome: "Leg Press 45°", anim: "leg_press", note: "Isolamento pressa", dettaglio: "MACCHINARIO: Piedi bassi e stretti sulla pedana per concentrare il lavoro sui quadricipiti." }, 
          { nome: "Belt Squat", anim: "leg_squat", note: "Zero stress lombare", dettaglio: "MACCHINARIO: Cintura pesata ai fianchi per caricare salvando la spina dorsale." }
        ] 
      },
      { id: "e14", nome: "Pressa 45°", anim: "leg_press", fase: "Fase 2: Connessione", rep: "4-5 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "MACCHINARIO: Scendi portando le ginocchia verso il petto e spingi senza bloccare l'articolazione.", 
        alternative: [
          { nome: "Affondi Manubri", anim: "leg_lunge", note: "Equilibrio", dettaglio: "MANUBRI: In camminata o sul posto, affonda controllando la discesa." }, 
          { nome: "Bulgarian Squat", anim: "leg_lunge", note: "Unilaterale", dettaglio: "MANUBRI: Piede posteriore su panca, scendi in affondo per un lavoro mirato." }
        ] 
      },
      { id: "e15", nome: "Leg extension", anim: "leg_extension", fase: "Fase 3: Pump Quad", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "MACCHINARIO: Distendi le gambe strizzando forte i quadricipiti nel punto più alto.", 
        alternative: [
          { nome: "Sissy Squat", anim: "leg_sissy_squat", note: "Bodyweight stretch", dettaglio: "CORPO LIBERO: Blocca i polpacci e lasciati cadere all'indietro per stretchare i quadricipiti." }, 
          { nome: "Step-up controllato", anim: "leg_lunge", note: "Lavoro concentrico", dettaglio: "MANUBRI: Sali su un box alto spingendo unicamente con la gamba in appoggio." }
        ] 
      },
      { id: "e13", nome: "Stacco rumeno", anim: "leg_deadlift", fase: "Fase 2: Conn. Femorali", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "BILANCIERE: Scivola lungo le cosce spingendo il sedere indietro. Sali contraendo i femorali.", 
        alternative: [
          { nome: "Stacco Gambe Tese", anim: "leg_deadlift", note: "Stretch puro", dettaglio: "BILANCIERE: Ginocchia dritte (non bloccate). Scendi per allungare la catena posteriore." }, 
          { nome: "Good Morning", anim: "leg_deadlift", note: "Catena posteriore", dettaglio: "BILANCIERE: Sui trapezi. Fletti il busto in avanti come in un inchino." }
        ] 
      },
      { id: "e16", nome: "Leg curl sdraiato", anim: "leg_curl", fase: "Fase 3: Pump Femorali", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "MACCHINARIO: Prono, porta i talloni ai glutei in modo esplosivo e frena la discesa.", 
        alternative: [
          { nome: "Leg Curl Seduto", anim: "leg_curl", note: "Isolamento femorale", dettaglio: "MACCHINARIO: Isola magnificamente il bicipite femorale garantendo stabilità lombare." }, 
          { nome: "Glute Ham Raise", anim: "leg_curl", note: "Catena chiusa", dettaglio: "MACCHINARIO: Solleva il busto usando solo la contrazione dei femorali." }
        ] 
      },
      { id: "e17", nome: "Calf in piedi", anim: "leg_calf", fase: "Fase 3: Pump", rep: "3-4 serie, 20 rep | Rec: 45 sec", dettaglio: "LIBERO/MACCHINA: Scendi al massimo stirando il tendine, e sali in punta di piedi fermandoti 1 secondo.", 
        alternative: [
          { nome: "Calf Press", anim: "leg_calf", note: "Sovraccarico", dettaglio: "MACCHINARIO: Usa la Leg Press spingendo solo con le caviglie." }, 
          { nome: "Calf Seduto", anim: "leg_calf_seated", note: "Focus Soleo", dettaglio: "MACCHINARIO: Seduto, solleva i talloni per colpire il soleo in profondità." }
        ] 
      }
    ]
  }
};

// ==========================================
// GRAFICI & RUOTA BIA LAICA
// ==========================================
const SvgLineChart = ({ data, label }: { data: number[], label: string }) => {
  if (!data || data.length === 0) return <p className="text-[10px] text-neutral-500 italic">Dati insufficienti.</p>;
  if (data.length === 1) return <p className="text-[10px] text-neutral-500 italic">Un solo dato. Esegui un&apos;altra sessione.</p>;
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal === 0 ? 10 : maxVal - minVal;
  const width = 300, height = 100, padding = 20;
  const points = data.map((val, i) => `${padding + (i / (data.length - 1)) * (width - padding * 2)},${height - padding - ((val - minVal) / range) * (height - padding * 2)}`).join(" ");

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded p-3 mt-2">
       <span className="text-[10px] text-orange-400 font-bold uppercase block mb-2">{label} - Trend</span>
       <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
          <polyline points={points} fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {data.map((val, i) => {
            const x = padding + (i / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
            return (
              <g key={i}><circle cx={x} cy={y} r="3" fill="#fff" /><text x={x} y={y - 8} fill="#a3a3a3" fontSize="8" textAnchor="middle" fontWeight="bold">{val}</text></g>
            );
          })}
       </svg>
    </div>
  );
};

const SvgBodyCompositionWheel = ({ data, altezza, eta }: { data: Record<string, string>, altezza: number | "", eta: number | "" }) => {
  const w = Number(data.peso) || 0;
  const h = Number(altezza) || 0;
  const a = Number(eta) || 0;
  const bf = Number(data.bodyFat) || 0;
  const bw = Number(data.bodyWater) || 0;
  const mm = Number(data.muscleMass) || 0;

  const bmi = (w > 0 && h > 0) ? (w / Math.pow(h / 100, 2)).toFixed(1) : '0';
  const bmr = (w > 0 && h > 0 && a > 0) ? Math.round((10 * w) + (6.25 * h) - (5 * a) + 5) : 0;

  const radius = 160; 
  const strokeW = 70;
  const c = 2 * Math.PI * radius;
  const seg = c / 6;

  const getLabelPos = (angleDeg: number) => {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: 250 + radius * Math.cos(rad), y: 250 + radius * Math.sin(rad) };
  };

  const sections = [
    { label: 'BMI', val: bmi, color: '#ec4899', angle: 330 },           
    { label: 'BMR Kcal', val: bmr > 0 ? bmr : '-', color: '#f97316', angle: 30 },  
    { label: 'MASSA MUSC. %', val: mm > 0 ? `${mm}%` : '-', color: '#ef4444', angle: 90 },  
    { label: 'ACQUA CORP. %', val: bw > 0 ? `${bw}%` : '-', color: '#3b82f6', angle: 150 }, 
    { label: 'MASSA GRASSA %', val: bf > 0 ? `${bf}%` : '-', color: '#22c55e', angle: 210 }, 
    { label: 'PESO kg', val: w > 0 ? w : '-', color: '#737373', angle: 270 }        
  ];

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px] bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-center overflow-hidden shadow-inner mt-4">
       <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
       <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl z-10 p-2">
          <g transform="translate(250, 250) rotate(-120)">
             {sections.map((sec, i) => (
                <circle key={i} cx="0" cy="0" r={radius} fill="none" stroke={sec.color} strokeWidth={strokeW} strokeDasharray={`${seg - 2} ${c}`} strokeDashoffset={-(i * seg)} className="opacity-90 hover:opacity-100 transition-opacity" />
             ))}
          </g>
          {sections.map((sec, i) => {
             const pos = getLabelPos(sec.angle);
             return (
               <g key={`t-${i}`} className="pointer-events-none">
                 <text x={pos.x} y={pos.y - 6} fill="#fff" fontSize="12" textAnchor="middle" fontWeight="bold" className="drop-shadow-md">{sec.label}</text>
                 <text x={pos.x} y={pos.y + 14} fill="#fff" fontSize="18" textAnchor="middle" fontWeight="900" className="drop-shadow-md">{sec.val}</text>
               </g>
             )
          })}
          <g transform="translate(250, 250) scale(1.1) translate(-250, -250)">
             <path d="M250,130 C240,130 238,140 238,145 C238,152 242,155 247,158 C235,163 225,175 222,190 C217,205 212,240 212,240 L220,245 C220,245 230,205 235,195 C235,230 233,260 233,260 L238,350 L245,350 L245,260 L255,260 L255,350 L262,350 L267,260 C267,260 265,230 265,195 C270,205 280,245 280,245 L288,240 C288,240 283,195 278,190 C275,175 265,163 253,158 C258,155 262,152 262,145 C262,140 260,130 250,130 Z" fill="url(#gradThermal)" stroke="#000" strokeWidth="2"/>
          </g>
          <defs>
             <linearGradient id="gradThermal" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#ef4444" />
               <stop offset="30%" stopColor="#f97316" />
               <stop offset="60%" stopColor="#22c55e" />
               <stop offset="100%" stopColor="#3b82f6" />
             </linearGradient>
          </defs>
       </svg>
    </div>
  );
};

// ==========================================
// 2. DATABASE ALIMENTAZIONE COMPLETO
// ==========================================
const dbAlimenti = {
  Pasto1: [
    { nome: "Avena + Whey + Burro di Arachidi", baseCarbo: 12, pro: 35, fat: 15, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.5)}g Avena • ${Math.round(p*1.2)}g Whey • ${f}g Burro Arachidi` },
    { nome: "Pancakes avena + Albume + Mirtilli", baseCarbo: 14, pro: 30, fat: 10, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.5)}g Farina Avena • ${Math.round(p*10)}g Albume • ${f}g Burro Arachidi (sopra)` },
    { nome: "Uova intere + Pane segale + Avocado", baseCarbo: 10, pro: 25, fat: 22, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*2)}g Pane Segale • ${Math.round(p/6)} Uova Intere • ${Math.round(f*6)}g Avocado` },
    { nome: "Crema di riso + Isolate + Mandorle", baseCarbo: 15, pro: 35, fat: 12, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.2)}g Crema Riso • ${Math.round(p*1.1)}g Isolate • ${Math.round(f*2)}g Mandorle` },
    { nome: "Yogurt Greco 0% + Muesli + Noci", baseCarbo: 12, pro: 25, fat: 15, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.4)}g Muesli • ${Math.round(p*10)}g Yogurt Greco 0% • ${Math.round(f*1.5)}g Noci` },
    { nome: "Fette Biscottate + Marmellata + Whey", baseCarbo: 16, pro: 30, fat: 5, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c/7)} Fette Biscott. • Velo Marmellata • ${Math.round(p*1.2)}g Whey` },
    { nome: "Toast integrale + Fesa Tacchino + Olio", baseCarbo: 11, pro: 28, fat: 12, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*2)}g Pane Toast • ${Math.round(p*4)}g Fesa • ${f}g Olio EVO` }
  ],
  Pasto2: [
    { nome: "Riso Basmati + Pollo + Olio EVO", baseCarbo: 20, pro: 40, fat: 12, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.25)}g Riso Basmati • ${Math.round(p*4)}g Petto Pollo • ${f}g Olio EVO` },
    { nome: "Pasta di Semola + Carne Magra (Manzo)", baseCarbo: 20, pro: 45, fat: 10, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.3)}g Pasta • ${Math.round(p*4.5)}g Macinato Magro • ${f}g Olio EVO` },
    { nome: "Patate dolci + Salmone selvaggio", baseCarbo: 16, pro: 40, fat: 20, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*4.5)}g Patate Dolci • ${Math.round(p*4.5)}g Salmone • Grassi dal pesce` },
    { nome: "Gnocchi di patate + Merluzzo + Olio", baseCarbo: 18, pro: 35, fat: 15, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*3)}g Gnocchi • ${Math.round(p*5)}g Merluzzo • ${f}g Olio EVO` },
    { nome: "Quinoa + Tacchino + Crema mandorle", baseCarbo: 15, pro: 40, fat: 18, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.5)}g Quinoa • ${Math.round(p*4)}g Tacchino • ${f}g Crema Mandorle` },
    { nome: "Cous Cous + Gamberetti + Zucchine", baseCarbo: 19, pro: 35, fat: 8, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.3)}g Cous Cous • ${Math.round(p*5)}g Gamberetti • ${f}g Olio EVO` },
    { nome: "Riso Venere + Tartare Manzo + Limone", baseCarbo: 17, pro: 42, fat: 14, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.3)}g Riso Venere • ${Math.round(p*4.5)}g Tartare • ${f}g Olio EVO` },
    { nome: "Wrap integrale + Pollo + Avocado", baseCarbo: 14, pro: 38, fat: 18, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*2)}g Piada Integrale • ${Math.round(p*4)}g Pollo • ${Math.round(f*6)}g Avocado` }
  ],
  Pasto3: [
    { nome: "Yogurt Greco + Mandorle", baseCarbo: 5, pro: 20, fat: 15, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*10)}g Yogurt Greco 0% • ${Math.round(f*2)}g Mandorle` },
    { nome: "Fiocchi di latte + Burro di arachidi", baseCarbo: 4, pro: 25, fat: 18, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*8)}g Fiocchi Latte Magri • ${f}g Burro Arachidi` },
    { nome: "Caseine micellari + Noci", baseCarbo: 2, pro: 30, fat: 15, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*1.2)}g Caseine (Polvere) • ${Math.round(f*1.5)}g Noci Sgusciate` },
    { nome: "Parmigiano (50g) + Fette Wasa", baseCarbo: 8, pro: 16, fat: 14, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*3)}g Parmigiano 30 Mesi • ${Math.round(c*1.5)}g Fette Wasa` },
    { nome: "Patate Dolci + Salmone (Pasto)", baseCarbo: 16, pro: 40, fat: 18, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*4.5)}g Patate Dolci • ${Math.round(p*4.5)}g Salmone` },
    { nome: "Skyr Naturale + Ciocc. Fondente 85%", baseCarbo: 6, pro: 22, fat: 12, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*9)}g Skyr • ${Math.round(f*2.2)}g Cioccolato Fondente 85%` }
  ],
  PostWorkout: [
    { nome: "Crema di Riso + Whey Isolate", baseCarbo: 16, pro: 35, fat: 1, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.2)}g Crema Riso • ${Math.round(p*1.1)}g Isolate` },
    { nome: "Corn Flakes + Whey Isolate", baseCarbo: 16, pro: 35, fat: 1, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.15)}g Corn Flakes • ${Math.round(p*1.1)}g Isolate` },
    { nome: "Gallette di riso + Bresaola", baseCarbo: 15, pro: 30, fat: 3, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c/8)} Gallette Riso • ${Math.round(p*3)}g Bresaola` },
    { nome: "Maltodestrine + EAA (Shaker)", baseCarbo: 14, pro: 15, fat: 0, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c)}g Maltodestrine • ${p}g EAA (Aminoacidi)` },
    { nome: "Riso Basmati + Merluzzo (Solido)", baseCarbo: 20, pro: 40, fat: 2, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.25)}g Riso Basmati • ${Math.round(p*5)}g Merluzzo` },
    { nome: "Gnocchi + Albume pastorizzato", baseCarbo: 18, pro: 35, fat: 0, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*3)}g Gnocchi • ${Math.round(p*10)}g Albume (cotto)` },
    { nome: "Sorbetto frutta + Whey Isolate", baseCarbo: 14, pro: 30, fat: 0, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*3.5)}g Sorbetto • ${Math.round(p*1.1)}g Isolate (a parte)` }
  ]
};

const misureBase = [
  { id: 'peso', label: "Peso", unit: "kg" }, { id: 'petto', label: "Petto", unit: "cm" },
  { id: 'spalle', label: "Spalle", unit: "cm" }, { id: 'braccia', label: "Braccia", unit: "cm" },
  { id: 'gambe', label: "Gambe", unit: "cm" }, { id: 'glutei', label: "Glutei", unit: "cm" }
];
const misureBIA = [
  { id: 'vita', label: "Circonferenza Vita", unit: "cm" }, { id: 'bodyFat', label: "Massa Grassa (BIA)", unit: "%" },
  { id: 'bodyWater', label: "Acqua Corporea", unit: "%" }, { id: 'muscleMass', label: "Massa Muscolare", unit: "%" }
];

export default function Home() {
  const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  const [appState, setAppState] = useState<'HOME' | 'PROTOCOL'>('HOME');
  
  const [listaAtleti, setListaAtleti] = useState<string[]>(["Leonardo"]);
  const [utenteCorrente, setUtenteCorrente] = useState("Leonardo");
  const [protocolloAttivo, setProtocolloAttivo] = useState("Massa");
  
  const [eta, setEta] = useState<number | "">(41);
  const [altezza, setAltezza] = useState<number | "">(175);
  const [stileVita, setStileVita] = useState("Attivo (es. Vendita al dettaglio, in piedi)");
  const [biometria, setBiometria] = useState<Record<string, string>>({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '', vita: '', bodyFat: '', bodyWater: '', muscleMass: '' });
  
  const [tipoTurno, setTipoTurno] = useState('spezzato');
  const [inizio1, setInizio1] = useState('');
  const [fine1, setFine1] = useState('');
  const [inizio2, setInizio2] = useState('');
  const [fine2, setFine2] = useState('');
  const [quandoTiAlleni, setQuandoTiAlleni] = useState('sera'); 
  
  const [modalWizard, setModalWizard] = useState(false);
  const [stepWizard, setStepWizard] = useState(1);
  const [datiWizard, setDatiWizard] = useState({ nome: '', eta: '', altezza: '', peso: '', stileVita: 'Sedentario', obiettivo: 'Shred' });
  const [fotoWizard, setFotoWizard] = useState<{data: string, mimeType: string, nome: string} | null>(null);
  const [rispostaWizard, setRispostaWizard] = useState("");
  const [loadingWizard, setLoadingWizard] = useState(false);
  
  const [giornoCalendario, setGiornoCalendario] = useState("Lunedì"); 
  const [schedaAttiva, setSchedaAttiva] = useState<"Spinta"|"Tirata"|"Gambe">("Spinta"); 
  const [fastWorkout, setFastWorkout] = useState(false);
  const [eserciziModificati, setEserciziModificati] = useState<Record<string, string>>({});
  const [carichiAttuali, setCarichiAttuali] = useState<Record<string, string[]>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [storicoSessioni, setStoricoSessioni] = useState<any[]>([]);
  const [vistaStorico, setVistaStorico] = useState(false);
  const [modalEsercizio, setModalEsercizio] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [esercizioDaCambiare, setEsercizioDaCambiare] = useState({ id: '', nomeAttuale: '', alternative: [] as any[] });
  
  const [moltiplicatoreCarbo, setMoltiplicatoreCarbo] = useState(5);
  const [messaggioDieta, setMessaggioDieta] = useState("Macro standard impostati.");
  const [pastiSelezionati, setPastiSelezionati] = useState<Record<string, number>>({ Pasto1: 0, Pasto2: 0, Pasto3: 0, PostWorkout: 0 });
  const [pastiCustom, setPastiCustom] = useState<Record<string, {attivo: boolean, cho: string, pro: string, fat: string, nome: string}>>({
    Pasto1: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, Pasto2: { attivo: false, cho: '', pro: '', fat: '', nome: '' },
    Pasto3: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, PostWorkout: { attivo: false, cho: '', pro: '', fat: '', nome: '' },
  });
  const [modalAlimento, setModalAlimento] = useState(false);
  const [categoriaDaCambiare, setCategoriaDaCambiare] = useState<keyof typeof dbAlimenti>('Pasto1');
  const [isCalculatingMacro, setIsCalculatingMacro] = useState<Record<string, boolean>>({});

  const [chatLog, setChatLog] = useState<{role: 'user' | 'ai', text: string}[]>([{ role: 'ai', text: 'Ciao! Sono il tuo Coach IA. Mandami la foto di un pasto o scrivimi cosa hai mangiato per stimare i macro!' }]);
  const [inputChat, setInputChat] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fileAllegato, setFileAllegato] = useState<{data: string, mimeType: string, nome: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [storicoMisure, setStoricoMisure] = useState<any[]>([]);
  const [vistaTelemetria, setVistaTelemetria] = useState<'FORM' | 'STORICO'>('FORM');
  const [vistaGraficiCarichi, setVistaGraficiCarichi] = useState(false);
  const [esercizioGraficoSelezionato, setEsercizioGraficoSelezionato] = useState<string>("e1");

  const calcolaTempoScheda = () => fastWorkout ? 45 : 75;

  useEffect(() => {
    if (tipoTurno === 'diretto' && quandoTiAlleni === 'pausa') setQuandoTiAlleni('sera');
  }, [tipoTurno, quandoTiAlleni]);

  useEffect(() => {
    async function fetchAtleti() {
      const { data } = await supabase.from("check_utente").select("nome_utente");
      if (data) {
        const unici = Array.from(new Set(data.map(d => d.nome_utente)));
        if (!unici.includes("Leonardo")) unici.unshift("Leonardo");
        setListaAtleti(unici);
      }
    }
    fetchAtleti();
  }, []);

  const caricaProfilo = async (nomeAtleta: string, objScelto: string) => {
    setUtenteCorrente(nomeAtleta);
    setProtocolloAttivo(objScelto);
    
    if (nomeAtleta === "Leonardo") {
      setEta(41); setAltezza(175); setStileVita("Attivo (es. Vendita al dettaglio, in piedi)"); setTipoTurno("spezzato");
    }

    const { data } = await supabase.from("check_utente").select("*").eq("nome_utente", nomeAtleta).order("data", { ascending: false });
    if (data && data.length > 0) {
      const validRec = data.find(d => d.peso || (d.circonferenze && typeof d.circonferenze === 'object' && Object.keys(d.circonferenze).length > 0));
      if (validRec) {
        if(nomeAtleta !== "Leonardo") setEta(validRec.eta || "");
        if(nomeAtleta !== "Leonardo") setAltezza(validRec.altezza || "");
        const circ = typeof validRec.circonferenze === 'string' ? JSON.parse(validRec.circonferenze) : (validRec.circonferenze || {});
        setBiometria({ 
          peso: validRec.peso?.toString() || '', petto: circ.petto || '', spalle: circ.spalle || '', 
          braccia: circ.braccia || '', gambe: circ.gambe || '', glutei: circ.glutei || '', 
          vita: circ.vita || '', bodyFat: circ.bodyFat || '', bodyWater: circ.bodyWater || '', muscleMass: circ.muscleMass || ''
        });
        if(circ.profilo?.stileVita) setStileVita(circ.profilo.stileVita);
      }
      setStoricoMisure(data.filter(d => d.peso || (d.circonferenze && typeof d.circonferenze === 'object' && Object.keys(d.circonferenze).length > 0)));
    } else if (nomeAtleta !== "Leonardo") {
       setBiometria({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '', vita: '', bodyFat: '', bodyWater: '', muscleMass: '' });
       setStoricoMisure([]);
    }

    if(objScelto === 'Shred') setMoltiplicatoreCarbo(2.5);
    else if(objScelto === 'Ricomposizione') setMoltiplicatoreCarbo(4);
    else setMoltiplicatoreCarbo(5);

    const resSess = await supabase.from("storico_allenamenti").select("*").eq("nome_utente", nomeAtleta).order("data", { ascending: true });
    if (resSess.data) {
      setStoricoSessioni(resSess.data.map(d => ({
        data: new Date(d.data).toLocaleDateString('it-IT'), giorno: d.giornata.split(" - ")[0], scheda: d.giornata.split(" - ")[1],
        carichi: typeof d.dettagli_esercizi === 'string' ? JSON.parse(d.dettagli_esercizi) : d.dettagli_esercizi, oraId: new Date(d.data).getTime()
      })));
    } else { setStoricoSessioni([]); }
    
    setAppState('PROTOCOL');
  };

  const eliminaAtleta = async () => {
    if (utenteCorrente === "Leonardo") { alert("Impossibile eliminare il Paziente Zero (Leonardo)."); return; }
    if (confirm(`Eliminare definitivamente ${utenteCorrente}?`)) {
      await supabase.from("check_utente").delete().eq("nome_utente", utenteCorrente);
      await supabase.from("storico_allenamenti").delete().eq("nome_utente", utenteCorrente);
      setListaAtleti(prev => prev.filter(a => a !== utenteCorrente));
      setUtenteCorrente("Leonardo");
    }
  };

  const generaAllenamentoDinamico = () => {
     const plan = JSON.parse(JSON.stringify(baseDbAllenamento)); 
     if (utenteCorrente === "Leonardo") return plan; 

     const isOver40 = Number(eta) > 40;
     const isShred = protocolloAttivo === 'Shred';
     const isHeavyJob = stileVita.includes("Attivo") || stileVita.includes("pesante");
     const highFat = Number(biometria.bodyFat) > 15; 

     Object.keys(plan).forEach(sch => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plan[sch].esercizi.forEach((ex: any) => {
           if (isShred || highFat) {
              ex.rep = ex.rep.replace("4-6 rep", "8-10 rep").replace("6-8 rep", "10-12 rep"); 
              ex.rep = ex.rep.replace("4-5 serie", "2-3 serie").replace("3-4 serie", "2 serie");
              ex.rep = ex.rep.replace("Rec: 1.5 min", "Rec: 2 min").replace("Rec: 45 sec", "Rec: 1 min");
           } else if (isOver40 && isHeavyJob) {
              ex.rep = ex.rep.replace("4-5 serie", "3-4 serie"); 
           }
        });
     });
     return plan;
  };

  const dbDinamico = generaAllenamentoDinamico();

  const gestisciCaricamentoFileWizard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setFotoWizard({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); };
    reader.readAsDataURL(file);
  };

  const analizzaObiettivoWizard = async () => {
    setLoadingWizard(true);
    try {
      const contesto = `Sei un Coach IA. Analizza questo atleta: Nome: ${datiWizard.nome}, Età: ${datiWizard.eta}, Altezza: ${datiWizard.altezza}cm, Peso: ${datiWizard.peso}kg. Lifestyle: ${datiWizard.stileVita}. Obiettivo: ${datiWizard.obiettivo}. Se c'è una foto, stima la body fat. Fornisci un verdetto indicando le settimane stimate per arrivarci.`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { message: "Analizza il mio profilo.", context: contesto };
      if (fotoWizard) payload.file = { data: fotoWizard.data, mimeType: fotoWizard.mimeType };
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      setRispostaWizard(data.reply);
      setStepWizard(3);
    } catch (e) {
      console.log(e); setRispostaWizard("Errore di rete. Riprova."); setStepWizard(3);
    }
    setLoadingWizard(false);
  };

  const salvaProfiloWizard = async () => {
    const payload = { nome_utente: datiWizard.nome, eta: Number(datiWizard.eta), altezza: Number(datiWizard.altezza), peso: Number(datiWizard.peso), circonferenze: { profilo: { stileVita: datiWizard.stileVita, obiettivo: datiWizard.obiettivo } }, data: new Date().toISOString() };
    await supabase.from("check_utente").insert([payload]);
    setListaAtleti(prev => [...prev, datiWizard.nome]);
    setModalWizard(false); setStepWizard(1);
    caricaProfilo(datiWizard.nome, datiWizard.obiettivo);
  };

  const gestisciCaricamentoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setFileAllegato({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); };
    reader.readAsDataURL(file);
  };

  const inviaMessaggioIA = async () => {
    if (!inputChat.trim() && !fileAllegato) return;
    const msg = inputChat || "Analizza file.";
    setChatLog(prev => [...prev, { role: 'user', text: fileAllegato ? `📎 [${fileAllegato.nome}] ${msg}` : msg }]);
    setInputChat(""); setFileAllegato(null); setIsTyping(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { message: msg, context: `SEI IL COACH IA. Utente: ${utenteCorrente}. Estrai Macro e scrivi alla fine: [MAGIC_MACRO | PASTO_TARGET | cho | pro | fat | NOME]` };
      if (fileAllegato) payload.file = { data: fileAllegato.data, mimeType: fileAllegato.mimeType };
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      let responseText = data.reply;
      const match = responseText.match(/\[MAGIC_MACRO\s*\|\s*(Pasto1|Pasto2|Pasto3|PostWorkout)\s*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([^\]]+)\]/i);
      if(match) {
          responseText = responseText.replace(match[0], '').trim();
          setPastiCustom(prev => ({ ...prev, [match[1]]: { attivo: true, cho: Math.round(parseFloat(match[2].replace(',','.'))).toString(), pro: Math.round(parseFloat(match[3].replace(',','.'))).toString(), fat: Math.round(parseFloat(match[4].replace(',','.'))).toString(), nome: match[5].trim() } }));
          responseText += `\n\n✨ Macro calcolati per ${match[1]}!`;
      }
      setChatLog(prev => [...prev, { role: 'ai', text: responseText }]);
    } catch (error) { console.log(error); setChatLog(prev => [...prev, { role: 'ai', text: "Errore." }]); }
    setIsTyping(false);
  };

  const calcolaMacroDaNome = async (cat: string, nomeCibo: string) => {
    if(!nomeCibo.trim()) return alert("Inserisci il nome del sgarro.");
    setIsCalculatingMacro(prev => ({...prev, [cat]: true}));
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: `Utente: "${nomeCibo}". Calcola macro. Restituisci SOLO: [MAGIC_MACRO | ${cat} | cho | pro | fat | ${nomeCibo}]` }) });
      const data = await response.json();
      const match = data.reply.match(/\[MAGIC_MACRO\s*\|\s*(Pasto1|Pasto2|Pasto3|PostWorkout)\s*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([^\]]+)\]/i);
      if(match) {
        updateCustomMeal(cat, 'cho', Math.round(parseFloat(match[2].replace(',','.'))).toString());
        updateCustomMeal(cat, 'pro', Math.round(parseFloat(match[3].replace(',','.'))).toString());
        updateCustomMeal(cat, 'fat', Math.round(parseFloat(match[4].replace(',','.'))).toString());
        updateCustomMeal(cat, 'nome', match[5].trim());
      } else { alert("Non riconosciuto. Risposta: " + data.reply); }
    } catch(e) { console.log(e); alert("Errore di rete."); }
    setIsCalculatingMacro(prev => ({...prev, [cat]: false}));
  };

  const valutaCheckFisico = async () => {
    const { peso, bodyFat } = biometria;
    if (peso && eta && altezza) {
      const trendCarichi = storicoSessioni.length >= 2 ? "Stallo" : "Neutro"; 
      let alertMsg = "";
      
      const grassoStimato = Number(bodyFat) || 0;
      
      if (protocolloAttivo === 'Massa') {
        if (grassoStimato > 15 || Number(peso) > 85) {
           setMoltiplicatoreCarbo(4); 
           alertMsg = "⚠️ BIA rileva accumulo grasso >15%. Taglio carbo a 4g/kg e alzo ripetizioni in scheda per favorire l'ossidazione.";
        } else if (trendCarichi === "Stallo") {
           setMoltiplicatoreCarbo(6.5); alertMsg = "🔥 Prestazioni bloccate. Surplus (6.5g/kg) attivato.";
        } else {
           setMoltiplicatoreCarbo(5); alertMsg = "✅ Parametri in asse. (5g/kg).";
        }
      } else if (protocolloAttivo === 'Shred') {
        setMoltiplicatoreCarbo(2.5); alertMsg = "🔪 Fase Shred. Carbo bassi (2.5g/kg), Volume ridotto.";
      } else {
        setMoltiplicatoreCarbo(4); alertMsg = "⚖️ Fase Ricomposizione attiva.";
      }
      setMessaggioDieta(alertMsg);

      const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo } }, data: new Date().toISOString() };
      const { error } = await supabase.from("check_utente").insert([payload]);
      if (error) alert("Errore DB: " + error.message);
      else { alert(alertMsg); caricaProfilo(utenteCorrente, protocolloAttivo); } 
    } else { alert("Peso, Età e Altezza sono obbligatori per il calcolo base."); }
  };

  const eliminaMisurazione = async (id: string) => { if(confirm("Eliminare misurazione?")) { await supabase.from("check_utente").delete().eq("id", id); caricaProfilo(utenteCorrente, protocolloAttivo); } };
  const getUltimoCarico = (idEs: string) => { for (let i = storicoSessioni.length - 1; i >= 0; i--) { if (storicoSessioni[i].carichi[idEs]) return storicoSessioni[i].carichi[idEs]; } return '0'; };
  const getNumeroSet = (fase: string) => { if (fase.includes('Fase 1')) return fastWorkout ? 3 : 4; return fastWorkout ? 2 : 3; };
  const updateCaricoSet = (idEs: string, indexSet: number, valore: string) => { setCarichiAttuali(prev => { const arr = prev[idEs] ? [...prev[idEs]] : Array(5).fill(""); arr[indexSet] = valore; return { ...prev, [idEs]: arr }; }); };
  const salvaSessione = async () => {
    if (Object.keys(carichiAttuali).length === 0) return alert("Inserisci almeno un carico!");
    const sessioneCarichiStr: Record<string, string> = {};
    Object.keys(carichiAttuali).forEach(k => { const pesiValidi = carichiAttuali[k].filter(v => v !== ""); if(pesiValidi.length > 0) sessioneCarichiStr[k] = pesiValidi.join(" | "); });
    const payload = { nome_utente: utenteCorrente, giornata: `${giornoCalendario} - ${schedaAttiva}`, dettagli_esercizi: sessioneCarichiStr, data: new Date().toISOString() };
    await supabase.from("storico_allenamenti").insert([payload]);
    setCarichiAttuali({}); alert(`Sessione salvata.`); caricaProfilo(utenteCorrente, protocolloAttivo);
  };
  const toggleCustomMeal = (cat: string) => setPastiCustom(prev => ({ ...prev, [cat]: { ...prev[cat], attivo: true } }));
  const resetCustomMeal = (cat: string) => setPastiCustom(prev => ({ ...prev, [cat]: { attivo: false, cho: '', pro: '', fat: '', nome: '' } }));
  const updateCustomMeal = (cat: string, field: 'cho'|'pro'|'fat'|'nome', value: string) => setPastiCustom(prev => ({ ...prev, [cat]: { ...prev[cat], [field]: value } }));
  
  // ==========================================
  // FIX: SWAP ESERCIZIO FUNZIONANTE AL 100%
  // ==========================================
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apriSwapEsercizio = (es: any) => { 
    const nomeAttuale = eserciziModificati[es.id] || es.nome;
    // Creiamo la lista completa (Esercizio originale base + tutte le alternative)
    const tutteLeOpzioni = [
      { nome: es.nome, anim: es.anim, dettaglio: es.dettaglio, note: "Esercizio Originale" },
      ...es.alternative
    ];
    // Rimuoviamo dalla lista l'esercizio che stiamo visualizzando attualmente
    const opzioniDisponibili = tutteLeOpzioni.filter(opt => opt.nome !== nomeAttuale);
    
    setEsercizioDaCambiare({ 
      id: es.id, 
      nomeAttuale: nomeAttuale, 
      alternative: opzioniDisponibili 
    }); 
    setModalEsercizio(true); 
  };
  const confermaSwapEsercizio = (nuovoNome: string) => { setEserciziModificati({ ...eserciziModificati, [esercizioDaCambiare.id]: nuovoNome }); setModalEsercizio(false); };
  
  const apriSwapAlimento = (categoria: string) => { setCategoriaDaCambiare(categoria as keyof typeof dbAlimenti); setModalAlimento(true); };
  const confermaSwapAlimento = (index: number) => { setPastiSelezionati({ ...pastiSelezionati, [categoriaDaCambiare]: index }); setModalAlimento(false); };

  const pesoNum = Number(biometria.peso) || 80;
  const bmr = Math.round((10 * pesoNum) + (6.25 * (Number(altezza)||175)) - (5 * (Number(eta)||41)) + 5);
  const tdeeMultiplier = protocolloAttivo === 'Shred' ? 1.35 : (protocolloAttivo === 'Ricomposizione' ? 1.45 : 1.55);
  const tdee = Math.round(bmr * tdeeMultiplier); 
  const intraCho = protocolloAttivo === 'Shred' ? Math.round(pesoNum * 0.3) : Math.round(pesoNum * 0.5);
  const intraPro = 15;
  const intraFat = 0;
  
  let targetCho = intraCho, targetPro = intraPro, targetFat = intraFat;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalMeals: Record<string, any> = {};
  ['Pasto1', 'Pasto2', 'Pasto3', 'PostWorkout'].forEach(cat => {
     const item = dbAlimenti[cat as keyof typeof dbAlimenti]?.[pastiSelezionati[cat]];
     if(item) {
       const modPro = protocolloAttivo === 'Shred' ? item.pro * 1.2 : item.pro;
       originalMeals[cat] = { cho: item.baseCarbo * moltiplicatoreCarbo, pro: Math.round(modPro), fat: item.fat };
       targetCho += originalMeals[cat].cho; targetPro += originalMeals[cat].pro; targetFat += originalMeals[cat].fat;
     }
  });

  let customCho = 0, customPro = 0, customFat = 0, sumNonCustomOrigCho = 0, sumNonCustomOrigPro = 0, sumNonCustomOrigFat = 0;
  ['Pasto1', 'Pasto2', 'Pasto3', 'PostWorkout'].forEach(cat => {
     if(pastiCustom[cat].attivo) {
        customCho += Number(pastiCustom[cat].cho) || 0; customPro += Number(pastiCustom[cat].pro) || 0; customFat += Number(pastiCustom[cat].fat) || 0;
     } else if(originalMeals[cat]) {
        sumNonCustomOrigCho += originalMeals[cat].cho; sumNonCustomOrigPro += originalMeals[cat].pro; sumNonCustomOrigFat += originalMeals[cat].fat;
     }
  });

  const remainingCho = Math.max(0, targetCho - customCho - intraCho);
  const remainingPro = Math.max(0, targetPro - customPro - intraPro);
  const remainingFat = Math.max(0, targetFat - customFat - intraFat);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalMeals: Record<string, any> = {};
  ['Pasto1', 'Pasto2', 'Pasto3', 'PostWorkout'].forEach(cat => {
     if(pastiCustom[cat].attivo) {
        finalMeals[cat] = { cho: Number(pastiCustom[cat].cho) || 0, pro: Number(pastiCustom[cat].pro) || 0, fat: Number(pastiCustom[cat].fat) || 0 };
     } else if(originalMeals[cat]) {
        finalMeals[cat] = {
           cho: sumNonCustomOrigCho > 0 ? Math.round(remainingCho * (originalMeals[cat].cho / sumNonCustomOrigCho)) : 0,
           pro: sumNonCustomOrigPro > 0 ? Math.round(remainingPro * (originalMeals[cat].pro / sumNonCustomOrigPro)) : 0,
           fat: sumNonCustomOrigFat > 0 ? Math.round(remainingFat * (originalMeals[cat].fat / sumNonCustomOrigFat)) : 0
        };
     }
  });

  let actualCho = intraCho + customCho, actualPro = intraPro + customPro, actualFat = intraFat + customFat;
  ['Pasto1', 'Pasto2', 'Pasto3', 'PostWorkout'].forEach(cat => {
     if(!pastiCustom[cat].attivo && finalMeals[cat]) {
        actualCho += finalMeals[cat].cho; actualPro += finalMeals[cat].pro; actualFat += finalMeals[cat].fat;
     }
  });
  const actualIntakeKcal = Math.round((actualCho * 4) + (actualPro * 4) + (actualFat * 9));

  const generaTimelineDieta = (): Array<{ isIntra?: boolean; titolo?: string; descrizione?: string; idCategoria?: string; titoloUI?: string }> => {
    const preW = quandoTiAlleni === 'sera' ? `1️⃣ PRE-WORKOUT:\n• Pump Stim-Free: Citrullina 6g + Arginina 3g` : `1️⃣ PRE-WORKOUT:\n• Focus & Pump: Caffeina 200mg + Citrullina 6g`;
    const intraW = `2️⃣ INTRA-WORKOUT:\n• Ciclodestrine: ${intraCho}g\n• EAA: 15g\n• Creatina: 5g`;
    const bloccoIntra = { isIntra: true, titolo: "STACK INTEGRAZIONE", descrizione: `${preW}\n\n${intraW}` };
    if (quandoTiAlleni === 'mattina') return [ bloccoIntra, { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Mattina)' }, { idCategoria: 'Pasto1', titoloUI: 'Pranzo / Pasto 1' }, { idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' }, { idCategoria: 'Pasto3', titoloUI: 'Pre-nanna / Pasto 3' }];
    if (quandoTiAlleni === 'pausa') return [ { idCategoria: 'Pasto1', titoloUI: 'Colazione' }, bloccoIntra, { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Fine Pausa)' }, { idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' }, { idCategoria: 'Pasto3', titoloUI: 'Pre-nanna / Pasto 3' }];
    return [ { idCategoria: 'Pasto1', titoloUI: 'Colazione' }, { idCategoria: 'Pasto2', titoloUI: 'Pranzo' }, { idCategoria: 'Pasto3', titoloUI: 'Spuntino' }, bloccoIntra, { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Sera)' } ];
  };

  const getDataGraficoEsercizio = () => {
    const dataPoints: number[] = [];
    storicoSessioni.forEach(sess => {
      if (sess.carichi[esercizioGraficoSelezionato]) {
        dataPoints.push(Math.max(...sess.carichi[esercizioGraficoSelezionato].split(' | ').map(Number)));
      }
    });
    return dataPoints;
  };

  if (appState === 'HOME') {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #f97316 0%, transparent 50%)', filter: 'blur(100px)'}}></div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10">
           <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-black tracking-tighter uppercase text-center flex-1">
                <span className="text-orange-500">Protocollo</span> <span className="text-white">Anti-Secco</span>
              </h1>
           </div>
           <p className="text-center text-xs text-neutral-400 font-mono mb-8 tracking-widest">SaaS Periodization Engine</p>

           <div className="space-y-6">
              <div>
                 <div className="flex justify-between items-center mb-2">
                   <label className="text-[10px] text-neutral-500 uppercase font-bold">1. Seleziona Atleta / Profilo</label>
                   {utenteCorrente !== "Leonardo" && (
                     <button onClick={eliminaAtleta} className="text-[9px] bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-2 py-0.5 rounded font-bold uppercase transition-all">🗑️ Elimina</button>
                   )}
                 </div>
                 <select value={utenteCorrente} onChange={e => setUtenteCorrente(e.target.value)} className="w-full bg-neutral-950 text-white p-3 rounded-lg border border-neutral-700 outline-none focus:border-orange-500 font-bold">
                    {listaAtleti.map(a => <option key={a} value={a}>{a}</option>)}
                 </select>
                 <button onClick={() => setModalWizard(true)} className="w-full mt-2 bg-neutral-800 hover:bg-neutral-700 text-orange-500 font-bold p-2 rounded-lg text-xs transition-all">+ Crea Nuovo Profilo Algoritmico</button>
              </div>

              <div>
                 <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-2">2. Fase Metabolica (Ciclo)</label>
                 <select value={protocolloAttivo} onChange={e => setProtocolloAttivo(e.target.value)} className="w-full bg-neutral-950 text-white p-3 rounded-lg border border-neutral-700 outline-none focus:border-blue-500 font-bold">
                    <option value="Massa">🔥 Costruzione (Massa / Ipertrofia)</option>
                    <option value="Shred">🔪 Definizione (Shred / Deficit)</option>
                    <option value="Ricomposizione">⚖️ Mantenimento (Ricomposizione)</option>
                 </select>
              </div>

              <button onClick={() => caricaProfilo(utenteCorrente, protocolloAttivo)} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black p-4 rounded-xl uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] mt-4">
                 Accedi al Sistema
              </button>
           </div>
        </div>

        {modalWizard && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-700 rounded-xl w-full max-w-lg shadow-2xl p-6">
               <h3 className="font-black text-xl text-orange-500 uppercase mb-4 border-b border-neutral-800 pb-2">Nuova Profilazione</h3>
               
               {stepWizard === 1 && (
                 <div className="space-y-4">
                   <input type="text" placeholder="Nome Atleta" value={datiWizard.nome} onChange={e=>setDatiWizard({...datiWizard, nome: e.target.value})} className="w-full bg-neutral-950 text-white p-2 border border-neutral-700 rounded" />
                   <div className="flex gap-2">
                     <input type="number" placeholder="Età" value={datiWizard.eta} onChange={e=>setDatiWizard({...datiWizard, eta: e.target.value})} className="w-1/3 bg-neutral-950 text-white p-2 border border-neutral-700 rounded" />
                     <input type="number" placeholder="Peso (kg)" value={datiWizard.peso} onChange={e=>setDatiWizard({...datiWizard, peso: e.target.value})} className="w-1/3 bg-neutral-950 text-white p-2 border border-neutral-700 rounded" />
                     <input type="number" placeholder="H (cm)" value={datiWizard.altezza} onChange={e=>setDatiWizard({...datiWizard, altezza: e.target.value})} className="w-1/3 bg-neutral-950 text-white p-2 border border-neutral-700 rounded" />
                   </div>
                   <button onClick={()=>{ if(datiWizard.nome && datiWizard.peso) setStepWizard(2); else alert("Inserisci Nome e Peso."); }} className="w-full bg-orange-600 text-white p-2 rounded font-bold uppercase">Avanti</button>
                 </div>
               )}

               {stepWizard === 2 && (
                 <div className="space-y-4">
                   <select value={datiWizard.stileVita} onChange={e=>setDatiWizard({...datiWizard, stileVita: e.target.value})} className="w-full bg-neutral-950 text-white p-2 border border-neutral-700 rounded text-xs">
                     <option value="Sedentario">Sedentario (Scrivania)</option>
                     <option value="Attivo (es. Vendita al dettaglio, in piedi)">Attivo (Molte ore in piedi / Negozi)</option>
                     <option value="Fisico">Lavoro Fisico Usurante</option>
                   </select>
                   <select value={datiWizard.obiettivo} onChange={e=>setDatiWizard({...datiWizard, obiettivo: e.target.value})} className="w-full bg-neutral-950 text-white p-2 border border-neutral-700 rounded text-xs">
                     <option value="Massa">Obiettivo: Massa / Ipertrofia</option>
                     <option value="Shred">Obiettivo: Dimagrimento (Shred)</option>
                     <option value="Ricomposizione">Obiettivo: Mantenimento</option>
                   </select>
                   <div className="bg-neutral-950 p-3 border border-neutral-800 rounded">
                     <p className="text-[10px] text-neutral-500 mb-2">📸 Foto Obiettivo Fisico (Opzionale). L&apos;IA stimerà la BIA.</p>
                     <input type="file" className="text-xs text-neutral-400" accept="image/*" onChange={gestisciCaricamentoFileWizard} />
                   </div>
                   <div className="flex gap-2">
                     <button onClick={() => setStepWizard(1)} className="w-1/3 bg-neutral-800 text-white p-2 rounded font-bold uppercase">Indietro</button>
                     <button onClick={analizzaObiettivoWizard} disabled={loadingWizard} className="w-2/3 bg-blue-600 text-white p-2 rounded font-bold uppercase disabled:opacity-50">{loadingWizard ? 'Analisi in corso...' : 'Calcola Profilo IA'}</button>
                   </div>
                 </div>
               )}

               {stepWizard === 3 && (
                 <div className="space-y-4">
                   <div className="bg-neutral-950 p-4 border border-neutral-800 rounded text-xs text-neutral-300 max-h-48 overflow-y-auto whitespace-pre-wrap">{rispostaWizard}</div>
                   <button onClick={salvaProfiloWizard} className="w-full bg-emerald-600 text-white p-2 rounded font-bold uppercase">Salva e Accedi</button>
                 </div>
               )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 lg:p-6 font-sans overflow-x-hidden">
      
      <header className="mb-6 border-b border-neutral-800 pb-4 flex justify-between items-center">
        <div>
          <button onClick={() => setAppState('HOME')} className="text-[10px] uppercase font-bold text-neutral-500 hover:text-white mb-2 block transition-all">⬅️ Torna alla Home</button>
          <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-orange-500">
            PROTOCOLLO <span className="text-white">{protocolloAttivo}</span>
          </h1>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-neutral-500 block uppercase font-bold">Atleta Operativo</span>
          <span className="text-sm font-bold text-white bg-neutral-900 px-3 py-1 rounded border border-neutral-700">{utenteCorrente}</span>
        </div>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        
        {/* COLONNA SINISTRA: Telemetria & Coach IA */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-2">
              <h2 className="text-lg font-bold text-white">Telemetria</h2>
              <button onClick={() => setVistaTelemetria(vistaTelemetria === 'FORM' ? 'STORICO' : 'FORM')} className={`px-2 py-1.5 text-[9px] uppercase font-bold rounded-md transition-all ${vistaTelemetria === 'STORICO' ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}>
                {vistaTelemetria === 'STORICO' ? 'Torna al Form' : 'Vedi Storico'}
              </button>
            </div>

            {vistaTelemetria === 'FORM' ? (
               <div className="space-y-4">
                 <p className="text-[10px] text-orange-400 font-bold uppercase border-b border-neutral-800 pb-1">Misure Base</p>
                 <div className="grid grid-cols-2 gap-2">
                   {misureBase.map((m) => (
                       <div key={m.id} className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                         <label className="text-[9px] text-neutral-400 uppercase font-bold flex justify-between">{m.label} <span className="text-neutral-600">{m.unit}</span></label>
                         <input type="number" value={biometria[m.id as keyof typeof biometria] || ''} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-white outline-none focus:text-orange-500 mt-1" placeholder="-" />
                       </div>
                   ))}
                 </div>
                 
                 <p className="text-[10px] text-blue-400 font-bold uppercase border-b border-neutral-800 pb-1 mt-2">Dati Composizione BIA (Opzionali)</p>
                 <div className="grid grid-cols-2 gap-2">
                   {misureBIA.map((m) => (
                       <div key={m.id} className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                         <label className="text-[9px] text-neutral-400 uppercase font-bold flex justify-between">{m.label} <span className="text-neutral-600">{m.unit}</span></label>
                         <input type="number" value={biometria[m.id as keyof typeof biometria] || ''} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-blue-400 outline-none focus:text-white mt-1" placeholder="-" />
                       </div>
                   ))}
                 </div>

                 {/* RUOTA BIA COMPOSITION SUBITO SOTTO IL FORM */}
                 <div className="pt-2">
                    <SvgBodyCompositionWheel data={biometria} altezza={altezza} eta={eta} />
                 </div>

                 <button onClick={valutaCheckFisico} className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg uppercase tracking-widest text-[10px] shadow-lg">Salva e Aggiorna Algoritmo</button>
               </div>
            ) : (
               <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[600px]">
                 {storicoMisure.length === 0 ? <p className="text-[10px] text-neutral-500 italic text-center p-4">Nessun dato.</p> : (
                    storicoMisure.map((mis: any) => {
                       const circ = typeof mis.circonferenze === 'string' ? JSON.parse(mis.circonferenze) : (mis.circonferenze || {});
                       return (
                         <div key={mis.id} className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 flex flex-col gap-2">
                            <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                               <p className="text-[11px] font-bold text-orange-400">{new Date(mis.data).toLocaleDateString('it-IT')}</p>
                               <button onClick={() => eliminaMisurazione(mis.id)} className="text-red-500 hover:text-white text-[10px] uppercase">🗑️ Elimina</button>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-neutral-300 font-mono">
                               <p>Peso: <strong>{mis.peso || '-'}kg</strong></p><p>Petto: <strong>{circ.petto || '-'}cm</strong></p>
                               <p>Spalle: <strong>{circ.spalle || '-'}cm</strong></p><p>Braccia: <strong>{circ.braccia || '-'}cm</strong></p>
                               <p>Gambe: <strong>{circ.gambe || '-'}cm</strong></p><p>Glutei: <strong>{circ.glutei || '-'}cm</strong></p>
                               <p className="text-emerald-400">Vita: <strong>{circ.vita || '-'}cm</strong></p><p className="text-blue-400">BIA: <strong>{circ.bodyFat || '-'}%</strong></p>
                            </div>
                         </div>
                       );
                    })
                 )}
               </div>
            )}
          </section>

          <section className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl shadow-lg flex flex-col h-[400px]">
            <h2 className="text-base font-bold text-white border-b border-neutral-700 pb-2 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span> Coach IA
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-neutral-950 rounded-lg border border-neutral-800 mb-3">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className={`text-[9px] uppercase font-bold mb-1 ${msg.role === 'user' ? 'text-neutral-500 pr-1' : 'text-orange-500 pl-1'}`}>{msg.role === 'user' ? utenteCorrente : 'Coach'}</span>
                  <div className={`p-2.5 rounded-xl text-xs leading-relaxed max-w-[90%] ${msg.role === 'user' ? 'bg-neutral-800 text-white rounded-br-sm' : 'bg-orange-950/40 border border-orange-900/50 text-neutral-200 rounded-bl-sm'}`}>{msg.text}</div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-orange-500 font-mono pl-2 animate-pulse">Analisi in corso...</div>}
              <div ref={chatEndRef} />
            </div>
            {fileAllegato && (
              <div className="flex items-center gap-2 mb-2 p-2 bg-neutral-800 rounded-lg border border-neutral-700 w-fit">
                <span className="text-xs text-orange-400 font-mono truncate max-w-[150px]">📎 {fileAllegato.nome}</span>
                <button onClick={() => setFileAllegato(null)} className="text-red-500 font-bold ml-2">X</button>
              </div>
            )}
            <div className="flex gap-2">
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={gestisciCaricamentoFile} />
              <button onClick={() => fileInputRef.current?.click()} className="bg-neutral-800 px-3 py-2 rounded-lg text-lg">📎</button>
              <input type="text" value={inputChat} onChange={e => setInputChat(e.target.value)} onKeyDown={e => e.key === 'Enter' && inviaMessaggioIA()} placeholder="Chiedi o allega..." className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-orange-500" />
              <button onClick={inviaMessaggioIA} disabled={isTyping || (!inputChat.trim() && !fileAllegato)} className="bg-orange-600 text-white font-bold px-3 py-2 rounded-lg text-xs disabled:opacity-50">Invia</button>
            </div>
          </section>
        </div>

        {/* COLONNA CENTRALE: Turni & Nutrizione */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-2">
              <h2 className="text-lg font-bold text-white">Incastro Turni</h2>
              <select value={tipoTurno} onChange={(e) => setTipoTurno(e.target.value)} className="bg-neutral-950 text-xs text-orange-500 p-2 rounded border border-neutral-700 outline-none">
                <option value="diretto">Turno Diretto</option><option value="spezzato">Turno Spezzato</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                <span className="text-xs text-blue-400 uppercase font-bold mb-2 block">{tipoTurno === 'diretto' ? 'Orario Continuato' : 'Mattina (Lavoro)'}</span>
                <div className="flex space-x-2">
                  <input type="time" value={inizio1} onChange={e => setInizio1(e.target.value)} className="w-1/2 bg-transparent text-sm text-white p-1 border-b border-neutral-700 outline-none" />
                  <input type="time" value={fine1} onChange={e => setFine1(e.target.value)} className="w-1/2 bg-transparent text-sm text-white p-1 border-b border-neutral-700 outline-none" />
                </div>
              </div>
              {tipoTurno === 'spezzato' && (
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                  <span className="text-xs text-blue-400 uppercase font-bold mb-2 block">Pomeriggio (Lavoro)</span>
                  <div className="flex space-x-2">
                    <input type="time" value={inizio2} onChange={e => setInizio2(e.target.value)} className="w-1/2 bg-transparent text-sm text-white p-1 border-b border-neutral-700 outline-none" />
                    <input type="time" value={fine2} onChange={e => setFine2(e.target.value)} className="w-1/2 bg-transparent text-sm text-white p-1 border-b border-neutral-700 outline-none" />
                  </div>
                </div>
              )}
              <div className="mt-4 border-t border-neutral-700 pt-4">
                <span className="text-xs text-neutral-400 uppercase font-bold mb-2 block">Collocazione Allenamento:</span>
                <div className="flex space-x-2">
                  <button onClick={() => setQuandoTiAlleni('mattina')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${quandoTiAlleni === 'mattina' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>Mattina</button>
                  {tipoTurno === 'spezzato' && <button onClick={() => setQuandoTiAlleni('pausa')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${quandoTiAlleni === 'pausa' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>Pausa</button>}
                  <button onClick={() => setQuandoTiAlleni('sera')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${quandoTiAlleni === 'sera' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>Sera</button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
            <div className="flex flex-col border-b border-neutral-700 pb-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-white">Timeline Nutrizionale</h2>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${protocolloAttivo === 'Shred' ? 'bg-blue-600' : 'bg-orange-600'} text-white`}>{moltiplicatoreCarbo}g CHO/Kg</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[9px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-1 rounded">BMR: {bmr} Kcal</span>
                <span className="text-[9px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-1 rounded">TDEE: {tdee} Kcal</span>
                <span className="text-[9px] bg-orange-950 border border-orange-900 text-orange-400 font-bold px-2 py-1 rounded flex-1 text-center">INTAKE: {actualIntakeKcal} Kcal</span>
              </div>
            </div>
            
            <p className="text-[10px] text-neutral-400 mb-4 font-mono italic">{messaggioDieta}</p>

            <div className="space-y-3">
              {generaTimelineDieta().map((blocco, idx) => {
                if (blocco.isIntra) {
                  return (
                    <div key={`intra-${idx}`} className="p-4 rounded-lg border bg-orange-950/20 border-orange-900/50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs uppercase font-black text-orange-500 block tracking-widest">{blocco.titolo}</span>
                        <span className="text-[10px] font-bold text-orange-400 bg-orange-900/30 px-1.5 py-0.5 rounded">{Math.round((intraCho*4)+(intraPro*4))} KCAL</span>
                      </div>
                      <p className="font-medium text-xs text-neutral-200 whitespace-pre-wrap">{blocco.descrizione}</p>
                    </div>
                  );
                }
                const cat = blocco.idCategoria as keyof typeof dbAlimenti;
                const isPW = cat === 'PostWorkout';
                const itemScelto = dbAlimenti[cat]?.[pastiSelezionati[cat]] || {nome:"", baseCarbo:0, pro:0, fat:0, dettaglioGrammi:()=>""};
                const finalCho = finalMeals[cat].cho, finalPro = finalMeals[cat].pro, finalFat = finalMeals[cat].fat;
                const pastoKcal = Math.round((finalCho * 4) + (finalPro * 4) + (finalFat * 9));
                const isCustom = pastiCustom[cat].attivo;

                return (
                  <div key={`${cat}-${idx}`} className={`p-3 rounded-lg border ${isPW ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-neutral-950 border-neutral-800'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isPW ? 'text-emerald-500' : 'text-blue-400'}`}>{blocco.titoloUI}</span>
                      <div className="flex gap-2">
                        {!isCustom ? (
                          <>
                            <button onClick={() => toggleCustomMeal(cat)} className="text-[9px] bg-neutral-800 hover:bg-neutral-700 text-neutral-400 px-2 py-1 rounded font-bold uppercase transition-all">Custom</button>
                            <button onClick={() => apriSwapAlimento(cat)} className="text-[9px] bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded font-bold uppercase text-neutral-300 transition-all">Swap</button>
                          </>
                        ) : (
                           <button onClick={() => resetCustomMeal(cat)} className="text-[9px] bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded font-bold uppercase transition-all">🗑️ Rimuovi</button>
                        )}
                      </div>
                    </div>
                    
                    {isCustom ? (
                       <div className="mt-2 bg-neutral-900 p-2 rounded border border-orange-500/50">
                         <div className="flex gap-2 mb-2">
                            <input type="text" placeholder="Es. 35g Plumcake" value={pastiCustom[cat].nome} onChange={e => updateCustomMeal(cat, 'nome', e.target.value)} className="w-full bg-neutral-950 border border-neutral-700 p-1.5 text-xs text-white rounded outline-none" />
                            <button onClick={() => calcolaMacroDaNome(cat, pastiCustom[cat].nome)} disabled={isCalculatingMacro[cat]} className="bg-orange-600 hover:bg-orange-500 text-white px-3 rounded text-xs font-bold disabled:opacity-50">🪄</button>
                         </div>
                         <div className="flex gap-2">
                            <div className="flex-1"><span className="text-[8px] text-neutral-500 uppercase block">Carbo</span><input type="number" value={pastiCustom[cat].cho} onChange={e => updateCustomMeal(cat, 'cho', e.target.value)} className="w-full bg-neutral-950 p-1 text-xs text-white rounded outline-none" /></div>
                            <div className="flex-1"><span className="text-[8px] text-neutral-500 uppercase block">Pro</span><input type="number" value={pastiCustom[cat].pro} onChange={e => updateCustomMeal(cat, 'pro', e.target.value)} className="w-full bg-neutral-950 p-1 text-xs text-white rounded outline-none" /></div>
                            <div className="flex-1"><span className="text-[8px] text-neutral-500 uppercase block">Fat</span><input type="number" value={pastiCustom[cat].fat} onChange={e => updateCustomMeal(cat, 'fat', e.target.value)} className="w-full bg-neutral-950 p-1 text-xs text-white rounded outline-none" /></div>
                         </div>
                       </div>
                    ) : (
                       <>
                         <p className="font-semibold text-[13px] text-white leading-tight mt-2">{itemScelto.nome}</p>
                         <div className="mt-2 bg-neutral-900 p-2 rounded border border-neutral-800">
                           {finalCho === 0 && finalPro === 0 ? <p className="text-[11px] text-red-500 font-mono font-bold">Pasto azzerato (sgarro).</p> : <p className="text-[11px] text-neutral-300 font-mono">{itemScelto.dettaglioGrammi(finalCho, finalPro, finalFat)}</p>}
                         </div>
                       </>
                    )}
                    <div className="mt-2 flex justify-between items-center px-1">
                       <span className="text-[10px] text-neutral-400 font-mono">CHO: <strong className="text-orange-400">{finalCho}g</strong></span>
                       <span className="text-[10px] text-neutral-400 font-mono">PRO: <strong>{finalPro}g</strong></span>
                       <span className="text-[10px] text-neutral-400 font-mono">FAT: <strong>{finalFat}g</strong></span>
                       <span className={`text-[10px] font-black ${isPW ? 'text-emerald-500' : 'text-white'}`}>{pastoKcal} KCAL</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* COLONNA DESTRA: Allenamento Dinamico */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg flex flex-col h-[85vh]">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-3">
              <h2 className="text-lg font-bold text-white">Allenamento {utenteCorrente === "Leonardo" ? 'Master' : 'Dinamico'}</h2>
              <div className="flex gap-1">
                <button onClick={() => {setVistaStorico(!vistaStorico); setVistaGraficiCarichi(false);}} className={`px-2 py-1.5 text-[9px] uppercase font-bold rounded-md transition-all ${vistaStorico && !vistaGraficiCarichi ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}>
                  {vistaStorico && !vistaGraficiCarichi ? 'Torna' : 'Storico'}
                </button>
                <button onClick={() => {setVistaGraficiCarichi(!vistaGraficiCarichi); setVistaStorico(true);}} className={`px-2 py-1.5 text-[9px] uppercase font-bold rounded-md transition-all ${vistaGraficiCarichi ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}>
                  📈 Grafici
                </button>
              </div>
            </div>

            {!vistaStorico ? (
              <>
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Tempo Stimato</span>
                    <p className="text-sm font-bold text-white flex items-center gap-2">⏱️ ~{calcolaTempoScheda()} min <span className="text-[9px] text-neutral-400 font-normal">(Recuperi inclusi)</span></p>
                  </div>
                  <button onClick={() => setFastWorkout(!fastWorkout)} className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-lg ${fastWorkout ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                    {fastWorkout ? '⚡ Fast Mode' : 'Taglia Tempi'}
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-[10px] uppercase font-bold text-neutral-500 mb-2">Giorno:</p>
                  <div className="flex flex-wrap gap-2">
                    {giorniSettimana.map((gg: string) => (
                      <button key={gg} onClick={() => setGiornoCalendario(gg)} className={`px-3 py-2 text-xs font-bold rounded-md flex-1 min-w-[60px] ${giornoCalendario === gg ? 'bg-neutral-700 text-white border-b-2 border-white' : 'bg-neutral-950 text-neutral-500'}`}>{gg}</button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex gap-2">
                  {['Spinta', 'Tirata', 'Gambe'].map((sch: string) => (
                    <button key={sch} onClick={() => setSchedaAttiva(sch as any)} className={`px-3 py-2 text-xs font-bold rounded-md flex-1 ${schedaAttiva === sch ? 'bg-orange-600 text-white shadow-lg' : 'bg-neutral-950 text-neutral-500'}`}>{sch.toUpperCase()}</button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {dbDinamico[schedaAttiva].esercizi.map((es: any) => {
                    const nomeAttuale = eserciziModificati[es.id] || es.nome;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const altEs = es.alternative.find((a: any) => a.nome === nomeAttuale);
                    const currentEx = altEs || es;
                    
                    const ultimoCarico = getUltimoCarico(es.id);
                    const numeroSetTarget = getNumeroSet(es.fase);
                    const phaseColor = es.fase.includes('Fase 1') ? '#f97316' : (es.fase.includes('Fase 2') ? '#3b82f6' : '#ef4444');
                    
                    const animType = currentEx.anim || "chest_barbell_flat"; 
                    
                    let repMostrate = es.rep;
                    if (fastWorkout) repMostrate = repMostrate.replace("4-5 serie", "3 serie").replace("3-4 serie", "2 serie").replace("Rec: 2 min", "Rec: 1.5 min").replace("Rec: 45 sec", "Rec: 1 min");

                    return (
                      <div key={`${es.id}-${nomeAttuale}`} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1 h-full`} style={{backgroundColor: phaseColor}}></div>
                        <div className="pl-2">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] uppercase font-black" style={{color: phaseColor}}>{es.fase}</span>
                            <button onClick={() => apriSwapEsercizio(es)} className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded font-bold uppercase hover:text-white transition-colors">Swap</button>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <MediaVisualizer animKey={animType} color={phaseColor} />
                            <div className="flex-1">
                               <h3 className="font-bold text-sm text-white">{nomeAttuale}</h3>
                               <p className="text-[10px] text-neutral-400 italic mt-1 leading-relaxed bg-neutral-900 p-2 rounded border border-neutral-800">{currentEx.dettaglio}</p>
                            </div>
                          </div>
                          <p className="text-[10px] font-bold px-2 py-1 mt-3 rounded border w-fit bg-neutral-900 text-neutral-300 border-neutral-700">{repMostrate}</p>
                          <div className="mt-4 pt-3 border-t border-neutral-800">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[9px] uppercase font-bold text-neutral-500">Target Ultima: <span className="text-orange-400">{ultimoCarico ? `${ultimoCarico} kg` : '-'}</span></span>
                            </div>
                            <div className="flex gap-2">
                              {Array.from({ length: numeroSetTarget }).map((_, i) => (
                                <div key={i} className="flex-1">
                                  <label className="text-[8px] text-neutral-500 uppercase block text-center mb-1">Set {i+1}</label>
                                  <input type="number" value={carichiAttuali[es.id]?.[i] || ''} onChange={(e) => updateCaricoSet(es.id, i, e.target.value)} className="w-full bg-neutral-900 border border-orange-500/30 p-2 rounded text-xs text-center text-white font-bold outline-none focus:border-orange-500" placeholder="-" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={salvaSessione} className="w-full mt-4 py-3 bg-orange-600 text-white font-bold uppercase tracking-widest text-sm rounded-lg shadow-lg shrink-0 hover:bg-orange-500 transition-all">Salva Database</button>
              </>
            ) : vistaGraficiCarichi ? (
              <div className="flex-1 overflow-y-auto space-y-4">
                 <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                   <label className="text-[10px] text-neutral-400 font-bold uppercase block mb-2">Seleziona Esercizio:</label>
                   <select value={esercizioGraficoSelezionato} onChange={(e) => setEsercizioGraficoSelezionato(e.target.value)} className="w-full bg-neutral-900 text-white text-xs p-2 rounded border border-neutral-700 outline-none mb-4">
                     {Object.values(baseDbAllenamento).flatMap(g => g.esercizi).map(es => (<option key={es.id} value={es.id}>{eserciziModificati[es.id] || es.nome}</option>))}
                   </select>
                   <SvgLineChart data={getDataGraficoEsercizio()} label={Object.values(baseDbAllenamento).flatMap(g => g.esercizi).find(e => e.id === esercizioGraficoSelezionato)?.nome || "Esercizio"} />
                 </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
                {storicoSessioni.length === 0 ? <div className="text-center p-10 text-neutral-500 border border-dashed border-neutral-800 rounded-xl">Nessuna sessione salvata.</div> : (
                  [...storicoSessioni].reverse().map((sess) => (
                    <div key={sess.oraId} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                      <span className="font-bold text-orange-500 block">{sess.giorno} - Scheda {sess.scheda}</span>
                      <span className="text-[10px] text-neutral-400 font-mono mb-2 block">{sess.data}</span>
                      <div className="space-y-2 text-xs">
                        {Object.entries(sess.carichi).map(([idEs, pesoStr]) => (
                          <div key={idEs} className="bg-neutral-900 p-2 rounded flex justify-between items-center gap-2">
                            <span className="text-neutral-400 truncate flex-1">{eserciziModificati[idEs] || Object.values(baseDbAllenamento).flatMap(d=>d.esercizi).find(e=>e.id===idEs)?.nome}</span>
                            <span className="font-bold text-white bg-neutral-950 px-2 py-1 rounded">{pesoStr as string} kg</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </div>

      </div>

      {/* --- MODALI SWAP --- */}
      {modalEsercizio && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
              <h3 className="font-bold text-lg text-white">Sostituisci Esercizio</h3>
              <button onClick={() => setModalEsercizio(false)} className="text-neutral-500 hover:text-white text-xl">&times;</button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {esercizioDaCambiare.alternative.map((alt: any, i: number) => (
                <button key={i} onClick={() => confermaSwapEsercizio(alt.nome)} className="w-full text-left p-4 bg-neutral-950 border border-neutral-800 rounded-lg hover:border-orange-500/50 group transition-all">
                  <p className="font-bold text-sm text-white group-hover:text-orange-400">{alt.nome}</p>
                  <p className="text-[10px] text-neutral-500 mt-1 uppercase font-bold mb-2">{alt.note}</p>
                  <p className="text-[10px] text-neutral-400 leading-snug">{alt.dettaglio}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modalAlimento && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
              <h3 className="font-bold text-lg text-white">Sostituisci Pasto</h3>
              <button onClick={() => setModalAlimento(false)} className="text-neutral-500 hover:text-white text-xl">&times;</button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {/* @ts-ignore */}
              {dbAlimenti[categoriaDaCambiare].map((alt, i) => {
                 const macroCho = alt.baseCarbo * moltiplicatoreCarbo;
                 const swapKcal = Math.round((macroCho * 4) + (alt.pro * 4) + (alt.fat * 9));
                 return (
                  <button key={i} onClick={() => confermaSwapAlimento(i)} className="w-full text-left p-4 bg-neutral-950 border border-neutral-800 rounded-lg hover:border-emerald-500/50 group transition-all">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-sm text-white group-hover:text-emerald-400">{alt.nome}</p>
                      <span className="text-[10px] bg-neutral-800 text-white px-1.5 py-0.5 rounded font-bold ml-2">{swapKcal} Kcal</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 font-mono">CHO: {macroCho}g | PRO: {alt.pro}g | FAT: {alt.fat}g</p>
                    <p className="text-[10px] text-neutral-400 mt-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded">{alt.dettaglioGrammi(macroCho, alt.pro, alt.fat)}</p>
                  </button>
                 );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
