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
- `style.css` — tutti gli stili. Variabili colore in `:root`. Font: Oswald (titoli, condensato
  sottile) + Inter (testo), caricati da Google Fonts.
- `script.js` — solo vanilla JS: reveal delle sezioni allo scroll (IntersectionObserver), stato
  attivo nella navbar, toggle del menu mobile. Niente dipendenze.
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

- Fatto: hero (logo grande con glow, "TOROS" in Oswald sottile, sfondo fumo procedurale via
  filtro SVG feTurbulence), navbar fissa con accento oro, sezioni editoriali numerate, logo +
  3 foto reali in galleria.
- Da riempire con dati reali: numeri, calendario, prezzi sponsor, link social, eventuale media kit.
- Possibile gap noto: il fumo è procedurale (SVG), non identico al mockup di riferimento (che è
  una texture fotografica). Per resa identica servirebbe una texture immagine come sfondo.

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
