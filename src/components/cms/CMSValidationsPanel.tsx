import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { runCMSValidationAudit, ValidationIssue } from '../../lib/cmsStorage';
import { AlertTriangle, CheckCircle, Info, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface CMSValidationsPanelProps {
  onNavigateToTab?: (tab: string) => void;
}

export const CMSValidationsPanel: React.FC<CMSValidationsPanelProps> = ({ onNavigateToTab }) => {
  const { projects, frames, articles, siteContent } = useCMS();
  const issues = runCMSValidationAudit(projects, frames, articles, siteContent);

  const errors = issues.filter((i) => i.type === 'error');
  const warnings = issues.filter((i) => i.type === 'warning');
  const infos = issues.filter((i) => i.type === 'info');

  return (
    <div className="bg-[#121214] border border-[#28282D] rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#28282D]">
        <div>
          <h3 className="font-serif italic text-xl text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#FF5A36]" />
            <span>Auditor Qualità & Validazione Contenuti</span>
          </h3>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Verifica automatica per prevenire errori, campi mancanti, alt text omessi o immagini non impostate.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 font-semibold">
            {errors.length} Errori
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 font-semibold">
            {warnings.length} Avvisi
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 font-semibold">
            {infos.length} Info
          </span>
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="p-8 text-center bg-[#09090A] border border-[#28282D] rounded-xl space-y-2">
          <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
          <h4 className="font-serif italic text-lg text-white">Tutti i contenuti sono perfetti!</h4>
          <p className="text-xs text-[#8D8D89] font-mono max-w-md mx-auto">
            Nessun errore rilevato nei progetti, nei frames o nei metadati della homepage. Il sito è pronto per essere pubblicato.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                issue.type === 'error'
                  ? 'bg-red-950/20 border-red-500/30 text-red-200'
                  : issue.type === 'warning'
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                  : 'bg-blue-950/20 border-blue-500/30 text-blue-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {issue.type === 'error' ? (
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                ) : issue.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-white border border-white/10">
                      {issue.category}
                    </span>
                    <h5 className="font-semibold text-xs text-white">{issue.title}</h5>
                  </div>
                  <p className="text-xs font-sans mt-1 leading-relaxed opacity-90">{issue.message}</p>
                </div>
              </div>

              {onNavigateToTab && (
                <button
                  type="button"
                  onClick={() => onNavigateToTab(issue.category)}
                  className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-[#FF5A36] text-white font-mono text-[11px] shrink-0 flex items-center gap-1 transition-colors self-end sm:self-center"
                >
                  <span>Correggi</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
