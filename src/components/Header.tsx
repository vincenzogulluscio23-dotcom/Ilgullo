import React, { useState, useEffect } from 'react';
import { RoutePath } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route: RoutePath }[] = [
    { label: 'PROJECTS', route: 'projects' },
    { label: 'LAB', route: 'lab' },
    { label: 'FRAMES', route: 'frames' },
    { label: 'ABOUT', route: 'about' },
    { label: 'CONTACT', route: 'contact' },
  ];

  const handleNavClick = (route: RoutePath) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#09090A]/85 backdrop-blur-md border-b border-[#28282D]/40 py-4 shadow-2xl'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick('home')}
            className="group text-left focus:outline-none flex items-baseline gap-3"
            aria-label="Gullo Home"
          >
            <span className="font-serif italic text-2xl md:text-3xl font-normal text-white group-hover:text-[#FF5A36] transition-colors duration-300">
              Gullo
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest text-[#8D8D89] group-hover:text-[#C9C7C1] transition-colors">
              Filmmaker & Storyteller
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <div className="flex items-center gap-1 bg-[#121214]/70 border border-[#28282D]/80 rounded-full p-1.5 backdrop-blur-md shadow-xl">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`relative px-4 py-1.5 rounded-full font-mono text-[11px] tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? 'text-white font-medium' : 'text-[#C9C7C1] hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeHeaderPill"
                        className="absolute inset-0 bg-[#FF5A36] rounded-full shadow-[0_0_20px_rgba(255,90,54,0.4)] z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4 font-mono text-xs text-[#8D8D89]">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://www.instagram.com/humera.vision/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300 flex items-center gap-1"
            >
              <span>IG</span>
              <ArrowUpRight className="w-3 h-3" />
            </motion.a>
            <span className="text-[#28282D]">•</span>
            <button
              onClick={() => handleNavClick('cms')}
              className={`px-3 py-1 rounded-full border border-[#28282D] hover:border-[#FF5A36] transition-colors text-[11px] font-mono flex items-center gap-1.5 ${
                currentRoute === 'cms' ? 'bg-[#FF5A36] text-white border-[#FF5A36]' : 'text-[#8D8D89] hover:text-white'
              }`}
              title="Pannello Amministrazione CMS"
            >
              <span>CMS</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] px-3 py-2 rounded-full border border-[#28282D] bg-[#121214]/80 text-[#F1F0EB] hover:border-[#FF5A36] transition-colors duration-300 shadow-md"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF5A36]" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 bg-[#09090A]/95 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between px-6 pt-28 pb-10"
          >
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A36]">
                Selected work, images, processes and stories.
              </span>
              
              <nav className="flex flex-col gap-4 mt-2">
                {navItems.map((item, idx) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <motion.button
                      key={item.route}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      onClick={() => handleNavClick(item.route)}
                      className="text-left group flex items-baseline justify-between border-b border-[#28282D]/60 pb-3"
                    >
                      <span
                        className={`font-serif italic text-4xl sm:text-5xl transition-colors duration-300 ${
                          isActive ? 'text-[#FF5A36]' : 'text-[#F1F0EB] group-hover:text-[#FF5A36]'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-[#8D8D89]">0{idx + 1}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Menu Footer */}
            <div className="pt-8 border-t border-[#28282D] flex flex-col gap-4 font-mono text-xs text-[#C9C7C1]">
              <div>
                <span className="block text-[#8D8D89] text-[10px] uppercase tracking-widest mb-1">Direct Contact</span>
                <a href="mailto:vincenzo@ilgullo.com" className="text-base font-sans text-white hover:text-[#FF5A36]">
                  vincenzo@ilgullo.com
                </a>
              </div>

              <div className="flex items-center justify-between text-xs text-[#8D8D89] pt-2">
                <span>Travagliato, Brescia — IT</span>
                <a
                  href="https://wa.me/393206406483"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF5A36] hover:underline"
                >
                  WhatsApp →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
