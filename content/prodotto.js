// Contenuti della sezione "Il prodotto" (index.html).
//
// Per aggiungere una nuova voce:
//  1. metti il file immagine in assets/img/ (jpg/png) oppure il video in assets/video/ (mp4)
//  2. aggiungi un oggetto a questo elenco, nella posizione in cui vuoi che compaia
//
// Tipi supportati:
//  - "image": { title, desc, category, type:"image", src }
//  - "video": { title, desc, category, type:"video", src }
//  - "group": { title, desc, category, type:"group", items:[ { label, src }, ... ] }  -> più immagini nella stessa voce
//
// Nessun'altra modifica al sito è necessaria: la voce compare in automatico
// nel catalogo della sezione "Il prodotto".

window.PRODOTTO_CONTENT = [
  {
    title: "Mappa di rete real-time",
    category: "realtime",
    desc: "Posizionamento live dei mezzi su mappa con KPI di esercizio in tempo reale: puntualità, corse soppresse, corse in circolazione, coincidenze a rischio, occupazione. 219 linee, 1000 fermate, sorgenti GTFS / NeTEx / geoJSON.",
    type: "image",
    src: "assets/img/mappa-rete.jpg"
  },
  {
    title: "Ricerca e focus sulla corsa",
    category: "realtime",
    desc: "Ricerca sempre disponibile per numero corsa, con scelta tra i risultati corrispondenti. Selezionando una corsa, la mappa si focalizza sulla sua posizione e apre il pannello con stato, percorso, materiale, personale, avvisi e note.",
    type: "group",
    items: [
      { label: "Ricerca della corsa", src: "assets/img/ricerca-corsa.jpg" },
      { label: "Focus e dettaglio", src: "assets/img/zoom-corsa-selezionata.jpg" }
    ]
  },
  {
    title: "Linearizzata — vista sulle coincidenze",
    category: "realtime",
    desc: "Vista schematica delle linee e dei loro interscambi. Tre funzioni: scelta e ordinamento delle linee, visualizzazione linearizzata, e dettaglio degli hub di interscambio multimodale.",
    type: "group",
    items: [
      { label: "Scelta delle linee", src: "assets/img/linee-scelta.jpg" },
      { label: "Visualizzazione linee", src: "assets/img/linee-visualizzazione.jpg" },
      { label: "Hub di interscambio", src: "assets/img/linee-hub-interscambio.jpg" }
    ]
  },
  {
    title: "Tutorial interattivo",
    category: "platform",
    desc: "Percorso guidato che supporta l'operatore nella scoperta della rete e delle funzionalità della Control Room, con informazioni contestuali, riepiloghi e navigazione flessibile tra i contenuti.",
    type: "image",
    src: "assets/img/tutorial-interattivo.jpg"
  },
  {
    title: "Note e avvisi",
    category: "operations",
    desc: "Registro unificato di note e avvisi con tipo, categoria, titolo, destinatario e stato (bozza / aperto / pubblicato), collegati a corsa, linea o fermata.",
    type: "image",
    src: "assets/img/note-avvisi.jpg"
  },
  {
    title: "Allarmi operativi",
    category: "operations",
    desc: "Vista centralizzata degli allarmi con conteggio per tipologia e accesso immediato al dettaglio. Evidenzia eventi come mancata partenza dal capolinea, mancata partenza e mancato arrivo alle fermate intermedie, facilitando il monitoraggio e gli interventi tempestivi.",
    type: "image",
    src: "assets/img/allarmi-operativi.jpg"
  },
  {
    title: "KPI",
    category: "analytics",
    desc: "Dashboard interattiva con i principali indicatori di esercizio sulla finestra temporale selezionata, tra cui corse rilevate, passeggeri a bordo, corse critiche e occupazione media. Grafici e trend consentono di monitorare l'andamento del servizio nelle ultime 6, 12 o 24 ore.",
    type: "image",
    src: "assets/img/kpi.jpg"
  },
  {
    title: "KPI con drill-down per linea",
    category: "analytics",
    desc: "Dalla vista aggregata dei KPI è possibile approfondire il dettaglio per singola linea, analizzando indicatori come l'occupazione media, ordinabili per valore e direzione. Un semplice click consente di visualizzare l'andamento della linea nel tempo e individuarne rapidamente criticità e trend.",
    type: "image",
    src: "assets/img/kpi-drilldown-linea.jpg"
  },
  {
    title: "SKILL Maintenance — gestione delle competenze",
    category: "skills",
    desc: "Il modulo supporta il mantenimento delle competenze del personale ferroviario e automobilistico. Riunisce abilitazioni e qualifiche su mezzi, linee e impianti, visite mediche, valutazioni degli istruttori, squadre e continuità operativa, con storico e alert configurabili. Integrato con l'ecosistema MOOVA e i sistemi aziendali, utilizza dati HR, turni, servizi e rete; offre profilazione puntuale, import massivi, monitoraggio dei processi e report Excel, con possibilità di firma digitale.",
    type: "image",
    src: "assets/img/skill-gestione-competenze.png"
  },
  {
    title: "SKILL Maintenance — agenda e valutazioni",
    category: "skills",
    desc: "L'istruttore verifica lo stato delle competenze della squadra e registra colloqui, affiancamenti, letture zona e valutazioni sulle competenze configurate. Le attività possono sanare situazioni negative, restano consultabili nello storico e sono disponibili anche in una vista a calendario.",
    type: "image",
    src: "assets/img/skill-agenda-valutazioni.png"
  },  
  {
    title: "SKILL Maintenance — squadra dell'istruttore",
    category: "skills",
    desc: "L'istruttore crea e gestisce la propria squadra di agenti, anche appartenenti a impianti diversi, per verificarne le competenze e monitorare scadenze professionali e sanitarie. L'associazione rispetta area e tipologia del titolo abilitativo; anche l'istruttore deve possedere qualifiche valide e coerenti con quelle che è autorizzato a valutare.",
    type: "image",
    src: "assets/img/skill-squadra-istruttore.png"
  },
  {
    title: "SKILL Maintenance— titoli e qualifiche",
    category: "skills",
    desc: "Per ogni agente è possibile associare e aggiornare il titolo abilitativo per area, definire qualifiche su linee, impianti e veicoli e gestirne lo stato mediante attivazione, sospensione o revoca. Il sistema produce il Certificato Complementare secondo gli standard europei previsti dal D.Lgs. 247.",
    type: "image",
    src: "assets/img/skill-titoli-qualifiche.png"
  },
  {
    title: "SKILL Maintenance —scadenziario sanitario",
    category: "skills",
    desc: "Lo scadenziario monitora visite, esiti e revisioni del personale impiegato in sicurezza di esercizio. Un algoritmo configurabile calcola la prossima visita secondo le normative aziendali e gli alert cromatici evidenziano l'avvicinarsi delle scadenze; lo storico conserva visite fisiche, psicologiche, revisioni e controlli.",
    type: "image",
    src: "assets/img/skill-scadenziario-sanitario.png"
  },
  {
    title: "SKILL Maintenance — integrazioni aziendali",
    category: "skills",
    desc: "Adapter e API protette integrano SKILL Maintenance con sistemi HR, IVU Crew, turnazione, firma digitale e piattaforme LMS. Sono previsti scambio bidirezionale delle anagrafiche, trasferimento continuo di qualifiche e autorizzazioni validate, import Excel per licenze, visite e continuità operativa e funzioni manuali per accompagnare l'avvio delle integrazioni.",
    type: "image",
    src: "assets/img/skill-integrazioni-aziendali.png"
  },
  {
    title: "Scheda corsa",
    category: "realtime",
    desc: "Vista completa della corsa con informazioni operative e di monitoraggio: tabella di marcia con orari previsti ed effettivi, dati di carico e affollamento, personale e materiale assegnati, avvisi, note e dettagli utili per l'analisi e la gestione del servizio.",
    type: "image",
    src: "assets/img/scheda-corsa.jpg"
  },
  {
    title: "Scheda corsa — percorso su mappa",
    category: "realtime",
    desc: "Dalla scheda corsa è possibile visualizzare il tracciato geografico del servizio, confrontando percorso e fermate pianificate con quelle effettivamente rilevate. Una legenda dedicata facilita l'interpretazione delle informazioni e l'individuazione di eventuali scostamenti.",
    type: "image",
    src: "assets/img/scheda-corsa-mappa.jpg"
  },
  {
    title: "Scorte — macchina a stati",
    category: "operations",
    desc: "Gestione veicoli di scorta con ciclo di stati (richiesta → assegnazione → autista → conferma), punto e tempo di attesa.",
    type: "image",
    src: "assets/img/scorte-macchina-stati.jpg"
  },
  {
    title: "Anagrafica materiale rotabile",
    category: "platform",
    desc: "Registro bus con telaio, vettore, classe emissioni, capienza, PMR e omologazioni. Alert su dati incompleti.",
    type: "image",
    src: "assets/img/anagrafica-materiale.jpg"
  },
  {
    title: "Rubrica operativa",
    category: "platform",
    desc: "Contatti per azienda con validità temporale. Migliaia di record, ricerca e import/export.",
    type: "image",
    src: "assets/img/rubrica-operativa.jpg"
  },
  {
    title: "Configurazioni",
    category: "platform",
    desc: "Pannello admin a riquadri: tipi anagrafica, tipi notice con gravità, destinatari, ruoli. Catalogo configurabile a runtime.",
    type: "image",
    src: "assets/img/configurazioni.jpg"
  },
  {
    title: "Dizionario multilingua",
    category: "platform",
    desc: "Wizard a 5 step: lingue, aree, namespace, label, traduzioni. Localizzazione gestita dal sistema.",
    type: "image",
    src: "assets/img/dizionario-multilingua.jpg"
  },
  {
    title: "Attestazione alla corsa",
    category: "operations",
    desc: "L'autista o il macchinista si attesta sulla corsa assegnata, creando l'associazione tra materiale rotabile, corsa e personale in servizio.",
    type: "video",
    src: "assets/video/attestazione.mp4"
  },
  {
    title: "Notifiche terra-bordo",
    category: "operations",
    desc: "Canale di comunicazione bidirezionale terra-bordo basato su notifiche e allarmi, per informare tempestivamente il personale in servizio.",
    type: "video",
    src: "assets/video/notifiche.mp4"
  },
  {
    title: "Andamenti e localizzazioni in tempo reale",
    category: "realtime",
    desc: "Il sistema riceve le localizzazioni GPS dei mezzi in tempo reale e ne deduce automaticamente il passaggio alle fermate pianificate.",
    type: "video",
    src: "assets/video/andamenti-localizzazioni.mp4"
  }
];
