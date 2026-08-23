"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";

// Configurazione Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqawxoocwtxfkahzyduq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chiave-temporanea-per-il-build";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 1. DATABASE ALLENAMENTO (Completo con Alternative)
// ==========================================
const baseDbAllenamento = {
  Spinta: {
    focus: "SPINTA (Petto, Spalle, Tricipiti)",
    esercizi: [
      { id: "e1", nome: "Panca piana bilanciere", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "Scapole strette, petto in fuori. Scendi a sfiorare e spingi.", alternative: [{ nome: "Chest Press Convergente", note: "Stesso asse di spinta, focus contrazione" }, { nome: "Panca piana manubri", note: "Maggiore ROM e stretch profondo" }] },
      { id: "e3", nome: "Panca inclinata manubri", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "Colpisci la parte alta per lo spessore.", alternative: [{ nome: "Panca inclinata bilanciere", note: "Focus forza bruta fasci clavicolari" }, { nome: "Chest Press Inclinata", note: "Tensione costante e sicurezza" }] },
      { id: "e4", nome: "Chest press / Multipower", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "Esercizio guidato: senti il petto in ogni centimetro.", alternative: [{ nome: "Pectoral Machine", note: "Puro isolamento sternale" }, { nome: "Croci ai cavi seduto panca", note: "Isolamento con picco di tensione" }] },
      { id: "e5", nome: "Croci ai manubri", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "Allunga al massimo, poi chiudi strizzando. Gonfia di sangue.", alternative: [{ nome: "Croci panca piana ai cavi", note: "Nessun punto morto nella tensione" }, { nome: "Pec Deck (Fly Machine)", note: "Massimo pump controllato" }] },
      { id: "e18", nome: "Lento avanti manubri", fase: "Fase 1: Forza Spalle", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "Spinta sopra la testa. Parto orecchie, spingo su.", alternative: [{ nome: "Military Press bilanciere", note: "Sovraccarico massimo globale" }, { nome: "Shoulder Press Macchina", note: "Isolamento e spinta guidata" }] },
      { id: "e20", nome: "Alzate laterali ai cavi", fase: "Fase 3: Pump Spalle", rep: "3-4 serie, 10-12 rep | Rec: 45 sec", dettaglio: "Tensione costante sul deltoide laterale.", alternative: [{ nome: "Alzate laterali manubri", note: "Classico focus deltoide mediale" }, { nome: "Alzate laterali macchina", note: "Elimina slanci e compensazioni" }] },
      { id: "e22", nome: "Panca stretta bilanciere", fase: "Fase 1: Forza Tricipiti", rep: "4-5 serie, 6-8 rep | Rec: 2 min", dettaglio: "Gomiti vicini al corpo. Il muscolo che fa il braccio grosso.", alternative: [{ nome: "French Press bilanciere EZ", note: "Stretch massimo capo lungo" }, { nome: "Dips parallele (strette)", note: "Spinta a catena cinetica chiusa" }] },
      { id: "e27", nome: "Push down cavi corda", fase: "Fase 3: Pump Tricipiti", rep: "3-4 serie, 12-15 rep | Rec: 45 sec", dettaglio: "Spingo giù aprendo la corda alla fine e strizzando.", alternative: [{ nome: "Push down sbarra dritta", note: "Carico maggiore, meno flessibilità polso" }, { nome: "Estensioni dietro nuca cavo basso", note: "Forte enfasi sul capo lungo" }] }
    ]
  },
  Tirata: {
    focus: "TIRATA (Schiena, Bicipiti)",
    esercizi: [
      { id: "e6", nome: "Trazioni", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "Braccia distese, tiro portando i gomiti in basso.", alternative: [{ nome: "Lat Machine Presa Prona Larga", note: "Ottima per modulare i carichi sub-massimali" }, { nome: "Lat Machine Triangolo", note: "Focus maggiore sul gran dorsale centrale" }] },
      { id: "e7", nome: "Rematore bilanciere", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "Busto inclinato, schiena dritta, tira all'ombelico.", alternative: [{ nome: "Rematore Manubrio Singolo", note: "Lavoro unilaterale e asimmetrie" }, { nome: "Rematore T-Bar", note: "Stabilità core, tirata esplosiva" }] },
      { id: "e9", nome: "Row machine / Pulley", fase: "Fase 2: Connessione", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "Tiro portando i gomiti dietro. Senti la schiena chiudersi.", alternative: [{ nome: "Rematore Macchina Seduto (Chest Supported)", note: "Zero carico lombare" }, { nome: "Seal Row panca", note: "Puro isolamento dorso" }] },
      { id: "e10", nome: "Pullover ai cavi", fase: "Fase 3: Pump", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "Allungo in alto al massimo, poi spingo giù. Tanto sangue.", alternative: [{ nome: "Lat Machine Braccia Tese", note: "Ottimo arco di movimento e tensione" }, { nome: "Pullover Manubrio Panca", note: "Stretch estremo gabbia toracica" }] },
      { id: "e23", nome: "Curl bilanciere EZ", fase: "Fase 1: Forza Bicipiti", rep: "4-5 serie, 6-8 rep | Rec: 2 min", dettaglio: "Gomiti fermi al fianco, salgo contraendo, scendo controllato.", alternative: [{ nome: "Curl Manubri Alternato", note: "Lavoro unilaterale fisiologico" }, { nome: "Curl Cavo Basso (Sbarra)", note: "Tensione muscolare senza punti morti" }] },
      { id: "e26", nome: "Curl ai cavi con barra", fase: "Fase 3: Pump Bicipiti", rep: "3-4 serie, 12-15 rep | Rec: 45 sec", dettaglio: "Tensione costante dal cavo, salgo e strizzo.", alternative: [{ nome: "Curl Panca Inclinata Manubri", note: "Focus capo lungo con stretch" }, { nome: "Spider Curl panca 45°", note: "Isolamento picco e bicipite corto" }] }
    ]
  },
  Gambe: {
    focus: "GAMBE E POLPACCI",
    esercizi: [
      { id: "e11", nome: "Squat bilanciere", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "Sotto il parallelo, spingo dai talloni. Costruisce stazza.", alternative: [{ nome: "Front Squat", note: "Focus estremo quadricipite, schiena dritta" }, { nome: "Hack Squat Libero", note: "Maggiore sovraccarico senza stress lombare estremo" }] },
      { id: "e12", nome: "Hack squat", fase: "Fase 1: Forza", rep: "4-5 serie, 4-6 rep | Rec: 2 min", dettaglio: "Macchina guidata per caricare in sicurezza. Tutto sui quad.", alternative: [{ nome: "Leg Press 45° (Piedi bassi e stretti)", note: "Isolamento pressa quadricipite" }, { nome: "Belt Squat", note: "Carico diretto sulle anche, 0 colonna" }] },
      { id: "e14", nome: "Leg press 45°", fase: "Fase 2: Connessione", rep: "4-5 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "Scendo ginocchia al petto. Nessun blocco articolare.", alternative: [{ nome: "Affondi Camminati (Manubri)", note: "Core, equilibrio e femorali coinvolti" }, { nome: "Bulgarian Split Squat", note: "Lavoro unilaterale devastante" }] },
      { id: "e15", nome: "Leg extension", fase: "Fase 3: Pump Quad", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "Distendo e strizzo in alto un secondo, scendo controllato.", alternative: [{ nome: "Sissy Squat", note: "Esercizio bodyweight stretch estremo" }, { nome: "Step-up alto controllato", note: "Lavoro concentrico mirato" }] },
      { id: "e13", nome: "Stacco rumeno", fase: "Fase 2: Conn. Femorali", rep: "3-4 serie, 10-12 rep | Rec: 1.5 min", dettaglio: "Schiena dritta, spingo bacino indietro, risalgo contraendo glutei.", alternative: [{ nome: "Stacco a Gambe Tese", note: "Focus puro stretch ischiocrurali" }, { nome: "Good Morning Bilanciere", note: "Costruzione catena cinetica posteriore profonda" }] },
      { id: "e16", nome: "Leg curl sdraiato", fase: "Fase 3: Pump Femorali", rep: "3-4 serie, 15 rep | Rec: 45 sec", dettaglio: "Porto il tallone al gluteo strizzando, scendo lento.", alternative: [{ nome: "Leg Curl Seduto", note: "Maggiore isolamento fisiologico bicipite femorale" }, { nome: "Glute Ham Raise", note: "Esercizio a catena chiusa durissimo" }] },
      { id: "e17", nome: "Polpacci", fase: "Fase 3: Pump", rep: "3-4 serie, 20 rep | Rec: 45 sec", dettaglio: "Arco completo in punta, fermo in alto, scendo sotto allungando.", alternative: [{ nome: "Calf Press (sulla Leg Press)", note: "Ottimo sovraccarico in sicurezza" }, { nome: "Calf Seduto Macchina", note: "Sposta il focus sul muscolo Soleo" }] }
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

// Funzione intelligente che assegna l'SVG corretto anche quando si swappa un esercizio
const getAnimType = (id: string, nomeAttuale: string) => {
  const altMap: Record<string, string> = {
    "Chest Press Convergente": "machine_press",
    "Panca piana manubri": "bench_press_flat",
    "Panca inclinata bilanciere": "bench_press_incline_db",
    "Chest Press Inclinata": "machine_press",
    "Pectoral Machine": "flyes_flat_db",
    "Croci ai cavi seduto panca": "flyes_flat_db",
    "Croci panca piana ai cavi": "flyes_flat_db",
    "Pec Deck (Fly Machine)": "flyes_flat_db",
    "Military Press bilanciere": "shoulder_press_db",
    "Shoulder Press Macchina": "machine_press",
    "Alzate laterali manubri": "lateral_raises_cables",
    "Alzate laterali macchina": "lateral_raises_cables",
    "French Press bilanciere EZ": "bench_press_close",
    "Dips parallele (strette)": "tricep_pushdown",
    "Push down sbarra dritta": "tricep_pushdown",
    "Estensioni dietro nuca cavo basso": "tricep_pushdown",
    "Lat Machine Presa Prona Larga": "pullups",
    "Lat Machine Triangolo": "seated_cable_row",
    "Rematore Manubrio Singolo": "barbell_row",
    "Rematore T-Bar": "barbell_row",
    "Rematore Macchina Seduto (Chest Supported)": "seated_cable_row",
    "Seal Row panca": "barbell_row",
    "Lat Machine Braccia Tese": "cable_pullover",
    "Pullover Manubrio Panca": "cable_pullover",
    "Curl Manubri Alternato": "barbell_curl",
    "Curl Cavo Basso (Sbarra)": "cable_curl",
    "Curl Panca Inclinata Manubri": "barbell_curl",
    "Spider Curl panca 45°": "barbell_curl",
    "Front Squat": "squat_barbell",
    "Hack Squat Libero": "squat_barbell",
    "Leg Press 45° (Piedi bassi e stretti)": "leg_press",
    "Belt Squat": "squat_barbell",
    "Affondi Camminati (Manubri)": "squat_barbell",
    "Bulgarian Split Squat": "squat_barbell",
    "Sissy Squat": "leg_extension",
    "Step-up alto controllato": "leg_press",
    "Stacco a Gambe Tese": "romanian_deadlift",
    "Good Morning Bilanciere": "romanian_deadlift",
    "Leg Curl Seduto": "leg_curl_lying",
    "Glute Ham Raise": "leg_curl_lying",
    "Calf Press (sulla Leg Press)": "calf_raises",
    "Calf Seduto Macchina": "calf_raises"
  };
  return altMap[nomeAttuale] || mapEsercizioToAnimazione[id] || "squat_barbell";
};

// ==========================================
// COMPONENTI SVG ANIMATI COMPLETI E INTATTI
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
        {type === "bench_press_close" && ( <> <line x1="5" y1="35" x2="45" y2="35" {...benchLine} /> <line x1="12" y1="35" x2="12" y2="45" {...benchLine} strokeWidth="2" /> <line x1="38" y1="35" x2="38" y2="45" {...benchLine} strokeWidth="2" /> <g className="frame-a"> <circle cx="16" cy="32" r="3.5" {...head} /> <path d="M 19 33 L 32 33 L 40 42 L 40 48" {...body} /> <path d="M 23 33 L 23 27 L 23 20" {...body} /> <line x1="20" y1="20" x2="26" y2="20" {...gear} /> <rect x="19" y="15" width="2" height="10" {...weightFill} /> <rect x="25" y="15" width="2" height="10" {...weightFill} /> </g> <g className="frame-b"> <circle cx="16" cy="32" r="3.5" {...head} /> <path d="M 19 33 L 32 33 L 40 42 L 40 48" {...body} /> <path d="M 23 33 L 23 10" {...body} /> <line x1="20" y1="10" x2="26" y2="10" {...gear} /> <rect x="19" y="5" width="2" height="10" {...weightFill} /> <rect x="25" y="5" width="2" height="10" {...weightFill} /> </g> </> )}
        {type === "machine_press" && ( <> <path d="M 10 15 L 10 45 M 5 45 L 20 45" {...benchLine} fill="none" /> <g className="frame-a"> <circle cx="16" cy="20" r="3.5" {...head} /> <path d="M 14 24 L 14 35 L 25 45" {...body} /> <path d="M 14 24 L 20 28 L 22 24" {...body} /> <line x1="22" y1="20" x2="22" y2="28" {...machine} strokeWidth="2" /> </g> <g className="frame-b"> <circle cx="16" cy="20" r="3.5" {...head} /> <path d="M 14 24 L 14 35 L 25 45" {...body} /> <path d="M 14 24 L 35 24" {...body} /> <line x1="35" y1="20" x2="35" y2="28" {...machine} strokeWidth="2" /> </g> </> )}
        {type === "bench_press_incline_db" && ( <> <path d="M 10 45 L 20 45 L 30 20 L 35 20" {...benchLine} fill="none"/> <g className="frame-a"> <circle cx="28" cy="18" r="3.5" {...head} /> <path d="M 28 22 L 20 42 L 15 42 L 15 48" {...body} /> <path d="M 25 30 L 30 25 L 25 18" {...body} /> <rect x="22" y="15" width="6" height="4" {...weightFill} /> </g> <g className="frame-b"> <circle cx="28" cy="18" r="3.5" {...head} /> <path d="M 28 22 L 20 42 L 15 42 L 15 48" {...body} /> <path d="M 25 30 L 20 12" {...body} /> <rect x="17" y="10" width="6" height="4" {...weightFill} transform="rotate(-20 20 12)" /> </g> </> )}
        {type === "flyes_flat_db" && ( <> <line x1="20" y1="25" x2="30" y2="25" {...benchLine} strokeWidth="6" /> <g className="frame-a"> <circle cx="25" cy="20" r="3.5" {...head} /> <path d="M 25 24 L 25 45" {...body} /> <path d="M 25 24 L 10 30 M 25 24 L 40 30" {...body} /> <rect x="8" y="28" width="4" height="6" {...weightFill} /> <rect x="38" y="28" width="4" height="6" {...weightFill} /> </g> <g className="frame-b"> <circle cx="25" cy="20" r="3.5" {...head} /> <path d="M 25 24 L 25 45" {...body} /> <path d="M 25 24 L 22 10 M 25 24 L 28 10" {...body} /> <rect x="20" y="6" width="4" height="6" {...weightFill} /> <rect x="26" y="6" width="4" height="6" {...weightFill} /> </g> </> )}
        {type === "shoulder_press_db" && ( <> <line x1="15" y1="35" x2="35" y2="35" {...benchLine} /> <g className="frame-a"> <circle cx="25" cy="15" r="3.5" {...head} /> <path d="M 25 19 L 25 35" {...body} /> <path d="M 25 21 L 16 26 L 16 18 M 25 21 L 34 26 L 34 18" {...body} /> <rect x="14" y="16" width="4" height="6" {...weightFill} /> <rect x="32" y="16" width="4" height="6" {...weightFill} /> </g> <g className="frame-b"> <circle cx="25" cy="15" r="3.5" {...head} /> <path d="M 25 19 L 25 35" {...body} /> <path d="M 25 21 L 18 6 M 25 21 L 32 6" {...body} /> <rect x="16" y="2" width="4" height="6" {...weightFill} /> <rect x="30" y="2" width="4" height="6" {...weightFill} /> </g> </> )}
        {type === "lateral_raises_cables" && ( <> <line x1="5" y1="45" x2="45" y2="45" {...machine} /> <circle cx="8" cy="45" r="2" fill="#555" /> <circle cx="42" cy="45" r="2" fill="#555" /> <g className="frame-a"> <circle cx="25" cy="15" r="3.5" {...head} /> <path d="M 25 19 L 25 45 M 25 45 L 20 45 M 25 45 L 30 45" {...body} /> <path d="M 25 21 L 22 35 M 25 21 L 28 35" {...body} /> <line x1="8" y1="45" x2="28" y2="35" {...cable} /> <line x1="42" y1="45" x2="22" y2="35" {...cable} /> </g> <g className="frame-b"> <circle cx="25" cy="15" r="3.5" {...head} /> <path d="M 25 19 L 25 45 M 25 45 L 20 45 M 25 45 L 30 45" {...body} /> <path d="M 25 21 L 10 21 M 25 21 L 40 21" {...body} /> <line x1="8" y1="45" x2="40" y2="21" {...cable} /> <line x1="42" y1="45" x2="10" y2="21" {...cable} /> </g> </> )}
        {type === "tricep_pushdown" && ( <> <line x1="35" y1="5" x2="35" y2="45" {...machine} /> <circle cx="33" cy="5" r="2" fill="#555" /> <g className="frame-a"> <circle cx="20" cy="15" r="3.5" {...head} /> <path d="M 20 19 L 20 35 L 15 45 M 20 35 L 25 45" {...body} /> <path d="M 20 21 L 25 26 L 30 20" {...body} /> <line x1="33" y1="5" x2="30" y2="20" {...cable} /> </g> <g className="frame-b"> <circle cx="20" cy="15" r="3.5" {...head} /> <path d="M 20 19 L 20 35 L 15 45 M 20 35 L 25 45" {...body} /> <path d="M 20 21 L 25 26 L 30 35" {...body} /> <line x1="33" y1="5" x2="30" y2="35" {...cable} /> </g> </> )}
        {type === "pullups" && ( <> <line x1="5" y1="6" x2="45" y2="6" {...benchLine} strokeWidth="3" /> <g className="frame-a"> <circle cx="25" cy="22" r="3.5" {...head} /> <path d="M 25 26 L 25 40 L 22 48 M 25 40 L 28 48" {...body} /> <path d="M 25 26 L 15 6 M 25 26 L 35 6" {...body} /> </g> <g className="frame-b"> <circle cx="25" cy="10" r="3.5" {...head} /> <path d="M 25 14 L 25 30 L 22 35 M 25 30 L 28 35" {...body} /> <path d="M 25 14 L 15 20 L 15 6 M 25 14 L 35 20 L 35 6" {...body} /> </g> </> )}
        {type === "barbell_row" && ( <> <g className="frame-a"> <circle cx="38" cy="18" r="3.5" {...head} /> <path d="M 35 21 L 20 30 L 20 48 M 20 30 L 25 48" {...body} /> <path d="M 32 23 L 35 40" {...body} /> <line x1="28" y1="40" x2="42" y2="40" {...gear} /> <circle cx="35" cy="40" r="6" {...weightFill} fill="none" stroke="#e5e5e5" strokeWidth="2" /> </g> <g className="frame-b"> <circle cx="38" cy="18" r="3.5" {...head} /> <path d="M 35 21 L 20 30 L 20 48 M 20 30 L 25 48" {...body} /> <path d="M 32 23 L 40 20 L 30 28" {...body} /> <line x1="23" y1="28" x2="37" y2="28" {...gear} /> <circle cx="30" cy="28" r="6" {...weightFill} fill="none" stroke="#e5e5e5" strokeWidth="2" /> </g> </> )}
        {type === "seated_cable_row" && ( <> <line x1="10" y1="40" x2="30" y2="40" {...benchLine} /> <line x1="40" y1="30" x2="40" y2="45" {...machine} /> <circle cx="38" cy="40" r="2" fill="#555" /> <g className="frame-a"> <circle cx="20" cy="20" r="3.5" {...head} /> <path d="M 20 24 L 20 38 L 35 38" {...body} /> <path d="M 20 24 L 35 35" {...body} /> <line x1="38" y1="40" x2="35" y2="35" {...cable} /> </g> <g className="frame-b"> <circle cx="18" cy="20" r="3.5" {...head} /> <path d="M 18 24 L 20 38 L 35 38" {...body} /> <path d="M 18 24 L 14 30 L 28 35" {...body} /> <line x1="38" y1="40" x2="28" y2="35" {...cable} /> </g> </> )}
        {type === "cable_pullover" && ( <> <line x1="10" y1="5" x2="10" y2="45" {...machine} /> <circle cx="12" cy="5" r="2" fill="#555" /> <g className="frame-a"> <circle cx="35" cy="15" r="3.5" {...head} /> <path d="M 35 19 L 35 35 L 30 45 M 35 35 L 40 45" {...body} /> <path d="M 35 21 L 20 10" {...body} /> <line x1="12" y1="5" x2="20" y2="10" {...cable} /> </g> <g className="frame-b"> <circle cx="35" cy="15" r="3.5" {...head} /> <path d="M 35 19 L 35 35 L 30 45 M 35 35 L 40 45" {...body} /> <path d="M 35 21 L 35 38" {...body} /> <line x1="12" y1="5" x2="35" y2="38" {...cable} /> </g> </> )}
        {type === "barbell_curl" && ( <> <g className="frame-a"> <circle cx="25" cy="10" r="3.5" {...head} /> <path d="M 25 14 L 25 32 L 25 48 M 25 32 L 28 48" {...body} /> <path d="M 25 16 L 25 30 L 28 35" {...body} /> <line x1="20" y1="35" x2="36" y2="35" {...gear} /> <rect x="18" y="32" width="2" height="6" {...weightFill} /> <rect x="36" y="32" width="2" height="6" {...weightFill} /> </g> <g className="frame-b"> <circle cx="25" cy="10" r="3.5" {...head} /> <path d="M 25 14 L 25 32 L 25 48 M 25 32 L 28 48" {...body} /> <path d="M 25 16 L 25 30 L 32 20" {...body} /> <line x1="24" y1="20" x2="40" y2="20" {...gear} /> <rect x="22" y="17" width="2" height="6" {...weightFill} /> <rect x="40" y="17" width="2" height="6" {...weightFill} /> </g> </> )}
        {type === "cable_curl" && ( <> <line x1="10" y1="5" x2="10" y2="45" {...machine} /> <circle cx="12" cy="45" r="2" fill="#555" /> <g className="frame-a"> <circle cx="35" cy="10" r="3.5" {...head} /> <path d="M 35 14 L 35 32 L 30 48 M 35 32 L 40 48" {...body} /> <path d="M 35 16 L 35 30 L 25 40" {...body} /> <line x1="12" y1="45" x2="25" y2="40" {...cable} /> <line x1="22" y1="40" x2="28" y2="40" {...gear} strokeWidth="3" /> </g> <g className="frame-b"> <circle cx="35" cy="10" r="3.5" {...head} /> <path d="M 35 14 L 35 32 L 30 48 M 35 32 L 40 48" {...body} /> <path d="M 35 16 L 35 30 L 25 20" {...body} /> <line x1="12" y1="45" x2="25" y2="20" {...cable} /> <line x1="22" y1="20" x2="28" y2="20" {...gear} strokeWidth="3" /> </g> </> )}
        {type === "squat_barbell" && ( <> <g className="frame-a"> <circle cx="25" cy="10" r="3.5" {...head} /> <path d="M 25 14 L 25 30 L 25 48 M 25 30 L 28 48" {...body} /> <path d="M 25 15 L 29 19 L 25 13" {...body} /> <line x1="18" y1="13" x2="32" y2="13" {...gear} /> <circle cx="25" cy="13" r="5" {...weightFill} fill="none" stroke="#e5e5e5"/> </g> <g className="frame-b"> <circle cx="32" cy="24" r="3.5" {...head} /> <path d="M 32 28 L 20 38 L 26 48 M 20 38 L 16 48" {...body} /> <path d="M 32 29 L 36 33 L 32 27" {...body} /> <line x1="25" y1="27" x2="39" y2="27" {...gear} /> <circle cx="32" cy="27" r="5" {...weightFill} fill="none" stroke="#e5e5e5"/> </g> </> )}
        {type === "hack_squat" && ( <> <line x1="10" y1="45" x2="40" y2="5" {...machine} strokeWidth="4" /> <g className="frame-a"> <circle cx="32" cy="10" r="3.5" {...head} /> <path d="M 30 14 L 23 23 L 23 45 M 23 23 L 28 45" {...body} /> </g> <g className="frame-b"> <circle cx="23" cy="22" r="3.5" {...head} /> <path d="M 21 26 L 14 35 L 23 35 L 23 45 M 14 35 L 28 45" {...body} /> </g> </> )}
        {type === "leg_press" && ( <> <path d="M 10 30 L 20 45 L 35 45" {...benchLine} fill="none" /> <line x1="25" y1="10" x2="45" y2="30" {...machine} strokeWidth="2" /> <g className="frame-a"> <circle cx="15" cy="25" r="3.5" {...head} /> <path d="M 15 28 L 20 45" {...body} /> <path d="M 20 45 L 22 30 L 30 20" {...body} /> <line x1="28" y1="15" x2="35" y2="22" {...gear} strokeWidth="3" /> </g> <g className="frame-b"> <circle cx="15" cy="25" r="3.5" {...head} /> <path d="M 15 28 L 20 45" {...body} /> <path d="M 20 45 L 32 30 L 42 10" {...body} /> <line x1="39" y1="5" x2="46" y2="12" {...gear} strokeWidth="3" /> </g> </> )}
        {type === "leg_extension" && ( <> <path d="M 15 20 L 15 35 L 25 35 L 25 45" {...benchLine} fill="none" /> <g className="frame-a"> <circle cx="10" cy="15" r="3.5" {...head} /> <path d="M 12 18 L 12 33 L 25 33 L 25 45" {...body} /> <circle cx="27" cy="45" r="3" {...weightFill} /> </g> <g className="frame-b"> <circle cx="10" cy="15" r="3.5" {...head} /> <path d="M 12 18 L 12 33 L 25 33 L 40 33" {...body} /> <circle cx="40" cy="31" r="3" {...weightFill} /> <path d="M 25 33 L 40 31" {...machine} strokeWidth="1" /> </g> </> )}
        {type === "romanian_deadlift" && ( <> <g className="frame-a"> <circle cx="25" cy="10" r="3.5" {...head} /> <path d="M 25 14 L 25 30 L 25 48 M 25 30 L 28 48" {...body} /> <path d="M 25 16 L 25 32" {...body} /> <line x1="15" y1="32" x2="35" y2="32" {...gear} /> <circle cx="25" cy="32" r="6" {...weightFill} fill="none" stroke="#e5e5e5" strokeWidth="2" /> </g> <g className="frame-b"> <circle cx="35" cy="20" r="3.5" {...head} /> <path d="M 35 20 L 20 30 L 20 48 M 20 30 L 25 48" {...body} /> <path d="M 32 22 L 32 40" {...body} /> <line x1="22" y1="40" x2="42" y2="40" {...gear} /> <circle cx="32" cy="40" r="6" {...weightFill} fill="none" stroke="#e5e5e5" strokeWidth="2" /> </g> </> )}
        {type === "leg_curl_lying" && ( <> <line x1="10" y1="35" x2="40" y2="35" {...benchLine} /> <path d="M 40 35 L 45 45" {...machine} /> <g className="frame-a"> <circle cx="15" cy="32" r="3.5" {...head} /> <path d="M 18 34 L 30 34 L 40 34 L 48 34" {...body} /> <circle cx="48" cy="32" r="3" {...weightFill} /> </g> <g className="frame-b"> <circle cx="15" cy="32" r="3.5" {...head} /> <path d="M 18 34 L 30 34 L 40 34 L 38 18" {...body} /> <circle cx="36" cy="18" r="3" {...weightFill} /> <path d="M 40 34 L 36 18" {...machine} strokeWidth="1" /> </g> </> )}
        {type === "calf_raises" && ( <> <rect x="20" y="45" width="10" height="5" fill="#555" /> <g className="frame-a"> <circle cx="25" cy="10" r="3.5" {...head} /> <path d="M 25 14 L 25 30 L 25 45" {...body} /> </g> <g className="frame-b"> <circle cx="25" cy="6" r="3.5" {...head} /> <path d="M 25 10 L 25 26 L 27 40 L 22 45" {...body} /> </g> </> )}
      </svg>
    </div>
  );
};

const SvgLineChart = ({ data, label }: { data: number[], label: string }) => {
  if (!data || data.length === 0) return <p className="text-[10px] text-neutral-500 italic">Dati insufficienti per il grafico.</p>;
  if (data.length === 1) return <p className="text-[10px] text-neutral-500 italic">Un solo dato ({data[0]}). Esegui un&apos;altra sessione per tracciare la curva.</p>;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SvgVitruvianHUD = ({ biometria, storico }: { biometria: Record<string, string>, storico: any[] }) => {
  const getDeltas = (key: string) => {
     if(storico.length < 2) return null;
     const current = Number(biometria[key]);
     const prevCirc = typeof storico[1].circonferenze === 'string' ? JSON.parse(storico[1].circonferenze) : (storico[1].circonferenze || {});
     const prev = Number(key === 'peso' ? storico[1].peso : prevCirc[key]);
     if(!current || !prev) return null;
     const diff = current - prev;
     return { val: diff > 0 ? `+${diff}` : `${diff}`, color: diff > 0 ? '#22c55e' : (diff < 0 ? '#ef4444' : '#a3a3a3') };
  };

  return (
    <div className="relative w-full h-[300px] bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-center mt-4 overflow-hidden">
       <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
       <svg viewBox="0 0 200 300" className="h-full w-auto z-10 opacity-80">
          <path d="M100 20 C110 20 115 25 115 35 C115 45 105 50 100 50 C95 50 85 45 85 35 C85 25 90 20 100 20 Z" fill="none" stroke="#3b82f6" strokeWidth="2"/>
          <path d="M100 50 L100 80 M75 80 L125 80 M60 140 L75 80 M140 140 L125 80 M75 140 L125 140 M100 80 L100 140 M75 140 L75 280 M125 140 L125 280 M100 140 L100 170 L75 140 M100 140 L100 170 L125 140" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2"/>
          <circle cx="100" cy="90" r="4" fill="#f97316" /><circle cx="70" cy="85" r="4" fill="#f97316" /><circle cx="130" cy="85" r="4" fill="#f97316" />
          <circle cx="65" cy="115" r="4" fill="#f97316" /><circle cx="135" cy="115" r="4" fill="#f97316" /><circle cx="85" cy="200" r="4" fill="#f97316" />
          <circle cx="115" cy="200" r="4" fill="#f97316" /><circle cx="100" cy="150" r="4" fill="#f97316" />
       </svg>
       <div className="absolute top-10 right-4 text-[9px] font-mono text-neutral-300 bg-neutral-900/80 p-1 border border-neutral-700 rounded">Spalle: {biometria.spalle}cm {getDeltas('spalle') && <span style={{color: getDeltas('spalle')?.color}}>({getDeltas('spalle')?.val})</span>}</div>
       <div className="absolute top-24 left-4 text-[9px] font-mono text-neutral-300 bg-neutral-900/80 p-1 border border-neutral-700 rounded">Braccia: {biometria.braccia}cm {getDeltas('braccia') && <span style={{color: getDeltas('braccia')?.color}}>({getDeltas('braccia')?.val})</span>}</div>
       <div className="absolute top-36 right-4 text-[9px] font-mono text-neutral-300 bg-neutral-900/80 p-1 border border-neutral-700 rounded">Petto: {biometria.petto}cm {getDeltas('petto') && <span style={{color: getDeltas('petto')?.color}}>({getDeltas('petto')?.val})</span>}</div>
       <div className="absolute bottom-32 right-4 text-[9px] font-mono text-neutral-300 bg-neutral-900/80 p-1 border border-neutral-700 rounded">Glutei: {biometria.glutei}cm {getDeltas('glutei') && <span style={{color: getDeltas('glutei')?.color}}>({getDeltas('glutei')?.val})</span>}</div>
       <div className="absolute bottom-12 left-4 text-[9px] font-mono text-neutral-300 bg-neutral-900/80 p-1 border border-neutral-700 rounded">Gambe: {biometria.gambe}cm {getDeltas('gambe') && <span style={{color: getDeltas('gambe')?.color}}>({getDeltas('gambe')?.val})</span>}</div>
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

const infoMisure = {
  peso: { label: "Peso", unit: "kg" }, petto: { label: "Petto", unit: "cm" }, spalle: { label: "Spalle", unit: "cm" },
  braccia: { label: "Braccia", unit: "cm" }, gambe: { label: "Gambe", unit: "cm" }, glutei: { label: "Glutei", unit: "cm" },
  vita: { label: "Vita (Nuovo)", unit: "cm" }
};

export default function Home() {
  // Costanti Top-Level
  const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

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
  const [biometria, setBiometria] = useState<Record<string, string>>({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '', vita: '' });
  const [valoreBia, setValoreBia] = useState("");
  
  // Turni
  const [tipoTurno, setTipoTurno] = useState('spezzato');
  const [inizio1, setInizio1] = useState('');
  const [fine1, setFine1] = useState('');
  const [inizio2, setInizio2] = useState('');
  const [fine2, setFine2] = useState('');
  const [quandoTiAlleni, setQuandoTiAlleni] = useState('sera'); 
  
  // --- WIZARD NUOVO ATLETA ---
  const [modalWizard, setModalWizard] = useState(false);
  const [stepWizard, setStepWizard] = useState(1);
  const [datiWizard, setDatiWizard] = useState({ nome: '', eta: '', altezza: '', peso: '', vita: '', bia: '', stileVita: 'Sedentario', obiettivo: 'Shred' });
  const [fotoWizard, setFotoWizard] = useState<{data: string, mimeType: string, nome: string} | null>(null);
  const [rispostaWizard, setRispostaWizard] = useState("");
  const [loadingWizard, setLoadingWizard] = useState(false);
  const fileWizardRef = useRef<HTMLInputElement>(null);

  // --- STATI PROTOCOLLO (Allenamento) ---
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
  
  // Nutrizione
  const [moltiplicatoreCarbo, setMoltiplicatoreCarbo] = useState(5);
  const [messaggioDieta, setMessaggioDieta] = useState("Macro standard Anti-Secco impostati.");
  const [pastiSelezionati, setPastiSelezionati] = useState<Record<string, number>>({ Pasto1: 0, Pasto2: 0, Pasto3: 0, PostWorkout: 0 });
  const [pastiCustom, setPastiCustom] = useState<Record<string, {attivo: boolean, cho: string, pro: string, fat: string, nome: string}>>({
    Pasto1: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, Pasto2: { attivo: false, cho: '', pro: '', fat: '', nome: '' },
    Pasto3: { attivo: false, cho: '', pro: '', fat: '', nome: '' }, PostWorkout: { attivo: false, cho: '', pro: '', fat: '', nome: '' },
  });
  const [modalAlimento, setModalAlimento] = useState(false);
  const [categoriaDaCambiare, setCategoriaDaCambiare] = useState<keyof typeof dbAlimenti>('Pasto1');
  const [isCalculatingMacro, setIsCalculatingMacro] = useState<Record<string, boolean>>({});

  // Chat
  const [chatLog, setChatLog] = useState<{role: 'user' | 'ai', text: string}[]>([{ role: 'ai', text: 'Ciao! Sono il tuo Coach IA. Mandami la foto di un pasto o scrivimi cosa hai mangiato per stimare i macro e inserirli in automatico nel tuo piano!' }]);
  const [inputChat, setInputChat] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fileAllegato, setFileAllegato] = useState<{data: string, mimeType: string, nome: string} | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Telemetria Storico & Grafici
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [storicoMisure, setStoricoMisure] = useState<any[]>([]);
  const [vistaStoricoMisure, setVistaStoricoMisure] = useState(false);
  const [vistaGraficiCorpo, setVistaGraficiCorpo] = useState(false);
  const [vistaGraficiCarichi, setVistaGraficiCarichi] = useState(false);
  const [esercizioGraficoSelezionato, setEsercizioGraficoSelezionato] = useState<string>("e1");

  // Costanti calcolate
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
    
    // Hardcode Paziente Zero "Leonardo" 
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
          braccia: circ.braccia || '', gambe: circ.gambe || '', glutei: circ.glutei || '', vita: circ.vita || ''
        });
        setValoreBia(circ.bia || "");
        if(circ.profilo?.stileVita) setStileVita(circ.profilo.stileVita);
      }
      setStoricoMisure(data.filter(d => d.peso || (d.circonferenze && typeof d.circonferenze === 'object' && Object.keys(d.circonferenze).length > 0)));
    } else if (nomeAtleta !== "Leonardo") {
       setBiometria({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '', vita: '' });
       setValoreBia("");
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
    if (utenteCorrente === "Leonardo") {
      alert("Operazione negata. Impossibile eliminare il Paziente Zero (Leonardo).");
      return;
    }
    if (confirm(`Sei sicuro di voler eliminare definitivamente il profilo di ${utenteCorrente} e tutti i suoi dati?`)) {
      await supabase.from("check_utente").delete().eq("nome_utente", utenteCorrente);
      await supabase.from("storico_allenamenti").delete().eq("nome_utente", utenteCorrente);
      setListaAtleti(prev => prev.filter(a => a !== utenteCorrente));
      setUtenteCorrente("Leonardo");
      alert(`Profilo di ${utenteCorrente} eliminato.`);
    }
  };

  // ==========================================
  // GENERATORE ALLENAMENTO DINAMICO
  // ==========================================
  const generaAllenamentoDinamico = () => {
     const plan = JSON.parse(JSON.stringify(baseDbAllenamento)); 
     if (utenteCorrente === "Leonardo") return plan; // Paziente Zero inviolabile

     const isOver40 = Number(eta) > 40;
     const isShred = protocolloAttivo === 'Shred';
     const isHeavyJob = stileVita.includes("Attivo") || stileVita.includes("pesante");

     Object.keys(plan).forEach(sch => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plan[sch].esercizi.forEach((ex: any) => {
           if (isShred) {
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

  // --- WIZARD LOGIC ---
  const gestisciCaricamentoFileWizard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) { alert("File troppo grande."); return; }
    const reader = new FileReader();
    reader.onloadend = () => { setFotoWizard({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); };
    reader.readAsDataURL(file);
  };

  const analizzaObiettivoWizard = async () => {
    setLoadingWizard(true);
    try {
      const contesto = `Sei un Coach IA. Analizza questo atleta: Nome: ${datiWizard.nome}, Età: ${datiWizard.eta}, Altezza: ${datiWizard.altezza}cm, Peso: ${datiWizard.peso}kg. Circonferenza Vita: ${datiWizard.vita}cm. BIA: ${datiWizard.bia}%. Lifestyle: ${datiWizard.stileVita}. Obiettivo: ${datiWizard.obiettivo}. Se c'è una foto, stima la body fat. Fornisci un verdetto indicando le settimane stimate.`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { message: "Analizza il mio profilo.", context: contesto };
      if (fotoWizard) payload.file = { data: fotoWizard.data, mimeType: fotoWizard.mimeType };
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      setRispostaWizard(data.reply);
      setStepWizard(3);
    } catch (e) {
      console.log(e);
      setRispostaWizard("Errore di rete durante l'analisi. Riprova.");
      setStepWizard(3);
    }
    setLoadingWizard(false);
  };

  const salvaProfiloWizard = async () => {
    const payload = { 
      nome_utente: datiWizard.nome, 
      eta: Number(datiWizard.eta), 
      altezza: Number(datiWizard.altezza), 
      peso: Number(datiWizard.peso), 
      circonferenze: { 
        vita: datiWizard.vita, 
        bia: datiWizard.bia, 
        profilo: { stileVita: datiWizard.stileVita, obiettivo: datiWizard.obiettivo } 
      }, 
      data: new Date().toISOString() 
    };
    await supabase.from("check_utente").insert([payload]);
    setListaAtleti(prev => [...prev, datiWizard.nome]);
    setModalWizard(false);
    setStepWizard(1);
    caricaProfilo(datiWizard.nome, datiWizard.obiettivo);
  };

  // ==========================================
  // LOGICA CHAT E NUTRIZIONE (Regex antiproiettile)
  // ==========================================
  const gestisciCaricamentoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) { alert("File troppo grande."); return; }
    const reader = new FileReader();
    reader.onloadend = () => { setFileAllegato({ data: (reader.result as string).split(',')[1], mimeType: file.type, nome: file.name }); };
    reader.readAsDataURL(file);
  };

  const inviaMessaggioIA = async () => {
    if (!inputChat.trim() && !fileAllegato) return;
    const msg = inputChat || "Analizza questo file allegato.";
    setChatLog(prev => [...prev, { role: 'user', text: fileAllegato ? `📎 [File: ${fileAllegato.nome}] ${msg}` : msg }]);
    setInputChat("");
    
    const fileDaInviare = fileAllegato;
    setFileAllegato(null);
    setIsTyping(true);
    
    try {
      const contestoMagico = `
      SEI IL COACH IA DEL PROTOCOLLO. Utente: ${utenteCorrente}, Peso: ${biometria.peso}kg.
      REGOLA D'ORO PER PASTI: Stima i macronutrienti totali in grammi. INSERISCI SOLO NUMERI SENZA 'g' IN QUESTO COMANDO ALLA FINE:
      [MAGIC_MACRO | PASTO_TARGET | numero_cho | numero_pro | numero_fat | NOME_CIBO]
      PASTO_TARGET: usa "Pasto1", "Pasto2", "Pasto3" o "PostWorkout". Chiedi quale pasto se non specificato.
      `;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { message: msg, context: contestoMagico };
      if (fileDaInviare) payload.file = { data: fileDaInviare.data, mimeType: fileDaInviare.mimeType };
      
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      let responseText = data.reply || "Errore nella risposta.";

      const magicRegex = /\[MAGIC_MACRO\s*\|\s*(Pasto1|Pasto2|Pasto3|PostWorkout)\s*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([^\]]+)\]/i;
      const match = responseText.match(magicRegex);
      
      if(match) {
          const fullString = match[0];
          const pastoTarget = match[1];
          const cho = match[2];
          const pro = match[3];
          const fat = match[4];
          const nomeCibo = match[5];
          
          responseText = responseText.replace(fullString, '').trim();
          setPastiCustom(prev => ({
              ...prev,
              [pastoTarget]: { attivo: true, cho: Math.round(parseFloat(cho.replace(',','.'))).toString(), pro: Math.round(parseFloat(pro.replace(',','.'))).toString(), fat: Math.round(parseFloat(fat.replace(',','.'))).toString(), nome: nomeCibo.trim() }
          }));
          responseText += `\n\n✨ **Magia eseguita!** Ho calcolato i macro e li ho inseriti nello sgarro del ${pastoTarget} come "${nomeCibo.trim()}". Dieta ricalcolata!`;
      }
      setChatLog(prev => [...prev, { role: 'ai', text: responseText }]);
    } catch (error) { console.log(error); setChatLog(prev => [...prev, { role: 'ai', text: "Errore server Gemini." }]); }
    setIsTyping(false);
  };

  const calcolaMacroDaNome = async (cat: string, nomeCibo: string) => {
    if(!nomeCibo.trim()) return alert("Inserisci prima il nome del pasto sgarro.");
    setIsCalculatingMacro(prev => ({...prev, [cat]: true}));
    try {
      const payload = { message: `L'utente ha inserito: "${nomeCibo}". Calcola macro. Restituisci SOLO: [MAGIC_MACRO | ${cat} | numero_cho | numero_pro | numero_fat | ${nomeCibo}] (SOLO NUMERI, NESSUN ALTRO TESTO)` };
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      const magicRegex = /\[MAGIC_MACRO\s*\|\s*(Pasto1|Pasto2|Pasto3|PostWorkout)\s*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([\d.,]+)[^|]*\|\s*([^\]]+)\]/i;
      const match = data.reply.match(magicRegex);
      if(match) {
        const pastoTarget = match[1];
        const cho = match[2];
        const pro = match[3];
        const fat = match[4];
        const nome = match[5];
        updateCustomMeal(cat, 'cho', Math.round(parseFloat(cho.replace(',','.'))).toString());
        updateCustomMeal(cat, 'pro', Math.round(parseFloat(pro.replace(',','.'))).toString());
        updateCustomMeal(cat, 'fat', Math.round(parseFloat(fat.replace(',','.'))).toString());
        updateCustomMeal(cat, 'nome', nome.trim());
      } else { alert("Non riconosciuto. Risposta: " + data.reply); }
    } catch(e) { console.log(e); alert("Errore di rete."); }
    setIsCalculatingMacro(prev => ({...prev, [cat]: false}));
  };

  const valutaCheckFisico = async () => {
    const { peso, petto, spalle, braccia, gambe, glutei, vita } = biometria;
    if (peso && eta && altezza && petto && spalle && braccia && gambe && glutei && vita) {
      let trendCarichi = "Neutro";
      if (storicoSessioni.length >= 2) trendCarichi = "Stallo Rilevato"; 
      let alertMsg = "";
      
      if (protocolloAttivo === 'Massa') {
        if (Number(peso) > 80 && Number(braccia) < 38 && Number(glutei) > 95) {
           setMoltiplicatoreCarbo(4); alertMsg = "⚠️ Composizione: Rilevato accumulo grasso. Modulo i carbo a 4g/kg.";
        } else if (trendCarichi === "Stallo Rilevato") {
           setMoltiplicatoreCarbo(6.5); alertMsg = "🔥 Prestazioni: Carichi bloccati. Surplus Aggressivo (6.5g/kg) attivato.";
        } else {
           setMoltiplicatoreCarbo(5); alertMsg = "✅ Parametri in asse. Protocollo Ipertrofico standard mantenuto (5g/kg).";
        }
      } else if (protocolloAttivo === 'Shred') {
        setMoltiplicatoreCarbo(2.5); alertMsg = "🔪 Fase Definizone attiva. Carbo mantenuti bassi (2.5g/kg).";
      } else {
        setMoltiplicatoreCarbo(4); alertMsg = "⚖️ Fase Ricomposizione attiva. Calorie in pari per consolidare i risultati.";
      }
      setMessaggioDieta(alertMsg);

      const payload = { nome_utente: utenteCorrente, eta: Number(eta), altezza: Number(altezza), peso: Number(peso), circonferenze: { ...biometria, bia: valoreBia, profilo: { stileVita, obiettivo: protocolloAttivo } }, data: new Date().toISOString() };
      const { error } = await supabase.from("check_utente").insert([payload]);
      if (error) alert("Errore Database: " + error.message);
      else { alert(alertMsg); caricaProfilo(utenteCorrente, protocolloAttivo); } 
    } else { alert("Compila TUTTI i campi fisici per analizzare il trend."); }
  };

  // Funzioni UI minori
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
    setCarichiAttuali({}); alert(`Sessione salvata per ${utenteCorrente}.`); caricaProfilo(utenteCorrente, protocolloAttivo);
  };
  const toggleCustomMeal = (cat: string) => setPastiCustom(prev => ({ ...prev, [cat]: { ...prev[cat], attivo: true } }));
  const resetCustomMeal = (cat: string) => setPastiCustom(prev => ({ ...prev, [cat]: { attivo: false, cho: '', pro: '', fat: '', nome: '' } }));
  const updateCustomMeal = (cat: string, field: 'cho'|'pro'|'fat'|'nome', value: string) => setPastiCustom(prev => ({ ...prev, [cat]: { ...prev[cat], [field]: value } }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apriSwapEsercizio = (es: any) => { setEsercizioDaCambiare({ id: es.id, nomeAttuale: eserciziModificati[es.id] || es.nome, alternative: es.alternative }); setModalEsercizio(true); };
  const confermaSwapEsercizio = (nuovoNome: string) => { setEserciziModificati({ ...eserciziModificati, [esercizioDaCambiare.id]: nuovoNome }); setModalEsercizio(false); };
  const apriSwapAlimento = (categoria: string) => { setCategoriaDaCambiare(categoria as keyof typeof dbAlimenti); setModalAlimento(true); };
  const confermaSwapAlimento = (index: number) => { setPastiSelezionati({ ...pastiSelezionati, [categoriaDaCambiare]: index }); setModalAlimento(false); };
  const aggiornaBiometria = (campo: string, valore: string) => { setBiometria({ ...biometria, [campo]: valore }); };

  // Logica Calcolo Dieta
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

  // ==========================================
  // RENDER HOME (Control Room)
  // ==========================================
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
                   <div className="flex gap-2">
                     <input type="number" placeholder="Vita (cm)" value={datiWizard.vita} onChange={e=>setDatiWizard({...datiWizard, vita: e.target.value})} className="w-1/2 bg-neutral-950 text-white p-2 border border-neutral-700 rounded" />
                     <input type="number" placeholder="BIA (Opzionale %)" value={datiWizard.bia} onChange={e=>setDatiWizard({...datiWizard, bia: e.target.value})} className="w-1/2 bg-neutral-950 text-white p-2 border border-neutral-700 rounded" />
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
                     <p className="text-[10px] text-neutral-500 mb-2">Se carichi la foto del fisico a cui punti, l&apos;IA farà una stima della massa grassa e calcolerà i tempi di raggiungimento.</p>
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
              <div className="flex gap-1">
                 <button onClick={() => {setVistaStoricoMisure(!vistaStoricoMisure); setVistaGraficiCorpo(false);}} className={`px-2 py-1.5 text-[9px] uppercase font-bold rounded-md transition-all ${vistaStoricoMisure && !vistaGraficiCorpo ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}>
                   {vistaStoricoMisure && !vistaGraficiCorpo ? 'Torna' : 'Storico'}
                 </button>
                 <button onClick={() => {setVistaGraficiCorpo(!vistaGraficiCorpo); setVistaStoricoMisure(true);}} className={`px-2 py-1.5 text-[9px] uppercase font-bold rounded-md transition-all ${vistaGraficiCorpo ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}>
                   📊 Scan
                 </button>
              </div>
            </div>

            {!vistaStoricoMisure ? (
               <div className="space-y-3">
                 <div className="grid grid-cols-2 gap-3">
                   {Object.keys(infoMisure).map((chiave) => (
                       <div key={chiave} className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 group relative">
                         <label className="text-[10px] text-neutral-400 uppercase font-bold">{infoMisure[chiave as keyof typeof infoMisure].label}</label>
                         <input type="number" value={biometria[chiave as keyof typeof biometria]} onChange={(e) => setBiometria({...biometria, [chiave]: e.target.value})} className="w-full bg-transparent text-sm font-bold text-white outline-none focus:text-orange-500" placeholder="0" />
                       </div>
                   ))}
                 </div>
                 <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold">BIA / Massa Grassa % (Opzionale)</label>
                    <input type="text" value={valoreBia} onChange={(e) => setValoreBia(e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none focus:text-orange-500" placeholder="es. 12%" />
                 </div>
                 <button onClick={valutaCheckFisico} className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg uppercase tracking-widest text-[10px] shadow-lg">Salva Misure</button>
               </div>
            ) : vistaGraficiCorpo ? (
               <div className="flex-1 overflow-y-auto pr-1 max-h-[350px]">
                 <SvgVitruvianHUD biometria={biometria} storico={storicoMisure} />
                 {storicoMisure.length > 1 && <SvgLineChart data={storicoMisure.map(m => Number(m.peso)).reverse()} label="Peso (kg)" />}
               </div>
            ) : (
               <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[350px]">
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
                               <p>Vita: <strong>{circ.vita || '-'}cm</strong></p><p>BIA: <strong>{circ.bia || '-'}</strong></p>
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
                    const nomeVis = eserciziModificati[es.id] || es.nome;
                    const ultimoCarico = getUltimoCarico(es.id);
                    const numeroSetTarget = getNumeroSet(es.fase);
                    const phaseColor = es.fase.includes('Fase 1') ? '#f97316' : (es.fase.includes('Fase 2') ? '#3b82f6' : '#ef4444');
                    
                    // ICONA DINAMICA BASATA SULLO SWAP
                    const animType = getAnimType(es.id, nomeVis);
                    
                    let repMostrate = es.rep;
                    if (fastWorkout) repMostrate = repMostrate.replace("4-5 serie", "3 serie").replace("3-4 serie", "2 serie").replace("Rec: 2 min", "Rec: 1.5 min").replace("Rec: 45 sec", "Rec: 1 min");

                    return (
                      <div key={es.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1 h-full`} style={{backgroundColor: phaseColor}}></div>
                        <div className="pl-2">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] uppercase font-black" style={{color: phaseColor}}>{es.fase}</span>
                            <button onClick={() => apriSwapEsercizio(es)} className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded font-bold uppercase">Swap</button>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <SvgVisualizer type={animType} color={phaseColor} />
                            <div className="flex-1"><h3 className="font-bold text-sm text-white">{nomeVis}</h3><p className="text-[11px] text-neutral-400 italic mt-1">{es.dettaglio}</p></div>
                          </div>
                          <p className="text-[10px] font-bold px-2 py-1 mt-2 rounded border w-fit bg-neutral-900 text-neutral-300 border-neutral-700">{repMostrate}</p>
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
                <button onClick={salvaSessione} className="w-full mt-4 py-3 bg-orange-600 text-white font-bold uppercase tracking-widest text-sm rounded-lg shadow-lg shrink-0">Salva Database</button>
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
            <div className="space-y-3">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {esercizioDaCambiare.alternative.map((alt: any, i: number) => (
                <button key={i} onClick={() => confermaSwapEsercizio(alt.nome)} className="w-full text-left p-4 bg-neutral-950 border border-neutral-800 rounded-lg hover:border-orange-500/50 group transition-all">
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
