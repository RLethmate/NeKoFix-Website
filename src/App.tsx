import {useEffect, useState} from 'react';
import Hero from './components/Hero';
import DemoVideo from './components/DemoVideo';
import Comparison from './components/Comparison';
import Steps from './components/Steps';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (hash === '#impressum') {
    return <Impressum />;
  }

  if (hash === '#datenschutz') {
    return <Datenschutz />;
  }

  return (
    <div className="min-h-screen font-sans text-brand-ink selection:bg-brand-secondary selection:text-white">
      {/* Navigation - Minimal header */}
      <header className="absolute top-0 w-full z-50 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-brand-primary font-bold text-2xl tracking-tight">NeKo<span className="text-brand-secondary">Fix</span></span>
          </div>
          <a href="#pricing" className="text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors">
            Preise ansehen
          </a>
        </div>
      </header>

      <main>
        <Hero />
        <DemoVideo />
        <Comparison />
        <Steps />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
