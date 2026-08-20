'use client';
import { useState, useEffect } from 'react';

// ==========================================
// 1. DATABASE ALLENAMENTO (Integrale E1-E27)
// ==========================================
const dbAllenamento = {
  Lunedì: {
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
  Mercoledì: {
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
  Venerdì: {
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
  // --- STATI: LOGISTICA TURNI E TIMING ALLENAMENTO ---
  const [tipoTurno, setTipoTurno] = useState('spezzato');
  const [inizio1, setInizio1] = useState('');
  const [fine1, setFine1] = useState('');
  const [inizio2, setInizio2] = useState('');
  const [fine2, setFine2] = useState('');
  const [quandoTiAlleni, setQuandoTiAlleni] = useState('sera'); // 'mattina', 'pausa', 'sera'

  // Se l'utente toglie lo spezzato ma aveva selezionato "pausa", forziamo "sera"
  useEffect(() => {
    if (tipoTurno === 'diretto' && quandoTiAlleni === 'pausa') {
      setQuandoTiAlleni('sera');
    }
  }, [tipoTurno, quandoTiAlleni]);

  // --- STATI: ALLENAMENTO ---
  const [giornoAttivo, setGiornoAttivo] = useState('Lunedì');
  const [eserciziModificati, setEserciziModificati] = useState<Record<string, string>>({});
  const [carichiAttuali, setCarichiAttuali] = useState<Record<string, string>>({});
  
  const [storicoSessioni, setStoricoSessioni] = useState<Array<{ data: string, giorno: string, carichi: Record<string, string>, oraId: number }>>([]);
  const [vistaStorico, setVistaStorico] = useState(false);

  const [modalEsercizio, setModalEsercizio] = useState(false);
  const [esercizioDaCambiare, setEsercizioDaCambiare] = useState({ id: '', nomeAttuale: '', alternative: [] as any[] });

  // --- STATI: ALIMENTAZIONE & CHECK-IN ---
  const [moltiplicatoreCarbo, setMoltiplicatoreCarbo] = useState(5);
  const [biometria, setBiometria] = useState({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '' });
  const [feedbackIA, setFeedbackIA] = useState('Imposta i tuoi orari per generare la timeline alimentare.');
  const [pastiSelezionati, setPastiSelezionati] = useState({ Pasto1: 0, Pasto2: 0, Pasto3: 0, PostWorkout: 0 });
  
  const [modalAlimento, setModalAlimento] = useState(false);
  const [categoriaDaCambiare, setCategoriaDaCambiare] = useState<keyof typeof dbAlimenti>('Pasto1');

  // --- HANDLERS: ALLENAMENTO ---
  const getUltimoCarico = (idEs: string) => {
    for (let i = storicoSessioni.length - 1; i >= 0; i--) {
      if (storicoSessioni[i].carichi[idEs]) return storicoSessioni[i].carichi[idEs];
    }
    return '0';
  };

  const salvaSessione = () => {
    if (Object.keys(carichiAttuali).length === 0) {
      setFeedbackIA("Non hai inserito nessun carico. La sessione non è stata salvata.");
      return;
    }
    const nuovaSessione = { data: new Date().toLocaleDateString('it-IT'), oraId: Date.now(), giorno: giornoAttivo, carichi: { ...carichiAttuali } };
    setStoricoSessioni([...storicoSessioni, nuovaSessione]);
    setCarichiAttuali({}); 
    setFeedbackIA(`Sessione salvata. I carichi registrati sono diventati i nuovi target da battere.`);
  };

  const eliminaSessione = (idDaEliminare: number) => {
    setStoricoSessioni(storicoSessioni.filter(sess => sess.oraId !== idDaEliminare));
  };

  const apriSwapEsercizio = (es: any) => { setEsercizioDaCambiare({ id: es.id, nomeAttuale: eserciziModificati[es.id] || es.nome, alternative: es.alternative }); setModalEsercizio(true); };
  const confermaSwapEsercizio = (nuovoNome: string) => { setEserciziModificati({ ...eserciziModificati, [esercizioDaCambiare.id]: nuovoNome }); setModalEsercizio(false); };

  // --- HANDLERS: ALIMENTAZIONE ---
  const apriSwapAlimento = (categoria: string) => { setCategoriaDaCambiare(categoria as keyof typeof dbAlimenti); setModalAlimento(true); };
  const confermaSwapAlimento = (index: number) => { setPastiSelezionati({ ...pastiSelezionati, [categoriaDaCambiare]: index }); setModalAlimento(false); };

  // --- HANDLERS: TELEMETRIA ---
  const aggiornaBiometria = (campo: string, valore: string) => { setBiometria({ ...biometria, [campo]: valore }); };
  const valutaCheckFisico = () => {
    const { peso, petto, spalle, braccia, gambe, glutei } = biometria;
    if (peso && petto && spalle && braccia && gambe && glutei) {
      setMoltiplicatoreCarbo(6);
      setFeedbackIA(`Analisi completata. Volume globale in stallo rilevato. Ho aumentato l'introito a 6g/kg di carboidrati per forzare l'accumulo. La Matrice Nutrizionale è aggiornata.`);
    } else {
      setFeedbackIA("Compila TUTTI i 6 campi del check corporeo per ricalcolare i macros in sicurezza.");
    }
  };

// --- LOGICA DI RENDERIZZAZIONE DELLA TIMELINE ALIMENTARE ---
  const generaTimelineDieta = (): Array<{ isIntra?: boolean; titolo?: string; descrizione?: string; idCategoria?: string; titoloUI?: string }> => {
    const bloccoIntra = { isIntra: true, titolo: "Intra-Workout", descrizione: "Ciclodestrine (40g) + EAA (10g) + Creatina (5g)" };
    
    if (quandoTiAlleni === 'mattina') {
      return [
        bloccoIntra,
        { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Mattina)' },
        { idCategoria: 'Pasto1', titoloUI: 'Pranzo / Pasto 1' },
        { idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' },
        { idCategoria: 'Pasto3', titoloUI: 'Pre-nanna / Pasto 3' }
      ];
    } else if (quandoTiAlleni === 'pausa') {
      return [
        { idCategoria: 'Pasto1', titoloUI: 'Colazione' },
        bloccoIntra,
        { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Fine Pausa)' },
        { idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' },
        { idCategoria: 'Pasto3', titoloUI: 'Pre-nanna / Pasto 3' }
      ];
    } else {
      return [
        { idCategoria: 'Pasto1', titoloUI: 'Colazione' },
        { idCategoria: 'Pasto2', titoloUI: 'Pranzo' },
        { idCategoria: 'Pasto3', titoloUI: 'Spuntino Pre-Turno/Pre-Workout' },
        bloccoIntra,
        { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Sera)' }
      ];
    }
  };
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 lg:p-6 font-sans">
      
      <header className="mb-6 border-b border-orange-500/30 pb-4">
        <h1 className="text-3xl font-black tracking-tighter uppercase text-orange-500">
          Protocollo Anti-Secco <span className="text-white">Pro</span>
        </h1>
        <p className="text-sm text-neutral-400 font-medium tracking-wide">Tracking Carichi & Timing Nutrizionale</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ========================================= */}
        {/* COLONNA 1: TURNI & ALIMENTAZIONE          */}
        {/* ========================================= */}
        <div className="lg:col-span-4 space-y-6">
          
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-2">
              <h2 className="text-lg font-bold text-white">Gestione Tempo</h2>
              <select value={tipoTurno} onChange={(e) => setTipoTurno(e.target.value)} className="bg-neutral-950 text-xs text-orange-500 p-2 rounded border border-neutral-700 outline-none">
                <option value="diretto">Turno Diretto</option>
                <option value="spezzato">Turno Spezzato</option>
              </select>
            </div>
            
            <div className="space-y-4">
              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                <span className="text-xs text-blue-400 uppercase font-bold mb-2 block">
                  {tipoTurno === 'diretto' ? 'Orario Continuato' : 'Mattina (Euronics)'}
                </span>
                <div className="flex space-x-2">
                  <input type="time" value={inizio1} onChange={(e) => setInizio1(e.target.value)} className="w-1/2 bg-transparent text-sm border-b border-neutral-700 text-white p-1 outline-none focus:border-orange-500" />
                  <input type="time" value={fine1} onChange={(e) => setFine1(e.target.value)} className="w-1/2 bg-transparent text-sm border-b border-neutral-700 text-white p-1 outline-none focus:border-orange-500" />
                </div>
              </div>
              
              {tipoTurno === 'spezzato' && (
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                  <span className="text-xs text-blue-400 uppercase font-bold mb-2 block">Pomeriggio (Euronics)</span>
                  <div className="flex space-x-2">
                    <input type="time" value={inizio2} onChange={(e) => setInizio2(e.target.value)} className="w-1/2 bg-transparent text-sm border-b border-neutral-700 text-white p-1 outline-none focus:border-orange-500" />
                    <input type="time" value={fine2} onChange={(e) => setFine2(e.target.value)} className="w-1/2 bg-transparent text-sm border-b border-neutral-700 text-white p-1 outline-none focus:border-orange-500" />
                  </div>
                </div>
              )}

              {/* Quando ti alleni? */}
              <div className="mt-4 border-t border-neutral-700 pt-4">
                <span className="text-xs text-neutral-400 uppercase font-bold mb-2 block">Collocazione Allenamento:</span>
                <div className="flex space-x-2">
                  <button onClick={() => setQuandoTiAlleni('mattina')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${quandoTiAlleni === 'mattina' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>Mattina</button>
                  {tipoTurno === 'spezzato' && (
                    <button onClick={() => setQuandoTiAlleni('pausa')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${quandoTiAlleni === 'pausa' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>Pausa</button>
                  )}
                  <button onClick={() => setQuandoTiAlleni('sera')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${quandoTiAlleni === 'sera' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>Sera</button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center border-b border-neutral-700 pb-2 mb-4">
              <h2 className="text-lg font-bold text-white">Timeline Nutrizionale</h2>
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${moltiplicatoreCarbo > 5 ? 'bg-orange-600 text-white animate-pulse' : 'bg-neutral-800 text-neutral-400'}`}>
                {moltiplicatoreCarbo}g CHO/Kg
              </span>
            </div>
            
            <div className="space-y-3">
              {generaTimelineDieta().map((blocco, idx) => {
                if (blocco.isIntra) {
                  return (
                    <div key={`intra-${idx}`} className="p-3 rounded-lg border bg-orange-950/20 border-orange-900/50">
                      <span className="text-[10px] uppercase font-bold text-orange-500 mb-1 block">{blocco.titolo}</span>
                      <p className="font-semibold text-sm text-white">{blocco.descrizione}</p>
                    </div>
                  );
                }

                // E' un pasto del DB
                const cat = blocco.idCategoria as keyof typeof dbAlimenti;
                const isPW = cat === 'PostWorkout';
                const itemScelto = dbAlimenti[cat][pastiSelezionati[cat]];
                const carboCalcolati = itemScelto.baseCarbo * moltiplicatoreCarbo;

                return (
                  <div key={`${cat}-${idx}`} className={`p-3 rounded-lg border ${isPW ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-neutral-950 border-neutral-800'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isPW ? 'text-emerald-500' : 'text-blue-400'}`}>{blocco.titoloUI}</span>
                      <button onClick={() => apriSwapAlimento(cat)} className="text-[10px] bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded font-bold uppercase text-neutral-300">Swap</button>
                    </div>
                    <p className="font-semibold text-[13px] text-white leading-tight">{itemScelto.nome}</p>
                    <p className="text-[11px] text-neutral-400 font-mono mt-1">CHO: <span className="text-orange-400 font-bold">{carboCalcolati}g</span> | PRO: {itemScelto.pro} | FAT: {itemScelto.fat}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ========================================= */}
        {/* COLONNA 2: ALLENAMENTO E CALENDARIO       */}
        {/* ========================================= */}
        <section className="lg:col-span-5 bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-3">
            <h2 className="text-lg font-bold text-white">Allenamento 3 Split</h2>
            <div className="flex space-x-1">
              <button onClick={() => setVistaStorico(!vistaStorico)} className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-md ${vistaStorico ? 'bg-orange-600 text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'} mr-4 border border-neutral-700`}>
                {vistaStorico ? 'Torna al Workout' : 'Calendario'}
              </button>
              {!vistaStorico && ['Lunedì', 'Mercoledì', 'Venerdì'].map((gg) => (
                <button key={gg} onClick={() => setGiornoAttivo(gg)} className={`px-3 py-1.5 text-xs font-bold rounded-md ${giornoAttivo === gg ? 'bg-orange-600 text-white' : 'bg-neutral-950 text-neutral-500 hover:text-white border border-neutral-800'}`}>{gg}</button>
              ))}
            </div>
          </div>

          {!vistaStorico ? (
            <>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-bold text-orange-500 uppercase tracking-wider">
                  {/* @ts-ignore */}
                  Focus: {dbAllenamento[giornoAttivo].focus}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-4" style={{ maxHeight: "65vh" }}>
                {/* @ts-ignore */}
                {dbAllenamento[giornoAttivo].esercizi.map((es) => {
                  const nomeVis = eserciziModificati[es.id] || es.nome;
                  const ultimoCarico = getUltimoCarico(es.id);
                  
                  return (
                    <div key={es.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 relative group">
                      <div className={`absolute top-0 left-0 w-1 h-full ${es.fase.includes('Fase 1') ? 'bg-orange-500' : es.fase.includes('Fase 2') ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                      <div className="pl-2">
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] uppercase font-black tracking-widest ${es.fase.includes('Fase 1') ? 'text-orange-500' : es.fase.includes('Fase 2') ? 'text-blue-500' : 'text-red-500'}`}>{es.fase}</span>
                          <button onClick={() => apriSwapEsercizio(es)} className="text-[10px] bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded font-bold uppercase text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">Swap</button>
                        </div>
                        <h3 className="font-bold text-base text-white mt-1">{nomeVis}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-[11px] font-bold text-neutral-300 bg-neutral-900 px-2 py-1 rounded border border-neutral-700">{es.rep}</p>
                          <p className="text-[11px] text-neutral-400 italic flex-1">{es.dettaglio}</p>
                        </div>
                        
                        {/* INPUT TRACKING */}
                        <div className="mt-4 pt-3 border-t border-neutral-800 flex gap-4">
                          <div className="w-1/2">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 block mb-1">Target (Ultima Sess.)</label>
                            <div className="bg-neutral-900 border border-neutral-800 p-2 rounded text-sm text-neutral-400 font-mono">{ultimoCarico} kg</div>
                          </div>
                          <div className="w-1/2">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-orange-500 block mb-1">Kg Effettivi</label>
                            <input 
                              type="number" 
                              value={carichiAttuali[es.id] || ''}
                              onChange={(e) => setCarichiAttuali({...carichiAttuali, [es.id]: e.target.value})}
                              className="w-full bg-neutral-900 border border-orange-500/50 p-2 rounded text-sm text-white font-bold outline-none focus:border-orange-500" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-700">
                <button onClick={salvaSessione} className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest text-sm rounded-lg active:scale-95 transition-all">
                  Concludi e Salva Sessione
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {storicoSessioni.length === 0 ? (
                <div className="text-center p-10 text-neutral-500 border border-dashed border-neutral-800 rounded-xl">
                  Nessuna sessione. Completa un allenamento per tracciare i volumi.
                </div>
              ) : (
                [...storicoSessioni].map((sess) => (
                  <div key={sess.oraId} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <div className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-2">
                      <div>
                        <span className="font-bold text-orange-500 block">{sess.giorno}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">{sess.data}</span>
                      </div>
                      <button onClick={() => eliminaSessione(sess.oraId)} className="text-[10px] font-bold uppercase bg-red-950/40 text-red-500 px-3 py-1.5 rounded border border-red-900/50">
                        Elimina
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(sess.carichi).map(([idEs, peso]) => (
                        <div key={idEs} className="bg-neutral-900 p-2 rounded flex justify-between">
                          {/* @ts-ignore */}
                          <span className="text-neutral-400 truncate pr-2">{eserciziModificati[idEs] || Object.values(dbAllenamento).flatMap(d=>d.esercizi).find(e=>e.id===idEs)?.nome}</span>
                          <span className="font-bold text-white">{peso} kg</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        {/* ========================================= */}
        {/* COLONNA 3: TELEMETRIA 6 PARAMETRI         */}
        {/* ========================================= */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-4 border-b border-neutral-700 pb-2 text-white">Telemetria Fisica</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                  <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Peso (kg)</label>
                  <input type="number" value={biometria.peso} onChange={(e) => aggiornaBiometria('peso', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
                </div>
                <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                  <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Petto (cm)</label>
                  <input type="number" value={biometria.petto} onChange={(e) => aggiornaBiometria('petto', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
                </div>
                <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                  <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Spalle (cm)</label>
                  <input type="number" value={biometria.spalle} onChange={(e) => aggiornaBiometria('spalle', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
                </div>
                <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                  <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Braccia (cm)</label>
                  <input type="number" value={biometria.braccia} onChange={(e) => aggiornaBiometria('braccia', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
                </div>
                <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                  <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Gambe (cm)</label>
                  <input type="number" value={biometria.gambe} onChange={(e) => aggiornaBiometria('gambe', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
                </div>
                <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                  <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Glutei/Bacino (cm)</label>
                  <input type="number" value={biometria.glutei} onChange={(e) => aggiornaBiometria('glutei', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
                </div>
              </div>
              <button onClick={valutaCheckFisico} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg uppercase tracking-widest text-[10px] active:scale-95 transition-all">Analisi Totale</button>
            </div>
          </section>

          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg flex-1 flex flex-col min-h-[200px]">
            <h2 className="text-lg font-bold mb-4 border-b border-neutral-700 pb-2 text-white">Coach IA</h2>
            <div className="flex-1 bg-neutral-950 rounded-lg border border-neutral-800 flex flex-col overflow-hidden">
              <div className="flex-1 p-3 overflow-y-auto">
                <div className="p-3 text-[11px] leading-relaxed bg-neutral-800 text-neutral-200 border-l-2 border-orange-500 rounded-xl rounded-tl-none max-w-[95%]">
                  {feedbackIA}
                </div>
              </div>
            </div>
          </section>
        </div>
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
                <button key={i} onClick={() => confermaSwapEsercizio(alt.nome)} className="w-full text-left p-4 bg-neutral-950 border border-neutral-800 rounded-lg hover:border-orange-500/50 group">
                  <p className="font-bold text-sm text-white group-hover:text-orange-400">{alt.nome}</p>
                  <p className="text-[10px] text-neutral-500 mt-1 uppercase font-bold">{alt.note}</p>
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
                <button key={i} onClick={() => confermaSwapAlimento(i)} className="w-full text-left p-4 bg-neutral-950 border border-neutral-800 rounded-lg hover:border-emerald-500/50 group">
                  <p className="font-bold text-sm text-white group-hover:text-emerald-400">{alt.nome}</p>
                  <p className="text-[11px] text-neutral-500 mt-1 font-mono">CHO: {alt.baseCarbo * moltiplicatoreCarbo}g | PRO: {alt.pro} | FAT: {alt.fat}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}