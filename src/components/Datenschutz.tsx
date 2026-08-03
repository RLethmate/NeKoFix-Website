export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-brand-ink">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <a href="/" className="text-sm text-brand-secondary hover:underline">
          &larr; Zurück zur Startseite
        </a>

        <h1 className="text-3xl font-bold mt-6 mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-gray-500 mb-8">Stand: 04-08-2026</p>

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
            Speicherung auf unseren Servern gibt. Eine Ausnahme ist das Kontakt-/Feedbackformular
            (siehe Ziffer 4): Dort eingegebene Daten werden tatsächlich an uns übermittelt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">3. Hosting und Server-Logfiles</h2>
          <p className="text-sm mb-3">
            Diese Website wird gehostet bei: Hetzner Online GmbH, Industriestr. 25, 91710
            Gunzenhausen, Deutschland.
          </p>
          <p className="text-sm mb-3">
            Beim Aufruf dieser Website erhebt der Hosting-Anbieter automatisch technisch
            notwendige Zugriffsdaten („Server-Logfiles"), die Ihr Browser automatisch übermittelt.
            Dazu gehören in der Regel:
          </p>
          <ul className="list-disc list-inside text-sm mb-3 space-y-1">
            <li>IP-Adresse des zugreifenden Geräts</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>aufgerufene Datei/Seite, übertragene Datenmenge</li>
            <li>Browsertyp und -version, verwendetes Betriebssystem</li>
            <li>die zuvor besuchte Seite (Referrer-URL)</li>
          </ul>
          <p className="text-sm">
            Diese Daten werden zur Sicherstellung eines störungsfreien Betriebs, zur
            Auslastungskontrolle der Server und zur Gewährleistung der IT-Sicherheit verarbeitet
            (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse). Eine
            Zusammenführung mit anderen Datenquellen findet nicht statt. Der Hosting-Anbieter hat
            seinen Sitz in Deutschland (EU), ein Drittlandtransfer findet nicht statt.
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
          <h2 className="text-xl font-semibold mb-2">5. Cookies und Tracking</h2>
          <p className="text-sm">
            Diese Website setzt derzeit keine Cookies und keine Analyse- oder Trackingtools (z. B.
            Google Analytics, Matomo, Meta-Pixel) ein. Es findet kein Tracking Ihres Verhaltens
            auf dieser Website statt. Auch Schriftarten werden ausschließlich lokal von diesem
            Server ausgeliefert, nicht von externen Font-Anbietern nachgeladen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">6. Ihre Rechte als betroffene Person</h2>
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
            7. Beschwerderecht bei einer Aufsichtsbehörde
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
