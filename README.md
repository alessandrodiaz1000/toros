# Toros

Sito vetrina della squadra di calcio amatoriale Toros (fondata nel 2024). Landing page statica
(no build step) per cercare sponsor — niente framework, modificabile direttamente.

- `index.html` — pagina unica (hero, chi siamo, numeri, squadra, calendario, sponsor, contatti)
- `style.css` — palette bianco/nero
- `assets/logo-placeholder.svg` — logo segnaposto, da sostituire con quello reale del toro stilizzato
- `assets/team/` — metti qui le foto squadra/partite reali
- `assets/matches/` — eventuali foto/loghi avversari per il calendario
- `assets/docs/` — metti qui `media-kit.pdf` quando esiste

## Cosa sostituire quando arrivano i contenuti reali

Ogni punto da aggiornare in `index.html` ha un commento HTML sopra che spiega cosa fare, o
l'attributo `data-placeholder="true"` sul valore segnaposto (mostrato un po' sbiadito nel sito,
così si vede a colpo d'occhio cosa manca ancora):

1. **Numeri** (`#numeri`): campionato/torneo, partite giocate, vittorie, follower social.
2. **Squadra** (`#squadra`): foto reali in `assets/team/`, sostituendo i `<div class="ph-card">`
   con `<img class="gallery-img" src="assets/team/...">`.
3. **Calendario** (`#calendario`): righe `<tr>` con le prossime partite.
4. **Sponsor** (`#sponsor`): nome/prezzo/benefit dei pacchetti (Bronze/Silver/Gold sono solo
   esempi), e il media kit (link mailto → link al PDF quando esiste).
5. **Contatti** (footer): link social reali invece dei `#` segnaposto.

Hosting: GitHub Pages, branch `main`, root.
