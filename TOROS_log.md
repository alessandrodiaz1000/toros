# TOROS_log

Log di decisioni e mappa del progetto per chi (umano o worker Claude) deve modificare questo sito.
Letto automaticamente come contesto a ogni run dei Jarvis Workers (alias "toros"). Aggiungere in
fondo una voce a ogni modifica reale: data, cosa, perché.

## Cos'è

Sito vetrina della squadra di calcio amatoriale **Toros** (fondata nel 2024). Obiettivo primario:
vetrina della **squadra** (identità, storia, foto, calendario). Gli **sponsor** sono un effetto
secondario, NON il main goal: la sezione sponsor va tenuta sobria, niente trattamento "da hero".
Lingua: **italiano**. Identità: bianco/nero + accento **oro** (`--gold: #c8a866`), logo toro
stilizzato.

## Stack e hosting

- **Statico puro**: HTML + CSS + un piccolo `script.js`. NESSUN framework, NESSUN build step.
  Si modifica direttamente e si apre in browser.
- **Hosting**: GitHub Pages, branch `main`, root. URL: https://alessandrodiaz1000.github.io/toros/
  Il deploy è automatico al push/merge su `main` (Pages si rigenera da sola, ~10s). Nessuno script
  di deploy custom.

## Mappa file

- `index.html` — pagina unica (hero + 6 sezioni: chi-siamo, squadra, numeri, calendario, sponsor,
  contatti). Ogni punto ancora da riempire ha un commento HTML sopra che spiega cosa fare, oppure
  `data-placeholder="true"` sul valore segnaposto (mostrato sbiadito nel sito).
- `style.css` — tutti gli stili. Variabili colore in `:root`. Font: Bebas Neue (titoli, tutto
  maiuscolo) + Inter (testo), caricati da Google Fonts.
- `script.js` — solo vanilla JS: reveal delle sezioni allo scroll (IntersectionObserver), stato
  attivo nella navbar, toggle del menu mobile. Niente dipendenze.
- `assets/hero.jpg` — SOLO sfondo fumo della hero (1536x711, derivato dal mockup generato in
  chat, ma con logo/"TOROS"/scroll rimossi via inpainting: rimangono solo le pieghe di fumo).
  Usata come `background: cover` di `.hero`. Logo, h1 "TOROS", divider e scroll-indicator sono
  invece elementi HTML veri (vedi `index.html`, header `#top`), centrati sopra con flexbox.
  Per cambiare lo sfondo hero basta sostituire questo file (deve restare senza testo/logo
  dentro, altrimenti si ripete il problema della nitidezza, vedi storico 2026-06-28).
- `assets/logo.svg` — logo ufficiale (toro stilizzato, bianco, pensato per sfondo scuro).
- `assets/logo-placeholder.svg` — vecchio segnaposto, non più usato in pagina.
- `assets/team/` — foto reali: `team-1.jpg` (squadra), `match-1.jpg`, `match-2.jpg` (partite).
  Le altre 3 caselle della griglia squadra sono ancora `.ph-card` placeholder.
- `assets/docs/` — qui va `media-kit.pdf` quando esisterà (oggi il link è un mailto).

## Come fare le modifiche più comuni

- **Aggiungere foto squadra**: metti il file in `assets/team/`, poi nella sezione `#squadra`
  sostituisci un `<div class="ph-card">...</div>` con
  `<img class="gallery-img" src="assets/team/NOME.jpg" alt="...">`.
- **Numeri** (`#numeri`): cambia il testo dentro ogni `<span class="stat-value">` e togli
  l'attributo `data-placeholder`.
- **Calendario** (`#calendario`): aggiungi righe `<tr>` nella `<tbody>` della `.match-table`.
- **Pacchetti sponsor** (`#sponsor`): nomi/prezzi/benefit sono indicativi (Bronze/Silver/Gold),
  da sostituire con l'offerta reale.
- **Social** (footer): sostituisci gli `href="#"` con i link reali, o rimuovi le voci non usate.

## Stato attuale

- Fatto: hero con sfondo fumo fotografico (`assets/hero.jpg`, senza testo dentro) + logo
  (`assets/logo.svg`, con glow leggero via CSS drop-shadow), "TOROS" in Bebas Neue e scroll
  indicator come elementi HTML reali sopra, sempre nitidi a qualsiasi risoluzione; navbar
  fissa con accento oro, sezioni editoriali numerate, logo + 3 foto reali in galleria; sezione
  "Chi siamo" con sfondo a tutta larghezza (`assets/2nd_page.png`, da aggiungere) e tagline oro.
- Da riempire con dati reali: numeri, calendario, prezzi sponsor, link social, eventuale media kit.

## Storico decisioni

- 2026-06-28 — Creato il sito (scaffold statico) e aggiunto ai Jarvis Workers (alias "toros").
- 2026-06-28 — Aggiunte sezioni numeri/calendario/sponsor/social/media-kit pronte per i contenuti.
- 2026-06-28 — Riequilibrato: la squadra è il focus, lo sponsor diventa sezione sobria (richiesta
  di Ale: il sito è vetrina della squadra, gli sponsor sono solo un effetto).
- 2026-06-28 — Upgrade visivo (tipografia, animazioni allo scroll, hover) e poi redesign completo
  su tema scuro premium + accento oro, ispirato a un mockup di riferimento fornito da Ale.
- 2026-06-28 — Integrati logo e foto reali della squadra.
- 2026-06-28 — Hero resa più fedele al mockup: logo più grande, font Oswald sottile, fumo SVG.
- 2026-06-28 — Aggiunto questo TOROS_log.
- 2026-06-28 — Fumo hero rifatto: da alone dietro al logo a texture piena a tutto schermo.
  In puro SVG (feTurbulence come bump map + feDiffuseLighting a luce radente = effetto
  tessuto/fumo scuro del mockup), con maschera radiale che sfuma i bordi nel nero e bloom
  centrale dietro al logo (style.css: .smoke::before mask + .smoke::after).
- 2026-06-28 — Per arrivare davvero vicino al mockup, abbandonato il fumo procedurale SVG
  (resta sempre troppo "pulito"/grigio) e passato a una TEXTURE rasterizzata generata da
  noi: `assets/make_smoke.py` (numpy: rumore frattale anisotropo + domain warp + lighting
  radente + vignetta/bloom cotti) produce `assets/hero-smoke.jpg`, usata come background
  di `.hero`. Niente immagini di terzi (zero problemi di licenza). Tolto tutto il blocco
  SVG smoke da index.html e le regole `.smoke*` da style.css.
- 2026-06-28 — Anche la texture procedurale non eguagliava le "pieghe/dune" del mockup
  (il mockup e' di fatto seta nera fotografata). Decisione di Ale: usare DIRETTAMENTE
  l'immagine del mockup (generata in chat, niente problemi di copyright, sito non
  commerciale). Hero ora = `assets/hero.jpg` a tutto schermo; logo/TOROS/scroll sono dentro
  l'immagine (non cliccabili, scelta voluta). Rimossi `assets/hero-smoke.jpg` e
  `assets/make_smoke.py` (non piu' usati). Tolti dall'HTML logo/h1/claim/scroll della hero,
  lasciato un `h1.visually-hidden` per SEO. Per cambiare la hero: sostituire `assets/hero.jpg`.
- 2026-06-28 — Richiesta di Ale: il fumo va bene ma logo e "TOROS" nella hero erano sgranati
  (erano pixel raster a 1536x711 stirati a tutto schermo, JPEG). Risolto separando di nuovo i
  due livelli: con uno script Python (numpy/scipy/PIL, mask su pixel chiari + inpainting via
  nearest-neighbor fill + blur + feather sui bordi) rimossi logo/"TOROS"/scroll da
  `assets/hero.jpg`, che resta SOLO sfondo fumo. Sopra, rimessi come elementi HTML veri:
  `<img class="hero-logo" src="assets/logo.svg">` (SVG vettoriale), `<h1>TOROS</h1>` (font
  reale Oswald), `.hero-divider`, `.scroll-indicator` (le regole CSS esistevano già, erano
  dead code da quando si era passati all'immagine unica). `.hero` torna a centratura flexbox
  + `background: url(assets/hero.jpg) center/cover`. Risultato: logo e testo nitidi a qualsiasi
  risoluzione/zoom, fumo invariato (resta lievemente morbido, voluto). Verificato con
  screenshot headless Chrome desktop e mobile (375px), nessuna regressione. File originale con
  logo/testo "stampati" salvato fuori dal repo come backup locale, non versionato.
- 2026-06-28 — Dopo il punto precedente, Ale ha notato che il logo restava sgranato anche da
  solo (il problema non era solo l'immagine hero): `assets/logo.svg` era sì un vettore, ma
  generato per autotrace da un raster di partenza low-res, quindi i contorni (corna comprese)
  erano centinaia di micro-segmenti dritti ("a scalini") invece di curve. Fix: rasterizzato
  `logo.svg` ad alta risoluzione (3240x1884, via Chrome headless), applicato un leggero blur
  gaussiano (sigma 12px) per fondere gli scalini, poi re-tracciato con `potrace` (installato
  via brew) che ricostruisce curve bezier smussate mantenendo gli angoli netti veri (tacca a V,
  punte del diamante) grazie alla corner-detection. Confrontati piu' valori di sigma (6/12/20/30)
  e di alphamax: sigma 12 era il punto giusto, smussa gli scalini senza arrotondare gli angoli
  voluti. Sostituito `assets/logo.svg` col risultato (stesso viewBox concettuale, stesso
  disegno, solo contorni lisci). Backup del vecchio file fuori dal repo, non versionato.
  Verificato a navbar-size e hero-size via screenshot: nitido a entrambe le scale.
- 2026-06-28 — Ale ha segnalato che logo/testo/scroll non erano centrati, e chiesto il logo
  più grande. Trovate e corrette tre cause indipendenti (misurato con screenshot + script
  Python che trova il centro dei pixel chiari, non solo "a occhio"):
  1) `assets/logo.svg`: il viewBox ereditato dal vecchio file aveva margini interni
     asimmetrici (il disegno del toro occupava solo ~37% della larghezza del viewBox,
     spostato a sinistra/in alto). Corretto ritagliando il viewBox attorno al bounding box
     reale della figura, centrato e con margine uniforme (nessuna modifica ai path). Risultato:
     il logo riempie la sua box in modo simmetrico (prima ~37% larghezza, ora ~91%) e appare
     anche più grande a parità di CSS.
  2) `.hero-logo` e `.navbar-mark img` forzavano una box quadrata (width=height) su un'immagine
     che non è quadrata: cambiato in `height:auto` cosi' l'aspect ratio reale e' rispettato.
  3) Bug CSS classico: `letter-spacing` aggiunge spazio anche DOPO l'ultimo carattere, quindi
     un testo con letter-spacing centrato appare spostato a sinistra (lo spazio fantasma dopo
     l'ultima lettera "pesa" sul calcolo del centro). Risolto su `.hero h1` e `.scroll-label`
     con `margin-right` negativo pari al letter-spacing, che annulla lo spazio fantasma.
     (altri usi di letter-spacing nel sito sono su testo piccolo/non centrato, effetto
     impercettibile, non toccati).
  Inoltre aumentata la dimensione del logo hero: `clamp(160px,22vw,320px)` →
  `clamp(220px,28vw,420px)`. Verificato con misurazione pixel-precisa (offset dal centro
  sceso da -13px/-10.5px a circa -0.5px/-1.5px) a 1440px, 1920px e mobile 390px.
- 2026-06-28 — Richieste di Ale: meno glow sotto il logo hero, font del sito Bebas Neue
  (sostituiva Oswald), e una sezione "Chi siamo" ridisegnata su un mockup fornito (sfondo
  a tutta larghezza con un'immagine chiamata `2nd_page`, testi nuovi, tagline oro finale).
  Fatto: glow del logo ridotto (drop-shadow 40px/0.5 + 80px/0.25 → 14px/0.25 + 28px/0.1);
  font caricato da Google Fonts cambiato da Oswald a Bebas Neue (tutti gli usi: h1/h2,
  numeri sezione, contatore foto placeholder, stat-value, tier-card h3); rimossi i
  font-weight ormai senza effetto (Bebas Neue ha un solo peso). Sezione `#chi-siamo`
  trasformata da `.section` standard a un nuovo `.section-story` full-bleed (sfondo
  `assets/2nd_page.png`, `cover`, ancorato a destra) con colonna di testo interna
  `.section-story-inner` che replica la stessa griglia (max-width 860px) delle altre
  sezioni per restare allineata. Aggiornato il copy (storia, valori) e aggiunta una nuova
  riga `.section-tagline` (oro, Bebas Neue, maiuscolo) per "Stessi colori. Stessi valori.
  Stesso obiettivo.".
  NOTA IMPORTANTE: `assets/2nd_page.png` non esiste ancora nel repo (l'upload di Ale non
  è arrivato). Il CSS è già pronto e punta a quel path esatto: basta salvare il file lì
  con questo nome (o aggiornare il path in style.css se l'estensione è diversa, es. .png)
  perché lo sfondo appaia. Finché manca, la sezione mostra un fondo nero pieno (fallback
  di `background`, nessun errore visivo).
