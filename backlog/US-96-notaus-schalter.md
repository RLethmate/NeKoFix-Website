# US-96 · Not-Aus-Schalter für Website und App bereitstellen

**Status:** In Progress

**Als** Betreiber von NeKoFix
**möchte ich** die Marketing-Website und/oder die App per Tastendruck vom Handy aus durch eine
harmlose Platzhalter-Seite ersetzen können,
**damit** ich bei einem akuten rechtlichen oder sicherheitsrelevanten Problem sofort reagieren
kann, ohne auf einen Rebuild/Redeploy warten zu müssen oder am Rechner zu sein.

## Hintergrund

Ralf möchte für den Notfall (z. B. ein Abmahnrisiko wird akut, bevor die anwaltliche Prüfung von
Impressum/Datenschutz abgeschlossen ist, s. US-92) eine Möglichkeit haben, die live erreichbaren
Inhalte sofort durch etwas rechtlich Unangreifbares zu ersetzen — schneller, als es ein normaler
Git-Push-Deploy-Zyklus erlauben würde, und bedienbar direkt vom Smartphone.

## Umsetzung

Eigenständiger, per Basic-Auth geschützter Mini-Dienst unter `https://panel.nekofix.de` mit zwei
Schaltern (Website, App). Ein Tap schreibt eine Traefik-Dynamic-Config-Datei, die die betroffene(n)
Domain(s) mit hoher Priorität auf einen immer laufenden, harmlosen Platzhalter-Container umleitet
(kein Rebuild nötig, Traefik erkennt Dateiänderungen automatisch, wirkt in Sekunden). Erneuter Tap
schaltet zurück. Der Schalter-Zustand liegt als generische, benannte Liste vor, damit sich später
weitere Schalter (z. B. Feature-Flags wie „Mietspiegel an/aus") ergänzen lassen — das wäre dann
aber ein In-App-Feature-Flag im anderen Repo (`prototype-site`) und kein Teil dieser Story.

Quellcode: `ops/notaus-panel/` in diesem Repo. Deployment-Runbook:
`Setup-Notaus-Panel.md` (Projekt-Root des Website-Repos).

## Akzeptanzkriterien

- [ ] `https://panel.nekofix.de` fragt nach Benutzername/Passwort (eigene Zugangsdaten, nicht
      identisch mit `stats`/`analytics`) und zeigt danach die Schalter-Seite mit aktuellem Status.
- [ ] Schalter „Website" aus → `nekofix.de` und `www.nekofix.de` zeigen die harmlose
      Platzhalter-Seite, `app.nekofix.de` bleibt unverändert erreichbar.
- [ ] Schalter „App" aus → `app.nekofix.de` zeigt die harmlose Platzhalter-Seite, die
      Marketing-Website bleibt unverändert erreichbar.
- [ ] Zurückschalten stellt den Normalzustand jeweils zuverlässig wieder her.
- [ ] Wirkung tritt ohne Rebuild/Redeploy ein (Test: Zeit zwischen Tap und sichtbarer Änderung).
- [ ] Die Schalter-Seite ist nicht indexierbar (`noindex`) und nirgends verlinkt.
- [ ] Panel-Seite ist als Homescreen-Symbol vom Handy aus mit einem Tap erreichbar.

## Quelle

Ralfs Anfrage (2026-08-06), im Anschluss an den Abschluss von US-95.
