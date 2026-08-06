# US-95 · Rudimentäre Besucherzählung ohne Cookie-Banner einführen

**Status:** In Progress — Stufe A umgesetzt (2026-08-06), Stufe B offen

**Als** Betreiber der NeKoFix-Website
**möchte ich** grob sehen, wie viele Besucher die Website hat,
**damit** ich ein Gefühl für Reichweite und Wirkung von Marketing-Maßnahmen bekomme, ohne dafür
einen Cookie-Consent-Banner einführen oder die Datensparsamkeits-Positionierung der Marke
aufgeben zu müssen.

## Hintergrund

Aktuell (Stand US-92/US-94) gibt es bewusst kein Tracking und keine Cookies — das ist Teil der
„NeKoFix LOCAL"-Positionierung (`Hero.tsx`) und steht so auch in der Datenschutzerklärung
(`Datenschutz.tsx`, Ziffer 5). Jede Lösung für diese Story muss entweder (a) ohne Cookies und ohne
personenbezogene Daten auskommen, damit weiterhin **kein** Consent-Banner nötig wird (Art. 6 Abs. 1
lit. f DSGVO reicht dann als Rechtsgrundlage), oder (b) die Datenschutzerklärung entsprechend
erweitert werden.

## Vorschlag: zwei Ausbaustufen, je nach gewünschter Genauigkeit

**Stufe A — minimal, kein Zusatzaufwand an Rechtstexten:**
Die Server-Logfiles, die Hetzner ohnehin beim Hosting erzeugt (bereits in der
Datenschutzerklärung, Ziffer 3, offengelegt), mit einem schlanken Log-Analyzer auswerten
(z. B. [GoAccess](https://goaccess.io), läuft direkt auf dem Hetzner-Server neben Coolify). Liefert
Seitenaufrufe, grobe Herkunft, Referrer — keine neue Datenverarbeitung, kein zusätzliches Skript
auf der Seite, keine Änderung an der Datenschutzerklärung nötig, da bereits abgedeckt.

**Stufe B — eigenes Dashboard, etwas mehr Komfort:**
Eine cookie-freie, aggregierende Analytics-Lösung **selbst hosten** (z. B.
[Umami](https://umami.is) oder [Plausible Community Edition](https://plausible.io/self-hosted-web-analytics)) —
beide speichern keine personenbezogenen Daten/IP-Adressen im Klartext, setzen keine Cookies und
gelten deshalb gängiger Rechtsauffassung nach als über Art. 6 Abs. 1 lit. f DSGVO ohne
Einwilligung zulässig. Ließe sich als weitere Coolify-Anwendung auf demselben CX23-Server
betreiben (kein neuer Anbieter, keine zusätzlichen Kosten außer Server-Ressourcen). Erfordert ein
kleines Tracking-Snippet in `index.html` und eine Ergänzung der Datenschutzerklärung
(`Datenschutz.tsx`, Ziffer 5 „Cookies und Tracking").

**Bewusst nicht vorgeschlagen:** Google Analytics oder andere Tools mit Datenübermittlung an
Drittanbieter außerhalb der EU — würde der gerade erst hergestellten Abmahnsicherheit (US-92,
US-93) direkt widersprechen.

## Akzeptanzkriterien

- [x] Entscheidung getroffen: erst Stufe A (Log-Analyse), danach Stufe B (self-hosted
      Umami/Plausible CE) — beide nacheinander umgesetzt, nicht alternativ.
- [x] Lösung liefert mindestens Seitenaufrufe pro Tag/Woche (Stufe A: GoAccess-Report).
- [x] Keine Cookies gesetzt, keine personenbezogenen Daten dauerhaft im Klartext gespeichert
      (Stufe A: reine Log-Auswertung, kein neues Skript auf der Website).
- [ ] Falls Stufe B: Datenschutzerklärung Ziffer 5 aktualisiert (Tool benennen, Rechtsgrundlage,
      Hinweis auf Zweck und dass kein Cookie-Banner nötig ist, mit Begründung).
- [ ] Falls Stufe B: Tracking-Snippet läuft ausschließlich vom eigenen Server, keine Anfrage an
      einen Drittanbieter im Netzwerk-Tab sichtbar.

## Umsetzung Stufe A (2026-08-06)

GoAccess wertet das Traefik-Access-Log (Common-Log-Format, gefiltert auf die beiden
https-Router der Marketing-Domain) aus und erzeugt per Cronjob alle 10 Minuten einen HTML-Report.
Ausgeliefert unter `https://stats.nekofix.de`, per Basic-Auth geschützt (eigener, von Coolify
unabhängiger nginx-Container am selben Traefik-Proxy). Details/Runbook:
`Setup-US-95-Stufe-A-GoAccess.md` (Projekt-Root des Website-Repos). Kein neues Tracking-Skript,
keine Datenschutzerklärung-Änderung nötig, da bereits durch Ziffer 3 (Server-Logs) abgedeckt.

## Quelle

Ralfs Anfrage (2026-08-02), im Zuge der Abmahnschutz-Aufräumarbeiten (US-92, US-93, US-94) —
bewusst als spätere Story zurückgestellt, nicht Teil des aktuellen Go-Live-Pakets.
