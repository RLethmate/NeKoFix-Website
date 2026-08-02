# US-92 · Rechtstexte einbinden (Impressum, Datenschutz, Urheberrecht)

**Status:** Done (2026-08-02, technische Umsetzung committet und gepusht) — anwaltliche Prüfung
vor Live-Gang laut letztem AC weiterhin offen

**Als** Betreiber der NeKoFix-Website
**möchte ich** rechtssichere Texte für Impressum, Datenschutzerklärung und einen
Urheberrechtshinweis auf der Seite bereitstellen,
**damit** keine Abmahnung wegen fehlender Pflichtangaben droht und der Quellcode nicht
ungefragt kopiert oder weiterverwendet wird.

## Ausgangslage (Stand 2026-07-13)

- Reines Frontend (Vite + React), kein Backend, keine Datenbank.
- Das Formular in `src/components/Pricing.tsx` ist aktuell nur simuliert
  (`setTimeout`), sendet nichts an einen Server und speichert nichts dauerhaft.
  Eingaben leben nur im Browser-Zustand (React State) und sind nach Neuladen weg.
- Google Fonts werden extern von `fonts.googleapis.com` geladen (siehe
  `index.html`) → das ist der in Deutschland mit Abstand häufigste
  Abmahnungsgrund bei Websites, weil dabei die IP-Adresse an Google übertragen wird.
- Kein Cookie-Einsatz, kein Analyse-/Tracking-Tool im Code gefunden.
- `src/components/Footer.tsx` hat bereits Platzhalter-Links für „Impressum“,
  „Datenschutz“, „AGB“ (`href="#"`), aber ohne Ziel-Seiten.
- Namensgebung und Hosting sind noch nicht entschieden — siehe Empfehlung unten.

## Offene Entscheidung: Name & Hosting

Diese Entscheidung kann ich nicht für dich treffen, da sie von Präferenz, Budget und
Marke abhängt. Meine Einschätzung als Empfehlung:

**Hosting:** Die Seite ist eine rein statische Vite-Build-Ausgabe (aktuell ca. 250 KB
JS/CSS plus einige MP4-Videos). Jeder Static-Hosting-Anbieter reicht technisch aus.
Da NeKoFix sich selbst als „lokal“ und datensparsam positioniert (siehe
„NeKoFix LOCAL“-Branding in `Hero.tsx`) und die Zielgruppe (private Vermieter in
Deutschland) für Datenschutzthemen sensibilisiert ist, würde ich einen Anbieter mit
Sitz und Servern in der EU/Deutschland bevorzugen — das hält die
Datenschutzerklärung einfach (kein Drittlandtransfer-Absatz nötig) und passt zur
Marke:
- **Empfehlung 1 (Deutschland-Fokus):** IONOS Deploy Now, netcup oder Hetzner. Git-Push-Deploy für statische Sites ist bei allen dreien möglich, deutsche AGB/AVV, EU-Serverstandort.
- **Empfehlung 2 (mehr Komfort, US-Anbieter):** Vercel oder Netlify — sehr einfache CI/CD-Anbindung an GitHub, großzügiges Free-Tier, aber Sitz in den USA. Das erfordert zusätzlich einen Absatz zu Auftragsverarbeitung/Standardvertragsklauseln (Drittlandtransfer) in der Datenschutzerklärung (siehe Platzhalter unten).

**Domain-Name:** Für eine deutsche Zielgruppe spricht vieles für eine `.de`-Domain,
z. B. `nekofix.de`. Ich kann die aktuelle Verfügbarkeit nicht verlässlich prüfen —
das bitte direkt bei einem Registrar (z. B. DENIC-Whois, INWX, netcup) checken,
bevor Impressum/Domain final festgelegt werden.

Sobald Name und Hosting feststehen, bitte in dieser Story ergänzen — das
beeinflusst u. a. den Absatz „Hosting und Server-Logfiles“ in der
Datenschutzerklärung unten.

## Akzeptanzkriterien

- [x] Impressum-Seite ist unter einer eigenen Route/Anker erreichbar, alle
      Platzhalter sind durch echte Angaben ersetzt.
- [x] Datenschutzerklärung-Seite ist erreichbar, alle Platzhalter sind ersetzt,
      der Google-Fonts-Absatz ist entfernt, sobald Fonts selbst gehostet werden
      (siehe technische Empfehlung unten), oder angepasst, falls nicht.
- [x] Footer-Links „Impressum“ und „Datenschutz“ (`Footer.tsx`, Zeile 10–11) zeigen
      auf die neuen Seiten statt auf `href="#"`.
- [x] Der Urheberrechtshinweis ist im Impressum enthalten und untersagt explizit
      die Übernahme des Quellcodes.
- [x] Kein erfundener Platzhaltertext bleibt sichtbar auf der Live-Seite stehen
      (z. B. „[E-Mail-Adresse]“) — vor Veröffentlichung Review-Schritt einbauen.
- [ ] Empfehlung: Vor Live-Gang anwaltliche Prüfung der finalen Texte, da dies keine
      Rechtsberatung ersetzt.

## Texte mit Platzhaltern

Alle Platzhalter sind in `[eckigen Klammern]` markiert. Nicht zutreffende
Abschnitte (z. B. Handelsregister bei Einzelperson ohne Eintrag) bitte löschen.

---

### Impressum

Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz, vormals § 5 TMG)

**Anbieter:**
[Vollständiger Name bzw. Firma mit Rechtsform]
[Straße und Hausnummer]
[PLZ Ort]
[Land, falls nicht Deutschland]

**Vertreten durch:** [Name der vertretungsberechtigten Person — bei
Einzelunternehmen ohne Vertretung diesen Punkt löschen]

**Kontakt:**
Telefon: [Telefonnummer] (optional, aber empfehlenswert)
E-Mail: [E-Mail-Adresse]

**Registereintrag:** (nur falls im Handelsregister eingetragen — sonst Abschnitt löschen)
Eintragung im Handelsregister
Registergericht: [Registergericht]
Registernummer: [HRB/HRA-Nummer]

**Umsatzsteuer-ID:** (nur falls vorhanden — sonst Abschnitt löschen)
Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [USt-IdNr.]

**Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:**
[Name]
[Anschrift, falls identisch: „wie oben“]

#### Haftungsausschluss

**Haftung für Inhalte**
Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.

**Haftung für Links**
Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf
deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
umgehend entfernen.

#### Urheberrecht und Schutz des Quellcodes

Die durch den Betreiber dieser Website erstellten Inhalte, Layouts und Grafiken
sowie der zugrunde liegende Quellcode (HTML, CSS, JavaScript/TypeScript sowie
sämtliche Konfigurations- und Build-Dateien) unterliegen dem deutschen
Urheberrecht (§§ 2, 69a ff. UrhG). Die Vervielfältigung, Bearbeitung, Verbreitung
und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.

Insbesondere ist es untersagt,
- den Quellcode dieser Website (auch in Teilen, z. B. über die Entwicklertools
  des Browsers oder durch Herunterladen einzelner Dateien) zu kopieren, zu
  dekompilieren oder in eigenen oder fremden Projekten weiterzuverwenden,
- Layout, Struktur oder Design dieser Website vollständig oder in wesentlichen
  Teilen nachzubilden,
- die Inhalte dieser Website ohne Quellenangabe und ohne Zustimmung öffentlich
  zugänglich zu machen.

Downloads und Kopien einzelner Seiten sind nur für den privaten, nicht
kommerziellen Gebrauch gestattet. Zuwiderhandlungen können zivilrechtliche
(u. a. Unterlassungs- und Schadensersatzansprüche) sowie strafrechtliche
Konsequenzen nach sich ziehen.

Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden
die Urheberrechte Dritter beachtet. Inhalte Dritter sind als solche gekennzeichnet.
Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten
wir um einen entsprechenden Hinweis an [E-Mail-Adresse]. Bei Bekanntwerden von
Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.

---

### Datenschutzerklärung

Stand: [Datum einsetzen]

#### 1. Verantwortlicher

Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:

[Name bzw. Firma]
[Anschrift]
E-Mail: [E-Mail-Adresse]
Telefon: [Telefonnummer] (falls angegeben)

#### 2. Grundsatz: Datensparsamkeit durch lokale Verarbeitung

Diese Website ist bewusst so gebaut, dass personenbezogene Daten so weit wie
möglich lokal auf dem Endgerät der Besucherin oder des Besuchers verbleiben. Es
gibt aktuell kein Server-Backend, keine Datenbank und keine Übermittlung von
Formulareingaben an uns oder an Dritte. Eingaben, die Sie z. B. in einem
Formular auf dieser Seite machen, werden ausschließlich vorübergehend im
Arbeitsspeicher Ihres Browsers verarbeitet und gehen beim Schließen oder
Neuladen der Seite verloren. Es findet keine Speicherung auf unseren Servern statt.

Sobald sich dieser technische Stand ändert (z. B. durch Anbindung eines
tatsächlichen Formular-Versands), wird diese Datenschutzerklärung entsprechend
ergänzt.

#### 3. Hosting und Server-Logfiles

Diese Website wird gehostet bei: [Name und Anschrift des Hosting-Anbieters einsetzen]

Beim Aufruf dieser Website erhebt der Hosting-Anbieter automatisch technisch
notwendige Zugriffsdaten („Server-Logfiles“), die Ihr Browser automatisch
übermittelt. Dazu gehören in der Regel:
- IP-Adresse des zugreifenden Geräts
- Datum und Uhrzeit des Zugriffs
- aufgerufene Datei/Seite, übertragene Datenmenge
- Browsertyp und -version, verwendetes Betriebssystem
- die zuvor besuchte Seite (Referrer-URL)

Diese Daten werden zur Sicherstellung eines störungsfreien Betriebs, zur
Auslastungskontrolle der Server und zur Gewährleistung der IT-Sicherheit
verarbeitet (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO — berechtigtes
Interesse). Eine Zusammenführung mit anderen Datenquellen findet nicht statt.

[Nur einfügen, falls der Hosting-Anbieter außerhalb der EU/des EWR sitzt (z. B.
Vercel, Netlify, GitHub Pages/USA): „Der Hosting-Anbieter hat seinen Sitz in
einem Drittland außerhalb der EU/des EWR. Mit dem Anbieter besteht ein
Auftragsverarbeitungsvertrag nach Art. 28 DSGVO; die Übermittlung erfolgt auf
Grundlage der EU-Standardvertragsklauseln nach Art. 46 DSGVO. Name und Sitz des
Anbieters bitte hier konkret einsetzen und prüfen.“]

#### 4. Google Fonts

[Diesen Abschnitt nur beibehalten, falls Google Fonts weiterhin extern von
Google-Servern geladen werden — siehe technische Empfehlung unten, dies zu
vermeiden]

Diese Website nutzt zur einheitlichen Darstellung von Schriftarten „Google
Fonts“, einen Dienst der Google Ireland Limited, Gordon House, Barrow Street,
Dublin 4, Irland („Google“). Beim Aufruf dieser Website lädt Ihr Browser die
benötigten Schriftarten direkt von Servern von Google. Dabei wird Ihre
IP-Adresse an Google übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
DSGVO (berechtigtes Interesse an einer technisch stabilen und einheitlichen
Darstellung). Weitere Informationen zu Google Fonts finden Sie in der
Datenschutzerklärung von Google: https://policies.google.com/privacy.

#### 5. Kontakt-/Feedbackformular

[Anpassen, sobald das Formular tatsächlich Daten versendet]

Sofern diese Website ein Kontakt- oder Feedbackformular bereitstellt, werden die
dort eingegebenen Daten (Name, E-Mail-Adresse, Nachricht) nach aktuellem
technischem Stand nicht an uns übermittelt und nicht gespeichert (siehe Ziffer
2). Sobald ein tatsächlicher Versand implementiert wird, werden Zweck,
Rechtsgrundlage (i. d. R. Art. 6 Abs. 1 lit. b oder f DSGVO) und Speicherdauer
hier ergänzt.

#### 6. Cookies und Tracking

Diese Website setzt derzeit keine Cookies und keine Analyse- oder
Trackingtools (z. B. Google Analytics, Matomo, Meta-Pixel) ein. Es findet kein
Tracking Ihres Verhaltens auf dieser Website statt.

#### 7. Ihre Rechte als betroffene Person

Ihnen stehen nach der DSGVO folgende Rechte gegenüber uns zu, soweit die
gesetzlichen Voraussetzungen vorliegen:
- Recht auf Auskunft (Art. 15 DSGVO)
- Recht auf Berichtigung (Art. 16 DSGVO)
- Recht auf Löschung (Art. 17 DSGVO)
- Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
- Recht auf Datenübertragbarkeit (Art. 20 DSGVO)
- Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO)

Zur Ausübung dieser Rechte wenden Sie sich bitte an die unter Ziffer 1 genannte
Kontaktadresse.

#### 8. Beschwerderecht bei einer Aufsichtsbehörde

Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder
gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer
Datenschutz-Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres
Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes,
wenn Sie der Ansicht sind, dass die Verarbeitung Sie betreffender
personenbezogener Daten gegen die DSGVO verstößt (Art. 77 DSGVO).

Zuständige Aufsichtsbehörde: [Landesdatenschutzbehörde am Sitz des Anbieters
einsetzen — richtet sich nach dem Bundesland des Anbieters]

---

## Technische Empfehlung (unabhängig vom Text, aber Voraussetzung für Ziffer 4)

**Google Fonts selbst hosten statt extern von Google laden.** Das ist der
häufigste einzelne Abmahnungsgrund für deutsche Websites (bekannt seit der
Rechtsprechung 2022 zu genau diesem Thema: externes Nachladen von Google Fonts
übermittelt die IP-Adresse ohne Einwilligung an Google). Die Google-Fonts-Datei
lässt sich stattdessen lokal in `public/fonts/` einbinden und per `@font-face`
in `src/index.css` referenzieren — dann entfällt Ziffer 4 der
Datenschutzerklärung komplett und das Risiko ist beseitigt. Das ist eine reine
Code-Änderung, keine inhaltliche Entscheidung, und sollte zusammen mit dieser
Story oder direkt danach umgesetzt werden.

## Hinweis

Diese Texte folgen gängigen rechtlichen Standardformulierungen für Impressum
und Datenschutzerklärung nach deutschem Recht (DDG, MStV, DSGVO, UrhG). Sie
ersetzen keine Rechtsberatung. Vor dem Live-Gang wird eine Prüfung durch eine
Rechtsanwältin oder einen Rechtsanwalt empfohlen — insbesondere sobald ein
echtes Formular-Backend, Zahlungsabwicklung oder Tracking hinzukommt, da sich
die Datenschutzerklärung dann inhaltlich ändern muss.
