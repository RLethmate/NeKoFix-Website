# US-97 · E-Mail-Weiterleitung für info@nekofix.de auf einen abmahnsicheren Anbieter umziehen

**Status:** Open

**Als** Betreiber von NeKoFix
**möchte ich** die E-Mail-Weiterleitung für `info@nekofix.de` von ImprovMX auf einen Anbieter mit
einer tatsächlich belastbaren Übermittlungsgrundlage umstellen (oder ganz ohne Drittlandtransfer),
**damit** eingehende Post nicht mehr über einen Anbieter läuft, der sich für den
US-Drittlandtransfer nur unzertifiziert auf das EU-US Data Privacy Framework beruft.

## Hintergrund

Bei der Analyse der Server-Logs (siehe US-95-Folgearbeit, `Setup-GoAccess-IP-Erhebung-Abschalten.md`)
kam zur Sprache, dass `info@nekofix.de` über ImprovMX weitergeleitet wird. Prüfung von ImprovMX'
eigener Datenschutzerklärung (2026-08-07):

- ImprovMX Incorporation, 8 The Green, STE D, Dover, Delaware 19901, USA.
- Verarbeitung laut eigener Aussage in den USA **und** Europa (AWS + OVHcloud).
- Erklärt nur, sich am EU-US Data Privacy Framework zu orientieren — ist dafür **nicht
  zertifiziert**. Keine belastbare Übermittlungsgrundlage nach Art. 44 ff. DSGVO.

Das steht im Spannungsverhältnis zur sonstigen Positionierung der Website (kein Google Analytics,
selbst gehostete Fonts, self-hosted Umami/GoAccess ohne IP-Speicherung — durchgängig „keine
US-Drittlandtransfers ohne Not"). Ralf hat entschieden umzuziehen; drei Optionen wurden recherchiert
und gegen die jeweiligen Primärquellen geprüft (nicht nur gegen Marketing-Zusammenfassungen).

## Option A — Forward Email, gehostet (geprüft 2026-08-07: `forwardemail.net/en/privacy`, `/en/gdpr`, `/en/dpa`)

- Betreiber: Forward Email LLC, Delaware, USA — ebenfalls ein US-Unternehmen, das ändert sich
  gegenüber ImprovMX nicht.
- **Free-Tier-Weiterleitung läuft laut eigener Aussage rein im Arbeitsspeicher** („we do not store
  any forwarded emails to disk storage nor databases … operate in-memory only") — vergleichbar mit
  dem Prinzip, das wir bei Umami/Traefik in dieser Session selbst umgesetzt haben. Free-Tier kann
  nur weiterleiten, nicht selbst versenden oder speichern.
- **Übermittlungsgrundlage ist konkreter als bei ImprovMX:** Das DPA bindet automatisch echte
  EU-Standardvertragsklauseln der EU-Kommission (Durchführungsbeschluss 2021/914) ein — Modul 2
  (Controller→Processor) und Modul 3 (Processor→Sub-Processor) — plus ein UK-Addendum. Keine
  Erwähnung des (unwirksamen) Privacy Shield oder einer unzertifizierten DPF-Behauptung.
- Laut Forward Emails eigenen Terms of Service gilt die DPA-Zustimmung automatisch mit der
  ToS-Annahme bei der Nutzung des Dienstes (Web-Recherche 2026-08-07) — die im DPA-Dokument selbst
  erwähnte gesonderte „Cover Page" scheint sich eher an zahlende Geschäftskunden mit individuellem
  Vertrag zu richten. Trotzdem vor der Umstellung im echten Sign-up-Flow verifizieren, nicht nur
  aus Sekundärquellen übernehmen.
- Sub-Prozessoren sind ausnahmslos US-Unternehmen (Cloudflare, DataPacket, DigitalOcean, GitHub,
  Vultr, Stripe, PayPal) — die SCCs decken das ab, ändern aber nichts daran, dass die Infrastruktur
  weiterhin überwiegend US-betrieben ist.
- Kosten: Free-Tier kostenlos (nur Weiterleitung); Cloud-Pläne ab ca. 8 EUR/Monat.

## Option B — Forward Email, selbst gehostet

Forward Email ist vollständig Open Source (`github.com/forwardemail`) und lässt sich selbst
hosten. Auf dem eigenen Hetzner-Server betrieben, entfiele jeder Drittlandtransfer komplett —
analog dazu, wie Umami/GoAccess bereits selbst gehostet werden statt eine Cloud-Variante zu
nutzen. Höherer Betriebsaufwand (eigener Mailserver: DNS/SPF/DKIM/Reverse-DNS, Zustellbarkeit im
Blick behalten), dafür keine Anbieterprüfung mehr nötig.

## Option C — Echter EU-Anbieter statt Weiterleitungs-Spezialist (neu recherchiert 2026-08-07)

Reine kostenlose Weiterleitungsdienste wie ImprovMX/Forward Email scheinen eine überwiegend
US-geprägte Marktnische zu sein — bei der Recherche über `only-eu.eu` (Verzeichnis für
EU-Anbieter) fand sich kein spezialisierter, kostenloser EU-Weiterleitungsdienst. Es gibt aber
etablierte deutsche/europäische Mailbox-Anbieter, die eine eigene Domain unterstützen und darüber
serverseitige Weiterleitung einrichten lassen (Filter-Regel „alles weiterleiten an …" ist bei
praktisch jedem IMAP-Anbieter Standardfunktion, hier aber nicht aus Primärquelle einzeln
bestätigt):

- **mailbox.org** (Deutschland, geprüft: `mailbox.org`) — Daten ausdrücklich „in certified German
  data centres", ISO-27001-zertifiziert, BSI-C5-Testat, keine Erwähnung von US-Sub-Prozessoren.
  Custom-Domain-Unterstützung ab „Standard"-Tarif (ca. 4 EUR/Monat). Kein Free-Tier.
- **Posteo** (Deutschland) — vergleichbar positioniert, bewusst ohne kostenlosen Tarif, ca.
  1 EUR/Monat Einstieg.

**Vorteil dieser Option:** Löst die Drittlandtransfer-Frage vollständig und dauerhaft — keine SCCs,
keine DPF-Prüfung, keine wiederkehrende Anbieter-Neubewertung nötig, da Datenverarbeitung
durchgängig in Deutschland/EU stattfindet. Nachteil: laufende Kosten (ca. 12–48 EUR/Jahr) statt
kostenlos, und die konkrete Auto-Weiterleitungsfunktion ist vor der Entscheidung noch direkt beim
Anbieter zu verifizieren (in der Recherche nicht aus einer Primärquelle bestätigt).

## Option D — Hetzner Webhosting (eigener Bestandsanbieter, nachrecherchiert 2026-08-07 auf Ralfs
Nachfrage: `hetzner.com/webhosting`, `docs.hetzner.com/managed/webhosting/overview`)

Hetzner selbst bietet „Managed Webhosting" (Tarife S/M/L/XL) mit **unbegrenzten Postfächern und
Weiterleitungen** bereits im günstigsten Tarif „S" (10 GB Speicher, 1 Datenbank). Laut Hetzners
eigener Aussage laufen diese Pakete „exklusiv auf Servern in unserem eigenen Rechenzentrumspark in
Nürnberg" — explizit **nicht** in den USA (anders als bei manchen Hetzner-Cloud-Produkten, die
auch US-Standorte haben; das Webhosting-Produkt ist laut Primärquelle Nürnberg-exklusiv).

- **Kein neuer Anbieter, keine neue Vertrags-/Datenschutzprüfung nötig** — Hetzner ist als
  Hosting-Anbieter bereits in Ziffer 3 der Datenschutzerklärung benannt und die Domain
  `nekofix.de` ist ohnehin schon bei Hetzner registriert.
- Genaue aktuelle Monatspreise ließen sich aus der Live-Seite nicht zuverlässig auslesen (Preise
  werden dynamisch/per Skript geladen); ein Aggregator nannte ca. 1,90 EUR/Monat als Einstieg —
  vor Buchung auf `hetzner.com/webhosting` selbst gegenprüfen.
- **Offener Punkt:** ob ein Webhosting-Paket rein für E-Mail (MX-Records) genutzt werden kann,
  während die eigentliche Website weiterhin über den bestehenden Hetzner-Cloud-Server (Coolify)
  läuft, war in der Dokumentation nicht ausdrücklich bestätigt. Technisch ist das branchenüblicher
  Standard (nur MX-Records auf Hetzners Mailserver zeigen, A/AAAA-Records bleiben unverändert auf
  dem Cloud-Server) — trotzdem vor Buchung kurz beim Hetzner-Support absichern.

**Aktualisierte Empfehlung:** Option D ist vermutlich die stimmigste Wahl — kein neuer Anbieter,
schon vorhandene Vertragsbeziehung, günstig, Nürnberg-exklusiv und damit ohne jede
Drittlandtransfer-Frage. Löst das Thema mit dem geringsten zusätzlichen Prüfungsaufwand von allen
vier Optionen. Letzte Entscheidung liegt bei Ralf.

## Akzeptanzkriterien

- [ ] Entscheidung getroffen zwischen Option A (Forward Email gehostet), B (Forward Email selbst
      gehostet), C (echter EU-Anbieter, z. B. mailbox.org/Posteo) oder D (Hetzner Webhosting).
- [ ] Bei A: DPA-Geltung für den tatsächlichen Sign-up-Flow verifiziert (nicht nur aus
      Sekundärquellen übernommen).
- [ ] Bei C: Auto-Weiterleitungsfunktion beim gewählten Anbieter konkret bestätigt.
- [ ] Bei D: aktueller Preis auf `hetzner.com/webhosting` gegengeprüft; beim Support abgesichert,
      dass ein Paket rein für MX/E-Mail nutzbar ist, ohne die bestehende Website-DNS anzufassen.
- [ ] DNS (MX-Records) für `nekofix.de` umgestellt; Weiterleitung Ende-zu-Ende getestet
      (Testmail an `info@nekofix.de` kommt in der tatsächlichen Zielmailbox an).
- [ ] ImprovMX-Konto und die zugehörigen DNS-Einträge nach erfolgreicher Umstellung entfernt.
- [ ] `Datenschutz.tsx` Ziffer 4 aktualisiert: ImprovMX-Absatz durch die tatsächlich zutreffende
      Beschreibung ersetzt (neuer Anbieter + Übermittlungsgrundlage, bzw. bei Option B/C: kein
      Drittlandtransfer).

## Quelle

Ralfs Entscheidung (2026-08-07) im Anschluss an den ImprovMX-Fund während der Session zur
IP-Erhebung auf `stats.nekofix.de` (siehe `Setup-GoAccess-IP-Erhebung-Abschalten.md` und
`Datenschutz.tsx`-Commit `bbcc8e0`). Erste Perplexity-Recherche zu Forward Email, danach auf
Ralfs Bitte eigene, tiefere Web-Recherche (2026-08-07) gegen Primärquellen (Datenschutzerklärung,
GDPR- und DPA-Seite von Forward Email; `only-eu.eu`-Verzeichnis; `mailbox.org`) statt ungeprüfter
Übernahme von Zusammenfassungen.
