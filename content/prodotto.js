// Contenuti della sezione "Il prodotto" (index.html).
//
// Per aggiungere una nuova voce:
//  1. metti il file immagine in assets/img/ (jpg/png) oppure il video in assets/video/ (mp4)
//  2. aggiungi un oggetto a questo elenco, nella posizione in cui vuoi che compaia
//
// Tipi supportati:
//  - "image": { title, desc, type:"image", src }
//  - "video": { title, desc, type:"video", src }
//  - "group": { title, desc, type:"group", items:[ { label, src }, ... ] }  -> più immagini nella stessa voce
//
// Nessun'altra modifica al sito è necessaria: la voce compare in automatico
// nell'elenco a sinistra della sezione "Il prodotto".

window.PRODOTTO_CONTENT = [
  {
    title: "Mappa di rete real-time",
    desc: "Posizionamento live dei mezzi su mappa con KPI di esercizio in tempo reale: puntualità, corse soppresse, corse in circolazione, coincidenze a rischio, occupazione. 219 linee, 1000 fermate, sorgenti GTFS / NeTEx / geoJSON.",
    type: "image",
    src: "assets/img/mappa-rete.jpg"
  },
  {
    title: "Ricerca corsa sempre disponibile",
    desc: "Ricerca di una corsa per numero sempre accessibile: quando più corse corrispondono, il sistema propone la lista (linea e modalità) per scegliere quale visualizzare.",
    type: "image",
    src: "assets/img/ricerca-corsa.jpg"
  },
  {
    title: "Zoom sulla corsa selezionata",
    desc: "Selezionando una corsa la mappa fa zoom sul punto in cui si trova, con pannello di dettaglio: stato, origine, fermata attuale, destinazione, materiale, personale, avvisi e note.",
    type: "image",
    src: "assets/img/zoom-corsa-selezionata.jpg"
  },
  {
    title: "Linearizzata — vista sulle coincidenze",
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
    desc: "Percorso guidato che supporta l'operatore nella scoperta della rete e delle funzionalità della Control Room, con informazioni contestuali, riepiloghi e navigazione flessibile tra i contenuti.",
    type: "image",
    src: "assets/img/tutorial-interattivo.jpg"
  },
  {
    title: "Note e avvisi",
    desc: "Registro unificato di note e avvisi con tipo, categoria, titolo, destinatario e stato (bozza / aperto / pubblicato), collegati a corsa, linea o fermata.",
    type: "image",
    src: "assets/img/note-avvisi.jpg"
  },
  {
    title: "Allarmi operativi",
    desc: "Vista centralizzata degli allarmi con conteggio per tipologia e accesso immediato al dettaglio. Evidenzia eventi come mancata partenza dal capolinea, mancata partenza e mancato arrivo alle fermate intermedie, facilitando il monitoraggio e gli interventi tempestivi.",
    type: "image",
    src: "assets/img/allarmi-operativi.jpg"
  },
  {
    title: "KPI",
    desc: "Dashboard interattiva con i principali indicatori di esercizio sulla finestra temporale selezionata, tra cui corse rilevate, passeggeri a bordo, corse critiche e occupazione media. Grafici e trend consentono di monitorare l'andamento del servizio nelle ultime 6, 12 o 24 ore.",
    type: "image",
    src: "assets/img/kpi.jpg"
  },
  {
    title: "KPI con drill-down per linea",
    desc: "Dalla vista aggregata dei KPI è possibile approfondire il dettaglio per singola linea, analizzando indicatori come l'occupazione media, ordinabili per valore e direzione. Un semplice click consente di visualizzare l'andamento della linea nel tempo e individuarne rapidamente criticità e trend.",
    type: "image",
    src: "assets/img/kpi-drilldown-linea.jpg"
  },
  {
    title: "Scheda corsa",
    desc: "Vista completa della corsa con informazioni operative e di monitoraggio: tabella di marcia con orari previsti ed effettivi, dati di carico e affollamento, personale e materiale assegnati, avvisi, note e dettagli utili per l'analisi e la gestione del servizio.",
    type: "image",
    src: "assets/img/scheda-corsa.jpg"
  },
  {
    title: "Scheda corsa — percorso su mappa",
    desc: "Dalla scheda corsa è possibile visualizzare il tracciato geografico del servizio, confrontando percorso e fermate pianificate con quelle effettivamente rilevate. Una legenda dedicata facilita l'interpretazione delle informazioni e l'individuazione di eventuali scostamenti.",
    type: "image",
    src: "assets/img/scheda-corsa-mappa.jpg"
  },
  {
    title: "Scorte — macchina a stati",
    desc: "Gestione veicoli di scorta con ciclo di stati (richiesta → assegnazione → autista → conferma), punto e tempo di attesa.",
    type: "image",
    src: "assets/img/scorte-macchina-stati.jpg"
  },
  {
    title: "Anagrafica materiale rotabile",
    desc: "Registro bus con telaio, vettore, classe emissioni, capienza, PMR e omologazioni. Alert su dati incompleti.",
    type: "image",
    src: "assets/img/anagrafica-materiale.jpg"
  },
  {
    title: "Rubrica operativa",
    desc: "Contatti per azienda con validità temporale. Migliaia di record, ricerca e import/export.",
    type: "image",
    src: "assets/img/rubrica-operativa.jpg"
  },
  {
    title: "Configurazioni",
    desc: "Pannello admin a riquadri: tipi anagrafica, tipi notice con gravità, destinatari, ruoli. Catalogo configurabile a runtime.",
    type: "image",
    src: "assets/img/configurazioni.jpg"
  },
  {
    title: "Dizionario multilingua",
    desc: "Wizard a 5 step: lingue, aree, namespace, label, traduzioni. Localizzazione gestita dal sistema.",
    type: "image",
    src: "assets/img/dizionario-multilingua.jpg"
  },
  {
    title: "Attestazione alla corsa",
    desc: "L'autista o il macchinista si attesta sulla corsa assegnata, creando l'associazione tra materiale rotabile, corsa e personale in servizio.",
    type: "video",
    src: "assets/video/attestazione.mp4"
  },
  {
    title: "Notifiche terra-bordo",
    desc: "Canale di comunicazione bidirezionale terra-bordo basato su notifiche e allarmi, per informare tempestivamente il personale in servizio.",
    type: "video",
    src: "assets/video/notifiche.mp4"
  },
  {
    title: "Andamenti e localizzazioni in tempo reale",
    desc: "Il sistema riceve le localizzazioni GPS dei mezzi in tempo reale e ne deduce automaticamente il passaggio alle fermate pianificate.",
    type: "video",
    src: "assets/video/andamenti-localizzazioni.mp4"
  }
];
