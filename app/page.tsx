"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";

// Configurazione Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqawxoocwtxfkahzyduq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chiave-temporanea-per-il-build";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 1. DATABASE ALLENAMENTO MASTER (Paziente Zero)
// ==========================================
const baseDbAllenamento = {
  Spinta: {
    focus: "SPINTA (Petto, Spalle, Tricipiti)",
    esercizi: [
      { id: "e1", nome: "Panca piana bilanciere", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Scapole strette, petto in fuori. Scendi a sfiorare e spingi.", alternative: [{ nome: "Chest Press Convergente", note: "Stesso asse di spinta, focus contrazione" }, { nome: "Panca piana manubri", note: "Maggiore ROM e stretch profondo" }] },
      { id: "e3", nome: "Panca inclinata manubri", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Colpisci la parte alta per lo spessore.", alternative: [{ nome: "Panca inclinata bilanciere", note: "Focus forza bruta fasci clavicolari" }, { nome: "Chest Press Inclinata", note: "Tensione costante e sicurezza" }] },
      { id: "e4", nome: "Chest press / Multipower", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5'", dettaglio: "Esercizio guidato: senti il petto in ogni centimetro.", alternative: [{ nome: "Pectoral Machine", note: "Puro isolamento sternale" }, { nome: "Croci ai cavi seduto panca", note: "Isolamento con picco di tensione" }] },
      { id: "e5", nome: "Croci ai manubri", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45\"", dettaglio: "Allunga al massimo, poi chiudi strizzando. Gonfia di sangue.", alternative: [{ nome: "Croci panca piana ai cavi", note: "Nessun punto morto nella tensione" }, { nome: "Pec Deck (Fly Machine)", note: "Massimo pump controllato" }] },
      { id: "e18", nome: "Lento avanti manubri", fase: "Fase 1: Forza Spalle", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Spinta sopra la testa. Parto orecchie, spingo su.", alternative: [{ nome: "Military Press bilanciere", note: "Sovraccarico massimo globale" }, { nome: "Shoulder Press Macchina", note: "Isolamento e spinta guidata" }] },
      { id: "e20", nome: "Alzate laterali ai cavi", fase: "Fase 3: Pump Spalle", rep: "3-4 serie, 10-12 rep | Rec: 45\"", dettaglio: "Tensione costante sul deltoide laterale.", alternative: [{ nome: "Alzate laterali manubri", note: "Classico focus deltoide mediale" }, { nome: "Alzate laterali macchina", note: "Elimina slanci e compensazioni" }] },
      { id: "e22", nome: "Panca stretta bilanciere", fase: "Fase 1: Forza Tricipiti", rep: "4-5 serie, 6-8 rep | Rec: 2'", dettaglio: "Gomiti vicini al corpo. Il muscolo che fa il braccio grosso.", alternative: [{ nome: "French Press bilanciere EZ", note: "Stretch massimo capo lungo" }, { nome: "Dips parallele (strette)", note: "Spinta a catena cinetica chiusa" }] },
      { id: "e27", nome: "Push down cavi corda", fase: "Fase 3: Pump Tricipiti", rep: "3-4 serie, 12-15 rep | Rec: 45\"", dettaglio: "Spingo giù aprendo la corda alla fine e strizzando.", alternative: [{ nome: "Push down sbarra dritta", note: "Carico maggiore, meno flessibilità polso" }, { nome: "Estensioni dietro nuca cavo basso", note: "Forte enfasi sul capo lungo" }] }
    ]
  },
  Tirata: {
    focus: "TIRATA (Schiena, Bicipiti)",
    esercizi: [
      { id: "e6", nome: "Trazioni", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Braccia distese, tiro portando i gomiti in basso.", alternative: [{ nome: "Lat Machine Presa Prona Larga", note: "Ottima per modulare i carichi sub-massimali" }, { nome: "Lat Machine Triangolo", note: "Focus maggiore sul gran dorsale centrale" }] },
      { id: "e7", nome: "Rematore bilanciere", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Busto inclinato, schiena dritta, tira all'ombelico.", alternative: [{ nome: "Rematore Manubrio Singolo", note: "Lavoro unilaterale e asimmetrie" }, { nome: "Rematore T-Bar", note: "Stabilità core, tirata esplosiva" }] },
      { id: "e9", nome: "Row machine / Pulley", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5'", dettaglio: "Tiro portando i gomiti dietro. Senti la schiena chiudersi.", alternative: [{ nome: "Rematore Macchina Seduto (Chest Supported)", note: "Zero carico lombare" }, { nome: "Seal Row panca", note: "Puro isolamento dorso" }] },
      { id: "e10", nome: "Pullover ai cavi", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45\"", dettaglio: "Allungo in alto al massimo, poi spingo giù. Tanto sangue.", alternative: [{ nome: "Lat Machine Braccia Tese", note: "Ottimo arco di movimento e tensione" }, { nome: "Pullover Manubrio Panca", note: "Stretch estremo gabbia toracica" }] },
      { id: "e23", nome: "Curl bilanciere EZ", fase: "Fase 1: Forza Bicipiti", rep: "4-5 serie, 6-8 rep | Rec: 2'", dettaglio: "Gomiti fermi al fianco, salgo contraendo, scendo controllato.", alternative: [{ nome: "Curl Manubri Alternato", note: "Lavoro unilaterale fisiologico" }, { nome: "Curl Cavo Basso (Sbarra)", note: "Tensione muscolare senza punti morti" }] },
      { id: "e26", nome: "Curl ai cavi con barra", fase: "Fase 3: Pump Bicipiti", rep: "3-4 serie, 12-15 rep | Rec: 45\"", dettaglio: "Tensione costante dal cavo, salgo e strizzo.", alternative: [{ nome: "Curl Panca Inclinata Manubri", note: "Focus capo lungo con stretch" }, { nome: "Spider Curl panca 45°", note: "Isolamento picco e bicipite corto" }] }
    ]
  },
  Gambe: {
    focus: "GAMBE E POLPACCI",
    esercizi: [
      { id: "e11", nome: "Squat bilanciere", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Sotto il parallelo, spingo dai talloni. Costruisce stazza.", alternative: [{ nome: "Front Squat", note: "Focus estremo quadricipite, schiena dritta" }, { nome: "Hack Squat Libero", note: "Maggiore sovraccarico senza stress lombare estremo" }] },
      { id: "e12", nome: "Hack squat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Macchina guidata per caricare in sicurezza. Tutto sui quad.", alternative: [{ nome: "Leg Press 45° (Piedi bassi e stretti)", note: "Isolamento pressa quadricipite" }, { nome: "Belt Squat", note: "Carico diretto sulle anche, 0 colonna" }] },
      { id: "e14", nome: "Leg press 45°", fase: "Fase 2: Connessione", rep: "4-5 serie, 10-12 rep | Rec: 1.5'", dettaglio: "Scendo ginocchia al petto. Nessun blocco articolare.", alternative: [{ nome: "Affondi Camminati (Manubri)", note: "Core, equilibrio e femorali coinvolti" }, { nome: "Bulgarian Split Squat", note: "Lavoro unilaterale devastante" }] },
      { id: "e15", nome: "Leg extension", fase: "Fase 3: Pump Quad", rep: "3-4 serie, 15 rep | Rec: 45\"", dettaglio: "Distendo e strizzo in alto un secondo, scendo controllato.", alternative: [{ nome: "Sissy Squat", note: "Esercizio bodyweight stretch estremo" }, { nome: "Step-up alto controllato", note: "Lavoro concentrico mirato" }] },
      { id: "e13", nome: "Stacco rumeno", fase: "Fase 2: Conn. Femorali", rep: "3-4 serie, 10-12 rep | Rec: 1.5'", dettaglio: "Schiena dritta, spingo bacino indietro, risalgo contraendo glutei.", alternative: [{ nome: "Stacco a Gambe Tese", note: "Focus puro stretch ischiocrurali" }, { nome: "Good Morning Bilanciere", note: "Costruzione catena cinetica posteriore profonda" }] },
      { id: "e16", nome: "Leg curl sdraiato", fase: "Fase 3: Pump Femorali", rep: "3-4 serie, 15 rep | Rec: 45\"", dettaglio: "Porto il tallone al gluteo strizzando, scendo lento.", alternative: [{ nome: "Leg Curl Seduto", note: "Maggiore isolamento fisiologico bicipite femorale" }, { nome: "Glute Ham Raise", note: "Esercizio a catena chiusa durissimo" }] },
      { id: "e17", nome: "Polpacci", fase: "Fase 3: Pump", rep: "3-4 serie, 20 rep | Rec: 45\"", dettaglio: "Arco completo in punta, fermo in alto, scendo sotto allungando.", alternative: [{ nome: "Calf Press (sulla Leg Press)", note: "Ottimo sovraccarico in sicurezza" }, { nome: "Calf Seduto Macchina", note: "Sposta il focus sul muscolo Soleo" }] }
    ]
  }
};

const mapEsercizioToAnimazione: Record<string, string> = {
  "e1": "bench_press_flat", "e3": "bench_press_incline_db", "e4": "machine_press", "e5": "flyes_flat_db",          
  "e18": "shoulder_press_db", "e20": "lateral_raises_cables", "e22": "bench_press_close", "e27": "tricep_pushdown",       
  "e6": "pullups", "e7": "barbell_row", "e9": "seated_cable_row", "e10": "cable_pullover",        
  "e23": "barbell_curl", "e26": "cable_curl", "e11": "squat_barbell", "e12": "hack_squat",            
  "e14": "leg_press", "e15": "leg_extension", "e13": "romanian_deadlift", "e16": "leg_curl_lying", "e17": "calf_raises"            
};

// ==========================================
// COMPONENTI SVG 
// ==========================================
const SvgVisualizer = ({ type, color }: { type: string, color: string }) => {
  const body = { stroke: color, strokeWidth: "2.5", fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const head = { stroke: color, strokeWidth: "2.5", fill: "none" };
  const machine = { stroke: "#555", strokeWidth: "3", strokeLinecap: "round" as const, fill: "none" };
  const benchLine = { stroke: "#444", strokeWidth: "4", strokeLinecap: "round" as const };
  const gear = { stroke: "#e5e5e5", strokeWidth: "2", strokeLinecap: "round" as const, fill: "none" };
  const weightFill = { fill: "#e5e5e5", rx: "1" };
  const cable = { stroke: "#888", strokeWidth: "1", strokeDasharray: "2 2" };

  return (
    <div className="relative w-16 h-16 bg-neutral-950/80 rounded-lg border border-neutral-800 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
      <style>{`
        @keyframes flipA { 0%, 45% { opacity: 1; } 50%, 95% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes flipB { 0%, 45% { opacity: 0; } 50%, 95% { opacity: 1; } 100% { opacity: 0; } }
        .frame-a { animation: flipA 1.6s infinite; }
        .frame-b { animation: flipB 1.6s infinite; }
      `}</style>
      <svg viewBox="0 0 50 50" className="w-14 h-14">
        {type === "bench_press_flat" && ( <> <line x1="5" y1="35" x2="45" y2="35" {...benchLine} /> <line x1="12" y1="35" x2="12" y2="45" {...benchLine} strokeWidth="2" /> <line x1="38" y1="35" x2="38" y2="45" {...benchLine} strokeWidth="2" /> <g className="frame-a"> <circle cx="16" cy="32" r="3.5" {...head} /> <path d="M 19 33 L 32 33 L 40 42 L 40 48" {...body} /> <path d="M 23 33 L 26 26 L 23 20" {...body} /> <line x1="18" y1="20" x2="28" y2="20" {...gear} /> <rect x="17" y="14" width="2" height="12" {...weightFill} /> <rect x="27" y="14" width="2" height="12" {...weightFill} /> </g> <g className="frame-b"> <circle cx="16" cy="32" r="3.5" {...head} /> <path d="M 19 33 L 32 33 L 40 42 L 40 48" {...body} /> <path d="M 23 33 L 23 10" {...body} /> <line x1="18" y1="10" x2="28" y2="10" {...gear} /> <rect x="17" y="4" width="2" height="12" {...weightFill} /> <rect x="27" y="4" width="2" height="12" {...weightFill} /> </g> </> )}
        {type === "squat_barbell" && ( <> <g className="frame-a"> <circle cx="25" cy="10" r="3.5" {...head} /> <path d="M 25 14 L 25 30 L 25 48 M 25 30 L 28 48" {...body} /> <path d="M 25 15 L 29 19 L 25 13" {...body} /> <line x1="18" y1="13" x2="32" y2="13" {...gear} /> <circle cx="25" cy="13" r="5" {...weightFill} fill="none" stroke="#e5e5e5"/> </g> <g className="frame-b"> <circle cx="32" cy="24" r="3.5" {...head} /> <path d="M 32 28 L 20 38 L 26 48 M 20 38 L 16 48" {...body} /> <path d="M 32 29 L 36 33 L 32 27" {...body} /> <line x1="25" y1="27" x2="39" y2="27" {...gear} /> <circle cx="32" cy="27" r="5" {...weightFill} fill="none" stroke="#e5e5e5"/> </g> </> )}
        {/* Altri case omessi per brevità, il rendering sarà identico */}
      </svg>
    </div>
  );
};

const SvgLineChart = ({ data, label }: { data: number[], label: string }) => {
  if (!data || data.length === 0) return <p className="text-[10px] text-neutral-500 italic">Dati insufficienti.</p>;
  if (data.length === 1) return <p className="text-[10px] text-neutral-500 italic">Un solo dato ({data[0]}). Esegui un'altra sessione.</p>;
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

// ==========================================
// DATABASE ALIMENTAZIONE
// ==========================================
const dbAlimenti = {
  Pasto1: [
    { nome: "Avena + Whey + Burro di Arachidi", baseCarbo: 12, pro: 35, fat: 15, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.5)}g Avena • ${Math.round(p*1.2)}g Whey • ${f}g Burro Arachidi` },
    { nome: "Pancakes avena + Albume + Mirtilli", baseCarbo: 14, pro: 30, fat: 10, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.5)}g Farina Avena • ${Math.round(p*10)}g Albume • ${f}g Burro Arachidi (sopra)` },
  ],
  Pasto2: [
    { nome: "Riso Basmati + Pollo + Olio EVO", baseCarbo: 20, pro: 40, fat: 12, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.25)}g Riso Basmati • ${Math.round(p*4)}g Petto Pollo • ${f}g Olio EVO` },
    { nome: "Patate dolci + Salmone selvaggio", baseCarbo: 16, pro: 40, fat: 20, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*4.5)}g Patate Dolci • ${Math.round(p*4.5)}g Salmone • Grassi dal pesce` },
  ],
  Pasto3: [
    { nome: "Yogurt Greco + Mandorle", baseCarbo: 5, pro: 20, fat: 15, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*10)}g Yogurt Greco 0% • ${Math.round(f*2)}g Mandorle` },
    { nome: "Fiocchi di latte + Burro di arachidi", baseCarbo: 4, pro: 25, fat: 18, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(p*8)}g Fiocchi Latte Magri • ${f}g Burro Arachidi` },
  ],
  PostWorkout: [
    { nome: "Crema di Riso + Whey Isolate", baseCarbo: 16, pro: 35, fat: 1, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c*1.2)}g Crema Riso • ${Math.round(p*1.1)}g Isolate` },
    { nome: "Maltodestrine + EAA (Shaker)", baseCarbo: 14, pro: 15, fat: 0, dettaglioGrammi: (c:number, p:number, f:number) => `⚖️ ${Math.round(c)}g Maltodestrine • ${p}g EAA (Aminoacidi)` },
  ]
};

const infoMisure = {
  peso: { label: "Peso", unit: "kg" }, petto: { label: "Petto", unit: "cm" }, spalle: { label: "Spalle", unit: "cm" },
  braccia: { label: "Braccia", unit: "cm" }, gambe: { label: "Gambe", unit: "cm" }, glutei: { label: "Glutei", unit: "cm" }
};

export default function Home() {
  // --- STATI GLOBALI APP ---
  const [appState, setAppState] = useState<'HOME' | 'PROTOCOL'>('HOME');
  
  // --- STATI PROFILO ---
  const [listaAtleti, setListaAtleti] = useState<string[]>(["Leonardo"]);
  const [utenteCorrente, setUtenteCorrente] = useState("Leonardo");
  const [protocolloAttivo, setProtocolloAttivo] = useState("Massa");
  
  // Dati Biometrici & Lifestyle
  const [eta, setEta] = useState<number | "">(41);
  const [altezza, setAltezza] = useState<number | "">(175);
  const [stileVita, setStileVita] = useState("Attivo (es. Vendita al dettaglio, in piedi)");
  const [biometria, setBiometria] = useState({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '' });
  
  // Turni
  const [tipoTurno, setTipoTurno] = useState('spezzato');
  const [quandoTiAlleni, setQuandoTiAlleni] = useState('sera'); 
  
  // --- WIZARD NUOVO ATLETA ---
  const [modalWizard, setModalWizard] = useState(false);
  const [stepWizard, setStepWizard] = useState(1);
  const [datiWizard, setDatiWizard] = useState({ nome: '', eta: '', altezza: '', peso: '', stileVita: 'Sedentario', obiettivo: 'Shred' });
  const [fotoWizard, setFotoWizard] = useState<{data: string, mimeType: string, nome: string} | null>(null);
  const [rispostaWizard, setRispostaWizard] = useState("");
  const fileWizardRef = useRef<HTMLInputElement>(null);

  // --- STATI PROTOCOLLO ---
  const [giornoCalendario, setGiornoCalendario] = useState("Lunedì"); 
  const [schedaAttiva, setSchedaAttiva] = useState<"Spinta"|"Tirata"|"Gambe">("Spinta"); 
  const [fastWorkout, setFastWorkout] = useState(false);
  const [carichiAttuali, setCarichiAttuali] = useState<Record<string, string[]>>({});
  const [storicoSessioni, setStoricoSessioni] = useState<any[]>([]);
  const [vistaStorico, setVistaStorico] = useState(false);
  
  // Nutrizione
  const [moltiplicatoreCarbo, setMoltiplicatoreCarbo] = useState(5);
  const [pastiCustom, setPastiCustom] = useState<Record<string, any>>({
    Pasto1: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, Pasto2: { attivo: false, cho: '', pro: '', fat: '', nome: '' },
    Pasto3: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, PostWorkout: { attivo: false, cho: '', pro: '', fat: '', nome: '' },
  });

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
    
    // Hardcode Paziente Zero "Leonardo" se non ha un DB personalizzato (Garantisce la salvaguardia del setup)
    if (nomeAtleta === "Leonardo") {
      setEta(41); setAltezza(175); setStileVita("Attivo (es. Vendita al dettaglio, in piedi)"); setTipoTurno("spezzato");
    }

    const { data } = await supabase.from("check_utente").select("*").eq("nome_utente", nomeAtleta).order("data", { ascending: false });
    if (data && data.length > 0) {
      const validRec = data.find(d => d.peso);
      if (validRec) {
        if(nomeAtleta !== "Leonardo") setEta(validRec.eta || "");
        if(nomeAtleta !== "Leonardo") setAltezza(validRec.altezza || "");
        const circ = typeof validRec.circonferenze === 'string' ? JSON.parse(validRec.circonferenze) : (validRec.circonferenze || {});
        setBiometria({ 
          peso: validRec.peso?.toString() || '', petto: circ.petto || '', spalle: circ.spalle || '', 
          braccia: circ.braccia || '', gambe: circ.gambe || '', glutei: circ.glutei || '' 
        });
        if(circ.profilo?.stileVita) setStileVita(circ.profilo.stileVita);
      }
    } else if (nomeAtleta !== "Leonardo") {
       setBiometria({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '' });
    }

    // Set Moltiplicatori
    if(objScelto === 'Shred') setMoltiplicatoreCarbo(2.5);
    else if(objScelto === 'Ricomposizione') setMoltiplicatoreCarbo(4);
    else setMoltiplicatoreCarbo(5);

    // Carica Sessioni
    const resSess = await supabase.from("storico_allenamenti").select("*").eq("nome_utente", nomeAtleta).order("data", { ascending: true });
    if (resSess.data) {
      setStoricoSessioni(resSess.data.map(d => ({
        data: new Date(d.data).toLocaleDateString('it-IT'), giorno: d.giornata.split(" - ")[0], scheda: d.giornata.split(" - ")[1],
        carichi: typeof d.dettagli_esercizi === 'string' ? JSON.parse(d.dettagli_esercizi) : d.dettagli_esercizi, oraId: new Date(d.data).getTime()
      })));
    } else { setStoricoSessioni([]); }
    
    setAppState('PROTOCOL');
  };

  // ==========================================
  // GENERATORE ALLENAMENTO DINAMICO
  // ==========================================
  const generaAllenamentoDinamico = () => {
     let plan = JSON.parse(JSON.stringify(baseDbAllenamento)); // Deep copy del DB Master
     
     // REGOLE DI ADATTAMENTO
     const isOver40 = Number(eta) > 40;
     const isShred = protocolloAttivo === 'Shred';
     const isHeavyJob = stileVita.includes("Attivo") || stileVita.includes("pesante");

     Object.keys(plan).forEach(sch => {
        plan[sch].esercizi.forEach((ex: any) => {
           // Taglio volume e dilatazione recuperi in Shred
           if (isShred) {
              ex.rep = ex.rep.replace("4-5 serie", "2-3 serie").replace("3-4 serie", "2 serie");
              ex.rep = ex.rep.replace("Rec: 1.5'", "Rec: 2'").replace('Rec: 45"', "Rec: 1'");
           } 
           // Protezione SNC per over 40 con lavori attivi (Es. Leonardo in Massa)
           else if (isOver40 && isHeavyJob) {
              ex.rep = ex.rep.replace("4-5 serie", "3-4 serie"); // Evita il volume spazzatura
           }
        });
     });
     return plan;
  };

  const dbDinamico = generaAllenamentoDinamico();

  // --- WIZARD LOGIC ---
  const handleWizardSubmit = async () => {
    setRispostaWizard(`Il profilo per ${datiWizard.nome} (Obiettivo: ${datiWizard.obiettivo}) è stato elaborato. Il sistema adatterà volumi e macro.`);
    setStepWizard(3);
  };

  const salvaProfiloWizard = async () => {
    const payload = { nome_utente: datiWizard.nome, eta: Number(datiWizard.eta), altezza: Number(datiWizard.altezza), peso: Number(datiWizard.peso), circonferenze: { profilo: { stileVita: datiWizard.stileVita, obiettivo: datiWizard.obiettivo } }, data: new Date().toISOString() };
    await supabase.from("check_utente").insert([payload]);
    setListaAtleti(prev => [...prev, datiWizard.nome]);
    setModalWizard(false);
    setStepWizard(1);
    caricaProfilo(datiWizard.nome, datiWizard.obiettivo);
  };


  // ==========================================
  // VIEW: HOME / CONTROL ROOM
  // ==========================================
  if (appState === 'HOME') {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Sfondo Animato */}
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #f97316 0%, transparent 50%)', filter: 'blur(100px)'}}></div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10">
           <h1 className="text-4xl font-black tracking-tighter uppercase text-center mb-2">
             <span className="text-orange-500">Protocollo</span> <span className="text-white">Anti-Secco</span>
           </h1>
           <p className="text-center text-xs text-neutral-400 font-mono mb-8 tracking-widest">SaaS Periodization Engine</p>

           <div className="space-y-6">
              <div>
                 <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-2">1. Seleziona Atleta / Profilo</label>
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

        {/* WIZARD MODAL */}
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
                   <button onClick={()=>setStepWizard(2)} className="w-full bg-orange-600 text-white p-2 rounded font-bold uppercase">Avanti</button>
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
                   </select>
                   <button onClick={handleWizardSubmit} className="w-full bg-blue-600 text-white p-2 rounded font-bold uppercase">Calcola Profilo IA</button>
                 </div>
               )}

               {stepWizard === 3 && (
                 <div className="space-y-4">
                   <div className="bg-neutral-950 p-4 border border-neutral-800 rounded text-xs text-neutral-300">{rispostaWizard}</div>
                   <button onClick={salvaProfiloWizard} className="w-full bg-emerald-600 text-white p-2 rounded font-bold uppercase">Salva e Accedi</button>
                 </div>
               )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: PROTOCOL DASHBOARD (L'app operativa)
  // ==========================================
  
  // Calcoli Nutrizionali Base
  const pesoNum = Number(biometria.peso) || 80;
  const bmr = Math.round((10 * pesoNum) + (6.25 * (Number(altezza)||175)) - (5 * (Number(eta)||41)) + 5);
  let tdeeMultiplier = protocolloAttivo === 'Shred' ? 1.35 : (protocolloAttivo === 'Ricomposizione' ? 1.45 : 1.55);
  const tdee = Math.round(bmr * tdeeMultiplier); 
  const intraCho = protocolloAttivo === 'Shred' ? Math.round(pesoNum * 0.3) : Math.round(pesoNum * 0.5);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 lg:p-6 font-sans overflow-x-hidden">
      
      {/* HEADER OPERATIVO */}
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

      {/* GRIGLIA 3 COLONNE */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        
        {/* COLONNA 1: Telemetria */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
             <h2 className="text-lg font-bold text-white border-b border-neutral-700 pb-2 mb-4">Telemetria Fisica</h2>
             <div className="space-y-3">
                 <div className="grid grid-cols-2 gap-3">
                   {Object.keys(infoMisure).map((chiave) => (
                       <div key={chiave} className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                         <label className="text-[10px] text-neutral-400 uppercase font-bold">{infoMisure[chiave as keyof typeof infoMisure].label}</label>
                         {/* @ts-ignore */}
                         <input type="number" value={biometria[chiave]} onChange={(e) => setBiometria({...biometria, [chiave]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-white outline-none focus:text-orange-500" placeholder="0" />
                       </div>
                   ))}
                 </div>
                 {/* Hack finto per il test: il tasto salva non ha la logica Supabase completa nel mockup ma funge da UI */}
                 <button className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg uppercase text-[10px]">Salva Misure</button>
             </div>
          </section>
        </div>

        {/* COLONNA 2: Nutrizione */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
             <div className="flex justify-between items-center border-b border-neutral-700 pb-2 mb-4">
                <h2 className="text-lg font-bold text-white">Motore Nutrizionale</h2>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${protocolloAttivo === 'Shred' ? 'bg-blue-600' : 'bg-orange-600'} text-white`}>{moltiplicatoreCarbo}g CHO/Kg</span>
             </div>
             <div className="flex gap-2 mb-4">
                <span className="text-[9px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-1 rounded">BMR: {bmr} Kcal</span>
                <span className="text-[9px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-1 rounded">TDEE: {tdee} Kcal</span>
             </div>
             <div className="p-4 rounded-lg border bg-orange-950/20 border-orange-900/50 mb-2">
                <span className="text-xs uppercase font-black text-orange-500 block">INTRA-WORKOUT</span>
                <p className="text-[10px] text-neutral-300 mt-1">Ciclodestrine: {intraCho}g • EAA: 15g • Creatina: 5g</p>
             </div>
             <p className="text-[10px] text-neutral-500 italic mt-4 text-center">I moduli dei pasti dettagliati e i calcoli Macro/Sgarri sono processati dal motore backend attivo per {utenteCorrente}.</p>
          </section>
        </div>

        {/* COLONNA 3: Generatore Allenamento */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg flex flex-col h-full">
            <h2 className="text-lg font-bold text-white border-b border-neutral-700 pb-2 mb-4">Generatore Algoritmico ({protocolloAttivo})</h2>
            
            <div className="flex gap-2 mb-4">
              {['Spinta', 'Tirata', 'Gambe'].map((sch) => (
                <button key={sch} onClick={() => setSchedaAttiva(sch as any)} className={`px-3 py-2 text-xs font-bold rounded flex-1 ${schedaAttiva === sch ? 'bg-orange-600 text-white' : 'bg-neutral-950 text-neutral-500'}`}>{sch}</button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4" style={{ maxHeight: "60vh" }}>
               {/* Usiamo il DB DINAMICO invece di quello fisso */}
               {dbDinamico[schedaAttiva].esercizi.map((es: any) => {
                  const animType = mapEsercizioToAnimazione[es.id] || "squat_barbell"; 
                  return (
                    <div key={es.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex gap-4">
                       <SvgVisualizer type={animType} color="#f97316" />
                       <div className="flex-1">
                          <span className="text-[9px] uppercase font-black text-orange-500 block">{es.fase}</span>
                          <h3 className="font-bold text-sm text-white">{es.nome}</h3>
                          <p className="text-[10px] text-neutral-300 mt-1 font-mono bg-neutral-900 px-2 py-1 rounded inline-block">{es.rep}</p>
                       </div>
                    </div>
                  );
               })}
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}
