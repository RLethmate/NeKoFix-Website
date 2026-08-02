# US-93 · Google Fonts selbst hosten statt extern laden

**Status:** Done (2026-08-01, committet und gepusht)
**Priorität:** hoch — größter bekannter Abmahnungsgrund für deutsche Websites,
unabhängig von den Texten aus [US-92](US-92-rechtstexte-einbinden.md) sofort umsetzbar.

**Als** Betreiber der NeKoFix-Website
**möchte ich** die Schriftart „Plus Jakarta Sans“ selbst hosten statt sie beim
Seitenaufruf extern von Google-Servern laden zu lassen,
**damit** keine IP-Adresse von Besucherinnen und Besuchern ohne Einwilligung an
Google übertragen wird und dieses konkrete, in Deutschland vielfach abgemahnte
Verhalten ausgeschlossen ist.

## Ausgangslage

`index.html` lädt die Schrift aktuell direkt von Google:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```

Dadurch baut der Browser jeder Besucherin/jedes Besuchers beim Laden der Seite
eine Verbindung zu Google auf und übermittelt dabei die IP-Adresse — ohne
Einwilligung und ohne dass dafür ein berechtigtes Interesse ausreicht, wenn eine
lokale Einbindung technisch zumutbar ist (was hier der Fall ist). Genau dieses
Muster war Gegenstand zahlreicher Abmahnwellen in Deutschland seit 2022 (u. a.
nach dem Urteil des LG München I, 20 O 14622/20).

`src/index.css` referenziert die Schrift bereits nur über den Namen:

```css
--font-sans: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

Das bleibt nach der Umstellung unverändert — es ändert sich nur, **woher** die
Schriftdatei kommt, nicht ihr Name.

## Vorgeschlagene Umsetzung

1. `@fontsource/plus-jakarta-sans` als Dependency hinzufügen (self-hosted
   Font-Paket, gleiche Schriftdatei, OFL-lizenziert, unter der npm-Registry
   ausgeliefert statt von Google-Servern):
   ```
   npm install @fontsource/plus-jakarta-sans
   ```
2. Die benötigten Gewichte (300/400/500/600/700/800, siehe aktueller Google-Fonts-Link) in `src/main.tsx` oder `src/index.css` importieren, z. B.:
   ```ts
   import "@fontsource/plus-jakarta-sans/300.css";
   import "@fontsource/plus-jakarta-sans/400.css";
   import "@fontsource/plus-jakarta-sans/500.css";
   import "@fontsource/plus-jakarta-sans/600.css";
   import "@fontsource/plus-jakarta-sans/700.css";
   import "@fontsource/plus-jakarta-sans/800.css";
   ```
3. In `index.html` die drei Google-Fonts-Zeilen (`preconnect` ×2 + `<link ... css2?family=...>`) entfernen.
4. `--font-sans` in `src/index.css` unverändert lassen (Fontsource registriert die Schrift unter demselben Familiennamen).
5. Visuell prüfen, dass sich Schriftbild/Gewichte nicht verändert haben (Vite-Dev-Server, Stichprobe auf Hero, Pricing, FAQ).
6. In der Datenschutzerklärung aus [US-92](US-92-rechtstexte-einbinden.md) den Abschnitt „4. Google Fonts“ vollständig entfernen, sobald diese Story umgesetzt ist — er trifft dann nicht mehr zu.

## Akzeptanzkriterien

- [x] `index.html` enthält keinen Verweis mehr auf `fonts.googleapis.com` oder `fonts.gstatic.com`.
- [x] Die Website lädt beim Aufruf keine Ressource mehr von einer Google-Domain
      (prüfbar z. B. im Netzwerk-Tab der Browser-Devtools).
- [x] Schriftbild und verfügbare Gewichte sind nach der Umstellung identisch zum
      vorherigen Zustand (visueller Vergleich).
- [x] Der Google-Fonts-Absatz in der Datenschutzerklärung ([US-92](US-92-rechtstexte-einbinden.md)) ist entfernt
      bzw. als nicht zutreffend markiert.
- [x] Kein Layout-Sprung/Flackern durch verzögertes Nachladen der Schrift
      (`font-display: swap` bzw. Fontsource-Default prüfen).

## Hinweis

Dies ist eine reine Code-/Build-Änderung ohne inhaltliche Entscheidung und kann
unabhängig von den offenen Fragen zu Hosting/Domain in [US-92](US-92-rechtstexte-einbinden.md) sofort
umgesetzt werden.
