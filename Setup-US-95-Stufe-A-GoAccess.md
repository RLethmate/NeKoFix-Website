# US-95 Stufe A — GoAccess-Log-Analyse einrichten (Anleitung zum Selbst-Ausführen)

**Bezug:** `backlog/US-95-rudimentaere-besucherzaehlung.md`, Stufe A.

Diese Anleitung ist zum Copy-Paste auf dem Hetzner-Server gedacht (SSH-Zugriff liegt bei Ralf,
nicht bei Claude). Sie ist in Schritte gegliedert; **Schritt 0 bitte zuerst ausführen und die
Ausgabe zurückmelden**, da einige Pfade/Container-Namen je nach Coolify-Version leicht
abweichen können — der Rest der Anleitung wird dann bei Bedarf angepasst statt blind
weitergebaut.

## Ziel

Server-Logs, die Hetzner/Coolify ohnehin erzeugen (bereits in der Datenschutzerklärung Ziffer 3
offengelegt), mit GoAccess auswerten. Kein neues Tracking-Skript auf der Website, keine Cookies,
keine Änderung an der Datenschutzerklärung nötig. Ergebnis: ein Report unter
`https://stats.nekofix.de`, per Basic-Auth geschützt (nur Ralf).

## Schritt 0 — Diagnose (erledigt, Ergebnis bestätigt am 2026-08-06)

Ausgeführt und geprüft:
- Proxy-Container: `coolify-proxy`, Image `traefik:v3.6`.
- Netzwerk: `coolify` (Docker-Bridge-Netzwerk, `external: true` in der Compose-Datei).
- Noch kein Access-Log vorhanden (`find` lieferte nichts).
- `docker-compose.yml` des Proxys geprüft (Inhalt s. u.) — daraus bestätigt:
  - Volume `/data/coolify/proxy/:/traefik` ist **bereits vorhanden**, kein zusätzliches Volume
    nötig.
  - Entrypoint für HTTPS heißt `https`, Certresolver heißt `letsencrypt` — beide Namen werden in
    Schritt 4 unverändert übernommen.
  - `--providers.docker.exposedbydefault=false` — jeder neue Container braucht also explizit
    `traefik.enable=true`, sonst wird er nicht geroutet (im Compose-Auszug in Schritt 4 bereits
    berücksichtigt).

## Schritt 1 — Traefik Access-Log aktivieren (Apache-Combined-Format)

Coolifys Proxy-Konfiguration liegt unter `/data/coolify/proxy/docker-compose.yml`. Dort beim
Traefik-Service (Container `coolify-proxy`) im Abschnitt `command:` die folgenden drei Zeilen
ergänzen (vor der schließenden Liste, z. B. direkt hinter `--providers.docker.exposedbydefault=false`):

```yaml
      - '--accesslog=true'
      - '--accesslog.filepath=/traefik/access.log'
      - '--accesslog.format=common'
```

Kein Volume-Zusatz nötig — `/data/coolify/proxy/:/traefik` ist laut Schritt 0 schon gemountet,
d. h. die Logdatei landet automatisch unter `/data/coolify/proxy/access.log` auf dem Host.

Am besten mit einem Editor arbeiten (z. B. `sudo nano /data/coolify/proxy/docker-compose.yml`)
statt die Datei komplett neu zu schreiben, um den Rest (Labels, Healthcheck etc.) unangetastet zu
lassen.

Danach den Proxy neu starten:

```bash
cd /data/coolify/proxy
docker compose up -d
```

**Wichtig:** Das betrifft den produktiven Reverse-Proxy für alle drei Domains
(`nekofix.de`, `app.nekofix.de`, `api.nekofix.de`). Kurzer Check danach, dass alle drei Seiten
weiter erreichbar sind, bevor es weitergeht.

Test, ob geloggt wird:

```bash
curl -s -o /dev/null https://nekofix.de/
tail -5 /data/coolify/proxy/access.log
```

**Logrotate ergänzen** (sonst wächst die Datei unbegrenzt):

```bash
sudo tee /etc/logrotate.d/coolify-proxy-access > /dev/null <<'EOF'
/data/coolify/proxy/access.log {
    daily
    rotate 14
    compress
    missingok
    notifempty
    copytruncate
}
EOF
```

`copytruncate` ist hier bewusst gewählt, weil Traefik die Logdatei nicht per Signal zum
Neuöffnen bewegen lässt, ohne den Container neu zu starten.

## Schritt 2 — GoAccess installieren

```bash
sudo apt update
sudo apt install -y goaccess
goaccess --version
```

## Schritt 3 — Report-Generierung als Cronjob

Traefiks Common-Log-Format (CLF) enthält keinen Host-Header — die Domain steht dort nicht direkt
drin. Stattdessen loggt Traefik den Router-Namen (z. B. `https-0-oa0vo0lft8inh9sr91i0n6bx@docker`).
Per `docker inspect` bestätigt (2026-08-06): Die Coolify-App für die Marketing-Website hat zwei
https-Router, einen je Domain-Variante:

- `https-0-oa0vo0lft8inh9sr91i0n6bx` → `Host(nekofix.de)`
- `https-1-oa0vo0lft8inh9sr91i0n6bx` → `Host(www.nekofix.de)`

(App- und API-Traffic laufen über andere Router-Hashes und werden damit automatisch
ausgeschlossen.)

```bash
sudo mkdir -p /opt/nekofix-stats/html
sudo tee /opt/nekofix-stats/generate-report.sh > /dev/null <<'EOF'
#!/bin/bash
set -euo pipefail
LOG=/data/coolify/proxy/access.log
OUT=/opt/nekofix-stats/html/index.html

grep -E 'https-[01]-oa0vo0lft8inh9sr91i0n6bx@docker' "$LOG" > /tmp/nekofix-access.log || true

goaccess /tmp/nekofix-access.log \
  --log-format=COMBINED \
  -o "$OUT" \
  --html-report-title="NeKoFix Website Statistik" \
  -a
EOF
sudo chmod +x /opt/nekofix-stats/generate-report.sh
sudo /opt/nekofix-stats/generate-report.sh   # einmal manuell testen
```

Hinweis: Sollte die Coolify-App für die Website irgendwann neu angelegt werden (nicht bei einem
normalen Redeploy, nur bei komplettem Neuanlegen der Ressource), ändert sich dieser Router-Hash —
dann Schritt 3 mit den beiden `docker inspect`-Befehlen von oben neu ableiten.

Cronjob alle 10 Minuten:

```bash
( sudo crontab -l 2>/dev/null; echo "*/10 * * * * /opt/nekofix-stats/generate-report.sh" ) | sudo crontab -
```

## Schritt 4 — `stats.nekofix.de` mit Basic-Auth ausliefern

Passwort-Datei anlegen (Benutzername frei wählbar, hier `ralf`):

```bash
sudo apt install -y apache2-utils
sudo htpasswd -c /opt/nekofix-stats/.htpasswd ralf
```

Kleinen, von Coolifys App-Verwaltung unabhängigen Container aufsetzen, der sich über Docker-Labels
am selben Traefik-Proxy anmeldet:

```bash
sudo tee /opt/nekofix-stats/docker-compose.yml > /dev/null <<'EOF'
services:
  nekofix-stats:
    image: nginx:alpine
    restart: unless-stopped
    volumes:
      - /opt/nekofix-stats/html:/usr/share/nginx/html:ro
      - /opt/nekofix-stats/.htpasswd:/etc/nginx/.htpasswd:ro
    networks:
      - coolify
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.nekofix-stats.rule=Host(`stats.nekofix.de`)"
      - "traefik.http.routers.nekofix-stats.entrypoints=https"
      - "traefik.http.routers.nekofix-stats.tls.certresolver=letsencrypt"
      - "traefik.http.middlewares.nekofix-stats-auth.basicauth.usersfile=/etc/nginx/.htpasswd"
      - "traefik.http.routers.nekofix-stats.middlewares=nekofix-stats-auth"

networks:
  coolify:
    external: true
EOF
cd /opt/nekofix-stats
docker compose up -d
```

`certresolver=letsencrypt` und `entrypoints=https` sind bereits gegen die tatsächliche
Proxy-Config aus Schritt 0 geprüft und passen so.

## Schritt 5 — DNS

Wie bei `app`/`api`: einen weiteren A- und AAAA-Eintrag für `stats.nekofix.de` bei Hetzner DNS auf
dieselbe Server-IP anlegen (`204.168.235.9` / `2a01:4f9:c013:c730::1`, s. CLAUDE.md-Übergabe
2026-08-02 — bitte kurz gegenprüfen, ob sich die IP seither nicht geändert hat).

## Schritt 6 — Abnahme gegen die Akzeptanzkriterien (US-95, Stufe A)

- [ ] `https://stats.nekofix.de` fragt nach Benutzername/Passwort und zeigt danach den
      GoAccess-Report.
- [ ] Report zeigt Seitenaufrufe mindestens pro Tag (GoAccess liefert das automatisch in der
      Zeitreihen-Übersicht).
- [ ] Keine neuen Cookies, kein neues Tracking-Skript in `index.html`/den React-Komponenten.
- [ ] `curl -sI https://nekofix.de/`, `https://app.nekofix.de/`, `https://api.nekofix.de/` liefern
      weiterhin normale Antworten (Proxy-Neustart aus Schritt 1 hat nichts kaputtgemacht).

Sobald das durchläuft: `backlog/US-95-rudimentaere-besucherzaehlung.md` auf Stufe A abhaken,
Status auf „In Progress" (da Stufe B noch offen), danach Stufe B angehen.
