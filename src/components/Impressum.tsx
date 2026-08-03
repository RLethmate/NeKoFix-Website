export default function Impressum() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-brand-ink">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <a href="/" className="text-sm text-brand-secondary hover:underline">
          &larr; Zurück zur Startseite
        </a>

        <h1 className="text-3xl font-bold mt-6 mb-8">Impressum</h1>
        <p className="text-sm text-gray-500 mb-8">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz, vormals § 5 TMG)</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Anbieter</h2>
          <p>
            Dr. Ralf Lethmate
            <br />
            Havixburgweg 2a
            <br />
            48147 Münster
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
          <p>
            Telefon: 0251-37989502
            <br />
            E-Mail: info@nekofix.de
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>
            Dr. R. Lethmate
            <br />
            „wie oben"
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Haftungsausschluss</h2>
          <h3 className="font-semibold mt-4 mb-1">Haftung für Inhalte</h3>
          <p className="text-sm">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
            Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
            Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
            Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
            konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
          <h3 className="font-semibold mt-4 mb-1">Haftung für Links</h3>
          <p className="text-sm">
            Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
            keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
            jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
            wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
            permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
            Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Urheberrecht und Schutz des Quellcodes
          </h2>
          <p className="text-sm mb-3">
            Die durch den Betreiber dieser Website erstellten Inhalte, Layouts und Grafiken sowie
            der zugrunde liegende Quellcode (HTML, CSS, JavaScript/TypeScript sowie sämtliche
            Konfigurations- und Build-Dateien) unterliegen dem deutschen Urheberrecht (§§ 2, 69a
            ff. UrhG). Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
            außerhalb der Grenzen des Urheberrechts bedürfen der vorherigen schriftlichen
            Zustimmung des jeweiligen Rechteinhabers.
          </p>
          <p className="text-sm mb-3">Insbesondere ist es untersagt,</p>
          <ul className="list-disc list-inside text-sm mb-3 space-y-1">
            <li>
              den Quellcode dieser Website (auch in Teilen, z. B. über die Entwicklertools des
              Browsers oder durch Herunterladen einzelner Dateien) zu kopieren, zu dekompilieren
              oder in eigenen oder fremden Projekten weiterzuverwenden,
            </li>
            <li>
              Layout, Struktur oder Design dieser Website vollständig oder in wesentlichen Teilen
              nachzubilden,
            </li>
            <li>
              die Inhalte dieser Website ohne Quellenangabe und ohne Zustimmung öffentlich
              zugänglich zu machen.
            </li>
          </ul>
          <p className="text-sm mb-3">
            Downloads und Kopien einzelner Seiten sind nur für den privaten, nicht kommerziellen
            Gebrauch gestattet. Zuwiderhandlungen können zivilrechtliche (u. a. Unterlassungs-
            und Schadensersatzansprüche) sowie strafrechtliche Konsequenzen nach sich ziehen.
          </p>
          <p className="text-sm">
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
            Urheberrechte Dritter beachtet. Inhalte Dritter sind als solche gekennzeichnet.
            Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um
            einen entsprechenden Hinweis an info@nekofix.de. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </section>
      </div>
    </div>
  );
}
