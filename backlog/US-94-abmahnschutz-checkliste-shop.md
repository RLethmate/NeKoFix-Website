# US-94 · Abmahnschutz-Checkliste für Checkout, Hosting und künftiges SaaS-Tool abarbeiten

**Status:** offen

**Als** Betreiber der NeKoFix-Website und des dahinterstehenden Tools
**möchte ich** die über den aktuellen Stand von [US-92](US-92-rechtstexte-einbinden.md) hinausgehenden
Abmahnrisiken rund um Hosting, künftigen Checkout und das SaaS-Tool systematisch abarbeiten,
**damit** auch mit Zahlungsabwicklung, Kundenkonten und Auftragsverarbeitung keine neuen
Abmahngründe entstehen.

## Ausgangslage (Stand 2026-08-02)

Diese Story fasst eine Checkliste zusammen, die Ralf über Perplexity eingeholt hat. Die Punkte
wurden gegen den tatsächlichen Stand des Projekts geprüft — nicht alles trifft aktuell zu oder ist
schon umsetzbar. Details siehe Abschnitt „Bewertung der Einzelpunkte" unten.

**Diskrepanz geklärt (2026-08-02):** Die Checkliste ging von einem Jahresabo mit automatischer
Verlängerung aus. Ralf hat bestätigt: **es bleibt beim Kein-Abo-Modell** aus
`Konzept-Hosting-und-Freischaltung.md` (Pay-per-Abrechnung, ein Freischalt-Code pro Objekt und
Abrechnungsjahr, keine laufende Vertragsbeziehung, keine automatische Verlängerung). Die
Checkout-Rechtstexte (AC „vor dem ersten echten Checkout" unten) sind entsprechend für einen
Einmalkauf zu formulieren, nicht für ein Abo — Passagen zu automatischer Verlängerung/Kündigung
vor Fristende aus der Perplexity-Vorlage entfallen damit.

**Ebenfalls im Zuge dieser Story entfernt:** Zwei Stripe-Erwähnungen in `FAQ.tsx` und die
Stripe-Textstelle plus der externe Link nach stripe.com in `Pricing.tsx` — der
Zahlungsdienstleister ist laut `Konzept-Hosting-und-Freischaltung.md` noch offen (Merchant of
Record vs. Stripe), die Seite sollte sich also noch nicht auf einen Anbieter festlegen.

## Akzeptanzkriterien

**Jetzt umsetzbar (unabhängig vom Checkout-Modell):**

- [ ] Ein Auftragsverarbeitungsvertrag (AVV, Art. 28 DSGVO) mit Hetzner als Hosting-Anbieter ist
      abgeschlossen bzw. akzeptiert (Hetzner stellt i. d. R. einen Standard-AVV im Kundenkonto
      bereit — prüfen und bestätigen, in der Datenschutzerklärung referenzieren).
- [x] Zwei-Faktor-Authentifizierung ist für das Hetzner-Konto und den Coolify-Admin-Zugang
      aktiviert. Stand 2026-11-15: Hetzner-Konto 2FA aktiv, Coolify-2FA eingerichtet (beides
      laut Ralf).
      Zusätzlich: Hetzner-Cloud-Firewall `nekofix-firewall` auf `nekofix-prod` angewendet —
      eingehend nur TCP 22/80/443 und ICMP; Coolify nur noch über `https://coolify.nekofix.de`
      (Port 8000 gesperrt, per Außen-Test verifiziert).
- [ ] Herkunft der verwendeten Bilder, Icons und Videos ist bestätigt (eigene Aufnahmen/Screen-
      recordings vs. Drittquellen mit Lizenz) — bislang nicht verifiziert, da nicht aus dem Code
      ersichtlich.
- [ ] Kurzer Review der Marketing-Texte auf unbelegte Alleinstellungsbehauptungen — erste Prüfung
      (2026-08-02) fand keine „Nr. 1"/„Testsieger"-Aussagen, nur kollaborative Formulierungen
      („gemeinsam zum besten machen"); bei neuen Texten künftig ebenso vermeiden.

**Bewusst zurückgestellt, aber als Gate vor dem jeweiligen Feature dokumentiert:**

- [ ] **Vor Einführung von Cookies/Tracking/Analyse-Tools:** Consent-Banner mit echter
      Ablehnen-Option, keine Datenerhebung vor Einwilligung (§ 25 TDDDG). Aktuell nicht nötig —
      es gibt keine Cookies und kein Tracking im Code (Stand bestätigt).
- [ ] **Vor dem ersten echten Checkout (siehe US-39/US-40/US-41/US-43 im Root-Backlog):**
      gesetzeskonforme Bestell-Button-Beschriftung, Bestellzusammenfassung vor Kauf (Preis,
      Laufzeit bzw. Einmaligkeit, Widerrufsrecht), kein vorangehaktes Newsletter-Opt-in,
      Bestellbestätigung per E-Mail mit Rechtstexte-Links. Voraussetzung: die oben genannte
      Jahresabo-vs-Pay-per-Abrechnung-Frage ist geklärt, da sie den genauen Wortlaut bestimmt.
- [ ] **Vor Einführung eines echten Zahlungsdienstleisters:** PCI-konformer Anbieter (z. B.
      Stripe/PayPal), keine eigene Speicherung vollständiger Kartendaten, Rechnungsstellung mit
      allen Pflichtangaben, AVV mit dem Zahlungsdienstleister.
- [ ] **Vor Einführung von Nutzerkonten/serverseitiger Datenverarbeitung im Tool (Stufe 2 laut
      Konzept-Hosting-und-Freischaltung.md):** Verzeichnis von Verarbeitungstätigkeiten (VVT),
      Löschkonzept, Prozess für Auskunfts-/Löschanfragen (DSAR) sowie ein Datenpannen-Prozess
      (Meldung an Aufsichtsbehörde binnen 72 h). Bis dahin entfällt das größtenteils, da Stufe 1
      laut Konzept bewusst ohne Server-seitige Verarbeitung personenbezogener Mieterdaten
      auskommt.
- [ ] **Vor Einführung eines Newsletters:** Double-Opt-in, getrennt vom Bestellprozess,
      Abmeldelink in jeder E-Mail. Aktuell existiert kein Newsletter-Feature.

**Laufend:**

- [ ] Vierteljährlicher bzw. release-begleitender Kurz-Check: Cookie-Einsatz, Datenschutz-
      erklärung, Sub-Auftragsverarbeiter-Liste, SSL-Zertifikat, Rechtstexte-Links weiterhin
      korrekt und aktuell.
- [ ] **Barrierefreiheitsstärkungsgesetz (BFSG) im Blick behalten:** Geprüft (2026-08-02) —
      BFSG gilt seit 28.06.2025 u. a. für E-Commerce-/SaaS-Dienstleistungen, es gibt aber eine
      Kleinstunternehmen-Ausnahme für Dienstleistungen (< 10 Beschäftigte **und** ≤ 2 Mio. €
      Jahresumsatz/-bilanzsumme). Als Einzelunternehmer erfüllt Ralf diese Ausnahme aktuell klar
      — Website/Tool müssen derzeit nicht BFSG-barrierefrei sein. Kein akuter Handlungsbedarf,
      aber bei Wachstum über die Schwellenwerte neu bewerten. Keine Rechtsberatung, nur
      Ersteinschätzung.

## Bewertung der Einzelpunkte (Perplexity-Checkliste vs. Ist-Stand)

1. Impressum & Anbieterkennzeichnung — bereits erledigt in US-92 (1 Klick über Footer erreichbar).
2. Rechtstexte vor Kauf (Datenschutz/AGB/Widerruf/Preisangaben) — Datenschutz erledigt (US-92);
   AGB/Widerruf/Preisangaben siehe AC „vor dem ersten echten Checkout" oben.
3. Checkout & Bestellprozess — kein echter Checkout vorhanden, siehe AC oben.
4. Cookie-Banner & Tracking — aktuell nicht zutreffend, siehe AC oben.
5. Externe Dienste & Webfonts — Google Fonts bereits selbst gehostet (US-93); Code auf weitere
   externe Skripte/Social-Buttons geprüft (2026-08-02) — keine gefunden.
6. Sicherheit & Hosting — HTTPS folgt aus dem laufenden Hosting-Setup (US-42 im Root-Backlog);
   AVV mit Hetzner und 2FA siehe AC oben; EU-Hosting bereits gegeben (Hetzner, Deutschland).
7. Datenverarbeitung im Tool (Privacy by Design) — durch die Client-only-Architektur des Tools
   (Konzept-Hosting-und-Freischaltung.md, „Datenhoheit bleibt im Browser") in Stufe 1 größtenteils
   von selbst erfüllt; VVT erst relevant mit Stufe 2, siehe AC oben.
8. Betroffenenrechte & Prozesse — erst mit serverseitiger Verarbeitung relevant, siehe AC oben.
9. Zahlung & Abrechnung — kein Zahlungsdienstleister im Einsatz, siehe AC oben; betrifft auch die
   in `Konzept-Hosting-und-Freischaltung.md` offene Merchant-of-Record-vs-Stripe-Entscheidung.
10. Marketing & Kommunikation — kein Newsletter vorhanden; Werbeaussagen geprüft, siehe AC oben.
11. Urheber-/Markenrecht — Urheberrechtshinweis für eigene Inhalte bereits im Impressum (US-92);
    Markenrecht für den Namen „NeKoFix" separat in [US-129](../../backlog/US-129-positionierung-und-markenrecht-entscheiden.md)
    im Root-Backlog verortet (grobe Ersteinschätzung erfolgt, keine Registerprüfung); Bildherkunft
    siehe AC oben.
12. Laufendes Audit — als eigene, wiederkehrende AC übernommen (siehe „Laufend" oben).

## Quelle

Von Ralf über Perplexity eingeholte Checkliste für SaaS-Abmahnrisiken (2026-08-02), abgeglichen
mit `Konzept-Hosting-und-Freischaltung.md` und [US-92](US-92-rechtstexte-einbinden.md).
