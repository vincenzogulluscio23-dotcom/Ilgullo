import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, User, Building, Calendar, MessageSquare, Check, Copy } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
  receivedAt: string;
  targetEmail?: string;
}

export const CMSContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error('Failed to fetch contact messages:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#121214] border border-[#28282D] p-6 rounded-2xl">
        <div>
          <span className="font-mono text-xs text-[#FF5A36] uppercase tracking-wider block mb-1">
            CRM / Inquiries Manager
          </span>
          <h2 className="font-serif italic text-2xl text-white">Messaggi e Richieste di Contatto</h2>
          <p className="font-sans text-xs text-[#8D8D89] mt-1">
            Tutte le richieste inviate dal form vengono trasmesse a <strong className="text-white">vincenzo@ilgullo.com</strong> e archiviate qui.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-[#28282D] hover:bg-[#FF5A36] text-white text-xs font-mono flex items-center gap-2 transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Aggiorna ({messages.length})</span>
        </button>
      </div>

      {loading && messages.length === 0 ? (
        <div className="py-16 text-center text-[#8D8D89] font-mono text-xs">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#FF5A36] mb-2" />
          <span>Caricamento messaggi ricevuti...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-[#121214] border border-[#28282D] p-12 rounded-2xl text-center">
          <MessageSquare className="w-10 h-10 text-[#28282D] mx-auto mb-3" />
          <p className="font-serif italic text-lg text-[#C9C7C1]">Nessun messaggio ricevuto finora.</p>
          <p className="font-mono text-xs text-[#8D8D89] mt-1">
            I nuovi messaggi inviati dagli utenti nel form contatti compariranno qui in tempo reale.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-[#121214] border border-[#28282D] hover:border-[#FF5A36]/40 p-6 rounded-2xl space-y-4 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#28282D] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF5A36]/10 text-[#FF5A36] flex items-center justify-center font-bold text-sm shrink-0">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-white text-base flex items-center gap-2">
                      <span>{msg.name}</span>
                      {msg.company && (
                        <span className="font-normal text-xs text-[#8D8D89] bg-[#28282D] px-2 py-0.5 rounded-md">
                          {msg.company}
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#FF5A36] mt-0.5">
                      <Mail className="w-3.5 h-3.5" />
                      <a href={`mailto:${msg.email}`} className="hover:underline">
                        {msg.email}
                      </a>
                      <button
                        onClick={() => handleCopyEmail(msg.email, msg.id)}
                        className="text-[#8D8D89] hover:text-white p-1"
                        title="Copia Email"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#8D8D89]">
                  <Calendar className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>{new Date(msg.receivedAt).toLocaleString('it-IT')}</span>
                </div>
              </div>

              {msg.projectType && (
                <div className="inline-block bg-[#28282D]/60 border border-[#28282D] px-3 py-1 rounded-full text-xs font-mono text-[#C9C7C1]">
                  Tipo Progetto: <strong className="text-white">{msg.projectType}</strong>
                </div>
              )}

              <div className="bg-[#09090A] p-4 rounded-xl border border-[#28282D]/60 text-sm font-sans text-[#F1F0EB] whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#8D8D89] pt-1">
                <span>Inviato a: {msg.targetEmail || 'vincenzo@ilgullo.com'}</span>
                <a
                  href={`mailto:${msg.email}?subject=Re:%20Richiesta%20da%20ilgullo.com`}
                  className="px-3 py-1 rounded-lg bg-[#FF5A36] text-white hover:bg-[#FF5A36]/80 font-mono transition-colors"
                >
                  Rispondi via Email →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
