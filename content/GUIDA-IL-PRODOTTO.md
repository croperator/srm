# Guida alla generazione dei contenuti di "Il prodotto"

Questa guida definisce i capisaldi per creare, aggiornare e verificare i contenuti
della sezione **Il prodotto** della pagina principale.

## 1. Sorgenti e responsabilità

- `content/prodotto.js` contiene l'elenco e l'ordine dei contenuti.
- `content/translations.js` contiene le traduzioni inglesi del sito.
- `js/prodotto-showcase.js` genera filtri, schede e viewer.
- `js/i18n.js` gestisce lingua, fallback, persistenza e traduzione del DOM.
- `index.html` contiene struttura e stile responsive della sezione.
- `assets/img/` contiene immagini e screenshot.
- `assets/video/` contiene i video riproducibili dal browser.

Per aggiungere un contenuto ordinario è sufficiente:

1. preparare il media;
2. salvarlo nella cartella corretta;
3. aggiungere l'oggetto in italiano a `window.PRODOTTO_CONTENT`;
4. aggiungere titolo, descrizione ed etichette inglesi a
   `content/translations.js`.

Non modificare il renderer o l'HTML se il nuovo contenuto usa uno dei formati già
supportati.

## Multilingua obbligatorio

Ogni nuovo testo mostrato nel sito deve essere disponibile in **italiano** e
**inglese**. L'italiano è la lingua sorgente e il fallback; l'inglese è
registrato nel dizionario condiviso.

Il selettore IT/EN:

- è generato automaticamente da `js/i18n.js`;
- conserva la scelta in `localStorage`;
- applica la lingua alle altre pagine e alla roadmap incorporata;
- aggiorna `lang` sull'elemento HTML;
- traduce anche contenuti creati dinamicamente e attributi accessibili.

Per ogni testo italiano aggiunto a `content/prodotto.js`, aggiungere la coppia
corrispondente nell'array `en` di `content/translations.js`:

```js
[
  "Titolo della funzionalità",
  "Feature title"
],
[
  "Descrizione italiana completa.",
  "Complete English description."
]
```

La stringa italiana nel dizionario deve coincidere esattamente con quella usata
nel contenuto, inclusi apostrofi, accenti e punteggiatura.

Non inserire entrambe le lingue nella stessa scheda e non creare campi paralleli
come `titleEn` o `descEn`: il dizionario condiviso evita duplicazioni nel
renderer e permette di aggiungere altre lingue in modo scalabile.

## 2. Principi editoriali

Ogni contenuto deve descrivere una funzionalità osservabile, non una promessa
generica.

### Titolo

- Breve, specifico e comprensibile senza contesto aggiuntivo.
- Preferire la forma `funzione + scopo`, ad esempio:
  `Briefing AI sullo stato della rete`.
- Evitare nomi di file, sigle non spiegate e formule promozionali.
- Usare una terminologia coerente con il prodotto: `Control Room`,
  `assistente AI`, `corsa`, `linea`, `severity`.

### Descrizione

La descrizione deve chiarire, quando applicabile:

1. **chi** avvia o utilizza la funzione;
2. **cosa** fa il sistema;
3. **quali dati** vengono analizzati o mostrati;
4. **quale risultato operativo** viene prodotto;
5. **quale beneficio concreto** ottiene l'operatore.

Struttura consigliata:

> L'operatore avvia [...]. Il sistema analizza [...], produce [...] e supporta
> la Control Room nel [...]. 

La descrizione deve derivare da ciò che è realmente visibile nel media. Non
dedurre capacità non mostrate e non introdurre numeri, soglie o automazioni non
verificabili.

## 3. Categorie ammesse

Usare esclusivamente uno degli identificativi seguenti:

| Identificativo | Etichetta |
|---|---|
| `realtime` | Circolazione real-time |
| `operations` | Gestione operativa |
| `ground-onboard` | Comunicazione terra-bordo |
| `mobile` | App mobile |
| `analytics` | KPI e analisi |
| `ai` | Intelligenza artificiale |
| `skills` | Gestione competenze |
| `platform` | Piattaforma e configurazione |

Se serve una nuova categoria, aggiungerla anche all'elenco `categories` in
`js/prodotto-showcase.js`. Non creare varianti ortografiche dello stesso
identificativo.

## 4. Tipi di contenuto

### Immagine singola

```js
{
  title: "Titolo della funzionalità",
  category: "realtime",
  desc: "Descrizione della funzionalità e del suo valore operativo.",
  type: "image",
  src: "assets/img/nome-file.jpg"
}
```

### Video

```js
{
  title: "Titolo della funzionalità",
  category: "ai",
  desc: "Descrizione del flusso mostrato nel video.",
  type: "video",
  src: "assets/video/nome-file.mp4"
}
```

### Gruppo di immagini

Usare un gruppo quando più schermate descrivono fasi o viste della stessa
funzionalità.

```js
{
  title: "Titolo della funzionalità",
  category: "operations",
  desc: "Descrizione complessiva del flusso.",
  type: "group",
  items: [
    { label: "Prima fase", src: "assets/img/prima-fase.jpg" },
    { label: "Seconda fase", src: "assets/img/seconda-fase.jpg" }
  ]
}
```

Le etichette degli elementi devono descrivere la differenza tra le schermate,
non ripetere il titolo principale.

## 5. Regole per immagini e video

### Nomi dei file

- Usare lettere minuscole, numeri, trattini o underscore.
- Evitare spazi, accenti e caratteri speciali.
- Scegliere nomi descrittivi e stabili.

### Immagini

- Formati consigliati: JPG per schermate fotografiche, PNG quando serve
  preservare testo o trasparenza.
- Rimuovere dati personali, credenziali e informazioni riservate.
- Verificare che il testo principale resti leggibile nel viewer.
- Non alterare le proporzioni originali.

### Video

- Il file pubblicato e referenziato deve essere **MP4 con video H.264 e audio
  AAC**, per garantire la compatibilità con i browser.
- Non collegare direttamente file MKV: il browser può restituire un errore di
  formato anche quando i codec interni sono compatibili.
- Se l'MKV contiene già H.264 e AAC, convertirlo in MP4 senza ricodifica:

```powershell
ffmpeg -i assets\video\nome-file.mkv -map 0 -c copy -movflags +faststart assets\video\nome-file.mp4
```

- Conservare l'originale solo se serve come sorgente; il sito deve puntare
  sempre alla versione MP4.
- Il flag `+faststart` permette al browser di avviare prima la riproduzione.

## 6. Capisaldi per i contenuti AI

Un contenuto della categoria `ai` deve mostrare chiaramente il contributo
dell'intelligenza artificiale al processo. La descrizione deve distinguere:

- input dell'operatore o dati analizzati;
- elaborazione svolta dall'AI;
- risultato presentato;
- decisione o attività supportata.

Esempi già adottati:

- triage di segnalazioni con analisi dei log, severity e gruppo di assegnazione;
- briefing sullo stato della rete con criticità e azioni suggerite;
- ricerca e apertura contestuale di tutorial tramite assistente.

Evitare espressioni assolute come "decide automaticamente" se il flusso mostra
invece un supporto alla decisione dell'operatore.

## 7. Ordine e coerenza del catalogo

- La posizione dell'oggetto in `PRODOTTO_CONTENT` determina l'ordine nella
  categoria.
- Raggruppare contenuti affini e ordinare un flusso dalla funzione generale agli
  approfondimenti.
- Non duplicare la stessa funzionalità per mostrare più screenshot: usare
  `type: "group"`.
- Il conteggio delle funzionalità e il filtro `Tutte` sono generati
  automaticamente.

## 8. Responsive e viewer

Il contenuto deve funzionare nei profili già previsti:

| Viewport di riferimento | Catalogo |
|---|---|
| Mobile fino a 600 px | 1 colonna |
| Tablet fino a 900 px | 2 colonne |
| Desktop 1366 x 768 | 3 colonne, profilo verticale compatto |
| Full HD 1920 x 1080 | 4 colonne |
| 4K 3840 x 2160 | 6 colonne |

Nel viewer:

- immagini e video devono usare l'area disponibile senza essere tagliati;
- il rapporto originale deve essere preservato con comportamento `contain`;
- titolo, descrizione, controlli e anteprime devono restare nel viewport;
- la chiusura deve funzionare con pulsante, click sullo sfondo e tasto `Esc`;
- per i gruppi devono funzionare frecce, tastiera, swipe e anteprime.

Non aggiungere al singolo contenuto dimensioni fisse o stili inline per
correggere un media specifico.

## 9. Accessibilità

- Il titolo deve produrre un nome accessibile univoco per la scheda.
- Le immagini singole ricevono automaticamente un testo alternativo nel viewer.
- Ogni elemento di un gruppo deve avere una `label` significativa.
- I video devono mantenere i controlli nativi.
- Non comunicare severity o stato soltanto tramite colore nel media o nei
  contenuti futuri.
- Verificare navigazione da tastiera e ripristino del focus alla chiusura.

## 10. Checklist prima della consegna

### Contenuto

- [ ] Titolo breve, specifico e coerente con il lessico SRM.
- [ ] Descrizione aderente a ciò che il media mostra.
- [ ] Titolo e descrizione presenti in italiano e in inglese.
- [ ] Traduzione inglese registrata in `content/translations.js`.
- [ ] Nessuna stringa italiana residua quando il sito è impostato su EN.
- [ ] Categoria esistente e scritta correttamente.
- [ ] Tipo coerente con la struttura dell'oggetto.
- [ ] Percorso del media corretto e relativo alla root del sito.
- [ ] Nessun dato sensibile nel media.

### Media

- [ ] Immagine leggibile e senza deformazioni.
- [ ] Video in MP4/H.264/AAC e non referenziato come MKV.
- [ ] Video con metadati caricabili e controlli funzionanti.
- [ ] Media interamente visibile nel viewer.

### Verifica tecnica

- [ ] `node --check content\prodotto.js`
- [ ] `node --check content\translations.js`
- [ ] `node --check js\prodotto-showcase.js`
- [ ] `node --check js\i18n.js`
- [ ] `git diff --check`
- [ ] Scheda presente nel filtro corretto.
- [ ] Conteggio della categoria aggiornato automaticamente.
- [ ] Cambio IT → EN e EN → IT funzionante.
- [ ] Lingua conservata navigando tra le pagine.
- [ ] Titoli, descrizioni, pulsanti e attributi accessibili tradotti.
- [ ] Apertura e chiusura del viewer funzionanti.
- [ ] Nessun overflow orizzontale.
- [ ] Controllo almeno a 1366 x 768, 1920 x 1080 e su mobile.

## 11. Cose da non fare

- Non inserire HTML nella descrizione: il renderer usa testo semplice.
- Non aggiungere un testo italiano senza la relativa traduzione inglese.
- Non inserire testi inglesi direttamente nell'HTML o in `prodotto.js`.
- Non duplicare dizionari o selettori lingua nelle singole pagine.
- Non usare URL assoluti o percorsi locali del computer.
- Non aggiungere una nuova categoria modificando soltanto `prodotto.js`.
- Non puntare il sito a un file MKV.
- Non duplicare logica del viewer per un contenuto particolare.
- Non modificare breakpoint e layout per compensare un media preparato male.
- Non descrivere funzionalità che non siano osservabili o confermate.
