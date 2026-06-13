# Daily Simple Planner — pacchetto PWA

Questi file compongono la Progressive Web App pronta per essere messa online e
poi impacchettata per il Google Play Store.

## File inclusi
- `index.html` — l'app completa
- `manifest.json` — descrive l'app (nome, icone, colori) per l'installazione
- `service-worker.js` — abilita l'uso offline e l'installabilità
- `icon-96/144/180/192/512.png` — le icone (falce di luna)

IMPORTANTE: tieni tutti i file nella STESSA cartella. I percorsi sono relativi.

---

## 1) Provala in locale (facoltativo)
Il service worker funziona solo su HTTPS o su `localhost`, non aprendo il file
direttamente. Per provarla sul tuo computer:

    cd cartella-del-progetto
    python3 -m http.server 8080

Poi apri http://localhost:8080 in Chrome.

## 2) Mettila online (gratis)
Serve un indirizzo HTTPS pubblico. Opzioni gratuite:
- GitHub Pages: crea un repository, carica i file, attiva Pages (Settings > Pages).
- Netlify / Cloudflare Pages / Vercel: trascina la cartella, ottieni un URL HTTPS.

Verifica che l'app si apra all'URL e che Chrome (menu) proponga "Installa app".

## 3) Crea il pacchetto Android con PWABuilder
1. Vai su https://www.pwabuilder.com e incolla l'URL pubblico dell'app.
2. Controlla il punteggio (manifest e service worker devono risultare a posto).
3. Sezione "Package For Stores" > Android (Google Play) > Generate.
4. Scarica lo zip: contiene `app-release-signed.aab` (per il Play Store),
   un `.apk` (per provarlo sul telefono) e il file `assetlinks.json`.
5. Carica `assetlinks.json` sul tuo sito in `/.well-known/assetlinks.json`
   (PWABuilder ti dice esattamente cosa contiene). Serve a Google per verificare
   che app e sito siano tuoi: senza, l'app mostra la barra dell'indirizzo.

## 4) Pubblica sul Play Store
1. Crea un account su Google Play Console (25$ una tantum).
2. Crea l'app, compila scheda, privacy, classificazione contenuti.
3. Carica il file `.aab`.
4. Account PERSONALE creato dopo il 13/11/2023: prima della produzione devi fare
   un test chiuso con almeno 12 tester per 14 giorni consecutivi. Gli account
   "organization" (azienda) ne sono esenti.
5. Target API: usa sempre la versione più recente di PWABuilder così l'AAB
   rispetta il livello API minimo richiesto da Google (sale ogni anno).

## Note
- I dati restano sul dispositivo dell'utente (archiviazione del browser).
  Dall'app: Impostazioni > Esporta per fare un backup.
- Per cambiare versione e forzare l'aggiornamento, modifica `CACHE = "dsp-v1"`
  in `service-worker.js` (es. `dsp-v2`).
