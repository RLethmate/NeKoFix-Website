import NekoFixWordmark from './NekoFixWordmark';

export default function Footer() {
  return (
    <footer className="bg-brand-ink py-12 border-t border-brand-ink/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <NekoFixWordmark className="text-white text-2xl tracking-tight" />
        </div>
        
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#impressum" className="hover:text-white transition-colors">Impressum</a>
          <a href="#datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
        </div>
        
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} <NekoFixWordmark />. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
