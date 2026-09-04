"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";
import { MediaVisualizer } from './animations';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqawxoocwtxfkahzyduq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chiave-temporanea-per-il-build";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const colorBg = "bg-[#e8eef3]";
const shadowOutset = "shadow-[8px_8px_16px_#c1c9d2,-8px_-8px_16px_#ffffff]";
const shadowInset = "shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff]";
const shadowOutsetSm = "shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff]";
const shadowInsetSm = "shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff]";
const gradPrimary = "bg-gradient-to-r from-[#00c6ff] to-[#0072ff]"; 

const UI = {
  bg: colorBg,
  card: `${colorBg} ${shadowOutset} rounded-[2rem] p-6 lg:p-8`,
  panelInset: `${colorBg} ${shadowInset} rounded-[1.5rem] p-5`,
  panelOutset: `${colorBg} ${shadowOutsetSm} rounded-[1.5rem] p-5`,
  input: `w-full ${colorBg} ${shadowInsetSm} px-5 py-3.5 rounded-2xl text-[13px] text-slate-700 outline-none focus:ring-2 focus:ring-[#00c6ff]/40 transition-all font-semibold placeholder:text-slate-400 border-none appearance-none`,
  btnPrimary: `${gradPrimary} shadow-[0_8px_15px_rgba(0,114,255,0.3)] hover:shadow-[0_12px_20px_rgba(0,114,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-white font-bold uppercase tracking-widest rounded-2xl py-3.5 px-6 flex items-center justify-center border-none`,
  btnSecondary: `${colorBg} ${shadowOutsetSm} active:${shadowInsetSm} text-slate-500 hover:text-[#00c6ff] py-2.5 px-5 rounded-2xl font-bold uppercase tracking-widest transition-all duration-200 text-[10px]`,
  label: "text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-2 px-1",
  pillActive: `${gradPrimary} text-white font-bold shadow-[0_4px_10px_rgba(0,114,255,0.3)]`,
  pillInactive: `${colorBg} ${shadowOutsetSm} text-slate-500 font-bold hover:text-[#00c6ff]`
};

const baseDbAllenamento={Spinta:{focus:"SPINTA (Petto, Spalle, Tricipiti)",esercizi:[{id:"e1",nome:"Panca piana bilanciere",anim:"chest_barbell_flat",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"BILANCIERE: Disteso su panca piana.",alternative:[{nome:"Chest Press Convergente",anim:"chest_machine_flat",note:"Stesso asse di spinta",dettaglio:"MACCHINARIO: Siediti in appoggio."},{nome:"Panca piana manubri",anim:"chest_db_flat",note:"Maggiore ROM",dettaglio:"MANUBRI: Disteso su panca piana."}]},{id:"e3",nome:"Panca inclinata manubri",anim:"chest_db_incline",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"MANUBRI: Panca a 30-45°.",alternative:[{nome:"Panca inclinata bilanciere",anim:"chest_barbell_incline",note:"Focus forza",dettaglio:"BILANCIERE: Panca inclinata."},{nome:"Chest Press Inclinata",anim:"chest_machine_incline",note:"Tensione costante",dettaglio:"MACCHINARIO: Usa la variante inclinata."}]},{id:"e4",nome:"Chest press",anim:"chest_machine_flat",fase:"Fase 2: Connessione",rep:"3-4 serie, 10-12 rep | Rec: 1.5 min",dettaglio:"MACCHINARIO: Esercizio guidato per isolare il pettorale.",alternative:[{nome:"Pectoral Machine",anim:"chest_pec_deck",note:"Isolamento sternale",dettaglio:"MACCHINARIO: Tieni i gomiti alti."},{nome:"Croci cavi seduto",anim:"chest_cable_seated",note:"Picco di tensione",dettaglio:"CAVI: Posiziona una panca al centro."}]},{id:"e5",nome:"Croci ai manubri",anim:"chest_flye_db",fase:"Fase 3: Pump",rep:"3-4 serie, 15 rep | Rec: 45 sec",dettaglio:"MANUBRI: Panca piana.",alternative:[{nome:"Croci cavi piana",anim:"chest_cable_flat",note:"Tensione continua",dettaglio:"CAVI: Dai cavi bassi."},{nome:"Pec Deck (Fly)",anim:"chest_pec_deck",note:"Pump controllato",dettaglio:"MACCHINARIO: Usa il pec deck."}]},{id:"e18",nome:"Lento avanti manubri",anim:"shoulder_db_seated",fase:"Fase 1: Forza Spalle",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"MANUBRI: Seduto a 90°.",alternative:[{nome:"Military Press",anim:"shoulder_military",note:"Carico massimo",dettaglio:"BILANCIERE: In piedi."},{nome:"Shoulder Press",anim:"shoulder_machine",note:"Spinta guidata",dettaglio:"MACCHINARIO: Esercizio di spinta verticale."}]},{id:"e20",nome:"Alzate laterali cavi",anim:"lateral_cable",fase:"Fase 3: Pump Spalle",rep:"3-4 serie, 10-12 rep | Rec: 45 sec",dettaglio:"CAVI: Tira il cavo lateralmente dal basso.",alternative:[{nome:"Alzate manubri",anim:"lateral_db",note:"Focus classico",dettaglio:"MANUBRI: In piedi."},{nome:"Alzate macchina",anim:"lateral_machine",note:"No compensazioni",dettaglio:"MACCHINARIO: Isola i deltoidi."}]},{id:"e22",nome:"Panca stretta",anim:"tricep_close_grip",fase:"Fase 1: Forza Tricipiti",rep:"4-5 serie, 6-8 rep | Rec: 2 min",dettaglio:"BILANCIERE: Presa stretta.",alternative:[{nome:"French Press",anim:"tricep_french_press",note:"Stretch capo lungo",dettaglio:"BILANCIERE EZ: Disteso."},{nome:"Dips parallele",anim:"tricep_dips",note:"Catena chiusa",dettaglio:"LIBERO/ZAVORRA: Scendi piegando le braccia."}]},{id:"e27",nome:"Push down corda",anim:"tricep_pushdown",fase:"Fase 3: Pump Tricipiti",rep:"3-4 serie, 12-15 rep | Rec: 45 sec",dettaglio:"CAVI: Spingi verso il basso e apri le estremità.",alternative:[{nome:"Push down sbarra",anim:"tricep_pushdown",note:"Carico maggiore",dettaglio:"CAVI: Sbarra dritta."},{nome:"Estensioni nuca",anim:"tricep_overhead",note:"Enfasi capo lungo",dettaglio:"CAVI: Dai cavi bassi dietro la testa."}]}]},Tirata:{focus:"TIRATA (Schiena, Bicipiti)",esercizi:[{id:"e6",nome:"Trazioni",anim:"back_pullup",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"CORPO LIBERO: Appeso alla sbarra, tira il corpo verso l'alto.",alternative:[{nome:"Lat Machine Larga",anim:"back_pulldown",note:"Carichi modulabili",dettaglio:"MACCHINARIO: Presa larga prono."},{nome:"Lat Machine Triang.",anim:"back_pulldown_triangle",note:"Focus centrale",dettaglio:"MACCHINARIO: Triangolo presa stretta."}]},{id:"e7",nome:"Rematore bilanciere",anim:"back_row_barbell",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"BILANCIERE: Busto a 45°.",alternative:[{nome:"Rematore Manubrio",anim:"back_row_db",note:"Unilaterale",dettaglio:"MANUBRI: In appoggio su panca."},{nome:"Rematore T-Bar",anim:"back_t_bar",note:"Tirata esplosiva",dettaglio:"MACCHINARIO: Afferra il T-Bar e tira."}]},{id:"e9",nome:"Pulley seduto",anim:"back_pulley",fase:"Fase 2: Connessione",rep:"3-4 serie, 10-12 rep | Rec: 1.5 min",dettaglio:"CAVI: Seduto, tira la maniglia verso l'addome basso.",alternative:[{nome:"Chest Supported",anim:"back_chest_supported",note:"Zero carico lombare",dettaglio:"MACCHINARIO: Petto in appoggio."},{nome:"Seal Row",anim:"back_seal_row",note:"Puro isolamento",dettaglio:"BILANCIERE: Sdraiato prono su panca."}]},{id:"e10",nome:"Pullover ai cavi",anim:"back_pullover_cable",fase:"Fase 3: Pump",rep:"3-4 serie, 15 rep | Rec: 45 sec",dettaglio:"CAVI: Cavo alto con sbarra.",alternative:[{nome:"Pullover Macchina",anim:"back_pullover_cable",note:"Tensione continua",dettaglio:"MACCHINARIO: Macchina specifica."},{nome:"Pullover Manubrio",anim:"back_pullover_db",note:"Stretch toracico",dettaglio:"MANUBRI: Di traverso su panca."}]},{id:"e23",nome:"Curl bilanciere EZ",anim:"bicep_barbell",fase:"Fase 1: Forza Bicipiti",rep:"4-5 serie, 6-8 rep | Rec: 2 min",dettaglio:"BILANCIERE EZ: In piedi. Solleva verso le spalle.",alternative:[{nome:"Curl Manubri Alt.",anim:"bicep_db",note:"Lavoro unilaterale",dettaglio:"MANUBRI: Fletti un braccio alla volta."},{nome:"Curl Cavo Basso",anim:"bicep_cable_bar",note:"Tensione continua",dettaglio:"CAVI: Cavo basso con sbarra corta."}]},{id:"e26",nome:"Curl cavi corda",anim:"bicep_cable",fase:"Fase 3: Pump Bicipiti",rep:"3-4 serie, 12-15 rep | Rec: 45 sec",dettaglio:"CAVI: Fune al cavo basso.",alternative:[{nome:"Curl Inclinata",anim:"bicep_incline_db",note:"Stretch capo lungo",dettaglio:"MANUBRI: Seduto su panca a 45°."},{nome:"Spider Curl",anim:"bicep_spider_curl",note:"Picco bicipite",dettaglio:"BILANCIERE: Petto in appoggio."}]}]},Gambe:{focus:"GAMBE E POLPACCI",esercizi:[{id:"e11",nome:"Squat bilanciere",anim:"leg_squat",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"BILANCIERE: Sui trapezi. Scendi sotto il parallelo.",alternative:[{nome:"Front Squat",anim:"leg_squat",note:"Focus quadricipite",dettaglio:"BILANCIERE: Appoggiato sulle clavicole anteriori."},{nome:"Hack Squat Libero",anim:"leg_hack_barbell",note:"Carico posteriore",dettaglio:"BILANCIERE: Bilanciere dietro le gambe."},{nome:"Hack Squat Macchina",anim:"leg_hack_machine",note:"Zero carico lombare",dettaglio:"MACCHINARIO: Focus spinta."}]},{id:"e12",nome:"Hack squat",anim:"leg_hack_machine",fase:"Fase 1: Forza",rep:"4-5 serie, 4-6 rep | Rec: 2 min",dettaglio:"MACCHINARIO: Poggia schiena.",alternative:[{nome:"Leg Press 45°",anim:"leg_press",note:"Isolamento pressa",dettaglio:"MACCHINARIO: Piedi bassi e stretti."},{nome:"Belt Squat",anim:"leg_belt_squat",note:"Zero stress lombare",dettaglio:"MACCHINARIO: Cintura pesata ai fianchi."}]},{id:"e14",nome:"Pressa 45°",anim:"leg_press",fase:"Fase 2: Connessione",rep:"4-5 serie, 10-12 rep | Rec: 1.5 min",dettaglio:"MACCHINARIO: Scendi portando le ginocchia verso il petto.",alternative:[{nome:"Affondi Manubri",anim:"leg_lunge",note:"Equilibrio",dettaglio:"MANUBRI: In camminata o sul posto."},{nome:"Bulgarian Squat",anim:"leg_bulgarian",note:"Unilaterale",dettaglio:"MANUBRI: Piede posteriore su panca."}]},{id:"e15",nome:"Leg extension",anim:"leg_extension",fase:"Fase 3: Pump Quad",rep:"3-4 serie, 15 rep | Rec: 45 sec",dettaglio:"MACCHINARIO: Distendi le gambe.",alternative:[{nome:"Sissy Squat",anim:"leg_sissy_squat",note:"Bodyweight stretch",dettaglio:"CORPO LIBERO: Blocca i polpacci e lasciati cadere."},{nome:"Step-up controllato",anim:"leg_lunge",note:"Lavoro concentrico",dettaglio:"MANUBRI: Sali su un box alto."}]},{id:"e13",nome:"Stacco rumeno",anim:"leg_deadlift",fase:"Fase 2: Conn. Femorali",rep:"3-4 serie, 10-12 rep | Rec: 1.5 min",dettaglio:"BILANCIERE: Scivola lungo le cosce.",alternative:[{nome:"Stacco Gambe Tese",anim:"leg_deadlift",note:"Stretch puro",dettaglio:"BILANCIERE: Ginocchia dritte."},{nome:"Good Morning",anim:"leg_deadlift",note:"Catena posteriore",dettaglio:"BILANCIERE: Sui trapezi."}]},{id:"e16",nome:"Leg curl sdraiato",anim:"leg_curl",fase:"Fase 3: Pump Femorali",rep:"3-4 serie, 15 rep | Rec: 45 sec",dettaglio:"MACCHINARIO: Prono, porta i talloni ai glutei.",alternative:[{nome:"Leg Curl Seduto",anim:"leg_curl_seduto",note:"Isolamento femorale",dettaglio:"MACCHINARIO: Isola il bicipite femorale."},{nome:"Glute Ham Raise",anim:"leg_curl",note:"Catena chiusa",dettaglio:"MACCHINARIO: Solleva il busto."}]},{id:"e17",nome:"Calf in piedi",anim:"leg_calf",fase:"Fase 3: Pump",rep:"3-4 serie, 20 rep | Rec: 45 sec",dettaglio:"LIBERO/MACCHINA: Scendi al massimo.",alternative:[{nome:"Calf Press",anim:"leg_calf_press",note:"Sovraccarico",dettaglio:"MACCHINARIO: Usa la Leg Press."},{nome:"Calf Seduto",anim:"leg_calf_seated",note:"Focus Soleo",dettaglio:"MACCHINARIO: Seduto, solleva i talloni."}]}]}};
const dbAlimenti={Pasto1:[{nome:"Avena + Whey + Burro",baseCarbo:12,pro:35,fat:15,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.5)}g Avena • ${Math.round(p*1.2)}g Whey • ${f}g Burro`},{nome:"Pancakes avena + Albume",baseCarbo:14,pro:30,fat:10,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.5)}g Farina Avena • ${Math.round(p*10)}g Albume • ${f}g Burro`},{nome:"Uova intere + Segale + Avocado",baseCarbo:10,pro:25,fat:22,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*2)}g Pane Segale • ${Math.round(p/6)} Uova • ${Math.round(f*6)}g Avocado`}],Pasto2:[{nome:"Riso Basmati + Pollo + Olio EVO",baseCarbo:20,pro:40,fat:12,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.25)}g Riso Basmati • ${Math.round(p*4)}g Pollo • ${f}g Olio`},{nome:"Pasta di Semola + Carne Magra",baseCarbo:20,pro:45,fat:10,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.3)}g Pasta • ${Math.round(p*4.5)}g Macinato • ${f}g Olio`},{nome:"Patate dolci + Salmone",baseCarbo:16,pro:40,fat:20,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*4.5)}g Patate • ${Math.round(p*4.5)}g Salmone`}],Pasto3:[{nome:"Yogurt Greco + Mandorle",baseCarbo:5,pro:20,fat:15,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(p*10)}g Yogurt Greco 0% • ${Math.round(f*2)}g Mandorle`},{nome:"Fiocchi di latte + Burro arachidi",baseCarbo:4,pro:25,fat:18,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(p*8)}g Fiocchi Latte • ${f}g Burro Arachidi`},{nome:"Parmigiano (50g) + Fette Wasa",baseCarbo:8,pro:16,fat:14,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(p*3)}g Parmigiano • ${Math.round(c*1.5)}g Wasa`}],PostWorkout:[{nome:"Crema di Riso + Whey",baseCarbo:16,pro:35,fat:1,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.2)}g Crema Riso • ${Math.round(p*1.1)}g Isolate`},{nome:"Corn Flakes + Whey",baseCarbo:16,pro:35,fat:1,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c*1.15)}g Corn Flakes • ${Math.round(p*1.1)}g Isolate`},{nome:"Gallette di riso + Bresaola",baseCarbo:15,pro:30,fat:3,dettaglioGrammi:(c:number,p:number,f:number)=>`⚖️ ${Math.round(c/8)} Gallette Riso • ${Math.round(p*3)}g Bresaola`}]};
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
    return '#c1c9d2'; 
  };
  return (
    <div className={`${UI.panelInset} w-full flex justify-center py-6 mb-5 relative`}>
      <svg width="120" height="180" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
         <defs>
            <linearGradient id="gradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#00c6ff" /><stop offset="100%" stopColor="#0072ff" />
            </linearGradient>
         </defs>
         <circle cx="50" cy="20" r="12" fill="#e8eef3" stroke={getActive('head')} strokeWidth="3" className="transition-all duration-700" />
         <path d="M30 40 Q50 35 70 40 L75 60 L25 60 Z" fill={getActive('chest')} className="transition-colors duration-700" />
         <circle cx="25" cy="45" r="8" fill={getActive('shoulders')} className="transition-colors duration-700" />
         <circle cx="75" cy="45" r="8" fill={getActive('shoulders')} className="transition-colors duration-700" />
         <rect x="15" y="50" width="10" height="30" rx="5" fill={getActive('triceps')} className="transition-colors duration-700" />
         <rect x="75" y="50" width="10" height="30" rx="5" fill={getActive('triceps')} className="transition-colors duration-700" />
         <rect x="13" y="82" width="10" height="25" rx="5" fill={getActive('biceps')} className="transition-colors duration-700" />
         <rect x="77" y="82" width="10" height="25" rx="5" fill={getActive('biceps')} className="transition-colors duration-700" />
         <path d="M32 62 L68 62 L62 110 L38 110 Z" fill={scheda === 'Tirata' ? getActive('back') : '#c1c9d2'} className="transition-colors duration-700" />
         <rect x="35" y="115" width="12" height="40" rx="6" fill={getActive('legs')} className="transition-colors duration-700" />
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
       <span className={UI.label + " !text-[#00c6ff] mb-4"}>{label} - Trend</span>
       <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-md">
          <polyline points={points} fill="none" stroke="#00c6ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {data.map((val, i) => {
            const x = padding + (i / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
            return <g key={i}><circle cx={x} cy={y} r="5" fill="#e8eef3" stroke="#00c6ff" strokeWidth="2" /><text x={x} y={y - 12} fill="#64748b" fontSize="10" textAnchor="middle" fontWeight="bold">{val}</text></g>;
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
  const radius = 160; const strokeW = 55; const c = 2 * Math.PI * radius; const seg = c / 6;
  const getLabelPos = (angleDeg: number) => {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: 250 + radius * Math.cos(rad), y: 250 + radius * Math.sin(rad) };
  };
  const sections = [
    { label: 'BMI', val: bmi, color: '#c084fc', angle: 0 }, { label: 'BMR', val: bmr > 0 ? bmr : '-', color: '#4facfe', angle: 60 },  
    { label: 'MUSCOLO', val: mm > 0 ? `${mm}%` : '-', color: '#60a5fa', angle: 120 }, { label: 'ACQUA', val: bw > 0 ? `${bw}%` : '-', color: '#a855f7', angle: 180 }, 
    { label: 'GRASSO', val: bf > 0 ? `${bf}%` : '-', color: '#38bdf8', angle: 240 }, { label: 'PESO', val: w > 0 ? w : '-', color: '#94a3b8', angle: 300 }        
  ];
  return (
    <div className={UI.panelInset + " relative w-full max-w-md mx-auto h-[380px] flex items-center justify-center overflow-hidden mt-6 !p-0"}>
       <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-md z-10 p-4">
          <g transform="translate(250, 250) rotate(-120)">
             {sections.map((sec, i) => <circle key={i} cx="0" cy="0" r={radius} fill="none" stroke={sec.color} strokeWidth={strokeW} strokeDasharray={`${seg - 4} ${c}`} strokeDashoffset={-(i * seg)} className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer" strokeLinecap="round" />)}
          </g>
          {sections.map((sec, i) => {
             const pos = getLabelPos(sec.angle);
             return (
               <g key={`t-${i}`} className="pointer-events-none">
                 <text x={pos.x} y={pos.y - 8} fill="#829ab1" fontSize="11" textAnchor="middle" fontWeight="bold" className="tracking-widest">{sec.label}</text>
                 <text x={pos.x} y={pos.y + 14} fill="#334155" fontSize="22" textAnchor="middle" fontWeight="900">{sec.val}</text>
               </g>
             )
          })}
          <g transform="translate(250, 250) scale(1.1) translate(-250, -250)">
             <path d="M250,130 C240,130 238,140 238,145 C238,152 242,155 247,158 C235,163 225,175 222,190 C217,205 212,240 212,240 L220,245 C220,245 230,205 235,195 C235,230 233,260 233,260 L238,350 L245,350 L245,260 L255,260 L255,350 L262,350 L267,260 C267,260 265,230 265,195 C270,205 280,245 280,245 L288,240 C288,240 283,195 278,190 C275,175 265,163 253,158 C258,155 262,152 262,145 C262,140 260,130 250,130 Z" fill="url(#gradPrimary)" stroke="#fff" strokeWidth="4"/>
          </g>
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
  const [inizio1, setInizio1] = useState(''); const [fine1, setFine1] = useState('');
  const [inizio2, setInizio2] = useState(''); const [fine2, setFine2] = useState('');
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
  const [pastiSelezionati, setPastiSelezionati] = useState<Record<string, number>>({ Pasto1: 0, Pasto2: 0, Pasto3: 0, PostWorkout: 0 });
  const [pastiCustom, setPastiCustom] = useState<Record<string, {attivo: boolean, cho: string, pro: string, fat: string, nome: string}>>({
    Pasto1: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, Pasto2: { attivo: false, cho: '', pro: '', fat: '', nome: '' },
    Pasto3: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, PostWorkout: { attivo: false, cho: '', pro: '', fat: '', nome: '' },
  });
  const [modalAlimento, setModalAlimento] = useState(false);
  const [categoriaDaCambiare, setCategoriaDaCambiare] = useState<keyof typeof dbAlimenti>('Pasto1');
  const [isCalculatingMacro, setIsCalculatingMacro] = useState<Record<string, boolean>>({});
  const [chatLog, setChatLog] = useState<{role: 'user' | 'ai', text: string}[]>([{ role: 'ai', text: 'Ciao! Sono il tuo Coach IA. Scrivimi cosa hai mangiato per stimare i macro!' }]);
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

  const gestisciCaricamentoPartenza = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onloadend = () => { setFotoPartenza({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); }; reader.readAsDataURL(file); };
  const gestisciCaricamentoArrivo = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onloadend = () => { setFotoArrivo({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); }; reader.readAsDataURL(file); };
  const gestisciCaricamentoFile = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onloadend = () => { setFileAllegato({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); }; reader.readAsDataURL(file); };

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
      const payload: any = { message: msg, context: `SEI IL COACH IA. Utente: ${utenteCorrente}. Estrai Macro e scrivi alla fine: [MAGIC_MACRO | PASTO_TARGET | cho | pro | fat | NOME]` };
      if (fileAllegato) payload.file = { data: fileAllegato.data, mimeType: fileAllegato.mimeType };
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json(); let responseText = data.reply;
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
    if(!nomeCibo.trim()) return alert("Inserisci il nome.");
    setIsCalculatingMacro(prev => ({...prev, [cat]: true}));
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: `Utente: "${nomeCibo}". Calcola macro. Restituisci SOLO: [MAGIC_MACRO | ${cat} | cho | pro | fat | ${nomeCibo}]` }) });
      const data = await response.json();
      const match = data.reply.match(/\[MAGIC_MACRO\s*\|\s*(Pasto1|Pasto2|Pasto3|PostWorkout)\s*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([^\]]+)\]/i);
      if(match) {
        updateCustomMeal(cat, 'cho', Math.round(parseFloat(match[2].replace(',','.'))).toString()); updateCustomMeal(cat, 'pro', Math.round(parseFloat(match[3].replace(',','.'))).toString()); updateCustomMeal(cat, 'fat', Math.round(parseFloat(match[4].replace(',','.'))).toString()); updateCustomMeal(cat, 'nome', match[5].trim());
      } else { alert("Non riconosciuto."); }
    } catch(e) { console.log(e); alert("Errore di rete."); }
    setIsCalculatingMacro(prev => ({...prev, [cat]: false}));
  };

  const valutaCheckFisico = async () => {
    const { peso } = biometria;
    if (peso && eta && altezza) {
      const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo, dieta: tipoDieta, autore: protocolloAutore, metabolismoBloccato } }, data: new Date().toISOString() };
      const { error } = await supabase.from("check_utente").insert([payload]);
      if (error) alert("Errore DB: " + error.message);
      else { alert(`Sistema Aggiornato.`); caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta); } 
    } else { alert("Peso, Età e Altezza sono obbligatori."); }
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

  const intraPro = 15; const intraFat = 0;
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

  const remainingCho = Math.max(0, targetCho - customCho - intraCho); const remainingPro = Math.max(0, targetPro - customPro - intraPro); const remainingFat = Math.max(0, targetFat - customFat - intraFat);
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

  let actualCho = intraCho + customCho, actualPro = intraPro + customPro, actualFat = intraFat + customFat;
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

    const bloccoIntra = { isIntra: true, titolo: "INTEGRAZIONE", descrizione: `${preW}\n\n${intraW}\n\n${saluteW}` };
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
    return (
      <div className={`min-h-screen ${UI.bg} flex items-center justify-center p-4 relative overflow-hidden font-sans`}>
        <div className={UI.card + " w-full max-w-md z-10"}>
           <div className="flex justify-center items-center mb-8">
              <h1 className="text-4xl font-black tracking-tighter uppercase text-center flex-1 text-slate-400">
                OMNI<span className="text-[#00c6ff] drop-shadow-sm">FIT</span>
              </h1>
           </div>
           
           <div className="space-y-6">
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
                   <button onClick={() => setModalWizard(true)} className={UI.btnSecondary + " w-full !text-[#00c6ff]"}>+ Crea Nuovo Profilo A.I.</button>
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
              
              <div className="bg-[#e8eef3] shadow-[5px_5px_10px_#c1c9d2,-5px_-5px_10px_#ffffff] p-4 rounded-2xl flex items-center gap-4">
                 <input type="checkbox" id="metabolismoMain" checked={metabolismoBloccato} onChange={async (e) => {
                    const bloccato = e.target.checked;
                    setMetabolismoBloccato(bloccato);
                    if (biometria.peso && eta && altezza) {
                      const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(biometria.peso), circonferenze: { ...biometria, profilo: { stileVita, obiettivo: protocolloAttivo, dieta: tipoDieta, autore: protocolloAutore, metabolismoBloccato: bloccato } }, data: new Date().toISOString() };
                      await supabase.from("check_utente").insert([payload]);
                    }
                 }} className="w-5 h-5 accent-[#00c6ff] cursor-pointer rounded-md shadow-inner" />
                 <label htmlFor="metabolismoMain" className="text-[11px] text-slate-500 font-bold tracking-widest cursor-pointer uppercase">Stallo Metabolico?</label>
              </div>

              <button onClick={() => caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta)} className={UI.btnPrimary + " mt-8"}>
                 ACCEDI AL SISTEMA
              </button>
           </div>
        </div>

        {modalWizard && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className={UI.card + " w-full max-w-lg relative overflow-hidden"}>
               <button onClick={() => { setModalWizard(false); setStepWizard(1); }} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 font-bold text-2xl transition-colors">&times;</button>
               <h3 className={`font-black text-2xl uppercase tracking-widest mb-8 text-[#00c6ff] drop-shadow-sm`}>Nuova Profilazione</h3>
               
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
                   
                   <div className="bg-[#e8eef3] shadow-[5px_5px_10px_#c1c9d2,-5px_-5px_10px_#ffffff] p-4 rounded-2xl flex items-center gap-4">
                     <input type="checkbox" id="metabolismo" checked={datiWizard.metabolismoBloccato} onChange={e=>setDatiWizard({...datiWizard, metabolismoBloccato: e.target.checked})} className="w-5 h-5 accent-[#00c6ff] rounded cursor-pointer shadow-inner" />
                     <label htmlFor="metabolismo" className="text-xs text-slate-500 font-bold tracking-widest cursor-pointer uppercase">Stallo Metabolico?</label>
                   </div>

                   <div className={UI.panelInset + " flex flex-col gap-4"}>
                     <div>
                        <p className={UI.label + " !px-0"}>📸 Condizione Attuale</p>
                        <input type="file" className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-none file:shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] file:text-[10px] file:font-bold file:tracking-widest file:bg-[#e8eef3] file:text-[#00c6ff] hover:file:text-[#0072ff] transition-all cursor-pointer uppercase" accept="image/*" onChange={gestisciCaricamentoPartenza} />
                     </div>
                     <div className="border-t border-slate-200/50 pt-4">
                        <p className={UI.label + " !px-0"}>📸 Obiettivo Ideale</p>
                        <input type="file" className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-none file:shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] file:text-[10px] file:font-bold file:tracking-widest file:bg-[#e8eef3] file:text-purple-500 hover:file:text-purple-600 transition-all cursor-pointer uppercase" accept="image/*" onChange={gestisciCaricamentoArrivo} />
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

  return (
    <div className={`min-h-screen ${UI.bg} font-sans selection:bg-[#00c6ff]/30 overflow-x-hidden relative`}>
      <main className="p-4 lg:p-8 max-w-7xl mx-auto relative z-10">
        
        <header className="mb-10 pb-6 flex justify-between items-center">
          <div>
            <button onClick={() => setAppState('HOME')} className="text-[9px] uppercase font-bold text-slate-400 hover:text-[#00c6ff] mb-4 block transition-all tracking-widest bg-[#e8eef3] shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] px-4 py-2.5 rounded-full">⬅️ Torna alla Home</button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-slate-400 drop-shadow-sm">
              OMNI<span className="text-[#00c6ff]">COACH</span> <span className="text-slate-400 ml-2 text-xl font-medium tracking-widest">{protocolloAttivo}</span>
            </h1>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-400 block uppercase font-bold mb-2 tracking-widest">Atleta Operativo</span>
            <div className="flex flex-col items-end gap-2.5">
               <span className="text-sm font-black text-slate-700 bg-[#e8eef3] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] px-5 py-2.5 rounded-full tracking-wide">{utenteCorrente}</span>
               <div className="flex gap-2 bg-[#e8eef3] shadow-[3px_3px_6px_#c1c9d2,-3px_-3px_6px_#ffffff] px-3 py-1.5 rounded-full">
                  <span className="text-[9px] font-black text-[#00c6ff] uppercase tracking-widest">{tipoDieta}</span>
                  {protocolloAutore !== 'Nessuno' && <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2 border-l border-slate-300">{protocolloAutore.split(' ')[0]}</span>}
               </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          
          {/* COLONNA SINISTRA: Telemetria & Coach IA */}
          <div className="flex flex-col gap-8 lg:col-span-3">
            <section className={UI.card + " flex flex-col"}>
              <div className="flex justify-between items-center mb-6 pb-2">
                <h2 className="text-lg font-bold tracking-wide text-slate-700">Telemetria</h2>
                <button onClick={() => setVistaTelemetria(vistaTelemetria === 'FORM' ? 'STORICO' : 'FORM')} className={UI.btnSecondary + " !py-2 !px-4"}>
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
                 <div className="space-y-6">
                   <div>
                     <p className={UI.label}>Misure Base</p>
                     <div className="grid grid-cols-2 gap-4">
                       {misureBase.map((m) => (
                           <div key={m.id} className={UI.panelInset + " !p-3.5"}>
                             <label className="text-[9px] text-slate-500 uppercase font-bold flex justify-between tracking-wider mb-1">{m.label} <span className="text-slate-400">{m.unit}</span></label>
                             <input type="number" value={biometria[m.id as keyof typeof biometria] || ''} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none focus:text-[#00c6ff] transition-colors" placeholder="-" />
                           </div>
                       ))}
                     </div>
                   </div>
                   
                   <div>
                     <p className={UI.label}>BIA (Opzionale)</p>
                     <div className="grid grid-cols-2 gap-4">
                       {misureBIA.map((m) => (
                           <div key={m.id} className={UI.panelInset + " !p-3.5"}>
                             <label className="text-[9px] text-slate-500 uppercase font-bold flex justify-between tracking-wider mb-1">{m.label} <span className="text-slate-400">{m.unit}</span></label>
                             <input type="number" value={biometria[m.id as keyof typeof biometria] || ''} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-[#00c6ff] outline-none focus:text-[#0072ff] transition-colors" placeholder="-" />
                           </div>
                       ))}
                     </div>
                   </div>

                   <div className="pt-4">
                      <SvgBodyCompositionWheel data={biometria} altezza={altezza} eta={eta} />
                   </div>

                   <button onClick={valutaCheckFisico} className={UI.btnPrimary + " mt-6"}>Salva Dati</button>
                 </div>
              ) : (
                 <div className="flex-1 overflow-y-auto space-y-5 pr-2 max-h-[600px] custom-scrollbar">
                   {storicoMisure.length === 0 ? <p className="text-[11px] text-slate-400 italic font-bold text-center p-6 bg-[#e8eef3] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] rounded-[2rem]">Nessun dato registrato.</p> : (
                      storicoMisure.map((mis: any) => {
                         const circ = typeof mis.circonferenze === 'string' ? JSON.parse(mis.circonferenze) : (mis.circonferenze || {});
                         return (
                           <div key={mis.id} className={UI.panelOutset + " flex flex-col gap-4 !p-6"}>
                              <div className="flex justify-between items-center mb-2">
                                 <p className="text-[11px] font-bold text-[#00c6ff] tracking-widest">{new Date(mis.data).toLocaleDateString('it-IT')}</p>
                                 <button onClick={() => eliminaMisurazione(mis.id)} className="text-red-400 hover:text-red-500 text-[10px] uppercase font-bold tracking-wider transition-colors shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] px-2.5 py-1.5 rounded-full">🗑️</button>
                              </div>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                 <p className="bg-[#e8eef3] shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between"><span>Peso</span> <strong className="text-slate-700">{mis.peso || '-'}kg</strong></p>
                                 <p className="bg-[#e8eef3] shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between"><span>Petto</span> <strong className="text-slate-700">{circ.petto || '-'}cm</strong></p>
                                 <p className="bg-[#e8eef3] shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between"><span>Spalle</span> <strong className="text-slate-700">{circ.spalle || '-'}cm</strong></p>
                                 <p className="bg-[#e8eef3] shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between"><span>Braccia</span> <strong className="text-slate-700">{circ.braccia || '-'}cm</strong></p>
                                 <p className="bg-[#e8eef3] shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between"><span>Gambe</span> <strong className="text-slate-700">{circ.gambe || '-'}cm</strong></p>
                                 <p className="bg-[#e8eef3] shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl flex justify-between"><span>Glutei</span> <strong className="text-slate-700">{circ.glutei || '-'}cm</strong></p>
                                 <p className="bg-cyan-50 shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl text-cyan-600 flex justify-between"><span>Vita</span> <strong className="text-cyan-600">{circ.vita || '-'}cm</strong></p>
                                 <p className="bg-blue-50 shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] p-3 rounded-xl text-blue-600 flex justify-between"><span>BIA</span> <strong className="text-blue-600">{circ.bodyFat || '-'}%</strong></p>
                              </div>
                           </div>
                         );
                      })
                   )}
                 </div>
              )}
            </section>

            <section className={UI.card + " p-7 flex flex-col h-[480px]"}>
              <h2 className="text-base font-black tracking-widest uppercase text-slate-700 mb-6 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#00c6ff] animate-pulse shadow-[0_0_10px_#00c6ff]"></span> A.I. Coach
              </h2>
              <div className="flex-1 overflow-y-auto space-y-4 p-5 bg-[#e8eef3] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] rounded-[2rem] mb-6 custom-scrollbar">
                {chatLog.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className={`text-[9px] uppercase font-black tracking-widest mb-2 ${msg.role === 'user' ? 'text-slate-400 pr-2' : 'text-[#00c6ff] pl-2'}`}>{msg.role === 'user' ? utenteCorrente : 'Coach'}</span>
                    <div className={`p-4 rounded-[1.5rem] text-[13px] leading-relaxed max-w-[90%] font-semibold shadow-[4px_4px_10px_#c1c9d2,-4px_-4px_10px_#ffffff] ${msg.role === 'user' ? 'bg-[#e8eef3] text-slate-700 rounded-tr-sm' : 'bg-gradient-to-br from-[#00c6ff] to-[#0072ff] text-white rounded-tl-sm shadow-[0_8px_15px_rgba(0,114,255,0.3)]'}`}>{msg.text}</div>
                  </div>
                ))}
                {isTyping && <div className="text-[10px] text-[#00c6ff] font-bold tracking-widest pl-2 animate-pulse mt-2">Elaborazione...</div>}
                <div ref={chatEndRef} />
              </div>
              
              {fileAllegato && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-[#e8eef3] shadow-[4px_4px_10px_#c1c9d2,-4px_-4px_10px_#ffffff] rounded-2xl w-fit">
                  <span className="text-xs text-[#0072ff] font-black tracking-widest truncate max-w-[180px]">📎 {fileAllegato.nome}</span>
                  <button onClick={() => setFileAllegato(null)} className="text-slate-400 hover:text-red-500 font-bold ml-3 transition-colors">&times;</button>
                </div>
              )}
              <div className="flex gap-3 relative">
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={gestisciCaricamentoFile} />
                <button onClick={() => fileInputRef.current?.click()} className={UI.btnSecondary + " !px-5 !py-3.5 !rounded-full shadow-[6px_6px_14px_#c1c9d2,-6px_-6px_14px_#ffffff]"}>📎</button>
                <input type="text" value={inputChat} onChange={e => setInputChat(e.target.value)} onKeyDown={e => e.key === 'Enter' && inviaMessaggioIA()} placeholder="Chiedi o allega..." className={UI.input} />
                <button onClick={inviaMessaggioIA} disabled={isTyping || (!inputChat.trim() && !fileAllegato)} className={UI.btnPrimary + " !w-auto !px-7 !rounded-full disabled:opacity-50 disabled:hover:translate-y-0"}>→</button>
              </div>
            </section>
          </div>

          {/* COLONNA CENTRALE: Turni & Nutrizione */}
          <div className="flex flex-col gap-8 lg:col-span-4">
            <section className={UI.card}>
              <div className="flex justify-between items-center mb-6 pb-2">
                <h2 className="text-lg font-bold tracking-wide text-slate-800">Incastro Turni</h2>
                <select value={tipoTurno} onChange={(e) => setTipoTurno(e.target.value)} className="bg-[#e8eef3] text-xs text-[#00c6ff] font-bold py-2.5 px-4 rounded-full outline-none transition-all shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] appearance-none">
                  <option value="diretto">Turno Diretto</option><option value="spezzato">Turno Spezzato</option>
                </select>
              </div>
              <div className="space-y-5">
                <div className={UI.panelInset + " !p-4"}>
                  <span className="text-[10px] text-[#00c6ff] uppercase font-black tracking-widest mb-3 block">{tipoTurno === 'diretto' ? 'Orario Continuato' : 'Mattina (Lavoro)'}</span>
                  <div className="flex space-x-4">
                    <input type="time" value={inizio1} onChange={e => setInizio1(e.target.value)} className="w-1/2 bg-transparent text-sm font-black text-slate-700 p-2 border-b border-slate-300 outline-none focus:border-[#00c6ff] transition-colors" />
                    <input type="time" value={fine1} onChange={e => setFine1(e.target.value)} className="w-1/2 bg-transparent text-sm font-black text-slate-700 p-2 border-b border-slate-300 outline-none focus:border-[#00c6ff] transition-colors" />
                  </div>
                </div>
                {tipoTurno === 'spezzato' && (
                  <div className={UI.panelInset + " !p-4"}>
                    <span className="text-[10px] text-[#00c6ff] uppercase font-black tracking-widest mb-3 block">Pomeriggio (Lavoro)</span>
                    <div className="flex space-x-4">
                      <input type="time" value={inizio2} onChange={e => setInizio2(e.target.value)} className="w-1/2 bg-transparent text-sm font-black text-slate-700 p-2 border-b border-slate-300 outline-none focus:border-[#00c6ff] transition-colors" />
                      <input type="time" value={fine2} onChange={e => setFine2(e.target.value)} className="w-1/2 bg-transparent text-sm font-black text-slate-700 p-2 border-b border-slate-300 outline-none focus:border-[#00c6ff] transition-colors" />
                    </div>
                  </div>
                )}
                <div className="pt-4 mt-4">
                  <div className="flex justify-between items-center mb-8 bg-[#e8eef3] p-5 rounded-[1.5rem] shadow-[6px_6px_14px_#c1c9d2,-6px_-6px_14px_#ffffff]">
                     <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Digiuno Intermittente 16:8</span>
                     <button onClick={() => setDigiuno(!digiuno)} className={`w-14 h-7 rounded-full relative transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] ${digiuno ? 'bg-[#00c6ff]' : 'bg-slate-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-[4px] transition-transform shadow-[0_2px_5px_rgba(0,0,0,0.2)] ${digiuno ? 'translate-x-8' : 'translate-x-1'}`}></div>
                     </button>
                  </div>
                  <span className={UI.label}>Collocazione Allenamento</span>
                  <div className="flex space-x-3 bg-[#e8eef3] p-2.5 rounded-[2rem] shadow-[inset_5px_5px_10px_#c1c9d2,inset_-5px_-5px_10px_#ffffff]">
                    <button onClick={() => setQuandoTiAlleni('mattina')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-3xl transition-all duration-300 ${quandoTiAlleni === 'mattina' ? UI.pillActive : UI.pillInactive}`}>Mattina</button>
                    {tipoTurno === 'spezzato' && <button onClick={() => setQuandoTiAlleni('pausa')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-3xl transition-all duration-300 ${quandoTiAlleni === 'pausa' ? UI.pillActive : UI.pillInactive}`}>Pausa</button>}
                    <button onClick={() => setQuandoTiAlleni('sera')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-3xl transition-all duration-300 ${quandoTiAlleni === 'sera' ? UI.pillActive : UI.pillInactive}`}>Sera</button>
                  </div>
                </div>
              </div>
            </section>

            <section className={UI.card}>
              <div className="flex flex-col mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-black tracking-widest uppercase text-slate-700">Piano Nutrizionale</h2>
                  <div className="flex gap-2 items-center">
                    {protocolloAutore === 'Gerardo Calvo (Reset Ormonale)' && (
                       <button 
                         onClick={() => {
                            const current = gerardoCarbOverride !== null ? gerardoCarbOverride : [150, 250, 350][giorniSettimana.indexOf(giornoCalendario) % 3];
                            const next = current === 150 ? 250 : (current === 250 ? 350 : 150);
                            setGerardoCarbOverride(next);
                         }}
                         className="text-[9px] bg-[#e8eef3] shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] text-purple-500 px-4 py-2.5 rounded-full font-black uppercase tracking-widest transition-all hover:shadow-[inset_2px_2px_4px_#c1c9d2,inset_-2px_-2px_4px_#ffffff]"
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
                      className={`text-[9px] font-black px-5 py-3 rounded-full uppercase tracking-widest outline-none cursor-pointer text-center appearance-none transition-all shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] ${
                        (protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')) 
                          ? 'bg-[#e8eef3] text-slate-400' 
                          : `${gradPrimary} shadow-[0_8px_15px_rgba(0,114,255,0.25)] text-white`
                      }`}
                    >
                    <option value="Equilibrata" className="bg-[#e8eef3] text-slate-700">⚖️ Equilibrata</option>
                    <option value="Keto" className="bg-[#e8eef3] text-slate-700">🥩 Keto</option>
                    <option value="LowCarb" className="bg-[#e8eef3] text-slate-700">🥑 Low Carb</option>
                    <option value="Zona" className="bg-[#e8eef3] text-slate-700">🧩 Zona</option>
                    <option value="HighCarb" className="bg-[#e8eef3] text-slate-700">🍚 High Carb</option>
                  </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className={UI.panelInset + " flex-1 text-center !p-3"}>
                     <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">BMR</span>
                     <span className="text-[14px] text-slate-700 font-black"><AnimatedCounter value={bmr} /></span>
                  </div>
                  <div className={UI.panelInset + " flex-1 text-center !p-3"}>
                     <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">TDEE</span>
                     <span className="text-[14px] text-slate-700 font-black"><AnimatedCounter value={baseTdee} /></span>
                  </div>
                  <div className={`flex-[1.5] ${gradPrimary} rounded-3xl p-3 text-center shadow-[0_10px_20px_rgba(0,114,255,0.25)] flex flex-col justify-center`}>
                     <span className="text-[9px] text-cyan-100 uppercase font-black tracking-widest block mb-1">INTAKE TARGET</span>
                     <span className="text-[15px] text-white font-black"><AnimatedCounter value={actualIntakeKcal} /> kcal</span>
                  </div>
                </div>
              </div>
              
              {protocolloAutore === 'Lorenzo Lari (Flessibile)' && (
                 <div className={UI.panelOutset + " mb-8 bg-amber-50"}>
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">🟡 BUDGET SGARRO (80/20)</span>
                       <span className="text-sm font-black text-slate-800"><AnimatedCounter value={Math.round(actualIntakeKcal * 0.2)} /> Kcal</span>
                    </div>
                    <div className="w-full bg-[#e8eef3] h-3 rounded-full overflow-hidden flex shadow-[inset_2px_2px_5px_#c1c9d2] mt-3">
                       <div className={`${gradPrimary} h-full w-[80%]`}></div>
                       <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full w-[20%] shadow-[0_0_12px_#fbbf24]"></div>
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
                <div className="space-y-6">
                {generaTimelineDieta().map((blocco, idx) => {
                  if (blocco.isIntra) {
                    return (
                      <div key={`intra-${idx}`} className={`${UI.panelOutset} bg-gradient-to-br from-cyan-50 to-white relative overflow-hidden !p-6`}>
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#00c6ff]"></div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs uppercase font-black text-[#00c6ff] tracking-widest">{blocco.titolo}</span>
                          <span className="text-[10px] font-black text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff] px-4 py-2 rounded-full shadow-md"><AnimatedCounter value={Math.round((intraCho*4)+(intraPro*4))} /> KCAL</span>
                        </div>
                        <p className="font-bold text-xs text-slate-500 whitespace-pre-wrap leading-relaxed">{blocco.descrizione}</p>
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
                    <div key={`${cat}-${idx}`} className={`${UI.panelOutset} !p-6`}>
                      <div className="flex justify-between items-center mb-5">
                        <span className={`text-[12px] uppercase font-black tracking-widest ${isPW ? 'text-[#0072ff]' : 'text-slate-400'}`}>{blocco.titoloUI}</span>
                        <div className="flex gap-3">
                          {!isCustom ? (
                            <>
                              <button onClick={() => toggleCustomMeal(cat)} className={UI.btnSecondary}>Custom</button>
                              <button onClick={() => apriSwapAlimento(cat)} className={UI.btnSecondary + " !text-[#00c6ff]"}>Swap</button>
                            </>
                          ) : (
                             <button onClick={() => resetCustomMeal(cat)} className={UI.btnSecondary + " !text-red-500"}>🗑️ Reset</button>
                          )}
                        </div>
                      </div>
                      
                      {isCustom ? (
                         <div className={`${UI.panelInset} mt-2 !p-5`}>
                           <div className="flex gap-4 mb-5">
                              <input type="text" placeholder="Es. 35g Plumcake" value={pastiCustom[cat].nome} onChange={e => updateCustomMeal(cat, 'nome', e.target.value)} className={UI.input} />
                              <button onClick={() => calcolaMacroDaNome(cat, pastiCustom[cat].nome)} disabled={isCalculatingMacro[cat]} className={UI.btnPrimary + " !w-auto !py-3 !px-6 !rounded-full disabled:opacity-50"}>🪄 AI</button>
                           </div>
                           <div className="flex gap-4">
                              <div className="flex-1"><span className={UI.label + " text-center"}>Carbo</span><input type="number" value={pastiCustom[cat].cho} onChange={e => updateCustomMeal(cat, 'cho', e.target.value)} className={UI.input + " text-center"} /></div>
                              <div className="flex-1"><span className={UI.label + " text-center"}>Pro</span><input type="number" value={pastiCustom[cat].pro} onChange={e => updateCustomMeal(cat, 'pro', e.target.value)} className={UI.input + " text-center"} /></div>
                              <div className="flex-1"><span className={UI.label + " text-center"}>Fat</span><input type="number" value={pastiCustom[cat].fat} onChange={e => updateCustomMeal(cat, 'fat', e.target.value)} className={UI.input + " text-center"} /></div>
                           </div>
                         </div>
                      ) : (
                         <div className={`${UI.panelInset} mt-2 !p-5`}>
                           <p className="font-bold text-[14px] text-slate-700 mb-3">{itemScelto.nome}</p>
                           {finalCho === 0 && finalPro === 0 ? <p className="text-[11px] text-red-500 font-bold bg-red-50 p-3 rounded-xl inline-block shadow-inner">Pasto azzerato (Sgarro o Digiuno).</p> : <p className="text-[12px] text-slate-500 font-semibold leading-relaxed">{itemScelto.dettaglioGrammi(finalCho, finalPro, finalFat)}</p>}
                         </div>
                      )}
                      
                      <div className="mt-6 flex justify-between items-center gap-4">
                         <div className={`flex-1 flex justify-between items-center ${UI.panelInset} !px-6 !py-3`}>
                           <div className="flex flex-col items-center"><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">C</span><span className="text-sm font-black text-[#00c6ff]">{finalCho}g</span></div>
                           <div className="flex flex-col items-center"><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">P</span><span className="text-sm font-black text-slate-700">{finalPro}g</span></div>
                           <div className="flex flex-col items-center"><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">F</span><span className="text-sm font-black text-slate-700">{finalFat}g</span></div>
                         </div>
                         <div className={`${UI.panelOutset} !px-6 !py-2.5 flex flex-col items-center justify-center shrink-0`}>
                            <span className={`text-[15px] font-black leading-none ${isPW ? 'text-[#0072ff]' : 'text-slate-700'}`}><AnimatedCounter value={pastoKcal} /></span>
                            <span className="text-[9px] font-black text-slate-400 tracking-widest mt-1">KCAL</span>
                         </div>
                      </div>
                    </div>
                  );
                })}
                </div>
              )}
            </section>
          </div>

          {/* COLONNA DESTRA: Allenamento Dinamico */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <section className={UI.card + " p-7 flex flex-col h-[85vh]"}>
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                <h2 className="text-lg font-black tracking-widest uppercase text-slate-700">Programma {utenteCorrente === "Leonardo" ? 'Master' : 'Dinamico'}</h2>
                <div className="flex gap-3 bg-[#e8eef3] p-1.5 rounded-full shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff]">
                  <button onClick={() => {setVistaStorico(!vistaStorico); setVistaGraficiCarichi(false);}} className={`px-5 py-2.5 text-[9px] uppercase font-bold tracking-widest rounded-full transition-all duration-300 ${vistaStorico && !vistaGraficiCarichi ? UI.pillActive : 'text-slate-500 hover:text-[#00c6ff]'}`}>
                    {vistaStorico && !vistaGraficiCarichi ? 'Oggi' : 'Storico'}
                  </button>
                  <button onClick={() => {setVistaGraficiCarichi(!vistaGraficiCarichi); setVistaStorico(true);}} className={`px-5 py-2.5 text-[9px] uppercase font-bold tracking-widest rounded-full transition-all duration-300 ${vistaGraficiCarichi ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-[0_4px_10px_rgba(168,85,247,0.4)]' : 'text-slate-500 hover:text-[#00c6ff]'}`}>
                    Grafici
                  </button>
                </div>
              </div>

              {!vistaStorico ? (
                <>
                  <div className={UI.panelInset + " mb-6 flex justify-between items-center !p-5"}>
                    <div className="px-2">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1.5">Durata Stimata</span>
                      <p className="text-[15px] font-black text-slate-800 flex items-center gap-2">⏱️ ~<AnimatedCounter value={calcolaTempoScheda()} /> min <span className="text-[10px] text-slate-400 font-bold ml-1">(Recuperi incl.)</span></p>
                    </div>
                    <button onClick={() => setFastWorkout(!fastWorkout)} className={`px-6 py-3.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-[6px_6px_14px_#c1c9d2,-6px_-6px_14px_#ffffff] ${fastWorkout ? 'bg-gradient-to-r from-red-400 to-rose-500 text-white border-none' : 'bg-[#e8eef3] text-slate-500 hover:text-[#00c6ff] hover:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff]'}`}>
                      {fastWorkout ? '⚡ Fast Mode' : 'Taglia Tempi'}
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className={UI.label}>Giorno di Allenamento</p>
                    <div className="flex space-x-3 overflow-x-auto pb-4 custom-scrollbar">
                      {giorniSettimana.map((gg: string) => (
                        <button key={gg} onClick={() => setGiornoCalendario(gg)} className={`px-5 py-3 text-[12px] rounded-[1rem] whitespace-nowrap transition-all duration-300 ${giornoCalendario === gg ? UI.pillActive : UI.pillInactive}`}>{gg}</button>
                      ))}
                    </div>
                  </div>

                  <HumanHeatmap scheda={schedaAttiva} />
                  
                  <div className="mb-6 flex gap-4 bg-[#e8eef3] p-2.5 rounded-[2rem] shadow-[inset_5px_5px_10px_#c1c9d2,inset_-5px_-5px_10px_#ffffff]">
                    {['Spinta', 'Tirata', 'Gambe'].map((sch: string) => (
                      <button key={sch} onClick={() => setSchedaAttiva(sch as any)} className={`px-5 py-4 text-[11px] font-black uppercase tracking-widest rounded-[1.5rem] flex-1 transition-all duration-300 ${schedaAttiva === sch ? UI.pillActive : 'text-slate-400 hover:text-slate-600'}`}>{sch}</button>
                    ))}
                  </div>

                  {isDataLoading ? (
                   <div className="flex-1 space-y-6 custom-scrollbar pr-2">
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-48 w-full" />
                   </div>
                ) : (
                   <div className="flex-1 overflow-y-auto pr-3 space-y-6 custom-scrollbar">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {dbDinamico[schedaAttiva].esercizi.map((es: any) => {
                      const nomeAttuale = eserciziModificati[es.id] || es.nome;
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const altEs = es.alternative.find((a: any) => a.nome === nomeAttuale);
                      const currentEx = altEs || es;
                      
                      const ultimoCarico = getUltimoCarico(es.id);
                      const numeroSetTarget = getNumeroSet(es.fase);
                      const phaseColor = es.fase.includes('Fase 1') ? '#00c6ff' : (es.fase.includes('Fase 2') ? '#a855f7' : '#f43f5e'); 
                      
                      const animType = currentEx.anim || "chest_barbell_flat"; 
                      
                      let repMostrate = es.rep;
                      if (fastWorkout) repMostrate = repMostrate.replace("4-5 serie", "3 serie").replace("3-4 serie", "2 serie").replace("Rec: 2 min", "Rec: 1.5 min").replace("Rec: 45 sec", "Rec: 1 min");

                      return (
                        <div key={`${es.id}-${nomeAttuale}`} className={`${UI.panelOutset} relative overflow-hidden group !p-6`}>
                          <div className={`absolute top-0 left-0 w-2 h-full opacity-90`} style={{backgroundColor: phaseColor}}></div>
                          <div className="pl-3">
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-[10px] uppercase font-black tracking-widest drop-shadow-sm" style={{color: phaseColor}}>{es.fase}</span>
                              <button onClick={() => apriSwapEsercizio(es)} className={UI.btnSecondary + " opacity-0 group-hover:opacity-100"}>Swap</button>
                            </div>
                            <div className="flex items-center gap-5 mt-4">
                              <div className={UI.panelInset + " !p-3"}><MediaVisualizer animKey={animType} color={phaseColor} /></div>
                              <div className="flex-1">
                                 <h3 className="font-bold text-[16px] text-slate-800 mb-2">{nomeAttuale}</h3>
                                 <p className="text-[11px] text-slate-500 leading-relaxed font-bold line-clamp-2">{currentEx.dettaglio}</p>
                              </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between bg-[#e8eef3] p-3.5 rounded-2xl shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff]">
                               <p className="text-[11px] font-black px-4 py-2 rounded-xl bg-[#e8eef3] shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] text-slate-600 tracking-widest">{repMostrate}</p>
                               {ultimoCarico !== '0' && <span className="text-[10px] font-bold text-slate-400 px-3 py-2 bg-[#e8eef3] shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] rounded-xl uppercase tracking-widest">Ultima: <span className="text-[#00c6ff] ml-1 text-[13px] font-black">{ultimoCarico}kg</span></span>}
                            </div>
                            <div className="mt-6 pt-5 border-t border-slate-200">
                              <div className="flex gap-4">
                                {Array.from({ length: numeroSetTarget }).map((_, i) => (
                                  <div key={i} className="flex-1 relative">
                                    <label className="text-[9px] text-slate-400 uppercase font-bold tracking-widest block text-center mb-2.5">Set {i+1}</label>
                                    <input type="number" value={carichiAttuali[es.id]?.[i] || ''} onChange={(e) => updateCaricoSet(es.id, i, e.target.value)} className={UI.input + " !py-3 !px-2 !text-center !rounded-xl !text-[16px] !font-black !text-[#0072ff]"} placeholder="-" />
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
                <button onClick={salvaSessione} className={UI.btnPrimary + " mt-8 !py-5 text-[15px]"}>SALVA SESSIONE</button>
              </>
            ) : vistaGraficiCarichi ? (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                 <div className={UI.panelOutset}>
                   <label className={UI.label}>Seleziona Esercizio</label>
                   <select value={esercizioGraficoSelezionato} onChange={(e) => setEsercizioGraficoSelezionato(e.target.value)} className={UI.input + " mb-6"}>
                     {Object.values(baseDbAllenamento).flatMap(g => g.esercizi).map(es => (<option key={es.id} value={es.id}>{eserciziModificati[es.id] || es.nome}</option>))}
                   </select>
                   <SvgLineChart data={getDataGraficoEsercizio()} label={Object.values(baseDbAllenamento).flatMap(g => g.esercizi).find(e => e.id === esercizioGraficoSelezionato)?.nome || "Esercizio"} />
                 </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                {storicoSessioni.length === 0 ? <p className="text-[12px] text-slate-500 font-bold text-center p-8 bg-[#e8eef3] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] rounded-[2rem]">Nessuna sessione salvata.</p> : (
                  [...storicoSessioni].reverse().map((sess) => (
                    <div key={sess.oraId} className={UI.panelOutset + " !p-6"}>
                      <span className="font-black text-[#00c6ff] drop-shadow-sm block text-[15px] tracking-wide uppercase">{sess.giorno} - Scheda {sess.scheda}</span>
                      <span className="text-[11px] text-slate-400 font-bold mb-5 block tracking-widest mt-1.5">{sess.data}</span>
                      <div className="space-y-4">
                        {Object.entries(sess.carichi).map(([idEs, pesoStr]) => (
                          <div key={idEs} className="bg-[#e8eef3] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] p-4 rounded-2xl flex justify-between items-center gap-4">
                            <span className="text-slate-600 text-[13px] font-bold truncate flex-1">{eserciziModificati[idEs] || Object.values(baseDbAllenamento).flatMap(d=>d.esercizi).find(e=>e.id===idEs)?.nome}</span>
                            <span className="font-black text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff] px-4 py-2 rounded-xl shadow-[0_4px_10px_rgba(0,114,255,0.3)] text-sm">{pesoStr as string} kg</span>
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className={UI.card + " w-full max-w-md p-8 relative"}>
            <div className="flex justify-between items-center mb-6 border-b border-slate-300 pb-4">
              <h3 className="font-light text-2xl uppercase tracking-widest text-slate-800">Sostituisci Esercizio</h3>
              <button onClick={() => setModalEsercizio(false)} className="text-slate-400 hover:text-slate-600 text-3xl font-bold transition-colors">&times;</button>
            </div>
            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {esercizioDaCambiare.alternative.map((alt: any, i: number) => (
                <button key={i} onClick={() => confermaSwapEsercizio(alt.nome)} className="w-full text-left p-6 bg-[#e8eef3] shadow-[6px_6px_14px_#c1c9d2,-6px_-6px_14px_#ffffff] rounded-[2rem] hover:shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] group transition-all duration-300">
                  <p className="font-black text-[16px] text-slate-700 group-hover:text-[#00c6ff] transition-colors drop-shadow-sm">{alt.nome}</p>
                  <p className="text-[10px] text-[#0072ff] mt-2.5 uppercase font-black tracking-widest mb-3">{alt.note}</p>
                  <p className="text-[12px] text-slate-500 leading-relaxed font-bold">{alt.dettaglio}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modalAlimento && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className={UI.card + " w-full max-w-md p-8 relative"}>
            <div className="flex justify-between items-center mb-6 border-b border-slate-300 pb-4">
              <h3 className="font-light text-2xl uppercase tracking-widest text-slate-800">Sostituisci Pasto</h3>
              <button onClick={() => setModalAlimento(false)} className="text-slate-400 hover:text-slate-600 text-3xl font-bold transition-colors">&times;</button>
            </div>
            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* @ts-ignore */}
              {dbAlimenti[categoriaDaCambiare].map((alt, i) => {
                 const macroCho = alt.baseCarbo * moltiplicatoreCarbo;
                 const swapKcal = Math.round((macroCho * 4) + (alt.pro * 4) + (alt.fat * 9));
                 return (
                  <button key={i} onClick={() => confermaSwapAlimento(i)} className="w-full text-left p-6 bg-[#e8eef3] shadow-[6px_6px_14px_#c1c9d2,-6px_-6px_14px_#ffffff] rounded-[2rem] hover:shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] group transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <p className="font-black text-[15px] text-slate-700 group-hover:text-[#0072ff] transition-colors pr-2 leading-snug">{alt.nome}</p>
                      <span className="text-[10px] bg-[#e8eef3] shadow-[inset_2px_2px_5px_#c1c9d2,inset_-2px_-2px_5px_#ffffff] text-[#0072ff] px-3.5 py-2 rounded-xl font-black tracking-widest shrink-0">{swapKcal} Kcal</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-black tracking-widest bg-white/50 inline-block px-4 py-2 rounded-xl mb-4 shadow-sm">C <span className="text-[#00c6ff]">{macroCho}g</span> <span className="mx-2 text-slate-300">|</span> P <span className="text-slate-800">{alt.pro}g</span> <span className="mx-2 text-slate-300">|</span> F <span className="text-slate-800">{alt.fat}g</span></p>
                    <p className="text-[12px] text-slate-600 font-bold leading-relaxed bg-[#e8eef3] p-4 rounded-2xl shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff]">{alt.dettaglioGrammi(macroCho, alt.pro, alt.fat)}</p>
                  </button>
                 );
              })}
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,198,255,0.5); }
      `}} />
    </main>
  </div>
  );
}
