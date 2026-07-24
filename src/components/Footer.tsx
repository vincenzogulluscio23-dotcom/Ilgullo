import React from 'react';
import { RoutePath } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (route: RoutePath) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#09090A] text-[#F1F0EB] border-t border-[#28282D]/80 pt-20 pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Call to Action Section */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A36] mb-4 block">
              07 / {language === 'it' ? 'INIZIAMO UNA CONVERSAZIONE' : 'START A CONVERSATION'}
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#F1F0EB] leading-tight text-balance">
              {language === 'it' ? (
                <>
                  Una buona storia <br className="hidden sm:inline" />
                  può iniziare da una conversazione.
                </>
              ) : (
                <>
                  A compelling story <br className="hidden sm:inline" />
                  often begins with a conversation.
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col lg:items-end">
            <span className="font-mono text-xs text-[#8D8D89] mb-2">
              {language === 'it' ? 'Per progetti, collaborazioni e nuove idee:' : 'For projects, commissions and inquiries:'}
            </span>
            <a
              href="mailto:vincenzo@ilgullo.com"
              className="group inline-flex items-center gap-2 font-serif italic text-2xl sm:text-3xl text-[#F1F0EB] hover:text-[#FF5A36] transition-colors duration-300 border-b border-[#28282D] pb-1 hover:border-[#FF5A36]"
            >
              <span>vincenzo@ilgullo.com</span>
              <ArrowUpRight className="w-6 h-6 text-[#FF5A36] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Links and Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-12 border-t border-b border-[#28282D]/60 text-xs font-mono">
          
          {/* Navigation Column */}
          <div>
            <span className="text-[#8D8D89] uppercase tracking-widest block mb-4">
              {language === 'it' ? 'Navigazione' : 'Navigation'}
            </span>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => { onNavigate('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[#C9C7C1] hover:text-[#FF5A36] transition-colors">
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('lab'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[#C9C7C1] hover:text-[#FF5A36] transition-colors">
                  {t.nav.lab}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('frames'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[#C9C7C1] hover:text-[#FF5A36] transition-colors">
                  {t.nav.frames}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[#C9C7C1] hover:text-[#FF5A36] transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[#C9C7C1] hover:text-[#FF5A36] transition-colors">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <span className="text-[#8D8D89] uppercase tracking-widest block mb-4">Social</span>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.instagram.com/humera.vision/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9C7C1] hover:text-[#FF5A36] transition-colors flex items-center gap-1"
                >
                  Instagram (@humera.vision)
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/vincenzogulluscio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9C7C1] hover:text-[#FF5A36] transition-colors flex items-center gap-1"
                >
                  LinkedIn (Vincenzo Gulluscio)
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/393206406483"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF5A36] hover:underline flex items-center gap-1"
                >
                  WhatsApp Direct
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Status */}
          <div>
            <span className="text-[#8D8D89] uppercase tracking-widest block mb-4">
              {language === 'it' ? 'Sede & Disponibilità' : 'Location & Status'}
            </span>
            <p className="text-[#C9C7C1] leading-relaxed mb-2">
              Travagliato, Brescia — Italy <br />
              Via Castrezzato 12E
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#121214] border border-[#28282D] text-[10px] text-[#FF5A36]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] animate-pulse"></span>
              <span>{t.labels.availableForProjects}</span>
            </div>
          </div>

          {/* Business & Legal */}
          <div>
            <span className="text-[#8D8D89] uppercase tracking-widest block mb-4">
              {language === 'it' ? 'Dati Legali' : 'Legal & Info'}
            </span>
            <p className="text-[#C9C7C1] leading-relaxed mb-3">
              Vincenzo Gulluscio <br />
              VAT ID / P. IVA 04700280987
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { onNavigate('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-[#8D8D89] hover:text-[#FF5A36] underline transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => { onNavigate('cms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-[#8D8D89]/50 hover:text-[#FF5A36] transition-colors text-[10px]"
              >
                {t.labels.cmsArea}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8D8D89] gap-4">
          <p>© {currentYear} Gullo. {t.labels.rightsReserved}.</p>
          <p className="text-right">Designed and developed with intention.</p>
        </div>

      </div>
    </footer>
  );
};
