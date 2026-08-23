"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";

// Configurazione Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqawxoocwtxfkahzyduq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chiave-temporanea-per-il-build";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 1. DATABASE ALLENAMENTO (Icone precise e Descrizioni didattiche)
// ==========================================
const baseDbAllenamento = {
  Spinta: {
    focus: "SPINTA (Petto, Spalle, Tricipiti)",
    esercizi: [
      { id: "e1", nome: "Panca piana bilanciere", anim: "chest_barbell", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "BILANCIERE: Disteso su panca piana. Scendi fino a sfiorare il petto e spingi verso l'alto esplodendo.", 
        alternative: [
          { nome: "Chest Press", anim: "chest_machine", note: "Macchinario guidato", dettaglio: "MACCHINARIO: Siediti in appoggio. Impugna le maniglie e spingi in avanti contraendo il petto. Ritorno lento." }, 
          { nome: "Panca piana manubri", anim: "chest_dumbbell", note: "Maggiore ROM", dettaglio: "MANUBRI: Disteso su panca piana, spingi verso l'alto chiudendo i manubri al centro per massimizzare la contrazione." }
        ] 
      },
      { id: "e3", nome: "Panca inclinata manubri", anim: "chest_dumbbell", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "MANUBRI: Panca inclinata 30-45°. Spingi i manubri verso l'alto per colpire i fasci alti (clavicolari).", 
        alternative: [
          { nome: "Inclinata bilanciere", anim: "chest_barbell", note: "Focus forza", dettaglio: "BILANCIERE: Panca inclinata. Scendi al livello della clavicola e spingi forte per il petto alto." }, 
          { nome: "Press Inclinata", anim: "chest_machine", note: "Tensione costante", dettaglio: "MACCHINARIO: Variante inclinata della pressa. Mantieni le spalle basse e spingi in avanti/alto." }
        ] 
      },
      { id: "e4", nome: "Chest press", anim: "chest_machine", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "MACCHINARIO: Macchina da seduto per isolare il pettorale. Controlla il movimento in ogni singolo centimetro.", 
        alternative: [
          { nome: "Pectoral Machine", anim: "chest_flye_machine", note: "Isolamento", dettaglio: "MACCHINARIO: Tieni i gomiti alti e chiudi le braccia stringendo il petto al centro. Ottimo per il pump." }, 
          { nome: "Croci cavi seduto", anim: "chest_flye_cable", note: "Picco di tensione", dettaglio: "CAVI: Posiziona una panca al centro. Chiudi le maniglie davanti al petto mantenendo tensione continua." }
        ] 
      },
      { id: "e5", nome: "Croci ai manubri", anim: "chest_flye_db", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "MANUBRI: Panca piana. Allarga le braccia flettendo leggermente i gomiti, stretchando il petto, e richiudi.", 
        alternative: [
          { nome: "Croci cavi piana", anim: "chest_flye_cable", note: "Tensione continua", dettaglio: "CAVI: Dai cavi bassi, steso su panca. Chiudi le braccia al centro strizzando i pettorali a fine movimento." }, 
          { nome: "Pec Deck (Fly)", anim: "chest_flye_machine", note: "Pump", dettaglio: "MACCHINARIO: Usa il pec deck a braccia quasi tese per isolare completamente il pettorale." }
        ] 
      },
      { id: "e18", nome: "Lento avanti manubri", anim: "shoulder_db", fase: "Fase 1: Forza Spalle", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "MANUBRI: Seduto a 90°. Parti con i manubri altezza orecchie e spingi dritto sopra la testa.", 
        alternative: [
          { nome: "Military Press", anim: "shoulder_barbell", note: "Carico massimo", dettaglio: "BILANCIERE: In piedi, spingi dal petto alto fin sopra la testa, incastrando il busto sotto il bilanciere." }, 
          { nome: "Shoulder Press", anim: "shoulder_machine", note: "Spinta guidata", dettaglio: "MACCHINARIO: Spinta verticale vincolata. Siediti e spingi i maniglioni in alto in sicurezza." }
        ] 
      },
      { id: "e20", nome: "Alzate laterali cavi", anim: "lateral_cable", fase: "Fase 3: Pump Spalle", rep: "3-4 serie, 10-12 rep | Rec: 45 sec", dettaglio: "CAVI: Dal cavo basso laterale, alza il braccio teso lateralmente per isolare il deltoide mediale.", 
        alternative: [
          { nome: "Alzate manubri", anim: "lateral_db", note: "Focus classico", dettaglio: "MANUBRI: In piedi, solleva lateralmente i manubri fino all'altezza delle spalle." }, 
          { nome: "Alzate macchina", anim: "lateral_machine", note: "No compensazioni", dettaglio: "MACCHINARIO: Isola i deltoidi bloccando le braccia. Nessuno slancio con la schiena." }
        ] 
      },
      { id: "e22", nome: "Panca stretta", anim: "chest_barbell", fase: "Fase 1: Forza Tricipiti", rep: "4-5 serie, 6-8 rep | Rec: 2 min", dettaglio: "BILANCIERE: Panca piana con presa larghezza spalle. Tieni i gomiti incollati al busto e spingi in alto.", 
        alternative: [
          { nome: "French Press", anim: "tricep_barbell", note: "Stretch", dettaglio: "BILANCIERE EZ: Disteso, porta il bilanciere verso la fronte flettendo i gomiti e distendi." }, 
          { nome: "Dips parallele", anim: "tricep_dips", note: "Catena chiusa", dettaglio: "CORPO LIBERO: Alle parallele, scendi piegando le braccia tenendo il busto dritto, spingi in alto." }
        ] 
      },
      { id: "e27", nome: "Push down corda", anim: "tricep_cable", fase: "Fase 3: Pump Tricipiti", rep: "3-4 serie, 12-15 rep | Rec: 45 sec", dettaglio: "CAVI: Cavo alto. Spingi la corda verso il basso e apri le estremità verso l'esterno alla fine.", 
        alternative: [
          { nome: "Push down sbarra", anim: "tricep_cable", note: "Carico maggiore", dettaglio: "CAVI: Sbarra dritta al cavo alto. Spingi il carico in basso bloccando i gomiti lungo i fianchi." }, 
          { nome: "Estensioni nuca", anim: "tricep_cable", note: "Capo lungo", dettaglio: "CAVI: Dai cavi bassi, tira la fune dietro la testa e distendi le braccia verso l'alto." }
        ] 
      }
    ]
  },
  Tirata: {
    focus: "TIRATA (Schiena, Bicipiti)",
    esercizi: [
      { id: "e6", nome: "Trazioni", anim: "back_pullup", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "CORPO LIBERO: Appeso alla sbarra, tira il tuo corpo verso l'alto cercando di abbassare i gomiti.", 
        alternative: [
          { nome: "Lat Machine", anim: "back_pulldown", note: "Guidato", dettaglio: "MACCHINARIO: Seduto, sbarra larga. Tira verso il petto inarcando leggermente la schiena." }, 
          { nome: "Lat Triangolo", anim: "back_pulldown", note: "Centro schiena", dettaglio: "MACCHINARIO: Seduto, usa il triangolo e tira verso lo sterno basso per colpire la schiena in spessore." }
        ] 
      },
      { id: "e7", nome: "Rematore bilanciere", anim: "back_row_barbell", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "BILANCIERE: In piedi busto flesso a 45°. Tira il bilanciere verso l'ombelico, schiena piatta.", 
        alternative: [
          { nome: "Rematore Manubrio", anim: "back_row_db", note: "Unilaterale", dettaglio: "MANUBRI: In appoggio su panca. Tira il manubrio portando il gomito in alto oltre il dorso." }, 
          { nome: "Rematore T-Bar", anim: "back_row_barbell", note: "Spessore", dettaglio: "MACCHINARIO: Cavalcando il T-Bar, tira il carico verso il petto strizzando le scapole." }
        ] 
      },
      { id: "e9", nome: "Pulley seduto", anim: "back_row_cable", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "CAVI: Seduto al pulley, tira la maniglia a triangolo verso l'addome basso.", 
        alternative: [
          { nome: "Chest Supported", anim: "back_row_machine", note: "No lombari", dettaglio: "MACCHINARIO: Seduto col petto in appoggio sul cuscino. Tira le maniglie lavorando puro dorso." }, 
          { nome: "Seal Row", anim: "back_row_barbell", note: "Isolamento estremo", dettaglio: "BILANCIERE: Disteso prono su una panca alta. Tira il bilanciere da terra senza usare alcuno slancio." }
        ] 
      },
      { id: "e10", nome: "Pullover ai cavi", anim: "back_pullover", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "CAVI: In piedi, cavo alto. Spingi la sbarra verso le cosce a braccia quasi tese per isolare il dorso.", 
        alternative: [
          { nome: "Pullover Macchina", anim: "back_pullover", note: "Tensione", dettaglio: "MACCHINARIO: Seduto, appoggia i gomiti ai cuscini e tira verso il basso facendo perno sulle spalle." }, 
          { nome: "Pullover Manubrio", anim: "back_pullover_db", note: "Stretch", dettaglio: "MANUBRI: Di traverso su panca con le sole spalle in appoggio. Abbassa il manubrio dietro la testa." }
        ] 
      },
      { id: "e23", nome: "Curl bilanciere EZ", anim: "bicep_barbell", fase: "Fase 1: Forza Bicipiti", rep: "4-5 serie, 6-8 rep | Rec: 2 min", dettaglio: "BILANCIERE EZ: In piedi. Solleva il bilanciere verso le spalle mantenendo i gomiti bloccati ai fianchi.", 
        alternative: [
          { nome: "Curl Manubri", anim: "bicep_db", note: "Isolamento", dettaglio: "MANUBRI: In piedi o seduto. Fletti alternando o insieme, ruotando il polso (supinazione) salendo." }, 
          { nome: "Curl Cavo Basso", anim: "bicep_cable", note: "Tensione continua", dettaglio: "CAVI: Con sbarra o fune dal cavo basso. Mantieni la tensione sia in salita che in discesa." }
        ] 
      },
      { id: "e26", nome: "Curl cavi corda", anim: "bicep_cable", fase: "Fase 3: Pump Bicipiti", rep: "3-4 serie, 12-15 rep | Rec: 45 sec", dettaglio: "CAVI: Fune dal cavo basso. Presa neutra (a martello) per colpire anche il muscolo brachiale.", 
        alternative: [
          { nome: "Curl Inclinata", anim: "bicep_db", note: "Stretch", dettaglio: "MANUBRI: Seduto su panca a 45°. Lascia cadere le braccia e fletti per il massimo allungamento." }, 
          { nome: "Spider Curl", anim: "bicep_barbell", note: "Picco bicipite", dettaglio: "BILANCIERE: Petto in appoggio su panca inclinata, braccia a penzoloni. Fletti in alto." }
        ] 
      }
    ]
  },
  Gambe: {
    focus: "GAMBE E POLPACCI",
    esercizi: [
      { id: "e11", nome: "Squat bilanciere", anim: "leg_squat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "BILANCIERE: Sulle spalle. Scendi sotto il parallelo spingendo le ginocchia in fuori, sali potente.", 
        alternative: [
          { nome: "Front Squat", anim: "leg_squat", note: "Quadricipite", dettaglio: "BILANCIERE: Appoggiato sulle clavicole anteriori. Busto dritto, isola in profondità i quadricipiti." }, 
          { nome: "Hack Squat Libero", anim: "leg_squat", note: "Carico posteriore", dettaglio: "BILANCIERE: Afferrato dietro le gambe. Solleva con stacco puro di quadricipiti." }
        ] 
      },
      { id: "e12", nome: "Hack squat", anim: "leg_machine_squat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "MACCHINARIO: Schiena e spalle in appoggio. Scendi a 90° e spingi forte isolando i quadricipiti.", 
        alternative: [
          { nome: "Leg Press 45°", anim: "leg_press", note: "Isolamento pressa", dettaglio: "MACCHINARIO: Piedi posizionati bassi e stretti sulla pedana." }, 
          { nome: "Belt Squat", anim: "leg_squat", note: "No stress schiena", dettaglio: "MACCHINARIO: Squat con cintura agganciata ai fianchi. Zero stress spinale." }
        ] 
      },
      { id: "e14", nome: "Pressa 45°", anim: "leg_press", fase: "Fase 2: Connessione", rep: "4-5 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "MACCHINARIO: Scendi portando le ginocchia vicine al petto, spingi in alto senza mai iper-estendere.", 
        alternative: [
          { nome: "Affondi Manubri", anim: "leg_lunge", note: "Equilibrio", dettaglio: "MANUBRI: Fai un passo in avanti e affonda piegando la gamba dietro verso terra." }, 
          { nome: "Bulgarian Squat", anim: "leg_lunge", note: "Unilaterale", dettaglio: "MANUBRI: Piede posteriore su una panca, esegui uno squat sulla singola gamba avanti." }
        ] 
      },
      { id: "e15", nome: "Leg extension", anim: "leg_extension", fase: "Fase 3: Pump Quad", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "MACCHINARIO: Seduto, cuscino sulle tibie. Distendi le gambe strizzando al massimo i quadricipiti.", 
        alternative: [
          { nome: "Sissy Squat", anim: "leg_extension", note: "Stretch estremo", dettaglio: "CORPO LIBERO: Blocca i polpacci e lasciati cadere all'indietro per stretchare i quadricipiti." }, 
          { nome: "Step-up", anim: "leg_lunge", note: "Gluteo/Quad", dettaglio: "MANUBRI: Sali su un rialzo spingendo solo con la gamba in appoggio. Scendi lentamente." }
        ] 
      },
      { id: "e13", nome: "Stacco rumeno", anim: "leg_deadlift", fase: "Fase 2: Conn. Femorali", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "BILANCIERE: Ginocchia sbloccate, scivola lungo le cosce mandando il sedere indietro. Sali contraendo i glutei.", 
        alternative: [
          { nome: "Stacco Gambe Tese", anim: "leg_deadlift", note: "Femorali", dettaglio: "BILANCIERE: Ginocchia dritte (ma non forzate). Allungamento drastico della catena posteriore." }, 
          { nome: "Good Morning", anim: "leg_deadlift", note: "Catena posteriore", dettaglio: "BILANCIERE: Sulle spalle. Fletti il busto in avanti come in un inchino controllato." }
        ] 
      },
      { id: "e16", nome: "Leg curl sdraiato", anim: "leg_curl", fase: "Fase 3: Pump Femorali", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "MACCHINARIO: Disteso prono, porta i talloni ai glutei in modo esplosivo e frena la discesa.", 
        alternative: [
          { nome: "Leg Curl Seduto", anim: "leg_curl", note: "Isolamento", dettaglio: "MACCHINARIO: Da seduto. Garantisce totale stabilità e isola i bicipiti femorali." }, 
          { nome: "Glute Ham Raise", anim: "leg_curl", note: "Catena chiusa", dettaglio: "MACCHINARIO GHR: Solleva l'intero busto usando solo la contrazione dei bicipiti femorali." }
        ] 
      },
      { id: "e17", nome: "Calf in piedi", anim: "leg_calf", fase: "Fase 3: Pump", rep: "3-4 serie, 20 rep | Rec: 45 sec", dettaglio: "MACCHINARIO/LIBERO: Punte su un gradino. Scendi stretchando il tendine, sali e tieni la punta 1 secondo.", 
        alternative: [
          { nome: "Calf Press", anim: "leg_calf", note: "Carico", dettaglio: "MACCHINARIO: Sulla Leg Press. Spingi la pedana usando solo la flessione della caviglia." }, 
          { nome: "Calf Seduto", anim: "leg_calf", note: "Soleo", dettaglio: "MACCHINARIO: Seduto, pesi sulle ginocchia. Solleva i talloni: colpisce in profondità il muscolo soleo." }
        ] 
      }
    ]
  }
};

// ==========================================
// RENDERER SVG ANIMATO NATIF (Bug fixing totale)
// Utilizza i tag nativi <animate> di SVG per garantire il frame-swap asincrono senza CSS clash
// ==========================================
const SvgVisualizer = ({ icon, color }: { icon: string, color: string }) => {
  const line = { stroke: color, strokeWidth: "2.5", fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const head = { stroke: color, strokeWidth: "2.5", fill: "none" };
  const machine = { stroke: "#555", strokeWidth: "3", strokeLinecap: "round" as const, fill: "none" };
  const bench = { stroke: "#444", strokeWidth: "4", strokeLinecap: "round" as const };
  const weight = { fill: "#e5e5e5", rx: "1" };
  const cable = { stroke: "#888", strokeWidth: "1.5", strokeDasharray: "2 2" };
  const gear = { stroke: "#e5e5e5", strokeWidth: "2", strokeLinecap: "round" as const, fill: "none" };

  return (
    <div className="relative w-16 h-16 bg-neutral-950/80 rounded-lg border border-neutral-800 flex items-center justify-center shadow-inner shrink-0 overflow-hidden">
      <svg viewBox="0 0 50 50" className="w-12 h-12">
        {/* SPINTA: PANCA BILANCIERE */}
        {icon === "chest_barbell" && (
          <>
            <line x1="10" y1="35" x2="40" y2="35" {...bench} />
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="28" r="4" {...head} /><path d="M 21 28 L 18 20 M 29 28 L 32 20" {...line} /><line x1="25" y1="32" x2="25" y2="35" {...line} />
              <line x1="15" y1="20" x2="35" y2="20" {...gear} /><rect x="12" y="15" width="3" height="10" {...weight} /><rect x="35" y="15" width="3" height="10" {...weight} />
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="28" r="4" {...head} /><path d="M 21 28 L 18 10 M 29 28 L 32 10" {...line} /><line x1="25" y1="32" x2="25" y2="35" {...line} />
              <line x1="15" y1="10" x2="35" y2="10" {...gear} /><rect x="12" y="5" width="3" height="10" {...weight} /><rect x="35" y="5" width="3" height="10" {...weight} />
            </g>
          </>
        )}

        {/* SPINTA: MANUBRI / CROCI */}
        {(icon === "chest_dumbbell" || icon === "chest_flye_db") && (
          <>
            <line x1="10" y1="35" x2="40" y2="35" {...bench} />
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="28" r="4" {...head} />
              <path d={icon === "chest_dumbbell" ? "M 21 28 L 15 20 M 29 28 L 35 20" : "M 21 28 L 10 20 M 29 28 L 40 20"} {...line} />
              {icon === "chest_dumbbell" ? ( <><circle cx="15" cy="20" r="3" {...weight}/><circle cx="35" cy="20" r="3" {...weight}/></> ) : ( <><rect x="6" y="16" width="6" height="8" {...weight} rx="2" /><rect x="38" y="16" width="6" height="8" {...weight} rx="2" /></> )}
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="28" r="4" {...head} /><path d="M 21 28 L 22 10 M 29 28 L 28 10" {...line} />
              {icon === "chest_dumbbell" ? ( <><circle cx="22" cy="10" r="3" {...weight}/><circle cx="28" cy="10" r="3" {...weight}/></> ) : ( <><rect x="18" y="6" width="6" height="8" {...weight} rx="2" /><rect x="26" y="6" width="6" height="8" {...weight} rx="2" /></> )}
            </g>
          </>
        )}

        {/* SPINTA: MACCHINE */}
        {(icon === "chest_machine" || icon === "chest_flye_machine") && (
          <>
            <line x1="25" y1="10" x2="25" y2="40" {...machine} /><line x1="15" y1="40" x2="35" y2="40" {...machine} />
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="25" r="4" {...head} />
              {icon === "chest_machine" ? <path d="M 21 25 L 12 25 M 29 25 L 38 25" {...line} /> : <path d="M 21 25 C 10 25 10 15 20 15 M 29 25 C 40 25 40 15 30 15" {...line} />}
              <rect x={icon === "chest_machine" ? "10" : "18"} y={icon === "chest_machine" ? "20" : "13"} width="4" height="10" {...weight} />
              <rect x={icon === "chest_machine" ? "36" : "28"} y={icon === "chest_machine" ? "20" : "13"} width="4" height="10" {...weight} />
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="25" r="4" {...head} />
              <path d="M 21 25 L 21 15 M 29 25 L 29 15" {...line} />
              <rect x="19" y="10" width="4" height="10" {...weight} /><rect x="27" y="10" width="4" height="10" {...weight} />
            </g>
          </>
        )}

        {/* CAVI GENERICI (Croci / Spalle / Tricipiti) */}
        {(icon === "chest_flye_cable" || icon === "lateral_cable" || icon === "tricep_cable") && (
          <>
            <line x1={icon === "tricep_cable" ? "25" : "5"} y1="10" x2={icon === "tricep_cable" ? "25" : "5"} y2="40" {...machine} />
            {icon !== "tricep_cable" && <line x1="45" y1="10" x2="45" y2="40" {...machine} />}
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy={icon === "lateral_cable" ? "15" : "25"} r="4" {...head} />
              <path d={icon === "chest_flye_cable" ? "M 21 25 L 5 20 M 29 25 L 45 20" : icon === "tricep_cable" ? "M 21 25 L 25 10 M 29 25 L 25 10" : "M 21 15 L 21 35 M 29 15 L 29 35"} {...cable} />
              <path d={icon === "chest_flye_cable" ? "M 21 25 L 10 20 M 29 25 L 40 20" : icon === "tricep_cable" ? "M 25 25 L 20 20 M 25 25 L 30 20" : "M 25 19 L 25 45 M 25 45 L 20 45 M 25 45 L 30 45 M 21 15 L 15 35 M 29 15 L 35 35"} {...line} />
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy={icon === "lateral_cable" ? "15" : "25"} r="4" {...head} />
              <path d={icon === "chest_flye_cable" ? "M 21 25 L 21 10 M 29 25 L 29 10" : icon === "tricep_cable" ? "M 21 25 L 21 40 M 29 25 L 29 40" : "M 21 15 L 5 20 M 29 15 L 45 20"} {...cable} />
              <path d={icon === "chest_flye_cable" ? "M 21 25 L 21 15 M 29 25 L 29 15" : icon === "tricep_cable" ? "M 25 25 L 20 40 M 25 25 L 30 40" : "M 25 19 L 25 45 M 25 45 L 20 45 M 25 45 L 30 45 M 21 15 L 10 20 M 29 15 L 40 20"} {...line} />
            </g>
          </>
        )}

        {/* SPALLE: BILANCIERE & MANUBRI */}
        {(icon === "shoulder_barbell" || icon === "shoulder_db" || icon === "lateral_db") && (
          <>
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy={icon === "shoulder_db" ? "20" : "15"} r="4" {...head} />
              <path d={icon === "lateral_db" ? "M 25 19 L 25 45 M 25 45 L 20 45 M 25 45 L 30 45 M 25 19 L 18 35 M 25 19 L 32 35" : `M 21 ${icon==="shoulder_db" ? "24 L 15 15" : "19 L 15 15"} M 29 ${icon==="shoulder_db" ? "24 L 35 15" : "19 L 35 15"}`} {...line} />
              {icon === "shoulder_barbell" && <line x1="5" y1="15" x2="45" y2="15" {...gear} />}
              <circle cx={icon === "lateral_db" ? "18" : "10"} cy={icon === "lateral_db" ? "35" : "15"} r="3" {...weight} />
              <circle cx={icon === "lateral_db" ? "32" : "40"} cy={icon === "lateral_db" ? "35" : "15"} r="3" {...weight} />
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy={icon === "shoulder_db" ? "20" : "15"} r="4" {...head} />
              <path d={icon === "lateral_db" ? "M 25 19 L 25 45 M 25 45 L 20 45 M 25 45 L 30 45 M 25 19 L 8 19 M 25 19 L 42 19" : `M 21 ${icon==="shoulder_db" ? "24 L 15 5" : "19 L 15 5"} M 29 ${icon==="shoulder_db" ? "24 L 35 5" : "19 L 35 5"}`} {...line} />
              {icon === "shoulder_barbell" && <line x1="5" y1="5" x2="45" y2="5" {...gear} />}
              <circle cx={icon === "lateral_db" ? "8" : "10"} cy={icon === "lateral_db" ? "19" : "5"} r="3" {...weight} />
              <circle cx={icon === "lateral_db" ? "42" : "40"} cy={icon === "lateral_db" ? "19" : "5"} r="3" {...weight} />
            </g>
          </>
        )}

        {/* TIRATA: PULLUP / LAT */}
        {(icon === "back_pullup" || icon === "back_pulldown") && (
          <>
            <line x1="5" y1="5" x2="45" y2="5" {...bench} strokeWidth="3" />
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="22" r="4" {...head} /><path d="M 25 26 L 25 40 M 20 45 L 25 40 L 30 45" {...line} /><path d="M 25 26 L 15 5 M 25 26 L 35 5" {...line} />
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="10" r="4" {...head} /><path d="M 25 14 L 25 30 M 20 35 L 25 30 L 30 35" {...line} /><path d="M 25 14 L 15 15 L 15 5 M 25 14 L 35 15 L 35 5" {...line} />
            </g>
          </>
        )}

        {/* TIRATA: REMATORI */}
        {(icon === "back_row_barbell" || icon === "back_row_db") && (
          <>
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="35" cy="15" r="4" {...head} /><path d="M 33 18 L 20 30 L 20 48 M 20 30 L 25 48" {...line} /><path d="M 32 20 L 25 25 L 18 20" {...line} />
              <line x1="12" y1="20" x2="24" y2="20" {...gear} /><circle cx="12" cy="20" r="5" {...weight} fill="none" stroke="#e5e5e5" />
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="35" cy="15" r="4" {...head} /><path d="M 33 18 L 20 30 L 20 48 M 20 30 L 25 48" {...line} /><path d="M 32 20 L 40 18 L 30 25" {...line} />
              <line x1="24" y1="25" x2="36" y2="25" {...gear} /><circle cx="24" cy="25" r="5" {...weight} fill="none" stroke="#e5e5e5" />
            </g>
          </>
        )}

        {/* TIRATA: PULLEY */}
        {icon === "back_row_cable" && (
          <>
            <line x1="10" y1="40" x2="30" y2="40" {...bench} /><line x1="40" y1="30" x2="40" y2="45" {...machine} /><circle cx="38" cy="40" r="2" fill="#555" />
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="20" cy="20" r="4" {...head} /><path d="M 20 24 L 20 38 M 20 38 L 35 38" {...line} /><path d="M 20 24 L 35 35" {...line} /><line x1="38" y1="40" x2="35" y2="35" {...cable} />
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="18" cy="20" r="4" {...head} /><path d="M 18 24 L 20 38 M 20 38 L 35 38" {...line} /><path d="M 18 24 L 14 30 L 28 35" {...line} /><line x1="38" y1="40" x2="28" y2="35" {...cable} />
            </g>
          </>
        )}

        {/* BICIPITI */}
        {(icon === "bicep_barbell" || icon === "bicep_db" || icon === "bicep_cable") && (
          <>
            {icon === "bicep_cable" && <line x1="10" y1="5" x2="10" y2="45" {...machine} />}
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx={icon === "bicep_cable" ? "35" : "25"} cy="10" r="4" {...head} />
              <path d={`M ${icon==="bicep_cable"?"35":"25"} 14 L ${icon==="bicep_cable"?"35":"25"} 35 M ${icon==="bicep_cable"?"30":"20"} 45 L ${icon==="bicep_cable"?"35":"25"} 35 L ${icon==="bicep_cable"?"40":"30"} 45`} {...line} />
              <path d={`M ${icon==="bicep_cable"?"35":"25"} 16 L ${icon==="bicep_cable"?"35":"20"} 30 L ${icon==="bicep_cable"?"25":"30"} 35`} {...line} />
              {icon === "bicep_barbell" ? ( <><line x1="15" y1="35" x2="45" y2="35" {...gear} /><rect x="15" y="30" width="3" height="10" {...weight}/><rect x="42" y="30" width="3" height="10" {...weight}/></> ) : ( <circle cx={icon==="bicep_cable"?"25":"30"} cy="35" r="3" {...weight} /> )}
              {icon === "bicep_cable" && <line x1="10" y1="45" x2="25" y2="35" {...cable} />}
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx={icon === "bicep_cable" ? "35" : "25"} cy="10" r="4" {...head} />
              <path d={`M ${icon==="bicep_cable"?"35":"25"} 14 L ${icon==="bicep_cable"?"35":"25"} 35 M ${icon==="bicep_cable"?"30":"20"} 45 L ${icon==="bicep_cable"?"35":"25"} 35 L ${icon==="bicep_cable"?"40":"30"} 45`} {...line} />
              <path d={`M ${icon==="bicep_cable"?"35":"25"} 16 L ${icon==="bicep_cable"?"35":"20"} 30 L ${icon==="bicep_cable"?"25":"30"} 20`} {...line} />
              {icon === "bicep_barbell" ? ( <><line x1="15" y1="20" x2="45" y2="20" {...gear} /><rect x="15" y="15" width="3" height="10" {...weight}/><rect x="42" y="15" width="3" height="10" {...weight}/></> ) : ( <circle cx={icon==="bicep_cable"?"25":"30"} cy="20" r="3" {...weight} /> )}
              {icon === "bicep_cable" && <line x1="10" y1="45" x2="25" y2="20" {...cable} />}
            </g>
          </>
        )}

        {/* GAMBE: SQUAT */}
        {(icon === "leg_squat" || icon === "leg_deadlift" || icon === "leg_calf") && (
          <>
            {icon === "leg_calf" && <rect x="20" y="45" width="10" height="5" fill="#555" />}
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="10" r="4" {...head} />
              <path d={icon === "leg_deadlift" ? "M 25 14 L 25 30 L 25 48 M 25 30 L 28 48 M 25 16 L 25 32" : "M 25 14 L 25 30 L 25 48 M 25 30 L 28 48 M 25 16 L 29 20 L 25 14"} {...line} />
              {icon !== "leg_calf" && ( <><line x1="15" y1={icon==="leg_deadlift"?"32":"14"} x2="35" y2={icon==="leg_deadlift"?"32":"14"} {...gear} /><circle cx="25" cy={icon==="leg_deadlift"?"32":"14"} r="6" {...weight} fill="none" stroke="#e5e5e5"/></> )}
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx={icon === "leg_deadlift" ? "35" : "32"} cy={icon === "leg_calf" ? "6" : "24"} r="4" {...head} />
              <path d={icon === "leg_deadlift" ? "M 35 28 L 20 30 L 20 48 M 20 30 L 25 48 M 32 29 L 32 40" : icon === "leg_calf" ? "M 25 10 L 25 26 L 27 40 L 22 45" : "M 32 28 L 20 38 L 26 48 M 20 38 L 16 48 M 32 29 L 36 33 L 32 27"} {...line} />
              {icon !== "leg_calf" && ( <><line x1={icon==="leg_deadlift"?"22":"25"} y1={icon==="leg_deadlift"?"40":"27"} x2={icon==="leg_deadlift"?"42":"39"} y2={icon==="leg_deadlift"?"40":"27"} {...gear} /><circle cx="32" cy={icon==="leg_deadlift"?"40":"27"} r="6" {...weight} fill="none" stroke="#e5e5e5"/></> )}
            </g>
          </>
        )}

        {/* GAMBE: PRESSA / MACCHINE */}
        {(icon === "leg_press" || icon === "leg_machine_squat" || icon === "leg_extension" || icon === "leg_curl") && (
          <>
            {icon === "leg_press" && <><path d="M 10 30 L 20 45 L 35 45" {...bench} fill="none" /><line x1="25" y1="10" x2="45" y2="30" {...machine} strokeWidth="2" /></>}
            {icon === "leg_machine_squat" && <line x1="10" y1="45" x2="40" y2="5" {...machine} strokeWidth="4" />}
            {icon === "leg_extension" && <path d="M 15 20 L 15 35 L 25 35 L 25 45" {...bench} fill="none" />}
            {icon === "leg_curl" && <><line x1="10" y1="35" x2="40" y2="35" {...bench} /><path d="M 40 35 L 45 45" {...machine} /></>}
            
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx={icon === "leg_machine_squat" ? "32" : icon === "leg_extension" ? "10" : "15"} cy={icon === "leg_machine_squat" ? "10" : icon === "leg_extension" ? "15" : icon === "leg_curl" ? "32" : "25"} r="4" {...head} />
              {icon === "leg_press" && <><path d="M 15 28 L 20 45 M 20 45 L 22 30 L 30 20" {...line} /><line x1="28" y1="15" x2="35" y2="22" {...gear} strokeWidth="3" /></>}
              {icon === "leg_machine_squat" && <path d="M 30 14 L 23 23 L 23 45 M 23 23 L 28 45" {...line} />}
              {icon === "leg_extension" && <><path d="M 12 18 L 12 33 L 25 33 L 25 45" {...line} /><circle cx="27" cy="45" r="3" {...weight} /></>}
              {icon === "leg_curl" && <><path d="M 18 34 L 30 34 L 40 34 L 48 34" {...line} /><circle cx="48" cy="32" r="3" {...weight} /></>}
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx={icon === "leg_machine_squat" ? "23" : icon === "leg_extension" ? "10" : "15"} cy={icon === "leg_machine_squat" ? "22" : icon === "leg_extension" ? "15" : icon === "leg_curl" ? "32" : "25"} r="4" {...head} />
              {icon === "leg_press" && <><path d="M 15 28 L 20 45 M 20 45 L 32 30 L 42 10" {...line} /><line x1="39" y1="5" x2="46" y2="12" {...gear} strokeWidth="3" /></>}
              {icon === "leg_machine_squat" && <path d="M 21 26 L 14 35 L 23 35 L 23 45 M 14 35 L 28 45" {...line} />}
              {icon === "leg_extension" && <><path d="M 12 18 L 12 33 L 25 33 L 40 33" {...line} /><circle cx="40" cy="31" r="3" {...weight} /><path d="M 25 33 L 40 31" {...machine} strokeWidth="1" /></>}
              {icon === "leg_curl" && <><path d="M 18 34 L 30 34 L 40 34 L 38 18" {...line} /><circle cx="36" cy="18" r="3" {...weight} /><path d="M 40 34 L 36 18" {...machine} strokeWidth="1" /></>}
            </g>
          </>
        )}

        {/* AFFONDI */}
        {icon === "leg_lunge" && (
          <>
            <g><animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="10" r="4" {...head} /><path d="M 25 14 L 25 30 L 35 45 M 25 30 L 15 45" {...line} /><path d="M 25 16 L 25 25" {...line} /><rect x="22" y="25" width="6" height="4" {...weight} />
            </g>
            <g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.6s" calcMode="discrete" repeatCount="indefinite" />
              <circle cx="25" cy="15" r="4" {...head} /><path d="M 25 19 L 25 35 L 35 35 L 35 45 M 25 35 L 15 45" {...line} /><path d="M 25 21 L 25 30" {...line} /><rect x="22" y="30" width="6" height="4" {...weight} />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// RUOTA BIA LAICA & GRAFICI
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

  const radius = 130;
  const strokeW = 60;
  
  // Coordinate precise per testi per raggio 130 (Centro 200,200)
  const getLabelPos = (angleDeg: number) => {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: 200 + radius * Math.cos(rad), y: 200 + radius * Math.sin(rad) };
  };

  const sections = [
    { label: 'BMI', val: bmi, color: '#ec4899', angle: 300 },           // Top Left/Mid
    { label: 'BMR Kcal', val: bmr > 0 ? bmr : '-', color: '#f97316', angle: 0 },    // Top Right
    { label: 'MASSA MUSC. %', val: mm > 0 ? `${mm}%` : '-', color: '#ef4444', angle: 60 },  // Bottom Right
    { label: 'ACQUA CORP. %', val: bw > 0 ? `${bw}%` : '-', color: '#3b82f6', angle: 120 }, // Bottom Left
    { label: 'MASSA GRASSA %', val: bf > 0 ? `${bf}%` : '-', color: '#22c55e', angle: 180 }, // Mid Left
    { label: 'PESO kg', val: w > 0 ? w : '-', color: '#737373', angle: 240 }        // Top Left
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto h-[350px] bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-center mt-2 overflow-hidden shadow-inner">
       <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
       <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl z-10 p-2">
          
          <g transform="translate(200, 200) rotate(-120)">
             {sections.map((sec, i) => (
                <circle key={i} cx="0" cy="0" r={radius} fill="none" stroke={sec.color} strokeWidth={strokeW} strokeDasharray={`${(2*Math.PI*radius)/6 - 2} ${2*Math.PI*radius}`} strokeDashoffset={-(i * (2*Math.PI*radius)/6)} className="opacity-90 hover:opacity-100 transition-opacity" />
             ))}
          </g>

          {sections.map((sec, i) => {
             const pos = getLabelPos(sec.angle);
             return (
               <g key={`t-${i}`} className="pointer-events-none">
                 <text x={pos.x} y={pos.y - 4} fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">{sec.label}</text>
                 <text x={pos.x} y={pos.y + 12} fill="#fff" fontSize="16" textAnchor="middle" fontWeight="900">{sec.val}</text>
               </g>
             )
          })}

          {/* Sagoma Centrale Termica Realistica */}
          <g transform="translate(200, 200) scale(0.95) translate(-200, -200)">
             <path d="M200,100 C190,100 188,110 188,115 C188,122 192,125 197,128 C185,133 175,145 172,160 C167,175 162,210 162,210 L170,215 C170,215 180,175 185,165 C185,200 183,230 183,230 L188,320 L195,320 L195,230 L205,230 L205,320 L212,320 L217,230 C217,230 215,200 215,165 C220,175 230,215 230,215 L238,210 C238,210 233,175 228,160 C225,145 215,133 203,128 C208,125 212,122 212,115 C212,110 210,100 200,100 Z" fill="url(#gradThermal)" stroke="#000" strokeWidth="2"/>
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
      const contesto = `Sei un Coach IA. Analizza questo atleta: Nome: ${datiWizard.nome}, Età: ${datiWizard.eta}, Altezza: ${datiWizard.altezza}cm, Peso: ${datiWizard.peso}kg. Lifestyle: ${datiWizard.stileVita}. Obiettivo: ${datiWizard.obiettivo}. Se c'è una foto, stima la body fat. Fornisci un verdetto.`;
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
      let trendCarichi = storicoSessioni.length >= 2 ? "Stallo" : "Neutro"; 
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apriSwapEsercizio = (es: any) => { setEsercizioDaCambiare({ id: es.id, nomeAttuale: eserciziModificati[es.id] || es.nome, alternative: es.alternative }); setModalEsercizio(true); };
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
                     <p className="text-[10px] text-neutral-500 mb-2">📸 Foto Obiettivo Fisico (Opzionale). L&apos;IA stimera la BIA.</p>
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

  // ==========================================
  // RENDER PROTOCOLLO OPERATIVO
  // ==========================================
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
                         <input type="number" value={biometria[m.id as keyof typeof biometria]} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-white outline-none focus:text-orange-500 mt-1" placeholder="-" />
                       </div>
                   ))}
                 </div>
                 
                 <p className="text-[10px] text-blue-400 font-bold uppercase border-b border-neutral-800 pb-1 mt-2">Dati Composizione BIA (Opzionali)</p>
                 <div className="grid grid-cols-2 gap-2">
                   {misureBIA.map((m) => (
                       <div key={m.id} className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                         <label className="text-[9px] text-neutral-400 uppercase font-bold flex justify-between">{m.label} <span className="text-neutral-600">{m.unit}</span></label>
                         <input type="number" value={biometria[m.id as keyof typeof biometria]} onChange={(e) => setBiometria({...biometria, [m.id]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-blue-400 outline-none focus:text-white mt-1" placeholder="-" />
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
                    storicoMisure.map(mis => {
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
                    
                    // ICONA NATIVA (Garantita e Infallibile, perché legata alla key dell'elemento)
                    const animType = currentEx.anim || "chest_barbell"; 
                    
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
                            <SvgVisualizer icon={animType} color={phaseColor} />
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
