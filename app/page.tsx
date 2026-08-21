"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from "@supabase/supabase-js";

// Configurazione Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqawxoocwtxfkahzyduq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chiave-temporanea-per-il-build";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 1. DATABASE ALLENAMENTO 
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

const mapEsercizioToAnimazione: Record<string, string> = {
  "e1": "bench_press_flat",       
  "e3": "bench_press_incline_db", 
  "e4": "machine_press",          
  "e5": "flyes_flat_db",          
  "e18": "shoulder_press_db",     
  "e20": "lateral_raises_cables", 
  "e22": "bench_press_close",     
  "e27": "tricep_pushdown",       
  "e6": "pullups",                
  "e7": "barbell_row",            
  "e9": "seated_cable_row",       
  "e10": "cable_pullover",        
  "e23": "barbell_curl",          
  "e26": "cable_curl",            
  "e11": "squat_barbell",         
  "e12": "hack_squat",            
  "e14": "leg_press",             
  "e15": "leg_extension",         
  "e13": "romanian_deadlift",     
  "e16": "leg_curl_lying",        
  "e17": "calf_raises"            
};

// ==========================================
// COMPONENTE STICKMAN ANIMATO 
// BIOMECCANICA FEDELE 100% ESERCIZIO-SPECIFICA
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
    <div className="relative w-16 h-16 bg-neutral-950/80 rounded-lg border border-neutral-800 flex items-center justify-center overflow-hidden shadow-inner">
      <style>{`
        @keyframes flipA { 0%, 45% { opacity: 1; } 50%, 95% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes flipB { 0%, 45% { opacity: 0; } 50%, 95% { opacity: 1; } 100% { opacity: 0; } }
        .frame-a { animation: flipA 1.6s infinite; }
        .frame-b { animation: flipB 1.6s infinite; }
      `}</style>
      
      <svg viewBox="0 0 50 50" className="w-14 h-14">
        
        {/* ================= SPINTA ================= */}
        {type === "bench_press_flat" && ( // Panca Piana Larga
          <>
            <line x1="5" y1="35" x2="45" y2="35" {...benchLine} />
            <line x1="12" y1="35" x2="12" y2="45" {...benchLine} strokeWidth="2" />
            <line x1="38" y1="35" x2="38" y2="45" {...benchLine} strokeWidth="2" />
            <g className="frame-a">
              <circle cx="16" cy="32" r="3.5" {...head} />
              <path d="M 19 33 L 32 33 L 40 42 L 40 48" {...body} />
              <path d="M 23 33 L 26 26 L 23 20" {...body} /> 
              <line x1="18" y1="20" x2="28" y2="20" {...gear} />
              <rect x="17" y="14" width="2" height="12" {...weightFill} />
              <rect x="27" y="14" width="2" height="12" {...weightFill} />
            </g>
            <g className="frame-b">
              <circle cx="16" cy="32" r="3.5" {...head} />
              <path d="M 19 33 L 32 33 L 40 42 L 40 48" {...body} />
              <path d="M 23 33 L 23 10" {...body} /> 
              <line x1="18" y1="10" x2="28" y2="10" {...gear} />
              <rect x="17" y="4" width="2" height="12" {...weightFill} />
              <rect x="27" y="4" width="2" height="12" {...weightFill} />
            </g>
          </>
        )}

        {type === "bench_press_close" && ( // Panca Stretta (gomiti serrati in basso)
          <>
            <line x1="5" y1="35" x2="45" y2="35" {...benchLine} />
            <line x1="12" y1="35" x2="12" y2="45" {...benchLine} strokeWidth="2" />
            <line x1="38" y1="35" x2="38" y2="45" {...benchLine} strokeWidth="2" />
            <g className="frame-a">
              <circle cx="16" cy="32" r="3.5" {...head} />
              <path d="M 19 33 L 32 33 L 40 42 L 40 48" {...body} />
              {/* Gomiti stretti verso il corpo, mani più vicine */}
              <path d="M 23 33 L 23 27 L 23 20" {...body} /> 
              <line x1="20" y1="20" x2="26" y2="20" {...gear} />
              <rect x="19" y="15" width="2" height="10" {...weightFill} />
              <rect x="25" y="15" width="2" height="10" {...weightFill} />
            </g>
            <g className="frame-b">
              <circle cx="16" cy="32" r="3.5" {...head} />
              <path d="M 19 33 L 32 33 L 40 42 L 40 48" {...body} />
              <path d="M 23 33 L 23 10" {...body} /> 
              <line x1="20" y1="10" x2="26" y2="10" {...gear} />
              <rect x="19" y="5" width="2" height="10" {...weightFill} />
              <rect x="25" y="5" width="2" height="10" {...weightFill} />
            </g>
          </>
        )}

        {type === "machine_press" && ( // Chest Press (Seduto, braccia orizzontali)
          <>
            <path d="M 10 15 L 10 45 M 5 45 L 20 45" {...benchLine} fill="none" />
            <g className="frame-a">
              <circle cx="16" cy="20" r="3.5" {...head} />
              <path d="M 14 24 L 14 35 L 25 45" {...body} />
              <path d="M 14 24 L 20 28 L 22 24" {...body} /> {/* Mani al petto */}
              <line x1="22" y1="20" x2="22" y2="28" {...machine} strokeWidth="2" /> {/* Maniglie vicine */}
            </g>
            <g className="frame-b">
              <circle cx="16" cy="20" r="3.5" {...head} />
              <path d="M 14 24 L 14 35 L 25 45" {...body} />
              <path d="M 14 24 L 35 24" {...body} /> {/* Braccia tese avanti */}
              <line x1="35" y1="20" x2="35" y2="28" {...machine} strokeWidth="2" /> {/* Maniglie spinte */}
            </g>
          </>
        )}

        {type === "bench_press_incline_db" && ( // Inclinata Manubri
          <>
            <path d="M 10 45 L 20 45 L 30 20 L 35 20" {...benchLine} fill="none"/>
            <g className="frame-a">
              <circle cx="28" cy="18" r="3.5" {...head} />
              <path d="M 28 22 L 20 42 L 15 42 L 15 48" {...body} />
              <path d="M 25 30 L 30 25 L 25 18" {...body} /> 
              <rect x="22" y="15" width="6" height="4" {...weightFill} />
            </g>
            <g className="frame-b">
              <circle cx="28" cy="18" r="3.5" {...head} />
              <path d="M 28 22 L 20 42 L 15 42 L 15 48" {...body} />
              <path d="M 25 30 L 20 12" {...body} /> 
              <rect x="17" y="10" width="6" height="4" {...weightFill} transform="rotate(-20 20 12)" />
            </g>
          </>
        )}

        {type === "flyes_flat_db" && ( // Croci piana
          <>
             <line x1="20" y1="25" x2="30" y2="25" {...benchLine} strokeWidth="6" />
             <g className="frame-a">
                <circle cx="25" cy="20" r="3.5" {...head} />
                <path d="M 25 24 L 25 45" {...body} />
                <path d="M 25 24 L 10 30 M 25 24 L 40 30" {...body} /> 
                <rect x="8" y="28" width="4" height="6" {...weightFill} />
                <rect x="38" y="28" width="4" height="6" {...weightFill} />
             </g>
             <g className="frame-b">
                <circle cx="25" cy="20" r="3.5" {...head} />
                <path d="M 25 24 L 25 45" {...body} />
                <path d="M 25 24 L 22 10 M 25 24 L 28 10" {...body} /> 
                <rect x="20" y="6" width="4" height="6" {...weightFill} />
                <rect x="26" y="6" width="4" height="6" {...weightFill} />
             </g>
          </>
        )}

        {type === "shoulder_press_db" && ( // Lento Manubri
          <>
            <line x1="15" y1="35" x2="35" y2="35" {...benchLine} />
            <g className="frame-a">
              <circle cx="25" cy="15" r="3.5" {...head} />
              <path d="M 25 19 L 25 35" {...body} /> 
              <path d="M 25 21 L 16 26 L 16 18 M 25 21 L 34 26 L 34 18" {...body} />
              <rect x="14" y="16" width="4" height="6" {...weightFill} />
              <rect x="32" y="16" width="4" height="6" {...weightFill} />
            </g>
            <g className="frame-b">
              <circle cx="25" cy="15" r="3.5" {...head} />
              <path d="M 25 19 L 25 35" {...body} />
              <path d="M 25 21 L 18 6 M 25 21 L 32 6" {...body} />
              <rect x="16" y="2" width="4" height="6" {...weightFill} />
              <rect x="30" y="2" width="4" height="6" {...weightFill} />
            </g>
          </>
        )}

        {type === "lateral_raises_cables" && ( // Alzate Cavi
          <>
            <line x1="5" y1="45" x2="45" y2="45" {...machine} />
            <circle cx="8" cy="45" r="2" fill="#555" /> 
            <circle cx="42" cy="45" r="2" fill="#555" /> 
            <g className="frame-a">
              <circle cx="25" cy="15" r="3.5" {...head} />
              <path d="M 25 19 L 25 45 M 25 45 L 20 45 M 25 45 L 30 45" {...body} />
              <path d="M 25 21 L 22 35 M 25 21 L 28 35" {...body} /> 
              <line x1="8" y1="45" x2="28" y2="35" {...cable} />
              <line x1="42" y1="45" x2="22" y2="35" {...cable} />
            </g>
            <g className="frame-b">
              <circle cx="25" cy="15" r="3.5" {...head} />
              <path d="M 25 19 L 25 45 M 25 45 L 20 45 M 25 45 L 30 45" {...body} />
              <path d="M 25 21 L 10 21 M 25 21 L 40 21" {...body} /> 
              <line x1="8" y1="45" x2="40" y2="21" {...cable} />
              <line x1="42" y1="45" x2="10" y2="21" {...cable} />
            </g>
          </>
        )}

        {type === "tricep_pushdown" && ( // Push Down Corda
          <>
            <line x1="35" y1="5" x2="35" y2="45" {...machine} />
            <circle cx="33" cy="5" r="2" fill="#555" /> 
            <g className="frame-a">
              <circle cx="20" cy="15" r="3.5" {...head} />
              <path d="M 20 19 L 20 35 L 15 45 M 20 35 L 25 45" {...body} />
              <path d="M 20 21 L 25 26 L 30 20" {...body} /> 
              <line x1="33" y1="5" x2="30" y2="20" {...cable} />
            </g>
            <g className="frame-b">
              <circle cx="20" cy="15" r="3.5" {...head} />
              <path d="M 20 19 L 20 35 L 15 45 M 20 35 L 25 45" {...body} />
              <path d="M 20 21 L 25 26 L 30 35" {...body} /> 
              <line x1="33" y1="5" x2="30" y2="35" {...cable} />
            </g>
          </>
        )}

        {/* ================= TIRATA ================= */}
        {type === "pullups" && ( // Trazioni
          <>
            <line x1="5" y1="6" x2="45" y2="6" {...benchLine} strokeWidth="3" />
            <g className="frame-a">
              <circle cx="25" cy="22" r="3.5" {...head} />
              <path d="M 25 26 L 25 40 L 22 48 M 25 40 L 28 48" {...body} />
              <path d="M 25 26 L 15 6 M 25 26 L 35 6" {...body} /> 
            </g>
            <g className="frame-b">
              <circle cx="25" cy="10" r="3.5" {...head} />
              <path d="M 25 14 L 25 30 L 22 35 M 25 30 L 28 35" {...body} />
              <path d="M 25 14 L 15 20 L 15 6 M 25 14 L 35 20 L 35 6" {...body} /> 
            </g>
          </>
        )}

        {type === "barbell_row" && ( // Rematore Bilanciere (piegato in avanti)
          <>
            <g className="frame-a">
              <circle cx="38" cy="18" r="3.5" {...head} />
              <path d="M 35 21 L 20 30 L 20 48 M 20 30 L 25 48" {...body} /> {/* Busto a 45 gradi */}
              <path d="M 32 23 L 35 40" {...body} /> {/* Braccia penzoloni */}
              <line x1="28" y1="40" x2="42" y2="40" {...gear} />
              <circle cx="35" cy="40" r="6" {...weightFill} fill="none" stroke="#e5e5e5" strokeWidth="2" />
            </g>
            <g className="frame-b">
              <circle cx="38" cy="18" r="3.5" {...head} />
              <path d="M 35 21 L 20 30 L 20 48 M 20 30 L 25 48" {...body} />
              <path d="M 32 23 L 40 20 L 30 28" {...body} /> {/* Tirata al petto, gomito dietro */}
              <line x1="23" y1="28" x2="37" y2="28" {...gear} />
              <circle cx="30" cy="28" r="6" {...weightFill} fill="none" stroke="#e5e5e5" strokeWidth="2" />
            </g>
          </>
        )}

        {type === "seated_cable_row" && ( // Pulley Seduto
          <>
             <line x1="10" y1="40" x2="30" y2="40" {...benchLine} />
             <line x1="40" y1="30" x2="40" y2="45" {...machine} />
             <circle cx="38" cy="40" r="2" fill="#555" /> 
             <g className="frame-a">
               <circle cx="20" cy="20" r="3.5" {...head} />
               <path d="M 20 24 L 20 38 L 35 38" {...body} /> 
               <path d="M 20 24 L 35 35" {...body} /> 
               <line x1="38" y1="40" x2="35" y2="35" {...cable} />
             </g>
             <g className="frame-b">
               <circle cx="18" cy="20" r="3.5" {...head} />
               <path d="M 18 24 L 20 38 L 35 38" {...body} /> 
               <path d="M 18 24 L 14 30 L 28 35" {...body} /> 
               <line x1="38" y1="40" x2="28" y2="35" {...cable} />
             </g>
          </>
        )}

        {type === "cable_pullover" && ( // Pullover Cavi (in piedi, puleggia alta)
          <>
            <line x1="10" y1="5" x2="10" y2="45" {...machine} />
            <circle cx="12" cy="5" r="2" fill="#555" /> 
            <g className="frame-a">
              <circle cx="35" cy="15" r="3.5" {...head} />
              <path d="M 35 19 L 35 35 L 30 45 M 35 35 L 40 45" {...body} />
              <path d="M 35 21 L 20 10" {...body} /> {/* Braccia tese verso la puleggia */}
              <line x1="12" y1="5" x2="20" y2="10" {...cable} />
            </g>
            <g className="frame-b">
              <circle cx="35" cy="15" r="3.5" {...head} />
              <path d="M 35 19 L 35 35 L 30 45 M 35 35 L 40 45" {...body} />
              <path d="M 35 21 L 35 38" {...body} /> {/* Braccia spinte dritte in basso */}
              <line x1="12" y1="5" x2="35" y2="38" {...cable} />
            </g>
          </>
        )}

        {type === "barbell_curl" && ( // Curl Bilanciere (in piedi)
          <>
            <g className="frame-a">
              <circle cx="25" cy="10" r="3.5" {...head} />
              <path d="M 25 14 L 25 32 L 25 48 M 25 32 L 28 48" {...body} />
              <path d="M 25 16 L 25 30 L 28 35" {...body} /> 
              <line x1="20" y1="35" x2="36" y2="35" {...gear} />
              <rect x="18" y="32" width="2" height="6" {...weightFill} />
              <rect x="36" y="32" width="2" height="6" {...weightFill} />
            </g>
            <g className="frame-b">
              <circle cx="25" cy="10" r="3.5" {...head} />
              <path d="M 25 14 L 25 32 L 25 48 M 25 32 L 28 48" {...body} />
              <path d="M 25 16 L 25 30 L 32 20" {...body} /> {/* Bilanciere chiuso su */}
              <line x1="24" y1="20" x2="40" y2="20" {...gear} />
              <rect x="22" y="17" width="2" height="6" {...weightFill} />
              <rect x="40" y="17" width="2" height="6" {...weightFill} />
            </g>
          </>
        )}

        {type === "cable_curl" && ( // Curl ai Cavi (puleggia bassa)
          <>
            <line x1="10" y1="5" x2="10" y2="45" {...machine} />
            <circle cx="12" cy="45" r="2" fill="#555" /> 
            <g className="frame-a">
              <circle cx="35" cy="10" r="3.5" {...head} />
              <path d="M 35 14 L 35 32 L 30 48 M 35 32 L 40 48" {...body} />
              <path d="M 35 16 L 35 30 L 25 40" {...body} /> {/* Braccia verso il basso */}
              <line x1="12" y1="45" x2="25" y2="40" {...cable} />
              <line x1="22" y1="40" x2="28" y2="40" {...gear} strokeWidth="3" /> {/* Barra dritta */}
            </g>
            <g className="frame-b">
              <circle cx="35" cy="10" r="3.5" {...head} />
              <path d="M 35 14 L 35 32 L 30 48 M 35 32 L 40 48" {...body} />
              <path d="M 35 16 L 35 30 L 25 20" {...body} /> {/* Braccia chiuse su */}
              <line x1="12" y1="45" x2="25" y2="20" {...cable} />
              <line x1="22" y1="20" x2="28" y2="20" {...gear} strokeWidth="3" />
            </g>
          </>
        )}

        {/* ================= GAMBE ================= */}
        {type === "squat_barbell" && ( // Squat
          <>
            <g className="frame-a">
              <circle cx="25" cy="10" r="3.5" {...head} />
              <path d="M 25 14 L 25 30 L 25 48 M 25 30 L 28 48" {...body} />
              <path d="M 25 15 L 29 19 L 25 13" {...body} />
              <line x1="18" y1="13" x2="32" y2="13" {...gear} />
              <circle cx="25" cy="13" r="5" {...weightFill} fill="none" stroke="#e5e5e5"/>
            </g>
            <g className="frame-b">
              <circle cx="32" cy="24" r="3.5" {...head} />
              <path d="M 32 28 L 20 38 L 26 48 M 20 38 L 16 48" {...body} />
              <path d="M 32 29 L 36 33 L 32 27" {...body} />
              <line x1="25" y1="27" x2="39" y2="27" {...gear} />
              <circle cx="32" cy="27" r="5" {...weightFill} fill="none" stroke="#e5e5e5"/>
            </g>
          </>
        )}

        {type === "hack_squat" && ( // Hack Squat (Macchina inclinata)
          <>
            <line x1="10" y1="45" x2="40" y2="5" {...machine} strokeWidth="4" /> {/* Rotaia diagonale */}
            <g className="frame-a">
              <circle cx="32" cy="10" r="3.5" {...head} />
              <path d="M 30 14 L 23 23 L 23 45 M 23 23 L 28 45" {...body} /> {/* Schiena appoggiata, gambe dritte */}
            </g>
            <g className="frame-b">
              <circle cx="23" cy="22" r="3.5" {...head} />
              <path d="M 21 26 L 14 35 L 23 35 L 23 45 M 14 35 L 28 45" {...body} /> {/* Accosciata sulla pedana */}
            </g>
          </>
        )}

        {type === "leg_press" && ( // Leg Press 45
          <>
            <path d="M 10 30 L 20 45 L 35 45" {...benchLine} fill="none" /> {/* Sedile */}
            <line x1="25" y1="10" x2="45" y2="30" {...machine} strokeWidth="2" /> {/* Binario pressa */}
            <g className="frame-a">
              <circle cx="15" cy="25" r="3.5" {...head} />
              <path d="M 15 28 L 20 45" {...body} /> {/* Schiena appoggiata */}
              <path d="M 20 45 L 22 30 L 30 20" {...body} /> {/* Ginocchia al petto */}
              <line x1="28" y1="15" x2="35" y2="22" {...gear} strokeWidth="3" /> {/* Piastra vicina */}
            </g>
            <g className="frame-b">
              <circle cx="15" cy="25" r="3.5" {...head} />
              <path d="M 15 28 L 20 45" {...body} />
              <path d="M 20 45 L 32 30 L 42 10" {...body} /> {/* Gambe stese a 45 gradi */}
              <line x1="39" y1="5" x2="46" y2="12" {...gear} strokeWidth="3" /> {/* Piastra allontanata */}
            </g>
          </>
        )}

        {type === "leg_extension" && ( // Leg Extension
          <>
            <path d="M 15 20 L 15 35 L 25 35 L 25 45" {...benchLine} fill="none" /> 
            <g className="frame-a">
              <circle cx="10" cy="15" r="3.5" {...head} />
              <path d="M 12 18 L 12 33 L 25 33 L 25 45" {...body} /> 
              <circle cx="27" cy="45" r="3" {...weightFill} /> 
            </g>
            <g className="frame-b">
              <circle cx="10" cy="15" r="3.5" {...head} />
              <path d="M 12 18 L 12 33 L 25 33 L 40 33" {...body} /> 
              <circle cx="40" cy="31" r="3" {...weightFill} /> 
              <path d="M 25 33 L 40 31" {...machine} strokeWidth="1" />
            </g>
          </>
        )}

        {type === "romanian_deadlift" && ( // Stacco Rumeno (Gambe tese/Hinge)
          <>
            <g className="frame-a">
              <circle cx="25" cy="10" r="3.5" {...head} />
              <path d="M 25 14 L 25 30 L 25 48 M 25 30 L 28 48" {...body} /> 
              <path d="M 25 16 L 25 32" {...body} /> 
              <line x1="15" y1="32" x2="35" y2="32" {...gear} />
              <circle cx="25" cy="32" r="6" {...weightFill} fill="none" stroke="#e5e5e5" strokeWidth="2" />
            </g>
            <g className="frame-b">
              <circle cx="35" cy="20" r="3.5" {...head} />
              <path d="M 35 20 L 20 30 L 20 48 M 20 30 L 25 48" {...body} /> {/* Bacino indietro, hinge netto */}
              <path d="M 32 22 L 32 40" {...body} /> {/* Bilanciere scende sotto il ginocchio */}
              <line x1="22" y1="40" x2="42" y2="40" {...gear} />
              <circle cx="32" cy="40" r="6" {...weightFill} fill="none" stroke="#e5e5e5" strokeWidth="2" />
            </g>
          </>
        )}

        {type === "leg_curl_lying" && ( // Leg Curl Sdraiato
          <>
            <line x1="10" y1="35" x2="40" y2="35" {...benchLine} /> 
            <path d="M 40 35 L 45 45" {...machine} />
            <g className="frame-a">
              <circle cx="15" cy="32" r="3.5" {...head} />
              <path d="M 18 34 L 30 34 L 40 34 L 48 34" {...body} /> 
              <circle cx="48" cy="32" r="3" {...weightFill} /> 
            </g>
            <g className="frame-b">
              <circle cx="15" cy="32" r="3.5" {...head} />
              <path d="M 18 34 L 30 34 L 40 34 L 38 18" {...body} /> {/* Ginocchia flesse a 90° */}
              <circle cx="36" cy="18" r="3" {...weightFill} /> 
              <path d="M 40 34 L 36 18" {...machine} strokeWidth="1" /> 
            </g>
          </>
        )}

        {type === "calf_raises" && ( // Polpacci in piedi su rialzo
          <>
            <rect x="20" y="45" width="10" height="5" fill="#555" /> {/* Scalino */}
            <g className="frame-a">
              <circle cx="25" cy="10" r="3.5" {...head} />
              <path d="M 25 14 L 25 30 L 25 45" {...body} /> {/* Talloni giù */}
            </g>
            <g className="frame-b">
              <circle cx="25" cy="6" r="3.5" {...head} />
              <path d="M 25 10 L 25 26 L 27 40 L 22 45" {...body} /> {/* Estensione punte, corpo sollevato */}
            </g>
          </>
        )}

      </svg>
    </div>
  );
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

const infoMisure = {
  peso: { label: "Peso", unit: "kg", desc: "Bilancia a digiuno, mattina post-bagno" },
  petto: { label: "Petto", unit: "cm", desc: "Circonferenza altezza capezzoli, respiro neutro" },
  spalle: { label: "Spalle", unit: "cm", desc: "Circonferenza massima attorno ai deltoidi" },
  braccia: { label: "Braccia", unit: "cm", desc: "Bicipite contratto, punto di massimo picco" },
  gambe: { label: "Gambe", unit: "cm", desc: "Subito sotto il gluteo, punto più largo" },
  glutei: { label: "Glutei", unit: "cm", desc: "Circonferenza massima del bacino" }
};

export default function Home() {
  const [listaAtleti, setListaAtleti] = useState<string[]>(["Leonardo"]);
  const [utente, setUtente] = useState("Leonardo");
  const [isNuovoUtente, setIsNuovoUtente] = useState(false);
  const [nomeNuovoUtente, setNomeNuovoUtente] = useState("");
  
  const [eta, setEta] = useState<number | "">(41);
  const [altezza, setAltezza] = useState<number | "">(175);
  
  const [tipoTurno, setTipoTurno] = useState('spezzato');
  const [inizio1, setInizio1] = useState('');
  const [fine1, setFine1] = useState('');
  const [inizio2, setInizio2] = useState('');
  const [fine2, setFine2] = useState('');
  const [quandoTiAlleni, setQuandoTiAlleni] = useState('sera'); 
  const [fastWorkout, setFastWorkout] = useState(false);

  useEffect(() => {
    if (tipoTurno === 'diretto' && quandoTiAlleni === 'pausa') setQuandoTiAlleni('sera');
  }, [tipoTurno, quandoTiAlleni]);

  const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
  const [giornoCalendario, setGiornoCalendario] = useState("Lunedì"); 
  const [schedaAttiva, setSchedaAttiva] = useState<"Spinta"|"Tirata"|"Gambe">("Spinta"); 
  
  const [eserciziModificati, setEserciziModificati] = useState<Record<string, string>>({});
  const [carichiAttuali, setCarichiAttuali] = useState<Record<string, string[]>>({});
  const [storicoSessioni, setStoricoSessioni] = useState<Array<{ data: string, giorno: string, scheda: string, carichi: Record<string, string>, oraId: number }>>([]);
  const [vistaStorico, setVistaStorico] = useState(false);

  const [modalEsercizio, setModalEsercizio] = useState(false);
  const [esercizioDaCambiare, setEsercizioDaCambiare] = useState({ id: '', nomeAttuale: '', alternative: [] as any[] });

  const [moltiplicatoreCarbo, setMoltiplicatoreCarbo] = useState(5);
  const [biometria, setBiometria] = useState({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '' });
  const [pastiSelezionati, setPastiSelezionati] = useState({ Pasto1: 0, Pasto2: 0, Pasto3: 0, PostWorkout: 0 });
  const [modalAlimento, setModalAlimento] = useState(false);
  const [categoriaDaCambiare, setCategoriaDaCambiare] = useState<keyof typeof dbAlimenti>('Pasto1');

  const [chatLog, setChatLog] = useState<{role: 'user' | 'ai', text: string}[]>([{ role: 'ai', text: 'Ciao! Sono il tuo Coach IA. Chiedimi info sugli esercizi, alternative, o logiche di allenamento.' }]);
  const [inputChat, setInputChat] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAtleti() {
      const { data } = await supabase.from("check_utente").select("nome_utente");
      if (data) {
        const unici = Array.from(new Set(data.map(d => d.nome_utente)));
        if (unici.length > 0) setListaAtleti(unici);
      }
    }
    fetchAtleti();
  }, []);

  useEffect(() => {
    async function caricaDatiUtente() {
      const { data } = await supabase.from("check_utente").select("*").eq("nome_utente", utente).order("data", { ascending: false });
      if (data && data.length > 0) {
        setEta(data[0].eta || "");
        setAltezza(data[0].altezza || "");
        const circ = data[0].circonferenze || {};
        setBiometria({ 
          peso: data[0].peso?.toString() || circ.peso?.toString() || '', 
          petto: circ.petto || '', spalle: circ.spalle || '', braccia: circ.braccia || '', 
          gambe: circ.gambe || '', glutei: circ.glutei || '' 
        });
        if (data[0].peso) setMoltiplicatoreCarbo(5); 
      } else {
        setEta(""); setAltezza(""); setBiometria({ peso: '', petto: '', spalle: '', braccia: '', gambe: '', glutei: '' });
      }
    }
    if (!isNuovoUtente) caricaDatiUtente();
  }, [utente, isNuovoUtente]);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [chatLog]);

  const inviaMessaggioIA = async () => {
    if (!inputChat.trim()) return;
    const msg = inputChat;
    setChatLog(prev => [...prev, { role: 'user', text: msg }]);
    setInputChat("");
    setIsTyping(true);
    try {
      const contesto = `Utente: ${utente}, Peso: ${biometria.peso}kg, Scheda di oggi: ${schedaAttiva}, Turno: ${tipoTurno}, Allenamento: ${quandoTiAlleni}`;
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, context: contesto }) });
      const data = await response.json();
      setChatLog(prev => [...prev, { role: 'ai', text: data.reply || "Errore nella risposta." }]);
    } catch (error) {
      setChatLog(prev => [...prev, { role: 'ai', text: "Errore di connessione con i server Gemini." }]);
    }
    setIsTyping(false);
  };

  const salvaNuovoAtleta = async () => {
    if (nomeNuovoUtente.trim()) {
      const nuovo = nomeNuovoUtente.trim();
      setListaAtleti(prev => [...prev, nuovo]);
      setUtente(nuovo);
      setIsNuovoUtente(false);
      await supabase.from("check_utente").insert([{ nome_utente: nuovo, data: new Date() }]);
    }
  };

  const getUltimoCarico = (idEs: string) => {
    for (let i = storicoSessioni.length - 1; i >= 0; i--) {
      if (storicoSessioni[i].carichi[idEs]) return storicoSessioni[i].carichi[idEs];
    }
    return '0';
  };

  const getNumeroSet = (fase: string) => {
    if (fase.includes('Fase 1')) return fastWorkout ? 3 : 4;
    return fastWorkout ? 2 : 3;
  };

  const updateCaricoSet = (idEs: string, indexSet: number, valore: string) => {
    setCarichiAttuali(prev => {
      const arrayCorrente = prev[idEs] ? [...prev[idEs]] : Array(5).fill("");
      arrayCorrente[indexSet] = valore;
      return { ...prev, [idEs]: arrayCorrente };
    });
  };

  const salvaSessione = async () => {
    if (Object.keys(carichiAttuali).length === 0) return alert("Inserisci almeno un carico in un set!");
    
    const sessioneCarichiStr: Record<string, string> = {};
    Object.keys(carichiAttuali).forEach(k => {
      const pesiValidi = carichiAttuali[k].filter(v => v !== "");
      if(pesiValidi.length > 0) sessioneCarichiStr[k] = pesiValidi.join(" | ");
    });

    const nuovaSessione = { data: new Date().toLocaleDateString('it-IT'), oraId: Date.now(), giorno: giornoCalendario, scheda: schedaAttiva, carichi: sessioneCarichiStr };
    setStoricoSessioni([...storicoSessioni, nuovaSessione]);
    setCarichiAttuali({}); 
    await supabase.from("storico_allenamenti").insert([{ nome_utente: utente, giornata: `${giornoCalendario} - ${schedaAttiva}`, dettagli_esercizi: sessioneCarichiStr, data: new Date() }]);
    alert(`Sessione salvata nel cloud per ${utente}. Monitoraggio fatica registrato.`);
  };

  const apriSwapEsercizio = (es: any) => { setEsercizioDaCambiare({ id: es.id, nomeAttuale: eserciziModificati[es.id] || es.nome, alternative: es.alternative }); setModalEsercizio(true); };
  const confermaSwapEsercizio = (nuovoNome: string) => { setEserciziModificati({ ...eserciziModificati, [esercizioDaCambiare.id]: nuovoNome }); setModalEsercizio(false); };
  const apriSwapAlimento = (categoria: string) => { setCategoriaDaCambiare(categoria as keyof typeof dbAlimenti); setModalAlimento(true); };
  const confermaSwapAlimento = (index: number) => { setPastiSelezionati({ ...pastiSelezionati, [categoriaDaCambiare]: index }); setModalAlimento(false); };
  const aggiornaBiometria = (campo: string, valore: string) => { setBiometria({ ...biometria, [campo]: valore }); };

  const valutaCheckFisico = async () => {
    const { peso, petto, spalle, braccia, gambe, glutei } = biometria;
    if (peso && eta && altezza && petto && spalle && braccia && gambe && glutei) {
      let alertMsg = "Analisi completata. Trend muscolare positivo confermato. Setup macronutrienti ottimale.";
      if (Number(peso) > 80 && Number(braccia) < 38) {
         setMoltiplicatoreCarbo(4);
         alertMsg = "Attenzione: aumento di peso senza incremento volumi target (Braccia/Petto). Carboidrati ridotti (4g/kg) per arginare grasso.";
      } else {
         setMoltiplicatoreCarbo(6);
         alertMsg = "Volume in stallo. L'algoritmo ha alzato i carboidrati a 6g/kg per forzare la crescita muscolare.";
      }
      await supabase.from("check_utente").insert([{ nome_utente: utente, eta: Number(eta), altezza: Number(altezza), peso: Number(peso), circonferenze: biometria, data: new Date() }]);
      alert(alertMsg);
    } else {
      alert("Compila TUTTI i campi fisici per calcolare i macros in sicurezza.");
    }
  };

  const generaTimelineDieta = (): Array<{ isIntra?: boolean; titolo?: string; descrizione?: string; idCategoria?: string; titoloUI?: string }> => {
    const bloccoIntra = { isIntra: true, titolo: "Intra-Workout", descrizione: "Ciclodestrine (40g) + EAA (10g) + Creatina (5g)" };
    if (quandoTiAlleni === 'mattina') return [ bloccoIntra, { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Mattina)' }, { idCategoria: 'Pasto1', titoloUI: 'Pranzo / Pasto 1' }, { idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' }, { idCategoria: 'Pasto3', titoloUI: 'Pre-nanna / Pasto 3' }];
    if (quandoTiAlleni === 'pausa') return [ { idCategoria: 'Pasto1', titoloUI: 'Colazione' }, bloccoIntra, { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Fine Pausa)' }, { idCategoria: 'Pasto2', titoloUI: 'Cena / Pasto 2' }, { idCategoria: 'Pasto3', titoloUI: 'Pre-nanna / Pasto 3' }];
    return [ { idCategoria: 'Pasto1', titoloUI: 'Colazione' }, { idCategoria: 'Pasto2', titoloUI: 'Pranzo' }, { idCategoria: 'Pasto3', titoloUI: 'Spuntino Pre-Turno/Pre-Workout' }, bloccoIntra, { idCategoria: 'PostWorkout', titoloUI: 'Post-Workout (Sera)' } ];
  };

  const calcolaTempoScheda = () => fastWorkout ? 45 : 75;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 lg:p-6 font-sans overflow-x-hidden">
      
      <header className="mb-6 border-b border-orange-500/30 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase text-orange-500">
            Protocollo Anti-Secco <span className="text-white">Pro</span>
          </h1>
          <p className="text-sm text-neutral-400 font-medium tracking-wide">Tracking Carichi & Timing Nutrizionale</p>
        </div>
        
        <div className="flex flex-col w-full sm:w-64 border border-neutral-700 bg-neutral-900 p-2 rounded-lg shadow-lg">
          <label className="text-[10px] text-orange-400 font-bold uppercase mb-1">Atleta Attivo (Caricamento DB):</label>
          {isNuovoUtente ? (
            <div className="flex gap-2">
              <input type="text" placeholder="Nome..." value={nomeNuovoUtente} onChange={(e) => setNomeNuovoUtente(e.target.value)} className="bg-neutral-950 text-white text-sm p-1.5 rounded outline-none w-full border border-neutral-600 focus:border-orange-500" />
              <button onClick={salvaNuovoAtleta} className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-3 rounded transition-all">Salva</button>
              <button onClick={() => setIsNuovoUtente(false)} className="bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-bold px-2 rounded">X</button>
            </div>
          ) : (
            <select value={utente} onChange={(e) => { if(e.target.value === "NUOVO") setIsNuovoUtente(true); else setUtente(e.target.value); }} className="bg-neutral-950 text-white text-sm font-bold p-1.5 rounded outline-none border border-neutral-800 cursor-pointer w-full focus:border-orange-500">
              {listaAtleti.map(a => <option key={a} value={a}>{a}</option>)}
              <option value="NUOVO" className="text-orange-500 font-bold">+ Aggiungi Nuovo Atleta</option>
            </select>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLONNA 1: TURNI E ALIMENTAZIONE */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-2">
              <h2 className="text-lg font-bold text-white">Gestione Tempo (Incastro Turni)</h2>
              <select value={tipoTurno} onChange={(e) => setTipoTurno(e.target.value)} className="bg-neutral-950 text-xs text-orange-500 p-2 rounded border border-neutral-700 outline-none focus:border-orange-500">
                <option value="diretto">Turno Diretto</option>
                <option value="spezzato">Turno Spezzato</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                <span className="text-xs text-blue-400 uppercase font-bold mb-2 block">{tipoTurno === 'diretto' ? 'Orario Continuato' : 'Mattina (Lavoro)'}</span>
                <div className="flex space-x-2">
                  <input type="time" value={inizio1} onChange={(e) => setInizio1(e.target.value)} className="w-1/2 bg-transparent text-sm border-b border-neutral-700 text-white p-1 outline-none focus:border-orange-500" />
                  <input type="time" value={fine1} onChange={(e) => setFine1(e.target.value)} className="w-1/2 bg-transparent text-sm border-b border-neutral-700 text-white p-1 outline-none focus:border-orange-500" />
                </div>
              </div>
              {tipoTurno === 'spezzato' && (
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                  <span className="text-xs text-blue-400 uppercase font-bold mb-2 block">Pomeriggio (Lavoro)</span>
                  <div className="flex space-x-2">
                    <input type="time" value={inizio2} onChange={(e) => setInizio2(e.target.value)} className="w-1/2 bg-transparent text-sm border-b border-neutral-700 text-white p-1 outline-none focus:border-orange-500" />
                    <input type="time" value={fine2} onChange={(e) => setFine2(e.target.value)} className="w-1/2 bg-transparent text-sm border-b border-neutral-700 text-white p-1 outline-none focus:border-orange-500" />
                  </div>
                </div>
              )}
              <div className="mt-4 border-t border-neutral-700 pt-4">
                <span className="text-xs text-neutral-400 uppercase font-bold mb-2 block">Collocazione Allenamento:</span>
                <div className="flex space-x-2">
                  <button onClick={() => setQuandoTiAlleni('mattina')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${quandoTiAlleni === 'mattina' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>Mattina</button>
                  {tipoTurno === 'spezzato' && <button onClick={() => setQuandoTiAlleni('pausa')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${quandoTiAlleni === 'pausa' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>Pausa Lavoro</button>}
                  <button onClick={() => setQuandoTiAlleni('sera')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded ${quandoTiAlleni === 'sera' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>Sera</button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center border-b border-neutral-700 pb-2 mb-4">
              <h2 className="text-lg font-bold text-white">Timeline Nutrizionale</h2>
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${moltiplicatoreCarbo > 5 ? 'bg-orange-600 text-white animate-pulse' : 'bg-neutral-800 text-neutral-400'}`}>
                {moltiplicatoreCarbo}g CHO/Kg (Macro Adattati)
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
                const cat = blocco.idCategoria as keyof typeof dbAlimenti;
                const isPW = cat === 'PostWorkout';
                const itemScelto = dbAlimenti[cat]?.[pastiSelezionati[cat]] || {nome:"", baseCarbo:0, pro:"", fat:""};
                return (
                  <div key={`${cat}-${idx}`} className={`p-3 rounded-lg border ${isPW ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-neutral-950 border-neutral-800'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isPW ? 'text-emerald-500' : 'text-blue-400'}`}>{blocco.titoloUI}</span>
                      <button onClick={() => apriSwapAlimento(cat)} className="text-[10px] bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded font-bold uppercase text-neutral-300">Swap</button>
                    </div>
                    <p className="font-semibold text-[13px] text-white leading-tight">{itemScelto.nome}</p>
                    <p className="text-[11px] text-neutral-400 font-mono mt-1">CHO: <span className="text-orange-400 font-bold">{itemScelto.baseCarbo * moltiplicatoreCarbo}g</span> | PRO: {itemScelto.pro} | FAT: {itemScelto.fat}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* COLONNA 2: ALLENAMENTO FLESSIBILE CON TRACKING SET & SVG */}
        <section className="lg:col-span-5 bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-3">
            <h2 className="text-lg font-bold text-white">Allenamento Modulabile</h2>
            <button onClick={() => setVistaStorico(!vistaStorico)} className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-md ${vistaStorico ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-300'}`}>
              {vistaStorico ? 'Torna al Workout' : 'Storico Sessioni'}
            </button>
          </div>

          {!vistaStorico ? (
            <>
              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 mb-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Tempo Stimato Sessione</span>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    ⏱️ ~{calcolaTempoScheda()} minuti <span className="text-[9px] text-neutral-400 font-normal">(Incluso recupero)</span>
                  </p>
                </div>
                <button onClick={() => setFastWorkout(!fastWorkout)} className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-lg transition-all ${fastWorkout ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-neutral-800 text-neutral-400 border border-neutral-700'}`}>
                  {fastWorkout ? '⚡ Fast Mode Attiva' : 'Taglia Tempi'}
                </button>
              </div>

              <div className="mb-4">
                <div className="flex gap-2">
                  {['Spinta', 'Tirata', 'Gambe'].map((sch) => (
                    <button key={sch} onClick={() => setSchedaAttiva(sch as any)} className={`px-3 py-2 text-xs font-bold rounded-md flex-1 ${schedaAttiva === sch ? 'bg-orange-600 text-white shadow-lg' : 'bg-neutral-950 text-neutral-500 border border-neutral-800'}`}>
                      {sch.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-4" style={{ maxHeight: "50vh" }}>
                {dbAllenamento[schedaAttiva].esercizi.map((es) => {
                  const nomeVis = eserciziModificati[es.id] || es.nome;
                  const ultimoCarico = getUltimoCarico(es.id);
                  const numeroSetTarget = getNumeroSet(es.fase);
                  
                  const phaseColor = es.fase.includes('Fase 1') ? '#f97316' : (es.fase.includes('Fase 2') ? '#3b82f6' : '#ef4444');
                  const animType = mapEsercizioToAnimazione[es.id] || "squat_barbell"; 
                  
                  return (
                    <div key={es.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 relative group overflow-hidden">
                      <div className={`absolute top-0 left-0 w-1 h-full`} style={{backgroundColor: phaseColor}}></div>
                      <div className="pl-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase font-black tracking-widest" style={{color: phaseColor}}>{es.fase}</span>
                          <button onClick={() => apriSwapEsercizio(es)} className="text-[10px] bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded font-bold uppercase text-neutral-400">Swap</button>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2">
                          {/* COMPONENTE STICKMAN SVG INTEGRATO E ANIMATO */}
                          <SvgVisualizer type={animType} color={phaseColor} />
                          
                          <div className="flex-1">
                            <h3 className="font-bold text-sm text-white break-words">{nomeVis}</h3>
                            <p className="text-[11px] text-neutral-400 italic break-words mt-1">{es.dettaglio}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-2">
                          <p className={`text-[10px] font-bold px-2 py-1 rounded border w-fit ${fastWorkout ? 'bg-red-950 text-red-400 border-red-900' : 'bg-neutral-900 text-neutral-300 border-neutral-700'}`}>{numeroSetTarget} Serie | {fastWorkout ? "Rec. Breve" : "Rec. Pieno"}</p>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-neutral-800">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] uppercase font-bold text-neutral-500">Target Ultima: <span className="text-orange-400">{ultimoCarico ? `${ultimoCarico} kg` : '-'}</span></span>
                            <span className="text-[9px] uppercase font-bold text-neutral-500">Curva di Fatica (kg)</span>
                          </div>
                          
                          <div className="flex gap-2">
                            {Array.from({ length: numeroSetTarget }).map((_, i) => (
                              <div key={i} className="flex-1">
                                <label className="text-[8px] text-neutral-500 uppercase block text-center mb-1">Set {i+1}</label>
                                <input 
                                  type="number" 
                                  value={carichiAttuali[es.id]?.[i] || ''}
                                  onChange={(e) => updateCaricoSet(es.id, i, e.target.value)}
                                  className="w-full bg-neutral-900 border border-orange-500/30 p-2 rounded text-xs text-center text-white font-bold outline-none focus:border-orange-500 transition-colors" 
                                  placeholder="-"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-700">
                <button onClick={salvaSessione} className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest text-sm rounded-lg active:scale-95 transition-all">
                  Concludi e Salva Database
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
                    <div className="space-y-2 text-xs">
                      {Object.entries(sess.carichi).map(([idEs, pesoStr]) => (
                        <div key={idEs} className="bg-neutral-900 p-2 rounded flex justify-between items-center gap-2">
                          <span className="text-neutral-400 truncate flex-1">{eserciziModificati[idEs] || Object.values(dbAllenamento).flatMap(d=>d.esercizi).find(e=>e.id===idEs)?.nome}</span>
                          <span className="font-bold text-white whitespace-nowrap bg-neutral-950 px-2 py-1 rounded border border-neutral-800">{pesoStr} kg</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        {/* COLONNA 3: TELEMETRIA E CHAT */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          
          <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-4 border-b border-neutral-700 pb-2 text-white">Telemetria Fisica (DB)</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800 col-span-2 flex gap-2">
                    <div className="flex-1">
                        <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Età</label>
                        <input type="number" value={eta} onChange={(e) => setEta(Number(e.target.value))} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
                    </div>
                    <div className="flex-1 border-l border-neutral-800 pl-2">
                        <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Altezza (cm)</label>
                        <input type="number" value={altezza} onChange={(e) => setAltezza(Number(e.target.value))} className="w-full bg-transparent text-sm font-bold text-white outline-none" />
                    </div>
                </div>
                
                {Object.keys(infoMisure).map((chiave) => {
                  const info = infoMisure[chiave as keyof typeof infoMisure];
                  return (
                    <div key={chiave} className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 group relative">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-neutral-400 uppercase font-bold">{info.label}</label>
                        <span className="text-[9px] text-neutral-600 font-mono">{info.unit}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/* @ts-ignore */}
                        <input type="number" value={biometria[chiave]} onChange={(e) => aggiornaBiometria(chiave, e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none focus:text-orange-500" placeholder="0" />
                      </div>
                      
                      <div className="absolute left-0 -bottom-8 bg-neutral-800 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 w-[150%] pointer-events-none shadow-xl border border-neutral-700">
                        {info.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={valutaCheckFisico} className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-lg">Analizza Trend & Salva</button>
            </div>
          </section>

          {/* SEZIONE CHAT GEMINI */}
          <section className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl shadow-lg flex-1 flex flex-col min-h-[350px]">
            <h2 className="text-base font-bold text-white border-b border-neutral-700 pb-2 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Coach IA (Gemini)
            </h2>
            
            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-neutral-950 rounded-lg border border-neutral-800 mb-3">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className={`text-[9px] uppercase font-bold mb-1 ${msg.role === 'user' ? 'text-neutral-500 pr-1' : 'text-orange-500 pl-1'}`}>
                    {msg.role === 'user' ? utente : 'Coach IA'}
                  </span>
                  <div className={`p-2.5 rounded-xl text-xs leading-relaxed max-w-[90%] ${msg.role === 'user' ? 'bg-neutral-800 text-white rounded-br-sm' : 'bg-orange-950/40 border border-orange-900/50 text-neutral-200 rounded-bl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-orange-500 font-mono pl-2 animate-pulse">Analisi in corso...</div>}
              <div ref={chatEndRef} />
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputChat} 
                onChange={e => setInputChat(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && inviaMessaggioIA()}
                placeholder="Chiedi supporto al Coach..."
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-orange-500"
              />
              <button onClick={inviaMessaggioIA} disabled={isTyping} className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-3 py-2 rounded-lg text-xs transition-all disabled:opacity-50">
                Invia
              </button>
            </div>
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
              {esercizioDaCambiare.alternative.map((alt, i) => (
                <button key={i} onClick={() => confermaSwapEsercizio(alt.nome)} className="w-full text-left p-4 bg-neutral-950 border border-neutral-800 rounded-lg hover:border-orange-500/50 group transition-all">
                  <p className="font-bold text-sm text-white group-hover:text-orange-400">{alt.nome}</p>
                  <p className="text-[10px] text-neutral-500 mt-1 uppercase font-bold">{alt.note} - Rispetta asse e tensione</p>
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
            <div className="space-y-3">
              {/* @ts-ignore */}
              {dbAlimenti[categoriaDaCambiare].map((alt, i) => (
                <button key={i} onClick={() => confermaSwapAlimento(i)} className="w-full text-left p-4 bg-neutral-950 border border-neutral-800 rounded-lg hover:border-emerald-500/50 group transition-all">
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
