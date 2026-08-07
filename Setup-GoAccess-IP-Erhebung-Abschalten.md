# GoAccess/Traefik: Erhebung von Besucher-IP-Adressen abschalten

**Bezug:** Folgeentscheidung zu US-95 Stufe A. Analyse der ersten ~30 Betriebsstunden ergab: das
„Visitor Hostnames and IPs"-Panel in `stats.nekofix.de` zeigt einzelne, echte IP-Adressen — das
geht über den in der Datenschutzerklärung (Ziffer 3) genannten Zweck (störungsfreier Betrieb,
IT-Sicherheit) hinaus und wurde dort auch nicht mit Speicherdauer benannt. Entscheidung: IP-Adressen
werden künftig gar nicht mehr geschrieben, statt sie nur im Report zu verstecken.

**Wichtiger Kompromiss, bewusst in Kauf genommen:** Ohne Client-IP im Log lässt sich eine einzelne
angreifende/scannende Adresse nicht mehr gezielt sperren oder raten-limitieren. Für eine reine
Marketing-Website (kein Login, keine sensiblen Formulardaten außer dem bereits separat per
IP-Vorhaltung geschützten Feedback-Endpunkt, siehe Ziffer 4 der Datenschutzerklärung) ist das
vertretbar.

## Schritt 1 — Traefik auf JSON-Access-Log mit abgeschalteter Client-IP umstellen

Ziel: aus den drei bisherigen `accesslog`-Zeilen aus US-95 Stufe A

```yaml
      - '--accesslog=true'
      - '--accesslog.filepath=/traefik/access.log'
      - '--accesslog.format=common'
```

werden diese sechs:

```yaml
      - '--accesslog=true'
      - '--accesslog.filepath=/traefik/access.log'
      - '--accesslog.format=json'
      - '--accesslog.fields.defaultmode=keep'
      - '--accesslog.fields.names.ClientHost=drop'
      - '--accesslog.fields.names.ClientUsername=drop'
```

(`ClientUsername` ist bei uns ohnehin immer leer, schadet aber nicht, ihn vorsorglich mit
auszuschließen.)

**1a — Backup der Compose-Datei:**

```bash
sudo cp /data/coolify/proxy/docker-compose.yml \
        /data/coolify/proxy/docker-compose.yml.bak-$(date +%Y%m%d-%H%M)
```

**1b — Format-Wert austauschen (`common` → `json`):**

```bash
sudo sed -i "s|--accesslog.format=common|--accesslog.format=json|" \
  /data/coolify/proxy/docker-compose.yml
```

**1c — Drei neue Zeilen direkt danach einfügen:**

```bash
sudo sed -i "/--accesslog.format=json/a\\
      - '--accesslog.fields.defaultmode=keep'\\
      - '--accesslog.fields.names.ClientHost=drop'\\
      - '--accesslog.fields.names.ClientUsername=drop'" \
  /data/coolify/proxy/docker-compose.yml
```

**1d — Kontrolle, was tatsächlich geändert wurde:**

```bash
grep -n "accesslog" -A1 -B1 /data/coolify/proxy/docker-compose.yml
```

Erwartet: die sechs Zeilen von oben, mit identischer Einrückung (6 Leerzeichen) wie die
umliegenden Labels/Command-Einträge.

**1e — YAML-Syntax prüfen, BEVOR der Proxy neu gestartet wird** (fängt Tippfehler/Einrückungsfehler
ab, ohne dass die drei Domains kurz offline gehen):

```bash
cd /data/coolify/proxy
sudo docker compose config > /dev/null && echo "YAML OK" || echo "YAML FEHLERHAFT - NICHT NEUSTARTEN"
```

Nur bei „YAML OK" weitermachen. Bei „YAML FEHLERHAFT": mit
`diff /data/coolify/proxy/docker-compose.yml.bak-* /data/coolify/proxy/docker-compose.yml` die
Änderung ansehen und von Hand korrigieren (z. B. `sudo nano /data/coolify/proxy/docker-compose.yml`),
statt einfach neu zu starten.

**1f — Neustart:**

```bash
cd /data/coolify/proxy
docker compose up -d
```

Kurzer Erreichbarkeits-Check danach (alle drei Domains):

```bash
curl -sI https://nekofix.de/
curl -sI https://app.nekofix.de/
curl -sI https://api.nekofix.de/
```

## Schritt 2 — Verifizieren, dass keine IP mehr geschrieben wird

```bash
curl -s -o /dev/null https://nekofix.de/
tail -3 /data/coolify/proxy/access.log
```

Prüfen: Taucht in der neuen (JSON-)Zeile noch eine IP-Adresse auf (egal unter welchem Feldnamen)?
Wenn nein: Schritt 1 hat funktioniert.

**Bitte an dieser Stelle die komplette Ausgabe von `tail -3` zurückmelden**, bevor Schritt 3
angegangen wird. Grund: GoAccess muss auf das neue JSON-Format umgestellt werden
(`generate-report.sh`, aktuell `--log-format=COMBINED`), und die exakte Formatanweisung hängt von
den tatsächlichen Feldnamen/der Feldreihenfolge ab, die Traefik im JSON tatsächlich ausgibt — das
lieber anhand der echten Zeile ableiten als raten und riskieren, dass der Report danach leer oder
fehlerhaft ist.

## Schritt 3 — GoAccess-Report an das neue Format anpassen

**Bestätigt (2026-08-07):** Schritt 1+2 funktionieren — die neuesten Log-Zeilen enthalten weder
`ClientHost` noch `ClientAddr`, nur noch eine nackte `ClientPort`-Nummer ohne Adresse.

Traefiks JSON-Log hat pro Zeile eine unterschiedliche Feldmenge (z. B. fehlen `RouterName`/
`TLSCipher` bei nicht geroutetem Scan-Traffic komplett). Ein starres GoAccess-JSON-Template wäre
dafür zu fragil. Stattdessen: mit `jq` jede Zeile in klassisches Apache-Common-Log-Format
umwandeln (das GoAccess bereits zuverlässig aus US-95 Stufe A kennt), mit einem festen Platzhalter
statt einer echten Adresse. Filterung auf die Marketing-Domain jetzt über `RequestHost` statt über
den Router-Hash (robuster gegen eine künftige Neuanlage der Coolify-Ressource).

**3a — `jq` installieren, falls nicht vorhanden:**

```bash
sudo apt install -y jq
```

**3b — `generate-report.sh` aktualisieren:**

```bash
sudo tee /opt/nekofix-stats/generate-report.sh > /dev/null <<'EOF'
#!/bin/bash
set -euo pipefail
LOG=/data/coolify/proxy/access.log
OUT=/opt/nekofix-stats/html/index.html

jq -Rr '
  (try fromjson catch empty) |
  select(type == "object") |
  select(.RequestHost == "nekofix.de" or .RequestHost == "www.nekofix.de") |
  "ANON - - [\(.time | fromdateiso8601 | strftime("%d/%b/%Y:%H:%M:%S +0000"))] \"\(.RequestMethod) \(.RequestPath) \(.RequestProtocol)\" \(.DownstreamStatus) \(.DownstreamContentSize // 0)"
' "$LOG" > /tmp/nekofix-access-normalized.log || true

goaccess /tmp/nekofix-access-normalized.log \
  --log-format=COMMON \
  --ignore-panel=HOSTS \
  -o "$OUT" \
  --html-report-title="NeKoFix Website Statistik"
EOF
sudo chmod +x /opt/nekofix-stats/generate-report.sh
```

**3c — Einmal von Hand testen, BEVOR der Cronjob wieder automatisch läuft:**

```bash
sudo /opt/nekofix-stats/generate-report.sh
head -c 500 /tmp/nekofix-access-normalized.log   # Stichprobe: sieht die Zeile plausibel aus?
```

Erwartete Beispielzeile: `ANON - - [07/Aug/2026:08:17:20 +0000] "GET / HTTP/2.0" 200 1131` —
kein Bezug mehr zu einer echten Adresse, nur noch Zeitpunkt, Methode, Pfad, Status, Bytes.

**3d — Report ansehen** (z. B. `https://stats.nekofix.de` im Browser neu laden) und prüfen:
Seitenaufrufe/Pfade/Status-Codes sind weiter da, das „Visitor Hostnames and IPs"-Panel ist jetzt
komplett weg (durch `--ignore-panel=HOSTS` ausgeblendet, da es ohnehin nur noch den Platzhalter
„ANON" zeigen würde).

**Erwarteter, gewollter Nebeneffekt:** „Unique Visitors" wird ab jetzt nicht mehr aussagekräftig
sein (alle Zeilen teilen sich denselben Platzhalter) — das ist beabsichtigt, da genau das die
Individualisierbarkeit war, die abgeschaltet werden sollte. Seitenaufrufe/Trend über die Zeit
bleiben weiterhin sichtbar.

Der Cronjob (`*/10 * * * * /opt/nekofix-stats/generate-report.sh`) ruft dasselbe Skript auf und
braucht keine Änderung — er nutzt automatisch die neue Logik.

## Schritt 4 — Datenschutzerklärung nachziehen

Erst NACHDEM Schritt 2 bestätigt ist (keine IP mehr im Log), Ziffer 3 in `Datenschutz.tsx`
anpassen: „IP-Adresse des zugreifenden Geräts" aus der Liste der erhobenen Zugriffsdaten
entfernen bzw. durch einen Hinweis ersetzen, dass die IP-Adresse serverseitig nicht protokolliert
wird. Nicht vorher ändern, sonst stünde vorübergehend eine Aussage auf der Seite, die technisch
noch nicht zutrifft.

## Schritt 5 — Alte, bereits vorhandene IP-haltige Logs

**Noch zu tun.** Die bisherigen `access.log`-Rotationsdateien (aus US-95 Stufe A, mit
IP-Adressen, per Logrotate 14 Tage vorgehalten) enthalten noch historische IPs. Zum sauberen
Abschluss des Themas:

```bash
ls -la /data/coolify/proxy/access.log.*.gz 2>/dev/null   # zur Kontrolle, was vorhanden ist
sudo rm -f /data/coolify/proxy/access.log.*.gz
```

Die aktuelle `access.log` selbst (Live-Datei) enthält oben noch einige alte Zeilen von vor der
Umstellung (Text-Format, mit IP) und weiter unten die neuen JSON-Zeilen ohne IP — diese Datei wird
durch die reguläre tägliche Logrotate-Rotation (s. US-95 Stufe A, `rotate 14`) in den kommenden
14 Tagen ohnehin automatisch durchlaufen und alte Inhalte verwerfen; kein manuelles Eingreifen
nötig, außer man möchte es sofort statt in 14 Tagen erledigt haben — dann zusätzlich:

```bash
sudo logrotate -f /etc/logrotate.d/coolify-proxy-access
```

## Status

- [x] Schritt 1 — Traefik: `ClientHost` + `ClientAddr` gedroppt (2026-08-07, verifiziert).
- [x] Schritt 2 — Verifiziert: keine IP mehr im Log.
- [x] Schritt 3 — GoAccess auf `jq`-Normalisierung umgestellt, Report zeigt saubere Daten
      (2026-08-07, von Ralf bestätigt).
- [x] Schritt 4 — Datenschutzerklärung (`Datenschutz.tsx`, Ziffer 3) angepasst: IP-Adresse aus der
      Liste entfernt, explizit als „wird nicht protokolliert" benannt. Dabei zusätzlich zwei
      vorbestehende Ungenauigkeiten korrigiert (Browsertyp/OS und Referrer-URL wurden nie
      tatsächlich erfasst, unabhängig von dieser Änderung).
- [x] Schritt 5 — alte `.gz`-Rotationsdateien gelöscht (2026-08-07, von Ralf bestätigt: `ls`
      liefert nichts mehr).

**Thema damit technisch abgeschlossen.** Ergänzend umgesetzt (Folgefunde beim Gegenlesen der
Datenschutzerklärung, siehe `src/components/Datenschutz.tsx` und `feedback-api/server.js`):
Ziffer 3/6 mit Verweis verzahnt, GoAccess in Ziffer 3 benannt, aktive Löschung abgelaufener
Rate-Limit-Einträge in der Feedback-API ergänzt (macht die dortige „danach automatisch
verworfen"-Aussage erst technisch korrekt). Beide Code-Änderungen sind noch nicht deployt.
