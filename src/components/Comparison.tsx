import { ShieldAlert, AlertTriangle, CheckCircle2, Flame, HelpCircle } from "lucide-react";
import NekoFixWordmark from "./NekoFixWordmark";

export default function Comparison() {
  const comparisons = [
    {
      title: "Excel-Tabellen",
      subtitle: "Alles selbst bauen",
      icon: AlertTriangle,
      iconColor: "text-amber-500 bg-amber-50",
      points: [
        "Formeln selbst aufbauen und pflegen – Fehler fallen oft erst spät auf",
        "CO2-Aufteilung und Heizkostenregeln musst du selbst abbilden",
        "Mieter-Schreiben jedes Jahr von Hand formatieren",
        "Keine eingebaute Plausibilitätsprüfung",
        "Unterjährige Mieterwechsel erfordern Zusatzrechnungen"
      ],
      badge: "Viel Handarbeit",
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
        "Zahlungstracking & Index-/Staffelmiete berechnen",
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
      title: "Messdienst-Komplettservice",
      subtitle: "Abrechnung durch einen externen Dienstleister",
      icon: ShieldAlert,
      iconColor: "text-gray-500 bg-gray-100",
      points: [
        "Abrechnungsgebühr je Wohnung und Jahr, oft zusätzlich Gerätemiete",
        "Zeitpunkt der Abrechnung hängt vom Dienstleister ab",
        "Vertragslaufzeiten häufig an die Messgeräte gekoppelt",
        "Rundum-Service inklusive Ablesung und Gerätewartung"
      ],
      badge: "Eher für größere Bestände",
      badgeColor: "bg-gray-100 text-gray-700",
      highlight: false
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden border-b border-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-secondary tracking-tight mb-6">
            Zwischen Excel-Eigenbau und externem Abrechnungsdienst. <br/> Gibt es einen Mittelweg?
          </h2>
          <p className="text-lg text-brand-ink/70 leading-relaxed">
            Fehler in der Nebenkostenabrechnung können teuer werden und belasten das Mietverhältnis. Bei 1 bis 5 Wohnungen passen Monats-Abos und Komplettservices nicht immer zum Aufwand. <br/> Die Daten pflegst du ohnehin selbst – dann kannst du auch selbst abrechnen.
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
