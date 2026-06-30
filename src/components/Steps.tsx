import { Check, ClipboardList, Upload, Calculator, FileCheck2 } from "lucide-react";

export default function Steps() {
  const steps = [
    {
      icon: ClipboardList,
      number: "1",
      title: "Verträge & Stammdaten",
      description:
        "Trage die Rahmendaten deiner Verträge ein. NeKoFix merkt sich Mieter, Vorauszahlungen und Laufzeiten sicher und lokal.",
    },
    {
      icon: Upload,
      number: "2",
      title: "Bank-CSV importieren",
      description:
        "Importiere deinen Kontoauszug als CSV. Das Tool erkennt Mietzahlungen und Kosten automatisch und ordnet sie dem richtigen Mieter zu.",
    },
    {
      icon: Calculator,
      number: "3",
      title: "Automatisch berechnen",
      description:
        "Kosten für Heizung, Grundsteuer und Co. eingeben. Die gesetzliche CO2-Aufteilung rechnet NeKoFix selbstständig aus – ohne Formelsalat.",
    },
    {
      icon: FileCheck2,
      number: "4",
      title: "PDF-Export & Tracking",
      description:
        "Erzeuge auf Knopfdruck formell korrekte PDFs je Mieter mit GiroCode (QR) zum Scannen. Zahlungseingänge hakst du danach einfach ab.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-brand-surface relative overflow-hidden border-b border-brand-cream">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-primary/10 -translate-y-1/2 z-0 hidden lg:block max-w-5xl mx-auto"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-secondary tracking-tight">
            Vom Kontoauszug zur Abrechnung an einem Nachmittag
          </h2>
          <p className="text-md text-brand-ink/60 mt-4 max-w-xl mx-auto">
            Keine komplizierten Schulungen nötig. Unser geführter Workflow leitet dich Schritt für Schritt durch deine Mietverwaltung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center relative group">
              {/* Connector line for mobile/tablet (vertical layout indicator) */}
              {idx < steps.length - 1 && (
                <div className="absolute left-1/2 bottom-0 w-0.5 h-12 bg-brand-primary/10 translate-y-full z-0 block md:hidden"></div>
              )}

              {/* Step Circle & Icon */}
              <div className="w-16 h-16 rounded-full bg-white border-2 border-brand-primary/20 flex items-center justify-center text-brand-primary shadow-sm relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-brand-primary group-hover:shadow-md">
                <step.icon className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center border-2 border-brand-surface shadow-sm">
                  {step.number}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-brand-secondary mt-6 mb-3">{step.title}</h3>
              <p className="text-brand-ink/70 leading-relaxed text-sm max-w-[250px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
