import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { RoutePath } from '../../types';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CMSLoginProps {
  onNavigate: (route: RoutePath) => void;
}

export const CMSLogin: React.FC<CMSLoginProps> = ({ onNavigate }) => {
  const { login } = useCMS();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#09090A] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden text-[#F1F0EB]">
      
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#FF5A36]/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Header Navigation back to site */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8D8D89] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF5A36]" />
          <span>Torna al sito pubblico</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121214] border border-white/10 text-[11px] font-mono text-[#8D8D89]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A36]" />
          <span>Area Riservata · Gullo Studio CMS</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md w-full mx-auto my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#121214] border border-[#28282D] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FF5A36]/10 border border-[#FF5A36]/30 flex items-center justify-center text-[#FF5A36] mb-6">
            <Lock className="w-6 h-6" />
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A36] block mb-2 font-semibold">
            Gullo Studio CMS
          </span>
          <h1 className="font-serif italic text-3xl text-white mb-2">
            Accesso Amministrazione
          </h1>
          <p className="text-xs text-[#8D8D89] font-sans leading-relaxed mb-8">
            Inserisci la tua chiave d'accesso o password amministrativa per gestire contenuti, immagini e pagine del portfolio.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-[11px] text-[#C9C7C1] uppercase tracking-wider mb-2">
                Password Amministratore
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Inserisci password..."
                  required
                  className={`w-full bg-[#09090A] border ${
                    error ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-[#28282D] focus:border-[#FF5A36]'
                  } rounded-xl px-4 py-3 text-sm text-white placeholder-[#8D8D89] focus:outline-none transition-all pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D8D89] hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="font-mono text-[11px] text-red-400 mt-2 flex items-center gap-1.5">
                  <span> Password errata. Riprova.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-sans font-medium text-sm transition-all duration-300 shadow-lg shadow-[#FF5A36]/20 flex items-center justify-center gap-2 group"
            >
              <KeyRound className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Accedi al Pannello CMS</span>
            </button>
          </form>

          {/* Secured Area Note */}
          <div className="mt-8 pt-6 border-t border-[#28282D]/60 flex items-center gap-3 bg-[#09090A]/60 p-3.5 rounded-xl border border-white/5">
            <Sparkles className="w-4 h-4 text-[#FF5A36] shrink-0" />
            <p className="text-[11px] text-[#8D8D89] font-mono leading-tight">
              Accesso protetto riservato al personale autorizzato di Gullo Studio.
            </p>
          </div>

        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center text-[11px] font-mono text-[#8D8D89] pb-4">
        <span>Gullo Studio CMS v1.0 · Sistema di Gestione Contenuti e Media</span>
      </div>

    </div>
  );
};
