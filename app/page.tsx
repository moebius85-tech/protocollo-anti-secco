"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";
import { MediaVisualizer } from './animations';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqawxoocwtxfkahzyduq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chiave-temporanea-per-il-build";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tema principale Verde Mela
const gradPrimary = "bg-gradient-to-r from-lime-400 to-emerald-500"; 
const colorBg = "bg-[#E0E5EC]";
const shadowOutset = "shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]";
const shadowInset = "shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]";
const shadowOutsetSm = "shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]";
const shadowInsetSm = "shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff]";

const UI = {
  bg: colorBg,
  card: `${colorBg} ${shadowOutset} rounded-[2rem] p-5 sm:p-6 lg:p-8`,
  panelInset: `${colorBg} ${shadowInset} rounded-[1.5rem] p-5`,
  panelOutset: `${colorBg} ${shadowOutsetSm} rounded-[1.5rem] p-5`,
  input: `w-full ${colorBg} ${shadowInsetSm} px-5 py-3.5 rounded-2xl text-[13px] text-slate-700 outline-none focus:ring-2 focus:ring-emerald-400/40 transition-all font-semibold placeholder:text-slate-400 border-none appearance-none`,
  btnPrimary: `${gradPrimary} shadow-[0_8px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-white font-bold uppercase tracking-widest rounded-2xl py-3.5 px-6 flex items-center justify-center border-none cursor-pointer`,
  btnSecondary: `${colorBg} ${shadowOutsetSm} active:${shadowInsetSm} text-slate-500 hover:text-emerald-500 py-2.5 px-5 rounded-2xl font-bold uppercase tracking-widest transition-all duration-200 text-[10px] cursor-pointer`,
  label: "text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-2 px-1",
  pillActive: `${gradPrimary} text-white font-bold shadow-[0_4px_10px_rgba(16,185,129,0.3)] cursor-pointer`,
  pillInactive: `${colorBg} ${shadowOutsetSm} text-slate-500 font-bold hover:text-emerald-500 cursor-pointer`
};

const baseDbAllenamento={Spinta:{focus:"SPINTA (Petto, Spalle, Tricipiti)",esercizi:[{id:"e1",nome:"Panca piana bilanciere",anim:"chest_barbell_flat",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"BILANCIERE: Disteso su panca piana.",alternative:[{nome:"Chest Press Convergente",anim:"chest_machine_flat",note:"Stesso asse di spinta",dettaglio:"MACCHINARIO: Siediti in appoggio."},{nome:"Panca piana manubri",anim:"chest_db_flat",note:"Maggiore ROM",dettaglio:"MANUBRI: Disteso su panca piana."}]},{id:"e3",nome:"Panca inclinata manubri",anim:"chest_db_incline",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"MANUBRI: Panca a 30-45°.",alternative:[{nome:"Panca inclinata bilanciere",anim:"chest_barbell_incline",note:"Focus forza",dettaglio:"BILANCIERE: Panca inclinata."},{nome:"Chest Press Inclinata",anim:"chest_machine_incline",note:"Tensione costante",dettaglio:"MACCHINARIO: Usa la variante inclinata."}]},{id:"e4",nome:"Chest press",anim:"chest_machine_flat",fase:"Fase 2: Connessione",rep:"3-4 serie, 10-12 rep | Rec: 1.5 min",dettaglio:"MACCHINARIO: Esercizio guidato per isolare il pettorale.",alternative:[{nome:"Pectoral Machine",anim:"chest_pec_deck",note:"Isolamento sternale",dettaglio:"MACCHINARIO: Tieni i gomiti alti."},{nome:"Croci cavi seduto",anim:"chest_cable_seated",note:"Picco di tensione",dettaglio:"CAVI: Posiziona una panca al centro."}]},{id:"e5",nome:"Croci ai manubri",anim:"chest_flye_db",fase:"Fase 3: Pump",rep:"3-4 serie, 15 rep | Rec: 45 sec",dettaglio:"MANUBRI: Panca piana.",alternative:[{nome:"Croci cavi piana",anim:"chest_cable_flat",note:"Tensione continua",dettaglio:"CAVI: Dai cavi bassi."},{nome:"Pec Deck (Fly)",anim:"chest_pec_deck",note:"Pump controllato",dettaglio:"MACCHINARIO: Usa il pec deck."}]},{id:"e18",nome:"Lento avanti manubri",anim:"shoulder_db_seated",fase:"Fase 1: Forza Spalle",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"MANUBRI: Seduto a 90°.",alternative:[{nome:"Military Press",anim:"shoulder_military",note:"Carico massimo",dettaglio:"BILANCIERE: In piedi."},{nome:"Shoulder Press",anim:"shoulder_machine",note:"Spinta guidata",dettaglio:"MACCHINARIO: Esercizio di spinta verticale."}]},{id:"e20",nome:"Alzate laterali cavi",anim:"lateral_cable",fase:"Fase 3: Pump Spalle",rep:"3-4 serie, 10-12 rep | Rec: 45 sec",dettaglio:"CAVI: Tira il cavo lateralmente dal basso.",alternative:[{nome:"Alzate manubri",anim:"lateral_db",note:"Focus classico",dettaglio:"MANUBRI: In piedi."},{nome:"Alzate macchina",anim:"lateral_machine",note:"No compensazioni",dettaglio:"MACCHINARIO: Isola i deltoidi."}]},{id:"e22",nome:"Panca stretta",anim:"tricep_close_grip",fase:"Fase 1: Forza Tricipiti",rep:"4-5 serie, 6-8 rep | Rec: 2 min",dettaglio:"BILANCIERE: Presa stretta.",alternative:[{nome:"French Press",anim:"tricep_french_press",note:"Stretch capo lungo",dettaglio:"BILANCIERE EZ: Disteso."},{nome:"Dips parallele",anim:"tricep_dips",note:"Catena chiusa",dettaglio:"LIBERO/ZAVORRA: Scendi piegando le braccia."}]},{id:"e27",nome:"Push down corda",anim:"tricep_pushdown",fase:"Fase 3: Pump Tricipiti",rep:"3-4 serie, 12-15 rep | Rec: 45 sec",dettaglio:"CAVI: Spingi verso il basso e apri le estremità.",alternative:[{nome:"Push down sbarra",anim:"tricep_pushdown",note:"Carico maggiore",dettaglio:"CAVI: Sbarra dritta."},{nome:"Estensioni nuca",anim:"tricep_overhead",note:"Enfasi capo lungo",dettaglio:"CAVI: Dai cavi bassi dietro la testa."}]}]},Tirata:{focus:"TIRATA (Schiena, Bicipiti)",esercizi:[{id:"e6",nome:"Trazioni",anim:"back_pullup",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"CORPO LIBERO: Appeso alla sbarra.",alternative:[{nome:"Lat Machine Larga",anim:"back_pulldown",note:"Carichi modulabili",dettaglio:"MACCHINARIO: Presa larga prono."},{nome:"Lat Machine Triang.",anim:"back_pulldown_triangle",note:"Focus centrale",dettaglio:"MACCHINARIO: Triangolo presa stretta."}]},{id:"e7",nome:"Rematore bilanciere",anim:"back_row_barbell",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"BILANCIERE: Busto a 45°.",alternative:[{nome:"Rematore Manubrio",anim:"back_row_db",note:"Unilaterale",dettaglio:"MANUBRI: In appoggio su panca."},{nome:"Rematore T-Bar",anim:"back_t_bar",note:"Tirata esplosiva",dettaglio:"MACCHINARIO: Afferra il T-Bar e tira."}]},{id:"e9",nome:"Pulley seduto",anim:"back_pulley",fase:"Fase 2: Connessione",rep:"3-4 serie, 10-12 rep | Rec: 1.5 min",dettaglio:"CAVI: Seduto, tira la maniglia.",alternative:[{nome:"Chest Supported",anim:"back_chest_supported",note:"Zero carico lombare",dettaglio:"MACCHINARIO: Petto in appoggio."},{nome:"Seal Row",anim:"back_seal_row",note:"Puro isolamento",dettaglio:"BILANCIERE: Sdraiato prono su panca."}]},{id:"e10",nome:"Pullover ai cavi",anim:"back_pullover_cable",fase:"Fase 3: Pump",rep:"3-4 serie, 15 rep | Rec: 45 sec",dettaglio:"CAVI: Cavo alto con sbarra.",alternative:[{nome:"Pullover Macchina",anim:"back_pullover_cable",note:"Tensione continua",dettaglio:"MACCHINARIO: Macchina specifica."},{nome:"Pullover Manubrio",anim:"back_pullover_db",note:"Stretch toracico",dettaglio:"MANUBRI: Di traverso su panca."}]},{id:"e23",nome:"Curl bilanciere EZ",anim:"bicep_barbell",fase:"Fase 1: Forza Bicipiti",rep:"4-5 serie, 6-8 rep | Rec: 2 min",dettaglio:"BILANCIERE EZ: In piedi.",alternative:[{nome:"Curl Manubri Alt.",anim:"bicep_db",note:"Lavoro unilaterale",dettaglio:"MANUBRI: Fletti un braccio alla volta."},{nome:"Curl Cavo Basso",anim:"bicep_cable_bar",note:"Tensione continua",dettaglio:"CAVI: Cavo basso con sbarra corta."}]},{id:"e26",nome:"Curl cavi corda",anim:"bicep_cable",fase:"Fase 3: Pump Bicipiti",rep:"3-4 serie, 12-15 rep | Rec: 45 sec",dettaglio:"CAVI: Fune al cavo basso.",alternative:[{nome:"Curl Inclinata",anim:"bicep_incline_db",note:"Stretch capo lungo",dettaglio:"MANUBRI: Seduto su panca a 45°."},{nome:"Spider Curl",anim:"bicep_spider_curl",note:"Picco bicipite",dettaglio:"BILANCIERE: Petto in appoggio."}]}]},Gambe:{focus:"GAMBE E POLPACCI",esercizi:[{id:"e11",nome:"Squat bilanciere",anim:"leg_squat",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"BILANCIERE: Sui trapezi.",alternative:[{nome:"Front Squat",anim:"leg_squat",note:"Focus quadricipite",dettaglio:"BILANCIERE: Appoggiato sulle clavicole anteriori."},{nome:"Hack Squat Libero",anim:"leg_hack_barbell",note:"Carico posteriore",dettaglio:"BILANCIERE: Bilanciere dietro le gambe."},{nome:"Hack Squat Macchina",anim:"leg_hack_machine",note:"Zero carico lombare",dettaglio:"MACCHINARIO: Focus spinta."}]},{id:"e12",nome:"Hack squat",anim:"leg_hack_machine",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"MACCHINARIO: Poggia schiena.",alternative:[{nome:"Leg Press 45°",anim:"leg_press",note:"Isolamento pressa",dettaglio:"MACCHINARIO: Piedi bassi e stretti sulla pedana."},{nome:"Belt Squat",anim:"leg_belt_squat",note:"Zero stress lombare",dettaglio:"MACCHINARIO: Cintura pesata ai fianchi."}]},{id:"e14",nome:"Pressa 45°",anim:"leg_press",fase:"Fase 2: Connessione",rep:"4-5 serie, 10-12 rep | Rec: 1.5 min",dettaglio:"MACCHINARIO: Scendi portando le ginocchia verso il petto.",alternative:[{nome:"Affondi Manubri",anim:"leg_lunge",note:"Equilibrio",dettaglio:"MANUBRI: In camminata o sul posto."},{nome:"Bulgarian Squat",anim:"leg_bulgarian",note:"Unilaterale",dettaglio:"MANUBRI: Piede posteriore su panca."}]},{id:"e15",nome:"Leg extension",anim:"leg_extension",fase:"Fase 3: Pump Quad",rep:"3-4 serie, 15 rep | Rec: 45 sec",dettaglio:"MACCHINARIO: Distendi le gambe.",alternative:[{nome:"Sissy Squat",anim:"leg_sissy_squat",note:"Bodyweight stretch",dettaglio:"CORPO LIBERO: Blocca i polpacci."},{nome:"Step-up controllato",anim:"leg_lunge",note:"Lavoro concentrico",dettaglio:"MANUBRI: Sali su un box alto."}]},{id:"e13",nome:"Stacco rumeno",anim:"leg_deadlift",fase:"Fase 2: Conn. Femorali",rep:"3-4 serie, 10-12 rep | Rec: 1.5 min",dettaglio:"BILANCIERE: Scivola lungo le cosce.",alternative:[{nome:"Stacco Gambe Tese",anim:"leg_deadlift",note:"Stretch puro",dettaglio:"BILANCIERE: Ginocchia dritte."},{nome:"Good Morning",anim:"leg_deadlift",note:"Catena posteriore",dettaglio:"BILANCIERE: Sui trapezi."}]},{id:"e16",nome:"Leg curl sdraiato",anim:"leg_curl",fase:"Fase 3: Pump Femorali",rep:"3-4 serie, 15 rep | Rec: 45 sec",dettaglio:"MACCHINARIO: Prono, porta i talloni ai glutei.",alternative:[{nome:"Leg Curl Seduto",anim:"leg_curl_seduto",note:"Isolamento femorale",dettaglio:"MACCHINARIO: Isola il bicipite femorale."},{nome:"Glute Ham Raise",anim:"leg_curl",note:"Catena chiusa",dettaglio:"MACCHINARIO: Solleva il busto."}]},{id:"e17",nome:"Calf in piedi",anim:"leg_calf",fase:"Fase 3: Pump",rep:"3-4 serie, 20 rep | Rec: 45 sec",dettaglio:"LIBERO/MACCHINA: Scendi al massimo.",alternative:[{nome:"Calf Press",anim:"leg_calf_press",note:"Sovraccarico",dettaglio:"MACCHINARIO: Usa la Leg Press."},{nome:"Calf Seduto",anim:"leg_calf_seated",note:"Focus Soleo",dettaglio:"MACCHINARIO: Seduto, solleva i talloni."}]}]}};
const dbAlimenti={Pasto1:[{nome:"Avena + Whey + Burro",baseCarbo:12,pro:35,fat:15,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.5)}g Avena • ${Math.round(p*1.2)}g Whey • ${f}g Burro`},{nome:"Pancakes avena + Albume",baseCarbo:14,pro:30,fat:10,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.5)}g Farina Avena • ${Math.round(p*10)}g Albume • ${f}g Burro`},{nome:"Uova intere + Segale + Avocado",baseCarbo:10,pro:25,fat:22,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*2)}g Pane Segale • ${Math.round(p/6)} Uova • ${Math.round(f*6)}g Avocado`}],Pasto2:[{nome:"Riso Basmati + Pollo + Olio EVO",baseCarbo:20,pro:40,fat:12,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.25)}g Riso Basmati • ${Math.round(p*4)}g Pollo • ${f}g Olio`},{nome:"Pasta di Semola + Carne Magra",baseCarbo:20,pro:45,fat:10,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.3)}g Pasta • ${Math.round(p*4.5)}g Macinato • ${f}g Olio`},{nome:"Patate dolci + Salmone",baseCarbo:16,pro:40,fat:20,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*4.5)}g Patate • ${Math.round(p*4.5)}g Salmone`}],Pasto3:[{nome:"Yogurt Greco + Mandorle",baseCarbo:5,pro:20,fat:15,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(p*10)}g Yogurt Greco 0% • ${Math.round(f*2)}g Mandorle`},{nome:"Fiocchi di latte + Burro",baseCarbo:4,pro:25,fat:18,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(p*8)}g Fiocchi Latte • ${f}g Burro Arachidi`},{nome:"Parmigiano + Wasa",baseCarbo:8,pro:16,fat:14,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(p*3)}g Parmigiano • ${Math.round(c*1.5)}g Wasa`}],PostWorkout:[{nome:"Crema di Riso + Whey",baseCarbo:16,pro:35,fat:1,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.2)}g Crema Riso • ${Math.round(p*1.1)}g Isolate`},{nome:"Corn Flakes + Whey",baseCarbo:16,pro:35,fat:1,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.15)}g Corn Flakes • ${Math.round(p*1.1)}g Isolate`},{nome:"Gallette + Bresaola",baseCarbo:15,pro:30,fat:3,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c/8)} Gallette Riso • ${Math.round(p*3)}g Bresaola`}]};
const misureBase = [{ id: 'peso', label: "Peso", unit: "kg" }, { id: 'petto', label: "Petto", unit: "cm" }, { id: 'spalle', label: "Spalle", unit: "cm" }, { id: 'braccia', label: "Braccia", unit: "cm" }, { id: 'gambe', label: "Gambe", unit: "cm" }, { id: 'glutei', label: "Glutei", unit: "cm" }];
const misureBIA = [{ id: 'vita', label: "Circ. Vita", unit: "cm" }, { id: 'bodyFat', label: "Massa Grassa", unit: "%" }, { id: 'bodyWater', label: "Acqua Corporea", unit: "%" }, { id: 'muscleMass', label: "Massa Musc.", unit: "%" }];

const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0; const end = value;
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

const Skeleton = ({ className }: { className: string }) => (<div className={`animate-pulse ${UI.panelInset} ${className}`}></div>);

const HumanHeatmap = ({ scheda }: { scheda: string }) => {
  const getActive = (part: string) => {
    if (scheda === 'Spinta' && ['chest', 'shoulders', 'triceps'].includes(part)) return 'url(#gradPrimary)'; 
    if (scheda === 'Tirata' && ['back', 'biceps'].includes(part)) return 'url(#gradPrimary)';
    if (scheda === 'Gambe' && ['legs', 'calves', 'glutes'].includes(part)) return 'url(#gradPrimary)';
    return '#334155'; 
  };
  return (
    <div className="w-full flex justify-center py-8 mb-5 relative bg-slate-800 rounded-[1.5rem] shadow-[inset_4px_4px_10px_rgba(0,0,0,0.3),inset_-4px_-4px_10px_rgba(255,255,255,0.05)] border border-slate-700">
      <svg width="120" height="180" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
         <defs>
            <linearGradient id="gradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#818cf8" />
               <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
         </defs>
         <circle cx="50" cy="20" r="12" fill="#1e293b" stroke={getActive('head')} strokeWidth="3" className="transition-all duration-700" />
         <path d="M30 40 Q50 35 70 40 L75 60 L25 60 Z" fill={getActive('chest')} className="transition-colors duration-700" />
         <circle cx="25" cy="45" r="8" fill={getActive('shoulders')} className="transition-colors duration-700" />
         <circle cx="75" cy="45" r="8" fill={getActive('shoulders')} className="transition-colors duration-700" />
         <rect x="15" y="50" width="10" height="30" rx="5" fill={getActive('triceps')} className="transition-colors duration-700" />
         <rect x="75" y="50" width="10" height="30" rx="5" fill={getActive('triceps')} className="transition-colors duration-700" />
         <rect x="13" y="82" width="10" height="25" rx="5" fill={getActive('biceps')} className="transition-colors duration-700" />
         <rect x="77" y="82" width="10" height="25" rx="5" fill={getActive('biceps')} className="transition-colors duration-700" />
         <path d="M32 62 L68 62 L62 110 L38 110 Z" fill={scheda === 'Tirata' ? getActive('back') : '#334155'} className="transition-colors duration-700" />
         <rect x="35" y="115" width="12" height="40" rx="6" fill={getActive('legs')} className="transition-cozlors duration-700" />
         <rect x="53" y="115" width="12" height="40" rx="6" fill={getActive('legs')} className="transition-colors duration-700" />
         <rect x="35" y="158" width="10" height="35" rx="5" fill={getActive('calves')} className="transition-colors duration-700" />
         <rect x="55" y="158" width="10" height="35" rx="5" fill={getActive('calves')} className="transition-colors duration-700" />
      </svg>
    </div>
  );
};

const SvgLineChart = ({ data, label }: { data: number[], label: string }) => {
  if (!data || data.length === 0) return <p className="text-[10px] text-slate-400 italic font-bold p-4 text-center">Dati insufficienti.</p>;
  if (data.length === 1) return <p className="text-[10px] text-slate-400 italic font-bold p-4 text-center">Un solo dato.</p>;
  const maxVal = Math.max(...data); const minVal = Math.min(...data); const range = maxVal - minVal === 0 ? 10 : maxVal - minVal;
  const width = 300, height = 100, padding = 20;
  const points = data.map((val, i) => `${padding + (i / (data.length - 1)) * (width - padding * 2)},${height - padding - ((val - minVal) / range) * (height - padding * 2)}`).join(" ");
  return (
    <div className={UI.panelInset + " mt-4 p-4"}>
       <span className={UI.label + " !text-indigo-500 mb-4"}>{label} - Trend</span>
       <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-md">
          <polyline points={points} fill="none" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {data.map((val, i) => {
            const x = padding + (i / (data.length - 1)) * (width - padding * 2); const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
            return <g key={i}><circle cx={x} cy={y} r="5" fill="#E0E5EC" stroke="#6366f1" strokeWidth="2" /><text x={x} y={y - 12} fill="#64748b" fontSize="10" textAnchor="middle" fontWeight="bold">{val}</text></g>;
          })}
       </svg>
    </div>
  );
};

const SvgBodyCompositionWheel = ({ data, altezza, eta }: { data: Record<string, string>, altezza: number | "", eta: number | "" }) => {
  const w = Number(data.peso) || 0; const h = Number(altezza) || 0; const a = Number(eta) || 0;
  const bf = Number(data.bodyFat) || 0; const bw = Number(data.bodyWater) || 0; const mm = Number(data.muscleMass) || 0;
  const bmi = (w > 0 && h > 0) ? (w / Math.pow(h / 100, 2)).toFixed(1) : '0';
  const bmr = (w > 0 && h > 0 && a > 0) ? Math.round((10 * w) + (6.25 * h) - (5 * a) + 5) : 0;
  const radius = 160; const strokeW = 45; const c = 2 * Math.PI * radius; const seg = c / 6;
  const getLabelPos = (angleDeg: number) => { const rad = (angleDeg - 90) * Math.PI / 180; return { x: 250 + radius * Math.cos(rad), y: 250 + radius * Math.sin(rad) }; };
  const sections = [ { label: 'BMI', val: bmi, color: '#c084fc', angle: 0 }, { label: 'BMR', val: bmr > 0 ? bmr : '-', color: '#38bdf8', angle: 60 }, { label: 'MUSCOLO', val: mm > 0 ? `${mm}%` : '-', color: '#60a5fa', angle: 120 }, { label: 'ACQUA', val: bw > 0 ? `${bw}%` : '-', color: '#a855f7', angle: 180 }, { label: 'GRASSO', val: bf > 0 ? `${bf}%` : '-', color: '#818cf8', angle: 240 }, { label: 'PESO', val: w > 0 ? w : '-', color: '#94a3b8', angle: 300 } ];
  
  return (
    <div className={UI.panelInset + " relative w-full max-w-[320px] mx-auto h-[350px] flex items-center justify-center overflow-hidden mt-6 !p-0"}>
       <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-md z-10 p-6">
          <g transform="translate(250, 250) rotate(-120)">
             {sections.map((sec, i) => <circle key={i} cx="0" cy="0" r={radius} fill="none" stroke={sec.color} strokeWidth={strokeW} strokeDasharray={`${seg - 8} ${c}`} strokeDashoffset={-(i * seg)} className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer" strokeLinecap="round" />)}
          </g>
          {sections.map((sec, i) => {
             const pos = getLabelPos(sec.angle);
             return (
               <g key={`t-${i}`} className="pointer-events-none">
                 <text x={pos.x} y={pos.y - 12} fill="#475569" fontSize="16" textAnchor="middle" fontWeight="bold" className="tracking-widest" style={{textShadow: "0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.8)"}}>{sec.label}</text>
                 <text x={pos.x} y={pos.y + 16} fill="#1e293b" fontSize="32" textAnchor="middle" fontWeight="900" style={{textShadow: "0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.8)"}}>{sec.val}</text>
               </g>
             )
          })}
          <g transform="translate(250, 250) scale(1.1) translate(-250, -250)">
             <defs>
               <linearGradient id="gradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
               </linearGradient>
             </defs>
             <path d="M250,130 C240,130 238,140 238,145 C238,152 242,155 247,158 C235,163 225,175 222,190 C217,205 212,240 212,240 L220,245 C220,245 230,205 235,195 C235,230 233,260 233,260 L238,350 L245,350 L245,260 L255,260 L255,350 L262,350 L267,260 C267,260 265,230 265,195 C270,205 280,245 280,245 L288,240 C288,240 283,195 278,190 C275,175 265,163 253,158 C258,155 262,152 262,145 C262,140 260,130 250,130 Z" fill="url(#gradIndigo)" stroke="#fff" strokeWidth="6"/>
          </g>
       </svg>
    </div>
  );
};

export default function Home() {
  const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  const [appState, setAppState] = useState<'HOME' | 'PROTOCOL'>('HOME');
  
  // --- STATO SPLASH SCREEN INTRO ---
  const [mostraIntro, setMostraIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostraIntro(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);
  // --- STATI LOGIN E AUTENTICAZIONE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const eseguiLogin = async () => {
    setLoginError(""); // Resetta errori precedenti
    
    if (!loginEmail || !loginPassword) {
      setLoginError("Inserisci email e password.");
      return;
    }

    // 🌟 GOD MODE - BACKUP FAILSAFE (Se Supabase dovesse essere offline, tu entri comunque)
    if (loginEmail === "leo@admin.com" && loginPassword === "omnifit2026") {
      setUtenteCorrente("Leonardo");
      setIsAuthenticated(true);
      return;
    }

    setIsDataLoading(true);
    
    // Controlla se l'utente esiste nella tabella appena creata
    const { data, error } = await supabase
      .from('utenti_premium')
      .select('*')
      .eq('email', loginEmail)
      .eq('password', loginPassword)
      .single();

    setIsDataLoading(false);

    if (error || !data) {
      setLoginError("Credenziali non valide o account inesistente.");
      return;
    }

    // Controllo Abbonamento Scaduto
    const oggi = new Date();
    const scadenza = new Date(data.data_scadenza);
    if (oggi > scadenza) {
      setLoginError("Accesso negato: Abbonamento scaduto.");
      return;
    }

    // LOGIN COMPLETATO CON SUCCESSO
    setUtenteCorrente(data.nome_atleta);
    
    // 1. Forza la tendina a mostrare SOLO il nome del cliente (sparisce Leonardo)
    setListaAtleti([data.nome_atleta]); 
    
    setIsAuthenticated(true);
    
    // 2. Apriamo il Wizard (Form Domande) invece di buttarlo negli esercizi
    setModalWizard(true);
  };

  // --- STATI ADMIN CONTROL ROOM ---
  const isAdmin = loginEmail === "leo@admin.com";
  const [showAdmin, setShowAdmin] = useState(false);
  const [ricercaAdmin, setRicercaAdmin] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [adminUtenti, setAdminUtenti] = useState<any[]>([]);
  const [nuovoUtentePremium, setNuovoUtentePremium] = useState({ email: '', password: '', nome_atleta: '', scadenza: '' });

  const apriAdmin = async () => {
    const { data } = await supabase.from('utenti_premium').select('*').order('data_scadenza', { ascending: true });
    if (data) setAdminUtenti(data);
    setShowAdmin(true);
  };
  
  // NAVIGAZIONE BOTTOM BAR
  const [mobileTab, setMobileTab] = useState<'TELEMETRIA' | 'COACH' | 'TURNI' | 'NUTRIZIONE' | 'ALLENAMENTO'>('ALLENAMENTO');
  
  // STATI TIMER FOCUS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [focusWorkout, setFocusWorkout] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const totalTimeRef = useRef(0);

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
  const [inizio1, setInizio1] = useState(''); const [fine1, setFine1] = useState('');
  const [inizio2, setInizio2] = useState(''); const [fine2, setFine2] = useState('');
  const [quandoTiAlleni, setQuandoTiAlleni] = useState('sera'); 
  const [digiuno, setDigiuno] = useState(false); 
  const [usaIntegratori, setUsaIntegratori] = useState(true);
  const [hudActive, setHudActive] = useState<{name: string, x: number, y: number} | null>(null);
  const [winSize, setWinSize] = useState({w: 1000, h: 800});
  const [isHudClosing, setIsHudClosing] = useState(false);

  useEffect(() => {
    if (hudActive) {
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    }
  }, [hudActive]);

  // FUNZIONE MAGICA: Aggiunge i pallini HUD accanto agli integratori
const renderDescrizioneConHUD = (testo: string) => {
  if (!testo) return null;
  
  // Le parole magiche che attivano l'ologramma
  const integratoriChiave = ["Ciclodestrine", "EAA", "Creatina", "L-Citrullina", "Ashwagandha", "Omega-3", "Vitamina D3", "Proteine", "Whey", "Isolate"];
  
  return testo.split('\n').map((linea, index) => {
    const integratoreTrovato = integratoriChiave.find(int => linea.includes(int));
    
    if (integratoreTrovato) {
      return (
        <span key={index} className="block mb-1 relative flex items-center">
          <span>{linea}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              setHudActive({ 
                name: integratoreTrovato, 
                x: rect.left + (rect.width / 2), 
                y: rect.top + (rect.height / 2) 
              });
            }}
            className="ml-2.5 w-4 h-4 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 shadow-[0_0_8px_rgba(249,115,22,0.6)] flex items-center justify-center hover:scale-125 transition-transform cursor-pointer border-none flex-shrink-0"
            title={`Mostra ologramma ${integratoreTrovato}`}
          >
            <span className="text-[9px] text-white font-black drop-shadow-md">✦</span>
          </button>
        </span>
      );
    }
    return <span key={index} className="block mb-1">{linea}</span>;
  });
};
  
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
  const [pastiSelezionati, setPastiSelezionati] = useState<Record<string, number>>({ Pasto1: 0, Pasto2: 0, Pasto3: 0, PostWorkout: 0 });
  const [formAInuovo, setFormAInuovo] = useState({ nome: '', cho: '', pro: '', fat: '' });
  const [isCalculatingAI, setIsCalculatingAI] = useState(false);
  const [pastiCustom, setPastiCustom] = useState<Record<string, {attivo: boolean, cho: string, pro: string, fat: string, nome: string}>>({ Pasto1: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, Pasto2: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, Pasto3: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, PostWorkout: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, Integrazione: { attivo: false, cho: '', pro: '', fat: '', nome: '' } });
  const [modalAlimento, setModalAlimento] = useState(false);
  const [dispensa, setDispensa] = useState<Array<{id: string, nome: string, cho: string, pro: string, fat: string, tipo: 'alimento' | 'integratore'}>>([]);
  const [modalDispensa, setModalDispensa] = useState(false);
  const [modalScegliDispensa, setModalScegliDispensa] = useState<string | null>(null);
  const [filtroDispensa, setFiltroDispensa] = useState<'alimento' | 'integratore'>('alimento');
  const [ricercaDispensa, setRicercaDispensa] = useState("");
  const [categoriaDaCambiare, setCategoriaDaCambiare] = useState<keyof typeof dbAlimenti>('Pasto1');
  const [isCalculatingMacro, setIsCalculatingMacro] = useState<Record<string, boolean>>({});
  const [chatLog, setChatLog] = useState<{role: 'user' | 'ai', text: string}[]>([{ role: 'ai', text: 'Ciao! Sono il tuo Coach IA. Scrivimi cosa hai mangiato per stimare i macro!' }]);
  const [inputChat, setInputChat] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fileAllegato, setFileAllegato] = useState<{data: string, mimeType: string, nome: string} | null>(null);
  const [fileCustomPasto, setFileCustomPasto] = useState<Record<string, {data: string, mimeType: string, nome: string} | null>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [storicoMisure, setStoricoMisure] = useState<any[]>([]);
  const [vistaTelemetria, setVistaTelemetria] = useState<'FORM' | 'STORICO'>('FORM');
  const [ricercaTelemetria, setRicercaTelemetria] = useState("");
  const [meseApertoTele, setMeseApertoTele] = useState<string | null>(null);
  const [vistaGraficiCarichi, setVistaGraficiCarichi] = useState(false);
  const [esercizioGraficoSelezionato, setEsercizioGraficoSelezionato] = useState<string>("e1");

  // LOGICA TIMER FOCUS
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60); const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apriFocusAllenamento = (es: any, recuperoStr: string) => {
    setFocusWorkout(es);
    let sec = 90; // Default 1.5 min
    if (recuperoStr.includes('min')) {
      const match = recuperoStr.match(/([\d.]+)\s*min/);
      if (match) sec = parseFloat(match[1]) * 60;
    } else if (recuperoStr.includes('sec')) {
      const match = recuperoStr.match(/(\d+)\s*sec/);
      if (match) sec = parseInt(match[1], 10);
    }
    totalTimeRef.current = sec;
    setTimeLeft(sec);
    setTimerActive(false);
  };

  const calcolaTempoScheda = () => fastWorkout ? 45 : 75;

  useEffect(() => { if (tipoTurno === 'diretto' && quandoTiAlleni === 'pausa') setQuandoTiAlleni('sera'); }, [tipoTurno, quandoTiAlleni]);
  useEffect(() => { setGerardoCarbOverride(null); }, [giornoCalendario]);
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
    setUtenteCorrente(nomeAtleta); setProtocolloAttivo(objScelto); setTipoDieta(dietaScelta);
    if (nomeAtleta === "Leonardo") { setEta(41); setAltezza(175); setStileVita("Attivo (es. Vendita al dettaglio, in piedi)"); setTipoTurno("spezzato"); }

    const { data } = await supabase.from("check_utente").select("*").eq("nome_utente", nomeAtleta).order("data", { ascending: false });
    if (data && data.length > 0) {
      const validRec = data.find(d => d.peso || (d.circonferenze && typeof d.circonferenze === 'object' && Object.keys(d.circonferenze).length > 0));
      if (validRec) {
        if(nomeAtleta !== "Leonardo") setEta(validRec.eta || "");
        if(nomeAtleta !== "Leonardo") setAltezza(validRec.altezza || "");
        const circ = typeof validRec.circonferenze === 'string' ? JSON.parse(validRec.circonferenze) : (validRec.circonferenze || {});
        setBiometria({ peso: validRec.peso?.toString() || '', petto: circ.petto || '', spalle: circ.spalle || '', braccia: circ.braccia || '', gambe: circ.gambe || '', glutei: circ.glutei || '', vita: circ.vita || '', bodyFat: circ.bodyFat || '', bodyWater: circ.bodyWater || '', muscleMass: circ.muscleMass || '' });
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
      setStoricoSessioni(resSess.data.map(d => ({ data: new Date(d.data).toLocaleDateString('it-IT'), giorno: d.giornata.split(" - ")[0], scheda: d.giornata.split(" - ")[1], carichi: typeof d.dettagli_esercizi === 'string' ? JSON.parse(d.dettagli_esercizi) : d.dettagli_esercizi, oraId: new Date(d.data).getTime() })));
    } else { setStoricoSessioni([]); }
    
    setIsDataLoading(true); setAppState('PROTOCOL'); setTimeout(() => setIsDataLoading(false), 800);
  };

  const eliminaAtleta = async () => {
    if (utenteCorrente === "Leonardo") { alert("Impossibile eliminare il Paziente Zero."); return; }
    if (confirm(`Eliminare definitivamente ${utenteCorrente}?`)) {
      await supabase.from("check_utente").delete().eq("nome_utente", utenteCorrente);
      await supabase.from("storico_allenamenti").delete().eq("nome_utente", utenteCorrente);
      setListaAtleti(prev => prev.filter(a => a !== utenteCorrente));
      setUtenteCorrente("Leonardo");
    }
  };

  const generaAllenamentoDinamico = () => {
     const plan = JSON.parse(JSON.stringify(baseDbAllenamento)); 
     const isOver40 = Number(eta) > 40; const isShred = protocolloAttivo === 'Shred'; const isHeavyJob = stileVita.includes("Attivo") || stileVita.includes("Fisico");
     const fatNum = Number(biometria.bodyFat) || 0; const pesoNum = Number(biometria.peso) || 0; const highFat = fatNum > 15;
     const activeDieta = (protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')) ? 'Equilibrata' : tipoDieta;
     const isKetoOrLowCarb = activeDieta === 'Keto' || activeDieta === 'LowCarb'; const isOverweightMechanically = fatNum > 20 || pesoNum > 95; const needsLumbarProtection = isOver40 && stileVita.includes("Fisico");

     const swapToAlternative = (ex: any, partialName: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const alt = ex.alternative.find((a: any) => a.nome.toLowerCase().includes(partialName.toLowerCase()));
        if (alt) { ex.nome = alt.nome; ex.anim = alt.anim; ex.dettaglio = alt.dettaglio; }
     };

     Object.keys(plan).forEach(sch => {
        let methodCycleGerardo = 0; 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plan[sch].esercizi.forEach((ex: any) => {
           if (protocolloAutore === 'Gerardo Calvo (Reset Ormonale)') {
               if (methodCycleGerardo === 0) ex.rep = "7x10 | Rec: 30 sec (15RM)";
               else if (methodCycleGerardo === 1) ex.rep = "5x5 | Rec: 90 sec (Neurale)";
               else ex.rep = "3x10 (5 N + 5 Ecc) | Rec: 60s";
               methodCycleGerardo = (methodCycleGerardo + 1) % 3;
           } else if (protocolloAutore === 'Aldo Masolo (Reset Metabolico)') {
               ex.rep = "3x8-10 | Rec: 90s (NO Cedimento)";
               if (!eserciziModificati[ex.id]) {
                   if (ex.id === "e11") swapToAlternative(ex, "Hack Squat Macchina");
                   if (ex.id === "e1") swapToAlternative(ex, "Chest Press Convergente");
               }
           } else {
               if (isShred || highFat) {
                  ex.rep = ex.rep.replace("4-6 rep", "8-10 rep").replace("6-8 rep", "10-12 rep").replace("4-5 serie", "2-3 serie").replace("3-4 serie", "2 serie").replace("Rec: 1.5 min", "Rec: 2 min").replace("Rec: 45 sec", "Rec: 1 min");
               } else if (isOver40 && isHeavyJob) { ex.rep = ex.rep.replace("4-5 serie", "3-4 serie"); }
    
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

  const getDataGraficoEsercizio = () => {
    const dataPoints: number[] = [];
    storicoSessioni.forEach(sess => {
      if (sess.carichi[esercizioGraficoSelezionato]) {
        dataPoints.push(Math.max(...sess.carichi[esercizioGraficoSelezionato].split(' | ').map(Number)));
      }
    });
    return dataPoints;
  };

  const gestisciCaricamentoPartenza = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onloadend = () => { setFotoPartenza({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); }; reader.readAsDataURL(file); };
  const gestisciCaricamentoArrivo = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onloadend = () => { setFotoArrivo({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); }; reader.readAsDataURL(file); };
  const gestisciCaricamentoFile = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onloadend = () => { setFileAllegato({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); }; reader.readAsDataURL(file); };
  const gestisciCaricamentoFilePasto = (e: React.ChangeEvent<HTMLInputElement>, cat: string) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onloadend = () => { setFileCustomPasto(prev => ({...prev, [cat]: { data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }})); }; reader.readAsDataURL(file); };

  const analizzaObiettivoWizard = async () => {
    setLoadingWizard(true);
    try {
      const contesto = `Sei un Coach IA. Analizza: Nome: ${datiWizard.nome}, Età: ${datiWizard.eta}, Altezza: ${datiWizard.altezza}cm, Peso: ${datiWizard.peso}kg. Lifestyle: ${datiWizard.stileVita}. Obiettivo: ${datiWizard.obiettivo}. Dieta: ${datiWizard.dieta}. Fornisci un verdetto.`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { message: "Analizza il mio profilo.", context: contesto }; const files = [];
      if (fotoPartenza) files.push({ data: fotoPartenza.data, mimeType: fotoPartenza.mimeType, label: "Partenza" });
      if (fotoArrivo) files.push({ data: fotoArrivo.data, mimeType: fotoArrivo.mimeType, label: "Obiettivo" });
      if (files.length > 0) payload.files = files; 
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json(); setRispostaWizard(data.reply); setStepWizard(3);
    } catch (e) { console.log(e); setRispostaWizard("Errore di rete. Riprova."); setStepWizard(3); }
    setLoadingWizard(false);
  };

  const salvaProfiloWizard = async () => {
    const payload = { nome_utente: datiWizard.nome, eta: Number(datiWizard.eta), altezza: Number(datiWizard.altezza), peso: Number(datiWizard.peso), circonferenze: { profilo: { stileVita: datiWizard.stileVita, obiettivo: datiWizard.obiettivo, dieta: (datiWizard.autore.includes('Masolo') || datiWizard.autore.includes('Calvo')) ? 'Equilibrata' : datiWizard.dieta, autore: datiWizard.autore, metabolismoBloccato: datiWizard.metabolismoBloccato } }, data: new Date().toISOString() };
    await supabase.from("check_utente").insert([payload]);
    setListaAtleti(prev => [...prev, datiWizard.nome]); setModalWizard(false); setStepWizard(1);
    caricaProfilo(datiWizard.nome, datiWizard.obiettivo, datiWizard.dieta);
  };

  const inviaMessaggioIA = async () => {
    if (!inputChat.trim() && !fileAllegato) return;
    const msg = inputChat || "Analizza file.";
    setChatLog(prev => [...prev, { role: 'user', text: fileAllegato ? `📎 [${fileAllegato.nome}] ${msg}` : msg }]);
    setInputChat(""); setFileAllegato(null); setIsTyping(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { message: msg, context: `SEI IL COACH IA. Utente: ${utenteCorrente}, Obiettivo: ${protocolloAttivo}, Dieta: ${tipoDieta}. Estrai Macro e scrivi alla fine: [MAGIC_MACRO | PASTO_TARGET | cho | pro | fat | NOME]. PASTO_TARGET può essere Pasto1, Pasto2, Pasto3, PostWorkout o Integrazione. Se è Integrazione, analizza i macro e scrivi il tuo parere se sono adatti alla sua fase attuale.` };
      if (fileAllegato) payload.file = { data: fileAllegato.data, mimeType: fileAllegato.mimeType };
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json(); let responseText = data.reply;
      const match = responseText.match(/\[MAGIC_MACRO\s*\|\s*(Pasto1|Pasto2|Pasto3|PostWorkout|Integrazione)\s*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([^\]]+)\]/i);
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
  if(!nomeCibo.trim() && !fileCustomPasto[cat]) return alert("Inserisci il nome del prodotto o allega una foto.");
  
  setIsCalculatingMacro(prev => ({...prev, [cat]: true}));
  
  try {
    const baseMeal = dbAlimenti[cat as keyof typeof dbAlimenti]?.[pastiSelezionati[cat]];
    const contestoConsiglio = baseMeal ? baseMeal.nome : "Nessun consiglio specifico";

    const payload: any = { message: `
      Prodotto richiesto: "${nomeCibo || 'Foto allegata'}".
      
      REGOLE:
      1. Se l'utente ha scritto i grammi nel nome (es. "30g Mandorle"), calcola i macro esatti per quel peso.
      2. Se NON ci sono i grammi, verifica se fa parte del pasto consigliato: "${contestoConsiglio}". Se sì, deduci una grammatura logica per il pasto.
      3. Se NON ci sono i grammi ed è diverso, calcola per 100g.
      4. Se ti invio "Foto allegata" e nessun nome, scrivi tu il nome di ciò che vedi nell'immagine.
      
      Stringa esatta: [MAGIC_MACRO | ${cat} | cho | pro | fat | Nome Completo Del Prodotto]
    `};

    if (fileCustomPasto[cat]) { 
      payload.file = { data: fileCustomPasto[cat]!.data, mimeType: fileCustomPasto[cat]!.mimeType }; 
    }
    
    const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json();
    
    // REGEX CORRETTA: Ora usa la "barra" (|) per non mangiarsi le lettere del nome!
    const match = data.reply.match(/\[MAGIC_MACRO\s*\|\s*([^|]+)\s*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([^\]]+)\]/i);
    
    if(match) {
      updateCustomMeal(cat, 'cho', Math.round(parseFloat(match[2].replace(',','.'))).toString());
      updateCustomMeal(cat, 'pro', Math.round(parseFloat(match[3].replace(',','.'))).toString());
      updateCustomMeal(cat, 'fat', Math.round(parseFloat(match[4].replace(',','.'))).toString());
      updateCustomMeal(cat, 'nome', match[5].trim());
      
      setFileCustomPasto(prev => ({...prev, [cat]: null}));
    } else { 
      alert("L'A.I. non ha formattato i dati correttamente. Riprova."); 
    }
  } catch(e) { 
    console.log(e); 
    alert("Errore di rete."); 
  }
  setIsCalculatingMacro(prev => ({...prev, [cat]: false}));
};

  const valutaCheckFisico = async () => {
    const { peso } = biometria;
    if (peso && eta && altezza) {
      const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo, dieta: tipoDieta, autore: protocolloAutore, metabolismoBloccato } }, data: new Date().toISOString() };
      const { error } = await supabase.from("check_utente").insert([payload]);
      if (error) alert("Errore DB: " + error.message);
      else { alert(`Sistema Aggiornato.`); caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta); } 
    } else { alert("Peso, Età e Altezza sono obbligatori per il calcolo base."); }
  };

  const eliminaMisurazione = async (id: string) => { if(confirm("Eliminare misurazione?")) { await supabase.from("check_utente").delete().eq("id", id); caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta); } };
  const getUltimoCarico = (idEs: string) => { for (let i = storicoSessioni.length - 1; i >= 0; i--) { if (storicoSessioni[i].carichi[idEs]) return storicoSessioni[i].carichi[idEs]; } return '0'; };
  
  const getNumeroSet = (repStr: string) => {
    const matchX = repStr.match(/(\d+)x/i); 
    if (matchX) return parseInt(matchX[1], 10);
    const matchSerie = repStr.match(/(\d+)-?(\d+)?\s*serie/i);
    if (matchSerie) return matchSerie[2] ? parseInt(matchSerie[2], 10) : parseInt(matchSerie[1], 10);
    return 3; 
  };

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apriSwapEsercizio = (es: any) => { 
    const nomeAttuale = eserciziModificati[es.id] || es.nome;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tutteLeOpzioni = [ { nome: es.nome, anim: es.anim, dettaglio: es.dettaglio, note: "Originale" }, ...es.alternative ];
    const opzioniDisponibili = tutteLeOpzioni.filter(opt => opt.nome !== nomeAttuale);
    setEsercizioDaCambiare({ id: es.id, nomeAttuale: nomeAttuale, alternative: opzioniDisponibili }); setModalEsercizio(true); 
  };
  const confermaSwapEsercizio = (nuovoNome: string) => { setEserciziModificati({ ...eserciziModificati, [esercizioDaCambiare.id]: nuovoNome }); setModalEsercizio(false); };
  const apriSwapAlimento = (categoria: string) => { setCategoriaDaCambiare(categoria as keyof typeof dbAlimenti); setModalAlimento(true); };
  const confermaSwapAlimento = (index: number) => { setPastiSelezionati({ ...pastiSelezionati, [categoriaDaCambiare]: index }); setModalAlimento(false); };

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
      settimaneDiReverse = Math.floor((oggi.getTime() - primaMisura.getTime()) / (1000 * 60 * 60 * 24 * 7));
  }
  const grassoStimato = Number(biometria.bodyFat) || 0;
  if (protocolloAutore === 'Aldo Masolo (Reset Metabolico)' || metabolismoBloccato) { baseTdee = baseTdee + (settimaneDiReverse * 100); } 
  else if (protocolloAttivo === 'Shred') { baseTdee = Math.round(baseTdee * 0.80); } 
  else if (protocolloAttivo === 'Massa') { if (grassoStimato > 15 || pesoNum > 85) { baseTdee = Math.round(baseTdee * 1.05); } else { baseTdee = Math.round(baseTdee * 1.15); } }

  const tdee = baseTdee;
  let targetPro = pesoNum * 2.2;
  if (protocolloAttivo === 'Shred') targetPro = pesoNum * 2.5;

  let targetCho = 0; let targetFat = 0;
  const activeDieta = (protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')) ? 'Equilibrata' : tipoDieta;

  switch (activeDieta) {
      case 'Keto': targetCho = 30; targetPro = pesoNum * 2.5; targetFat = (tdee - (targetCho * 4) - (targetPro * 4)) / 9; break;
      case 'LowCarb': targetCho = pesoNum * 1.5; targetPro = pesoNum * 2.5; targetFat = (tdee - (targetCho * 4) - (targetPro * 4)) / 9; break;
      case 'Zona': targetCho = (tdee * 0.40) / 4; targetPro = (tdee * 0.30) / 4; targetFat = (tdee * 0.30) / 9; break;
      case 'HighCarb': targetFat = Math.max(pesoNum * 0.8, 40); targetPro = pesoNum * 2.0; targetCho = (tdee - (targetFat * 9) - (targetPro * 4)) / 4; break;
      case 'Equilibrata': default: targetFat = pesoNum * 1.0; targetCho = (tdee - (targetFat * 9) - (targetPro * 4)) / 4; break;
  }

  if (protocolloAutore === 'Gerardo Calvo (Reset Ormonale)') {
      const hpo = Math.max((Number(altezza) || 175) - 100, 60);
      targetPro = hpo * 2.2; targetFat = 65; 
      const dayIndex = giorniSettimana.indexOf(giornoCalendario);
      const autoCarb = [150, 250, 350][dayIndex % 3] || 150;
      targetCho = gerardoCarbOverride !== null ? gerardoCarbOverride : autoCarb;
  } else if (protocolloAutore === 'Aldo Masolo (Reset Metabolico)' || metabolismoBloccato) {
      targetFat = 70; targetPro = pesoNum * 1.8; targetCho = Math.max(0, (tdee - (targetFat * 9) - (targetPro * 4)) / 4);
  }

  if (utenteCorrente === "Leonardo" && activeDieta === "Equilibrata" && protocolloAutore === "Nessuno") {
      const mult = protocolloAttivo === 'Shred' ? 2.5 : (protocolloAttivo === 'Massa' ? 5 : 4);
      targetCho = pesoNum * mult; targetPro = protocolloAttivo === 'Shred' ? (pesoNum * 2.5) : (pesoNum * 2.2); targetFat = pesoNum * 1.0;
  }

  let intraCho = protocolloAttivo === 'Shred' ? Math.round(pesoNum * 0.3) : Math.round(pesoNum * 0.5);
if (activeDieta === 'Keto') intraCho = 0; else if (activeDieta === 'LowCarb') intraCho = Math.round(pesoNum * 0.2);
let intraPro = 15;
let intraFat = 0;

// LOGICA "REAL FOOD ONLY": Se l'utente spegne gli integratori, azzeriamo l'intra-workout. 
// Il sistema spalmerà automaticamente questi macro sui pasti solidi!
if (!usaIntegratori) {
  intraCho = 0;
  intraPro = 0;
  intraFat = 0;
}
  let moltiplicatoreCarbo = 5;
  if (protocolloAttivo === 'Shred') moltiplicatoreCarbo = 2.5; else if (protocolloAttivo === 'Ricomposizione') moltiplicatoreCarbo = 4;

  targetCho = Math.max(targetCho, intraCho); targetFat = Math.max(targetFat, intraFat); targetPro = Math.max(targetPro, intraPro);
  const activeCategories = digiuno ? ['Pasto2', 'Pasto3', 'PostWorkout'] : ['Pasto1', 'Pasto2', 'Pasto3', 'PostWorkout'];
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalMeals: Record<string, any> = {};
  activeCategories.forEach(cat => { const item = dbAlimenti[cat as keyof typeof dbAlimenti]?.[pastiSelezionati[cat]]; if(item) { originalMeals[cat] = { cho: item.baseCarbo, pro: item.pro, fat: item.fat }; } });

  let customCho = 0, customPro = 0, customFat = 0, sumNonCustomOrigCho = 0, sumNonCustomOrigPro = 0, sumNonCustomOrigFat = 0;
  activeCategories.forEach(cat => {
     if(pastiCustom[cat].attivo) { customCho += Number(pastiCustom[cat].cho) || 0; customPro += Number(pastiCustom[cat].pro) || 0; customFat += Number(pastiCustom[cat].fat) || 0; } 
     else if(originalMeals[cat]) { sumNonCustomOrigCho += activeDieta === 'Keto' ? 1 : originalMeals[cat].cho; sumNonCustomOrigPro += originalMeals[cat].pro; sumNonCustomOrigFat += originalMeals[cat].fat; }
  });

  // GESTIONE INTEGRAZIONE CUSTOM: Se inserita, sovrascrive i macro intra-workout di default
  const appliedIntraCho = pastiCustom['Integrazione'].attivo ? (Number(pastiCustom['Integrazione'].cho) || 0) : intraCho;
  const appliedIntraPro = pastiCustom['Integrazione'].attivo ? (Number(pastiCustom['Integrazione'].pro) || 0) : intraPro;
  const appliedIntraFat = pastiCustom['Integrazione'].attivo ? (Number(pastiCustom['Integrazione'].fat) || 0) : intraFat;

  const remainingCho = Math.max(0, targetCho - customCho - appliedIntraCho); 
  const remainingPro = Math.max(0, targetPro - customPro - appliedIntraPro); 
  const remainingFat = Math.max(0, targetFat - customFat - appliedIntraFat);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalMeals: Record<string, any> = {};
  activeCategories.forEach(cat => {
     if(pastiCustom[cat].attivo) { finalMeals[cat] = { cho: Number(pastiCustom[cat].cho) || 0, pro: Number(pastiCustom[cat].pro) || 0, fat: Number(pastiCustom[cat].fat) || 0 }; } 
     else if(originalMeals[cat]) {
        const origC = activeDieta === 'Keto' ? 1 : originalMeals[cat].cho;
        finalMeals[cat] = {
           cho: sumNonCustomOrigCho > 0 ? Math.round(remainingCho * (origC / sumNonCustomOrigCho)) : 0,
           pro: sumNonCustomOrigPro > 0 ? Math.round(remainingPro * (originalMeals[cat].pro / sumNonCustomOrigPro)) : 0,
           fat: sumNonCustomOrigFat > 0 ? Math.round(remainingFat * (originalMeals[cat].fat / sumNonCustomOrigFat)) : 0
        };
     }
  });

  let actualCho = appliedIntraCho + customCho, actualPro = appliedIntraPro + customPro, actualFat = appliedIntraFat + customFat;
  activeCategories.forEach(cat => { if(!pastiCustom[cat].attivo && finalMeals[cat]) { actualCho += finalMeals[cat].cho; actualPro += finalMeals[cat].pro; actualFat += finalMeals[cat].fat; } });
  const actualIntakeKcal = Math.round((actualCho * 4) + (actualPro * 4) + (actualFat * 9));

  const generaTimelineDieta = (): Array<{ isIntra?: boolean; titolo?: string; descrizione?: string; idCategoria?: string; titoloUI?: string }> => {
    let preW = "";
    if (quandoTiAlleni === 'sera') { preW = `1️⃣ PRE-WORKOUT:\n• L-Citrullina: 6-8g\n• Ashwagandha: 500mg`; } 
    else { preW = `1️⃣ PRE-WORKOUT:\n• Caffeina: 200mg\n• L-Citrullina: 6g`; }
    if (protocolloAttivo === 'Shred') preW += `\n• ALC: 1.5g`;

    let intraW = "2️⃣ INTRA-WORKOUT:";
    if (activeDieta === 'Keto') { intraW += `\n• Elettroliti\n• MCT Oil: 10g\n• EAA: 15g\n• ❌ ZERO Carboidrati`; } 
    else if (activeDieta === 'LowCarb') { intraW += `\n• Ciclodestrine: ${intraCho}g\n• EAA: 15g`; } 
    else { intraW += `\n• Ciclodestrine: ${intraCho}g\n• EAA: 15g\n• Creatina: 5g`; }

    let saluteW = "3️⃣ SALUTE:";
    if (activeDieta === 'Keto' || protocolloAttivo === 'Shred') { saluteW += `\n• Omega-3: 2-3g\n• Multivitaminico`; } 
    else { saluteW += `\n• Omega-3: 1g\n• Vitamina D3 + K2`; }

    const bloccoIntra = usaIntegratori 
      ? { isIntra: true, titolo: "SUPPLEMENTAZIONE", descrizione: `${preW}\n\n${intraW}\n\n${saluteW}` }
      : { isIntra: true, titolo: "REAL FOOD ONLY", descrizione: "🔌 Integratori Disattivati.\n\nIl sistema ha azzerato l'integrazione liquida e spostato le calorie sui pasti solidi.\n\n💡 Assicurati di consumare un pasto solido (es. Pranzo o Cena) non oltre i 60-90 minuti post-allenamento per ottimizzare la finestra anabolica e il recupero." };
    const bloccoDigiuno = { isIntra: true, titolo: "⏱️ DIGIUNO 16:8", descrizione: `• Finestra digiuno: 16 ore.\n• Acqua, Caffè amaro, Tè.` };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t: any[] = [];
    if (quandoTiAlleni === 'mattina') {
        if (digiuno) t.push(bloccoDigiuno); t.push(bloccoIntra); t.push({ idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Mattina)' });
        if (!digiuno) t.push({ idCategoria: 'Pasto1', titoloUI: 'Pranzo / Pasto 1' }); t.push({ idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' }); t.push({ idCategoria: 'Pasto3', titoloUI: 'Pre-nanna' });
    } else if (quandoTiAlleni === 'pausa') {
        if (digiuno) t.push(bloccoDigiuno); else t.push({ idCategoria: 'Pasto1', titoloUI: 'Colazione' }); t.push(bloccoIntra); t.push({ idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Pausa)' });
        t.push({ idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' }); t.push({ idCategoria: 'Pasto3', titoloUI: 'Pre-nanna' });
    } else {
        if (digiuno) t.push(bloccoDigiuno); else t.push({ idCategoria: 'Pasto1', titoloUI: 'Colazione' }); t.push({ idCategoria: 'Pasto2', titoloUI: 'Pranzo' }); t.push({ idCategoria: 'Pasto3', titoloUI: 'Spuntino' });
        t.push(bloccoIntra); t.push({ idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Sera)' });
    }
    return t;
  };
  if (appState === 'HOME') {
    
    // --- MURO DI LOGIN CON TRANSIZIONE FLUIDA E ANIMAZIONI DELUXE ---
    if (!isAuthenticated) {
      return (
        <div className={"min-h-screen " + UI.bg + " flex items-center justify-center p-4 relative overflow-hidden font-sans"}>
          
          <style dangerouslySetInnerHTML={{ __html: ".anim-drop-down { animation: dropDownPanel 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; } @keyframes dropDownPanel { 0% { opacity: 0; transform: translateY(-40px); } 100% { opacity: 1; transform: translateY(0); } } .anim-circle-svg { stroke-dasharray: 400; stroke-dashoffset: 400; animation: drawCircleSvg 6s cubic-bezier(0.1, 0.8, 0.2, 1) forwards; } .anim-miccia-border { stroke-dasharray: 600; stroke-dashoffset: 600; animation: drawMiccia 4s cubic-bezier(0.4, 0, 0.2, 1) forwards; } .anim-mni { opacity: 0; transform: translateX(-30px); animation: slideText 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) 0.4s forwards; } .anim-fit { opacity: 0; transform: translateX(-30px); animation: slideText 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) 0.6s forwards; } .anim-sub { opacity: 0; transform: translateY(15px); animation: slideUp 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) 1.1s forwards; } .anim-bg-ltr { animation: slideLeftToRight 8.5s linear forwards; } .anim-bg-rtl { animation: slideRightToLeft 8.5s linear forwards; } @keyframes drawCircleSvg { to { stroke-dashoffset: 0; } } @keyframes drawMiccia { to { stroke-dashoffset: 0; } } @keyframes slideText { to { opacity: 1; transform: translateX(0); } } @keyframes slideUp { to { opacity: 1; transform: translateY(0); } } @keyframes slideLeftToRight { 0% { transform: translateX(-15%); opacity: 0; } 20% { opacity: 0.14; } 80% { opacity: 0.14; } 100% { transform: translateX(5%); opacity: 0; } } @keyframes slideRightToLeft { 0% { transform: translateX(5%); opacity: 0; } 20% { opacity: 0.14; } 80% { opacity: 0.14; } 100% { transform: translateX(-15%); opacity: 0; } }" }} />

          {/* --- PANNELLO DI LOGIN (Scende solo quando la intro sparisce) --- */}
          <div className={UI.card + " w-full max-w-sm z-10 " + (!mostraIntro ? "anim-drop-down" : "opacity-0")}>
             <div className="flex justify-center items-center mb-10">
                <h1 className="text-4xl font-bold tracking-tighter uppercase text-center flex-1 text-slate-500">
                  OMNI<span className="text-lime-500 drop-shadow-sm font-black">FIT</span>
                </h1>
             </div>
             
             <div className="space-y-6">
                <div>
                   <label className={UI.label}>Email Accesso</label>
                   <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className={UI.input} placeholder="atleta@mail.com" />
                </div>
                <div>
                   <label className={UI.label}>Password</label>
                   <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && eseguiLogin()} className={UI.input} placeholder="••••••••" />
                </div>
                
                {loginError && (
                  <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-xl text-center">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{loginError}</span>
                  </div>
                )}
                
                <button onClick={eseguiLogin} className={UI.btnPrimary + " w-full !mt-6"}>
                   ACCEDI AL SISTEMA
                </button>
             </div>
          </div>

          {/* --- SPLASH SCREEN INTRO (Non si distrugge, ma sfuma lentamente) --- */}
          <div className={"fixed inset-0 z-[9999] bg-[#E0E5EC] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out " + (mostraIntro ? "opacity-100" : "opacity-0 pointer-events-none")}>
              
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                 <div className="absolute -top-24 -left-24 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] opacity-30">
                    <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(132,204,22,0.3)]">
                      <circle cx="100" cy="100" r="75" fill="none" stroke="#84cc16" strokeWidth="38" className="anim-circle-svg" strokeLinecap="round" />
                    </svg>
                 </div>
                 <div className="absolute -bottom-24 -right-24 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] opacity-25">
                    <svg viewBox="0 0 200 200" className="w-full h-full rotate-90 drop-shadow-[0_0_15px_rgba(100,116,139,0.3)]">
                      <circle cx="100" cy="100" r="75" fill="none" stroke="#64748b" strokeWidth="38" className="anim-circle-svg" strokeLinecap="round" style={{animationDelay: '0.5s'}} />
                    </svg>
                 </div>
              </div>

              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                 <div className="absolute top-[12%] left-0 whitespace-nowrap text-[80px] sm:text-[130px] font-black text-slate-400 leading-none anim-bg-ltr opacity-0">
                    AI COACH • AI COACH • AI COACH • AI COACH
                 </div>
                 <div className="absolute top-[30%] right-0 whitespace-nowrap text-[90px] sm:text-[150px] font-black text-lime-500 leading-none anim-bg-rtl opacity-0">
                    ESERCIZI • ESERCIZI • ESERCIZI • ESERCIZI
                 </div>
                 <div className="absolute bottom-[12%] left-0 whitespace-nowrap text-[75px] sm:text-[120px] font-black text-slate-400 leading-none anim-bg-ltr opacity-0" style={{animationDelay: '0.2s'}}>
                    ANALISI CORPOREA • ANALISI CORPOREA • ANALISI CORPOREA
                 </div>
              </div>

              <div className="flex flex-col items-center justify-center z-10 relative mt-4">
                 <div className="flex items-center justify-center mb-5 px-8 py-4 bg-[#E0E5EC]/80 backdrop-blur-xl rounded-3xl shadow-[0_10px_30px_rgb(0,0,0,0.08)] border border-white/60">
                   <div className="relative flex items-center justify-center -mr-1 z-10">
                     <svg width="65" height="65" viewBox="0 0 100 100" className="-rotate-90 drop-shadow-lg">
                       <circle cx="50" cy="50" r="36" fill="#E0E5EC" />
                       <circle cx="50" cy="50" r="36" fill="none" stroke="#84cc16" strokeWidth="22" className="anim-circle" strokeLinecap="square" />
                     </svg>
                   </div>
                   <div className="flex items-center text-[65px] font-black tracking-tighter leading-none pt-1">
                      <span className="text-slate-500 anim-mni">MNI</span>
                      <span className="text-[#84cc16] anim-fit">FIT</span>
                   </div>
                 </div>

                 <div className="relative px-8 py-3 rounded-full bg-[#E0E5EC]/90 backdrop-blur-xl shadow-sm anim-sub overflow-hidden border border-transparent">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 240 50" preserveAspectRatio="none">
                       <rect x="2" y="2" width="236" height="46" rx="23" fill="none" stroke="#84cc16" strokeWidth="3" className="anim-miccia-border drop-shadow-[0_0_8px_#84cc16]" />
                    </svg>
                    <p className="text-[12px] font-black text-slate-600 tracking-[0.4em] uppercase relative z-10">
                       Protocollo Evolutivo
                    </p>
                 </div>
              </div>

          </div>
        </div>
      );
    }

    // --- SE SEI AUTENTICATO, VEDI LA TUA VECCHIA HOME ---
    return (
      <div className={`min-h-screen ${UI.bg} flex items-center justify-center p-4 relative overflow-hidden font-sans`}>
        <div className={UI.card + " w-full max-w-md z-10 anim-pop"} style={{animationDelay: '0.1s'}}>
           <div className="flex justify-center items-center mb-8">
              <h1 className="text-4xl font-bold tracking-tighter uppercase text-center flex-1 text-slate-500">
                OMNI<span className="text-lime-500 drop-shadow-sm font-black">FIT</span>
              </h1>
           </div>
           
           <div className="space-y-6 anim-pop" style={{animationDelay: '0.2s'}}>
              <div>
                 <div className="flex justify-between items-center mb-2 px-2">
                   <label className={UI.label + " !mb-0 !px-0"}>1. Seleziona Atleta</label>
                   {utenteCorrente !== "Leonardo" && (
                     <button onClick={eliminaAtleta} className="text-[9px] bg-[#e8eef3] shadow-[3px_3px_6px_#c1c9d2,-3px_-3px_6px_#ffffff] text-red-500 hover:text-red-600 px-3 py-1.5 rounded-full font-bold uppercase transition-all">🗑️ Elimina</button>
                   )}
                 </div>
                 <select value={utenteCorrente} onChange={e => setUtenteCorrente(e.target.value)} className={UI.input}>
                    {listaAtleti.map(a => <option key={a} value={a}>{a}</option>)}
                 </select>
                 <div className="mt-4 flex justify-center">
                   <button onClick={() => setModalWizard(true)} className={UI.btnSecondary + " w-full !text-lime-500"}>+ Crea Nuovo Profilo A.I.</button>
                 </div>
              </div>

              <div>
                 <label className={UI.label}>2. Fase Metabolica</label>
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
                    className={`${UI.input} ${protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo') ? 'opacity-50 cursor-not-allowed' : ''}`}
                 >
                    <option value="Equilibrata">⚖️ Equilibrata (Classica)</option>
                    <option value="Keto">🥩 Chetogenica (Keto - Cho Max 30g)</option>
                    <option value="LowCarb">🥑 Low Carb / Iperproteica</option>
                    <option value="Zona">🧩 Dieta a Zona (40-30-30)</option>
                    <option value="HighCarb">🍚 High Carb</option>
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
                    <option value="Nessuno">🤖 Nessuno (A.I. Base)</option>
                    <option value="Aldo Masolo (Reset Metabolico)">🟢 Aldo Masolo (Reset Metabolico)</option>
                    <option value="Gerardo Calvo (Reset Ormonale)">🔴 Gerardo Calvo (Reset Ormonale)</option>
                    <option value="Lorenzo Lari (Flessibile)">🟡 Lorenzo Lari (Flessibile 80/20)</option>
                 </select>
              </div>
              
              <div className="bg-[#E0E5EC] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] p-4 rounded-2xl flex items-center gap-4 anim-pop" style={{animationDelay: '0.3s'}}>
                 <input type="checkbox" id="metabolismoMain" checked={metabolismoBloccato} onChange={async (e) => {
                    const bloccato = e.target.checked;
                    setMetabolismoBloccato(bloccato);
                    if (biometria.peso && eta && altezza) {
                      const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(biometria.peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo, dieta: tipoDieta, autore: protocolloAutore, metabolismoBloccato: bloccato } }, data: new Date().toISOString() };
                      await supabase.from("check_utente").insert([payload]);
                    }
                 }} className="w-5 h-5 accent-lime-500 cursor-pointer rounded-md shadow-inner" />
                 <label htmlFor="metabolismoMain" className="text-[11px] text-slate-500 font-bold tracking-widest cursor-pointer uppercase">Stallo Metabolico?</label>
              </div>

              <button onClick={() => caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta)} className={UI.btnPrimary + " mt-8 w-full anim-pop"} style={{animationDelay: '0.4s'}}>
                 ACCEDI AL SISTEMA
              </button>
           </div>
        </div>

        {modalWizard && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className={UI.card + " w-full max-w-lg relative overflow-hidden"}>
               <button onClick={() => { setModalWizard(false); setStepWizard(1); }} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 font-bold text-2xl transition-colors">&times;</button>
               <h3 className={`font-black text-2xl uppercase tracking-widest mb-8 text-lime-500 drop-shadow-sm`}>Nuova Profilazione</h3>
               
               {stepWizard === 1 && (
                 <div className="space-y-6">
                   <div>
                     <label className={UI.label}>Nome Atleta</label>
                     <input type="text" placeholder="Es. Leonardo" value={datiWizard.nome} onChange={e=>setDatiWizard({...datiWizard, nome: e.target.value})} className={UI.input} />
                   </div>
                   <div className="flex gap-4">
                     <div className="w-1/3">
                        <label className={UI.label}>Età</label>
                        <input type="number" placeholder="Anni" value={datiWizard.eta} onChange={e=>setDatiWizard({...datiWizard, eta: e.target.value})} className={UI.input + " text-center"} />
                     </div>
                     <div className="w-1/3">
                        <label className={UI.label}>Peso</label>
                        <input type="number" placeholder="Kg" value={datiWizard.peso} onChange={e=>setDatiWizard({...datiWizard, peso: e.target.value})} className={UI.input + " text-center"} />
                     </div>
                     <div className="w-1/3">
                        <label className={UI.label}>Altezza</label>
                        <input type="number" placeholder="Cm" value={datiWizard.altezza} onChange={e=>setDatiWizard({...datiWizard, altezza: e.target.value})} className={UI.input + " text-center"} />
                     </div>
                   </div>
                   <div className="flex gap-4 pt-6">
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
                       <option value="Aldo Masolo (Reset Metabolico)">Aldo Masolo</option>
                       <option value="Gerardo Calvo (Reset Ormonale)">Gerardo Calvo</option>
                       <option value="Lorenzo Lari (Flessibile)">Lorenzo Lari (80/20)</option>
                     </select>
                   </div>
                   
                   <div className="bg-[#E0E5EC] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] p-4 rounded-2xl flex items-center gap-4">
                     <input type="checkbox" id="metabolismo" checked={datiWizard.metabolismoBloccato} onChange={e=>setDatiWizard({...datiWizard, metabolismoBloccato: e.target.checked})} className="w-5 h-5 accent-lime-500 rounded cursor-pointer shadow-inner" />
                     <label htmlFor="metabolismo" className="text-xs text-slate-500 font-bold tracking-widest cursor-pointer uppercase">Stallo Metabolico?</label>
                   </div>

                   <div className={UI.panelInset + " flex flex-col gap-4"}>
                     <div>
                        <p className={UI.label + " !px-0"}>📸 Condizione Attuale</p>
                        <input type="file" className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-none file:shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] file:text-[10px] file:font-bold file:tracking-widest file:bg-[#E0E5EC] file:text-lime-500 hover:file:text-lime-600 transition-all cursor-pointer uppercase" accept="image/*" onChange={gestisciCaricamentoPartenza} />
                     </div>
                     <div className="border-t border-slate-200/50 pt-4">
                        <p className={UI.label + " !px-0"}>📸 Obiettivo Ideale</p>
                        <input type="file" className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-none file:shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] file:text-[10px] file:font-bold file:tracking-widest file:bg-[#E0E5EC] file:text-purple-500 hover:file:text-purple-600 transition-all cursor-pointer uppercase" accept="image/*" onChange={gestisciCaricamentoArrivo} />
                     </div>
                   </div>
                   <div className="flex gap-4 pt-4">
                     <button onClick={() => setStepWizard(1)} className={UI.btnSecondary + " w-1/3"}>Indietro</button>
                     <button onClick={analizzaObiettivoWizard} disabled={loadingWizard} className={UI.btnPrimary + " w-2/3 disabled:opacity-50"}>{loadingWizard ? 'Analisi...' : 'Calcola A.I.'}</button>
                   </div>
                 </div>
               )}

               {stepWizard === 3 && (
                 <div className="space-y-6">
                   <div className={UI.panelInset + " text-[13px] text-slate-600 max-h-64 overflow-y-auto whitespace-pre-wrap leading-relaxed font-semibold custom-scrollbar"}>{rispostaWizard}</div>
                   <div className="flex gap-4 pt-4">
                     <button onClick={() => setStepWizard(2)} className={UI.btnSecondary + " w-1/3"}>Indietro</button>
                     <button onClick={salvaProfiloWizard} className={UI.btnPrimary + " w-2/3"}>Salva & Accedi</button>
                   </div>
                 </div>
               )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- HELPER BOTTOM NAV CON ICONE SVG MINIMAL, GLASS E FLUO ---
const renderNavicon = (tab: string, iconSvg: React.ReactNode, label: string) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <button onClick={() => setMobileTab(tab as any)} className={`flex flex-col items-center justify-center flex-1 py-3 transition-all duration-300 cursor-pointer border-none bg-transparent ${mobileTab === tab ? 'text-lime-500 scale-110 drop-shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'text-slate-400 hover:text-slate-500'}`}>
    <div className={`relative mb-1 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${mobileTab === tab ? 'bg-lime-500/10 backdrop-blur-md shadow-[inset_0_1px_3px_rgba(255,255,255,0.4)]' : 'bg-transparent'}`}>
       {iconSvg}
    </div>
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

  return (
    <main className="min-h-screen bg-[#E0E5EC] text-slate-700 p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden selection:bg-lime-400/30 pb-24 sm:pb-8">
      
      <header className="mb-6 pb-4 flex justify-between items-center relative z-20 anim-pop" style={{animationDelay: '0.1s'}}>
        <div>
          <button onClick={() => setAppState('HOME')} className="text-[10px] uppercase font-bold text-slate-400 hover:text-lime-500 mb-2 block transition-all bg-[#E0E5EC] px-4 py-2 rounded-full shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] border-none cursor-pointer">⬅️ Torna alla Home</button>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter uppercase text-slate-500 drop-shadow-sm mt-4">
            OMNI<span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 font-black">COACH</span> <span className="text-slate-500 ml-2 text-xl font-medium tracking-widest">{protocolloAttivo}</span>
          </h1>
        </div>
        <div className="text-right">
          {/* BOTTONE SEGRETO ADMIN */}
          {isAdmin && (
             <button onClick={apriAdmin} className="mb-3 text-[10px] bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-[0_4px_10px_rgba(244,63,94,0.4)] px-4 py-2 rounded-full font-black uppercase tracking-widest transition-all hover:scale-105 border-none cursor-pointer block ml-auto">
               👑 Control Room
             </button>
          )}
          <span className="text-[10px] text-slate-400 block uppercase font-bold mb-2 tracking-widest">Atleta Operativo</span>
          <div className="flex flex-col items-end gap-2.5">
             <span className="text-sm font-bold text-slate-600 bg-[#E0E5EC] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] px-5 py-2.5 rounded-full tracking-wide">{utenteCorrente}</span>
             <div className="flex gap-2 bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] px-3 py-1.5 rounded-full">
                <span className="text-[9px] font-bold text-lime-500 uppercase tracking-widest">{tipoDieta}</span>
                {protocolloAutore !== 'Nessuno' && <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-2 border-l border-slate-300">{protocolloAutore.split(' ')[0]}</span>}
             </div>
          </div>
        </div>
      </header>

      {/* CONTENITORE PRINCIPALE: GRIGLIA DESKTOP / TABS MOBILE */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 relative z-10">
        
        {/* COLONNA SINISTRA: Telemetria & Coach IA */}
        <div className={`flex-col gap-8 lg:col-span-3 ${mobileTab === 'TELEMETRIA' || mobileTab === 'COACH' ? 'flex' : 'hidden'} lg:flex`}>
          
          <section className={`bg-[#E0E5EC] shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] p-5 rounded-3xl flex-col relative overflow-hidden anim-pop ${mobileTab === 'TELEMETRIA' ? 'flex' : 'hidden'} lg:flex`} style={{animationDelay: '0.2s'}}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-center mb-6 border-b border-slate-200/50 pb-4 relative z-10">
              <h2 className="text-lg font-bold tracking-wide text-slate-700 uppercase">Telemetria</h2>
              <button onClick={() => setVistaTelemetria(vistaTelemetria === 'FORM' ? 'STORICO' : 'FORM')} className={`px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-full transition-all border-none cursor-pointer shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] ${vistaTelemetria === 'STORICO' ? 'text-indigo-500 active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff]' : 'text-slate-500 hover:text-indigo-500'}`}>
                {vistaTelemetria === 'STORICO' ? 'Torna al Form' : 'Vedi Storico'}
              </button>
            </div>

            {isDataLoading ? (
               <div className="space-y-4 relative z-10">
                 <Skeleton className="h-12 w-full" />
                 <Skeleton className="h-24 w-full" />
                 <Skeleton className="h-64 w-full" />
               </div>
            ) : vistaTelemetria === 'FORM' ? (
               <div className="space-y-6 relative z-10">
                 <div className="anim-pop" style={{animationDelay: '0.3s'}}>
                   <p className="text-[10px] text-indigo-500 uppercase font-bold tracking-widest block mb-3 px-1">Misure Base</p>
                   <div className="grid grid-cols-2 gap-4">
                     {misureBase.map((m) => (
                         <div key={m.id} className="bg-[#E0E5EC] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] p-3.5 rounded-2xl">
                           <label className="text-[9px] text-slate-500 uppercase font-bold flex justify-between tracking-wider mb-2">{m.label} <span className="text-slate-400/50">{m.unit}</span></label>
                           <input type="number" value={biometria[m.id as keyof typeof biometria] || ''} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-slate-600 outline-none focus:text-indigo-500 transition-colors text-center appearance-none" placeholder="-" />
                         </div>
                     ))}
                   </div>
                 </div>
                 
                 <div className="anim-pop" style={{animationDelay: '0.4s'}}>
                   <p className="text-[10px] text-indigo-500 uppercase font-bold tracking-widest block mb-3 px-1 mt-4">BIA (Opzionale)</p>
                   <div className="grid grid-cols-2 gap-4">
                     {misureBIA.map((m) => (
                         <div key={m.id} className="bg-[#E0E5EC] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] p-3.5 rounded-2xl">
                           <label className="text-[9px] text-slate-500 uppercase font-bold flex justify-between tracking-wider mb-2">{m.label} <span className="text-slate-400/50">{m.unit}</span></label>
                           <input type="number" value={biometria[m.id as keyof typeof biometria] || ''} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-indigo-500 outline-none focus:text-indigo-600 transition-colors text-center appearance-none" placeholder="-" />
                         </div>
                     ))}
                   </div>
                 </div>

                 <div className="pt-2 anim-pop" style={{animationDelay: '0.5s'}}>
                    <SvgBodyCompositionWheel data={biometria} altezza={altezza} eta={eta} />
                 </div>

                 <button onClick={valutaCheckFisico} className="w-full mt-4 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-bold uppercase tracking-widest p-4 rounded-2xl shadow-[0_8px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all border-none cursor-pointer anim-pop" style={{animationDelay: '0.6s'}}>Salva Dati</button>
               </div>
            ) : (
               <div className="flex-1 overflow-y-auto space-y-5 pr-2 max-h-[600px] custom-scrollbar relative z-10">
            {/* BARRA DI RICERCA TELEMETRIA */}
            <div className="relative w-full mb-6">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">⌕</span>
               <input 
                  type="text" 
                  placeholder="Cerca una data (es. 15/09/2026)..." 
                  value={ricercaTelemetria}
                  onChange={(e) => setRicercaTelemetria(e.target.value)}
                  className="w-full bg-[#E0E5EC] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] text-slate-600 text-xs font-bold pl-10 pr-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all border-none"
               />
            </div>

            {/* MOTORE DI RAGGRUPPAMENTO E RENDER */}
            {(() => {
              if (storicoMisure.length === 0) {
                return <p className="text-[11px] text-slate-400 italic font-bold text-center p-6 bg-[#E0E5EC] shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] rounded-[2rem]">Nessun dato registrato.</p>;
              }

              // 1. Applica il filtro della ricerca
              const filtrate = storicoMisure.filter(mis => {
                const dataStr = new Date(mis.data).toLocaleDateString('it-IT');
                return dataStr.includes(ricercaTelemetria);
              });

              if (filtrate.length === 0) {
                 return <p className="text-[11px] text-slate-400 italic font-bold text-center p-6 bg-[#E0E5EC] shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] rounded-[2rem]">Nessuna misurazione trovata.</p>;
              }

              // 2. Raggruppa per "Mese Anno"
              const raggruppate = filtrate.reduce((acc, mis) => {
                const dataObj = new Date(mis.data);
                const meseAnno = dataObj.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }).toUpperCase();
                if (!acc[meseAnno]) acc[meseAnno] = [];
                acc[meseAnno].push(mis);
                return acc;
              }, {} as Record<string, any[]>);

              // 3. Renderizza le cartelle (Accordion)
              return (Object.entries(raggruppate) as [string, any[]][]).map(([meseAnno, misure]) => (
                 <div key={meseAnno} className="mb-4">
                    {/* INTESTAZIONE CARTELLA */}
                    <button 
                      onClick={() => setMeseApertoTele(meseApertoTele === meseAnno ? null : meseAnno)}
                      className="w-full flex justify-between items-center bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] p-4 rounded-2xl border-none cursor-pointer transition-all"
                    >
                      <span className="text-[11px] font-black text-slate-600 tracking-widest">{meseAnno}</span>
                      <div className="flex items-center gap-3">
                         <span className="text-[9px] bg-indigo-100 shadow-inner text-indigo-500 px-2.5 py-1 rounded-lg font-black tracking-widest">{misure.length} Check</span>
                         <span className={`text-indigo-400 font-bold transition-transform duration-300 ${meseApertoTele === meseAnno ? 'rotate-180' : ''}`}>▼</span>
                      </div>
                    </button>

                    {/* CONTENUTO CARTELLA A TENDINA */}
                    {meseApertoTele === meseAnno && (
                      <div className="mt-4 space-y-4 pl-2 pr-1 border-l-2 border-indigo-200/50 ml-2 anim-drop-down">
                        {misure.map((mis: any, idx: number) => {
                           const circ = typeof mis.circonferenze === 'string' ? JSON.parse(mis.circonferenze) : (mis.circonferenze || {});
                           return (
                              <div key={mis.id} className="bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] flex flex-col gap-4 p-5 rounded-[1.5rem] anim-pop" style={{animationDelay: `${idx * 0.05}s`}}>
                                <div className="flex justify-between items-center mb-2 border-b border-slate-200/50 pb-3">
                                  <p className="text-[11px] font-bold text-indigo-500 tracking-widest bg-[#E0E5EC] shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] px-3 py-1.5 rounded-full">{new Date(mis.data).toLocaleDateString('it-IT')}</p>
                                  <button onClick={() => eliminaMisurazione(mis.id)} className="text-red-400 hover:text-red-500 text-[18px] uppercase font-bold tracking-wider transition-colors shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] w-8 h-8 flex items-center justify-center rounded-full active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] border-none cursor-pointer">&times;</button>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                   <p className="bg-[#E0E5EC] shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between items-center"><span>Peso</span> <strong className="text-slate-600 text-xs">{mis.peso || '-'}kg</strong></p>
                                   <p className="bg-[#E0E5EC] shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between items-center"><span>Petto</span> <strong className="text-slate-600 text-xs">{circ.petto || '-'}cm</strong></p>
                                   <p className="bg-[#E0E5EC] shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between items-center"><span>Spalle</span> <strong className="text-slate-600 text-xs">{circ.spalle || '-'}cm</strong></p>
                                   <p className="bg-[#E0E5EC] shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between items-center"><span>Braccia</span> <strong className="text-slate-600 text-xs">{circ.braccia || '-'}cm</strong></p>
                                   <p className="bg-[#E0E5EC] shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between items-center"><span>Gambe</span> <strong className="text-slate-600 text-xs">{circ.gambe || '-'}cm</strong></p>
                                   <p className="bg-[#E0E5EC] shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between items-center"><span>Glutei</span> <strong className="text-slate-600 text-xs">{circ.glutei || '-'}cm</strong></p>
                                   <p className="bg-indigo-50 shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl text-indigo-600 flex justify-between items-center"><span>Vita</span> <strong className="text-indigo-600 text-xs">{circ.vita || '-'}cm</strong></p>
                                   <p className="bg-purple-50 shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl text-purple-600 flex justify-between items-center"><span>BIA</span> <strong className="text-purple-600 text-xs">{circ.bodyFat || '-'}%</strong></p>
                                </div>
                              </div>
                           );
                        })}
                      </div>
                    )}
                 </div>
              ));
            })()}
          </div>
            )}
          </section>

          <section className={`bg-[#E0E5EC] shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] p-5 rounded-3xl flex-col h-[480px] anim-pop ${mobileTab === 'COACH' ? 'flex' : 'hidden'} lg:flex`} style={{animationDelay: '0.3s'}}>
            <h2 className="text-base font-bold tracking-widest uppercase text-slate-700 mb-6 flex items-center gap-3 border-b border-slate-200/50 pb-4">
              <span className="w-3 h-3 rounded-full bg-[#00c6ff] animate-pulse shadow-[0_0_10px_#00c6ff]"></span> A.I. Coach
            </h2>
            <div className="flex-1 overflow-y-auto space-y-4 p-5 bg-[#E0E5EC] shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] rounded-[2rem] mb-6 custom-scrollbar">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} anim-pop`} style={{animationDelay: `${0.1 * i}s`}}>
                  <span className={`text-[9px] uppercase font-black tracking-widest mb-2 ${msg.role === 'user' ? 'text-slate-400 pr-2' : 'text-[#00c6ff] pl-2'}`}>{msg.role === 'user' ? utenteCorrente : 'Coach'}</span>
                  <div className={`p-4 rounded-[1.5rem] text-[13px] leading-relaxed max-w-[90%] font-semibold shadow-[4px_4px_10px_#a3b1c6,-4px_-4px_10px_#ffffff] ${msg.role === 'user' ? 'bg-[#E0E5EC] text-slate-600 rounded-tr-sm' : 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-tl-sm shadow-[0_8px_15px_rgba(6,182,212,0.3)]'}`}>{msg.text}</div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-[#00c6ff] font-bold tracking-widest pl-2 animate-pulse mt-2">Elaborazione in corso...</div>}
              <div ref={chatEndRef} />
            </div>
            
            {fileAllegato && (
              <div className="flex items-center gap-2 mb-4 p-3 bg-[#E0E5EC] shadow-[4px_4px_10px_#a3b1c6,-4px_-4px_10px_#ffffff] rounded-2xl w-fit anim-pop">
                <span className="text-xs text-[#0072ff] font-bold tracking-widest truncate max-w-[180px]">📎 {fileAllegato.nome}</span>
                <button onClick={() => setFileAllegato(null)} className="text-slate-400 hover:text-red-500 font-bold ml-3 transition-colors border-none bg-transparent cursor-pointer">&times;</button>
              </div>
            )}
            <div className="flex gap-2 relative items-center w-full">
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={gestisciCaricamentoFile} />
              <button onClick={() => fileInputRef.current?.click()} className="bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] text-slate-500 hover:text-[#00c6ff] w-12 h-12 flex items-center justify-center shrink-0 rounded-full transition-all border-none cursor-pointer">📎</button>
              <input type="text" value={inputChat} onChange={e => setInputChat(e.target.value)} onKeyDown={e => e.key === 'Enter' && inviaMessaggioIA()} placeholder="Scrivi..." className="flex-1 min-w-0 bg-[#E0E5EC] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] px-4 py-3 h-12 rounded-full text-[12px] text-slate-600 outline-none focus:ring-2 focus:ring-cyan-400/40 transition-all font-semibold placeholder:text-slate-400 border-none" />
              <button onClick={inviaMessaggioIA} disabled={isTyping || (!inputChat.trim() && !fileAllegato)} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold w-12 h-12 shrink-0 flex items-center justify-center rounded-full shadow-[0_4px_10px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all border-none cursor-pointer">→</button>
            </div>
          </section>
        </div>

        {/* COLONNA CENTRALE: Turni & Nutrizione */}
        <div className={`flex-col gap-8 lg:col-span-4 ${mobileTab === 'TURNI' || mobileTab === 'NUTRIZIONE' ? 'flex' : 'hidden'} lg:flex`}>
          <section className={`bg-[#E0E5EC] shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] p-5 sm:p-6 lg:p-8 rounded-3xl relative overflow-hidden anim-pop ${mobileTab === 'TURNI' ? 'flex-col' : 'hidden'} lg:flex lg:flex-col`} style={{animationDelay: '0.4s'}}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-lime-400 to-emerald-500 opacity-80"></div>
            
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-200/50 pt-2">
              <h2 className="text-lg font-bold tracking-wide text-slate-700 uppercase">Incastro Turni</h2>
              <select value={tipoTurno} onChange={(e) => setTipoTurno(e.target.value)} className="bg-[#E0E5EC] text-[10px] text-lime-600 font-bold uppercase tracking-widest py-3 px-5 rounded-full outline-none transition-all shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] appearance-none border-none cursor-pointer">
                <option value="diretto">Turno Diretto</option><option value="spezzato">Turno Spezzato</option>
              </select>
            </div>
            
            <div className="space-y-6">
              <div className="bg-lime-400/15 border border-lime-400/30 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] backdrop-blur-md p-5 rounded-[1.5rem]">
                <span className="text-[10px] text-lime-600 uppercase font-black tracking-widest mb-4 block">Mattina (Lavoro)</span>
                <div className="flex space-x-5">
                  <div className="flex-1 relative">
                    <span className="text-[8px] text-slate-500 uppercase font-bold absolute -top-2 bg-[#E0E5EC] px-2 left-2 rounded-full shadow-sm">Inizio</span>
                    <input type="time" value={inizio1} onChange={e => setInizio1(e.target.value)} className="w-full bg-white/40 text-sm font-bold text-slate-700 p-2.5 rounded-xl border border-lime-400/50 outline-none focus:ring-2 focus:ring-lime-400 transition-colors text-center shadow-inner" />
                  </div>
                  <div className="flex-1 relative">
                    <span className="text-[8px] text-slate-500 uppercase font-bold absolute -top-2 bg-[#E0E5EC] px-2 left-2 rounded-full shadow-sm">Fine</span>
                    <input type="time" value={fine1} onChange={e => setFine1(e.target.value)} className="w-full bg-white/40 text-sm font-bold text-slate-700 p-2.5 rounded-xl border border-lime-400/50 outline-none focus:ring-2 focus:ring-lime-400 transition-colors text-center shadow-inner" />
                  </div>
                </div>
              </div>
              {tipoTurno === 'spezzato' && (
                <div className="bg-lime-400/15 border border-lime-400/30 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] backdrop-blur-md p-5 rounded-[1.5rem]">
                  <span className="text-[10px] text-lime-600 uppercase font-black tracking-widest mb-4 block">Pomeriggio (Lavoro)</span>
                  <div className="flex space-x-5">
                    <div className="flex-1 relative">
                      <span className="text-[8px] text-slate-500 uppercase font-bold absolute -top-2 bg-[#E0E5EC] px-2 left-2 rounded-full shadow-sm">Inizio</span>
                      <input type="time" value={inizio2} onChange={e => setInizio2(e.target.value)} className="w-full bg-white/40 text-sm font-bold text-slate-700 p-2.5 rounded-xl border border-lime-400/50 outline-none focus:ring-2 focus:ring-lime-400 transition-colors text-center shadow-inner" />
                    </div>
                    <div className="flex-1 relative">
                      <span className="text-[8px] text-slate-500 uppercase font-bold absolute -top-2 bg-[#E0E5EC] px-2 left-2 rounded-full shadow-sm">Fine</span>
                      <input type="time" value={fine2} onChange={e => setFine2(e.target.value)} className="w-full bg-white/40 text-sm font-bold text-slate-700 p-2.5 rounded-xl border border-lime-400/50 outline-none focus:ring-2 focus:ring-lime-400 transition-colors text-center shadow-inner" />
                    </div>
                  </div>
                </div>
              )}
              <div className="pt-2 mt-4 border-t border-slate-200/50">
                {/* BLOCCO DIGIUNO INTERMITTENTE MIGLIORATO */}
            <div className="flex justify-between items-center mb-8 bg-[#E0E5EC] p-5 rounded-[1.5rem] shadow-[6px_6px_14px_#a3b1c6,-6px_-6px_14px_#ffffff]">
              <div className="flex flex-col pr-4">
                 <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] text-slate-600 uppercase font-black tracking-widest">Digiuno</span>
                    <span className="bg-lime-400/20 text-lime-600 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm">16:8</span>
                 </div>
                 <p className="text-[10px] text-slate-500 font-bold leading-snug">
                    {digiuno 
                      ? "Attivo. Il sistema condenserà i pasti in 8 ore saltando la colazione." 
                      : "Condensa i pasti in una finestra di 8 ore (es. 13:00 - 21:00)."}
                 </p>
              </div>
              <button onClick={() => setDigiuno(!digiuno)} className={`w-14 h-7 rounded-full relative transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)] border-none cursor-pointer shrink-0 ${digiuno ? 'bg-gradient-to-r from-lime-400 to-emerald-500' : 'bg-slate-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-[4px] transition-transform shadow-[0_2px_5px_rgba(0,0,0,0.2)] ${digiuno ? 'translate-x-8' : 'translate-x-1'}`}></div>
              </button>
            </div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-3 block px-1">Collocazione Allenamento</span>
                <div className="flex space-x-3 bg-[#E0E5EC] p-2.5 rounded-[2rem] shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff]">
                  <button onClick={() => setQuandoTiAlleni('mattina')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-3xl transition-all duration-300 border-none cursor-pointer ${quandoTiAlleni === 'mattina' ? 'bg-gradient-to-br from-lime-400 to-emerald-500 text-white shadow-[0_4px_10px_rgba(16,185,129,0.3)]' : 'text-slate-500 hover:text-emerald-500 bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]'}`}>Mattina</button>
                  {tipoTurno === 'spezzato' && <button onClick={() => setQuandoTiAlleni('pausa')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-3xl transition-all duration-300 border-none cursor-pointer ${quandoTiAlleni === 'pausa' ? 'bg-gradient-to-br from-lime-400 to-emerald-500 text-white shadow-[0_4px_10px_rgba(16,185,129,0.3)]' : 'text-slate-500 hover:text-emerald-500 bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]'}`}>Pausa</button>}
                  <button onClick={() => setQuandoTiAlleni('sera')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-3xl transition-all duration-300 border-none cursor-pointer ${quandoTiAlleni === 'sera' ? 'bg-gradient-to-br from-lime-400 to-emerald-500 text-white shadow-[0_4px_10px_rgba(16,185,129,0.3)]' : 'text-slate-500 hover:text-emerald-500 bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]'}`}>Sera</button>
                </div>
              </div>
            </div>
          </section>

          <section className={`bg-[#E0E5EC] shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] p-5 sm:p-6 lg:p-8 rounded-3xl relative overflow-hidden anim-pop ${mobileTab === 'NUTRIZIONE' ? 'flex-col' : 'hidden'} lg:flex lg:flex-col`} style={{animationDelay: '0.5s'}}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-rose-400 opacity-80"></div>
            
            <div className="flex flex-col mb-8 pt-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold tracking-wide text-slate-700 uppercase">Piano Nutrizionale</h2>
                <div className="flex gap-2 items-center">
                  {protocolloAutore === 'Gerardo Calvo (Reset Ormonale)' && (
                     <button 
                       onClick={() => {
                          const current = gerardoCarbOverride !== null ? gerardoCarbOverride : [150, 250, 350][giorniSettimana.indexOf(giornoCalendario) % 3];
                          const next = current === 150 ? 250 : (current === 250 ? 350 : 150);
                          setGerardoCarbOverride(next);
                       }}
                       className="text-[9px] bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] text-rose-500 px-4 py-2.5 rounded-full font-black uppercase tracking-widest transition-all hover:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] border-none cursor-pointer"
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
                    className={`text-[9px] font-bold px-5 py-3 rounded-full uppercase tracking-widest outline-none cursor-pointer text-center appearance-none transition-all shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] border-none ${
                      (protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')) 
                        ? 'bg-[#E0E5EC] text-slate-400' 
                        : `bg-gradient-to-r from-orange-400 to-rose-400 shadow-[0_8px_15px_rgba(249,115,22,0.25)] text-white`
                    }`}
                  >
                  <option value="Equilibrata" className="bg-[#E0E5EC] text-slate-700">⚖️ Equilibrata</option>
                  <option value="Keto" className="bg-[#E0E5EC] text-slate-700">🥩 Keto</option>
                  <option value="LowCarb" className="bg-[#E0E5EC] text-slate-700">🥑 Low Carb</option>
                  <option value="Zona" className="bg-[#E0E5EC] text-slate-700">🧩 Zona</option>
                  <option value="HighCarb" className="bg-[#E0E5EC] text-slate-700">🍚 High Carb</option>
                </select>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="bg-[#E0E5EC] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] flex-1 text-center p-4 rounded-[1.5rem]">
                   <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">BMR</span>
                   <span className="text-[14px] text-slate-600 font-bold"><AnimatedCounter value={bmr} /></span>
                </div>
                <div className="bg-[#E0E5EC] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] flex-1 text-center p-4 rounded-[1.5rem]">
                   <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">TDEE</span>
                   <span className="text-[14px] text-slate-600 font-bold"><AnimatedCounter value={baseTdee} /></span>
                </div>
                <div className={`flex-[1.5] bg-gradient-to-br from-orange-400 to-rose-400 rounded-3xl p-4 text-center shadow-[0_10px_20px_rgba(249,115,22,0.3)] flex flex-col justify-center`}>
                   <span className="text-[9px] text-rose-100 uppercase font-black tracking-widest block mb-1">INTAKE TARGET</span>
                   <span className="text-[18px] text-white font-black"><AnimatedCounter value={actualIntakeKcal} /> kcal</span>
                </div>
              </div>
            </div>

            {/* INTERRUTTORE USO INTEGRATORI */}
          <div className="flex justify-between items-center bg-[#E0E5EC] p-5 rounded-[1.5rem] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] mt-6 mb-2">
             <div className="flex flex-col pr-4">
                <div className="flex items-center gap-2 mb-1.5">
                   <span className="text-[11px] text-slate-600 uppercase font-black tracking-widest">Protocollo Integratori</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold leading-snug">
                   {usaIntegratori 
                     ? "Attivo. Consigli specifici e macro liquidi inseriti." 
                     : "Disattivo. Macro spostati 100% su cibo solido."}
                </p>
             </div>
             <button onClick={() => setUsaIntegratori(!usaIntegratori)} className={`w-14 h-7 rounded-full relative transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)] border-none cursor-pointer shrink-0 ${usaIntegratori ? 'bg-gradient-to-r from-orange-400 to-rose-400' : 'bg-slate-300'}`}>
               <div className={`w-5 h-5 bg-white rounded-full absolute top-[4px] transition-transform shadow-[0_2px_5px_rgba(0,0,0,0.2)] ${usaIntegratori ? 'translate-x-8' : 'translate-x-1'}`}></div>
             </button>
          </div>
            
            
            {protocolloAutore === 'Lorenzo Lari (Flessibile)' && (
               <div className="bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] p-5 rounded-[1.5rem] mb-8 bg-amber-50/30 anim-pop" style={{animationDelay: '0.6s'}}>
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">🟡 BUDGET SGARRO (80/20)</span>
                     <span className="text-sm font-bold text-slate-600"><AnimatedCounter value={Math.round(actualIntakeKcal * 0.2)} /> Kcal</span>
                  </div>
                  <div className="w-full bg-[#E0E5EC] h-3 rounded-full overflow-hidden flex shadow-[inset_2px_2px_5px_#a3b1c6]">
                     <div className={`bg-gradient-to-r from-orange-400 to-rose-400 h-full w-[80%]`}></div>
                     <div className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full w-[20%] shadow-[0_0_12px_#fbbf24]"></div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold tracking-wide mt-4 leading-relaxed">Puoi destinare il 20% delle tue calorie odierne a cibi sfiziosi, senza sensi di colpa e restando nei target!</p>
               </div>
            )}

            {isDataLoading ? (
               <div className="space-y-6">
                 <Skeleton className="h-32 w-full" />
                 <Skeleton className="h-40 w-full" />
                 <Skeleton className="h-40 w-full" />
               </div>
            ) : (
              <div className="space-y-7">
              {generaTimelineDieta().map((blocco, idx) => {
                if (blocco.isIntra) {
                  if (blocco.titolo === "⏱️ DIGIUNO 16:8") {
                    return (
                      <div key={`intra-${idx}`} className={`bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] bg-gradient-to-br from-orange-50/50 to-white relative overflow-hidden p-6 rounded-3xl anim-pop`} style={{animationDelay: `${0.4 + idx * 0.1}s`}}>
                        <div className="absolute top-0 left-0 w-2 h-full bg-orange-400"></div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs uppercase font-black text-orange-500 tracking-widest">{blocco.titolo}</span>
                        </div>
                        <p className="font-semibold text-xs text-slate-500 whitespace-pre-wrap leading-relaxed">
                         {blocco.descrizione}
                       </p>
                      </div>
                    );
                  } else {
                    const cat = 'Integrazione';
                    const isCustom = pastiCustom[cat]?.attivo;
                    const intraKcal = Math.round((appliedIntraCho*4)+(appliedIntraPro*4)+(appliedIntraFat*9));

                    return (
                      <div key={`intra-${idx}`} className={`bg-[#E0E5EC] shadow-[6px_6px_14px_#a3b1c6,-6px_-6px_14px_#ffffff] relative overflow-hidden p-6 rounded-3xl anim-pop ring-2 ring-orange-300/50`} style={{animationDelay: `${0.4 + idx * 0.1}s`}}>
                        <div className="absolute top-0 left-0 w-2 h-full bg-orange-400"></div>
                        
                        <div className="flex justify-between items-center mb-5">
                          <span className="text-[12px] uppercase font-black text-orange-500 tracking-widest">{blocco.titolo}</span>
                          <div className="flex gap-3">
                            {!isCustom ? (
                              <button onClick={() => toggleCustomMeal(cat)} className="bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] text-slate-500 hover:text-orange-500 px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-[9px] transition-all active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] border-none cursor-pointer">Custom</button>
                            ) : (
                               <button onClick={() => resetCustomMeal(cat)} className="bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] text-red-500 px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-[9px] transition-all active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] border-none cursor-pointer">🗑️ Reset</button>
                            )}
                          </div>
                        </div>

                        {isCustom ? (
  <div className={`mt-2 p-5 rounded-3xl bg-white/40 backdrop-blur-xl border border-white shadow-[0_0_20px_rgba(249,115,22,0.2)] relative overflow-hidden`}>
    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-400 to-rose-400"></div>

    {pastiCustom[cat]?.nome ? (
      <div className="ml-2">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-slate-700 text-[14px] truncate pr-2">{pastiCustom[cat].nome}</h4>
          <button onClick={() => setModalScegliDispensa(cat)} className="text-[9px] bg-white/60 px-3 py-2 rounded-xl shadow-sm text-orange-500 font-bold uppercase tracking-widest border border-white hover:bg-white transition-all cursor-pointer shrink-0">+ Aggiungi / Modifica</button>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="flex-1"><span className={UI.label + " text-center"}>Carbo</span><input type="number" value={pastiCustom[cat].cho} onChange={e => updateCustomMeal(cat, 'cho', e.target.value)} className={UI.input + " text-center bg-white/50 text-orange-500"} /></div>
          <div className="flex-1"><span className={UI.label + " text-center"}>Pro</span><input type="number" value={pastiCustom[cat].pro} onChange={e => updateCustomMeal(cat, 'pro', e.target.value)} className={UI.input + " text-center bg-white/50 text-slate-600"} /></div>
          <div className="flex-1"><span className={UI.label + " text-center"}>Fat</span><input type="number" value={pastiCustom[cat].fat} onChange={e => updateCustomMeal(cat, 'fat', e.target.value)} className={UI.input + " text-center bg-white/50 text-slate-600"} /></div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center p-2 ml-2">
        <button onClick={() => setModalScegliDispensa(cat)} className="w-full bg-gradient-to-r from-orange-400 to-rose-400 text-white font-black uppercase tracking-widest text-[12px] py-4 rounded-2xl shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] transition-all border-none cursor-pointer hover:-translate-y-0.5 flex items-center justify-center gap-2">
          📦 Scegli dalla Dispensa
        </button>
        <p className="text-[9px] text-slate-500 font-bold mt-4 tracking-widest text-center leading-relaxed">
          Seleziona un alimento dal tuo database personale<br/>o scansiona una nuova etichetta.
        </p>
      </div>
    )}
  </div>
) : (
                           <div className={`mt-2 p-5 rounded-3xl bg-orange-50/50 backdrop-blur-xl border border-white shadow-[inset_4px_4px_8px_rgba(255,255,255,0.8),inset_-4px_-4px_8px_rgba(249,115,22,0.05)] relative overflow-hidden`}>
                             <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-400 to-rose-400"></div>
                             <div className="text-[12px] text-slate-500 font-semibold leading-relaxed relative z-10 ml-2 whitespace-pre-wrap">
                               {renderDescrizioneConHUD(blocco.descrizione || "")}
                             </div>
                           </div>
                        )}
                        
                        <div className="mt-5 flex justify-between items-center gap-4">
                           <div className={`flex-1 flex justify-between items-center ${UI.panelInset} !px-6 !py-3`}>
                             <div className="flex flex-col items-center"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">C</span><span className="text-[15px] font-black text-orange-500">{appliedIntraCho}g</span></div>
                             <div className="flex flex-col items-center"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">P</span><span className="text-[15px] font-bold text-slate-600">{appliedIntraPro}g</span></div>
                             <div className="flex flex-col items-center"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">F</span><span className="text-[15px] font-bold text-slate-600">{appliedIntraFat}g</span></div>
                           </div>
                           <div className={`${UI.panelOutset} !px-6 !py-2.5 flex flex-col items-center justify-center shrink-0`}>
                              <span className={`text-[15px] font-bold leading-none text-orange-500`}><AnimatedCounter value={intraKcal}/></span>
                              <span className="text-[9px] font-bold text-slate-400 tracking-widest mt-1">KCAL</span>
                           </div>
                        </div>
                      </div>
                    );
                  }
                }
                const cat = blocco.idCategoria as keyof typeof dbAlimenti;
                const isPW = cat === 'PostWorkout';
                const itemScelto = dbAlimenti[cat]?.[pastiSelezionati[cat]] || {nome:"", baseCarbo:0, pro:0, fat:0, dettaglioGrammi:()=>""};
                const finalCho = finalMeals[cat].cho, finalPro = finalMeals[cat].pro, finalFat = finalMeals[cat].fat;
                const pastoKcal = Math.round((finalCho * 4) + (finalPro * 4) + (finalFat * 9));
                const isCustom = pastiCustom[cat].attivo;

                return (
                  <div key={`${cat}-${idx}`} className={`bg-[#E0E5EC] shadow-[6px_6px_14px_#a3b1c6,-6px_-6px_14px_#ffffff] p-6 rounded-3xl ${isPW ? 'ring-2 ring-rose-300/50' : ''} anim-pop`} style={{animationDelay: `${0.4 + idx * 0.1}s`}}>
                    <div className="flex justify-between items-center mb-5">
                      <span className={`text-[12px] uppercase font-black tracking-widest ${isPW ? 'text-rose-500' : 'text-slate-400'}`}>{blocco.titoloUI}</span>
                      <div className="flex gap-3">
                        {!isCustom ? (
                          <>
                            <button onClick={() => toggleCustomMeal(cat)} className="bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] text-slate-500 hover:text-orange-500 px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-[9px] transition-all active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] border-none cursor-pointer">Custom</button>
                            <button onClick={() => apriSwapAlimento(cat)} className="bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] text-orange-500 hover:text-rose-500 px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-[9px] transition-all active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] border-none cursor-pointer">Swap</button>
                          </>
                        ) : (
                           <button onClick={() => resetCustomMeal(cat)} className="bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] text-red-500 px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-[9px] transition-all active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] border-none cursor-pointer">🗑️ Reset</button>
                        )}
                      </div>
                    </div>
                    
                    {isCustom ? (
  <div className={`mt-2 p-5 rounded-3xl bg-white/40 backdrop-blur-xl border border-white shadow-[0_0_20px_rgba(249,115,22,0.2)] relative overflow-hidden`}>
    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-400 to-rose-400"></div>

    {pastiCustom[cat]?.nome ? (
      <div className="ml-2">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black text-slate-700 text-[14px] truncate pr-2">{pastiCustom[cat].nome}</h4>
          <button onClick={() => setModalScegliDispensa(cat)} className="text-[9px] bg-white/60 px-3 py-2 rounded-xl shadow-sm text-orange-500 font-bold uppercase tracking-widest border border-white hover:bg-white transition-all cursor-pointer shrink-0">Cambia</button>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="flex-1"><span className={UI.label + " text-center"}>Carbo</span><input type="number" value={pastiCustom[cat].cho} onChange={e => updateCustomMeal(cat, 'cho', e.target.value)} className={UI.input + " text-center bg-white/50 text-orange-500"} /></div>
          <div className="flex-1"><span className={UI.label + " text-center"}>Pro</span><input type="number" value={pastiCustom[cat].pro} onChange={e => updateCustomMeal(cat, 'pro', e.target.value)} className={UI.input + " text-center bg-white/50 text-slate-600"} /></div>
          <div className="flex-1"><span className={UI.label + " text-center"}>Fat</span><input type="number" value={pastiCustom[cat].fat} onChange={e => updateCustomMeal(cat, 'fat', e.target.value)} className={UI.input + " text-center bg-white/50 text-slate-600"} /></div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center p-2 ml-2">
        <button onClick={() => setModalScegliDispensa(cat)} className="w-full bg-gradient-to-r from-orange-400 to-rose-400 text-white font-black uppercase tracking-widest text-[12px] py-4 rounded-2xl shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] transition-all border-none cursor-pointer hover:-translate-y-0.5 flex items-center justify-center gap-2">
          📦 Scegli dalla Dispensa
        </button>
        <p className="text-[9px] text-slate-500 font-bold mt-4 tracking-widest text-center leading-relaxed">
          Seleziona un alimento dal tuo database personale<br/>o scansiona una nuova etichetta.
        </p>
      </div>
    )}
  </div>
) : (
                       <div className={`mt-2 p-5 rounded-3xl bg-white/40 backdrop-blur-xl border border-white shadow-[0_0_20px_rgba(249,115,22,0.2)] relative overflow-hidden`}>
                         <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-400 to-rose-400"></div>
                         <p className="font-bold text-[15px] text-slate-700 mb-3 ml-2 relative z-10">{itemScelto.nome}</p>
                         {finalCho === 0 && finalPro === 0 ? <p className="text-[11px] text-red-500 font-bold bg-red-50 p-3 rounded-xl inline-block shadow-sm relative z-10 ml-2">Pasto azzerato (Sgarro o Digiuno).</p> : <div className="text-[12px] text-slate-500 font-semibold leading-relaxed relative z-10 ml-2 whitespace-pre-wrap">
  {renderDescrizioneConHUD(itemScelto.dettaglioGrammi(finalCho, finalPro, finalFat) || "")}
</div>}
                       </div>
                    )}
                    
                    <div className="mt-5 flex justify-between items-center gap-4">
                       <div className={`flex-1 flex justify-between items-center ${UI.panelInset} !px-6 !py-3`}>
                         <div className="flex flex-col items-center"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">C</span><span className="text-[15px] font-black text-orange-500">{finalCho}g</span></div>
                         <div className="flex flex-col items-center"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">P</span><span className="text-[15px] font-bold text-slate-600">{finalPro}g</span></div>
                         <div className="flex flex-col items-center"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">F</span><span className="text-[15px] font-bold text-slate-600">{finalFat}g</span></div>
                       </div>
                       <div className={`${UI.panelOutset} !px-6 !py-2.5 flex flex-col items-center justify-center shrink-0`}>
                          <span className={`text-[15px] font-bold leading-none ${isPW ? 'text-rose-500' : 'text-slate-600'}`}><AnimatedCounter value={pastoKcal} /></span>
                          <span className="text-[9px] font-bold text-slate-400 tracking-widest mt-1">KCAL</span>
                       </div>
                    </div>
                  </div>
                );
          })}

          {/* --- VETRINA INTEGRATORI DINAMICA (EDUCAZIONE ATLETA) --- */}
          {usaIntegratori && (
            <div className="mt-10 pt-8 border-t border-slate-300/50">
              <h3 className="text-[11px] uppercase font-black text-slate-500 tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span> Guida all'Acquisto
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {(() => {
                  const raccomandazioni = [];
                  
                  // 1. EAA (Sempre presenti, logica dinamica sul testo)
                  raccomandazioni.push({
                    nome: "Aminoacidi Essenziali (EAA)",
                    icona: "🛡️",
                    motivo: (activeDieta === 'Keto' || protocolloAttivo === 'Shred') 
                      ? "Cruciali. Essendo in deficit calorico severo, prevengono il catabolismo (perdita di muscolo) e danno energia immediata senza calorie." 
                      : "Migliorano il recupero muscolare e forniscono mattoni pronti all'uso durante lo sforzo intenso.",
                    esempi: ["Yamamoto Nutrition Sustamine", "Tsunami Nutrition EAA Pure", "Prozis Essential Amino Acids"]
                  });

                  // 2. Pre-workout (Logica orario)
                  if (quandoTiAlleni === 'sera') {
                    raccomandazioni.push({
                      nome: "Pre-Workout PUMP (Zero Caffeina)",
                      icona: "🩸",
                      motivo: "Ti alleni tardi: ti serve focus e afflusso di sangue ai muscoli, ma senza stimolanti per non rovinare la qualità del sonno profondo.",
                      esempi: ["Yamamoto Blood Volume", "Ghost Pump Non-Stim", "Tsunami Pump Pure"]
                    });
                  } else {
                     raccomandazioni.push({
                      nome: "Pre-Workout Energia (Caffeina)",
                      icona: "⚡",
                      motivo: "Ti dà la spinta mentale e fisica necessaria per massimizzare i carichi e la performance in palestra.",
                      esempi: ["Cellucor C4 Original", "Yamamoto Kamikaze", "Tsunami Pure Professional"]
                    });
                  }

                  // 3. Ciclodestrine (Logica protocollo)
                  if (protocolloAttivo !== 'Shred' && activeDieta !== 'Keto') {
                     raccomandazioni.push({
                      nome: "Carbo Liquidi (Ciclodestrine)",
                      icona: "🔋",
                      motivo: "Energia a lento rilascio che non pesa sullo stomaco. Indispensabili per sostenere il volume di allenamento in fase di costruzione.",
                      esempi: ["Yamamoto GlycoBol (HBCD)", "Vitargo", "Tsunami Pure Karbo"]
                    });
                  }

                  // 4. Elettroliti (Logica Keto/Shred)
                  if (activeDieta === 'Keto' || protocolloAttivo === 'Shred') {
                     raccomandazioni.push({
                      nome: "Elettroliti e Sali Minerali",
                      icona: "💧",
                      motivo: activeDieta === 'Keto' 
                        ? "In Chetogenica i reni espellono molti liquidi. Gli elettroliti prevengono cali di pressione, letargia e crampi muscolari." 
                        : "Mantengono l'idratazione ottimale e la contrazione muscolare durante i tagli calorici.",
                      esempi: ["Yamamoto HydraVOL", "Polase Sport", "Prozis Electrolytes"]
                    });
                  }

                  return raccomandazioni.map((r, idx) => (
                    <div key={idx} className="bg-[#E0E5EC] shadow-[4px_4px_10px_#a3b1c6,-4px_-4px_10px_#ffffff] p-5 rounded-3xl flex flex-col gap-3 anim-pop transition-transform hover:scale-[1.02]" style={{animationDelay: `${idx * 0.15}s`}}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl bg-white/40 w-12 h-12 flex items-center justify-center rounded-2xl shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4)] shrink-0">{r.icona}</span>
                        <h4 className="font-black text-slate-700 text-[11px] tracking-wide uppercase leading-tight">{r.nome}</h4>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold leading-relaxed px-1 mt-1">{r.motivo}</p>
                      
                      <div className="mt-auto pt-3">
                         <div className="bg-slate-200/50 p-3 rounded-2xl shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff]">
                            <span className="text-[8px] uppercase font-black text-indigo-400 tracking-widest block mb-2">Esempi Consigliati (Cerca questi):</span>
                            <ul className="list-disc pl-4 text-[9px] font-bold text-slate-600 space-y-1.5">
                              {r.esempi.map((es, i) => <li key={i}>{es}</li>)}
                            </ul>
                         </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
      </div>
        

        {/* COLONNA DESTRA: Allenamento Dinamico */}
        <div className={`flex-col gap-8 lg:col-span-5 ${mobileTab === 'ALLENAMENTO' ? 'flex' : 'hidden'} lg:flex`}>
          <section className="bg-[#E0E5EC] shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] p-5 sm:p-6 lg:p-8 rounded-3xl flex flex-col min-h-0 relative overflow-hidden flex-1 anim-pop" style={{animationDelay: '0.6s'}}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-80"></div>

            <div className="flex justify-between items-center mb-6 border-b border-slate-200/50 pb-4 pt-2 shrink-0">
              <h2 className="text-lg font-black tracking-widest uppercase text-slate-700">Programma {utenteCorrente === "Leonardo" ? 'Master' : 'Dinamico'}</h2>
              <div className="flex gap-3 bg-[#E0E5EC] p-1.5 rounded-full shadow-[inset_3px_3px_6px_#a3b1c6,inset_-3px_-3px_6px_#ffffff]">
                <button onClick={() => {setVistaStorico(!vistaStorico); setVistaGraficiCarichi(false);}} className={`px-5 py-2.5 text-[9px] uppercase font-bold tracking-widest rounded-full transition-all duration-300 border-none cursor-pointer ${vistaStorico && !vistaGraficiCarichi ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_4px_10px_rgba(6,182,212,0.3)]' : 'text-slate-500 hover:text-cyan-500'}`}>
                  {vistaStorico && !vistaGraficiCarichi ? 'Oggi' : 'Storico'}
                </button>
                <button onClick={() => {setVistaGraficiCarichi(!vistaGraficiCarichi); setVistaStorico(true);}} className={`px-5 py-2.5 text-[9px] uppercase font-bold tracking-widest rounded-full transition-all duration-300 border-none cursor-pointer ${vistaGraficiCarichi ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-[0_4px_10px_rgba(168,85,247,0.4)]' : 'text-slate-500 hover:text-cyan-500'}`}>
                  Grafici
                </button>
              </div>
            </div>

            {!vistaStorico ? (
              <>
                <div className="bg-[#E0E5EC] shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] mb-6 flex justify-between items-center p-5 rounded-[1.5rem] shrink-0">
                  <div className="px-2">
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1.5">Durata Stimata</span>
                    <p className="text-[16px] font-bold text-slate-600 flex items-center gap-2">⏱️ ~<AnimatedCounter value={calcolaTempoScheda()} /> min <span className="text-[10px] text-slate-400 font-bold ml-1">(Recuperi incl.)</span></p>
                  </div>
                  <button onClick={() => setFastWorkout(!fastWorkout)} className={`px-6 py-3.5 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all duration-300 border-none cursor-pointer shadow-[6px_6px_14px_#a3b1c6,-6px_-6px_14px_#ffffff] ${fastWorkout ? 'bg-gradient-to-br from-red-400 to-rose-500 text-white shadow-[0_8px_15px_rgba(244,63,94,0.3)]' : 'bg-[#E0E5EC] text-slate-500 hover:text-cyan-500 active:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]'}`}>
                    {fastWorkout ? '⚡ Fast Mode' : 'Taglia Tempi'}
                  </button>
                </div>

                <div className="mb-6 shrink-0">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-3 px-1">Giorno di Allenamento</p>
                  <div className="grid grid-cols-3 gap-3">
                    {giorniSettimana.map((gg: string) => (
                      <button key={gg} onClick={() => setGiornoCalendario(gg)} className={`py-3 text-[12px] rounded-[1rem] transition-all duration-300 border-none cursor-pointer shadow-sm ${giornoCalendario === gg ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-[0_4px_10px_rgba(6,182,212,0.3)]' : 'bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] text-slate-500 font-bold hover:text-cyan-500'}`}>{gg}</button>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 anim-pop" style={{animationDelay: '0.7s'}}>
                   <HumanHeatmap scheda={schedaAttiva} />
                </div>
                
                <div className="mb-6 flex gap-4 bg-[#E0E5EC] p-2.5 rounded-[2rem] shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff] shrink-0 anim-pop" style={{animationDelay: '0.7s'}}>
                  {['Spinta', 'Tirata', 'Gambe'].map((sch: string) => (
                    <button key={sch} onClick={() => setSchedaAttiva(sch as any)} className={`px-5 py-4 text-[11px] font-black uppercase tracking-widest rounded-[1.5rem] flex-1 transition-all duration-300 border-none cursor-pointer ${schedaAttiva === sch ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_4px_10px_rgba(6,182,212,0.3)]' : 'text-slate-400 hover:text-slate-700'}`}>{sch}</button>
                  ))}
                </div>

                {isDataLoading ? (
                 <div className="flex-1 space-y-6 custom-scrollbar pr-2 overflow-y-auto min-h-0">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                 </div>
              ) : (
                 <div className="flex-1 overflow-y-auto pr-3 space-y-6 custom-scrollbar min-h-0">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {dbDinamico[schedaAttiva].esercizi.map((es: any, idx: number) => {
                    const nomeAttuale = eserciziModificati[es.id] || es.nome;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const altEs = es.alternative.find((a: any) => a.nome === nomeAttuale);
                    const currentEx = altEs || es;
                    
                    const ultimoCarico = getUltimoCarico(es.id);
                    
                    const phaseColor = es.fase.includes('Fase 1') ? '#f97316' : (es.fase.includes('Fase 2') ? '#0ea5e9' : '#ef4444'); 
                    const phaseTint = es.fase.includes('Fase 1') ? 'bg-orange-400/15 border-orange-400/30' : (es.fase.includes('Fase 2') ? 'bg-cyan-400/15 border-cyan-400/30' : 'bg-red-400/15 border-red-400/30');
                    
                    const animType = currentEx.anim || "chest_barbell_flat"; 
                    
                    let repMostrate = es.rep;
                    if (fastWorkout) repMostrate = repMostrate.replace("4-5 serie", "3 serie").replace("3-4 serie", "2 serie").replace("Rec: 2 min", "Rec: 1.5 min").replace("Rec: 45 sec", "Rec: 1 min");

                    const numeroSetTarget = getNumeroSet(repMostrate);

                    return (
                      <div key={`${es.id}-${nomeAttuale}`} className={`${phaseTint} backdrop-blur-md shadow-[6px_6px_14px_#a3b1c6,-6px_-6px_14px_#ffffff] relative overflow-hidden group p-6 rounded-3xl anim-pop`} style={{animationDelay: `${0.7 + idx * 0.1}s`}}>
                        <div className="pl-1">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] uppercase font-black tracking-widest drop-shadow-sm" style={{color: phaseColor}}>{es.fase}</span>
                            <button onClick={() => apriSwapEsercizio(es)} className="bg-white/40 shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.8)] text-slate-500 hover:text-slate-800 px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-[9px] transition-all active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5)] border-none cursor-pointer">Swap</button>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mt-4">
                            <div className="bg-white/50 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] p-4 rounded-[1.2rem] w-full sm:w-28 flex justify-center shrink-0 border border-white/40"><MediaVisualizer animKey={animType} color={phaseColor} /></div>
                            <div className="flex-1 w-full min-w-0 text-center sm:text-left">
                               <h3 className="font-bold text-[16px] text-slate-700 mb-2 truncate">{nomeAttuale}</h3>
                               <p className="text-[12px] sm:text-[11px] text-slate-600 leading-relaxed font-semibold">{currentEx.dettaglio}</p>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-between bg-white/30 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] p-4 rounded-2xl border border-white/50">
                             <p className="text-[11px] font-black px-4 py-2 rounded-xl bg-white/50 shadow-[2px_2px_4px_rgba(163,177,198,0.4)] text-slate-600 tracking-widest">{repMostrate}</p>
                             {ultimoCarico !== '0' && <span className="text-[10px] font-bold text-slate-500 px-3 py-2 bg-white/50 shadow-[2px_2px_4px_rgba(163,177,198,0.4)] rounded-xl uppercase tracking-widest">Ultima: <span className="ml-1 text-[14px] font-black" style={{color: phaseColor}}>{ultimoCarico}kg</span></span>}
                          </div>
                          
                          <button onClick={() => apriFocusAllenamento(es, repMostrate)} className="mt-5 w-full bg-white/50 shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] active:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-white/60 cursor-pointer transition-all hover:-translate-y-0.5" style={{color: phaseColor}}>⏱️ AVVIA FOCUS TIMER</button>

                          <div className="mt-5 pt-5 border-t border-slate-400/20">
                            <div className="flex gap-4">
                              {Array.from({ length: numeroSetTarget }).map((_, i) => (
                                <div key={i} className="flex-1 relative">
                                  <label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest block text-center mb-2.5">Set {i+1}</label>
                                  <input type="number" value={carichiAttuali[es.id]?.[i] || ''} onChange={(e) => updateCaricoSet(es.id, i, e.target.value)} className="w-full bg-white/50 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] py-3 px-2 text-center rounded-[1rem] text-[16px] font-black outline-none transition-all border-none appearance-none focus:ring-2 focus:ring-white/80" style={{color: phaseColor}} placeholder="-" />
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
              <button onClick={salvaSessione} className="w-full mt-6 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-black uppercase tracking-widest text-[16px] rounded-2xl shadow-[0_8px_20px_rgba(6,182,212,0.3)] shrink-0 hover:shadow-[0_12px_25px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 transition-all border-none cursor-pointer">SALVA SESSIONE</button>
            </>
          ) : vistaGraficiCarichi ? (
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar min-h-0 anim-pop" style={{animationDelay: '0.7s'}}>
               <div className="bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] p-6 rounded-[1.5rem]">
                 <label className="text-[10px] text-slate-400 font-bold uppercase block mb-3 px-1 tracking-widest">Seleziona Esercizio:</label>
                 <select value={esercizioGraficoSelezionato} onChange={(e) => setEsercizioGraficoSelezionato(e.target.value)} className="w-full bg-[#E0E5EC] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] text-slate-700 text-[13px] font-bold p-4 rounded-2xl border-none outline-none mb-6 appearance-none">
                   {Object.values(baseDbAllenamento).flatMap(g => g.esercizi).map(es => (<option key={es.id} value={es.id}>{eserciziModificati[es.id] || es.nome}</option>))}
                 </select>
                 <SvgLineChart data={getDataGraficoEsercizio()} label={Object.values(baseDbAllenamento).flatMap(g => g.esercizi).find(e => e.id === esercizioGraficoSelezionato)?.nome || "Esercizio"} />
               </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar min-h-0 anim-pop" style={{animationDelay: '0.7s'}}>
              {storicoSessioni.length === 0 ? <p className="text-[12px] text-slate-500 font-bold text-center p-8 bg-[#E0E5EC] shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] rounded-[2rem]">Nessuna sessione salvata.</p> : (
                [...storicoSessioni].reverse().map((sess) => (
                  <div key={sess.oraId} className="bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] p-6 rounded-[1.5rem]">
                    <span className="font-bold text-cyan-500 drop-shadow-sm block text-[14px] tracking-wide uppercase">{sess.giorno} - Scheda {sess.scheda}</span>
                    <span className="text-[10px] text-slate-400 font-bold mb-5 block tracking-widest mt-1">{sess.data}</span>
                    <div className="space-y-4">
                      {Object.entries(sess.carichi).map(([idEs, pesoStr]) => (
                        <div key={idEs} className="bg-[#e4ebf5] shadow-[inset_3px_3px_6px_#c3d0e0,inset_-3px_-3px_6px_#ffffff] p-3 rounded-2xl flex justify-between items-center gap-4">
                          <span className="text-slate-500 text-[12px] font-bold truncate flex-1">{eserciziModificati[idEs] || Object.values(baseDbAllenamento).flatMap(d=>d.esercizi).find(e=>e.id===idEs)?.nome}</span>
                          <span className="font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1.5 rounded-xl shadow-md text-xs">{pesoStr as string} kg</span>
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

      {/* --- BOTTOM NAVIGATION BAR (Solo su Mobile) --- */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-[#E0E5EC]/90 backdrop-blur-xl shadow-[0_-10px_30px_rgba(163,177,198,0.4)] z-[90] pb-safe flex justify-between border-t border-white/50 px-2 pt-2">
        
        {/* ICONA DATI: Grafico a linee fluido */}
        {renderNavicon('TELEMETRIA', <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>, 'Dati')}
        
        {/* ICONA AI COACH: Esagono neurale con nucleo */}
        {renderNavicon('COACH', <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><circle cx="12" cy="12" r="3"></circle></svg>, 'AI')}
        
        {/* ICONA TURNI: Orologio minimale */}
        {renderNavicon('TURNI', <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>, 'Turni')}
        
        {/* ICONA DIETA: Mela stilizzata */}
        {renderNavicon('NUTRIZIONE', <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>, 'Dieta')}
        
        {/* ICONA WORKOUT: Manubrio da sala pesi */}
        {renderNavicon('ALLENAMENTO', <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M6 4v16"></path><path d="M18 4v16"></path><path d="M2 8h4"></path><path d="M2 16h4"></path><path d="M18 8h4"></path><path d="M18 16h4"></path><path d="M6 12h12"></path></svg>, 'Workout')}
        
      </nav>

      {/* --- MODALE FOCUS TIMER SPLIT SCREEN --- */}
      {focusWorkout && (() => {
        // Recuperiamo i dati dell'esercizio (in caso di swap) e il colore esatto
        const nomeAttuale = eserciziModificati[focusWorkout.id] || focusWorkout.nome;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const altEs = focusWorkout.alternative.find((a: any) => a.nome === nomeAttuale);
        const currentEx = altEs || focusWorkout;
        
        // Calcoliamo i colori e le trasparenze
        const phaseColor = focusWorkout.fase.includes('Fase 1') ? '#f97316' : (focusWorkout.fase.includes('Fase 2') ? '#0ea5e9' : '#ef4444');
        const phaseTint = focusWorkout.fase.includes('Fase 1') ? 'bg-orange-400/15 border-orange-400/30' : (focusWorkout.fase.includes('Fase 2') ? 'bg-cyan-400/15 border-cyan-400/30' : 'bg-red-400/15 border-red-400/30');

        // Ricalcoliamo la stringa delle ripetizioni per mostrarla nel modale
        let repMostrate = focusWorkout.rep;
        if (fastWorkout) repMostrate = repMostrate.replace("4-5 serie", "3 serie").replace("3-4 serie", "2 serie").replace("Rec: 2 min", "Rec: 1.5 min").replace("Rec: 45 sec", "Rec: 1 min");

        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex flex-col justify-end sm:justify-center p-0 sm:p-4 anim-pop">
            <div className="bg-[#E0E5EC] w-full max-h-[95vh] sm:h-auto sm:max-h-[90vh] sm:max-w-md mx-auto sm:rounded-[2rem] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden relative border border-white/20">
              <button onClick={() => setFocusWorkout(null)} className="absolute top-5 right-6 text-slate-400 hover:text-slate-600 text-3xl font-bold z-20 border-none bg-transparent cursor-pointer">&times;</button>
              
              {/* PARTE ALTA: TIMER NEUMORFICO (Neutra) */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-[#E0E5EC] relative shrink-0 pt-16 pb-8">
                 <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-6 drop-shadow-sm">Rest Interval</p>
                 
                 <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#E0E5EC] shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff] mb-8 shrink-0 aspect-square">
                   <div className="absolute inset-4 rounded-full bg-[#E0E5EC] shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center">
                      <div className="absolute inset-6 rounded-full bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                          <span className="text-5xl font-light text-slate-700 font-mono tracking-widest drop-shadow-md">{formatTime(timeLeft)}</span>
                      </div>
                   </div>
                   <svg className="absolute w-full h-full -rotate-90 pointer-events-none drop-shadow-md" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="47" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                     <circle cx="50" cy="50" r="47" fill="none" stroke={phaseColor} strokeWidth="3.5" strokeDasharray="295.3" strokeDashoffset={295.3 - (295.3 * (timeLeft / (totalTimeRef.current || 1)))} strokeLinecap="round" className="transition-all duration-1000 ease-linear" />
                   </svg>
                 </div>
                 
                 <div className="flex gap-8 items-center">
                    <button onClick={() => { setTimeLeft(totalTimeRef.current); setTimerActive(false); }} className="w-14 h-14 rounded-full bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-400 font-black border-none cursor-pointer">⏹</button>
                    <button onClick={() => setTimerActive(!timerActive)} className="w-20 h-20 rounded-full bg-[#E0E5EC] shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] flex items-center justify-center font-black border-none cursor-pointer text-2xl pl-1" style={{color: phaseColor}}>{timerActive ? '⏸' : '▶'}</button>
                    <button onClick={() => setTimeLeft(t => t + 15)} className="w-14 h-14 rounded-full bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-500 font-black text-xs border-none cursor-pointer">+15</button>
                 </div>
              </div>

              {/* PARTE BASSA: ESERCIZIO E INPUT SET (Compatta per no-scroll) */}
              <div className={`${phaseTint} shadow-[0_-8px_20px_rgba(0,0,0,0.1)] p-4 sm:p-6 z-10 overflow-y-auto custom-scrollbar pb-safe sm:pb-8 rounded-t-[2.5rem] border-t shrink-0 flex-1 backdrop-blur-xl flex flex-col justify-between`}>
                 
                 {/* TITOLO ED ESERCIZIO CENTRATI */}
                 <div className="flex flex-col items-center justify-center text-center mb-3 gap-2">
                   {/* Ridotto da w-36 h-32 a w-28 h-20 per recuperare circa 50px di spazio verticale */}
                   <div className="bg-white/50 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] p-2 rounded-[1rem] w-28 h-20 shrink-0 border border-white/40 flex items-center justify-center overflow-hidden">
                     <MediaVisualizer animKey={currentEx.anim || "chest_barbell_flat"} color={phaseColor} />
                   </div>
                   <div>
                     <h3 className="font-black text-[15px] text-slate-700 tracking-tight leading-tight">{nomeAttuale}</h3>
                     {/* Line-clamp-1 assicura che il testo lungo non mandi a capo e mangi spazio */}
                     <p className="text-[10px] text-slate-600 font-bold mt-1 leading-snug line-clamp-1">{currentEx.dettaglio}</p>
                     
                     <div className="mt-2 bg-white/40 shadow-[inset_2px_2px_5px_rgba(163,177,198,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.8)] px-4 py-1.5 rounded-lg border border-white/50 inline-block">
                        <span className="text-[10px] font-black text-slate-600 tracking-widest">{repMostrate}</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="flex gap-2">
                     {Array.from({ length: getNumeroSet(repMostrate) }).map((_, i) => (
                        <div key={i} className="flex-1 relative">
                           <label className="text-[9px] text-slate-600 uppercase font-black tracking-widest block text-center mb-1">Set {i+1}</label>
                           {/* Padding ridotto sui set per non farli sbordare */}
                           <input type="number" value={carichiAttuali[focusWorkout.id]?.[i] || ''} onChange={(e) => updateCaricoSet(focusWorkout.id, i, e.target.value)} className="w-full bg-white/50 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] py-2 px-1 text-center rounded-xl text-[16px] font-black outline-none transition-all border-none appearance-none focus:ring-2 focus:ring-white/80" style={{color: phaseColor}} placeholder="-" />
                        </div>
                     ))}
                 </div>
                 
                 {/* Bottone più sottile e stretto */}
                 <button onClick={() => setFocusWorkout(null)} className="w-full mt-4 py-3 bg-white/50 shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] active:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] text-slate-600 font-black uppercase tracking-widest text-[12px] rounded-xl transition-all border border-white/60 cursor-pointer hover:-translate-y-0.5">CHIUDI E SALVA SET</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- MODALI SWAP --- */}
      {modalEsercizio && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[150] p-4">
          <div className="bg-[#E0E5EC] shadow-[12px_12px_24px_rgba(0,0,0,0.1)] rounded-[2rem] p-8 w-full max-w-md relative anim-pop">
            <div className="flex justify-between items-center mb-6 border-b border-slate-300/50 pb-4">
              <h3 className="font-bold text-xl uppercase tracking-widest text-slate-600">Sostituisci Esercizio</h3>
              <button onClick={() => setModalEsercizio(false)} className="text-slate-400 hover:text-slate-600 text-3xl font-bold transition-colors border-none bg-transparent cursor-pointer">&times;</button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {esercizioDaCambiare.alternative.map((alt: any, i: number) => (
                <button key={i} onClick={() => confermaSwapEsercizio(alt.nome)} className="w-full text-left p-5 bg-[#e4ebf5] shadow-[4px_4px_8px_#c3d0e0,-4px_-4px_8px_#ffffff] rounded-[1.5rem] hover:shadow-[inset_4px_4px_8px_#c3d0e0,inset_-4px_-4px_8px_#ffffff] group transition-all duration-300 border-none cursor-pointer">
                  <p className="font-bold text-[14px] text-slate-600 group-hover:text-[#00c6ff] transition-colors drop-shadow-sm">{alt.nome}</p>
                  <p className="text-[9px] text-[#0072ff] mt-2 uppercase font-bold tracking-widest mb-2">{alt.note}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{alt.dettaglio}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modalAlimento && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[150] p-4">
          <div className="bg-[#E0E5EC] shadow-[12px_12px_24px_rgba(0,0,0,0.1)] rounded-[2rem] p-8 w-full max-w-md relative anim-pop">
            <div className="flex justify-between items-center mb-6 border-b border-slate-300/50 pb-4">
              <h3 className="font-bold text-xl uppercase tracking-widest text-slate-600">Sostituisci Pasto</h3>
              <button onClick={() => setModalAlimento(false)} className="text-slate-400 hover:text-slate-600 text-3xl font-bold transition-colors border-none bg-transparent cursor-pointer">&times;</button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* @ts-ignore */}
              {dbAlimenti[categoriaDaCambiare].map((alt, i) => {
                 const macroCho = alt.baseCarbo * moltiplicatoreCarbo;
                 const swapKcal = Math.round((macroCho * 4) + (alt.pro * 4) + (alt.fat * 9));
                 return (
                  <button key={i} onClick={() => confermaSwapAlimento(i)} className="w-full text-left p-5 bg-[#e4ebf5] shadow-[4px_4px_8px_#c3d0e0,-4px_-4px_8px_#ffffff] rounded-[1.5rem] hover:shadow-[inset_4px_4px_8px_#c3d0e0,inset_-4px_-4px_8px_#ffffff] group transition-all duration-300 border-none cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-bold text-[14px] text-slate-600 group-hover:text-[#00c6ff] transition-colors pr-2 leading-snug">{alt.nome}</p>
                      <span className="text-[9px] bg-[#e4ebf5] shadow-[inset_2px_2px_4px_#c3d0e0,inset_-2px_-2px_4px_#ffffff] text-[#00c6ff] px-3 py-1.5 rounded-lg font-bold tracking-widest shrink-0">{swapKcal} Kcal</span>
                    </div>
                    <p className="text-[9px] text-slate-500 font-bold tracking-widest bg-white/40 inline-block px-3 py-1.5 rounded-lg mb-3 shadow-sm">C <span className="text-[#00c6ff]">{macroCho}g</span> <span className="mx-2 text-slate-300">|</span> P <span className="text-slate-600">{alt.pro}g</span> <span className="mx-2 text-slate-300">|</span> F <span className="text-slate-600">{alt.fat}g</span></p>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed bg-[#e4ebf5] p-3 rounded-xl shadow-[inset_2px_2px_4px_#c3d0e0,inset_-2px_-2px_4px_#ffffff]">{alt.dettaglioGrammi(macroCho, alt.pro, alt.fat)}</p>
                  </button>
                 );
              })}
            </div>
          </div>
        </div>
      )}
      {/* === MODALE SCELTA DALLA DISPENSA === */}
{modalScegliDispensa && (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[150] p-4">
    <div className="bg-[#E0E5EC] shadow-[12px_12px_24px_rgba(0,0,0,0.1)] rounded-[2rem] p-6 w-full max-w-md relative anim-pop max-h-[90vh] flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-slate-300/50 pb-4 shrink-0">
        <h3 className="font-black text-lg uppercase tracking-widest text-slate-600 flex items-center gap-2">
          📦 La Tua Dispensa
        </h3>
        <button onClick={() => { setModalScegliDispensa(null); setRicercaDispensa(""); }} className="text-slate-400 hover:text-slate-600 text-3xl font-bold transition-colors border-none bg-transparent cursor-pointer">&times;</button>
      </div>

      {/* --- TAB E BARRA DI RICERCA --- */}
      <div className="shrink-0 mb-4">
        <div className="flex gap-2 mb-3 bg-white/40 p-1.5 rounded-2xl shadow-inner">
          <button onClick={() => setFiltroDispensa('alimento')} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer ${filtroDispensa === 'alimento' ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-md' : 'bg-transparent text-slate-500 hover:text-orange-500'}`}>🍎 Alimenti</button>
          <button onClick={() => setFiltroDispensa('integratore')} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer ${filtroDispensa === 'integratore' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md' : 'bg-transparent text-slate-500 hover:text-cyan-500'}`}>💊 Integratori</button>
        </div>
        <input 
          type="text" 
          placeholder={`Cerca tra i tuoi ${filtroDispensa === 'alimento' ? 'alimenti' : 'integratori'}...`} 
          value={ricercaDispensa} 
          onChange={e => setRicercaDispensa(e.target.value)} 
          className="w-full bg-[#e4ebf5] shadow-[inset_4px_4px_8px_#c3d0e0,inset_-4px_-4px_8px_#ffffff] text-slate-600 text-xs font-bold px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400/40 transition-all border-none"
        />
      </div>

      {/* --- LISTA CIBI SALVATI (Filtrata per Tab e per Ricerca) --- */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 mb-4">
        {dispensa
          .filter(d => d.tipo === filtroDispensa)
          .filter(d => d.nome.toLowerCase().includes(ricercaDispensa.toLowerCase()))
          .length === 0 ? (
          <div className="text-center py-8">
            <span className="text-4xl block mb-4 opacity-50">🛒</span>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Nessun risultato.</p>
          </div>
        ) : (
          dispensa
            .filter(d => d.tipo === filtroDispensa)
            .filter(d => d.nome.toLowerCase().includes(ricercaDispensa.toLowerCase()))
            .map((item) => (
            <button 
              key={item.id}
              onClick={() => {
                // LOGICA ADDITIVA: Somma i macro e concatena i nomi
                const currentName = pastiCustom[modalScegliDispensa]?.nome || "";
                const newName = currentName ? `${currentName} + ${item.nome}` : item.nome;
                
                const currentCho = Number(pastiCustom[modalScegliDispensa]?.cho) || 0;
                const currentPro = Number(pastiCustom[modalScegliDispensa]?.pro) || 0;
                const currentFat = Number(pastiCustom[modalScegliDispensa]?.fat) || 0;

                updateCustomMeal(modalScegliDispensa, 'nome', newName);
                updateCustomMeal(modalScegliDispensa, 'cho', (currentCho + Number(item.cho)).toString());
                updateCustomMeal(modalScegliDispensa, 'pro', (currentPro + Number(item.pro)).toString());
                updateCustomMeal(modalScegliDispensa, 'fat', (currentFat + Number(item.fat)).toString());
                
                setModalScegliDispensa(null);
                setRicercaDispensa(""); 
              }}
              className="w-full text-left p-4 bg-[#e4ebf5] shadow-[4px_4px_8px_#c3d0e0,-4px_-4px_8px_#ffffff] rounded-[1.5rem] hover:shadow-[inset_4px_4px_8px_#c3d0e0,inset_-4px_-4px_8px_#ffffff] group transition-all duration-300 border-none cursor-pointer flex flex-col gap-3"
            >
              <p className="font-bold text-[14px] text-slate-700 group-hover:text-orange-500 transition-colors">{item.nome}</p>
              <div className="flex gap-2">
                <span className="bg-[#E0E5EC] shadow-[inset_2px_2px_4px_#c3d0e0,inset_-2px_-2px_4px_#ffffff] text-[9px] font-black text-slate-500 px-3 py-1.5 rounded-lg tracking-widest flex-1 text-center">C <span className="text-orange-500">{item.cho}g</span></span>
                <span className="bg-[#E0E5EC] shadow-[inset_2px_2px_4px_#c3d0e0,inset_-2px_-2px_4px_#ffffff] text-[9px] font-black text-slate-500 px-3 py-1.5 rounded-lg tracking-widest flex-1 text-center">P <span className="text-slate-600">{item.pro}g</span></span>
                <span className="bg-[#E0E5EC] shadow-[inset_2px_2px_4px_#c3d0e0,inset_-2px_-2px_4px_#ffffff] text-[9px] font-black text-slate-500 px-3 py-1.5 rounded-lg tracking-widest flex-1 text-center">F <span className="text-slate-600">{item.fat}g</span></span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* --- MOTORE A.I. (Foto, Testo, Calcolo) ISOLATO --- */}
      <div className="pt-4 border-t border-slate-300/50 shrink-0">
        <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest block mb-3">Analizza e Salva Nuovo Prodotto</span>
        <div className="flex gap-3 mb-3 items-center">
          <label className="bg-white/60 shadow-[2px_2px_5px_rgba(163,177,198,0.4)] text-slate-500 hover:text-orange-500 w-12 h-12 flex items-center justify-center shrink-0 rounded-xl transition-all border-none cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => gestisciCaricamentoFilePasto(e, 'ScannerAI')} />
            <span className="text-[16px] leading-none">📸</span>
          </label>
          
          {/* INPUT ISOLATO (Non tocca più il pasto principale finché non salvi) */}
          <input type="text" placeholder="Es. 30g Mandorle..." value={formAInuovo.nome} onChange={e => setFormAInuovo({...formAInuovo, nome: e.target.value})} className={"w-full bg-white/50 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] px-4 py-3 rounded-xl text-[13px] text-slate-600 outline-none transition-all font-semibold border-none"} />
          
          <button 
            onClick={async () => {
              if (!formAInuovo.nome && !fileCustomPasto['ScannerAI']) return alert("Inserisci un nome o allega una foto!");
              setIsCalculatingAI(true);
              try {
                const payload: any = { message: `
                  Analizza: "${formAInuovo.nome || 'Foto allegata'}". 
                  Se il nome è "Foto allegata", scrivi tu il nome esatto del prodotto che leggi sulla confezione.
                  Restituisci la stringa esatta: [MAGIC_MACRO | ScannerAI | cho | pro | fat | Nome Completo Del Prodotto]
                ` };
                
                if (fileCustomPasto['ScannerAI']) {
                  payload.file = { data: fileCustomPasto['ScannerAI'].data, mimeType: fileCustomPasto['ScannerAI'].mimeType };
                }
                const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                const data = await response.json();
                
                // REGEX CORRETTA
                const match = data.reply.match(/\[MAGIC_MACRO\s*\|\s*([^|]+)\s*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([^\]]+)\]/i);
                
                if(match) {
                  setFormAInuovo({
                    nome: match[5].trim(), 
                    cho: Math.round(parseFloat(match[2].replace(',','.'))).toString(),
                    pro: Math.round(parseFloat(match[3].replace(',','.'))).toString(),
                    fat: Math.round(parseFloat(match[4].replace(',','.'))).toString()
                  });
                  setFileCustomPasto(prev => ({...prev, 'ScannerAI': null}));
                } else { alert("Errore di formattazione. Riprova."); }
              } catch(e) { console.log(e); alert("Errore di connessione A.I."); }
              setIsCalculatingAI(false);
            }} 
            disabled={isCalculatingAI} 
            className={"bg-gradient-to-r from-lime-400 to-emerald-500 text-white shadow-[0_4px_10px_rgba(16,185,129,0.3)] font-bold !w-auto !py-3 !px-4 !rounded-xl disabled:opacity-50 border-none cursor-pointer"}
          >
            {isCalculatingAI ? '...' : '/ AI'}
          </button> 
            disabled={isCalculatingAI} 
            className={"bg-gradient-to-r from-lime-400 to-emerald-500 text-white shadow-[0_4px_10px_rgba(16,185,129,0.3)] font-bold !w-auto !py-3 !px-4 !rounded-xl disabled:opacity-50 border-none cursor-pointer"}
          >
            {isCalculatingAI ? '...' : '/ AI'}
          </button>
        </div>

        {fileCustomPasto['ScannerAI'] && (
          <div className="flex items-center gap-2 mb-3 p-2 bg-white/50 rounded-xl w-fit border border-white/60">
            <span className="text-[10px] font-bold text-orange-500 truncate max-w-[150px]"> {fileCustomPasto['ScannerAI'].nome}</span>
            <button onClick={() => setFileCustomPasto(prev => ({...prev, 'ScannerAI': null}))} className="text-red-500 hover:text-red-700 font-bold ml-2 border-none bg-transparent cursor-pointer">&times;</button>
          </div>
        )}

        {/* --- RISULTATO A.I. E SALVATAGGIO --- */}
        {formAInuovo.nome && (formAInuovo.cho !== "" || formAInuovo.pro !== "" || formAInuovo.fat !== "") && (
          <div className="bg-white/40 p-3 rounded-xl border border-white/60 shadow-sm mt-2">
            <div className="flex gap-2 mb-3">
              <div className="flex-1"><span className={"text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-2 px-1 text-center !mb-1"}>Carbo</span><input type="number" value={formAInuovo.cho} onChange={e => setFormAInuovo({...formAInuovo, cho: e.target.value})} className={"w-full shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] px-4 text-[13px] text-slate-600 outline-none transition-all font-semibold border-none text-center bg-white/50 !py-2 !rounded-lg"} /></div>
              <div className="flex-1"><span className={"text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-2 px-1 text-center !mb-1"}>Pro</span><input type="number" value={formAInuovo.pro} onChange={e => setFormAInuovo({...formAInuovo, pro: e.target.value})} className={"w-full shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] px-4 text-[13px] text-slate-600 outline-none transition-all font-semibold border-none text-center bg-white/50 !py-2 !rounded-lg"} /></div>
              <div className="flex-1"><span className={"text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-2 px-1 text-center !mb-1"}>Fat</span><input type="number" value={formAInuovo.fat} onChange={e => setFormAInuovo({...formAInuovo, fat: e.target.value})} className={"w-full shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] px-4 text-[13px] text-slate-600 outline-none transition-all font-semibold border-none text-center bg-white/50 !py-2 !rounded-lg"} /></div>
            </div>
            <button 
              onClick={() => {
                // 1. Salva in dispensa
                setDispensa(prev => [{
                  id: Date.now().toString(),
                  nome: formAInuovo.nome.trim(), 
                  cho: formAInuovo.cho || "0", 
                  pro: formAInuovo.pro || "0", 
                  fat: formAInuovo.fat || "0",
                  tipo: filtroDispensa
                }, ...prev]);
                
                // 2. Aggiunge al pasto principale in modo pulito (Logica Additiva)
                const currentName = pastiCustom[modalScegliDispensa]?.nome || "";
                const newName = currentName ? `${currentName} + ${formAInuovo.nome.trim()}` : formAInuovo.nome.trim();
                const currentCho = Number(pastiCustom[modalScegliDispensa]?.cho) || 0;
                const currentPro = Number(pastiCustom[modalScegliDispensa]?.pro) || 0;
                const currentFat = Number(pastiCustom[modalScegliDispensa]?.fat) || 0;

                updateCustomMeal(modalScegliDispensa, 'nome', newName);
                updateCustomMeal(modalScegliDispensa, 'cho', (currentCho + Number(formAInuovo.cho || 0)).toString());
                updateCustomMeal(modalScegliDispensa, 'pro', (currentPro + Number(formAInuovo.pro || 0)).toString());
                updateCustomMeal(modalScegliDispensa, 'fat', (currentFat + Number(formAInuovo.fat || 0)).toString());
                
                // 3. Reset form isolato e chiusura
                setFormAInuovo({ nome: '', cho: '', pro: '', fat: '' });
                setModalScegliDispensa(null);
                setRicercaDispensa("");
              }}
              className="w-full bg-gradient-to-r from-lime-400 to-emerald-500 text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl shadow-[0_4px_10px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_15px_rgba(16,185,129,0.4)] transition-all border-none cursor-pointer"
            >
              + Salva in {filtroDispensa === 'alimento' ? 'Alimenti' : 'Integratori'} e Usa
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
)}
      {/* === ADMIN CONTROL ROOM (MODALE) === */}
          {showAdmin && (
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[9999] p-4 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col items-center">
              <div className="w-full max-w-5xl bg-[#E0E5EC] rounded-[2rem] shadow-2xl p-6 sm:p-8 relative mt-10 mb-10">
                <button onClick={() => setShowAdmin(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 text-3xl font-black transition-colors border-none bg-transparent cursor-pointer">&times;</button>
                <h2 className="text-2xl font-black uppercase tracking-widest text-slate-700 mb-8">Admin <span className="text-red-500">Control Room</span></h2>
                
                {/* PANNELLO AGGIUNGI NUOVO CLIENTE */}
                <div className="bg-white/50 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3)] p-6 rounded-3xl mb-8 border border-white/50">
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-4">Nuovo Accesso Premium</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
                    <div><label className={UI.label}>Email</label><input type="email" value={nuovoUtentePremium.email} onChange={e=>setNuovoUtentePremium({...nuovoUtentePremium, email: e.target.value})} className={UI.input + " bg-white/60"} /></div>
                    <div><label className={UI.label}>Password</label><input type="text" value={nuovoUtentePremium.password} onChange={e=>setNuovoUtentePremium({...nuovoUtentePremium, password: e.target.value})} className={UI.input + " bg-white/60"} /></div>
                    <div><label className={UI.label}>Nome Atleta (Uguale al DB)</label><input type="text" value={nuovoUtentePremium.nome_atleta} onChange={e=>setNuovoUtentePremium({...nuovoUtentePremium, nome_atleta: e.target.value})} className={UI.input + " bg-white/60"} placeholder="Es. Mario" /></div>
                    <div><label className={UI.label}>Scadenza</label><input type="date" value={nuovoUtentePremium.scadenza} onChange={e=>setNuovoUtentePremium({...nuovoUtentePremium, scadenza: e.target.value})} className={UI.input + " bg-white/60"} /></div>
                    <button onClick={async () => {
                      if (!nuovoUtentePremium.email || !nuovoUtentePremium.scadenza) return alert("Inserisci almeno Email e Scadenza.");
                      const { error } = await supabase.from('utenti_premium').insert([{ 
                        email: nuovoUtentePremium.email, 
                        password: nuovoUtentePremium.password, 
                        nome_atleta: nuovoUtentePremium.nome_atleta, 
                        data_scadenza: nuovoUtentePremium.scadenza 
                      }]);
                      if (error) {
                        alert("Errore Database: " + error.message);
                      } else {
                        setNuovoUtentePremium({ email: '', password: '', nome_atleta: '', scadenza: '' });
                        apriAdmin();
                        alert("Atleta aggiunto con successo!");
                      }
                    }} className={UI.btnPrimary + " h-12"}>+ AGGIUNGI</button>
                  </div>
                </div>

                {/* --- LISTA CLIENTI ATTIVI, RICERCA E GESTIONE SCADENZE --- */}
                <div className="space-y-6 mt-8 border-t border-slate-300/50 pt-8">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                     <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest">Database Atleti</h3>
                     
                     <div className="relative w-full sm:w-72">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">⌕</span>
                        <input 
                           type="text" 
                           placeholder="Cerca per nome o email..." 
                           value={ricercaAdmin}
                           onChange={(e) => setRicercaAdmin(e.target.value)}
                           className="w-full bg-[#E0E5EC] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] text-slate-600 text-xs font-bold pl-10 pr-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-lime-500/40 transition-all border-none"
                        />
                     </div>
                  </div>

                  <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                    {adminUtenti
                      .filter(u => u.nome_atleta.toLowerCase().includes(ricercaAdmin.toLowerCase()) || u.email.toLowerCase().includes(ricercaAdmin.toLowerCase()))
                      .map((u, idx) => {
                        
                        const oggi = new Date();
                        const scadenza = new Date(u.data_scadenza);
                        const diffGiorni = Math.ceil((scadenza.getTime() - oggi.getTime()) / (1000 * 3600 * 24));
                        
                        let statusColor = "bg-emerald-500 shadow-[0_0_8px_#10b981]";
                        let statusText = "ATTIVO";
                        if (diffGiorni < 0) {
                           statusColor = "bg-rose-500 shadow-[0_0_8px_#f43f5e]";
                           statusText = "SCADUTO";
                        } else if (diffGiorni <= 7) {
                           statusColor = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
                           statusText = "IN SCADENZA";
                        }

                        return (
                        <div key={idx} className="bg-[#E0E5EC] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 transition-all hover:shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]">
                          
                          <div className="flex-1 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex flex-col items-center justify-center shrink-0">
                               <div className={`w-3 h-3 rounded-full ${statusColor} mb-1 animate-pulse`}></div>
                               <span className="text-[7px] font-black uppercase tracking-widest text-slate-400">{statusText}</span>
                            </div>
                            
                            <div>
                               <p className="font-black text-slate-700 text-lg uppercase">{u.nome_atleta}</p>
                               <p className="text-xs text-slate-500 font-bold tracking-widest">{u.email} <span className="text-slate-300 mx-2">|</span> Pass: {u.password}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 w-full sm:w-auto">
                            <input type="date" defaultValue={u.data_scadenza} onChange={(e) => u.nuova_scadenza = e.target.value} className={UI.input + " !w-auto text-center font-black text-slate-500 !py-2.5"} />
                            <button onClick={async () => {
                              if(u.nuova_scadenza) {
                                await supabase.from('utenti_premium').update({ data_scadenza: u.nuova_scadenza }).eq('id', u.id);
                                alert(`Scadenza per ${u.nome_atleta} aggiornata al ${u.nuova_scadenza}!`);
                                apriAdmin();
                              }
                            }} className="bg-emerald-500 text-white font-bold px-4 py-3 rounded-xl uppercase tracking-widest text-[10px] shadow-[0_4px_10px_rgba(16,185,129,0.3)] hover:scale-105 transition-all border-none cursor-pointer">
                              AGGIORNA
                            </button>
                            <button onClick={async () => {
                              if(confirm(`Sei assolutamente sicuro di voler revocare l'accesso a ${u.nome_atleta}?`)) {
                                await supabase.from('utenti_premium').delete().eq('id', u.id);
                                apriAdmin();
                              }
                            }} className="bg-[#E0E5EC] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] text-red-500 hover:text-red-700 font-bold px-4 py-3 rounded-xl uppercase tracking-widest text-[10px] transition-all active:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff] border-none cursor-pointer">
                              ELIMINA
                            </button>
                          </div>
                        </div>
                      )})}
                      
                      {adminUtenti.length === 0 && <p className="text-center text-slate-400 font-bold text-sm py-4">Nessun utente nel database.</p>}
                      {adminUtenti.length > 0 && adminUtenti.filter(u => u.nome_atleta.toLowerCase().includes(ricercaAdmin.toLowerCase()) || u.email.toLowerCase().includes(ricercaAdmin.toLowerCase())).length === 0 && (
                         <p className="text-center text-slate-400 font-bold text-sm py-4">Nessun atleta trovato con questa ricerca.</p>
                      )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <style dangerouslySetInnerHTML={{__html: ".custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.02); border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,198,255,0.5); } .pb-safe { padding-bottom: env(safe-area-inset-bottom); }"}} />
      {/* --- ARCHIVIO 2D (OMBRA CORRETTA E LARGHEZZA ESTREMA) --- */}
          {hudActive && (
            <div 
              className="fixed inset-0 z-[9990] overflow-hidden flex items-center justify-center"
              style={{
                '--start-x': `${hudActive.x}px`,
                '--start-y': `${hudActive.y}px`,
              } as React.CSSProperties}
              onClick={() => {
                setIsHudClosing(true);
                setTimeout(() => { setHudActive(null); setIsHudClosing(false); }, 700);
              }} 
            >
              {/* SFONDO SFOCATO */}
              <div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-xl ${isHudClosing ? 'archive-bg-out' : 'archive-bg-in'}`}></div>

              {/* CONTENITORE DEL MAZZO */}
              <div className={`absolute w-[280px] h-[340px] ${isHudClosing ? 'archive-fly-out' : 'archive-fly-in'}`}>
                
                {/* --- 1. ARCHIVIO SUPERIORE --- */}
                {[7, 6, 5, 4, 3, 2, 1].map((i) => (
                  <div 
                    key={`top-${i}`} 
                    className={`absolute inset-0 rounded-[32px] pointer-events-none ${isHudClosing ? 'collapse-all' : `fan-top-${i}`}`} 
                    style={{ 
                      zIndex: 30 - i, // Livelli da 23 a 29
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.5)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                  ></div>
                ))}

                {/* --- 2. SCHEDA PRINCIPALE (Ora sta SOTTO le schede in primo piano) --- */}
                <div 
                  className={`absolute inset-0 rounded-[32px] p-6 flex flex-col items-center justify-center shadow-[0_40px_80px_rgba(0,0,0,0.5)] pointer-events-none ${isHudClosing ? 'collapse-all' : 'extract-main'}`}
                  style={{ 
                    zIndex: 40, // Minore delle schede scartate (50 e 60) per far cadere l'ombra dietro!
                    background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.9)'
                  }}
                >
                  <div className="w-28 h-28 bg-slate-100 rounded-[2rem] flex items-center justify-center shadow-[inset_2px_2px_12px_rgba(0,0,0,0.1),_0_10px_20px_rgba(0,0,0,0.05)] mb-8 relative overflow-hidden">
                    <span className="text-6xl drop-shadow-sm">💊</span>
                  </div>
                  
                  <h3 className="text-slate-800 font-black uppercase tracking-widest text-center text-base mb-2 leading-tight">
                    {hudActive.name}
                  </h3>
                  <p className="text-[10px] text-orange-500 uppercase tracking-widest font-bold text-center">
                    Scheda Estratta
                  </p>
                </div>

                {/* --- 3. CASELLE SCARTATE (Livello superiore, larghezza estrema) --- */}
                <div 
                  className={`absolute inset-0 pointer-events-none ${isHudClosing ? 'collapse-all' : 'drop-down-1'}`}
                  style={{ zIndex: 50, filter: 'drop-shadow(0 -10px 20px rgba(0,0,0,0.15))' }}
                >
                  <div 
                    className="w-full h-full rounded-[32px]"
                    style={{
                      background: '#ffffff',
                      clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'
                    }}
                  ></div>
                </div>

                <div 
                  className={`absolute inset-0 pointer-events-none ${isHudClosing ? 'collapse-all' : 'drop-down-2'}`}
                  style={{ zIndex: 60, filter: 'drop-shadow(0 -10px 30px rgba(0,0,0,0.2))' }}
                >
                  <div 
                    className="w-full h-full rounded-[32px]"
                    style={{
                      background: '#f8fafc',
                      clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)'
                    }}
                  ></div>
                </div>

              </div>

              {/* REGOLE CSS - GEOMETRIA E ANIMAZIONI */}
              <style dangerouslySetInnerHTML={{__html: `
                .archive-bg-in { animation: fadeIn 0.4s ease-out forwards; }
                .archive-bg-out { animation: fadeOut 0.4s ease-out 0.3s forwards; }

                .archive-fly-in { animation: flyToCenter 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                .archive-fly-out { animation: flyToButton 0.4s cubic-bezier(0.8, 0.2, 0.8, 1) 0.1s forwards; }

                .extract-main { animation: extractMainCard 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards; }

                .drop-down-1 { animation: dropDown1 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards; }
                .drop-down-2 { animation: dropDown2 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards; }

                .fan-top-1 { animation: top1 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards; }
                .fan-top-2 { animation: top2 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards; }
                .fan-top-3 { animation: top3 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards; }
                .fan-top-4 { animation: top4 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards; }
                .fan-top-5 { animation: top5 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards; }
                .fan-top-6 { animation: top6 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards; }
                .fan-top-7 { animation: top7 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards; }

                .collapse-all { animation: collapseCards 0.3s ease-in forwards; }

                /* --- KEYFRAMES --- */
                @keyframes flyToCenter {
                  0% { top: var(--start-y); left: var(--start-x); transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
                  100% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
                @keyframes flyToButton {
                  0% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; }
                  100% { top: var(--start-y); left: var(--start-x); transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
                }

                @keyframes extractMainCard {
                  0% { transform: translateY(200px) scale(0.9); opacity: 0; }
                  100% { transform: translateY(-90px) scale(1.05); opacity: 1; }
                }

                /* 
                  Scale spinto a 1.30 e 1.45.
                  Y abbassato a 355px e 450px per bilanciare l'ingrandimento verticale.
                */
                @keyframes dropDown1 { 
                  0% { transform: translateY(0) scale(1); opacity: 1; }
                  100% { transform: translateY(355px) scale(1.30); opacity: 1; } 
                }
                @keyframes dropDown2 { 
                  0% { transform: translateY(0) scale(1); opacity: 1; }
                  100% { transform: translateY(450px) scale(1.45); opacity: 1; } 
                }

                /* Archivio superiore */
                @keyframes top1 { 100% { transform: translateY(-130px) scale(0.95); opacity: 0.95; } }
                @keyframes top2 { 100% { transform: translateY(-170px) scale(0.90); opacity: 0.85; } }
                @keyframes top3 { 100% { transform: translateY(-205px) scale(0.85); opacity: 0.75; } }
                @keyframes top4 { 100% { transform: translateY(-235px) scale(0.80); opacity: 0.60; } }
                @keyframes top5 { 100% { transform: translateY(-260px) scale(0.75); opacity: 0.45; } }
                @keyframes top6 { 100% { transform: translateY(-275px) scale(0.70); opacity: 0.25; } }
                @keyframes top7 { 100% { transform: translateY(-285px) scale(0.65); opacity: 0.10; } }

                @keyframes collapseCards {
                  100% { transform: translateY(0) scale(1); opacity: 1; }
                }

                @keyframes fadeIn { to { opacity: 1; } }
                @keyframes fadeOut { to { opacity: 0; } }
              `}} />
            </div>
          )}
      </main>
    );
  }
