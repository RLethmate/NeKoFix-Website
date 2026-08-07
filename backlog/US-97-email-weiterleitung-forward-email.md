# US-97 · E-Mail-Weiterleitung von ImprovMX auf Forward Email umziehen

**Status:** Open

**Als** Betreiber von NeKoFix
**möchte ich** die E-Mail-Weiterleitung für `info@nekofix.de` von ImprovMX auf Forward Email
umstellen (gehostet oder selbst betrieben),
**damit** eingehende Post nicht mehr über einen Anbieter läuft, der sich für den
US-Drittlandtransfer nur unzertifiziert auf das EU-US Data Privacy Framework beruft, sondern über
einen Dienst mit einer tatsächlich gültigen Übermittlungsgrundlage — oder, bei Self-Hosting, ganz
ohne Drittlandtransfer.

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
US-Drittlandtransfers ohne Not"). Ralf hat entschieden, auf Forward Email (forwardemail.net)
umzuziehen.

### Rechtlicher Befund zu Forward Email (geprüft 2026-08-07, Quellen: `forwardemail.net/en/privacy`,
`/en/gdpr`, `/en/dpa`)

- Betreiber: Forward Email LLC, Delaware, USA (Gerichtsstand laut DPA: „The State of Delaware,
  United States"). Ebenfalls ein US-Unternehmen — das ändert sich durch den Anbieterwechsel nicht.
- **Free-Tier-Weiterleitung läuft laut eigener Aussage rein im Arbeitsspeicher** („we do not store
  any forwarded emails to disk storage nor databases … operate in-memory only") — vergleichbar mit
  dem Prinzip, das wir bei Umami/Traefik in dieser Session selbst umgesetzt haben.
- **Übermittlungsgrundlage ist konkreter als bei ImprovMX:** Das DPA bindet automatisch die
  EU-Standardvertragsklauseln der EU-Kommission (Durchführungsbeschluss 2021/914) ein — Modul 2
  (Controller→Processor) und Modul 3 (Processor→Sub-Processor) — plus ein UK-Addendum. Keine
  Erwähnung des (unwirksamen) Privacy Shield oder einer unzertifizierten DPF-Behauptung.
- **Offene Frage, vor der Entscheidung zu klären:** Die GDPR-Seite behauptet, die Terms-of-Service-
  Annahme schließe automatisch das DPA mit ein; das DPA-Dokument selbst verlangt aber eine
  gesonderte „Cover Page"-Zustimmung. Unklar, ob ein reiner Free-Tier-Sign-up diese Cover Page
  überhaupt bekommt — das sollte beim tatsächlichen Setup geprüft werden, sonst ist unklar, ob die
  SCCs für uns wirklich greifen.
- Sub-Prozessoren sind ausnahmslos US-Unternehmen (Cloudflare, DataPacket, DigitalOcean, GitHub,
  Vultr, Stripe, PayPal) — die SCCs decken das ab, ändern aber nichts daran, dass die Infrastruktur
  weiterhin überwiegend US-betrieben ist.
- **Alternative, die das Thema vollständig löst:** Forward Email ist vollständig Open Source
  (`github.com/forwardemail`) und lässt sich selbst hosten. Auf dem eigenen Hetzner-Server
  betrieben, entfiele jeder Drittlandtransfer komplett — analog dazu, wie Umami/GoAccess bereits
  selbst gehostet werden statt eine Cloud-Variante zu nutzen.

## Akzeptanzkriterien

- [ ] Entscheidung getroffen: Forward Email gehostet (Free- oder Paid-Tier) **oder** selbst
      gehostet auf eigener Infrastruktur.
- [ ] Falls gehostet: geprüft, ob beim tatsächlichen Sign-up eine DPA-„Cover Page" vorgelegt und
      akzeptiert wird (offene Frage oben klären, nicht ungeprüft übernehmen).
- [ ] DNS (MX-Records) für `nekofix.de` umgestellt; Weiterleitung Ende-zu-Ende getestet
      (Testmail an `info@nekofix.de` kommt in der tatsächlichen Zielmailbox an).
- [ ] ImprovMX-Konto und die zugehörigen DNS-Einträge nach erfolgreicher Umstellung entfernt.
- [ ] `Datenschutz.tsx` Ziffer 4 aktualisiert: ImprovMX-Absatz durch die tatsächlich zutreffende
      Beschreibung ersetzt (Forward Email + SCCs, bzw. bei Self-Hosting: kein Drittlandtransfer).

## Quelle

Ralfs Entscheidung (2026-08-07) im Anschluss an den ImprovMX-Fund während der Session zur
IP-Erhebung auf `stats.nekofix.de` (siehe `Setup-GoAccess-IP-Erhebung-Abschalten.md` und
`Datenschutz.tsx`-Commit `bbcc8e0`); Perplexity-Recherche zu Alternativen als Ausgangspunkt, hier
gegen die tatsächlichen Primärquellen (Datenschutzerklärung, GDPR- und DPA-Seite von Forward
Email) verifiziert statt ungeprüft übernommen.
