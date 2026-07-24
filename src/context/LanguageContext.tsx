import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface Translations {
  nav: {
    home: string;
    projects: string;
    lab: string;
    frames: string;
    about: string;
    contact: string;
  };
  labels: {
    all: string;
    watchFilm: string;
    exploreProjects: string;
    allProjects: string;
    context: string;
    pointOfView: string;
    process: string;
    outcome: string;
    credits: string;
    role: string;
    location: string;
    agency: string;
    client: string;
    duration: string;
    year: string;
    services: string;
    sendMessage: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    messageSent: string;
    backToProjects: string;
    backToLab: string;
    readArticle: string;
    readingTime: string;
    relatedProjects: string;
    cmsArea: string;
    rightsReserved: string;
    availableForProjects: string;
    close: string;
    menu: string;
    selectedWorks: string;
    viewProject: string;
    nextProject: string;
    prevProject: string;
    projectDetails: string;
    filterByCategory: string;
    noResults: string;
  };
  categories: {
    [key: string]: string;
  };
}

const UI_TRANSLATIONS: Record<Language, Translations> = {
  it: {
    nav: {
      home: 'Home',
      projects: 'Progetti',
      lab: 'Lab',
      frames: 'Frames',
      about: 'Chi sono',
      contact: 'Contatti',
    },
    labels: {
      all: 'Tutti',
      watchFilm: 'Guarda il film',
      exploreProjects: 'Esplora i progetti',
      allProjects: 'Tutti i progetti',
      context: 'Contesto e sfide',
      pointOfView: 'Punto di vista visivo',
      process: 'Processo di produzione',
      outcome: 'Risultato e impatto',
      credits: 'Crediti & Collaborazioni',
      role: 'Ruolo',
      location: 'Luogo',
      agency: 'Agenzia',
      client: 'Cliente',
      duration: 'Durata',
      year: 'Anno',
      services: 'Servizi',
      sendMessage: 'Parliamo del tuo progetto',
      name: 'Nome e Cognome',
      email: 'Indirizzo Email',
      message: 'Come posso aiutarti?',
      send: 'Invia messaggio',
      sending: 'Invio in corso...',
      messageSent: 'Messaggio inviato con successo. Ti risponderò al più presto.',
      backToProjects: 'Torna a tutti i progetti',
      backToLab: 'Torna agli articoli',
      readArticle: 'Leggi l\'articolo',
      readingTime: 'Tempo di lettura',
      relatedProjects: 'Progetti correlati',
      cmsArea: 'Area Riservata CMS',
      rightsReserved: 'Tutti i diritti riservati',
      availableForProjects: 'Disponibile per progetti selezionati',
      close: 'Chiudi',
      menu: 'Menu',
      selectedWorks: 'Opere selezionate',
      viewProject: 'Vedi progetto',
      nextProject: 'Progetto successivo',
      prevProject: 'Progetto precedente',
      projectDetails: 'Dettagli progetto',
      filterByCategory: 'Filtra per categoria',
      noResults: 'Nessun elemento trovato.',
    },
    categories: {
      All: 'Tutti',
      'Branded Content': 'Branded Content',
      Film: 'Film',
      Campaign: 'Campagne',
      Corporate: 'Corporate',
      Personal: 'Ricerca Personale',
      Social: 'Social Content',
      Process: 'Processo',
      Thoughts: 'Riflessioni',
      'Field notes': 'Note di campo',
      People: 'Persone',
      Places: 'Luoghi',
      Details: 'Dettagli',
      Motion: 'Movimento',
      Work: 'Lavori',
    },
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      lab: 'Lab',
      frames: 'Frames',
      about: 'About',
      contact: 'Contact',
    },
    labels: {
      all: 'All',
      watchFilm: 'Watch film',
      exploreProjects: 'Explore projects',
      allProjects: 'All projects',
      context: 'Context & Brief',
      pointOfView: 'Visual Perspective',
      process: 'Production Process',
      outcome: 'Outcome & Impact',
      credits: 'Credits & Collaborators',
      role: 'Role',
      location: 'Location',
      agency: 'Agency',
      client: 'Client',
      duration: 'Duration',
      year: 'Year',
      services: 'Services',
      sendMessage: 'Let\'s talk about your project',
      name: 'Full Name',
      email: 'Email Address',
      message: 'How can I assist you?',
      send: 'Send Message',
      sending: 'Sending...',
      messageSent: 'Message sent successfully. I will get back to you shortly.',
      backToProjects: 'Back to all projects',
      backToLab: 'Back to articles',
      readArticle: 'Read article',
      readingTime: 'Reading time',
      relatedProjects: 'Related Projects',
      cmsArea: 'CMS Portal',
      rightsReserved: 'All rights reserved',
      availableForProjects: 'Available for selected projects',
      close: 'Close',
      menu: 'Menu',
      selectedWorks: 'Selected Works',
      viewProject: 'View project',
      nextProject: 'Next project',
      prevProject: 'Previous project',
      projectDetails: 'Project Details',
      filterByCategory: 'Filter by category',
      noResults: 'No items found.',
    },
    categories: {
      All: 'All',
      'Branded Content': 'Branded Content',
      Film: 'Film',
      Campaign: 'Campaigns',
      Corporate: 'Corporate',
      Personal: 'Personal Work',
      Social: 'Social Content',
      Process: 'Process',
      Thoughts: 'Essays',
      'Field notes': 'Field Notes',
      People: 'People',
      Places: 'Places',
      Details: 'Details',
      Motion: 'Motion',
      Work: 'Work',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check URL path prefix first (/en or /it)
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/en')) return 'en';
      if (path.startsWith('/it')) return 'it';
      
      // Saved preference
      const saved = localStorage.getItem('site_language');
      if (saved === 'it' || saved === 'en') return saved;

      // Browser default
      const browserLang = navigator.language || (navigator as any).userLanguage;
      if (browserLang && browserLang.toLowerCase().startsWith('it')) {
        return 'it';
      }
      return 'en';
    }
    return 'it';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('site_language', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: UI_TRANSLATIONS[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
