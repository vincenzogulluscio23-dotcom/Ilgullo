import React, { useState } from 'react';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { ContactFormData } from '../types';
import { Mail, Phone, MapPin, Instagram, Linkedin, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactView: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
    privacyAccepted: false,
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = isEn ? 'This field is required.' : 'Questo campo è obbligatorio.';
    if (!formData.email.trim()) {
      errs.email = isEn ? 'This field is required.' : 'Questo campo è obbligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = isEn ? 'Please enter a valid email address.' : 'Inserisci un indirizzo email valido.';
    }
    if (!formData.message.trim()) errs.message = isEn ? 'This field is required.' : 'Questo campo è obbligatorio.';
    if (!formData.privacyAccepted) errs.privacyAccepted = isEn ? 'You must accept the privacy policy.' : 'È necessario accettare l’informativa sulla privacy.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        message: '',
        privacyAccepted: false,
      });
    }, 1200);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-12 bg-[#09090A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Contact Hero */}
        <div className="mb-16">
          <SectionLabel label="Contact" className="mb-4" />
          
          <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl text-[#F1F0EB] text-balance mb-6">
            {isEn ? (
              <>Let’s begin <br />with what you <span className="font-sans not-italic text-white font-normal">want to tell.</span></>
            ) : (
              <>Partiamo <br />da quello che <span className="font-sans not-italic text-white font-normal">vuoi raccontare.</span></>
            )}
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-[#C9C7C1] font-sans leading-relaxed text-pretty">
            {isEn
              ? 'Feel free to reach out for a film, a photography project, a campaign, a brand collaboration, or simply an idea that hasn’t taken shape yet.'
              : 'Puoi scrivermi per un film, un progetto fotografico, una campagna, una collaborazione o anche per un’idea che non ha ancora trovato la propria forma.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Info & Details Column */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Email Box */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-[#28282D]">
              <span className="font-mono text-xs text-[#8D8D89] uppercase tracking-wider block mb-2">Email</span>
              <a
                href="mailto:vincenzo@ilgullo.com"
                className="font-serif italic text-2xl text-white hover:text-[#FF5A36] transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5 text-[#FF5A36]" />
                <span>vincenzo@ilgullo.com</span>
              </a>
            </div>

            {/* Phone / WhatsApp Box */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-[#28282D]">
              <span className="font-mono text-xs text-[#8D8D89] uppercase tracking-wider block mb-2">Phone / WhatsApp</span>
              <a
                href="https://wa.me/393206406483"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-lg text-white hover:text-[#FF5A36] transition-colors flex items-center gap-2 mb-2"
              >
                <Phone className="w-4 h-4 text-[#FF5A36]" />
                <span>+39 320 640 6483</span>
              </a>
              <p className="text-xs font-mono text-[#8D8D89]">
                {isEn ? 'For quick communication, you can also reach me directly on WhatsApp.' : 'Per comunicazioni rapide puoi contattarmi direttamente anche su WhatsApp.'}
              </p>
            </div>

            {/* Location Address */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-[#28282D]">
              <span className="font-mono text-xs text-[#8D8D89] uppercase tracking-wider block mb-2">Location</span>
              <div className="flex items-start gap-3 text-xs font-mono text-[#C9C7C1]">
                <MapPin className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-sans text-sm font-medium">Via Castrezzato 12E</p>
                  <p>25039 Travagliato BS — Italy</p>
                  <p className="text-[#8D8D89] mt-2 text-[11px]">{isEn ? 'Meetings arranged by appointment.' : 'Gli incontri vengono concordati su appuntamento.'}</p>
                </div>
              </div>
            </div>

            {/* Social Links & Business Details */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-[#28282D] space-y-4 font-mono text-xs">
              <div>
                <span className="text-[#8D8D89] uppercase tracking-wider block mb-2">Social</span>
                <div className="flex flex-col gap-2 text-white">
                  <a
                    href="https://www.instagram.com/humera.vision/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF5A36] flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4 text-[#FF5A36]" />
                    <span>@humera.vision</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vincenzogulluscio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF5A36] flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4 text-[#FF5A36]" />
                    <span>Vincenzo Gulluscio</span>
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#28282D]">
                <span className="text-[#8D8D89] block mb-1">{isEn ? 'Tax Details' : 'Dati Fiscali'}</span>
                <span className="text-[#C9C7C1]">Vincenzo Gulluscio · P. IVA 04700280987</span>
              </div>
            </div>

          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-[#121214] border border-[#28282D] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <span className="font-mono text-xs text-[#FF5A36] uppercase tracking-widest block mb-6">
              {isEn ? 'Send a message' : 'Invia un messaggio'}
            </span>

            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FF5A36]/10 text-[#FF5A36] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif italic text-3xl text-white">{isEn ? 'Thank you!' : 'Grazie!'}</h3>
                <p className="text-sm font-mono text-[#C9C7C1] max-w-md mx-auto">
                  {isEn ? 'Your message has been sent successfully. I will get back to you as soon as possible.' : 'Il messaggio è stato inviato correttamente. Ti risponderò appena possibile.'}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setStatus('idle')}
                >
                  {isEn ? 'Send another message' : 'Invia un altro messaggio'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label className="block font-mono text-xs text-[#C9C7C1] uppercase tracking-wider mb-2">
                    {isEn ? 'Name' : 'Nome'} <span className="text-[#FF5A36]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={isEn ? 'What is your name?' : 'Come ti chiami?'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#09090A] border border-[#28282D] text-white placeholder-[#8D8D89] text-sm font-sans focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                  {errors.name && <span className="font-mono text-[11px] text-[#FF5A36] mt-1 block">{errors.name}</span>}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-xs text-[#C9C7C1] uppercase tracking-wider mb-2">
                    Email <span className="text-[#FF5A36]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder={isEn ? 'Your email address' : 'La tua email'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#09090A] border border-[#28282D] text-white placeholder-[#8D8D89] text-sm font-sans focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                  {errors.email && <span className="font-mono text-[11px] text-[#FF5A36] mt-1 block">{errors.email}</span>}
                </div>

                {/* Company */}
                <div>
                  <label className="block font-mono text-xs text-[#C9C7C1] uppercase tracking-wider mb-2">
                    {isEn ? 'Company or Agency' : 'Azienda o Agenzia'}
                  </label>
                  <input
                    type="text"
                    placeholder={isEn ? 'Company you are contacting me for (optional)' : 'Azienda per cui mi contatti (opzionale)'}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#09090A] border border-[#28282D] text-white placeholder-[#8D8D89] text-sm font-sans focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="block font-mono text-xs text-[#C9C7C1] uppercase tracking-wider mb-2">
                    {isEn ? 'Project Category' : 'Tipologia di Progetto'}
                  </label>
                  <input
                    type="text"
                    placeholder={isEn ? 'Corporate film, photography, campaign, social...' : 'Film corporate, fotografia, campagne, social...'}
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#09090A] border border-[#28282D] text-white placeholder-[#8D8D89] text-sm font-sans focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-xs text-[#C9C7C1] uppercase tracking-wider mb-2">
                    {isEn ? 'Message' : 'Messaggio'} <span className="text-[#FF5A36]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder={isEn ? 'Tell me about your project, the context, and what you would like to create.' : 'Raccontami il progetto, il contesto e cosa vorresti realizzare.'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full min-h-[140px] px-4 py-3 rounded-xl bg-[#09090A] border border-[#28282D] text-white placeholder-[#8D8D89] text-sm font-sans focus:outline-none focus:border-[#FF5A36] transition-colors resize-y"
                  />
                  {errors.message && <span className="font-mono text-[11px] text-[#FF5A36] mt-1 block">{errors.message}</span>}
                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-[#28282D] bg-[#09090A] text-[#FF5A36] focus:ring-[#FF5A36]"
                  />
                  <label htmlFor="privacyAccepted" className="font-mono text-xs text-[#8D8D89] leading-relaxed cursor-pointer">
                    {isEn
                      ? 'I have read the privacy policy and consent to the processing of personal data necessary to receive a response.'
                      : 'Ho letto l’informativa sulla privacy e acconsento al trattamento dei dati personali necessari per ricevere una risposta.'}
                  </label>
                </div>
                {errors.privacyAccepted && <span className="font-mono text-[11px] text-[#FF5A36] block">{errors.privacyAccepted}</span>}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidthOnMobile
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (isEn ? 'Sending...' : 'Invio in corso...') : (isEn ? 'Send Message' : 'Invia il messaggio')}
                </Button>

                <p className="font-mono text-[11px] text-[#8D8D89] text-center pt-2">
                  {isEn ? 'I aim to respond to every inquiry as promptly as possible.' : 'Cerco di rispondere a ogni richiesta nel minor tempo possibile.'}
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
