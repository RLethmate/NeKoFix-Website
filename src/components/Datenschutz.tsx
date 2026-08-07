export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-brand-ink">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <a href="/" className="text-sm text-brand-secondary hover:underline">
          &larr; Zurück zur Startseite
        </a>

        <h1 className="text-3xl font-bold mt-6 mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-gray-500 mb-8">Stand: 07-08-2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">1. Verantwortlicher</h2>
          <p className="text-sm">
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            <br />
            Dr. Ralf Lethmate
            <br />
            Havixburgweg 2a, 48147 Münster
            <br />
            E-Mail: info@nekofix.de
            <br />
            Telefon: 0251-37989502
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            2. Grundsatz: Datensparsamkeit durch lokale Verarbeitung
          </h2>
          <p className="text-sm">
            Diese Website ist bewusst so gebaut, dass personenbezogene Daten so weit wie möglich
            lokal auf dem Endgerät der Besucherin oder des Besuchers verbleiben und es außer den
            in Ziffer 3 beschriebenen Server-Logfiles keine Datenbank und keine dauerhafte
            Speicherung auf unseren Servern gibt. Eine Ausnahme sind das Kontakt-/Feedbackformular
            und das Beta-Ticket-Anmeldeformular (siehe Ziffer 4 und 5): Dort eingegebene Daten
            werden an uns übermittelt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">3. Hosting und Server-Logfiles</h2>
          <p className="text-sm mb-3">
            Diese Website wird gehostet bei: Hetzner Online GmbH, Industriestr. 25, 91710
            Gunzenhausen, Deutschland.
          </p>
          <p className="text-sm mb-3">
            Beim Aufruf dieser Website erhebt der von uns betriebene Reverse-Proxy technisch
            notwendige Zugriffsdaten („Server-Logfiles"). Dazu gehören:
          </p>
          <ul className="list-disc list-inside text-sm mb-3 space-y-1">
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>aufgerufene Datei/Seite, HTTP-Methode und Statuscode</li>
          </ul>
          <p className="text-sm mb-3">
            Die IP-Adresse des zugreifenden Geräts wird dabei bewusst <strong>nicht</strong>
            protokolliert oder gespeichert (ebenso wie bei der in Ziffer 6 beschriebenen
            Web-Analyse).
          </p>
          <p className="text-sm mb-3">
            Diese Daten werden zur Sicherstellung eines störungsfreien Betriebs und zur
            Auslastungskontrolle der Server verarbeitet (Rechtsgrundlage: Art. 6 Abs. 1 lit. f
            DSGVO — berechtigtes Interesse). Eine Zusammenführung mit anderen Datenquellen oder ein
            Personenbezug findet nicht statt. Der Hosting-Anbieter hat seinen Sitz in Deutschland
            (EU), ein Drittlandtransfer findet nicht statt.
          </p>
          <p className="text-sm">
            Zusätzlich werten wir diese Logfiles mit dem selbst gehosteten, quelloffenen Tool
            GoAccess aggregiert aus (z. B. Seitenaufrufe, aufgerufene Seiten, Fehlerquote). Der
            daraus erzeugte Report ist ausschließlich für uns selbst bestimmt und
            passwortgeschützt; er enthält keine personenbezogenen Daten.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">4. Kontakt-/Feedbackformular</h2>
          <p className="text-sm mb-3">
            Wenn Sie das Feedbackformular auf dieser Website nutzen, übermitteln wir die dort
            eingegebenen Daten (Name, E-Mail-Adresse, ausgewählte Kategorie, Nachricht) an einen
            von uns betriebenen Server, der daraus automatisiert eine E-Mail erzeugt und diese
            über den E-Mail-Versanddienst Gmail (Google Ireland Limited, Gordon House, Barrow
            Street, Dublin 4, Irland) an unser eigenes Postfach zustellt. Rechtsgrundlage ist
            Art. 6 Abs. 1 lit. b bzw. f DSGVO (Bearbeitung Ihrer Anfrage bzw. unser berechtigtes
            Interesse daran).
          </p>
          <p className="text-sm mb-3">
            Auf unserem Server selbst werden die Formulardaten nicht dauerhaft gespeichert
            (keine Datenbank); sie bestehen nur für die Dauer der Verarbeitung des jeweiligen
            Sendevorgangs. Gespeichert werden die Angaben ausschließlich als E-Mail in unserem
            Postfach, bis wir sie im Rahmen der Anfragebearbeitung löschen. Zusätzlich wird die
            IP-Adresse des absendenden Geräts serverseitig für bis zu eine Stunde vorgehalten, um
            eine zu hohe Anzahl an Einsendungen von derselben Adresse zu verhindern
            (Missbrauchsschutz), und danach automatisch verworfen.
          </p>
          <p className="text-sm">
            Die Angabe der Daten ist freiwillig; ohne sie können wir Ihr Feedback jedoch nicht
            beantworten.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">5. Beta-Ticket-Anmeldeformular</h2>
          <p className="text-sm mb-3">
            Über das Beta-Ticket auf der Preise-Seite können Sie sich für die aktuell kostenlose
            Erprobungsphase anmelden. Wenn Sie dieses Formular nutzen, übermitteln wir die dort
            eingegebenen Daten (Name, E-Mail-Adresse, Einverständnis zur Kontaktaufnahme) an
            denselben, in Ziffer 4 beschriebenen Server, der daraus automatisiert eine E-Mail an
            unser eigenes Postfach erzeugt. Verarbeitung, Speicherung (keine Datenbank, IP-
            Vorhaltung zum Missbrauchsschutz) und Versand erfolgen technisch identisch zum
            Kontakt-/Feedbackformular (siehe Ziffer 4).
          </p>
          <p className="text-sm mb-3">
            Wir nutzen die Daten ausschließlich, um Ihnen den kostenlosen Freischalt-Code für die
            Beta-Erprobungsphase per E-Mail zuzusenden und um Rückfragen zur Beta-Phase zu klären.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erbringung der von Ihnen angeforderten,
            unentgeltlichen Leistung) in Verbindung mit Ihrer im Formular abgegebenen Einwilligung
            zur Kontaktaufnahme (Art. 6 Abs. 1 lit. a DSGVO).
          </p>
          <p className="text-sm">
            Die Angabe der Daten ist freiwillig; ohne sie können wir Ihnen jedoch keinen
            Freischalt-Code zusenden.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">6. Cookies und Web-Analyse</h2>
          <p className="text-sm mb-3">
            Diese Website setzt keine Cookies ein. Zur anonymen, aggregierten Analyse der
            Seitenaufrufe verwenden wir <strong>Umami</strong>, ein selbst gehostetes, quelloffenes
            Analyse-Tool, das ausschließlich auf unserem eigenen Server
            (analytics.nekofix.de, ebenfalls bei Hetzner Online GmbH) betrieben wird. Es findet
            keine Übermittlung an Dritte oder an Server außerhalb der EU statt.
          </p>
          <p className="text-sm mb-3">
            Umami erhebt keine personenbezogenen Daten im Sinne der DSGVO: Es werden keine Cookies
            gesetzt, keine IP-Adressen gespeichert und keine Nutzerinnen oder Nutzer
            geräteübergreifend wiedererkannt. Ausgewertet werden lediglich aggregierte,
            nicht-personenbeziehbare Kennzahlen wie Seitenaufrufe, ungefähre Herkunft (Land) und
            verwendeter Gerätetyp/Browser. Das entspricht demselben Grundsatz wie bei den in
            Ziffer 3 beschriebenen Server-Logfiles, die ebenfalls keine IP-Adressen enthalten.
          </p>
          <p className="text-sm mb-3">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
            Reichweitenmessung zur Optimierung unseres Angebots). Da keine personenbezogenen Daten
            verarbeitet werden, ist gemäß § 25 TTDSG bzw. Art. 6 Abs. 1 lit. f DSGVO keine
            Einwilligung erforderlich.
          </p>
          <p className="text-sm">
            Auch Schriftarten werden weiterhin ausschließlich lokal von diesem Server
            ausgeliefert, nicht von externen Font-Anbietern nachgeladen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">7. Ihre Rechte als betroffene Person</h2>
          <p className="text-sm mb-3">
            Ihnen stehen nach der DSGVO folgende Rechte gegenüber uns zu, soweit die gesetzlichen
            Voraussetzungen vorliegen:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>
          <p className="text-sm mt-3">
            Zur Ausübung dieser Rechte wenden Sie sich bitte an die unter Ziffer 1 genannte
            Kontaktadresse.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            8. Beschwerderecht bei einer Aufsichtsbehörde
          </h2>
          <p className="text-sm">
            Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen
            Rechtsbehelfs das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde,
            insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des
            Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung Sie
            betreffender personenbezogener Daten gegen die DSGVO verstößt (Art. 77 DSGVO).
          </p>
          <p className="text-sm mt-3">
            Zuständige Aufsichtsbehörde: Landesbeauftragte für Datenschutz und
            Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Kavalleriestraße 2–4, 40213
            Düsseldorf.
          </p>
        </section>
      </div>
    </div>
  );
}
