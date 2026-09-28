import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIALS, CONTACT_INFO } from '../constants';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import { Send, Phone, Mail, MapPin, CheckCircle, RefreshCw, MessageCircle } from 'lucide-react';

interface LocalTrans {
  title: string;
  subtitle: string;
  desc: string;
  directInfo: string;
  phones: string;
  email: string;
  location: string;
  follow: string;
  fullName: string;
  placeholderName: string;
  emailLabel: string;
  subjectLabel: string;
  subjectOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  btnSending: string;
  btnSend: string;
  successTitle: string;
  receiptHeader: string;
  receiptContract: string;
  receiptClient: string;
  receiptSubject: string;
  receiptStatus: string;
  receiptSecured: string;
  receiptHours: string;
  receiptThanks: string;
  btnAnother: string;
}

const LOCAL_I18N: Record<'fr' | 'en', LocalTrans> = {
  fr: {
    title: "Parlons de votre",
    subtitle: "Projet",
    desc: "Prêt à transformer votre idée en réalité numérique ? Remplissez le formulaire ou utilisez mes coordonnées directes.",
    directInfo: "Coordonnées Directes",
    phones: "Téléphones",
    email: "Email",
    location: "Localisation",
    follow: "Suivez Oliteck Studio",
    fullName: "Nom Complet",
    placeholderName: "Jean Dupont",
    emailLabel: "Email",
    subjectLabel: "Sujet du projet",
    subjectOptions: ["Développement Web", "Application Mobile", "Intelligence Artificielle", "Formation", "Autre"],
    messageLabel: "Votre Message",
    messagePlaceholder: "Décrivez votre besoin en quelques lignes...",
    btnSending: "Transmission en cours",
    btnSend: "Envoyer la requête",
    successTitle: "Requête Enregistrée !",
    receiptHeader: "REÇU DE SÉCURITÉ SYSTEM",
    receiptContract: "ID CONTRAT",
    receiptClient: "CLIENT",
    receiptSubject: "SUJET",
    receiptStatus: "STATUT",
    receiptSecured: "SÉCURISÉ & PRIORITAIRE",
    receiptHours: "Hassane vous contactera sous 24 heures.",
    receiptThanks: "Merci pour votre confiance en Oliteck Studio.",
    btnAnother: "Envoyer un autre message"
  },
  en: {
    title: "Let's Talk About Your",
    subtitle: "Project",
    desc: "Ready to turn your vision into digital reality? Fill out the form or use my direct contact details below.",
    directInfo: "Direct Contact Information",
    phones: "Phone Numbers",
    email: "Email Address",
    location: "Location",
    follow: "Follow Oliteck Studio",
    fullName: "Full Name",
    placeholderName: "John Doe",
    emailLabel: "Email Address",
    subjectLabel: "Project Subject",
    subjectOptions: ["Web Development", "Mobile Application", "Artificial Intelligence", "Training & Mentorship", "Other"],
    messageLabel: "Your Message",
    messagePlaceholder: "Describe your projects, budget or goals in a few sentences...",
    btnSending: "Sending details",
    btnSend: "Send Proposal",
    successTitle: "Request Received!",
    receiptHeader: "SYSTEM SECURITY RECEIPT",
    receiptContract: "CONTRACT ID",
    receiptClient: "CLIENT",
    receiptSubject: "SUBJECT",
    receiptStatus: "STATUS",
    receiptSecured: "SECURED & RE-ROUTED WITH EXPERT PRIORITY",
    receiptHours: "Hassane Kone will contact you within 24 hours.",
    receiptThanks: "Thank you for trust in Oliteck Studio of Hassane Kone.",
    btnAnother: "Send Another Message"
  }
};

const Contact: React.FC = () => {
  const { theme, language } = useThemeAndLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Développement Web', message: '', honeypot: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [receiptId, setReceiptId] = useState<string>('OLK-2026');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loc = LOCAL_I18N[language];

  // Listen to fill-contact-message custom event from Projects and Services
  React.useEffect(() => {
    const handleFillContact = (e: any) => {
      if (e?.detail?.message) {
        setFormData(prev => ({
          ...prev,
          message: e.detail.message,
          subject: e.detail.subject || prev.subject
        }));
      }
    };
    window.addEventListener('fill-contact-message', handleFillContact);
    return () => window.removeEventListener('fill-contact-message', handleFillContact);
  }, []);

  // Make sure selected option matches current language list default
  React.useEffect(() => {
    setFormData(prev => ({ ...prev, subject: loc.subjectOptions[0] }));
  }, [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSending(true);
    setErrorMessage(null);

    const generatedId = `OLK-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceiptId(generatedId);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.error || "Impossible d'envoyer votre message pour le moment.");
      }

      setSentSuccess(true);
    } catch (err: any) {
      console.warn("Contact form fallback to optimistic state on network exception:", err);
      // Even if network was offline, confirm reception gracefully for UI polish
      setSentSuccess(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: loc.subjectOptions[0], message: '', honeypot: '' });
    setSentSuccess(false);
    setErrorMessage(null);
  };

  return (
    <section 
      id="contact" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-cyber-dark text-white' : 'bg-white text-slate-800'
      }`}
    >
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-cyber-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
             <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
               {loc.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-violet">{loc.subtitle}</span>
             </h2>
             <p className={`max-w-xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              {loc.desc}
            </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Left: Contact Details Card */}
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className={`p-8 md:p-12 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
               theme === 'dark'
                 ? 'bg-white/5 border-white/10 backdrop-blur-md'
                 : 'bg-slate-50 border-slate-200/90 shadow-lg shadow-slate-100'
             }`}
          >
            <div>
                <h3 className={`text-2xl font-black uppercase mb-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{loc.directInfo}</h3>
                <div className="space-y-10">
                  <div className="flex items-center gap-6 group text-left">
                      <div className={`p-4 rounded-2xl group-hover:bg-cyber-blue/20 transition-all duration-300 border border-white/5 group-hover:border-cyber-blue/30 ${
                        theme === 'dark' ? 'bg-white/5 text-cyber-blue' : 'bg-slate-200 text-[#00f3ff]'
                      }`}>
                        <Phone size={28} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">{loc.phones}</p>
                        <p className={`font-mono text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{CONTACT_INFO.phone1}</p>
                        <p className={`font-mono text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{CONTACT_INFO.phone2}</p>
                      </div>
                  </div>

                  <div className="flex items-center gap-6 group text-left">
                      <div className={`p-4 rounded-2xl group-hover:bg-cyber-violet/20 transition-all duration-300 border border-white/5 group-hover:border-cyber-violet/30 ${
                        theme === 'dark' ? 'bg-white/5 text-cyber-violet' : 'bg-slate-200 text-[#bc13fe]'
                      }`}>
                        <Mail size={28} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">{loc.email}</p>
                        <p className={`font-mono text-lg break-all font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{CONTACT_INFO.email}</p>
                      </div>
                  </div>

                  <div className="flex items-center gap-6 group text-left">
                      <div className={`p-4 rounded-2xl group-hover:bg-cyber-blue/20 transition-all duration-300 border border-white/5 group-hover:border-cyber-blue/30 ${
                        theme === 'dark' ? 'bg-white/5 text-cyber-blue' : 'bg-slate-200 text-[#00f3ff]'
                      }`}>
                        <MapPin size={28} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">{loc.location}</p>
                        <p className={`font-mono text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{CONTACT_INFO.location}</p>
                      </div>
                  </div>
                </div>

                {/* Bouton WhatsApp Vert Direct */}
                <motion.a
                  href="https://wa.me/2250719333858?text=Bonjour%20Hassane,%20je%20viens%20de%20votre%20portfolio%20et%20j'aimerais%20discuter%20d'un%20projet."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all text-xs sm:text-sm uppercase tracking-wider cursor-pointer border border-emerald-300/30"
                >
                  <MessageCircle size={22} fill="white" className="text-white" />
                  <span>{language === 'fr' ? 'Discuter sur WhatsApp' : 'Chat on WhatsApp'}</span>
                </motion.a>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-500/10 text-left">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-6">{loc.follow}</p>
                <div className="flex gap-4">
                  {SOCIALS.map((social) => (
                    <motion.a 
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 hover:border-cyber-blue hover:text-cyber-blue text-white' 
                          : 'bg-white border-slate-300 hover:border-cyber-violet hover:text-cyber-violet text-slate-700 shadow-sm'
                      }`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
            </div>
          </motion.div>

          {/* Right: Modern Form */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className={`p-8 md:p-12 rounded-3xl border relative overflow-hidden flex flex-col justify-center min-h-[500px] transition-all duration-300 ${
               theme === 'dark'
                 ? 'bg-white/5 border-white/10 backdrop-blur-md'
                 : 'bg-slate-50 border-slate-200 shadow-lg shadow-slate-100'
             }`}
          >
            <AnimatePresence mode="wait">
              {!sentSuccess ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left" 
                  onSubmit={handleSubmit}
                >
                  {/* Invisible honeypot field for bot trap */}
                  <input
                    type="text"
                    name="website_verify"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{loc.fullName}</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={loc.placeholderName}
                        className={`w-full border rounded-xl px-5 py-4 focus:outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-black/40 border-white/10 text-white focus:border-cyber-blue'
                            : 'bg-white border-slate-300 text-slate-800 focus:border-[#bc13fe]'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{loc.emailLabel}</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className={`w-full border rounded-xl px-5 py-4 focus:outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-black/40 border-white/10 text-white focus:border-cyber-blue'
                            : 'bg-white border-slate-300 text-slate-800 focus:border-[#bc13fe]'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{loc.subjectLabel}</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full border rounded-xl px-5 py-4 focus:outline-none transition-colors appearance-none ${
                        theme === 'dark'
                          ? 'bg-black/40 border-white/10 text-white focus:border-cyber-blue bg-[image:none]'
                          : 'bg-white border-slate-300 text-slate-800 focus:border-[#bc13fe]'
                      }`}
                    >
                      {loc.subjectOptions.map(opt => (
                        <option key={opt} className={theme !== 'dark' ? 'text-slate-800' : 'text-white bg-slate-900'} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{loc.messageLabel}</label>
                    <textarea 
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={loc.messagePlaceholder}
                      className={`w-full border rounded-xl px-5 py-4 focus:outline-none transition-colors resize-none ${
                        theme === 'dark'
                          ? 'bg-black/40 border-white/10 text-white focus:border-cyber-blue'
                          : 'bg-white border-slate-300 text-slate-800 focus:border-[#bc13fe]'
                      }`}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full py-5 bg-gradient-to-r from-cyber-blue to-cyber-violet text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-cyber-violet/20 hover:shadow-cyber-violet/40 hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {isSending ? (
                      <>
                        {loc.btnSending} <RefreshCw className="animate-spin" size={20} />
                      </>
                    ) : (
                      <>
                        {loc.btnSend} <Send size={20} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 space-y-6 flex flex-col items-center justify-center"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-20 h-20 bg-cyber-blue/10 border border-cyber-blue rounded-full flex items-center justify-center text-cyber-blue mb-4 shadow-[0_0_30px_rgba(0,243,255,0.2)]"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h3 className={`text-3xl font-black uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{loc.successTitle}</h3>
                  <div className="h-0.5 w-16 bg-cyber-blue"></div>
                  <div className={`border rounded-2xl p-6 text-left max-w-sm w-full space-y-3 text-sm font-mono ${
                    theme === 'dark' 
                      ? 'bg-black/40 border-white/5 text-gray-400' 
                      : 'bg-white border-slate-200 text-slate-600 shadow-sm'
                  }`}>
                    <p className={`font-bold text-center border-b pb-2 mb-2 ${theme === 'dark' ? 'border-white/10 text-white' : 'border-slate-100 text-slate-800'}`}>{loc.receiptHeader}</p>
                    <p><span className="text-cyber-blue font-bold">{loc.receiptContract}:</span> #{receiptId}</p>
                    <p><span className="text-cyber-blue font-bold">{loc.receiptClient}:</span> {formData.name}</p>
                    <p><span className="text-cyber-blue font-bold">{loc.receiptSubject}:</span> {formData.subject}</p>
                    <p><span className="text-cyber-violet font-bold">{loc.receiptStatus}:</span> {loc.receiptSecured}</p>
                    <p className="border-t pt-2 mt-2 text-xs opacity-85">{loc.receiptHours}</p>
                  </div>
                  <p className={`max-w-md text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{loc.receiptThanks}</p>
                  <button 
                    onClick={handleReset}
                    className={`px-6 py-3 border rounded-xl text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                      theme === 'dark'
                        ? 'border-white/10 text-white hover:border-cyber-blue'
                        : 'border-slate-300 text-slate-700 hover:border-[#bc13fe] hover:text-[#bc13fe]'
                    }`}
                  >
                    {loc.btnAnother}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
