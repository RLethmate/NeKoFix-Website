import { useRef, useState, MouseEvent } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      if (video.ended) {
        video.currentTime = 0;
      }
      setHasEnded(false);
      video.play();
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  const handleMute = (e: MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  const handleVideoClick = () => {
    handlePlay();
  };

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden border-b border-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-secondary tracking-tight mb-4">
            Vom Beleg zur Zahlung – ohne Umwege
          </h2>
          <p className="text-lg text-brand-ink/70 max-w-2xl mx-auto">
          Abrechnung erstellt, PDF geöffnet und am Ende der GiroCode per iPhone eingescannt. Der Mieter zahlt bequem und ohne Tippfehler.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Video Container */}
          <div
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60 bg-gray-900 cursor-pointer group"
            onClick={handleVideoClick}
          >
            <video
              ref={videoRef}
              src="/assets/QR-Code-Scan.mp4"
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
              playsInline
              preload="metadata"
            />

            {/* Play / Pause Overlay – shown when not playing and not just finished (stays on last frame after playback) */}
            {!isPlaying && !hasEnded && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 group-hover:bg-black/60">
                {/* Play Button */}
                <div className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <Play className="w-9 h-9 text-white ml-1.5 fill-current" />
                </div>

                {!hasStarted && (
                  <div className="bg-black/50 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Mit Ton – GiroCode-Scan am Ende
                  </div>
                )}
              </div>
            )}

            {/* Controls (visible while playing or on hover) */}
            {hasStarted && (
              <div className={`absolute bottom-4 right-4 flex gap-2 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                {/* Mute Toggle */}
                <button
                  onClick={handleMute}
                  className="w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors text-white"
                  aria-label={isMuted ? "Ton einschalten" : "Ton ausschalten"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>

          {/* Video Steps Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center mx-auto mb-3">1</div>
              <div className="font-bold text-brand-secondary mb-1 text-sm">Abrechnung prüfen</div>
              <div className="text-xs text-brand-ink/60 leading-relaxed">Im App-Schritt 6 siehst du die fertige, formell korrekte Abrechnung je Mieter.</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center mx-auto mb-3">2</div>
              <div className="font-bold text-brand-secondary mb-1 text-sm">PDF exportieren & versenden</div>
              <div className="text-xs text-brand-ink/60 leading-relaxed">Ein Klick erzeugt das formell korrekte PDF mit GiroCode – fertig zum Versenden.</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-brand-primary font-bold text-sm flex items-center justify-center mx-auto mb-3 text-white shadow-md">3</div>
              <div className="font-bold text-brand-primary mb-1 text-sm">GiroCode scannen – Ping!</div>
              <div className="text-xs text-brand-ink/60 leading-relaxed">Der Mieter scannt den QR-Code mit seiner Banking-App. IBAN, Betrag und Verwendungszweck sind hinterlegt. Erledigt.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
