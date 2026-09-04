"use client";
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";

// ==========================================
// 0. ANIMAZIONI (Integrate)
// ==========================================
const PPianaBilAnimation = () => ();
const ChestPressAnimation = () => ();
const PianaManubriAnimation = () => ();
const SquatBilanciereAnimation = () => ();
const TrazioniSchienaAnimation = () => ();
const GenericAnimation = () => ();

const animationRegistry: Record<string, React.FC> = {
'chest_barbell_flat': PPianaBilAnimation,
'chest_machine_flat': ChestPressAnimation,
'chest_db_flat': PianaManubriAnimation,
'leg_squat': SquatBilanciereAnimation,
'back_pullup': TrazioniSchienaAnimation,
};

const MediaVisualizer = ({ animKey, size = 60, className = "" }: { animKey: string, size?: number, className?: string }) => {
const AnimationComponent = animationRegistry[animKey?.toLowerCase()] || GenericAnimation;
return (
<div style={{ width: size, height: size }} className={bg-[#F4F7FB] rounded-2xl p-2 flex items-center justify-center border border-white shadow-inner ${className}}>


);
};

// ==========================================
// CONFIGURAZIONE SUPABASE
// ==========================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqawxoocwtxfkahzyduq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chiave-temporanea-per-il-build";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 1. DATABASE ALLENAMENTO MASTER (Intatto)
// ==========================================
const baseDbAllenamento = {
Spinta: {
focus: "SPINTA (Petto, Spalle, Tricipiti)",
esercizi: [
{ id: "e1", nome: "Panca piana bilanciere", anim: "chest_barbell_flat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "BILANCIERE: Disteso su panca piana. Scendi fino a sfiorare il petto e spingi verso l'alto con forza.", alternative: [{ nome: "Chest Press Convergente", anim: "chest_machine_flat", note: "Stesso asse di spinta", dettaglio: "MACCHINARIO: Siediti in appoggio." }] },
{ id: "e3", nome: "Panca inclinata manubri", anim: "chest_db_incline", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "MANUBRI: Panca a 30-45°. Spingi i manubri verso l'alto concentrandoti sui fasci clavicolari.", alternative: [{ nome: "Chest Press Inclinata", anim: "chest_machine_incline", note: "Tensione costante", dettaglio: "MACCHINARIO: Usa la variante inclinata della pressa." }] },
{ id: "e4", nome: "Chest press", anim: "chest_machine_flat", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "MACCHINARIO: Esercizio guidato per isolare il pettorale. Controlla il movimento.", alternative: [{ nome: "Pectoral Machine", anim: "chest_pec_deck", note: "Isolamento sternale", dettaglio: "MACCHINARIO: Tieni i gomiti alti e chiudi le braccia stringendo il petto al centro." }] },
{ id: "e18", nome: "Lento avanti manubri", anim: "shoulder_db_seated", fase: "Fase 1: Forza Spalle", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "MANUBRI: Seduto a 90°. Parti con i manubri alle orecchie e spingi dritto sopra la testa.", alternative: [{ nome: "Shoulder Press", anim: "shoulder_machine", note: "Spinta guidata", dettaglio: "MACCHINARIO: Esercizio di spinta verticale vincolato per caricare in sicurezza." }] },
{ id: "e22", nome: "Panca stretta", anim: "tricep_close_grip", fase: "Fase 1: Forza Tricipiti", rep: "4-5 serie, 6-8 rep | Rec: 2 min", dettaglio: "BILANCIERE: Presa stretta. Gomiti incollati al busto e spingi esplodendo in alto.", alternative: [{ nome: "French Press", anim: "tricep_french_press", note: "Stretch capo lungo", dettaglio: "BILANCIERE EZ: Disteso, porta il bilanciere alla fronte flettendo i gomiti." }] }
]
},
Tirata: {
focus: "TIRATA (Schiena, Bicipiti)",
esercizi: [
{ id: "e6", nome: "Trazioni", anim: "back_pullup", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "CORPO LIBERO: Appeso alla sbarra, tira il corpo verso l'alto abbassando i gomiti.", alternative: [{ nome: "Lat Machine Larga", anim: "back_pulldown", note: "Carichi modulabili", dettaglio: "MACCHINARIO: Presa larga prono." }] },
{ id: "e7", nome: "Rematore bilanciere", anim: "back_row_barbell", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "BILANCIERE: Busto a 45°. Tira verso l'ombelico, schiena piatta.", alternative: [{ nome: "Rematore Manubrio", anim: "back_row_db", note: "Unilaterale", dettaglio: "MANUBRI: In appoggio su panca." }] },
{ id: "e9", nome: "Pulley seduto", anim: "back_pulley", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "CAVI: Seduto, tira la maniglia verso l'addome basso.", alternative: [{ nome: "Chest Supported", anim: "back_chest_supported", note: "Zero carico lombare", dettaglio: "MACCHINARIO: Petto in appoggio." }] }
]
},
Gambe: {
focus: "GAMBE E POLPACCI",
esercizi: [
{ id: "e11", nome: "Squat bilanciere", anim: "leg_squat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "BILANCIERE: Sui trapezi. Scendi sotto il parallelo e sali potente dai talloni.", alternative: [{ nome: "Hack Squat Macchina", anim: "leg_hack_machine", note: "Zero carico lombare", dettaglio: "MACCHINARIO: Focus spinta senza pesare sulla colonna." }] },
{ id: "e14", nome: "Pressa 45°", anim: "leg_press", fase: "Fase 2: Connessione", rep: "4-5 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "MACCHINARIO: Scendi portando le ginocchia verso il petto e spingi.", alternative: [{ nome: "Affondi Manubri", anim: "leg_lunge", note: "Equilibrio", dettaglio: "MANUBRI: In camminata o sul posto, affonda controllando la discesa." }] },
{ id: "e16", nome: "Leg curl sdraiato", anim: "leg_curl", fase: "Fase 3: Pump Femorali", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "MACCHINARIO: Prono, porta i talloni ai glutei in modo esplosivo.", alternative: [{ nome: "Leg Curl Seduto", anim: "leg_curl_seduto", note: "Isolamento femorale", dettaglio: "MACCHINARIO: Isola magnificamente il bicipite femorale." }] }
]
}
};

const dbAlimenti = {
Pasto1: [
{ nome: "Avena + Whey + Burro Arachidi", baseCarbo: 12, pro: 35, fat: 15, dettaglioGrammi: (c: number, p: number, f: number) => ⚖️ ${Math.round(c*1.5)}g Avena • ${Math.round(p*1.2)}g Whey • ${f}g Burro Arachidi },
{ nome: "Pancakes avena + Albume", baseCarbo: 14, pro: 30, fat: 10, dettaglioGrammi: (c: number, p: number, f: number) => ⚖️ ${Math.round(c*1.5)}g Farina Avena • ${Math.round(p*10)}g Albume }
],
Pasto2: [
{ nome: "Riso Basmati + Pollo + EVO", baseCarbo: 20, pro: 40, fat: 12, dettaglioGrammi: (c: number, p: number, f: number) => ⚖️ ${Math.round(c*1.25)}g Riso Basmati • ${Math.round(p*4)}g Pollo • ${f}g EVO },
{ nome: "Pasta + Carne Magra", baseCarbo: 20, pro: 45, fat: 10, dettaglioGrammi: (c: number, p: number, f: number) => ⚖️ ${Math.round(c*1.3)}g Pasta • ${Math.round(p*4.5)}g Macinato • ${f}g EVO }
],
Pasto3: [
{ nome: "Yogurt Greco + Mandorle", baseCarbo: 5, pro: 20, fat: 15, dettaglioGrammi: (c: number, p: number, f: number) => ⚖️ ${Math.round(p*10)}g Yogurt 0% • ${Math.round(f*2)}g Mandorle },
{ nome: "Fiocchi latte + Burro arachidi", baseCarbo: 4, pro: 25, fat: 18, dettaglioGrammi: (c: number, p: number, f: number) => ⚖️ ${Math.round(p*8)}g Fiocchi Latte • ${f}g Burro Arachidi }
],
PostWorkout: [
{ nome: "Crema di Riso + Whey", baseCarbo: 16, pro: 35, fat: 1, dettaglioGrammi: (c: number, p: number, f: number) => ⚖️ ${Math.round(c*1.2)}g Crema Riso • ${Math.round(p*1.1)}g Isolate }
]
};

const misureBase = [
{ id: 'peso', label: "Peso", unit: "kg" }, { id: 'petto', label: "Petto", unit: "cm" },
{ id: 'spalle', label: "Spalle", unit: "cm" }, { id: 'braccia', label: "Braccia", unit: "cm" },
{ id: 'gambe', label: "Gambe", unit: "cm" }, { id: 'glutei', label: "Glutei", unit: "cm" }
];
const misureBIA = [
{ id: 'vita', label: "Vita", unit: "cm" }, { id: 'bodyFat', label: "Grasso", unit: "%" },
{ id: 'bodyWater', label: "Acqua", unit: "%" }, { id: 'muscleMass', label: "Muscolo", unit: "%" }
];

// ==========================================
// GRAFICI (Adattati al tema chiaro neumorfico)
// ==========================================
const SvgLineChart = ({ data, label }: { data: number[], label: string }) => {
if (!data || data.length === 0) return Dati insufficienti.;
const maxVal = Math.max(...data); const minVal = Math.min(...data);
const range = maxVal - minVal === 0 ? 10 : maxVal - minVal;
const width = 300, height = 100, padding = 20;
const points = data.map((val, i) => ${padding + (i / (data.length - 1)) * (width - padding * 2)},${height - padding - ((val - minVal) / range) * (height - padding * 2)}).join(" ");

return (

{label} - Trend
<svg viewBox={0 0 ${width} ${height}} className="w-full h-auto drop-shadow-md">

{data.map((val, i) => {
const x = padding + (i / (data.length - 1)) * (width - padding * 2);
const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
return (
<text x={x} y={y - 10} fill="#64748b" fontSize="9" textAnchor="middle" fontWeight="bold">{val}
);
})}


);
};

const SvgBodyCompositionWheel = ({ data, altezza, eta }: { data: Record<string, string>, altezza: number | "", eta: number | "" }) => {
const w = Number(data.peso) || 0; const h = Number(altezza) || 0; const a = Number(eta) || 0;
const bf = Number(data.bodyFat) || 0; const bw = Number(data.bodyWater) || 0; const mm = Number(data.muscleMass) || 0;
const bmi = (w > 0 && h > 0) ? (w / Math.pow(h / 100, 2)).toFixed(1) : '0';
const bmr = (w > 0 && h > 0 && a > 0) ? Math.round((10 * w) + (6.25 * h) - (5 * a) + 5) : 0;

const radius = 160; const strokeW = 60; const c = 2 * Math.PI * radius; const seg = c / 6;
const getLabelPos = (angleDeg: number) => { const rad = (angleDeg - 90) * Math.PI / 180; return { x: 250 + radius * Math.cos(rad), y: 250 + radius * Math.sin(rad) }; };

const sections = [
{ label: 'BMI', val: bmi, color: '#c084fc', angle: 0 }, { label: 'BMR', val: bmr > 0 ? bmr : '-', color: '#fb923c', angle: 60 },

{ label: 'MUSCOLO', val: mm > 0 ? ${mm}% : '-', color: '#f87171', angle: 120 }, { label: 'ACQUA', val: bw > 0 ? ${bw}% : '-', color: '#60a5fa', angle: 180 },
{ label: 'GRASSO', val: bf > 0 ? ${bf}% : '-', color: '#4ade80', angle: 240 }, { label: 'PESO kg', val: w > 0 ? w : '-', color: '#94a3b8', angle: 300 }

];

return (



{sections.map((sec, i) => (
<circle key={i} cx="0" cy="0" r={radius} fill="none" stroke={sec.color} strokeWidth={strokeW} strokeDasharray={${seg - 4} ${c}} strokeDashoffset={-(i * seg)} strokeLinecap="round" className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-sm" />
))}

{sections.map((sec, i) => {
const pos = getLabelPos(sec.angle);
return (
<g key={t-${i}} className="pointer-events-none">
<text x={pos.x} y={pos.y - 4} fill="#64748b" fontSize="11" textAnchor="middle" fontWeight="bold">{sec.label}
<text x={pos.x} y={pos.y + 16} fill="#0f172a" fontSize="20" textAnchor="middle" fontWeight="900">{sec.val}

)
})}

STATS
{w || '-'}


);
};

export default function Page() {
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
const [quandoTiAlleni, setQuandoTiAlleni] = useState('sera');
const [digiuno, setDigiuno] = useState(false);

const [giornoCalendario, setGiornoCalendario] = useState("Lunedì");
const [gerardoCarbOverride, setGerardoCarbOverride] = useState<number | null>(null);
const [schedaAttiva, setSchedaAttiva] = useState<"Spinta"|"Tirata"|"Gambe">("Spinta");
const [fastWorkout, setFastWorkout] = useState(false);
const [eserciziModificati, setEserciziModificati] = useState<Record<string, string>>({});
const [carichiAttuali, setCarichiAttuali] = useState<Record<string, string[]>>({});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const [storicoSessioni, setStoricoSessioni] = useState<any[]>([]);
const [modalEsercizio, setModalEsercizio] = useState(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const [esercizioDaCambiare, setEsercizioDaCambiare] = useState({ id: '', nomeAttuale: '', alternative: [] as any[] });
const [pastiSelezionati, setPastiSelezionati] = useState<Record<string, number>>({ Pasto1: 0, Pasto2: 0, Pasto3: 0, PostWorkout: 0 });
const [pastiCustom, setPastiCustom] = useState<Record<string, {attivo: boolean, cho: string, pro: string, fat: string, nome: string}>>({ Pasto1: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, Pasto2: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, Pasto3: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, PostWorkout: { attivo: false, cho: '', pro: '', fat: '', nome: '' } });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const [storicoMisure, setStoricoMisure] = useState<any[]>([]);
const [vistaTelemetria, setVistaTelemetria] = useState<'FORM' | 'STORICO'>('FORM');

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
const { data } = await supabase.from("check_utente").select("").eq("nome_utente", nomeAtleta).order("data", { ascending: false });
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
const resSess = await supabase.from("storico_allenamenti").select("").eq("nome_utente", nomeAtleta).order("data", { ascending: true });
if (resSess.data) {
setStoricoSessioni(resSess.data.map(d => ({ data: new Date(d.data).toLocaleDateString('it-IT'), giorno: d.giornata.split(" - ")[0], scheda: d.giornata.split(" - ")[1], carichi: typeof d.dettagli_esercizi === 'string' ? JSON.parse(d.dettagli_esercizi) : d.dettagli_esercizi, oraId: new Date(d.data).getTime() })));
} else { setStoricoSessioni([]); }
setAppState('PROTOCOL');
};

const generaAllenamentoDinamico = () => {
const plan = JSON.parse(JSON.stringify(baseDbAllenamento));
const isOver40 = Number(eta) > 40; const isShred = protocolloAttivo === 'Shred'; const isHeavyJob = stileVita.includes("Attivo") || stileVita.includes("Fisico");
const fatNum = Number(biometria.bodyFat) || 0; const pesoNum = Number(biometria.peso) || 0; const highFat = fatNum > 15;
const activeDieta = (protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')) ? 'Equilibrata' : tipoDieta;
const isKetoOrLowCarb = activeDieta === 'Keto' || activeDieta === 'LowCarb';
const isOverweightMechanically = fatNum > 20 || pesoNum > 95;
const needsLumbarProtection = isOver40 && stileVita.includes("Fisico");

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const swapToAlternative = (ex: any, partialName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const alt = ex.alternative?.find((a: any) => a.nome.toLowerCase().includes(partialName.toLowerCase()));
    if (alt) { ex.nome = alt.nome; ex.anim = alt.anim; ex.dettaglio = alt.dettaglio; }
 };

 Object.keys(plan).forEach(sch => {
    let methodCycleGerardo = 0; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plan[sch as keyof typeof plan].esercizi.forEach((ex: any) => {
       if (protocolloAutore === 'Gerardo Calvo (Reset Ormonale)') {
           if (methodCycleGerardo === 0) ex.rep = "7x10 | Rec: 30 sec (Stress)"; else if (methodCycleGerardo === 1) ex.rep = "5x5 | Rec: 90 sec (Forza)"; else ex.rep = "3x10 | Rec: 60 sec";
           methodCycleGerardo = (methodCycleGerardo + 1) % 3;
       } else if (protocolloAutore === 'Aldo Masolo (Reset Metabolico)') {
           ex.rep = "3 serie, 8-10 rep | Rec: 90 sec (Buffer 1-2)";
           if (!eserciziModificati[ex.id]) { if (ex.id === "e11") swapToAlternative(ex, "Hack Squat Macchina"); if (ex.id === "e1") swapToAlternative(ex, "Chest Press Convergente"); }
       } else {
           if (isShred || highFat) { ex.rep = ex.rep.replace("4-6 rep", "8-10 rep").replace("6-8 rep", "10-12 rep"); ex.rep = ex.rep.replace("4-5 serie", "2-3 serie").replace("3-4 serie", "2 serie"); ex.rep = ex.rep.replace("Rec: 1.5 min", "Rec: 2 min").replace("Rec: 45 sec", "Rec: 1 min"); }
           else if (isOver40 && isHeavyJob) { ex.rep = ex.rep.replace("4-5 serie", "3-4 serie"); }
           if (!eserciziModificati[ex.id]) { 
               if (isOverweightMechanically) { if (ex.id === "e6") swapToAlternative(ex, "Lat Machine Larga"); if (ex.id === "e22") swapToAlternative(ex, "French Press"); }
               if (isKetoOrLowCarb || isShred) { if (ex.id === "e1") swapToAlternative(ex, "Chest Press Convergente"); if (ex.id === "e18") swapToAlternative(ex, "Shoulder Press"); if (ex.id === "e11") swapToAlternative(ex, "Front Squat"); }
               if (needsLumbarProtection) { if (ex.id === "e11") swapToAlternative(ex, "Hack Squat Macchina"); if (ex.id === "e7") swapToAlternative(ex, "Rematore Manubrio"); if (ex.id === "e13") swapToAlternative(ex, "Stacco Gambe Tese"); }
           }
       }
    });
 });
 return plan;


};

const dbDinamico = generaAllenamentoDinamico();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apriSwapEsercizio = (es: any) => {
const nomeAttuale = eserciziModificati[es.id] || es.nome;
const tutteLeOpzioni = [{ nome: es.nome, anim: es.anim, dettaglio: es.dettaglio, note: "Originale" }, ...(es.alternative || [])];
const opzioniDisponibili = tutteLeOpzioni.filter(opt => opt.nome !== nomeAttuale);
setEsercizioDaCambiare({ id: es.id, nomeAttuale: nomeAttuale, alternative: opzioniDisponibili }); setModalEsercizio(true);
};

// MACRO MOTORE
const pesoNum = Number(biometria.peso) || 80;
const bmr = Math.round((10 * pesoNum) + (6.25 * (Number(altezza)||175)) - (5 * (Number(eta)||41)) + 5);
let activityMult = 1.2; if (stileVita.includes("Attivo")) activityMult = 1.4; if (stileVita.includes("Fisico")) activityMult = 1.6; if (tipoTurno === "spezzato") activityMult += 0.05;
let baseTdee = Math.round(bmr * activityMult);
let settimaneDiReverse = 0;
if (storicoMisure.length > 0) { const primaMisura = new Date(storicoMisure[storicoMisure.length - 1].data); const oggi = new Date(); settimaneDiReverse = Math.floor((oggi.getTime() - primaMisura.getTime()) / (1000 * 60 * 60 * 24 * 7)); }
const grassoStimato = Number(biometria.bodyFat) || 0;
if (protocolloAutore === 'Aldo Masolo (Reset Metabolico)' || metabolismoBloccato) { baseTdee = baseTdee + (settimaneDiReverse * 100); }
else if (protocolloAttivo === 'Shred') { baseTdee = Math.round(baseTdee * 0.80); }
else if (protocolloAttivo === 'Massa') { baseTdee = (grassoStimato > 15 || pesoNum > 85) ? Math.round(baseTdee * 1.05) : Math.round(baseTdee * 1.15); }

const tdee = baseTdee; let targetPro = protocolloAttivo === 'Shred' ? pesoNum * 2.5 : pesoNum * 2.2; let targetCho = 0; let targetFat = 0;
const activeDieta = (protocolloAutore.includes('Masolo') || protocolloAutore.includes('Calvo')) ? 'Equilibrata' : tipoDieta;

switch (activeDieta) {
case 'Keto': targetCho = 30; targetPro = pesoNum * 2.5; targetFat = (tdee - (targetCho * 4) - (targetPro * 4)) / 9; break;
case 'LowCarb': targetCho = pesoNum * 1.5; targetPro = pesoNum * 2.5; targetFat = (tdee - (targetCho * 4) - (targetPro * 4)) / 9; break;
case 'Zona': targetCho = (tdee * 0.40) / 4; targetPro = (tdee * 0.30) / 4; targetFat = (tdee * 0.30) / 9; break;
case 'HighCarb': targetFat = Math.max(pesoNum * 0.8, 40); targetPro = pesoNum * 2.0; targetCho = (tdee - (targetFat * 9) - (targetPro * 4)) / 4; break;
case 'Equilibrata': default: targetFat = pesoNum * 1.0; targetCho = (tdee - (targetFat * 9) - (targetPro * 4)) / 4; break;
}

if (protocolloAutore === 'Gerardo Calvo (Reset Ormonale)') { const hpo = Math.max((Number(altezza) || 175) - 100, 60); targetPro = hpo * 2.2; targetFat = 65; const dayIndex = giorniSettimana.indexOf(giornoCalendario); const autoCarb = [150, 250, 350][dayIndex % 3] || 150; targetCho = gerardoCarbOverride !== null ? gerardoCarbOverride : autoCarb; }
else if (protocolloAutore === 'Aldo Masolo (Reset Metabolico)' || metabolismoBloccato) { targetFat = 70; targetPro = pesoNum * 1.8; targetCho = Math.max(0, (tdee - (targetFat * 9) - (targetPro * 4)) / 4); }
if (utenteCorrente === "Leonardo" && activeDieta === "Equilibrata" && protocolloAutore === "Nessuno") { const mult = protocolloAttivo === 'Shred' ? 2.5 : (protocolloAttivo === 'Massa' ? 5 : 4); targetCho = pesoNum * mult; targetPro = protocolloAttivo === 'Shred' ? (pesoNum * 2.5) : (pesoNum * 2.2); targetFat = pesoNum * 1.0; }

let intraCho = protocolloAttivo === 'Shred' ? Math.round(pesoNum * 0.3) : Math.round(pesoNum * 0.5); if (activeDieta === 'Keto') intraCho = 0; else if (activeDieta === 'LowCarb') intraCho = Math.round(pesoNum * 0.2);
const intraPro = 15; const intraFat = 0;
targetCho = Math.max(targetCho, intraCho); targetFat = Math.max(targetFat, intraFat); targetPro = Math.max(targetPro, intraPro);
const activeCategories = digiuno ? ['Pasto2', 'Pasto3', 'PostWorkout'] : ['Pasto1', 'Pasto2', 'Pasto3', 'PostWorkout'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const originalMeals: Record<string, any> = {};
activeCategories.forEach(cat => { const item = dbAlimenti[cat as keyof typeof dbAlimenti]?.[pastiSelezionati[cat]]; if(item) { originalMeals[cat] = { cho: item.baseCarbo, pro: item.pro, fat: item.fat }; } });
let customCho = 0, customPro = 0, customFat = 0, sumNonCustomOrigCho = 0, sumNonCustomOrigPro = 0, sumNonCustomOrigFat = 0;
activeCategories.forEach(cat => { if(pastiCustom[cat].attivo) { customCho += Number(pastiCustom[cat].cho) || 0; customPro += Number(pastiCustom[cat].pro) || 0; customFat += Number(pastiCustom[cat].fat) || 0; } else if(originalMeals[cat]) { sumNonCustomOrigCho += activeDieta === 'Keto' ? 1 : originalMeals[cat].cho; sumNonCustomOrigPro += originalMeals[cat].pro; sumNonCustomOrigFat += originalMeals[cat].fat; } });
const remainingCho = Math.max(0, targetCho - customCho - intraCho); const remainingPro = Math.max(0, targetPro - customPro - intraPro); const remainingFat = Math.max(0, targetFat - customFat - intraFat);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const finalMeals: Record<string, any> = {};
activeCategories.forEach(cat => {
if(pastiCustom[cat].attivo) { finalMeals[cat] = { cho: Number(pastiCustom[cat].cho) || 0, pro: Number(pastiCustom[cat].pro) || 0, fat: Number(pastiCustom[cat].fat) || 0 }; }
else if(originalMeals[cat]) { const origC = activeDieta === 'Keto' ? 1 : originalMeals[cat].cho; finalMeals[cat] = { cho: sumNonCustomOrigCho > 0 ? Math.round(remainingCho * (origC / sumNonCustomOrigCho)) : 0, pro: sumNonCustomOrigPro > 0 ? Math.round(remainingPro * (originalMeals[cat].pro / sumNonCustomOrigPro)) : 0, fat: sumNonCustomOrigFat > 0 ? Math.round(remainingFat * (originalMeals[cat].fat / sumNonCustomOrigFat)) : 0 }; }
});
let actualCho = intraCho + customCho, actualPro = intraPro + customPro, actualFat = intraFat + customFat;
activeCategories.forEach(cat => { if(!pastiCustom[cat].attivo && finalMeals[cat]) { actualCho += finalMeals[cat].cho; actualPro += finalMeals[cat].pro; actualFat += finalMeals[cat].fat; } });
const actualIntakeKcal = Math.round((actualCho * 4) + (actualPro * 4) + (actualFat * 9));

const generaTimelineDieta = () => {
let preW = quandoTiAlleni === 'sera' ? L-Citrullina, Arginina, Ashwagandha : Caffeina, L-Citrullina, L-Tirosina;
let intraW = activeDieta === 'Keto' ? Elettroliti, MCT Oil, EAA 15g : HBCD ${intraCho}g, EAA 15g, Creatina;
const bloccoIntra = { isIntra: true, titolo: "INTEGRAZIONE WORKOUT", descrizione: ${preW} | ${intraW} };
const t = [];
if (quandoTiAlleni === 'mattina') { if (digiuno) t.push({ isIntra: true, titolo: "DIGIUNO 16:8", descrizione: ""}); t.push(bloccoIntra); t.push({ idCategoria: 'PostWorkout', titoloUI: 'Post-Workout' }); if (!digiuno) t.push({ idCategoria: 'Pasto1', titoloUI: 'Pranzo' }); t.push({ idCategoria: 'Pasto2', titoloUI: 'Cena' }); t.push({ idCategoria: 'Pasto3', titoloUI: 'Pre-nanna' }); }
else if (quandoTiAlleni === 'pausa') { if (digiuno) t.push({ isIntra: true, titolo: "DIGIUNO 16:8", descrizione: ""}); else t.push({ idCategoria: 'Pasto1', titoloUI: 'Colazione' }); t.push(bloccoIntra); t.push({ idCategoria: 'PostWorkout', titoloUI: 'Post-Workout' }); t.push({ idCategoria: 'Pasto2', titoloUI: 'Cena' }); t.push({ idCategoria: 'Pasto3', titoloUI: 'Pre-nanna' }); }
else { if (digiuno) t.push({ isIntra: true, titolo: "DIGIUNO 16:8", descrizione: ""}); else t.push({ idCategoria: 'Pasto1', titoloUI: 'Colazione' }); t.push({ idCategoria: 'Pasto2', titoloUI: 'Pranzo' }); t.push({ idCategoria: 'Pasto3', titoloUI: 'Spuntino' }); t.push(bloccoIntra); t.push({ idCategoria: 'PostWorkout', titoloUI: 'Post-Workout' }); }
return t;
};

// VISTA HOME
if (appState === 'HOME') {
return (



Protocollo Anti-Secco

SaaS Periodization Engine

       <div className="space-y-5">
          <div>
             <label className="text-xs text-slate-500 uppercase font-bold block mb-2 ml-1">Atleta</label>
             <select value={utenteCorrente} onChange={e => setUtenteCorrente(e.target.value)} className="w-full bg-[#F8FAFC] text-slate-800 p-4 rounded-2xl border border-slate-100 outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all font-bold shadow-inner">
                {listaAtleti.map(a => <option key={a} value={a}>{a}</option>)}
             </select>
          </div>

          <div>
             <label className="text-xs text-slate-500 uppercase font-bold block mb-2 ml-1">Fase Metabolica</label>
             <select value={protocolloAttivo} onChange={e => setProtocolloAttivo(e.target.value)} className="w-full bg-[#F8FAFC] text-slate-800 p-4 rounded-2xl border border-slate-100 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition-all font-bold shadow-inner">
                <option value="Massa">🔥 Costruzione (Massa)</option>
                <option value="Shred">🔪 Definizione (Shred)</option>
                <option value="Ricomposizione">⚖️ Ricomposizione</option>
             </select>
          </div>

          <div>
             <label className="text-xs text-slate-500 uppercase font-bold block mb-2 ml-1">Nutrizione</label>
             <select value={tipoDieta} onChange={e => setTipoDieta(e.target.value)} className="w-full bg-[#F8FAFC] text-slate-800 p-4 rounded-2xl border border-slate-100 outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all font-bold shadow-inner">
                <option value="Equilibrata">⚖️ Equilibrata</option>
                <option value="Keto">🥩 Chetogenica</option>
                <option value="LowCarb">🥑 Low Carb</option>
                <option value="HighCarb">🍚 High Carb</option>
             </select>
          </div>

          <button onClick={() => caricaProfilo(utenteCorrente, protocolloAttivo, tipoDieta)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold p-4 rounded-2xl uppercase tracking-widest transition-all shadow-[0_10px_20px_-10px_rgba(249,115,22,0.6)] mt-4">
             Accedi al Sistema
          </button>
       </div>
    </div>
  </div>
);


}

// VISTA MAIN DASHBOARD
return (


  {/* HEADER */}
  <header className="mb-8 flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
    <div className="flex items-center gap-4">
      <button onClick={() => setAppState('HOME')} className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-700 rounded-full shadow-inner transition-all">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          Protocollo <span className="text-orange-500">{protocolloAttivo}</span>
        </h1>
        <p className="text-xs text-slate-400 font-medium">{utenteCorrente} • {tipoDieta}</p>
      </div>
    </div>
    <div className="hidden sm:flex items-center gap-2">
        <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border-2 border-white shadow-sm">
            {utenteCorrente.charAt(0)}
        </span>
    </div>
  </header>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    
    {/* COLONNA SX: TELEMETRIA */}
    <div className="flex flex-col gap-8 lg:col-span-3">
      <section className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800">Telemetria</h2>
          <button onClick={() => setVistaTelemetria(vistaTelemetria === 'FORM' ? 'STORICO' : 'FORM')} className="bg-slate-100 text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm">
            {vistaTelemetria === 'STORICO' ? 'Form' : 'Storico'}
          </button>
        </div>

        {vistaTelemetria === 'FORM' ? (
           <div className="space-y-5">
             <div className="grid grid-cols-2 gap-3">
               {misureBase.map((m) => (
                   <div key={m.id} className="bg-[#F8FAFC] p-3 rounded-2xl shadow-inner border border-slate-100">
                     <label className="text-[10px] text-slate-400 uppercase font-bold flex justify-between">{m.label} <span>{m.unit}</span></label>
                     <input type="number" value={biometria[m.id] || ''} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-lg font-bold text-slate-700 outline-none mt-1" placeholder="0" />
                   </div>
               ))}
             </div>
             
             <SvgBodyCompositionWheel data={biometria} altezza={altezza} eta={eta} />
           </div>
        ) : (
           <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
             {storicoMisure.length === 0 ? <p className="text-xs text-slate-400 text-center">Nessun dato.</p> : (
                storicoMisure.map((mis) => (
                     <div key={mis.id} className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-800 mb-2">{new Date(mis.data).toLocaleDateString()}</p>
                        <p className="text-sm font-medium text-slate-600">Peso: {mis.peso}kg</p>
                     </div>
                ))
             )}
           </div>
        )}
      </section>
    </div>

    {/* COLONNA CENTRALE: ALLENAMENTO E DIETA */}
    <div className="flex flex-col gap-8 lg:col-span-5">
      
      {/* SCHEDA ALLENAMENTO */}
      <section className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex flex-col h-[75vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800">Workout di Oggi</h2>
          <div className="bg-slate-100 p-1 rounded-2xl flex gap-1 shadow-inner">
            {['Spinta', 'Tirata', 'Gambe'].map((sch) => (
              <button key={sch} onClick={() => setSchedaAttiva(sch as any)} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${schedaAttiva === sch ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-500'}`}>{sch}</button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {dbDinamico[schedaAttiva as keyof typeof dbDinamico].esercizi.map((es: any) => {
            const nomeAttuale = eserciziModificati[es.id] || es.nome;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const currentEx = es.alternative?.find((a: any) => a.nome === nomeAttuale) || es;
            const animType = currentEx.anim || "chest_barbell_flat"; 
            const phaseColor = es.fase.includes('Fase 1') ? 'text-orange-500 bg-orange-50' : (es.fase.includes('Fase 2') ? 'text-blue-500 bg-blue-50' : 'text-green-500 bg-green-50');

            return (
              <div key={es.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
                
                <div className="flex items-center gap-4">
                  <MediaVisualizer animKey={animType} className="flex-shrink-0" />
                  <div className="flex-1">
                     <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm text-slate-800 leading-tight">{nomeAttuale}</h3>
                        <button onClick={() => apriSwapEsercizio(es)} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-inner">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                        </button>
                     </div>
                     <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${phaseColor}`}>{es.fase}</span>
                     <p className="text-[11px] text-slate-400 mt-2 font-medium">{es.rep}</p>
                  </div>
                </div>
                
                <div className="bg-[#F8FAFC] p-3 rounded-2xl flex gap-2 shadow-inner border border-slate-50">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex-1">
                            <label className="text-[9px] text-slate-400 font-bold block text-center mb-1">SET {i+1}</label>
                            <input type="number" className="w-full bg-white border border-slate-200 rounded-xl py-1.5 text-center text-xs font-bold text-slate-700 outline-none focus:border-orange-400 shadow-sm" placeholder="-" />
                        </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>

    {/* COLONNA DESTRA: NUTRIZIONE E GRAFICI */}
    <div className="flex flex-col gap-8 lg:col-span-4">
      
      <section className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Nutrition</h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{actualIntakeKcal} Kcal</span>
        </div>

        {/* Macro Bars */}
        <div className="flex gap-4 mb-6 px-2">
            <div className="flex-1 flex flex-col items-center">
                <div className="w-3 h-20 bg-slate-100 rounded-full relative overflow-hidden flex flex-col justify-end shadow-inner mb-2">
                    <div className="w-full bg-blue-400 rounded-full" style={{height: '60%'}}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">CHO</span>
                <span className="text-[11px] font-black text-slate-700">{targetCho}g</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
                <div className="w-3 h-20 bg-slate-100 rounded-full relative overflow-hidden flex flex-col justify-end shadow-inner mb-2">
                    <div className="w-full bg-orange-400 rounded-full" style={{height: '80%'}}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">PRO</span>
                <span className="text-[11px] font-black text-slate-700">{targetPro}g</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
                <div className="w-3 h-20 bg-slate-100 rounded-full relative overflow-hidden flex flex-col justify-end shadow-inner mb-2">
                    <div className="w-full bg-pink-400 rounded-full" style={{height: '40%'}}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">FAT</span>
                <span className="text-[11px] font-black text-slate-700">{targetFat}g</span>
            </div>
        </div>

        <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 mb-2 px-1">Oggi</h3>
            {generaTimelineDieta().map((blocco, i) => {
                if(blocco.isIntra) return null;
                const cat = blocco.idCategoria as string;
                const finalCho = finalMeals[cat]?.cho || 0, finalPro = finalMeals[cat]?.pro || 0, finalFat = finalMeals[cat]?.fat || 0;
                return (
                    <div key={i} className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold text-slate-800">{blocco.titoloUI}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{finalCho}c • {finalPro}p • {finalFat}f</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                        </div>
                    </div>
                );
            })}
        </div>
      </section>
    </div>

  </div>

  {/* Modale Esercizio */}
  {modalEsercizio && (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-slate-800">Sostituisci</h3>
          <button onClick={() => setModalEsercizio(false)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold">&times;</button>
        </div>
        <div className="space-y-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {esercizioDaCambiare.alternative.map((alt: any, i: number) => (
            <button key={i} onClick={() => { setEserciziModificati({ ...eserciziModificati, [esercizioDaCambiare.id]: alt.nome }); setModalEsercizio(false); }} className="w-full text-left p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl hover:border-orange-300 hover:shadow-sm transition-all">
              <p className="font-bold text-sm text-slate-800">{alt.nome}</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{alt.note}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )}

</main>


);
}
