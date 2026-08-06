# US-96 — Not-Aus-Panel einrichten (Anleitung zum Selbst-Ausführen)

**Bezug:** `backlog/US-96-notaus-schalter.md`. Quellcode liegt in `ops/notaus-panel/` in diesem
Repo.

## Was das macht

Ein per Basic-Auth geschützter Mini-Dienst unter `https://panel.nekofix.de` mit zwei Schaltern
(„Website", „App"). Ein Tap schreibt eine kleine Traefik-Konfigurationsdatei, die die betroffene
Domain sofort — ohne Rebuild/Redeploy — auf eine harmlose, immer laufende Platzhalter-Seite
umleitet. Erneuter Tap stellt den Normalzustand wieder her.

**Sicherheitsprinzip:** Die Schalter-Seite selbst ist ein normaler `GET /`-Aufruf (sicher, auch
für Link-Vorschauen). Nur ein bewusster Tap auf einen Button löst ein `POST /toggle/...` aus, das
den Zustand tatsächlich ändert — automatische Link-Vorschauen (WhatsApp, Slack etc.) können den
Schalter dadurch nicht versehentlich auslösen.

## Schritt 1 — Dateien auf den Server kopieren

**Auf deinem Mac** (nicht in der SSH-Session zum Server), im Ordner `website/`:

```bash
scp -r ops/notaus-panel root@nekofix-prod:/opt/nekofix-panel
```

(Passe `nekofix-prod` an deinen tatsächlichen SSH-Host-Alias an, falls er anders heißt.)

## Schritt 2 — Auf dem Server: Verzeichnisse, Zustand, Zugangsdaten

Per SSH auf dem Server:

```bash
sudo mkdir -p /opt/nekofix-panel/state
sudo chmod 755 /opt/nekofix-panel/state

# Basic-Auth-Zugangsdaten für das Panel — eigenes, neues Passwort (nicht identisch mit
# stats.nekofix.de oder analytics.nekofix.de, da dieser Schalter deutlich mehr Wirkung hat)
sudo htpasswd -cm /data/coolify/proxy/notaus-panel.htpasswd ralf
```

## Schritt 3 — DNS

Wie bei `stats`/`analytics`: einen A- und AAAA-Eintrag für `panel.nekofix.de` bei Hetzner DNS auf
dieselbe Server-IP anlegen.

## Schritt 4 — Starten

```bash
cd /opt/nekofix-panel
docker compose up -d
```

Kontrolle:

```bash
docker ps --format "{{.Names}}\t{{.Status}}" | grep notaus
docker logs notaus-panel-notaus-panel-1 --tail 20
```

Die Logzeile sollte `Notaus-Panel läuft auf Port 3000` zeigen.

## Schritt 5 — Test: `https://panel.nekofix.de` aufrufen

Sollte nach Benutzername/Passwort fragen (aus Schritt 2), danach zwei grüne „AN"-Schalter zeigen
(„Marketing-Website", „App (app.nekofix.de)").

## Schritt 6 — End-to-End-Test (bitte wirklich durchklicken, nicht nur code-lesen)

1. Auf „Not-Aus auslösen" bei **„Website"** tippen.
2. Sofort (wenige Sekunden) `https://nekofix.de` in einem neuen Tab/Inkognito-Fenster aufrufen —
   sollte jetzt die Wartungsseite zeigen. `https://app.nekofix.de` parallel prüfen — sollte
   **unverändert** normal erreichbar sein.
3. Auf dem Panel wieder auf „Wieder einschalten" tippen, `nekofix.de` erneut prüfen — sollte
   wieder normal laden.
4. Dasselbe für den Schalter **„App"** wiederholen (diesmal `app.nekofix.de` prüfen, `nekofix.de`
   sollte währenddessen unverändert bleiben).
5. Zeit stoppen zwischen Tap und sichtbarer Änderung (AC aus US-96: kein Rebuild/Redeploy nötig —
   sollte im Bereich weniger Sekunden liegen).

Falls ein Schalter nicht wirkt: `docker logs notaus-panel-notaus-panel-1 --tail 50` prüfen, ob die
Datei tatsächlich geschrieben wurde (`ls -la /data/coolify/proxy/dynamic/`), und ob Traefik sie
aufgenommen hat (`docker logs coolify-proxy --tail 30`, sollte keine Config-Fehler zeigen).

## Schritt 7 — Als Homescreen-Symbol ablegen (iPhone)

1. `https://panel.nekofix.de` in Safari öffnen (einmal einloggen — Safari merkt sich die
   Basic-Auth-Zugangsdaten für diese Seite).
2. Teilen-Symbol → „Zum Home-Bildschirm".
3. Name vergeben (z. B. „Not-Aus"), hinzufügen.

Bei Android analog über Chrome: Menü (⋮) → „Zum Startbildschirm hinzufügen".

## Später: weitere Schalter ergänzen

`ops/notaus-panel/server.js`, Objekt `TOGGLES` — dort einen neuen Eintrag mit `label` und
`domains` ergänzen (Schlüsselname nur Kleinbuchstaben, da die Route `/toggle/[a-z]+` das erzwingt),
Datei per `scp` erneut auf den Server kopieren, `docker compose up -d` in `/opt/nekofix-panel`.
Für ein reines In-App-Feature-Flag (z. B. „Mietspiegel an/aus", ohne Domain-Umleitung) reicht die
Traefik-Umleitung allerdings nicht — das müsste die App selbst auslesen (eigenes, späteres Thema
im `prototype-site`-Repo).
