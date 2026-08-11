// Contenuti della roadmap (metro-srm.html).
//
// - phases: le fasi del progetto, in ordine, disegnate come colonne collegate dalla dorsale.
//     id     identificatore univoco della fase (usato da stations e per collegare le dipendenze)
//     badge  etichetta breve (es. "Fase 2")
//     title  titolo esteso della fase
//     when   periodo (es. "T3 2026")
//     color  colore della fase in esadecimale, usato per dorsale, box e nodi
//
// - stations: le attivita di ciascuna fase, indicizzate per id fase. Ogni attivita ha:
//     title   titolo (usato anche per collegare le dipendenze in "deps")
//     short   sottotitolo breve mostrato vicino al titolo
//     tags    elenco di etichette libere mostrate nel tooltip
//     status  "done", "wip" oppure "" (pianificata)
//     desc    descrizione estesa mostrata nel tooltip
//
// - deps: elenco di dipendenze tra attivita, come coppie [da, a] (per titolo).
//     Disegnate come frecce tratteggiate solo quando tutte le fasi sono aperte.

window.ROADMAP_CONTENT = {
  phases: [
  { id: "f0", badge: "Fase 0", title: "Progettazione e Realizzazione SRM per Trenord", when: "T1-T2 2026", color: "#0f8a66" },
  { id: "now", badge: "Fase 1", title: "Core operativo", when: "T2 2026", color: "#2563a8" },
  { id: "f2", badge: "Fase 2", title: "Assessment Architetturale", when: "T3 2026 · da lug", color: "#1d4e89" },
  { id: "f3", badge: "Fase 3", title: "Progettazione modello rete e composizione", when: "T3 2026 · da lug", color: "#92610f" },
  { id: "f31", badge: "Fase 3.1", title: "Strumenti Evoluti", when: "T3 2026 · da lug", color: "#b9711a" },
  { id: "f32", badge: "Fase 3.2", title: "Realizzazione modello rete e composizione", when: "T3 2026 · da lug", color: "#cf8a28" },
  { id: "f33", badge: "Fase 3.3", title: "Assessment applicativo sui progetti", when: "T3 2026 · da lug", color: "#e0a63f" },
  { id: "f5", badge: "Fase 5", title: "Applicazione Mobile", when: "T4 2026", color: "#c2410c" },
  { id: "f51", badge: "Fase 5.1", title: "Applicazione Mobile — evoluzioni", when: "T4 2026", color: "#c2410c" },
  { id: "f4", badge: "Fase 4", title: "Regia, gestione operativa, console e porting", when: "T4 2026", color: "#9333a8" },
  { id: "ai", badge: "Fase 6", title: "AI assistant - ampliamento", when: "T1 2027", color: "#6d4ad1" },
  { id: "tbd", badge: "Fase TBD", title: "Da definire", when: "TBD", color: "#6b7280" }
  ],

  stations: {
    "f0": [
    { title: "SRM per Trenord", short: "Progettazione e realizzazione", tags: ["fondamenta"], status: "done",
      desc: "Progettazione e realizzazione della base SRM per Trenord (T1-T2 2026)." }
    ],

    "now": [
    { title: "Home page", short: "Dashboard personalizzabile", tags: ["nuovo FE/BE"], status: "done",
      desc: "Dashboard operativa personalizzabile con layout configurabile." },
    { title: "Mappa corse live", short: "Mezzi real-time", tags: ["realtime", "filtri", "interscambi"], status: "done",
      desc: "Posizionamento real-time dei mezzi. Filtri per linea e modalità, interscambi e dettaglio punti." },
    { title: "Andamenti manuali", short: "Eventi non automatici", tags: ["nuovo FE/BE"], status: "done",
      desc: "Inserimento manuale di eventi non coperti dalle sorgenti automatiche." },
    { title: "Lista Operational Event", short: "Eventi operativi", tags: [], status: "done",
      desc: "Lista degli operational event." },
    { title: "Avvio integrazione SKM", short: "Integrazione SKM", tags: ["integrazione"], status: "done",
      desc: "Avvio delle attività di integrazione con SKM." },
    { title: "Lista Notice", short: "Notice", tags: [], status: "done",
      desc: "Lista notice." },
    { title: "Ricerca Corsa Mappa", short: "Ricerca su mappa", tags: [], status: "done",
      desc: "Ricerca corsa sulla mappa." },
    { title: "Scheda Corsa", short: "Dettaglio corsa", tags: ["SchedaCorsa"], status: "done",
      desc: "Dettaglio corsa: tabella di marcia, provvedimenti, avvisi, note, localizzazioni, messaggi." },
    { title: "Nuovo ambiente", short: "DB Postgres, split MOOVA", tags: ["infrastruttura", "postgres"], status: "wip",
      desc: "Attivazione nuovo ambiente di sviluppo con DB Postgres. Avvio separazione da MOOVA." }
    ],

    "f2": [
    { title: "Deploy nuovo ambiente", short: "Deploy", tags: [], status: "",
      desc: "Deploy sul nuovo ambiente." },
    { title: "Solution Assessment", short: "& Cybersecurity Compliance", tags: [], status: "",
      desc: "Solution assessment e cybersecurity compliance." },
    { title: "SAST e DAST", short: "Security testing", tags: ["cybersecurity", "SAST", "DAST"], status: "",
      desc: "SAST (Static Application Security Testing) analizza codice sorgente, bytecode o binari senza eseguirli, cercando vulnerabilita note come SQL injection, XSS, hardcoded secrets e buffer overflow. Si esegue presto nel ciclo di sviluppo (shift-left); puo produrre falsi positivi e non rileva vulnerabilita di runtime o configurazione. DAST (Dynamic Application Security Testing) testa l applicazione in esecuzione dall esterno, sondando endpoint HTTP, form e API come farebbe un attaccante. Rileva problemi di runtime, autenticazione e configurazione; richiede un ambiente deployato, la copertura dipende dai percorsi raggiunti e non indica la riga di codice." },
    { title: "Def. strumenti monitoraggio", short: "Monitoraggio", tags: [], status: "",
      desc: "Definizione strumenti di monitoraggio." },
    { title: "Integrazione Foundation", short: "Foundation", tags: [], status: "",
      desc: "Integrazione Foundation." },
    { title: "Lotta all'indipendenza", short: "Autonomia da MOOVA", tags: [], status: "",
      desc: "Lotta all'indipendenza." }
    ],

    "f3": [
    { title: "Analisi standard rete", short: "GeoJSON/GTFS/NeTEx/SIRI", tags: ["analisi", "prerequisito"], status: "done",
      desc: "Studio comparativo degli standard. Scelta del formato di import." },
    { title: "Import GeoJSON/GTFS", short: "Ingestione topologia", tags: ["network MS", "BE"], status: "done",
      desc: "Pipeline di ingestione della topologia di rete." },
    { title: "Prog. modello rete", short: "Modello dati di rete", tags: ["progettazione", "network MS"], status: "wip",
      desc: "Progettazione del modello dati di rete: topologia, linee, fermate, relazioni." },
    { title: "Prog. hub interscambio", short: "Hub multimodali", tags: ["progettazione", "network MS"], status: "wip",
      desc: "Progettazione degli hub multimodali. Connessioni tra modalità." },
    { title: "Prog. corrispondenze", short: "Coincidenze su hub", tags: ["progettazione", "servicerunmonitoring"], status: "wip",
      desc: "Progettazione del tracciamento coincidenze su hub." },
    { title: "Prog. composizione", short: "Materiale rotabile", tags: ["progettazione", "anagrafica"], status: "done",
      desc: "Progettazione della configurazione materiale rotabile per corsa." },
    { title: "Mockup Coinc. Tabella", short: "Mockup", tags: [], status: "wip",
      desc: "Mockup coincidenze in vista tabella." },
    { title: "Mockup Coinc. Mappa", short: "Mockup", tags: [], status: "wip",
      desc: "Mockup coincidenze in vista mappa." }
    ],

    "f31": [
    { title: "Prog. Smart Workflow Mgr", short: "Checklist configurabili", tags: ["nuovo FE/BE", "configurabile"], status: "wip",
      desc: "Progettazione Smart Workflow Manager: task riutilizzabili come checklist. Template admin, item con severità/criticità, allegati come evidenza." },
    { title: "Applicazione - Notifiche", short: "Notifiche", tags: [], status: "wip",
      desc: "Notifiche applicazione." },
    { title: "Tutorial AI", short: "Onboarding", tags: [], status: "wip",
      desc: "Tutorial AI." },
    { title: "Linearizzata multimodale", short: "Vista linearizzata", tags: [], status: "wip",
      desc: "Vista linearizzata multimodale." },
    { title: "Invio Ticket", short: "Segnalazioni dallo strumento", tags: ["ticketing"], status: "wip",
      desc: "Apertura e invio di segnalazioni (ticket) direttamente dallo strumento operativo." },
    { title: "Processo di Triage", short: "Smistamento segnalazioni", tags: ["triage", "troubleshooting"], status: "wip",
      desc: "Smistamento automatico delle segnalazioni verso il canale di risoluzione corretto." }
    ],

    "f32": [
    { title: "Real. modello rete", short: "Implementazione rete", tags: ["network MS", "BE"], status: "",
      desc: "Implementazione del modello dati di rete progettato in fase 3." },
    { title: "Real. hub interscambio", short: "Implementazione hub", tags: ["network MS", "FE/BE"], status: "",
      desc: "Implementazione degli hub multimodali e connessioni tra modalità." },
    { title: "Real. corrispondenze", short: "Coincidenze real-time", tags: ["servicerunmonitoring", "real-time"], status: "",
      desc: "Implementazione del tracciamento real-time delle coincidenze su hub." },
    { title: "Real. composizione", short: "Composizione materiali", tags: ["nuovo FE/BE", "anagrafica"], status: "wip",
      desc: "Implementazione della gestione composizione materiale rotabile per corsa." }
    ],

    "f33": [
    { title: "Superset", short: "Analytics engine", tags: ["analytics"], status: "",
      desc: "Valutazione e integrazione di Apache Superset." },
    { title: "KPI Dashboard", short: "Indicatori di servizio", tags: ["KPI"], status: "",
      desc: "Dashboard di indicatori chiave di prestazione del servizio." }
    ],

    "f4": [
    { title: "Regia linee + bordo", short: "Operatori, voce, app bordo", tags: ["srm-operator-management", "srm-voice-gateway", "app bordo"], status: "",
      desc: "Blocco unico: assegnazione 1:1 linea-operatore, riduzione in morbida, failover supervisore. Voce PTT/VoIP, comunicazioni bordo-terra, app bordo, turnazione materiale." },
    { title: "Variazione Gest. Operativa", short: "Variazioni operative", tags: ["gestione operativa"], status: "",
      desc: "Gestione delle variazioni operative." },
    { title: "Monitoraggio Costi", short: "Costi di esercizio", tags: ["costi"], status: "",
      desc: "Monitoraggio dei costi di esercizio." },
    { title: "Handover", short: "Passaggio consegne (porting)", tags: ["porting", "nuovo MS", "FE/BE"], status: "",
      desc: "Porting passaggio consegne sul nuovo MS SRM. Analisi delta old → new." },
    { title: "Contratto di Servizio", short: "Con Authority", tags: ["soglie"], status: "",
      desc: "Creazione, modifiche, monitoraggio e rendicontazione dei contratti di servizio con authority." }
    ],

    "f5": [
    { title: "Porting App AS IS", short: "Funzioni Trenord attuali", tags: ["porting", "app"], status: "",
      desc: "Porting delle funzionalità ad oggi disponibili per Trenord, con attestazione e invio localizzazioni e percorso." }
    ],

    "f51": [
    { title: "Sistema di terra + App", short: "Deviazioni, KM, attestazione", tags: ["app", "sistema terra"], status: "",
      desc: "Estensione capabilities app: deviazioni, attestazione SRM, calcolo KM, invio andamenti, attestazione automatica. Estensione sistema di terra." },
    { title: "Altre capabilities App", short: "Lista/dettaglio corsa, alert", tags: ["app", "alert"], status: "",
      desc: "Lista corsa, dettaglio corsa (percorso tabellare e grafico, materiale, crew), alert." }
    ],

    "ai": [
    { title: "AI · Info corsa", short: "Chat read-only", tags: ["AI", "tool calling", "RAG"], status: "",
      desc: "Chat contestuale con tool calling read-only su servicerunmonitoring. Ingresso più sicuro." },
    { title: "AI · Report via mail", short: "Generazione + invio", tags: ["AI", "generazione", "notifiche"], status: "",
      desc: "Generazione report corsa e invio e-mail. Richiede SMTP e template." },
    { title: "AI · Crea scorta", short: "Azione write + HITL", tags: ["AI", "agentic", "human-in-loop"], status: "",
      desc: "Azione operativa in linguaggio naturale con write access. Human-in-the-loop obbligatorio." },
    { title: "AI · Checklist auto", short: "Azioni automatiche", tags: ["AI", "agentic", "action"], status: "",
      desc: "Automatismi AI con azioni automatiche sui task del workflow manager." }
    ],

    "tbd": [
    { title: "Da definire", short: "Voci future", tags: [], status: "",
      desc: "Elementi ancora da definire." }
    ]
  },

  deps: [
    // ["Analisi standard rete", "Import GeoJSON/GTFS"],
    // ["Import GeoJSON/GTFS", "Prog. modello rete"],
    // ["Prog. modello rete", "Prog. hub interscambio"],
    // ["Prog. hub interscambio", "Prog. corrispondenze"],
    // ["Prog. corrispondenze", "Mockup Coinc. Tabella"],
    // ["Prog. corrispondenze", "Mockup Coinc. Mappa"],
    ["Nuovo ambiente", "Deploy nuovo ambiente"]
    // ["Prog. modello rete", "Real. modello rete"],
    // ["Prog. hub interscambio", "Real. hub interscambio"],
    // ["Prog. corrispondenze", "Real. corrispondenze"],
    // ["Prog. composizione", "Real. composizione"],
    // ["Superset", "KPI Dashboard"],
    // ["Prog. Smart Workflow Mgr", "AI · Checklist auto"],
    // ["AI · Info corsa", "AI · Report via mail"],
    // ["AI · Info corsa", "AI · Crea scorta"]
  ]
};
