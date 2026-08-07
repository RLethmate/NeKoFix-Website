# Eigene Testbesuche von Umami ausschließen

**Hintergrund:** Beim Testen/Bauen der Website erzeugen eigene Seitenaufrufe reale Einträge im
Umami-Dashboard (`analytics.nekofix.de`), nicht von echten Besucherinnen/Besuchern unterscheidbar.
Umami bietet dafür einen eingebauten Mechanismus, verifiziert im Tracker-Quellcode
(`umami-software/umami`, `src/tracker/index.js`): Ist im Browser der `localStorage`-Schlüssel
`umami.disabled` gesetzt, wird kein Tracking-Event mehr gesendet.

Wichtig: Der Schlüssel gilt pro Browser-Profil/Gerät. Er muss also auf jedem Gerät/Browser
einzeln gesetzt werden, das zum Testen von `nekofix.de` genutzt wird (z. B. Laptop-Chrome,
Laptop-Safari, Handy-Safari). Private/Inkognito-Fenster vergessen den Eintrag beim Schließen des
Fensters wieder.

## Variante 1 — Einmal per Konsole (Desktop)

1. `https://nekofix.de` im Browser öffnen.
2. Entwicklerkonsole öffnen (Chrome/Edge: `Cmd+Opt+J`, Safari: vorher „Entwickler-Menü einblenden"
   in den Einstellungen aktivieren, dann `Cmd+Opt+C`).
3. Eingeben und mit Enter bestätigen:

   ```js
   localStorage.setItem('umami.disabled', 1)
   ```

4. Zur Kontrolle: `localStorage.getItem('umami.disabled')` sollte `"1"` zurückgeben.

## Variante 2 — Bookmarklet (auch für Handy geeignet)

Ein Lesezeichen anlegen, dessen Adresse aus JavaScript statt einer URL besteht. Beim Anklicken auf
`nekofix.de` deaktiviert es das Tracking für den aktuellen Browser und zeigt eine Bestätigung.

**Code für die Lesezeichen-URL:**

```
javascript:(function(){localStorage.setItem('umami.disabled',1);alert('Umami-Tracking für diesen Browser dauerhaft deaktiviert.');})();
```

**Einrichtung Desktop (Chrome/Safari):** Lesezeichenleiste einblenden, ein neues Lesezeichen
anlegen (beliebiger Titel, z. B. „Tracking aus"), obigen Code als Adresse eintragen, speichern.
Danach auf `nekofix.de` einmal anklicken.

**Einrichtung iPhone (Safari):** Eine beliebige Seite zu den Lesezeichen hinzufügen, das
Lesezeichen anschließend bearbeiten und die Adresse durch obigen Code ersetzen. Danach auf
`nekofix.de` öffnen und das Lesezeichen aus der Lesezeichenliste antippen.

## Tracking für einen Browser wieder aktivieren

```js
localStorage.removeItem('umami.disabled')
```

## Für bereits erfasste Besuche (vor Einrichtung dieses Mechanismus)

Umami verwirft die rohe IP-Adresse direkt nach der Geolokalisierung (nicht persistent
gespeichert) — eine rückwirkende Zuordnung „das war ich" ist über Umami selbst nicht zuverlässig
möglich. Ein Abgleich ist nur über die Traefik-Logs (`stats.nekofix.de`, GoAccess, Stufe A) möglich,
da dort die tatsächlichen IP-Adressen für die Dauer der Log-Rotation vorliegen.
