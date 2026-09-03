"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";
import { MediaVisualizer } from './animations';

// Configurazione Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqawxoocwtxfkahzyduq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chiave-temporanea-per-il-build";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// STILI GLOBALI (NEUMORPHISM + GLASSMORPHISM)
// ==========================================
const UI = {
  card: "bg-[#0b1319]/80 backdrop-blur-2xl shadow-[8px_8px_24px_rgba(0,0,0,0.6),-2px_-2px_10px_rgba(255,255,255,0.03)] border border-white/5 rounded-[2rem]",
  glassPanel: "bg-white/[0.02] backdrop-blur-xl border border-white/5 shadow-[4px_4px_16px_rgba(0,0,0,0.4)] rounded-3xl p-4",
  input: "w-full bg-[#050a0f] shadow-[inset_3px_3px_8px_rgba(0,0,0,0.6),inset_-1px_-1px_4px_rgba(255,255,255,0.02)] border border-white/5 p-3.5 rounded-2xl text-sm text-white outline-none focus:ring-2 focus:ring-teal-500/40 transition-all font-medium",
  btnPrimary: "bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all border-none text-white font-bold uppercase tracking-widest rounded-2xl p-4 w-full flex items-center justify-center",
  btnSecondary: "bg-white/[0.03] shadow-[4px_4px_12px_rgba(0,0,0,0.3),-2px_-2px_8px_rgba(255,255,255,0.02)] border border-white/5 hover:bg-white/10 text-white p-3 rounded-2xl font-semibold uppercase tracking-wider transition-all text-xs",
  label: "text-[10px] text-teal-200/70 uppercase font-bold tracking-widest block mb-2",
  textHighlight: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]"
};

// ==========================================
// 1. DATABASE ALLENAMENTO MASTER
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
          { nome: "Curl Cavo Basso", anim: "bicep_cable_bar", note: "Tensione continua", dettaglio: "CAVI: Cavo basso con sbarra corta. Tensione bruciante continua." }
        ] 
      },
      { id: "e26", nome: "Curl cavi corda", anim: "bicep_cable", fase: "Fase 3: Pump Bicipiti", rep: "3-4 serie, 12-15 rep | Rec: 45 sec", dettaglio: "CAVI: Fune al cavo basso. Presa a martello per colpire anche il brachiale.", 
        alternative: [
          { nome: "Curl Inclinata", anim: "bicep_incline_db", note: "Stretch capo lungo", dettaglio: "MANUBRI: Seduto su panca a 45°, lascia cadere le braccia indietro e fletti." }, 
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
          { nome: "Hack Squat Libero", anim: "leg_hack_barbell", note: "Carico posteriore", dettaglio: "BILANCIERE: Bilanciere dietro le gambe (stile stacco). Spingi forte sui quadricipiti." },
          { nome: "Hack Squat Macchina", anim: "leg_hack_machine", note: "Zero carico lombare", dettaglio: "MACCHINARIO: Focus spinta senza pesare sulla colonna." }
        ] 
      },
      { id: "e12", nome: "Hack squat", anim: "leg_hack_machine", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "MACCHINARIO: Poggia schiena. Scendi e spingi su isolando le gambe senza la bassa schiena.", 
        alternative: [
          { nome: "Leg Press 45°", anim: "leg_press", note: "Isolamento pressa", dettaglio: "MACCHINARIO: Piedi bassi e stretti sulla pedana per concentrare il lavoro sui quadricipiti." }, 
          { nome: "Belt Squat", anim: "leg_belt_squat", note: "Zero stress lombare", dettaglio: "MACCHINARIO: Cintura pesata ai fianchi per caricare salvando la spina dorsale." }
        ] 
      },
      { id: "e14", nome: "Pressa 45°", anim: "leg_press", fase: "Fase 2: Connessione", rep: "4-5 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "MACCHINARIO: Scendi portando le ginocchia verso il petto e spingi senza bloccare l'articolazione.", 
        alternative: [
          { nome: "Affondi Manubri", anim: "leg_lunge", note: "Equilibrio", dettaglio: "MANUBRI: In camminata o sul posto, affonda controllando la discesa." }, 
          { nome: "Bulgarian Squat", anim: "leg_bulgarian", note: "Unilaterale", dettaglio: "MANUBRI: Piede posteriore su panca, scendi in affondo per un lavoro mirato." }
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
          { nome: "Leg Curl Seduto", anim: "leg_curl_seduto", note: "Isolamento femorale", dettaglio: "MACCHINARIO: Isola magnificamente il bicipite femorale garantendo stabilità lombare." }, 
          { nome: "Glute Ham Raise", anim: "leg_curl", note: "Catena chiusa", dettaglio: "MACCHINARIO: Solleva il busto usando solo la contrazione dei femorali." }
        ] 
      },
      { id: "e17", nome: "Calf in piedi", anim: "leg_calf", fase: "Fase 3: Pump", rep: "3-4 serie, 20 rep | Rec: 45 sec", dettaglio: "LIBERO/MACCHINA: Scendi al massimo stirando il tendine, e sali in punta di piedi fermandoti 1 secondo.", 
        alternative: [
          { nome: "Calf Press", anim: "leg_calf_press", note: "Sovraccarico", dettaglio: "MACCHINARIO: Usa la Leg Press spingendo solo con le caviglie." }, 
          { nome: "Calf Seduto", anim: "leg_calf_seated", note: "Focus Soleo", dettaglio: "MACCHINARIO: Seduto, solleva i talloni per colpire il soleo in profondità." }
        ] 
      }
    ]
  }
};

const dbAlimenti = {
  Pasto1: [
    { nome: "Avena + Whey + Burro di Arachidi", baseCarbo: 12, pro: 35, fat: 15, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.5)}g Avena • ${Math.round(p*1.2)}g Whey • ${f}g Burro Arachidi` },
    { nome: "Pancakes avena + Albume + Mirtilli", baseCarbo: 14, pro: 30, fat: 10, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.5)}g Farina Avena • ${Math.round(p*10)}g Albume • ${f}g Burro Arachidi (sopra)` },
    { nome: "Uova intere + Pane segale + Avocado", baseCarbo: 10, pro: 25, fat: 22, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*2)}g Pane Segale • ${Math.round(p/6)} Uova Intere • ${Math.round(f*6)}g Avocado` }
  ],
  Pasto2: [
    { nome: "Riso Basmati + Pollo + Olio EVO", baseCarbo: 20, pro: 40, fat: 12, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.25)}g Riso Basmati • ${Math.round(p*4)}g Petto Pollo • ${f}g Olio EVO` },
    { nome: "Pasta di Semola + Carne Magra (Manzo)", baseCarbo: 20, pro: 45, fat: 10, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.3)}g Pasta • ${Math.round(p*4.5)}g Macinato Magro • ${f}g Olio EVO` },
    { nome: "Patate dolci + Salmone selvaggio", baseCarbo: 16, pro: 40, fat: 20, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*4.5)}g Patate Dolci • ${Math.round(p*4.5)}g Salmone • Grassi dal pesce` }
  ],
  Pasto3: [
    { nome: "Yogurt Greco + Mandorle", baseCarbo: 5, pro: 20, fat: 15, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*10)}g Yogurt Greco 0% • ${Math.round(f*2)}g Mandorle` },
    { nome: "Fiocchi di latte + Burro di arachidi", baseCarbo: 4, pro: 25, fat: 18, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*8)}g Fiocchi Latte Magri • ${f}g Burro Arachidi` },
    { nome: "Parmigiano (50g) + Fette Wasa", baseCarbo: 8, pro: 16, fat: 14, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*3)}g Parmigiano 30 Mesi • ${Math.round(c*1.5)}g Fette Wasa` }
  ],
  PostWorkout: [
    { nome: "Crema di Riso + Whey Isolate", baseCarbo: 16, pro: 35, fat: 1, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.2)}g Crema Riso • ${Math.round(p*1.1)}g Isolate` },
    { nome: "Corn Flakes + Whey Isolate", baseCarbo: 16, pro: 35, fat: 1, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.15)}g Corn Flakes • ${Math.round(p*1.1)}g Isolate` },
    { nome: "Gallette di riso + Bresaola", baseCarbo: 15, pro: 30, fat: 3, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c/8)} Gallette Riso • ${Math.round(p*3)}g Bresaola` }
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

// ==========================================
// NUOVI COMPONENTI UI (Glassmorphism & Micro-interazioni)
// ==========================================
const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) { setCount(end); return; }
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / 800, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [value]);
  return <span>{count}{suffix}</span>;
};

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-white/5 rounded-2xl shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] ${className}`}></div>
);

const HumanHeatmap = ({ scheda }: { scheda: string }) => {
  const getActive = (part: string) => {
    if (scheda === 'Spinta' && ['chest', 'shoulders', 'triceps'].includes(part)) return '#34d399'; 
    if (scheda === 'Tirata' && ['back', 'biceps'].includes(part)) return '#34d399';
    if (scheda === 'Gambe' && ['legs', 'calves', 'glutes'].includes(part)) return '#34d399';
    return '#1e293b'; 
  };
  return (
    <div className={`${UI.glassPanel} w-full flex justify-center py-6 mb-4 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
      <svg width="140" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_12px_rgba(52,211,153,0.3)] z-10">
         <circle cx="50" cy="20" r="12" fill="#0f172a" stroke={getActive('head')} strokeWidth="2" className="transition-all duration-700" />
         <path d="M30 40 Q50 35 70 40 L75 60 L25 60 Z" fill={getActive('chest')} className="transition-colors duration-700" />
         <circle cx="25" cy="45" r="8" fill={getActive('shoulders')} className="transition-colors duration-700" />
         <circle cx="75" cy="45" r="8" fill={getActive('shoulders')} className="transition-colors duration-700" />
         <rect x="15" y="50" width="10" height="30" rx="5" fill={getActive('triceps')} className="transition-colors duration-700" />
         <rect x="75" y="50" width="10" height="30" rx="5" fill={getActive('triceps')} className="transition-colors duration-700" />
         <rect x="13" y="82" width="10" height="25" rx="5" fill={getActive('biceps')} className="transition-colors duration-700" />
         <rect x="77" y="82" width="10" height="25" rx="5" fill={getActive('biceps')} className="transition-colors duration-700" />
         <path d="M32 62 L68 62 L62 110 L38 110 Z" fill={scheda === 'Tirata' ? getActive('back') : '#0f172a'} className="transition-colors duration-700" />
         <rect x="35" y="115" width="12" height="40" rx="6" fill={getActive('legs')} className="transition-colors duration-700" />
         <rect x="53" y="115" width="12" height="40" rx="6" fill={getActive('legs')} className="transition-colors duration-700" />
         <rect x="35" y="158" width="10" height="35" rx="5" fill={getActive('calves')} className="transition-colors duration-700" />
         <rect x="55" y="158" width="10" height="35" rx="5" fill={getActive('calves')} className="transition-colors duration-700" />
      </svg>
    </div>
  );
};

const SvgLineChart = ({ data, label }: { data: number[], label: string }) => {
  if (!data || data.length === 0) return <p className="text-[10px] text-neutral-500 italic">Dati insufficienti.</p>;
  if (data.length === 1) return <p className="text-[10px] text-neutral-500 italic">Un solo dato. Esegui un&apos;altra sessione.</p>;
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal === 0 ? 10 : maxVal - minVal;
  const width = 300, height = 100, padding = 20;
  const points = data.map((val, i) => `${padding + (i / (data.length - 1)) * (width - padding * 2)},${height - padding - ((val - minVal) / range) * (height - padding * 2)}`).join(" ");

  return (
    <div className={UI.glassPanel + " mt-2"}>
       <span className={UI.label}>{label} - Trend</span>
       <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
          <polyline points={points} fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
    { label: 'BMI', val: bmi, color: '#ec4899', angle: 0 },           
    { label: 'BMR Kcal', val: bmr > 0 ? bmr : '-', color: '#10b981', angle: 60 },  
    { label: 'MASSA MUSC. %', val: mm > 0 ? `${mm}%` : '-', color: '#ef4444', angle: 120 },  
    { label: 'ACQUA CORP. %', val: bw > 0 ? `${bw}%` : '-', color: '#3b82f6', angle: 180 }, 
    { label: 'MASSA GRASSA %', val: bf > 0 ? `${bf}%` : '-', color: '#14b8a6', angle: 240 }, 
    { label: 'PESO kg', val: w > 0 ? w : '-', color: '#94a3b8', angle: 300 }        
  ];

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px] bg-black/20 shadow-[inset_4px_4px_16px_rgba(0,0,0,0.6)] rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden mt-4">
       <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
       <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl z-10 p-2">
          <g transform="translate(250, 250) rotate(-120)">
             {sections.map((sec, i) => (
                <circle key={i} cx="0" cy="0" r={radius} fill="none" stroke={sec.color} strokeWidth={strokeW} strokeDasharray={`${seg - 2} ${c}`} strokeDashoffset={-(i * seg)} className="opacity-80 hover:opacity-100 transition-opacity" />
             ))}
          </g>
          {sections.map((sec, i) => {
             const pos = getLabelPos(sec.angle);
             return (
               <g key={`t-${i}`} className="pointer-events-none">
                 <text x={pos.x} y={pos.y - 6} fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold" className="tracking-widest">{sec.label}</text>
                 <text x={pos.x} y={pos.y + 14} fill="#fff" fontSize="18" textAnchor="middle" fontWeight="300" className="drop-shadow-md">{sec.val}</text>
               </g>
             )
          })}
          <g transform="translate(250, 250) scale(1.1) translate(-250, -250)">
             <path d="M250,130 C240,130 238,140 238,145 C238,152 242,155 247,158 C235,163 225,175 222,190 C217,205 212,240 212,240 L220,245 C220,245 230,205 235,195 C235,230 233,260 233,260 L238,350 L245,350 L245,260 L255,260 L255,350 L262,350 L267,260 C267,260 265,230 265,195 C270,205 280,245 280,245 L288,240 C288,240 283,195 278,190 C275,175 265,163 253,158 C258,155 262,152 262,145 C262,140 260,130 250,130 Z" fill="url(#gradThermal)" stroke="#000" strokeWidth="2"/>
          </g>
          <defs>
             <linearGradient id="gradThermal" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#10b981" />
               <stop offset="30%" stopColor="#0d9488" />
               <stop offset="60%" stopColor="#3b82f6" />
               <stop offset="100%" stopColor="#ec4899" />
             </linearGradient>
          </defs>
       </svg>
    </div>
  );
};

export default function Home() {
  const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  const [appState, setAppState] = useState<'HOME' | 'PROTOCOL'>('HOME');
  
  const [listaAtleti, setListaAtleti] = useState<string[]>(["Leonardo"]);
  const [utenteCorrente, setUtenteCorrente] = useState("Leonardo");
  const [protocolloAttivo, setProtocolloAttivo] = useState("Massa");
  
  const [tipoDieta, setTipoDieta] = useState("Equilibrata");
  const [protocolloAutore, setProtocolloAutore] = useState("Nessuno");
  const [metabolismoBloccato, setMetabolismoBloccato] = useState(false);
  
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
  const [digiuno, setDigiuno] = useState(false); 
  
  const [modalWizard, setModalWizard] = useState(false);
  const [stepWizard, setStepWizard] = useState(1);
  const [datiWizard, setDatiWizard] = useState({ nome: '', eta: '', altezza: '', peso: '', stileVita: 'Sedentario', obiettivo: 'Shred', dieta: 'Equilibrata', autore: 'Nessuno', metabolismoBloccato: false });
  const [fotoPartenza, setFotoPartenza] = useState<{data: string, mimeType: string, nome: string} | null>(null);
  const [fotoArrivo, setFotoArrivo] = useState<{data: string, mimeType: string, nome: string} | null>(null);
  const [rispostaWizard, setRispostaWizard] = useState("");
  const [loadingWizard, setLoadingWizard] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  
  const [giornoCalendario, setGiornoCalendario] = useState("Lunedì"); 
  const [gerardoCarbOverride, setGerardoCarbOverride] = useState<number | null>(null); 
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
  
  const [messaggioDieta, setMessaggioDieta] = useState("In attesa di analisi biometrica...");
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
    setGerardoCarbOverride(null);
  }, [giornoCalendario]);

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

  const caricaProfilo = async (nomeAtleta: string, objScelto: string, dietaScelta: string) => {
    setUtenteCorrente(nomeAtleta);
    setProtocolloAttivo(objScelto);
    setTipoDieta(dietaScelta);
    
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
        if(circ.profilo?.dieta) setTipoDieta(circ.profilo.dieta);
        if(circ.profilo?.autore) setProtocolloAutore(circ.profilo.autore);
        if(circ.profilo?.metabolismoBloccato) setMetabolismoBloccato(circ.profilo.metabolismoBloccato);
      }
      setStoricoMisure(data.filter(d => d.peso || (d.circonferenze && typeof d.circonferenze === 'object' && Object.keys(d.circonferenze).length > 0)));
    } else if (nomeAtleta !== "Leonardo") {
       setBiometria({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '', vita: '', bodyFat: '', bodyWater: '', muscleMass: '' });
       setStoricoMisure([]);
    }

    const resSess = await supabase.from("storico_allenamenti").select("*").eq("nome_utente", nomeAtleta).order("data", { ascending: true });
    if (resSess.data) {
      setStoricoSessioni(resSess.data.map(d => ({
        data: new Date(d.data).toLocaleDateString('it-IT'), giorno: d.giornata.split(" - ")[0], scheda: d.giornata.split(" - ")[1],
        carichi: typeof d.dettagli_esercizi === 'string' ? JSON.parse(d.dettagli_esercizi) : d.dettagli_esercizi, oraId: new Date(d.data).getTime()
      })));
    } else { setStoricoSessioni([]); }
    
    setIsDataLoading(true);
    setAppState('PROTOCOL');
    setTimeout(() => setIsDataLoading(false), 800);
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

     const isOver40 = Number(eta) > 40;
     const isShred = protocolloAttivo === 'Shred';
     const isHeavyJob = stileVita.includes("Attivo") || stileVita.includes("Fisico");
     
     const fatNum = Number(biometria.bodyFat) || 0;
     const pesoNum = Number(biometria.peso) || 0;
     const highFat = fatNum > 15;
     
     const activeDieta = (protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')) ? 'Equilibrata' : tipoDieta;
     const isKetoOrLowCarb = activeDieta === 'Keto' || activeDieta === 'LowCarb';
     const isOverweightMechanically = fatNum > 20 || pesoNum > 95;
     const needsLumbarProtection = isOver40 && stileVita.includes("Fisico");

     const swapToAlternative = (ex: any, partialName: string) => {
        const alt = ex.alternative.find((a: any) => a.nome.toLowerCase().includes(partialName.toLowerCase()));
        if (alt) {
            ex.nome = alt.nome;
            ex.anim = alt.anim;
            ex.dettaglio = alt.dettaglio;
        }
     };

     Object.keys(plan).forEach(sch => {
        let methodCycleGerardo = 0; 
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plan[sch].esercizi.forEach((ex: any) => {
           
           if (protocolloAutore === 'Gerardo Calvo (Reset Ormonale)') {
               if (methodCycleGerardo === 0) ex.rep = "7x10 | Rec: 30 sec (15RM - Stress Met.)";
               else if (methodCycleGerardo === 1) ex.rep = "5x5 | Rec: 90 sec (Buffer 2 - Neurale)";
               else ex.rep = "3x10 (5 Norm + 5 Ecc. lente) | Rec: 60 sec";
               methodCycleGerardo = (methodCycleGerardo + 1) % 3;
           } 
           else if (protocolloAutore === 'Aldo Masolo (Reset Metabolico)') {
               ex.rep = "3 serie, 8-10 rep | Rec: 90 sec (Buffer 1-2, NO Cedimento)";
               if (!eserciziModificati[ex.id]) {
                   if (ex.id === "e11") swapToAlternative(ex, "Hack Squat Macchina");
                   if (ex.id === "e1") swapToAlternative(ex, "Chest Press Convergente");
               }
           }
           else {
               if (isShred || highFat) {
                  ex.rep = ex.rep.replace("4-6 rep", "8-10 rep").replace("6-8 rep", "10-12 rep"); 
                  ex.rep = ex.rep.replace("4-5 serie", "2-3 serie").replace("3-4 serie", "2 serie");
                  ex.rep = ex.rep.replace("Rec: 1.5 min", "Rec: 2 min").replace("Rec: 45 sec", "Rec: 1 min");
               } else if (isOver40 && isHeavyJob) {
                  ex.rep = ex.rep.replace("4-5 serie", "3-4 serie"); 
               }
    
               if (!eserciziModificati[ex.id]) { 
                   if (isOverweightMechanically) {
                       if (ex.id === "e6") swapToAlternative(ex, "Lat Machine Larga");
                       if (ex.id === "e22") swapToAlternative(ex, "French Press"); 
                   }
                   if (isKetoOrLowCarb || isShred) {
                       if (ex.id === "e1") swapToAlternative(ex, "Chest Press Convergente");
                       if (ex.id === "e18") swapToAlternative(ex, "Shoulder Press");
                       if (ex.id === "e11") swapToAlternative(ex, "Front Squat"); 
                   }
                   if (needsLumbarProtection) {
                       if (ex.id === "e11") swapToAlternative(ex, "Hack Squat Macchina");
                       if (ex.id === "e7") swapToAlternative(ex, "Rematore Manubrio");
                       if (ex.id === "e13") swapToAlternative(ex, "Stacco Gambe Tese");
                   }
               }
           }
        });
     });
     return plan;
  };

  const dbDinamico = generaAllenamentoDinamico();

  const gestisciCaricamentoPartenza = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setFotoPartenza({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); };
    reader.readAsDataURL(file);
  };

  const gestisciCaricamentoArrivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setFotoArrivo({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); };
    reader.readAsDataURL(file);
  };

  const analizzaObiettivoWizard = async () => {
    setLoadingWizard(true);
    try {
      const contesto = `Sei un Coach IA. Analizza questo atleta: Nome: ${datiWizard.nome}, Età: ${datiWizard.eta}, Altezza: ${datiWizard.altezza}cm, Peso: ${datiWizard.peso}kg. Lifestyle: ${datiWizard.stileVita}. Obiettivo: ${datiWizard.obiettivo}. Dieta preferita: ${datiWizard.dieta}. Valuta le foto allegate (Partenza e/o Obiettivo) per stimare la BIA attuale e il divario fisico con il target. Fornisci un verdetto indicando le settimane stimate per arrivarci.`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { message: "Analizza il mio profilo.", context: contesto };
      const files = [];
      if (fotoPartenza) files.push({ data: fotoPartenza.data, mimeType: fotoPartenza.mimeType, label: "Partenza" });
      if (fotoArrivo) files.push({ data: fotoArrivo.data, mimeType: fotoArrivo.mimeType, label: "Obiettivo" });
      if (files.length > 0) payload.files = files; 
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
    const payload = { nome_utente: datiWizard.nome, eta: Number(datiWizard.eta), altezza: Number(datiWizard.altezza), peso: Number(datiWizard.peso), circonferenze: { profilo: { stileVita: datiWizard.stileVita, obiettivo: datiWizard.obiettivo, dieta: (datiWizard.autore.includes('Masolo') || datiWizard.autore.includes('Calvo')) ? 'Equilibrata' : datiWizard.dieta, autore: datiWizard.autore, metabolismoBloccato: datiWizard.metabolismoBloccato } }, data: new Date().toISOString() };
    await supabase.from("check_utente").insert([payload]);
    setListaAtleti(prev => [...prev, datiWizard.nome]);
    setModalWizard(false); setStepWizard(1);
    caricaProfilo(datiWizard.nome, datiWizard.obiettivo, datiWizard.dieta);
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
    const { peso } = biometria;
    if (peso && eta && altezza) {
      const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo, dieta: tipoDieta, autore: protocolloAutore, metabolismoBloccato } }, data: new Date().toISOString() };
      const { error } = await supabase.from("check_utente").insert([payload]);
      if (error) alert("Errore DB: " + error.message);
      else { 
        alert(`Sistema Aggiornato.\nTDEE Ricalcolato per regime: ${tipoDieta}\nObiettivo: ${protocolloAttivo}`); 
        caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta); 
      } 
    } else { alert("Peso, Età e Altezza sono obbligatori per il calcolo base."); }
  };

  const eliminaMisurazione = async (id: string) => { if(confirm("Eliminare misurazione?")) { await supabase.from("check_utente").delete().eq("id", id); caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta); } };
  const getUltimoCarico = (idEs: string) => { for (let i = storicoSessioni.length - 1; i >= 0; i--) { if (storicoSessioni[i].carichi[idEs]) return storicoSessioni[i].carichi[idEs]; } return '0'; };
  const getNumeroSet = (fase: string) => { if (fase.includes('Fase 1')) return fastWorkout ? 3 : 4; return fastWorkout ? 2 : 3; };
  const updateCaricoSet = (idEs: string, indexSet: number, valore: string) => { setCarichiAttuali(prev => { const arr = prev[idEs] ? [...prev[idEs]] : Array(5).fill(""); arr[indexSet] = valore; return { ...prev, [idEs]: arr }; }); };
  const salvaSessione = async () => {
    if (Object.keys(carichiAttuali).length === 0) return alert("Inserisci almeno un carico!");
    const sessioneCarichiStr: Record<string, string> = {};
    Object.keys(carichiAttuali).forEach(k => { const pesiValidi = carichiAttuali[k].filter(v => v !== ""); if(pesiValidi.length > 0) sessioneCarichiStr[k] = pesiValidi.join(" | "); });
    const payload = { nome_utente: utenteCorrente, giornata: `${giornoCalendario} - ${schedaAttiva}`, dettagli_esercizi: sessioneCarichiStr, data: new Date().toISOString() };
    await supabase.from("storico_allenamenti").insert([payload]);
    setCarichiAttuali({}); alert(`Sessione salvata.`); caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta);
  };
  const toggleCustomMeal = (cat: string) => setPastiCustom(prev => ({ ...prev, [cat]: { ...prev[cat], attivo: true } }));
  const resetCustomMeal = (cat: string) => setPastiCustom(prev => ({ ...prev, [cat]: { attivo: false, cho: '', pro: '', fat: '', nome: '' } }));
  const updateCustomMeal = (cat: string, field: 'cho'|'pro'|'fat'|'nome', value: string) => setPastiCustom(prev => ({ ...prev, [cat]: { ...prev[cat], [field]: value } }));
  
  const apriSwapEsercizio = (es: any) => { 
    const nomeAttuale = eserciziModificati[es.id] || es.nome;
    const tutteLeOpzioni = [
      { nome: es.nome, anim: es.anim, dettaglio: es.dettaglio, note: "Esercizio Originale" },
      ...es.alternative
    ];
    const opzioniDisponibili = tutteLeOpzioni.filter(opt => opt.nome !== nomeAttuale);
    setEsercizioDaCambiare({ id: es.id, nomeAttuale: nomeAttuale, alternative: opzioniDisponibili }); 
    setModalEsercizio(true); 
  };
  const confermaSwapEsercizio = (nuovoNome: string) => { setEserciziModificati({ ...eserciziModificati, [esercizioDaCambiare.id]: nuovoNome }); setModalEsercizio(false); };
  
  const apriSwapAlimento = (categoria: string) => { setCategoriaDaCambiare(categoria as keyof typeof dbAlimenti); setModalAlimento(true); };
  const confermaSwapAlimento = (index: number) => { setPastiSelezionati({ ...pastiSelezionati, [categoriaDaCambiare]: index }); setModalAlimento(false); };

  // ==========================================
  // MOTORE MACRO DINAMICO AVANZATO
  // ==========================================
  const pesoNum = Number(biometria.peso) || 80;
  const bmr = Math.round((10 * pesoNum) + (6.25 * (Number(altezza)||175)) - (5 * (Number(eta)||41)) + 5);
  
  let activityMult = 1.2;
  if (stileVita.includes("Attivo")) activityMult = 1.4;
  if (stileVita.includes("Fisico")) activityMult = 1.6;
  if (tipoTurno === "spezzato") activityMult += 0.05; 
  
  let baseTdee = Math.round(bmr * activityMult);

  let settimaneDiReverse = 0;
  if (storicoMisure.length > 0) {
      const primaMisura = new Date(storicoMisure[storicoMisure.length - 1].data);
      const oggi = new Date();
      const diffMs = oggi.getTime() - primaMisura.getTime();
      settimaneDiReverse = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
  }

  const grassoStimato = Number(biometria.bodyFat) || 0;
  
  if (protocolloAutore === 'Aldo Masolo (Reset Metabolico)' || metabolismoBloccato) {
      baseTdee = baseTdee + (settimaneDiReverse * 100);
  } else if (protocolloAttivo === 'Shred') {
      baseTdee = Math.round(baseTdee * 0.80); 
  } else if (protocolloAttivo === 'Massa') {
      if (grassoStimato > 15 || pesoNum > 85) {
          baseTdee = Math.round(baseTdee * 1.05); 
      } else {
          baseTdee = Math.round(baseTdee * 1.15); 
      }
  }

  const tdee = baseTdee;

  let targetPro = pesoNum * 2.2;
  if (protocolloAttivo === 'Shred') targetPro = pesoNum * 2.5;

  let targetCho = 0;
  let targetFat = 0;
  
  const activeDieta = (protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')) ? 'Equilibrata' : tipoDieta;

  switch (activeDieta) {
      case 'Keto':
          targetCho = 30; 
          targetPro = pesoNum * 2.5; 
          targetFat = (tdee - (targetCho * 4) - (targetPro * 4)) / 9;
          break;
      case 'LowCarb':
          targetCho = pesoNum * 1.5; 
          targetPro = pesoNum * 2.5;
          targetFat = (tdee - (targetCho * 4) - (targetPro * 4)) / 9;
          break;
      case 'Zona':
          targetCho = (tdee * 0.40) / 4;
          targetPro = (tdee * 0.30) / 4;
          targetFat = (tdee * 0.30) / 9;
          break;
      case 'HighCarb':
          targetFat = Math.max(pesoNum * 0.8, 40); 
          targetPro = pesoNum * 2.0;
          targetCho = (tdee - (targetFat * 9) - (targetPro * 4)) / 4;
          break;
      case 'Equilibrata':
      default:
          targetFat = pesoNum * 1.0;
          targetCho = (tdee - (targetFat * 9) - (targetPro * 4)) / 4;
          break;
  }

  if (protocolloAutore === 'Gerardo Calvo (Reset Ormonale)') {
      const hpo = Math.max((Number(altezza) || 175) - 100, 60);
      targetPro = hpo * 2.2;
      targetFat = 65; 
      const dayIndex = giorniSettimana.indexOf(giornoCalendario);
      const autoCarb = [150, 250, 350][dayIndex % 3] || 150;
      targetCho = gerardoCarbOverride !== null ? gerardoCarbOverride : autoCarb;
  } else if (protocolloAutore === 'Aldo Masolo (Reset Metabolico)' || metabolismoBloccato) {
      targetFat = 70;
      targetPro = pesoNum * 1.8;
      targetCho = Math.max(0, (tdee - (targetFat * 9) - (targetPro * 4)) / 4);
  }

  if (utenteCorrente === "Leonardo" && activeDieta === "Equilibrata" && protocolloAutore === "Nessuno") {
      const mult = protocolloAttivo === 'Shred' ? 2.5 : (protocolloAttivo === 'Massa' ? 5 : 4);
      targetCho = pesoNum * mult;
      targetPro = protocolloAttivo === 'Shred' ? (pesoNum * 2.5) : (pesoNum * 2.2);
      targetFat = pesoNum * 1.0;
  }

  let intraCho = protocolloAttivo === 'Shred' ? Math.round(pesoNum * 0.3) : Math.round(pesoNum * 0.5);
  if (activeDieta === 'Keto') intraCho = 0;
  else if (activeDieta === 'LowCarb') intraCho = Math.round(pesoNum * 0.2);

  const intraPro = 15; 
  const intraFat = 0;

  let moltiplicatoreCarbo = 5;
  if (protocolloAttivo === 'Shred') moltiplicatoreCarbo = 2.5;
  else if (protocolloAttivo === 'Ricomposizione') moltiplicatoreCarbo = 4;

  targetCho = Math.max(targetCho, intraCho);
  targetFat = Math.max(targetFat, intraFat);
  targetPro = Math.max(targetPro, intraPro);

  const activeCategories = digiuno ? ['Pasto2', 'Pasto3', 'PostWorkout'] : ['Pasto1', 'Pasto2', 'Pasto3', 'PostWorkout'];
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalMeals: Record<string, any> = {};
  activeCategories.forEach(cat => {
     const item = dbAlimenti[cat as keyof typeof dbAlimenti]?.[pastiSelezionati[cat]];
     if(item) {
       originalMeals[cat] = { cho: item.baseCarbo, pro: item.pro, fat: item.fat };
     }
  });

  let customCho = 0, customPro = 0, customFat = 0, sumNonCustomOrigCho = 0, sumNonCustomOrigPro = 0, sumNonCustomOrigFat = 0;
  activeCategories.forEach(cat => {
     if(pastiCustom[cat].attivo) {
        customCho += Number(pastiCustom[cat].cho) || 0; customPro += Number(pastiCustom[cat].pro) || 0; customFat += Number(pastiCustom[cat].fat) || 0;
     } else if(originalMeals[cat]) {
        sumNonCustomOrigCho += activeDieta === 'Keto' ? 1 : originalMeals[cat].cho; 
        sumNonCustomOrigPro += originalMeals[cat].pro; 
        sumNonCustomOrigFat += originalMeals[cat].fat;
     }
  });

  const remainingCho = Math.max(0, targetCho - customCho - intraCho);
  const remainingPro = Math.max(0, targetPro - customPro - intraPro);
  const remainingFat = Math.max(0, targetFat - customFat - intraFat);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalMeals: Record<string, any> = {};
  activeCategories.forEach(cat => {
     if(pastiCustom[cat].attivo) {
        finalMeals[cat] = { cho: Number(pastiCustom[cat].cho) || 0, pro: Number(pastiCustom[cat].pro) || 0, fat: Number(pastiCustom[cat].fat) || 0 };
     } else if(originalMeals[cat]) {
        const origC = activeDieta === 'Keto' ? 1 : originalMeals[cat].cho;
        finalMeals[cat] = {
           cho: sumNonCustomOrigCho > 0 ? Math.round(remainingCho * (origC / sumNonCustomOrigCho)) : 0,
           pro: sumNonCustomOrigPro > 0 ? Math.round(remainingPro * (originalMeals[cat].pro / sumNonCustomOrigPro)) : 0,
           fat: sumNonCustomOrigFat > 0 ? Math.round(remainingFat * (originalMeals[cat].fat / sumNonCustomOrigFat)) : 0
        };
     }
  });

  let actualCho = intraCho + customCho, actualPro = intraPro + customPro, actualFat = intraFat + customFat;
  activeCategories.forEach(cat => {
     if(!pastiCustom[cat].attivo && finalMeals[cat]) {
        actualCho += finalMeals[cat].cho; actualPro += finalMeals[cat].pro; actualFat += finalMeals[cat].fat;
     }
  });
  const actualIntakeKcal = Math.round((actualCho * 4) + (actualPro * 4) + (actualFat * 9));

  const generaTimelineDieta = (): Array<{ isIntra?: boolean; titolo?: string; descrizione?: string; idCategoria?: string; titoloUI?: string }> => {
    let preW = "";
    if (quandoTiAlleni === 'sera') {
      preW = `1️⃣ PRE-WORKOUT (Stim-Free per riposo notturno):
• L-Citrullina: 6-8g (Vasodilatazione e Pump)
• Arginina AKG: 3g
• Ashwagandha KSM-66: 500mg (Abbattimento cortisolo post-allenamento)`;
    } else {
      preW = `1️⃣ PRE-WORKOUT (Focus & Energia):
• Caffeina: 200mg (Stimolante SNC)
• L-Citrullina: 6g (Pump)
• L-Tirosina: 1g (Focus mentale pre-workout)`;
    }

    if (protocolloAttivo === 'Shred') preW += `
• Acetil L-Carnitina (ALC): 1.5g (Favorisce ossidazione grassi)`;

    let intraW = "2️⃣ INTRA-WORKOUT:";
    if (activeDieta === 'Keto') {
      intraW += `
• Elettroliti: Sodio 1g, Potassio 500mg, Magnesio 200mg (Fondamentali in Keto!)
• MCT Oil in polvere: 10g (Energia immediata dai chetoni)
• EAA (Aminoacidi Essenziali): 15g (Preservazione massa)
• ❌ ZERO Carboidrati`;
    } else if (activeDieta === 'LowCarb') {
      intraW += `
• Ciclodestrine (HBCD): ${intraCho}g (Minimo stimolo insulinico)
• EAA: 15g
• Glutammina: 3g (Supporto intestinale e recupero)`;
    } else {
      intraW += `
• Ciclodestrine (HBCD): ${intraCho}g (Energia e ripristino glicogeno)
• EAA: 15g (Sintesi proteica)
• Creatina Monoidrato: 5g`;
    }

    let saluteW = "3️⃣ BASE SALUTE E RECOVERY (Ai pasti):";
    if (activeDieta === 'Keto' || protocolloAttivo === 'Shred') {
       saluteW += `
• Omega-3 (EPA/DHA): 2-3g (Azione antinfiammatoria)
• Multivitaminico ad alto dosaggio`;
    } else {
       saluteW += `
• Omega-3: 1g
• Vitamina D3 + K2`;
    }
    if (protocolloAttivo === 'Massa' && (activeDieta === 'HighCarb' || activeDieta === 'Equilibrata')) {
       saluteW += `
• GDA (Berberina / Acido Alfa Lipoico): 15 min prima del pasto più ricco di Carbo (Ottimizza la sensibilità insulinica)`;
    }

    const bloccoIntra = { isIntra: true, titolo: "STACK INTEGRAZIONE", descrizione: `${preW}

${intraW}

${saluteW}` };
    const bloccoDigiuno = { isIntra: true, titolo: "⏱️ DIGIUNO INTERMITTENTE (16:8)", descrizione: `• Finestra di digiuno: 16 ore.
• Consentiti: Acqua, Caffè amaro, Tè verde.
• Consigliato: 1 pizzico di Sale Rosa (Sodio) per mantenere l'idratazione.
• Le calorie della colazione sono state spalmate nei restanti pasti.` };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t: any[] = [];
    
    if (quandoTiAlleni === 'mattina') {
        if (digiuno) t.push(bloccoDigiuno);
        t.push(bloccoIntra);
        t.push({ idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Mattina)' });
        if (!digiuno) t.push({ idCategoria: 'Pasto1', titoloUI: 'Pranzo / Pasto 1' });
        t.push({ idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' });
        t.push({ idCategoria: 'Pasto3', titoloUI: 'Pre-nanna / Pasto 3' });
    } else if (quandoTiAlleni === 'pausa') {
        if (digiuno) t.push(bloccoDigiuno);
        else t.push({ idCategoria: 'Pasto1', titoloUI: 'Colazione' });
        t.push(bloccoIntra);
        t.push({ idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Fine Pausa)' });
        t.push({ idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' });
        t.push({ idCategoria: 'Pasto3', titoloUI: 'Pre-nanna / Pasto 3' });
    } else {
        if (digiuno) t.push(bloccoDigiuno);
        else t.push({ idCategoria: 'Pasto1', titoloUI: 'Colazione' });
        t.push({ idCategoria: 'Pasto2', titoloUI: 'Pranzo' });
        t.push({ idCategoria: 'Pasto3', titoloUI: 'Spuntino' });
        t.push(bloccoIntra);
        t.push({ idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Sera)' });
    }
    return t;
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
      <div className="min-h-screen bg-[#071318] text-neutral-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative flex items-center justify-center p-4">
        {/* Sfondo Radiale Smeraldo Fluido */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        
        <div className={UI.card + " w-full max-w-md z-10 p-8"}>
           <div className="flex justify-center items-center mb-8">
              <h1 className="text-4xl font-light tracking-widest uppercase text-center flex-1">
                OMNI<span className={UI.textHighlight + " font-bold"}>COACH</span>
              </h1>
           </div>
           
           <div className="space-y-5">
              <div>
                 <div className="flex justify-between items-center mb-2">
                   <label className={UI.label}>1. Seleziona Atleta / Profilo</label>
                   {utenteCorrente !== "Leonardo" && (
                     <button onClick={eliminaAtleta} className="text-[9px] bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-2 py-0.5 rounded font-bold uppercase transition-all">🗑️ Elimina</button>
                   )}
                 </div>
                 <select value={utenteCorrente} onChange={e => setUtenteCorrente(e.target.value)} className={UI.input}>
                    {listaAtleti.map(a => <option key={a} value={a}>{a}</option>)}
                 </select>
                 <button onClick={() => setModalWizard(true)} className={UI.btnSecondary + " w-full mt-3 text-emerald-400"}>+ Crea Nuovo Profilo Algoritmico</button>
              </div>

              <div>
                 <label className={UI.label}>2. Fase Metabolica (Ciclo)</label>
                 <select value={protocolloAttivo} onChange={e => setProtocolloAttivo(e.target.value)} className={UI.input}>
                    <option value="Massa">🔥 Costruzione (Massa / Ipertrofia)</option>
                    <option value="Shred">🔪 Definizione (Shred / Deficit)</option>
                    <option value="Ricomposizione">⚖️ Mantenimento (Ricomposizione)</option>
                 </select>
              </div>

              <div>
                 <label className={UI.label}>3. Strategia Nutrizionale</label>
                 <select 
                    value={protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo') ? 'Equilibrata' : tipoDieta} 
                    disabled={protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')}
                    onChange={async (e) => {
                      const nuovaDieta = e.target.value;
                      setTipoDieta(nuovaDieta);
                      if (biometria.peso && eta && altezza) {
                        const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(biometria.peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo, dieta: nuovaDieta, autore: protocolloAutore, metabolismoBloccato } }, data: new Date().toISOString() };
                        await supabase.from("check_utente").insert([payload]);
                      }
                    }} 
                    className={`${UI.input} ${protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo') ? 'opacity-50' : ''}`}
                 >
                    <option value="Equilibrata">⚖️ Equilibrata (Classica Bodybuilding)</option>
                    <option value="Keto">🥩 Chetogenica (Keto - Cho Max 30g)</option>
                    <option value="LowCarb">🥑 Low Carb / Iperproteica</option>
                    <option value="Zona">🧩 Dieta a Zona (40-30-30)</option>
                    <option value="HighCarb">🍚 High Carb / Low Fat</option>
                 </select>
              </div>

              <div>
                 <label className={UI.label}>4. Protocollo Master / Coach</label>
                 <select value={protocolloAutore} onChange={async (e) => {
                    const nuovoAutore = e.target.value;
                    setProtocolloAutore(nuovoAutore);
                    if (biometria.peso && eta && altezza) {
                      const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(biometria.peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo, dieta: tipoDieta, autore: nuovoAutore, metabolismoBloccato } }, data: new Date().toISOString() };
                      await supabase.from("check_utente").insert([payload]);
                    }
                 }} className={UI.input}>
                    <option value="Nessuno">🤖 Nessuno (Algoritmo Base)</option>
                    <option value="Aldo Masolo (Reset Metabolico)">🟢 Aldo Masolo (Reset Metabolico)</option>
                    <option value="Gerardo Calvo (Reset Ormonale)">🔴 Gerardo Calvo (Reset Ormonale)</option>
                    <option value="Lorenzo Lari (Flessibile)">🟡 Lorenzo Lari (Alimentazione Flessibile)</option>
                 </select>
              </div>
              
              <div className="bg-black/20 p-4 border border-white/5 rounded-2xl flex items-center gap-3 shadow-inner">
                 <input type="checkbox" id="metabolismoMain" checked={metabolismoBloccato} onChange={async (e) => {
                    const bloccato = e.target.checked;
                    setMetabolismoBloccato(bloccato);
                    if (biometria.peso && eta && altezza) {
                      const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(biometria.peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo, dieta: tipoDieta, autore: protocolloAutore, metabolismoBloccato: bloccato } }, data: new Date().toISOString() };
                      await supabase.from("check_utente").insert([payload]);
                    }
                 }} className="w-5 h-5 accent-emerald-500 cursor-pointer rounded bg-black/40 border-white/10" />
                 <label htmlFor="metabolismoMain" className="text-xs text-neutral-300 font-semibold tracking-wide cursor-pointer">Soffri di Stallo Metabolico?</label>
              </div>

              <button onClick={() => caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta)} className={UI.btnPrimary + " mt-4"}>
                 ACCEDI AL SISTEMA
              </button>
           </div>
        </div>

        {modalWizard && (
          <div className="fixed inset-0 bg-[#071318]/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className={UI.card + " w-full max-w-lg p-8 relative"}>
               <button onClick={() => { setModalWizard(false); setStepWizard(1); }} className="absolute top-5 right-6 text-neutral-500 hover:text-white font-bold text-2xl transition-colors">&times;</button>
               <h3 className={`font-light text-2xl uppercase tracking-widest mb-6 border-b border-white/5 pb-4 text-white`}>Nuova Profilazione</h3>
               
               {stepWizard === 1 && (
                 <div className="space-y-5">
                   <div>
                     <label className={UI.label}>Nome Atleta</label>
                     <input type="text" placeholder="Es. Leonardo" value={datiWizard.nome} onChange={e=>setDatiWizard({...datiWizard, nome: e.target.value})} className={UI.input} />
                   </div>
                   <div className="flex gap-4">
                     <div className="w-1/3">
                        <label className={UI.label}>Età</label>
                        <input type="number" placeholder="Anni" value={datiWizard.eta} onChange={e=>setDatiWizard({...datiWizard, eta: e.target.value})} className={UI.input} />
                     </div>
                     <div className="w-1/3">
                        <label className={UI.label}>Peso</label>
                        <input type="number" placeholder="Kg" value={datiWizard.peso} onChange={e=>setDatiWizard({...datiWizard, peso: e.target.value})} className={UI.input} />
                     </div>
                     <div className="w-1/3">
                        <label className={UI.label}>Altezza</label>
                        <input type="number" placeholder="Cm" value={datiWizard.altezza} onChange={e=>setDatiWizard({...datiWizard, altezza: e.target.value})} className={UI.input} />
                     </div>
                   </div>
                   <div className="flex gap-3 pt-4 border-t border-white/5">
                     <button onClick={() => { setModalWizard(false); setStepWizard(1); }} className={UI.btnSecondary + " w-1/3"}>Annulla</button>
                     <button onClick={()=>{ if(datiWizard.nome && datiWizard.peso) setStepWizard(2); else alert("Inserisci Nome e Peso."); }} className={UI.btnPrimary + " w-2/3"}>Avanti</button>
                   </div>
                 </div>
               )}

               {stepWizard === 2 && (
                 <div className="space-y-5">
                   <div>
                     <label className={UI.label}>Stile di Vita</label>
                     <select value={datiWizard.stileVita} onChange={e=>setDatiWizard({...datiWizard, stileVita: e.target.value})} className={UI.input}>
                       <option value="Sedentario">Sedentario (Scrivania)</option>
                       <option value="Attivo (es. Vendita al dettaglio, in piedi)">Attivo (Molte ore in piedi)</option>
                       <option value="Fisico">Lavoro Fisico Usurante</option>
                     </select>
                   </div>
                   <div>
                     <label className={UI.label}>Obiettivo Fisico</label>
                     <select value={datiWizard.obiettivo} onChange={e=>setDatiWizard({...datiWizard, obiettivo: e.target.value})} className={UI.input}>
                       <option value="Massa">Massa / Ipertrofia</option>
                       <option value="Shred">Dimagrimento (Shred)</option>
                       <option value="Ricomposizione">Mantenimento</option>
                     </select>
                   </div>
                   <div>
                     <label className={UI.label}>Dieta Iniziale</label>
                     <select value={datiWizard.autore.includes('Masolo') || datiWizard.autore.includes('Calvo') ? 'Equilibrata' : datiWizard.dieta} disabled={datiWizard.autore.includes('Masolo') || datiWizard.autore.includes('Calvo')} onChange={e=>setDatiWizard({...datiWizard, dieta: e.target.value})} className={`${UI.input} ${datiWizard.autore.includes('Masolo') || datiWizard.autore.includes('Calvo') ? 'opacity-50' : ''}`}>
                       <option value="Equilibrata">Dieta: Equilibrata</option>
                       <option value="Keto">Dieta: Chetogenica</option>
                       <option value="LowCarb">Dieta: Low Carb</option>
                       <option value="Zona">Dieta: Zona</option>
                       <option value="HighCarb">Dieta: High Carb</option>
                     </select>
                   </div>
                   <div>
                     <label className={UI.label}>Master Coach</label>
                     <select value={datiWizard.autore || 'Nessuno'} onChange={e=>setDatiWizard({...datiWizard, autore: e.target.value})} className={UI.input}>
                       <option value="Nessuno">Intelligenza Artificiale Base</option>
                       <option value="Aldo Masolo (Reset Metabolico)">Aldo Masolo (Reset Metabolico)</option>
                       <option value="Gerardo Calvo (Reset Ormonale)">Gerardo Calvo (Reset Ormonale)</option>
                       <option value="Lorenzo Lari (Flessibile)">Lorenzo Lari (Flessibile)</option>
                     </select>
                   </div>
                   
                   <div className="bg-black/20 p-4 border border-white/5 rounded-2xl flex items-center gap-3 shadow-inner">
                     <input type="checkbox" id="metabolismo" checked={datiWizard.metabolismoBloccato} onChange={e=>setDatiWizard({...datiWizard, metabolismoBloccato: e.target.checked})} className="w-5 h-5 accent-emerald-500 rounded cursor-pointer" />
                     <label htmlFor="metabolismo" className="text-xs text-neutral-300 font-semibold tracking-wide cursor-pointer">Soffri di Stallo Metabolico?</label>
                   </div>

                   <div className="bg-white/[0.02] p-4 border border-white/5 rounded-2xl flex flex-col gap-4">
                     <div>
                        <p className={UI.label + " mb-1"}>📸 Foto Condizione Attuale</p>
                        <input type="file" className="text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-emerald-400 hover:file:bg-white/20 transition-all cursor-pointer" accept="image/*" onChange={gestisciCaricamentoPartenza} />
                     </div>
                     <div className="border-t border-white/5 pt-3">
                        <p className={UI.label + " mb-1"}>📸 Foto Obiettivo Ideale</p>
                        <input type="file" className="text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-teal-400 hover:file:bg-white/20 transition-all cursor-pointer" accept="image/*" onChange={gestisciCaricamentoArrivo} />
                     </div>
                   </div>
                   <div className="flex gap-3 pt-4 border-t border-white/5">
                     <button onClick={() => setStepWizard(1)} className={UI.btnSecondary + " w-1/3"}>Indietro</button>
                     <button onClick={analizzaObiettivoWizard} disabled={loadingWizard} className={UI.btnPrimary + " w-2/3 disabled:opacity-50"}>{loadingWizard ? 'Analisi in corso...' : 'Calcola Profilo IA'}</button>
                   </div>
                 </div>
               )}

               {stepWizard === 3 && (
                 <div className="space-y-5">
                   <div className="bg-black/20 p-5 border border-white/5 rounded-2xl text-sm text-neutral-300 max-h-64 overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner font-medium">{rispostaWizard}</div>
                   <div className="flex gap-3 pt-4 border-t border-white/5">
                     <button onClick={() => setStepWizard(2)} className={UI.btnSecondary + " w-1/3"}>Indietro</button>
                     <button onClick={salvaProfiloWizard} className={UI.btnPrimary + " w-2/3"}>Salva e Accedi</button>
                   </div>
                 </div>
               )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071318] text-neutral-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
      {/* Sfondo Radiale Globale - OmniCoach Style */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-600/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none z-0"></div>

      <main className="p-4 lg:p-6 max-w-7xl mx-auto relative z-10">
        
        <header className="mb-8 border-b border-white/5 pb-6 flex justify-between items-center">
          <div>
            <button onClick={() => setAppState('HOME')} className="text-[10px] uppercase font-bold text-neutral-500 hover:text-white mb-2 block transition-all tracking-widest">⬅️ Torna alla Home</button>
            <h1 className="text-2xl sm:text-3xl font-light tracking-widest uppercase text-white drop-shadow-md">
              OMNICOACH <span className={UI.textHighlight}>{protocolloAttivo}</span>
            </h1>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-teal-200/50 block uppercase font-bold mb-1 tracking-widest">Atleta Operativo</span>
            <div className="flex flex-col items-end gap-1.5">
               <span className="text-sm font-semibold text-white bg-white/5 backdrop-blur-md shadow-lg px-4 py-1.5 rounded-full border border-white/10">{utenteCorrente}</span>
               <div className="flex gap-2">
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">{tipoDieta}</span>
                  {protocolloAutore !== 'Nessuno' && <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest px-2 border-l border-white/10">{protocolloAutore.split(' ')[0]}</span>}
               </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
          
          {/* COLONNA SINISTRA: Telemetria & Coach IA */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <section className={UI.card + " p-6 flex flex-col"}>
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
                <h2 className="text-lg font-semibold tracking-wide text-white">Telemetria</h2>
                <button onClick={() => setVistaTelemetria(vistaTelemetria === 'FORM' ? 'STORICO' : 'FORM')} className={UI.btnSecondary + " !py-1.5 !px-3"}>
                  {vistaTelemetria === 'STORICO' ? 'Form' : 'Storico'}
                </button>
              </div>

              {isDataLoading ? (
                 <div className="space-y-4">
                   <Skeleton className="h-12 w-full" />
                   <Skeleton className="h-24 w-full" />
                   <Skeleton className="h-64 w-full" />
                 </div>
              ) : vistaTelemetria === 'FORM' ? (
                 <div className="space-y-5">
                   <div>
                     <p className={UI.label}>Misure Base</p>
                     <div className="grid grid-cols-2 gap-3">
                       {misureBase.map((m) => (
                           <div key={m.id} className="bg-black/20 p-3 rounded-2xl border border-white/5 shadow-inner">
                             <label className="text-[9px] text-neutral-400 uppercase font-semibold flex justify-between tracking-wider">{m.label} <span className="text-neutral-600">{m.unit}</span></label>
                             <input type="number" value={biometria[m.id as keyof typeof biometria] || ''} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-white outline-none focus:text-emerald-400 mt-1" placeholder="-" />
                           </div>
                       ))}
                     </div>
                   </div>
                   
                   <div>
                     <p className={UI.label}>BIA (Opzionale)</p>
                     <div className="grid grid-cols-2 gap-3">
                       {misureBIA.map((m) => (
                           <div key={m.id} className="bg-black/20 p-3 rounded-2xl border border-white/5 shadow-inner">
                             <label className="text-[9px] text-neutral-400 uppercase font-semibold flex justify-between tracking-wider">{m.label} <span className="text-neutral-600">{m.unit}</span></label>
                             <input type="number" value={biometria[m.id as keyof typeof biometria] || ''} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-teal-400 outline-none focus:text-white mt-1" placeholder="-" />
                           </div>
                       ))}
                     </div>
                   </div>

                   <div className="pt-2">
                      <SvgBodyCompositionWheel data={biometria} altezza={altezza} eta={eta} />
                   </div>

                   <button onClick={valutaCheckFisico} className={UI.btnPrimary + " mt-2 !py-3"}>Salva Algoritmo</button>
                 </div>
              ) : (
                 <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[600px] custom-scrollbar">
                   {storicoMisure.length === 0 ? <p className="text-[11px] text-neutral-500 italic text-center p-6 bg-black/20 rounded-2xl border border-white/5 shadow-inner">Nessun dato registrato.</p> : (
                      storicoMisure.map((mis: any) => {
                         const circ = typeof mis.circonferenze === 'string' ? JSON.parse(mis.circonferenze) : (mis.circonferenze || {});
                         return (
                           <div key={mis.id} className={UI.glassPanel + " flex flex-col gap-3"}>
                              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                 <p className="text-[11px] font-bold text-emerald-400 tracking-widest">{new Date(mis.data).toLocaleDateString('it-IT')}</p>
                                 <button onClick={() => eliminaMisurazione(mis.id)} className="text-red-400 hover:text-red-300 text-[10px] uppercase font-bold tracking-wider transition-colors">🗑️</button>
                              </div>
                              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] text-neutral-300 font-medium">
                                 <p className="bg-black/20 p-1.5 rounded-lg shadow-inner">Peso: <strong className="text-white float-right">{mis.peso || '-'}kg</strong></p>
                                 <p className="bg-black/20 p-1.5 rounded-lg shadow-inner">Petto: <strong className="text-white float-right">{circ.petto || '-'}cm</strong></p>
                                 <p className="bg-black/20 p-1.5 rounded-lg shadow-inner">Spalle: <strong className="text-white float-right">{circ.spalle || '-'}cm</strong></p>
                                 <p className="bg-black/20 p-1.5 rounded-lg shadow-inner">Braccia: <strong className="text-white float-right">{circ.braccia || '-'}cm</strong></p>
                                 <p className="bg-black/20 p-1.5 rounded-lg shadow-inner">Gambe: <strong className="text-white float-right">{circ.gambe || '-'}cm</strong></p>
                                 <p className="bg-black/20 p-1.5 rounded-lg shadow-inner">Glutei: <strong className="text-white float-right">{circ.glutei || '-'}cm</strong></p>
                                 <p className="bg-teal-900/20 p-1.5 rounded-lg shadow-inner text-teal-400">Vita: <strong className="text-white float-right">{circ.vita || '-'}cm</strong></p>
                                 <p className="bg-emerald-900/20 p-1.5 rounded-lg shadow-inner text-emerald-400">BIA: <strong className="text-white float-right">{circ.bodyFat || '-'}%</strong></p>
                              </div>
                           </div>
                         );
                      })
                   )}
                 </div>
              )}
            </section>

            <section className={UI.card + " p-6 flex flex-col h-[450px]"}>
              <h2 className="text-base font-semibold text-white border-b border-white/5 pb-3 mb-4 flex items-center gap-3 tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span> A.I. Coach
              </h2>
              <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-black/20 shadow-inner rounded-2xl border border-white/5 mb-4 custom-scrollbar">
                {chatLog.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className={`text-[9px] uppercase font-bold tracking-widest mb-1.5 ${msg.role === 'user' ? 'text-neutral-500 pr-2' : 'text-teal-400 pl-2'}`}>{msg.role === 'user' ? utenteCorrente : 'Coach'}</span>
                    <div className={`p-3.5 rounded-2xl text-[13px] leading-relaxed max-w-[90%] shadow-md ${msg.role === 'user' ? 'bg-white/10 backdrop-blur-md text-white rounded-tr-sm border border-white/5' : 'bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/20 text-neutral-200 rounded-tl-sm'}`}>{msg.text}</div>
                  </div>
                ))}
                {isTyping && <div className="text-[10px] text-emerald-400 font-medium tracking-widest pl-2 animate-pulse">Elaborazione in corso...</div>}
                <div ref={chatEndRef} />
              </div>
              
              {fileAllegato && (
                <div className="flex items-center gap-2 mb-3 p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 w-fit shadow-lg">
                  <span className="text-xs text-lime-300 font-medium truncate max-w-[180px]">📎 {fileAllegato.nome}</span>
                  <button onClick={() => setFileAllegato(null)} className="text-red-400 font-bold ml-2 hover:text-red-300">&times;</button>
                </div>
              )}
              <div className="flex gap-2 relative">
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={gestisciCaricamentoFile} />
                <button onClick={() => fileInputRef.current?.click()} className={UI.btnSecondary + " !px-4"}>📎</button>
                <input type="text" value={inputChat} onChange={e => setInputChat(e.target.value)} onKeyDown={e => e.key === 'Enter' && inviaMessaggioIA()} placeholder="Chiedi o allega pasto..." className={UI.input + " !rounded-2xl"} />
                <button onClick={inviaMessaggioIA} disabled={isTyping || (!inputChat.trim() && !fileAllegato)} className={UI.btnPrimary + " !w-auto !px-5 disabled:opacity-50 disabled:hover:translate-y-0"}>→</button>
              </div>
            </section>
          </div>

          {/* COLONNA CENTRALE: Turni & Nutrizione */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <section className={UI.card + " p-6"}>
              <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-3">
                <h2 className="text-lg font-semibold tracking-wide text-white">Incastro Turni</h2>
                <select value={tipoTurno} onChange={(e) => setTipoTurno(e.target.value)} className="bg-black/20 text-xs text-emerald-400 font-semibold p-2 rounded-xl border border-white/10 outline-none focus:border-teal-500 transition-colors">
                  <option value="diretto">Turno Diretto</option><option value="spezzato">Turno Spezzato</option>
                </select>
              </div>
              <div className="space-y-4">
                <div className="bg-black/20 p-4 rounded-2xl border border-white/5 shadow-inner">
                  <span className="text-[10px] text-teal-400 uppercase font-bold tracking-widest mb-3 block">{tipoTurno === 'diretto' ? 'Orario Continuato' : 'Mattina (Lavoro)'}</span>
                  <div className="flex space-x-4">
                    <input type="time" value={inizio1} onChange={e => setInizio1(e.target.value)} className="w-1/2 bg-transparent text-sm font-medium text-white p-2 border-b border-white/10 outline-none focus:border-emerald-500 transition-colors" />
                    <input type="time" value={fine1} onChange={e => setFine1(e.target.value)} className="w-1/2 bg-transparent text-sm font-medium text-white p-2 border-b border-white/10 outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                </div>
                {tipoTurno === 'spezzato' && (
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/5 shadow-inner">
                    <span className="text-[10px] text-teal-400 uppercase font-bold tracking-widest mb-3 block">Pomeriggio (Lavoro)</span>
                    <div className="flex space-x-4">
                      <input type="time" value={inizio2} onChange={e => setInizio2(e.target.value)} className="w-1/2 bg-transparent text-sm font-medium text-white p-2 border-b border-white/10 outline-none focus:border-emerald-500 transition-colors" />
                      <input type="time" value={fine2} onChange={e => setFine2(e.target.value)} className="w-1/2 bg-transparent text-sm font-medium text-white p-2 border-b border-white/10 outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                  </div>
                )}
                <div className="pt-4 mt-2">
                  <div className="flex justify-between items-center mb-4 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                     <span className="text-[10px] text-neutral-300 uppercase font-bold tracking-widest">Digiuno Intermittente 16:8</span>
                     <button onClick={() => setDigiuno(!digiuno)} className={`w-12 h-6 rounded-full relative transition-colors shadow-inner ${digiuno ? 'bg-emerald-500' : 'bg-black/40 border border-white/10'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-transform shadow-md ${digiuno ? 'translate-x-7' : 'translate-x-1'}`}></div>
                     </button>
                  </div>
                  <span className={UI.label}>Collocazione Allenamento</span>
                  <div className="flex space-x-3 bg-black/20 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                    <button onClick={() => setQuandoTiAlleni('mattina')} className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${quandoTiAlleni === 'mattina' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md text-white' : 'text-neutral-500 hover:text-white'}`}>Mattina</button>
                    {tipoTurno === 'spezzato' && <button onClick={() => setQuandoTiAlleni('pausa')} className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${quandoTiAlleni === 'pausa' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md text-white' : 'text-neutral-500 hover:text-white'}`}>Pausa</button>}
                    <button onClick={() => setQuandoTiAlleni('sera')} className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${quandoTiAlleni === 'sera' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md text-white' : 'text-neutral-500 hover:text-white'}`}>Sera</button>
                  </div>
                </div>
              </div>
            </section>

            <section className={UI.card + " p-6"}>
              <div className="flex flex-col border-b border-white/5 pb-4 mb-5">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold tracking-wide text-white">Timeline Nutrizionale</h2>
                  <div className="flex gap-2 items-center">
                    {protocolloAutore === 'Gerardo Calvo (Reset Ormonale)' && (
                       <button 
                         onClick={() => {
                            const current = gerardoCarbOverride !== null ? gerardoCarbOverride : [150, 250, 350][giorniSettimana.indexOf(giornoCalendario) % 3];
                            const next = current === 150 ? 250 : (current === 250 ? 350 : 150);
                            setGerardoCarbOverride(next);
                         }}
                         className="text-[9px] bg-white/5 border border-purple-500/50 text-purple-300 px-3 py-1.5 rounded-xl font-bold uppercase tracking-widest transition-all hover:bg-purple-500/20"
                       >
                         🔄 Ciclo: {targetCho}g
                       </button>
                    )}
                    <select 
                      value={protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo') ? 'Equilibrata' : tipoDieta} 
                      disabled={protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')}
                      onChange={async (e) => {
                        const nuovaDieta = e.target.value;
                        setTipoDieta(nuovaDieta);
                        if (biometria.peso && eta && altezza) {
                          const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(biometria.peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo, dieta: nuovaDieta, autore: protocolloAutore, metabolismoBloccato } }, data: new Date().toISOString() };
                          await supabase.from("check_utente").insert([payload]);
                        }
                      }}
                      className={`text-[9px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest outline-none cursor-pointer text-center appearance-none transition-all shadow-sm ${
                        (protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')) 
                          ? 'bg-black/30 text-neutral-500 border border-white/5' 
                          : (protocolloAttivo === 'Shred' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50')
                      }`}
                    >
                    <option value="Equilibrata" className="bg-[#0b1319]">⚖️ Equilibrata</option>
                    <option value="Keto" className="bg-[#0b1319]">🥩 Keto</option>
                    <option value="LowCarb" className="bg-[#0b1319]">🥑 Low Carb</option>
                    <option value="Zona" className="bg-[#0b1319]">🧩 Zona</option>
                    <option value="HighCarb" className="bg-[#0b1319]">🍚 High Carb</option>
                  </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-2 text-center shadow-inner">
                     <span className="text-[8px] text-neutral-500 uppercase tracking-widest block mb-0.5">BMR</span>
                     <span className="text-xs text-white font-semibold"><AnimatedCounter value={bmr} /></span>
                  </div>
                  <div className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-2 text-center shadow-inner">
                     <span className="text-[8px] text-neutral-500 uppercase tracking-widest block mb-0.5">TDEE</span>
                     <span className="text-xs text-white font-semibold"><AnimatedCounter value={baseTdee} /></span>
                  </div>
                  <div className="flex-[1.5] bg-gradient-to-br from-emerald-900/40 to-teal-900/20 border border-emerald-500/30 rounded-2xl p-2 text-center shadow-lg">
                     <span className="text-[8px] text-emerald-400 uppercase tracking-widest block mb-0.5">INTAKE TARGET</span>
                     <span className="text-sm text-lime-300 font-bold"><AnimatedCounter value={actualIntakeKcal} /> kcal</span>
                  </div>
                </div>
              </div>
              
              {protocolloAutore === 'Lorenzo Lari (Flessibile)' && (
                 <div className="mb-5 p-4 bg-gradient-to-r from-yellow-900/30 to-amber-900/10 border border-yellow-500/30 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">🟡 BUDGET SGARRO (80/20)</span>
                       <span className="text-sm font-bold text-white"><AnimatedCounter value={Math.round(actualIntakeKcal * 0.2)} /> Kcal</span>
                    </div>
                    <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden flex shadow-inner mt-2">
                       <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[80%]"></div>
                       <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full w-[20%] shadow-[0_0_10px_#fbbf24]"></div>
                    </div>
                    <p className="text-[10px] text-yellow-200/60 font-medium mt-3 leading-relaxed">Puoi destinare il 20% delle tue calorie odierne a cibi sfiziosi, senza sensi di colpa e restando nei target!</p>
                 </div>
              )}

              {isDataLoading ? (
                 <div className="space-y-4">
                   <Skeleton className="h-28 w-full" />
                   <Skeleton className="h-32 w-full" />
                   <Skeleton className="h-32 w-full" />
                 </div>
              ) : (
                <div className="space-y-4">
                {generaTimelineDieta().map((blocco, idx) => {
                  if (blocco.isIntra) {
                    return (
                      <div key={`intra-${idx}`} className="p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-widest">{blocco.titolo}</span>
                          <span className="text-[9px] font-bold text-teal-200 bg-teal-900/40 px-2 py-1 rounded-lg border border-teal-500/30 shadow-sm"><AnimatedCounter value={Math.round((intraCho*4)+(intraPro*4))} /> KCAL</span>
                        </div>
                        <p className="font-medium text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">{blocco.descrizione}</p>
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
                    <div key={`${cat}-${idx}`} className={`${UI.glassPanel} ${isPW ? 'border-teal-500/30 bg-teal-900/10' : ''}`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${isPW ? 'text-teal-400' : 'text-neutral-400'}`}>{blocco.titoloUI}</span>
                        <div className="flex gap-2">
                          {!isCustom ? (
                            <>
                              <button onClick={() => toggleCustomMeal(cat)} className="text-[9px] bg-white/5 hover:bg-white/10 text-neutral-300 px-2.5 py-1.5 rounded-xl font-semibold uppercase tracking-wider transition-all border border-white/5">Custom</button>
                              <button onClick={() => apriSwapAlimento(cat)} className="text-[9px] bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-xl font-semibold uppercase tracking-wider transition-all border border-white/10 shadow-sm">Swap</button>
                            </>
                          ) : (
                             <button onClick={() => resetCustomMeal(cat)} className="text-[9px] bg-red-500/20 hover:bg-red-500/40 text-red-300 px-2.5 py-1.5 rounded-xl font-semibold uppercase tracking-wider transition-all border border-red-500/30">🗑️ Reset</button>
                          )}
                        </div>
                      </div>
                      
                      {isCustom ? (
                         <div className="mt-3 bg-black/30 p-3.5 rounded-2xl border border-emerald-500/30 shadow-inner">
                           <div className="flex gap-3 mb-3">
                              <input type="text" placeholder="Es. 35g Plumcake" value={pastiCustom[cat].nome} onChange={e => updateCustomMeal(cat, 'nome', e.target.value)} className={UI.input + " !p-2 !text-xs !bg-black/50"} />
                              <button onClick={() => calcolaMacroDaNome(cat, pastiCustom[cat].nome)} disabled={isCalculatingMacro[cat]} className={UI.btnPrimary + " !w-auto !p-2 !text-xs !rounded-xl disabled:opacity-50"}>🪄 AI</button>
                           </div>
                           <div className="flex gap-3">
                              <div className="flex-1"><span className="text-[8px] text-neutral-500 uppercase font-bold tracking-widest block mb-1">Carbo</span><input type="number" value={pastiCustom[cat].cho} onChange={e => updateCustomMeal(cat, 'cho', e.target.value)} className={UI.input + " !p-2 !text-xs !bg-black/50 text-center"} /></div>
                              <div className="flex-1"><span className="text-[8px] text-neutral-500 uppercase font-bold tracking-widest block mb-1">Pro</span><input type="number" value={pastiCustom[cat].pro} onChange={e => updateCustomMeal(cat, 'pro', e.target.value)} className={UI.input + " !p-2 !text-xs !bg-black/50 text-center"} /></div>
                              <div className="flex-1"><span className="text-[8px] text-neutral-500 uppercase font-bold tracking-widest block mb-1">Fat</span><input type="number" value={pastiCustom[cat].fat} onChange={e => updateCustomMeal(cat, 'fat', e.target.value)} className={UI.input + " !p-2 !text-xs !bg-black/50 text-center"} /></div>
                           </div>
                         </div>
                      ) : (
                         <div className="bg-black/20 p-3.5 rounded-2xl border border-white/5 shadow-inner mt-2">
                           <p className="font-semibold text-sm text-white mb-2">{itemScelto.nome}</p>
                           {finalCho === 0 && finalPro === 0 ? <p className="text-[11px] text-red-400 font-mono bg-red-900/20 p-2 rounded-lg inline-block">Pasto azzerato (Sgarro o Digiuno).</p> : <p className="text-[11px] text-teal-100/70 font-mono leading-relaxed">{itemScelto.dettaglioGrammi(finalCho, finalPro, finalFat)}</p>}
                         </div>
                      )}
                      <div className="mt-4 flex justify-between items-center px-2">
                         <div className="flex gap-3 sm:gap-4">
                           <span className="text-[10px] text-neutral-400 font-medium tracking-wide">C <strong className="text-lime-300 font-bold ml-1 text-xs">{finalCho}g</strong></span>
                           <span className="text-[10px] text-neutral-400 font-medium tracking-wide">P <strong className="text-white font-bold ml-1 text-xs">{finalPro}g</strong></span>
                           <span className="text-[10px] text-neutral-400 font-medium tracking-wide">F <strong className="text-white font-bold ml-1 text-xs">{finalFat}g</strong></span>
                         </div>
                         <span className={`text-[11px] font-black tracking-widest px-3 py-1.5 rounded-xl shadow-inner border border-white/5 bg-black/40 ${isPW ? 'text-teal-400' : 'text-white'}`}><AnimatedCounter value={pastoKcal} /> KCAL</span>
                      </div>
                    </div>
                  );
                })}
                </div>
              )}
            </section>
          </div>

          {/* COLONNA DESTRA: Allenamento Dinamico */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <section className={UI.card + " p-6 flex flex-col h-[85vh]"}>
              <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-3">
                <h2 className="text-lg font-semibold tracking-wide text-white">Programma {utenteCorrente === "Leonardo" ? 'Master' : 'Dinamico'}</h2>
                <div className="flex gap-2 bg-black/20 p-1 rounded-xl border border-white/5 shadow-inner">
                  <button onClick={() => {setVistaStorico(!vistaStorico); setVistaGraficiCarichi(false);}} className={`px-3 py-1.5 text-[9px] uppercase font-bold tracking-widest rounded-lg transition-all ${vistaStorico && !vistaGraficiCarichi ? 'bg-white/10 text-white shadow-md' : 'text-neutral-500 hover:text-white'}`}>
                    {vistaStorico && !vistaGraficiCarichi ? 'Oggi' : 'Storico'}
                  </button>
                  <button onClick={() => {setVistaGraficiCarichi(!vistaGraficiCarichi); setVistaStorico(true);}} className={`px-3 py-1.5 text-[9px] uppercase font-bold tracking-widest rounded-lg transition-all ${vistaGraficiCarichi ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-neutral-500 hover:text-white'}`}>
                    Grafici
                  </button>
                </div>
              </div>

              {!vistaStorico ? (
                <>
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/5 mb-5 flex justify-between items-center shadow-inner">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-widest block mb-1">Durata Stimata</span>
                      <p className="text-sm font-semibold text-white flex items-center gap-2">⏱️ ~<AnimatedCounter value={calcolaTempoScheda()} /> min <span className="text-[9px] text-neutral-500 font-medium ml-1">(Recuperi inclusi)</span></p>
                    </div>
                    <button onClick={() => setFastWorkout(!fastWorkout)} className={`px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md ${fastWorkout ? 'bg-gradient-to-r from-red-500 to-rose-400 text-white border-none' : 'bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10'}`}>
                      {fastWorkout ? '⚡ Fast Mode ON' : 'Taglia Tempi'}
                    </button>
                  </div>

                  <div className="mb-5">
                    <p className={UI.label}>Giorno di Allenamento</p>
                    <div className="flex flex-wrap gap-2">
                      {giorniSettimana.map((gg: string) => (
                        <button key={gg} onClick={() => setGiornoCalendario(gg)} className={`px-3 py-2 text-xs font-semibold rounded-xl flex-1 min-w-[60px] transition-all ${giornoCalendario === gg ? 'bg-white/15 text-white shadow-md border border-white/20' : 'bg-black/20 text-neutral-500 border border-transparent hover:text-neutral-300'}`}>{gg}</button>
                      ))}
                    </div>
                  </div>

                  <HumanHeatmap scheda={schedaAttiva} />
                  
                  <div className="mb-5 flex gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                    {['Spinta', 'Tirata', 'Gambe'].map((sch: string) => (
                      <button key={sch} onClick={() => setSchedaAttiva(sch as any)} className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl flex-1 transition-all ${schedaAttiva === sch ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-[0_4px_15px_rgba(16,185,129,0.3)] text-white' : 'text-neutral-500 hover:text-white'}`}>{sch}</button>
                    ))}
                  </div>

                  {isDataLoading ? (
                   <div className="flex-1 space-y-4 custom-scrollbar pr-2">
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-40 w-full" />
                   </div>
                ) : (
                   <div className="flex-1 overflow-y-auto pr-3 space-y-5 custom-scrollbar">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {dbDinamico[schedaAttiva].esercizi.map((es: any) => {
                      const nomeAttuale = eserciziModificati[es.id] || es.nome;
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const altEs = es.alternative.find((a: any) => a.nome === nomeAttuale);
                      const currentEx = altEs || es;
                      
                      const ultimoCarico = getUltimoCarico(es.id);
                      const numeroSetTarget = getNumeroSet(es.fase);
                      const phaseColor = es.fase.includes('Fase 1') ? '#10b981' : (es.fase.includes('Fase 2') ? '#0ea5e9' : '#f43f5e'); // Emerald, Sky, Rose
                      
                      const animType = currentEx.anim || "chest_barbell_flat"; 
                      
                      let repMostrate = es.rep;
                      if (fastWorkout) repMostrate = repMostrate.replace("4-5 serie", "3 serie").replace("3-4 serie", "2 serie").replace("Rec: 2 min", "Rec: 1.5 min").replace("Rec: 45 sec", "Rec: 1 min");

                      return (
                        <div key={`${es.id}-${nomeAttuale}`} className={`${UI.glassPanel} relative overflow-hidden group`}>
                          <div className={`absolute top-0 left-0 w-1.5 h-full opacity-80`} style={{backgroundColor: phaseColor, boxShadow: `0 0 12px ${phaseColor}`}}></div>
                          <div className="pl-3">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-[9px] uppercase font-bold tracking-widest" style={{color: phaseColor}}>{es.fase}</span>
                              <button onClick={() => apriSwapEsercizio(es)} className={UI.btnSecondary + " !py-1 !px-2.5 opacity-0 group-hover:opacity-100"}>Swap</button>
                            </div>
                            <div className="flex items-center gap-5 mt-2">
                              <div className="bg-black/30 p-2 rounded-xl shadow-inner border border-white/5"><MediaVisualizer animKey={animType} color={phaseColor} /></div>
                              <div className="flex-1">
                                 <h3 className="font-semibold text-sm text-white mb-1.5">{nomeAttuale}</h3>
                                 <p className="text-[10px] text-teal-100/60 leading-relaxed font-medium line-clamp-2">{currentEx.dettaglio}</p>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                               <p className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-black/30 text-white border border-white/5 shadow-inner tracking-wide">{repMostrate}</p>
                               {ultimoCarico !== '0' && <span className="text-[9px] font-bold text-neutral-400 bg-white/5 px-2 py-1 rounded-md border border-white/5">Ultima: <span className="text-lime-300 ml-1">{ultimoCarico}kg</span></span>}
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/5">
                              <div className="flex gap-3">
                                {Array.from({ length: numeroSetTarget }).map((_, i) => (
                                  <div key={i} className="flex-1 relative">
                                    <label className="text-[8px] text-neutral-500 uppercase font-bold tracking-widest block text-center mb-1.5">Set {i+1}</label>
                                    <input type="number" value={carichiAttuali[es.id]?.[i] || ''} onChange={(e) => updateCaricoSet(es.id, i, e.target.value)} className="w-full bg-black/40 border border-white/10 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.5)] p-2.5 rounded-xl text-xs text-center text-white font-bold outline-none focus:border-emerald-500 focus:bg-black/60 transition-all placeholder:text-neutral-700" placeholder="-" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <button onClick={salvaSessione} className={UI.btnPrimary + " mt-5 !py-4"}>SALVA SESSIONE</button>
              </>
            ) : vistaGraficiCarichi ? (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                 <div className={UI.glassPanel}>
                   <label className={UI.label}>Seleziona Esercizio</label>
                   <select value={esercizioGraficoSelezionato} onChange={(e) => setEsercizioGraficoSelezionato(e.target.value)} className={UI.input + " mb-4"}>
                     {Object.values(baseDbAllenamento).flatMap(g => g.esercizi).map(es => (<option key={es.id} value={es.id}>{eserciziModificati[es.id] || es.nome}</option>))}
                   </select>
                   <SvgLineChart data={getDataGraficoEsercizio()} label={Object.values(baseDbAllenamento).flatMap(g => g.esercizi).find(e => e.id === esercizioGraficoSelezionato)?.nome || "Esercizio"} />
                 </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                {storicoSessioni.length === 0 ? <p className="text-[11px] text-neutral-500 italic text-center p-6 bg-black/20 rounded-2xl border border-white/5 shadow-inner">Nessuna sessione salvata.</p> : (
                  [...storicoSessioni].reverse().map((sess) => (
                    <div key={sess.oraId} className={UI.glassPanel}>
                      <span className="font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)] block text-sm tracking-wide">{sess.giorno} - Scheda {sess.scheda}</span>
                      <span className="text-[10px] text-neutral-500 font-medium mb-4 block tracking-widest mt-1">{sess.data}</span>
                      <div className="space-y-2.5">
                        {Object.entries(sess.carichi).map(([idEs, pesoStr]) => (
                          <div key={idEs} className="bg-black/20 shadow-inner p-3 rounded-xl flex justify-between items-center gap-3 border border-white/5">
                            <span className="text-neutral-300 text-xs font-medium truncate flex-1">{eserciziModificati[idEs] || Object.values(baseDbAllenamento).flatMap(d=>d.esercizi).find(e=>e.id===idEs)?.nome}</span>
                            <span className="font-bold text-lime-300 bg-[#071318] px-3 py-1.5 rounded-lg border border-white/5 shadow-md text-xs">{pesoStr as string} kg</span>
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
        <div className="fixed inset-0 bg-[#071318]/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className={UI.card + " w-full max-w-md p-6 relative"}>
            <div className="flex justify-between items-center mb-5 border-b border-white/10 pb-3">
              <h3 className="font-semibold text-lg text-white tracking-wide">Sostituisci Esercizio</h3>
              <button onClick={() => setModalEsercizio(false)} className="text-neutral-500 hover:text-white text-2xl transition-colors">&times;</button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {esercizioDaCambiare.alternative.map((alt: any, i: number) => (
                <button key={i} onClick={() => confermaSwapEsercizio(alt.nome)} className="w-full text-left p-4 bg-black/30 border border-white/5 shadow-inner rounded-2xl hover:border-emerald-500/50 group transition-all">
                  <p className="font-semibold text-sm text-white group-hover:text-emerald-400 transition-colors">{alt.nome}</p>
                  <p className="text-[10px] text-teal-200/50 mt-1.5 uppercase font-bold tracking-widest mb-2">{alt.note}</p>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-medium">{alt.dettaglio}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modalAlimento && (
        <div className="fixed inset-0 bg-[#071318]/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className={UI.card + " w-full max-w-md p-6 relative"}>
            <div className="flex justify-between items-center mb-5 border-b border-white/10 pb-3">
              <h3 className="font-semibold text-lg text-white tracking-wide">Sostituisci Pasto</h3>
              <button onClick={() => setModalAlimento(false)} className="text-neutral-500 hover:text-white text-2xl transition-colors">&times;</button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* @ts-ignore */}
              {dbAlimenti[categoriaDaCambiare].map((alt, i) => {
                 const macroCho = alt.baseCarbo * moltiplicatoreCarbo;
                 const swapKcal = Math.round((macroCho * 4) + (alt.pro * 4) + (alt.fat * 9));
                 return (
                  <button key={i} onClick={() => confermaSwapAlimento(i)} className="w-full text-left p-4 bg-black/30 border border-white/5 shadow-inner rounded-2xl hover:border-teal-500/50 group transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-sm text-white group-hover:text-teal-400 transition-colors pr-2">{alt.nome}</p>
                      <span className="text-[10px] bg-white/10 backdrop-blur-md border border-white/5 text-white px-2 py-1 rounded-lg font-bold tracking-widest shrink-0">{swapKcal} Kcal</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 font-bold tracking-widest bg-black/40 inline-block px-2 py-1 rounded-md mb-3">C {macroCho}g <span className="mx-1 text-neutral-600">|</span> P {alt.pro}g <span className="mx-1 text-neutral-600">|</span> F {alt.fat}g</p>
                    <p className="text-[11px] text-neutral-300 font-medium leading-relaxed bg-white/5 p-2 rounded-xl border border-white/5">{alt.dettaglioGrammi(macroCho, alt.pro, alt.fat)}</p>
                  </button>
                 );
              })}
            </div>
          </div>
        </div>
      )}
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16,185,129,0.5); }
      `}} />
    </div>
  );
}
