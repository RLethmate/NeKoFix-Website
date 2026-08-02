import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Verlängert sich die Jahres-Lizenz automatisch?",
      answer: "Nein. Wir glauben an faire Verträge ohne Abo-Fallen. Es gibt bei uns keine automatische Verlängerung. Nach Ablauf des Lizenzjahres entscheidest du selbst ganz flexibel, ob du eine neue Lizenz für die nächste Abrechnungsperiode erwerben möchtest."
    },
    {
      question: "Kann ich meine Daten aus dem Vorjahr wiederverwenden?",
      answer: "Ja, uneingeschränkt. Da alle Daten als lokale Projektdatei bei dir auf dem PC liegen, lädst du deine Datei einfach im neuen Abrechnungsjahr wieder in das Tool. Alle Stammdaten, Mieter und Kostenverteiler werden übernommen, und die Beträge werden geleert, damit du direkt mit den neuen Belegen starten kannst."
    },
    {
      question: "Was passiert, wenn ich während des Jahres eine weitere Wohnung verwalte?",
      answer: "Da die App komplett lokal läuft, kannst du jederzeit neue Wohnungen und Objekte hinzufügen – während der Erprobungsphase bis Ende September ohne Begrenzung bei der Anzahl. Danach erwirbst du für die nächste Abrechnung unkompliziert einen einmaligen Lizenzschlüssel."
    },
    {
      question: "Benötige ich für das Tool eine ständige Internetverbindung?",
      answer: "Nur zum Laden der Website und zum Generieren des PDF-Exports ist eine Internetverbindung erforderlich. Da die Datenverarbeitung jedoch lokal in deinem Browser stattfindet, werden zu keinem Zeitpunkt sensible Mieterdaten an externe Server übertragen."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
            Häufig gestellte Fragen
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-xl transition-colors duration-200 ${isOpen ? 'border-brand-primary bg-brand-surface/30' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-brand-ink text-lg pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-brand-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 text-brand-ink/80 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
