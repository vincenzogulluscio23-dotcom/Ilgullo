import React from 'react';
import { RoutePath } from '../types';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';

interface PrivacyViewProps {
  onNavigate: (route: RoutePath) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-12 bg-[#09090A] min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#8D8D89] hover:text-[#FF5A36] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna alla Home</span>
        </button>

        <SectionLabel label="Informativa Privacy" className="mb-4" />

        <h1 className="font-serif italic text-4xl sm:text-5xl text-white mb-8">
          Privacy Policy
        </h1>

        <div className="bg-[#121214] border border-[#28282D] rounded-2xl p-6 sm:p-10 space-y-8 font-sans text-xs sm:text-sm text-[#C9C7C1] leading-relaxed">
          
          <div>
            <h2 className="font-serif italic text-xl text-white mb-2">1. Titolare del Trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali è:<br />
              <strong className="text-white">Vincenzo Gulluscio</strong><br />
              Via Castrezzato 12E, 25039 Travagliato (BS) — Italia<br />
              P. IVA 04700280987<br />
              Email: <a href="mailto:vincenzo@ilgullo.com" className="text-[#FF5A36] underline">vincenzo@ilgullo.com</a>
            </p>
          </div>

          <div>
            <h2 className="font-serif italic text-xl text-white mb-2">2. Tipologia di Dati Raccolti</h2>
            <p>
              I dati personali raccolti da questo sito web comprendono i dati inseriti volontariamente dall'utente all'interno del modulo di contatto (Nome, Indirizzo Email, Azienda, Tipologia di progetto e Messaggio) e i dati tecnici di navigazione anonimizzati.
            </p>
          </div>

          <div>
            <h2 className="font-serif italic text-xl text-white mb-2">3. Finalità del Trattamento</h2>
            <p>
              I dati forniti dall'utente vengono utilizzati esclusivamente per dare riscontro alle richieste di informazione o di preventivo inviate tramite il modulo di contatto o tramite email diretta.
            </p>
          </div>

          <div>
            <h2 className="font-serif italic text-xl text-white mb-2">4. Conservazione dei Dati</h2>
            <p>
              I dati inviati saranno conservati per il tempo strettamente necessario a gestire la richiesta di contatto o per gli adempimenti di legge fiscali o contrattuali previsti.
            </p>
          </div>

          <div>
            <h2 className="font-serif italic text-xl text-white mb-2">5. Diritti dell'Interessato</h2>
            <p>
              In qualsiasi momento l'utente può esercitare i propri diritti ai sensi del Regolamento UE 2016/679 (GDPR), richiedendo la conferma dell'esistenza dei propri dati, l'accesso, la rettifica o la cancellazione degli stessi scrivendo a <a href="mailto:vincenzo@ilgullo.com" className="text-[#FF5A36] underline">vincenzo@ilgullo.com</a>.
            </p>
          </div>

        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => onNavigate('home')}>
            Torna alla Home
          </Button>
        </div>

      </div>
    </div>
  );
};
