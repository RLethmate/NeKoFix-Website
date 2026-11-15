import { useState, ChangeEvent, FormEvent } from "react";
import { Check, Send, ShieldCheck, KeyRound } from "lucide-react";

const FEEDBACK_API_URL = import.meta.env.VITE_FEEDBACK_API_URL || "https://api.nekofix.de/feedback";

// Eigenes Ticket-Icon statt lucide's "Ticket": die schmale, taillierte Kontur von lucide
// wirkte bei Ralf wie ein Autobahnschild statt einem Kino-/Eintrittsticket. Diese Variante
// zeigt die klassische Ticket-Silhouette (Rechteck mit Perforationslinie und Lochung oben/unten).
function TicketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2" strokeDasharray="2.2 2.2" />
      <circle cx="12" cy="4" r="2" className="fill-brand-primary" />
      <circle cx="12" cy="20" r="2" className="fill-brand-primary" />
    </svg>
  );
}

export default function Pricing() {
  // Feedback Form State
  const [formData, setFormData] = useState({ name: "", email: "", type: "Problem", message: "", website: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  // Beta-Ticket-Anmeldung: eigenes, kleineres Formular direkt am Ticket (US-Anmeldeprozess).
  // Sammelt E-Mail + Einverständnis zur erneuten Kontaktaufnahme, um den Freischalt-Code
  // (siehe calc.js nkFreischaltCode, Stufe 1: manuelle Ausgabe durch den Concierge) zeitnah
  // per E-Mail nachzureichen.
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({ name: "", email: "", consent: false, website: "" });
  const [signupStatus, setSignupStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [signupError, setSignupError] = useState("");

  const handleSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.consent) return;

    setSignupStatus("sending");
    setSignupError("");

    try {
      const response = await fetch(FEEDBACK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          type: "Beta-Freischaltung",
          message:
            "Möchte den kostenlosen Freischalt-Code für die Beta-Erprobungsphase erhalten (versandfertiges PDF ohne Wasserzeichen). " +
            "Einverständnis zur Kontaktaufnahme per E-Mail zwecks Code-Ausgabe und Rückfragen zur Beta-Phase: ja.",
          website: signupData.website,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unbekannter Fehler beim Senden.");
      }

      setSignupStatus("success");
      setSignupData({ name: "", email: "", consent: false, website: "" });
    } catch (err) {
      setSignupStatus("error");
      setSignupError(err instanceof Error ? err.message : "Anfrage konnte nicht gesendet werden. Bitte später erneut versuchen.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("sending");
    setFormError("");

    try {
      const response = await fetch(FEEDBACK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unbekannter Fehler beim Senden.");
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", type: "Problem", message: "", website: "" });
    } catch (err) {
      setFormStatus("error");
      setFormError(err instanceof Error ? err.message : "E-Mail konnte nicht gesendet werden. Bitte später erneut versuchen.");
    }
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
            Wir glauben nicht an teure Monats-Abos für Software, die du nur einmal im Jahr brauchst. Unterstütze uns in der Erprobungsphase und sichere dir kostenlosen Zugang für ein Jahr.
          </p>
        </div>

        {/* Pricing Layout: Ticket on Left, Activation Details & Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* LEFT: The Premium Beta Ticket (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl border-2 border-brand-primary shadow-xl overflow-hidden">
              
              {/* Ticket Top */}
              <div className="bg-brand-primary p-6 text-white text-center relative">
                <TicketIcon className="w-12 h-12 mx-auto mb-3 opacity-90" />
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
                  <span className="text-brand-ink/50 text-sm ml-1">/ 1 Jahr</span>
                </div>

                <div className="border-t border-b border-dashed border-gray-200 py-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-brand-primary shrink-0" strokeWidth={2.5} />
                    <span className="font-semibold text-brand-secondary">Unbegrenzte Wohneinheiten</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-brand-primary shrink-0" strokeWidth={2.5} />
                    <span className="font-semibold text-brand-secondary">Voller Funktionsumfang</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-brand-primary shrink-0" strokeWidth={2.5} />
                    <span className="font-semibold text-brand-secondary">Daten bleiben lokal bei dir</span>
                  </div>
                  <div className="text-xs text-brand-ink/50 pl-8">
                    Gilt für ein Objekt (Gebäude) mit beliebig vielen Einheiten.
                  </div>
                </div>

                {/* Beta-Hinweis (ersetzt den früheren Countdown und den festen Platz-Zähler) */}
                <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/10 text-center text-[11px] text-brand-ink/70 leading-relaxed">
                  Die Erprobungsphase läuft. Ihr Ende kündigen wir rechtzeitig vorher an.
                </div>

                <div className="text-xs text-brand-ink/50 text-center leading-relaxed">
                  Deine einzige Gegenleistung: Teile uns über das Formular mit, wenn du auf ein Problem stößt oder Wünsche hast!
                </div>

                {/* Anmeldeprozess: Klick auf das Ticket sichert den Freischalt-Code (ohne Wasserzeichen) */}
                {signupStatus === "success" ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center space-y-1">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600">
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </div>
                    <h4 className="font-bold text-green-900 text-sm">Ticket gesichert!</h4>
                    <p className="text-xs text-green-700">
                      Wir melden uns zeitnah per E-Mail mit deinem persönlichen Freischalt-Code.
                    </p>
                  </div>
                ) : !showSignup ? (
                  <button
                    type="button"
                    onClick={() => setShowSignup(true)}
                    className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 shadow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Ticket kostenlos sichern
                  </button>
                ) : (
                  <form onSubmit={handleSignupSubmit} className="space-y-3 text-left">
                    {/* Honeypot-Feld gegen Spam-Bots */}
                    <input
                      type="text"
                      name="website"
                      value={signupData.website}
                      onChange={handleSignupChange}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] w-px h-px overflow-hidden"
                    />
                    <div>
                      <label htmlFor="signup-name" className="block text-xs font-bold text-brand-secondary mb-1">
                        Dein Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="signup-name"
                        name="name"
                        required
                        value={signupData.name}
                        onChange={handleSignupChange}
                        placeholder="z. B. Bernd"
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="signup-email" className="block text-xs font-bold text-brand-secondary mb-1">
                        E-Mail-Adresse <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="signup-email"
                        name="email"
                        required
                        value={signupData.email}
                        onChange={handleSignupChange}
                        placeholder="z. B. bernd@example.com"
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                      />
                    </div>
                    <label className="flex items-start gap-2 text-xs text-brand-ink/70 leading-relaxed">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        checked={signupData.consent}
                        onChange={handleSignupChange}
                        className="mt-0.5 shrink-0"
                      />
                      <span>
                        Ich bin einverstanden, dass NeKoFix mich per E-Mail zur Ausgabe meines Freischalt-Codes und zu Rückfragen zur Beta-Phase kontaktiert. <span className="text-red-500">*</span>
                      </span>
                    </label>

                    {signupStatus === "error" && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-xs text-red-700">
                        {signupError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={signupStatus === "sending" || !signupData.consent}
                      className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 shadow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {signupStatus === "sending" ? "Wird gesendet..." : "Ticket kostenlos sichern"}
                    </button>
                  </form>
                )}
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
                  Für die aktuelle Erprobungsphase sicherst du dir den Freischalt-Code kostenlos über das Beta-Ticket links – trag dort einfach Name und E-Mail-Adresse ein. Nach der Erprobungsphase erwirbst du für die nächste Abrechnung einen einmaligen Lizenzschlüssel nach dem gleichen Prinzip.
                </p>
                <p className="text-xs">
                  <b>Lokaler Datenschutz:</b> Der Code wird im Offline-Kaufprozess aus deinem <b>Objektname + Abrechnungsjahr</b> generiert. Die eigentliche Abrechnungs-Software prüft den Schlüssel komplett lokal bei dir im Browser. Es werden zu keinem Zeitpunkt Mieter- oder Finanzdaten über das Internet übertragen.
                </p>
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
                  {/* Honeypot-Feld gegen Spam-Bots: für Menschen unsichtbar, echte Nutzer lassen es leer */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] w-px h-px overflow-hidden"
                  />

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
                        placeholder="z. B. Bernd" 
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
                        placeholder="z. B. bernd@example.com" 
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

                  {formStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
                      {formError}
                    </div>
                  )}

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
