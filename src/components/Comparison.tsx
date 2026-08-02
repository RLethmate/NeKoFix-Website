import { ShieldAlert, AlertTriangle, CheckCircle2, Flame, HelpCircle } from "lucide-react";
import NekoFixWordmark from "./NekoFixWordmark";

export default function Comparison() {
  const comparisons = [
    {
      title: "Excel-Tabellen",
      subtitle: "Die Selbermacher-Hölle",
      icon: AlertTriangle,
      iconColor: "text-amber-500 bg-amber-50",
      points: [
        "Hohes Risiko für teure Formelfehler",
        "Neues CO2-Gesetz (CO2KostAufG) nicht berechenbar",
        "Stundenlanges Word-Formatieren für jeden Mieter",
        "Keine Plausibilitätsprüfung vor dem Absenden",
        "Völlig ungeeignet für unterjährige Wechsel"
      ],
      badge: "Risikoreich",
      badgeColor: "bg-amber-100 text-amber-800",
      highlight: false
    },
    {
      title: "NeKoFix Assistent",
      subtitle: "Der stressfreie Mittelweg",
      icon: CheckCircle2,
      iconColor: "text-brand-primary bg-brand-primary/10",
      points: [
        "Automatische CO2-Splittung & Heizperioden-Wechsel",
        "Zahlungstracking & automatische Mietanpassungen",
        "GiroCode (QR) auf Abrechnung – scannen, fertig",
        "Integrierter Plausibilitäts-Check vor dem Druck",
        "100% lokal: Mieterdaten verlassen nie deinen PC",
        "Einmalig zahlen nur bei Export, kein Abo-Zwang"
      ],
      badge: "Empfohlen für private Vermieter",
      badgeColor: "bg-brand-primary text-white",
      highlight: true
    },
    {
      title: "Abrechnungs-Riesen",
      subtitle: "Die Techem-/Ista-Gebührenfalle",
      icon: ShieldAlert,
      iconColor: "text-red-500 bg-red-50",
      points: [
        "Hohe Gebühren, die sich bei 1–5 Einheiten nicht lohnen",
        "Monatelange Wartezeiten auf die fertige Abrechnung",
        "Mieter beschweren sich über späte Zustellung",
        "Komplizierte, unpersönliche Hotline-Schnittstellen",
        "Knebelverträge mit teurer Geräte-Miete"
      ],
      badge: "Überteuert",
      badgeColor: "bg-red-100 text-red-800",
      highlight: false
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden border-b border-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-secondary tracking-tight mb-6">
            Zwischen Excel-Frust und Stress mit den großen Abrechnungskonzernen. <br/> Oder gibt es einen smarten Mittelweg?
          </h2>
          <p className="text-lg text-brand-ink/70 leading-relaxed">
            Fehler in der Nebenkostenabrechnung können teuer werden und belasten das Mieterverhältnis. Für 1 bis 5 Wohnungen lohnen sich jedoch weder teure Monats-Abos noch die Abrechnungs-Riesen mit monatelangen Wartezeiten. <br/> Außerdem muss man alle Daten eh selbst pflegen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {comparisons.map((comp, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col rounded-2xl p-8 relative transition-all duration-300 ${
                comp.highlight 
                  ? 'border-2 border-brand-primary bg-brand-surface/30 shadow-xl lg:-translate-y-4 z-10' 
                  : 'border border-gray-200 bg-white shadow-sm hover:border-gray-300'
              }`}
            >
              {/* Badge */}
              <div className="absolute top-0 -translate-y-1/2 left-8">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${comp.badgeColor}`}>
                  {comp.badge}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-4 mb-6 mt-2">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${comp.iconColor}`}>
                  <comp.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-secondary">
                    {comp.title === "NeKoFix Assistent" ? (
                      <><NekoFixWordmark /> Assistent</>
                    ) : (
                      comp.title
                    )}
                  </h3>
                  <p className="text-xs text-brand-ink/50 font-medium">{comp.subtitle}</p>
                </div>
              </div>

              {/* Points */}
              <ul className="space-y-4 flex-1 mb-8">
                {comp.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <span className={`text-md leading-none shrink-0 ${comp.highlight ? 'text-brand-primary' : 'text-gray-400'}`}>
                      {comp.highlight ? "✓" : "•"}
                    </span>
                    <span className={`text-sm ${comp.highlight ? 'text-brand-ink font-medium' : 'text-brand-ink/70'}`}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom Context (only for NeKoFix) */}
              {comp.highlight && (
                <div className="border-t border-brand-primary/20 pt-6 text-center">
                  <span className="text-xs text-brand-secondary font-semibold italic">
                    Lokale Sicherheit & volle Kontrolle über deine Finanzen.
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
