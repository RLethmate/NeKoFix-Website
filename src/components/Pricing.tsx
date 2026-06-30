import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Check, Send, ShieldCheck, Ticket, KeyRound, ExternalLink } from "lucide-react";

export default function Pricing() {
  // Feedback Form State
  const [formData, setFormData] = useState({ name: "", email: "", type: "Problem", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  // Urgency Countdown (Simulated remaining slots to avoid time zone issues, or time countdown to end of month)
  const [slotsLeft, setSlotsLeft] = useState(14);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 });

  useEffect(() => {
    // Generate countdown to end of current month
    const updateCountdown = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = endOfMonth.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    // Slowly decrease remaining spots over time to simulate live urgency
    const spotsInterval = setInterval(() => {
      setSlotsLeft(prev => (prev > 3 ? prev - 1 : prev));
    }, 45000);

    return () => {
      clearInterval(interval);
      clearInterval(spotsInterval);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormStatus("sending");
    // Simulate API request to serverless function / Formspree
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", type: "Problem", message: "" });
    }, 1500);
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-brand-surface relative border-b border-brand-cream">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-secondary mb-4 tracking-tight">
            Gemeinsam zum besten Miet-Assistenten
          </h2>
          <p className="text-lg text-brand-ink/70 leading-relaxed">
            Wir glauben nicht an teure Monats-Abos für Software, die du nur einmal im Jahr brauchst. Unterstütze uns in der Erprobungsphase und sichere dir dauerhaften kostenlosen Zugang.
          </p>
        </div>

        {/* Pricing Layout: Ticket on Left, Activation Details & Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* LEFT: The Premium Beta Ticket (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl border-2 border-brand-primary shadow-xl overflow-hidden">
              
              {/* Ticket Top */}
              <div className="bg-brand-primary p-6 text-white text-center relative">
                <Ticket className="w-12 h-12 mx-auto mb-3 opacity-90 animate-pulse" />
                <h3 className="text-xl font-bold tracking-wide uppercase">Beta-Erprobungs-Ticket</h3>
                <p className="text-xs text-white/80 mt-1">Gültig für die aktuelle Abrechnungsperiode</p>
                
                {/* Ticket Notch left and right */}
                <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-brand-surface border-r-2 border-brand-primary"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-brand-surface border-l-2 border-brand-primary"></div>
              </div>

              {/* Ticket Body */}
              <div className="p-8 pt-10 space-y-6">
                
                {/* Price Display */}
                <div className="text-center">
                  <span className="text-5xl font-extrabold text-brand-secondary">0,00 €</span>
                  <span className="text-brand-ink/50 text-sm ml-1">/ dauerhaft</span>
                </div>

                <div className="border-t border-b border-dashed border-gray-200 py-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-brand-primary shrink-0" strokeWidth={2.5} />
                    <span className="font-semibold text-brand-secondary">Bis zu 3 Wohneinheiten</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-brand-primary shrink-0" strokeWidth={2.5} />
                    <span className="font-semibold text-brand-secondary">Voller Funktionsumfang</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-brand-primary shrink-0" strokeWidth={2.5} />
                    <span className="font-semibold text-brand-secondary">Lokale DSGVO-Sicherheit</span>
                  </div>
                </div>

                {/* Urgency Widget */}
                <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/10">
                  <div className="flex justify-between items-center text-xs font-bold text-brand-secondary mb-2">
                    <span>Verfügbare Test-Plätze:</span>
                    <span className="text-brand-warning">{slotsLeft} / 100 übrig</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-3">
                    <div className="bg-brand-primary h-full transition-all duration-1000" style={{ width: `${slotsLeft}%` }}></div>
                  </div>
                  <div className="text-center text-[11px] text-brand-ink/60">
                    Aktion läuft diesen Monat noch:<br />
                    <span className="font-mono font-bold text-brand-secondary text-xs">
                      {timeLeft.hours} Std. {timeLeft.minutes} Min. {timeLeft.seconds} Sek.
                    </span>
                  </div>
                </div>

                <div className="text-xs text-brand-ink/50 text-center leading-relaxed">
                  Deine einzige Gegenleistung: Teile uns über das Formular mit, wenn du auf ein Problem stößt oder Wünsche hast!
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Activation Explanation & Feedback Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Freischaltung Info Box */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-secondary">Wie funktioniert die Freischaltung?</h3>
                  <p className="text-xs text-brand-ink/50">Fairer Lizenzschlüssel – keine Abofalle</p>
                </div>
              </div>

              <div className="text-sm text-brand-ink/80 leading-relaxed space-y-2">
                <p>
                  Für größere Portfolios (4+ Einheiten) erwerben Sie einen einmaligen Lizenzschlüssel via Stripe.
                </p>
                <p className="text-xs">
                  💡 <b>Lokaler Datenschutz garantiert:</b> Der Code wird im Offline-Kaufprozess aus deinem <b>Objektname + Abrechnungsjahr</b> generiert. Die eigentliche Abrechnungs-Software prüft den Schlüssel komplett lokal bei dir im Browser. Es werden zu keinem Zeitpunkt Mieter- oder Finanzdaten über das Internet übertragen.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="https://stripe.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-xs font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                >
                  Zu den Stripe-Optionen
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* ACCESSIBLE FEEDBACK FORM */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm">
              <h3 className="font-bold text-xl text-brand-secondary mb-2">Feedback & Problem melden</h3>
              <p className="text-xs text-brand-ink/50 mb-6">
                Hilf uns, NeKoFix zum besten Werkzeug für private Vermieter zu machen. Sende uns deine Kritik, Verbesserungsvorschläge oder Fehlermeldungen direkt zu.
              </p>

              {formStatus === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600">
                    <Check className="w-6 h-6 animate-checkmark" strokeWidth={3} />
                  </div>
                  <h4 className="font-bold text-green-900">Vielen Dank für deine Nachricht!</h4>
                  <p className="text-xs text-green-700">
                    Wir haben dein Feedback erhalten und prüfen es umgehend, um NeKoFix weiter zu verbessern.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors shadow"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-brand-secondary mb-1">
                        Dein Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="z. B. Ralf" 
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-brand-secondary mb-1">
                        E-Mail-Adresse <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="z. B. ralf@example.com" 
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-xs font-bold text-brand-secondary mb-1">
                      Kategorie <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="type" 
                      name="type" 
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                    >
                      <option value="Problem">Fehler melden / Problem beim Abrechnen</option>
                      <option value="Idee">Verbesserungsvorschlag / Neue Idee</option>
                      <option value="Frage">Frage zur Lizenz oder Freischaltung</option>
                      <option value="Lob">Allgemeines Lob / Sonstiges</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-brand-secondary mb-1">
                      Deine Nachricht <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Beschreibe kurz, wo es hakt oder was du dir wünschst..." 
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === "sending"}
                    className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 shadow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {formStatus === "sending" ? (
                      <span>Wird gesendet...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Feedback senden</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
