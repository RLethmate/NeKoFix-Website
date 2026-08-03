import { ArrowRight, Play, Database, Shield, Zap, Scale } from "lucide-react";
import { useState } from "react";
import NekoFixWordmark from "./NekoFixWordmark";

export default function Hero() {
  // A/B testing claims config
  const claims = [
    {
      h1: "Mietverwaltung & Abrechnung - fast wie von selbst.",
      sub: "Die datenschutzfreundliche Alternative zu Excel und teuren Software-Abos. Entwickelt für private Vermieter, die ihre Immobilien nebenbei verwalten – orientiert am aktuellen Rechtsstand, zügig einsetzbar und 100% lokal."
    },
    {
      h1: "Vom Kontoauszug zur fertigen Abrechnung – an einem Nachmittag.",
      sub: "Keine Formelfehler in Excel, kein Stress mit Techem oder Ista. Verwalte deine Mieteinheiten, passe Mieten automatisch an und erstelle Abrechnungen lokal im Browser."
    },
    {
      h1: "Nach aktuellem Rechtsstand abrechnen und verwalten.",
      sub: "CO2-Aufteilung, Indexmieten und Heizungswechsel uvm. einfach gelöst. Deine sensiblen Mieterdaten verlassen niemals deinen PC – datenschutzfreundlich lokal gespeichert."
    },
    {
      h1: "Die Hausverwaltungs-App, die Spaß macht.",
      sub: "Weil alles an einem Ort ist und du die Fäden selbst in der Hand hast: Mieteinheiten, Abrechnungen und Zahlungen übersichtlich zusammen – statt verteilt auf Excel, PDFs und E-Mails."
    },
    {
      h1: "Mieterdaten gehören Mietern – nicht der Cloud.",
      sub: "Volle Datenhoheit, kein Kompromiss: Sensible Mieter- und Finanzdaten verlassen niemals deinen Computer. NeKoFix verarbeitet alles lokal in deinem Browser – ganz ohne fremde Server."
    }
  ];

  // Default to first claim, can be easily toggled or integrated with an A/B test parameter
  const [activeClaimIdx, setActiveClaimIdx] = useState(0);

  return (
    <section className="relative bg-brand-surface pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-brand-cream">
      {/* Decorative Grid Background for Premium Look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          {/* Beta Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
            Gratis Beta-Phase: Voller Funktionsumfang bis Ende September kostenlos
          </div>

          {/* Headline - Modular for A/B Testing */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-secondary leading-[1.1] mb-6 text-glow">
            {claims[activeClaimIdx].h1}
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl leading-relaxed text-brand-ink/80 max-w-3xl mb-8">
            {claims[activeClaimIdx].sub}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mb-12">
            <a
              href="https://app.nekofix.de/?start=leer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-brand-primary rounded-xl hover:bg-brand-primary/95 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Kostenlos ausprobieren
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="https://app.nekofix.de/?start=demo"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-brand-secondary bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              <Database className="mr-2 w-5 h-5 text-brand-primary" />
              Demodaten laden
            </a>
          </div>

          {/* A/B Test Swapper (Simulated / For client review) */}
          <div className="flex items-center gap-2 mb-10 px-3 py-1.5 bg-brand-cream/50 rounded-lg border border-brand-cream text-xs text-brand-ink/60">
            <span>Claims testen:</span>
            {claims.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveClaimIdx(idx)}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold transition-all ${
                  activeClaimIdx === idx 
                    ? 'bg-brand-primary text-white shadow-sm' 
                    : 'bg-white hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl border-t border-brand-cream pt-8">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm text-brand-ink">Datenschutzfreundlich by Design</h3>
                <p className="text-xs text-brand-ink/60">Alle Daten bleiben lokal auf deinem PC</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm text-brand-ink">Zügig</h3>
                <p className="text-xs text-brand-ink/60">Bank-CSV rein, Abrechnung raus</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm text-brand-ink">Rechtlich aktuell</h3>
                <p className="text-xs text-brand-ink/60">Inklusive CO2-Aufteilung & § 35a</p>
              </div>
            </div>
          </div>
        </div>

        {/* Asymmetric Interactive App Mockup (Slightly tilted for premium feel) */}
        <div className="relative mx-auto w-full max-w-5xl lg:translate-y-8 z-10 transition-transform duration-500 hover:rotate-0 transform rotate-0 lg:-rotate-1 lg:scale-102">
          <div className="rounded-2xl border border-gray-200/80 bg-[#f3f4f6] shadow-2xl overflow-hidden aspect-[16/10] flex flex-col relative w-full">
            
            {/* App Header */}
            <div className="bg-brand-secondary px-6 py-3.5 flex items-center justify-between text-white border-b border-black/10 shrink-0">
              <div className="flex items-center gap-4">
                <div className="tracking-tight text-xl flex items-center"><NekoFixWordmark /><span className="text-brand-primary bg-white px-1.5 py-0.5 rounded ml-1.5 text-xs font-semibold">LOCAL</span></div>
                <div className="flex items-center gap-2 text-xs ml-6">
                  <span className="text-white/60">Aktives Objekt:</span>
                  <div className="bg-black/15 hover:bg-black/25 border border-white/10 rounded px-2.5 py-1.5 flex items-center gap-6 cursor-pointer transition-colors backdrop-blur-sm">
                    <span className="truncate max-w-[130px]">Mehrfamilienhaus - Schillerstr. 4</span>
                    <span className="opacity-50 text-[10px]">▼</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/10">Abrechnungsjahr: 2025</span>
              </div>
            </div>

            {/* App Body Layout */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Sidebar Steps */}
              <div className="w-56 bg-gray-50 border-r border-gray-200/80 p-5 shrink-0 flex flex-col gap-1 hidden sm:flex">
                <div className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-wider">Abrechnungs-Flow</div>
                {[
                  {num: "1", label: "Gebäude & Einheiten", active: false},
                  {num: "2", label: "Heizung", active: false},
                  {num: "3", label: "Kosten", active: false},
                  {num: "4", label: "Nebenkosten-Saldo", active: false},
                ].map(s => (
                  <div key={s.num} className="flex items-center gap-3 py-2 px-2.5 rounded-lg hover:bg-white text-sm text-gray-500 hover:text-gray-900 transition-all cursor-pointer">
                    <div className="w-6 h-6 rounded-full border border-gray-200 text-gray-400 bg-white flex items-center justify-center text-[11px] font-bold">{s.num}</div>
                    <span className="font-medium text-xs">{s.label}</span>
                  </div>
                ))}

                <div className="flex items-center gap-3 mt-1 py-2 px-2.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-semibold cursor-pointer relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary"></div>
                  <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-[11px] font-bold ml-1">5</div>
                  <span className="text-xs">Fertige Abrechnung</span>
                </div>

                <div className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-wider mt-6">Zahlungen & Tracking</div>
                <div className="flex items-center gap-3 py-2 px-2.5 rounded-lg hover:bg-white text-sm text-gray-500 hover:text-gray-900 transition-all cursor-pointer">
                  <div className="w-6 h-6 rounded-full border border-gray-200 text-gray-400 bg-white flex items-center justify-center text-[11px] font-bold">6</div>
                  <span className="font-medium text-xs">Zahlungen (Ist)</span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 bg-white p-6 flex flex-col min-w-0">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">5 · Fertige Abrechnung</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Alle Mieterabrechnungen sind geprüft und bereit zum Export.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                    Bereit zum Versand
                  </span>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-2 mb-4 overflow-x-hidden border-b border-gray-100 pb-3">
                  <div className="px-3.5 py-2 rounded-lg border border-gray-200 bg-gray-50 text-xs text-gray-600 font-medium whitespace-nowrap shadow-sm">EG · Christian Weber</div>
                  <div className="px-3.5 py-2 rounded-lg border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-xs font-bold whitespace-nowrap shadow-sm">1. OG · Familie Yilmaz</div>
                  <div className="px-3.5 py-2 rounded-lg border border-gray-200 bg-gray-50 text-xs text-gray-600 font-medium whitespace-nowrap shadow-sm">DG · Familie Nguyen</div>
                </div>

                {/* Document Card */}
                <div className="flex-1 bg-gray-50/50 border border-gray-200/60 rounded-xl p-6 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start border-b border-gray-200/80 pb-4 mb-4">
                      <div>
                        <h3 className="text-md font-bold text-gray-800">Betriebs- und Heizkostenabrechnung 2025</h3>
                        <div className="text-[11px] text-gray-400 mt-1">
                          Objekt: Schillerstr. 4 · Einheit: 1. OG · Mieter: <b>Familie Yilmaz</b>
                        </div>
                      </div>
                      <div className="bg-brand-cream/80 text-brand-secondary px-3 py-1.5 rounded-lg border border-brand-cream text-center text-xs font-semibold shrink-0">
                        GiroCode aktiv ✓
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 bg-white rounded-lg p-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>Gesamtkosten Anteil</span>
                          <span className="font-semibold text-gray-800">2.140,50 €</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>Geleistete Vorauszahlung</span>
                          <span className="font-semibold text-gray-800">2.400,00 €</span>
                        </div>
                        <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-bold text-green-600">
                          <span>Dein Guthaben</span>
                          <span>259,50 €</span>
                        </div>
                      </div>

                      <div className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col justify-between">
                        <div className="text-xs text-gray-600">
                          <b>Steuer-Vorteil (§ 35a):</b><br/>
                          Lohnanteil Handwerker: <b>185,20 €</b> ausweisbar für Mieter-Steuererklärung.
                        </div>
                        <div className="text-[10px] text-brand-primary font-medium mt-2">
                          ✓ Automatische CO2-Aufteilung berechnet
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Faded bottom indicating table */}
                  <div className="h-10 bg-gradient-to-t from-gray-100/50 to-transparent mt-4 rounded-b-lg border-t border-gray-200/40 flex items-center justify-center text-xs text-gray-400 font-medium">
                    (Vorschau-Modus: Vollständiges PDF wird bei Export freigeschaltet)
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/5 blur-3xl -z-10 rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
