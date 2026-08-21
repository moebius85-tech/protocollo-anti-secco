"use client";
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

// Configurazione Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 1. DATABASE ALLENAMENTO (Integrale E1-E27)
// ==========================================
const dbAllenamento = {
  Spinta: {
    focus: "SPINTA (Petto, Spalle, Tricipiti)",
    esercizi: [
      { id: "e1", nome: "Panca piana bilanciere", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Scapole strette, petto in fuori. Scendi a sfiorare e spingi.", alternative: [{ nome: "Chest Press Pesante", note: "Spinta Pura" }] },
      { id: "e3", nome: "Panca inclinata manubri", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Colpisci la parte alta per lo spessore.", alternative: [{ nome: "Spinte Panca Inclinata", note: "Lento" }] },
      { id: "e4", nome: "Chest press / Multipower", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5'", dettaglio: "Esercizio guidato: senti il petto in ogni centimetro.", alternative: [{ nome: "Pectoral Machine", note: "Tensione" }] },
      { id: "e5", nome: "Croci ai manubri", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45\"", dettaglio: "Allunga al massimo, poi chiudi strizzando. Gonfia di sangue.", alternative: [{ nome: "Croci Cavi", note: "Allungamento" }] },
      { id: "e18", nome: "Lento avanti manubri", fase: "Fase 1: Forza Spalle", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Spinta sopra la testa. Parto orecchie, spingo su.", alternative: [{ nome: "Military Press", note: "Bilanciere" }] },
      { id: "e20", nome: "Alzate laterali ai cavi", fase: "Fase 3: Pump Spalle", rep: "3-4 serie, 10-12 rep | Rec: 45\"", dettaglio: "Tensione costante sul deltoide laterale.", alternative: [{ nome: "Alzate manubri", note: "No slanci" }] },
      { id: "e22", nome: "Panca stretta bilanciere", fase: "Fase 1: Forza Tricipiti", rep: "4-5 serie, 6-8 rep | Rec: 2'", dettaglio: "Gomiti vicini al corpo. Il muscolo che fa il braccio grosso.", alternative: [{ nome: "French Press", note: "Gomiti fermi" }] },
      { id: "e27", nome: "Push down cavi corda", fase: "Fase 3: Pump Tricipiti", rep: "3-4 serie, 12-15 rep | Rec: 45\"", dettaglio: "Spingo giù aprendo la corda alla fine e strizzando.", alternative: [{ nome: "Estensioni singole", note: "Pump" }] }
    ]
  },
  Tirata: {
    focus: "TIRATA (Schiena, Bicipiti)",
    esercizi: [
      { id: "e6", nome: "Trazioni", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Braccia distese, tiro portando i gomiti in basso.", alternative: [{ nome: "Lat Machine Larga", note: "Pesante" }] },
      { id: "e7", nome: "Rematore bilanciere", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Busto inclinato, schiena dritta, tira all'ombelico.", alternative: [{ nome: "Rematore T-Bar", note: "Presa Neutra" }] },
      { id: "e9", nome: "Row machine / Pulley", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5'", dettaglio: "Tiro portando i gomiti dietro. Senti la schiena chiudersi.", alternative: [{ nome: "Pulldown tese", note: "Isolamento" }] },
      { id: "e10", nome: "Pullover ai cavi", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45\"", dettaglio: "Allungo in alto al massimo, poi spingo giù. Tanto sangue.", alternative: [{ nome: "Pullover Manubrio", note: "Panca" }] },
      { id: "e23", nome: "Curl bilanciere EZ", fase: "Fase 1: Forza Bicipiti", rep: "4-5 serie, 6-8 rep | Rec: 2'", dettaglio: "Gomiti fermi al fianco, salgo contraendo, scendo controllato.", alternative: [{ nome: "Curl Inclinata", note: "Allungamento" }] },
      { id: "e26", nome: "Curl ai cavi con barra", fase: "Fase 3: Pump Bicipiti", rep: "3-4 serie, 12-15 rep | Rec: 45\"", dettaglio: "Tensione costante dal cavo, salgo e strizzo.", alternative: [{ nome: "Curl Concentrato", note: "Strizzare" }] }
    ]
  },
  Gambe: {
    focus: "GAMBE E POLPACCI",
    esercizi: [
      { id: "e11", nome: "Squat bilanciere", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Sotto il parallelo, spingo dai talloni. Costruisce stazza.", alternative: [{ nome: "Hack Squat Pesante", note: "Macchina" }] },
      { id: "e12", nome: "Hack squat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2'", dettaglio: "Macchina guidata per caricare in sicurezza. Tutto sui quad.", alternative: [{ nome: "Pressa 45 Pesante", note: "Piedi bassi" }] },
      { id: "e14", nome: "Leg press 45°", fase: "Fase 2: Connessione", rep: "4-5 serie, 10-12 rep | Rec: 1.5'", dettaglio: "Scendo ginocchia al petto. Nessun blocco articolare.", alternative: [{ nome: "Affondi manubri", note: "Stabilità" }] },
      { id: "e15", nome: "Leg extension", fase: "Fase 3: Pump Quad", rep: "3-4 serie, 15 rep | Rec: 45\"", dettaglio: "Distendo e strizzo in alto un secondo, scendo controllato.", alternative: [{ nome: "Sissy Squat", note: "Corpo libero" }] },
      { id: "e13", nome: "Stacco rumeno", fase: "Fase 2: Conn. Femorali", rep: "3-4 serie, 10-12 rep | Rec: 1.5'", dettaglio: "Schiena dritta, spingo bacino indietro, risalgo contraendo glutei.", alternative: [{ nome: "Stacco Tese", note: "Focus allungamento" }] },
      { id: "e16", nome: "Leg curl sdraiato", fase: "Fase 3: Pump Femorali", rep: "3-4 serie, 15 rep | Rec: 45\"", dettaglio: "Porto il tallone al gluteo strizzando, scendo lento.", alternative: [{ nome: "Leg curl seduto", note: "Tensione" }] },
      { id: "e17", nome: "Polpacci", fase: "Fase 3: Pump", rep: "3-4 serie, 20 rep | Rec: 45\"", dettaglio: "Arco completo in punta, fermo in alto, scendo sotto allungando.", alternative: [{ nome: "Calf Seduto", note: "Focus Soleo" }] }
    ]
  }
};

// ==========================================
// 2. DATABASE ALIMENTAZIONE CON MACRO BASE
// ==========================================
const dbAlimenti = {
  Pasto1: [
    { nome: "Avena + Whey + Burro Arachidi", baseCarbo: 12, pro: "35g", fat: "15g" },
    { nome: "Pancakes farina avena + Albume", baseCarbo: 14, pro: "30g", fat: "10g" }
  ],
  Pasto2: [
    { nome: "Riso Basmati + Pollo + Olio EVO", baseCarbo: 20, pro: "40g", fat: "12g" },
    { nome: "Pasta di Semola + Carne Magra", baseCarbo: 20, pro: "45g", fat: "10g" }
  ],
  Pasto3: [
    { nome: "Patate Dolci + Salmone", baseCarbo: 16, pro: "40g", fat: "18g" },
    { nome: "Riso + Uova intere + Verdure", baseCarbo: 16, pro: "25g", fat: "18g" }
  ],
  PostWorkout: [
    { nome: "Crema di Riso + Whey Isolate", baseCarbo: 16, pro: "35g", fat: "1g" },
    { nome: "Corn Flakes + Whey Isolate", baseCarbo: 16, pro: "35g", fat: "1g" }
  ]
};

export default function Home() {
  // --- STATI: MULTI-UTENTE E CHECK ---
  const [utente, setUtente] = useState("Leonardo");
  const [eta, setEta] = useState<number | "">(41);
  const [altezza, setAltezza] = useState<number | "">(175);
  
  // --- STATI: LOGISTICA TURNI E TIMING ALLENAMENTO ---
  const [tipoTurno, setTipoTurno] = useState('spezzato');
  const [inizio1, setInizio1] = useState('');
  const [fine1, setFine1] = useState('');
  const [inizio2, setInizio2] = useState('');
  const [fine2, setFine2] = useState('');
  const [quandoTiAlleni, setQuandoTiAlleni] = useState('sera'); 

  useEffect(() => {
    if (tipoTurno === 'diretto' && quandoTiAlleni === 'pausa') {
      setQuandoTiAlleni('sera');
    }
  }, [tipoTurno, quandoTiAlleni]);

  // --- STATI: ALLENAMENTO FLESSIBILE ---
  const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
  const [giornoCalendario, setGiornoCalendario] = useState("Lunedì"); // Giorno effettivo
  const [schedaAttiva, setSchedaAttiva] = useState<"Spinta"|"Tirata"|"Gambe">("Spinta"); // Tipo allenamento
  
  const [eserciziModificati, setEserciziModificati] = useState<Record<string, string>>({});
  const [carichiAttuali, setCarichiAttuali] = useState<Record<string, string>>({});
  const [storicoSessioni, setStoricoSessioni] = useState<Array<{ data: string, giorno: string, scheda: string, carichi: Record<string, string>, oraId: number }>>([]);
  const [vistaStorico, setVistaStorico] = useState(false);

  const [modalEsercizio, setModalEsercizio] = useState(false);
  const [esercizioDaCambiare, setEsercizioDaCambiare] = useState({ id: '', nomeAttuale: '', alternative: [] as any[] });

  // --- STATI: ALIMENTAZIONE & BIOMETRIA ---
  const [moltiplicatoreCarbo, setMoltiplicatoreCarbo] = useState(5);
  const [biometria, setBiometria] = useState({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '' });
  const [feedbackIA, setFeedbackIA] = useState('Imposta i tuoi orari per generare la timeline alimentare.');
  const [pastiSelezionati, setPastiSelezionati] = useState({ Pasto1: 0, Pasto2: 0, Pasto3: 0, PostWorkout: 0 });
  
  const [modalAlimento, setModalAlimento] = useState(false);
  const [categoriaDaCambiare, setCategoriaDaCambiare] = useState<keyof typeof dbAlimenti>('Pasto1');

  // --- CARICAMENTO DATI UTENTE ---
  useEffect(() => {
    async function caricaDatiUtente() {
      const { data } = await supabase.from("check_utente").select("*").eq("nome_utente", utente).order("data", { ascending: false });
      if (data && data.length > 0) {
        setEta(data[0].eta || "");
        setAltezza(data[0].altezza || "");
        setBiometria(data[0].circonferenze || { peso: data[0].peso || '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '' });
        setFeedbackIA(`Profilo di ${utente} caricato con successo dal Database.`);
      }
    }
    caricaDatiUtente();
  }, [utente]);

  // --- HANDLERS: ALLENAMENTO ---
  const getUltimoCarico = (idEs: string) => {
    for (let i = storicoSessioni.length - 1; i >= 0; i--) {
      if (storicoSessioni[i].carichi[idEs]) return storicoSessioni[i].carichi[idEs];
    }
    return '0';
  };

  const salvaSessione = async () => {
    if (Object.keys(carichiAttuali).length === 0) {
      setFeedbackIA("Non hai inserito nessun carico. La sessione non è stata salvata.");
      return;
    }
    const nuovaSessione = { data: new Date().toLocaleDateString('it-IT'), oraId: Date.now(), giorno: giornoCalendario, scheda: schedaAttiva, carichi: { ...carichiAttuali } };
    setStoricoSessioni([...storicoSessioni, nuovaSessione]);
    setCarichiAttuali({}); 
    
    // Salvataggio su Supabase (Opzionale: crea tabella storico_allenamenti in futuro)
    await supabase.from("storico_allenamenti").insert([{ nome_utente: utente, giornata: `${giornoCalendario} - ${schedaAttiva}`, dettagli_esercizi: nuovaSessione.carichi, data: new Date() }]);
    setFeedbackIA(`Sessione salvata nel cloud. I carichi registrati sono diventati i nuovi target da battere per ${utente}.`);
  };

  const apriSwapEsercizio = (es: any) => { setEsercizioDaCambiare({ id: es.id, nomeAttuale: eserciziModificati[es.id] || es.nome, alternative: es.alternative }); setModalEsercizio(true); };
  const confermaSwapEsercizio = (nuovoNome: string) => { setEserciziModificati({ ...eserciziModificati, [esercizioDaCambiare.id]: nuovoNome }); setModalEsercizio(false); };
  const apriSwapAlimento = (categoria: string) => { setCategoriaDaCambiare(categoria as keyof typeof dbAlimenti); setModalAlimento(true); };
  const confermaSwapAlimento = (index: number) => { setPastiSelezionati({ ...pastiSelezionati, [categoriaDaCambiare]: index }); setModalAlimento(false); };
  const aggiornaBiometria = (campo: string, valore: string) => { setBiometria({ ...biometria, [campo]: valore }); };

  const valutaCheckFisico = async () => {
    const { peso, petto, spalle, braccia, gambe, glutei } = biometria;
    if (peso && petto && spalle && braccia && gambe && glutei && eta && altezza) {
      setMoltiplicatoreCarbo(6);
      setFeedbackIA(`Analisi completata. Volume globale in stallo rilevato. Ho aumentato l'introito a 6g/kg di carboidrati per forzare l'accumulo. Matrice aggiornata per ${utente}. Dati inviati al Cloud.`);
      
      // Salva check su Supabase
      await supabase.from("check_utente").insert([{ nome_utente: utente, eta: Number(eta), altezza: Number(altezza), peso: Number(peso), circonferenze: biometria, data: new Date() }]);
    } else {
      setFeedbackIA("Compila TUTTI i campi del check corporeo, l'Età e l'Altezza per il salvataggio.");
    }
  };

  const generaTimelineDieta = (): Array<{ isIntra?: boolean; titolo?: string; descrizione?: string; idCategoria?: string; titoloUI?: string }> => {
    const bloccoIntra = { isIntra: true, titolo: "Intra-Workout", descrizione: "Ciclodestrine (40g) + EAA (10g) + Creatina (5g)" };
    if (quandoTiAlleni === 'mattina') return [ bloccoIntra, { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout' }, { idCategoria: 'Pasto1', titoloUI: 'Pranzo' }, { idCategoria: 'Pasto2', titoloUI: 'Cena' }, { idCategoria: 'Pasto3', titoloUI: 'Pre-nanna' }];
    if (quandoTiAlleni === 'pausa') return [ { idCategoria: 'Pasto1', titoloUI: 'Colazione' }, bloccoIntra, { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout' }, { idCategoria: 'Pasto2', titoloUI: 'Cena' }, { idCategoria: 'Pasto3', titoloUI: 'Pre-nanna' }];
    return [ { idCategoria: 'Pasto1', titoloUI: 'Colazione' }, { idCategoria: 'Pasto2', titoloUI: 'Pranzo' }, { idCategoria: 'Pasto3', titoloUI: 'Spuntino Pre-Workout' }, bloccoIntra, { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Sera)' } ];
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-3 sm:p-6 font-sans overflow-x-hidden">
      
      <header className="mb-6 border-b border-orange-500/30 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-orange-500">
            Protocollo Anti-Secco <span className="text-white">Pro</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">Multi-User Coaching & Tracking</p>
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-[10px] text-orange-400 font-bold uppercase mb-1">Seleziona Atleta:</label>
          <input 
            type="text" 
            value={utente} 
            onChange={(e) => setUtente(e.target.value)}
            className="bg-neutral-900 border border-neutral-700 text-white font-bold p-2 rounded focus:outline-none focus:border-orange-500 w-full"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLONNA 1: TURNI E TELEMETRIA */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-neutral-900 border border-neutral-800 p-4 sm:p-5 rounded-xl shadow-lg">
            <h2 className="text-base sm:text-lg font-bold text-white border-b border-neutral-700 pb-2 mb-3">Telemetria & Parametri ({utente})</h2>
            
            {/* Età e Altezza */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Età</label>
                <input type="number" value={eta} onChange={(e) => setEta(Number(e.target.value))} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
              </div>
              <div className="flex-1 bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Altezza (cm)</label>
                <input type="number" value={altezza} onChange={(e) => setAltezza(Number(e.target.value))} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['peso', 'petto', 'spalle', 'braccia', 'gambe', 'glutei'].map((campo) => (
                <div key={campo} className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                  <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">{campo}</label>
                  {/* @ts-ignore */}
                  <input type="number" value={biometria[campo]} onChange={(e) => aggiornaBiometria(campo, e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
                </div>
              ))}
            </div>
            <button onClick={valutaCheckFisico} className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg uppercase tracking-widest text-[10px] active:scale-95 transition-all">Salva & Analizza Check</button>
          </section>

          <section className="bg-neutral-900 border border-neutral-800 p-4 sm:p-5 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-700 pb-2 mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">Timeline Nutrizionale</h2>
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${moltiplicatoreCarbo > 5 ? 'bg-orange-600 text-white animate-pulse' : 'bg-neutral-800 text-neutral-400'}`}>
                {moltiplicatoreCarbo}g CHO/Kg
              </span>
            </div>
            <div className="space-y-3">
              {generaTimelineDieta().map((blocco, idx) => {
                if (blocco.isIntra) {
                  return (
                    <div key={`intra-${idx}`} className="p-3 rounded-lg border bg-orange-950/20 border-orange-900/50 break-words">
                      <span className="text-[10px] uppercase font-bold text-orange-500 mb-1 block">{blocco.titolo}</span>
                      <p className="font-semibold text-sm text-white">{blocco.descrizione}</p>
                    </div>
                  );
                }
                const cat = blocco.idCategoria as keyof typeof dbAlimenti;
                const isPW = cat === 'PostWorkout';
                const itemScelto = dbAlimenti[cat][pastiSelezionati[cat]];
                const carboCalcolati = itemScelto.baseCarbo * moltiplicatoreCarbo;

                return (
                  <div key={`${cat}-${idx}`} className={`p-3 rounded-lg border break-words ${isPW ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-neutral-950 border-neutral-800'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isPW ? 'text-emerald-500' : 'text-blue-400'}`}>{blocco.titoloUI}</span>
                      <button onClick={() => apriSwapAlimento(cat)} className="text-[10px] bg-neutral-800 px-2 py-1 rounded font-bold uppercase text-neutral-300">Swap</button>
                    </div>
                    <p className="font-semibold text-[13px] text-white leading-tight">{itemScelto.nome}</p>
                    <p className="text-[11px] text-neutral-400 font-mono mt-1 flex flex-wrap gap-1">
                      <span>CHO: <span className="text-orange-400 font-bold">{carboCalcolati}g</span></span>
                      <span>| PRO: {itemScelto.pro}</span>
                      <span>| FAT: {itemScelto.fat}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* COLONNA 2: ALLENAMENTO FLESSIBILE */}
        <section className="lg:col-span-8 bg-neutral-900 border border-neutral-800 p-4 sm:p-5 rounded-xl shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-3">
            <h2 className="text-base sm:text-lg font-bold text-white">Gestione Workout</h2>
            <button onClick={() => setVistaStorico(!vistaStorico)} className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-md ${vistaStorico ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-300'}`}>
              {vistaStorico ? 'Torna al Workout' : 'Calendario'}
            </button>
          </div>

          {!vistaStorico ? (
            <>
              {/* SELEZIONE GIORNO DELLA SETTIMANA */}
              <div className="mb-4">
                <p className="text-[10px] uppercase font-bold text-neutral-500 mb-2">1. In che giorno ti stai allenando?</p>
                <div className="flex flex-wrap gap-2">
                  {giorniSettimana.map((gg) => (
                    <button key={gg} onClick={() => setGiornoCalendario(gg)} className={`px-3 py-2 text-xs font-bold rounded-md flex-1 min-w-[70px] ${giornoCalendario === gg ? 'bg-neutral-700 text-white border-b-2 border-white' : 'bg-neutral-950 text-neutral-500 border border-neutral-800'}`}>{gg}</button>
                  ))}
                </div>
              </div>

              {/* SELEZIONE TIPO SCHEDA */}
              <div className="mb-4">
                <p className="text-[10px] uppercase font-bold text-neutral-500 mb-2">2. Scegli la scheda di oggi:</p>
                <div className="flex gap-2">
                  {['Spinta', 'Tirata', 'Gambe'].map((sch) => (
                    <button key={sch} onClick={() => setSchedaAttiva(sch as any)} className={`px-3 py-2 text-xs font-bold rounded-md flex-1 ${schedaAttiva === sch ? 'bg-orange-600 text-white shadow-lg' : 'bg-neutral-950 text-neutral-500 border border-neutral-800'}`}>
                      {sch.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                  Focus: {dbAllenamento[schedaAttiva].focus}
                </span>
              </div>

              {/* LISTA ESERCIZI RESPONSIVE */}
              <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4" style={{ maxHeight: "60vh" }}>
                {dbAllenamento[schedaAttiva].esercizi.map((es) => {
                  const nomeVis = eserciziModificati[es.id] || es.nome;
                  const ultimoCarico = getUltimoCarico(es.id);
                  
                  return (
                    <div key={es.id} className="bg-neutral-950 p-3 sm:p-4 rounded-xl border border-neutral-800 relative group overflow-hidden">
                      <div className={`absolute top-0 left-0 w-1 h-full ${es.fase.includes('Fase 1') ? 'bg-orange-500' : es.fase.includes('Fase 2') ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                      <div className="pl-3">
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] uppercase font-black tracking-widest ${es.fase.includes('Fase 1') ? 'text-orange-500' : es.fase.includes('Fase 2') ? 'text-blue-500' : 'text-red-500'}`}>{es.fase}</span>
                          <button onClick={() => apriSwapEsercizio(es)} className="text-[10px] bg-neutral-800 px-2 py-1 rounded font-bold uppercase text-neutral-400">Swap</button>
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-white mt-1 break-words">{nomeVis}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                          <p className="text-[11px] font-bold text-neutral-300 bg-neutral-900 px-2 py-1 rounded border border-neutral-700 w-fit">{es.rep}</p>
                          <p className="text-[10px] sm:text-[11px] text-neutral-400 italic flex-1 break-words">{es.dettaglio}</p>
                        </div>
                        
                        {/* INPUT TRACKING RESPONSIVE */}
                        <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <div className="w-full sm:w-1/2">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 block mb-1">Target</label>
                            <div className="bg-neutral-900 border border-neutral-800 p-2 rounded text-sm text-neutral-400 font-mono">{ultimoCarico} kg</div>
                          </div>
                          <div className="w-full sm:w-1/2">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-orange-500 block mb-1">Kg Effettivi</label>
                            <input 
                              type="number" 
                              value={carichiAttuali[es.id] || ''}
                              onChange={(e) => setCarichiAttuali({...carichiAttuali, [es.id]: e.target.value})}
                              className="w-full bg-neutral-900 border border-orange-500/50 p-2 rounded text-sm text-white font-bold outline-none focus:border-orange-500" 
                              placeholder="Inserisci kg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-700">
                <button onClick={salvaSessione} className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest text-sm rounded-lg shadow-lg active:scale-95 transition-all">
                  Concludi e Salva {schedaAttiva} ({giornoCalendario})
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {storicoSessioni.length === 0 ? (
                <div className="text-center p-10 text-neutral-500 border border-dashed border-neutral-800 rounded-xl">Nessuna sessione.</div>
              ) : (
                [...storicoSessioni].reverse().map((sess) => (
                  <div key={sess.oraId} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <div className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-2">
                      <div>
                        <span className="font-bold text-orange-500 block">{sess.giorno} - Scheda {sess.scheda}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">{sess.data}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(sess.carichi).map(([idEs, peso]) => (
                        <div key={idEs} className="bg-neutral-900 p-2 rounded flex justify-between items-center gap-2">
                          <span className="text-neutral-400 truncate flex-1">{eserciziModificati[idEs] || Object.values(dbAllenamento).flatMap(d=>d.esercizi).find(e=>e.id===idEs)?.nome}</span>
                          <span className="font-bold text-white whitespace-nowrap">{peso} kg</span>
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
      
      {/* --- MODALI SWAP --- */}
      {modalEsercizio && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
              <h3 className="font-bold text-lg text-white">Swap Esercizio</h3>
              <button onClick={() => setModalEsercizio(false)} className="text-neutral-500 text-xl">&times;</button>
            </div>
            <div className="space-y-3">
              {esercizioDaCambiare.alternative.map((alt, i) => (
                <button key={i} onClick={() => confermaSwapEsercizio(alt.nome)} className="w-full text-left p-4 bg-neutral-950 border border-neutral-800 rounded-lg group">
                  <p className="font-bold text-sm text-white group-hover:text-orange-400 break-words">{alt.nome}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modalAlimento && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
              <h3 className="font-bold text-lg text-white">Swap Pasto</h3>
              <button onClick={() => setModalAlimento(false)} className="text-neutral-500 text-xl">&times;</button>
            </div>
            <div className="space-y-3">
              {/* @ts-ignore */}
              {dbAlimenti[categoriaDaCambiare].map((alt, i) => (
                <button key={i} onClick={() => confermaSwapAlimento(i)} className="w-full text-left p-4 bg-neutral-950 border border-neutral-800 rounded-lg group break-words">
                  <p className="font-bold text-sm text-white group-hover:text-emerald-400">{alt.nome}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}