import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackRoute?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class CMSErrorBoundary extends Component<Props, State> {
  state: State;
  props: Props;
  setState: any;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CMSErrorBoundary caught an unexpected error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleClearStorageAndReload = () => {
    if (confirm('Ripristinare il CMS allo stato iniziale pulito? Questa operazione svuota la memoria locale del browser in caso di errore critico.')) {
      try {
        localStorage.clear();
      } catch (e) {
        console.error('Failed to clear localStorage:', e);
      }
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[500px] w-full p-6 sm:p-12 flex flex-col items-center justify-center bg-[#09090A] text-white rounded-3xl border border-red-500/30 my-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 mb-6 animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h3 className="font-serif italic text-2xl sm:text-3xl text-white text-center mb-2">
            Recupero Automatico CMS Intercettato
          </h3>

          <p className="text-xs font-mono text-[#8D8D89] text-center max-w-md mb-6 leading-relaxed">
            Si è verificato un errore imprevisto o un sovraccarico di memoria durante l'operazione.
            L'interfaccia è stata protetta per prevenire la perdita di dati.
          </p>

          {this.state.error && (
            <div className="w-full max-w-lg bg-[#121214] border border-[#28282D] rounded-xl p-4 font-mono text-[11px] text-red-300 overflow-x-auto mb-6">
              <span className="font-bold block mb-1 text-red-400">Dettaglio Errore:</span>
              <code>{this.state.error.toString()}</code>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 shadow-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Ricarica Interfaccia CMS</span>
            </button>

            <button
              onClick={this.handleClearStorageAndReload}
              className="px-5 py-2.5 rounded-xl bg-[#121214] border border-[#28282D] hover:border-red-500 text-[#C9C7C1] hover:text-white font-mono text-xs inline-flex items-center gap-2 transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Svuota Cache Locale</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
