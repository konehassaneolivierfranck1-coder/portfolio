import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { SOCIALS, CONTACT_INFO } from '../constants';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import { Send, ShieldCheck, Globe, Cpu, CheckCircle, X, Download, Code2, FileArchive } from 'lucide-react';

interface LocalTrans {
  desc: string;
  linksTitle: string;
  navTitle: string;
  navItems: string[];
  newsletterDesc: string;
  devisBtn: string;
  stats: { label: string; value: string; suffix: string }[];
  secureSystem: string;
  privacyTitle: string;
  legalTitle: string;
}

const LOCAL_I18N: Record<'fr' | 'en', LocalTrans> = {
  fr: {
    desc: "L'excellence numérique au service de votre vision. Agence spécialisée en développement sur-mesure et intégration d'IA de pointe.",
    linksTitle: "Services",
    navTitle: "Navigation",
    navItems: ['Accueil', 'À Propos', 'Projets', 'Témoignages', 'Contact'],
    newsletterDesc: "Inscrivez-vous pour recevoir nos études de cas et innovations IA.",
    devisBtn: "Démarrer un Devis",
    stats: [
      { label: 'Projets Réalisés', value: '30', suffix: '+' },
      { label: 'Support Client', value: '24', suffix: '/7' },
      { label: 'Satisfaction', value: '100', suffix: '%' },
      { label: 'Vision Tech', value: 'IA', suffix: '-First' }
    ],
    secureSystem: "Système Certifié Sécurisé",
    privacyTitle: "Politique de Confidentialité",
    legalTitle: "Mentions Légales",
  },
  en: {
    desc: "Digital excellence at the service of your vision. Agency specialized in custom software development and state-of-the-art AI integration.",
    linksTitle: "Services",
    navTitle: "Navigation",
    navItems: ['Home', 'About', 'Projects', 'Testimonials', 'Contact'],
    newsletterDesc: "Subscribe to receive our latest case studies, tech trends and AI innovations.",
    devisBtn: "Start Quote Process",
    stats: [
      { label: 'Projects Delivered', value: '30', suffix: '+' },
      { label: 'Client Support', value: '24', suffix: '/7' },
      { label: 'Satisfaction', value: '100', suffix: '%' },
      { label: 'Tech Vision', value: 'AI', suffix: '-First' }
    ],
    secureSystem: "Certified Secure System",
    privacyTitle: "Privacy Policy",
    legalTitle: "Legal Mentions",
  }
};

const Counter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, ''));
  
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) springValue.set(numericValue);
  }, [isInView, numericValue, springValue]);

  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  );

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix || (value.includes('+') ? '+' : value.includes('%') ? '%' : '')}
    </span>
  );
};

const Footer: React.FC = () => {
  const { theme, language, dynamic, t } = useThemeAndLanguage();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [modalType, setModalType] = useState<'privacy' | 'legal' | null>(null);

  const loc = LOCAL_I18N[language];

  const scrollToSection = (id: string) => {
    // Standardize IDs across languages and accents
    let targetId = id.toLowerCase().trim();
    if (targetId === 'accueil' || targetId === 'home') targetId = 'home';
    else if (targetId === 'à propos' || targetId === 'a propos' || targetId === 'about') targetId = 'about';
    else if (targetId === 'projets' || targetId === 'projects') targetId = 'projects';
    else if (targetId === 'témoignages' || targetId === 'temoignages' || targetId === 'testimonials') targetId = 'testimonials';
    else if (targetId === 'compétences' || targetId === 'competences' || targetId === 'skills') targetId = 'skills';
    else if (targetId === 'services') targetId = 'services';
    else if (targetId === 'certifications' || targetId === 'diplômes' || targetId === 'degrees') targetId = 'certifications';
    else if (targetId === 'blog' || targetId === 'articles') targetId = 'blog';
    else if (targetId === 'contact') targetId = 'contact';

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const techStack = ['REACT', 'FLUTTER', 'PYTHON', 'NODE.JS', 'TYPESCRIPT', 'TAILWIND', 'OPENAI', 'FIREBASE', 'DOCKER', 'N8N'];

  return (
    <footer className={`pt-24 pb-12 relative overflow-hidden transition-all duration-500 border-t ${
      theme === 'dark' ? 'bg-[#030303] border-white/5 text-gray-400' : 'bg-slate-100 border-slate-200 text-slate-700'
    }`}>
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyber-blue/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyber-violet/5 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '3s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-left">
          
          {/* Column 1: Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <button 
              onClick={() => scrollToSection('home')}
              className="text-3xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-violet hover:brightness-125 transition-all text-left group cursor-pointer"
            >
              OLITECK STUDIO
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyber-blue to-cyber-violet transition-all duration-500"></div>
            </button>
            <p className={`text-sm leading-relaxed max-w-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              {loc.desc}
            </p>
            <div className="flex gap-4">
              {SOCIALS.map((social) => (
                <motion.a 
                  key={social.platform} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/50' 
                      : 'bg-white border-slate-300 text-slate-500 hover:text-cyber-violet hover:border-cyber-violet shadow-sm'
                  }`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className={`font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <span className="w-8 h-[1px] bg-cyber-blue"></span>
              <Cpu size={18} className="text-cyber-blue" /> {loc.linksTitle}
            </h4>
            <ul className="space-y-4 text-left">
              {dynamic.services.slice(0, 5).map(s => (
                <li key={s.id}>
                  <button onClick={() => scrollToSection('services')} className={`group flex items-center gap-2 text-sm transition-all text-left cursor-pointer ${
                    theme === 'dark' ? 'text-gray-400 hover:text-cyber-blue' : 'text-slate-600 hover:text-[#00f3ff]'
                  }`}>
                    <span className="w-0 group-hover:w-3 h-[1px] bg-cyber-blue transition-all"></span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className={`font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <span className="w-8 h-[1px] bg-cyber-violet"></span>
              <Globe size={18} className="text-cyber-violet" /> {loc.navTitle}
            </h4>
            <ul className="space-y-4 text-left">
              {loc.navItems.map((item) => (
                <li key={item}>
                  <button onClick={() => scrollToSection(item)} className={`group flex items-center gap-2 text-sm transition-all cursor-pointer ${
                    theme === 'dark' ? 'text-gray-400 hover:text-cyber-violet' : 'text-slate-600 hover:text-[#bc13fe]'
                  }`}>
                    <span className="w-0 group-hover:w-3 h-[1px] bg-cyber-violet transition-all"></span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className={`font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Newsletter</h4>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>{loc.newsletterDesc}</p>
            <form onSubmit={handleSubscribe} className="relative mb-8 group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com" 
                className={`w-full rounded-xl py-4 px-5 text-sm focus:outline-none transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/5 border border-white/10 text-white focus:border-cyber-blue group-hover:border-white/20' 
                    : 'bg-white border border-slate-300 text-slate-800 focus:border-cyber-violet group-hover:border-slate-400 shadow-sm'
                }`}
                required
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-cyber-blue rounded-lg text-black hover:bg-white transition-all shadow-lg shadow-cyber-blue/20 cursor-pointer">
                {subscribed ? <CheckCircle size={18} /> : <Send size={18} />}
              </button>
            </form>
            <button onClick={() => scrollToSection('contact')} className="w-full py-4 bg-gradient-to-r from-cyber-blue to-cyber-violet rounded-xl text-xs font-bold uppercase tracking-widest text-white hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-cyber-violet/20 cursor-pointer">
              {loc.devisBtn}
            </button>
          </motion.div>
        </div>

        {/* Dynamic Trust Bar with Odometer Effect */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 py-16 mb-16 rounded-2xl border ${
          theme === 'dark' 
            ? 'border-white/5 bg-white/[0.01]' 
            : 'border-slate-200/60 bg-slate-50 shadow-inner'
        }`}>
          {loc.stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <p className={`text-4xl font-black group-hover:text-cyber-blue transition-colors duration-500 mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>
                {stat.value === 'IA' ? stat.value + stat.suffix : <Counter value={stat.value} suffix={stat.suffix} />}
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Professional Tech Marquee */}
        <div className="relative w-full overflow-hidden mb-20 py-4 flex flex-col items-center">
          <p className="text-[9px] font-mono text-gray-600 mb-6 tracking-[0.5em] uppercase">Trusted Technologies</p>
          <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className={`mx-8 text-xs font-mono font-black hover:text-cyber-blue hover:scale-125 transition-all cursor-default select-none ${
                theme === 'dark' ? 'text-white/20' : 'text-slate-400/50'
              }`}>
                {tech}
              </span>
            ))}
          </div>
          {/* Fades for smooth edges */}
          <div className={`absolute inset-y-0 left-0 w-32 pointer-events-none bg-gradient-to-r ${
            theme === 'dark' ? 'from-[#030303] to-transparent' : 'from-slate-100 to-transparent'
          }`}></div>
          <div className={`absolute inset-y-0 right-0 w-32 pointer-events-none bg-gradient-to-l ${
            theme === 'dark' ? 'from-[#030303] to-transparent' : 'from-slate-100 to-transparent'
          }`}></div>
        </div>

        {/* Final Copyright Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-slate-500/10 text-gray-500 text-[11px] font-mono relative">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left"
          >
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
               <p>© 2026 Hassane Olivier Franck Kone • Oliteck Studio</p>
            </div>
            <span className="hidden md:inline opacity-20">|</span>
            <p className="hover:text-white transition-colors cursor-default">
              {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-6 order-last md:order-none">
            <a
              href="/api/export/zip"
              download="kone-hassane-portfolio-source.zip"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-cyber-blue hover:text-white bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 transition-all cursor-pointer font-bold tracking-normal"
              title="Télécharger le code source complet (.ZIP)"
            >
              <FileArchive size={14} className="text-cyber-blue" />
              <span>{language === 'fr' ? 'Code Source (.ZIP)' : 'Source Code (.ZIP)'}</span>
              <Download size={12} className="opacity-80" />
            </a>

            <button 
              onClick={() => setModalType('privacy')}
              className="hover:text-cyber-blue transition-colors relative group cursor-pointer"
            >
              {loc.privacyTitle}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-blue group-hover:w-full transition-all"></span>
            </button>
            <button 
              onClick={() => setModalType('legal')}
              className="hover:text-cyber-blue transition-colors relative group cursor-pointer"
            >
              {loc.legalTitle}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-blue group-hover:w-full transition-all"></span>
            </button>
          </div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer group hover:border-green-500/50 transition-all ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-300 shadow-sm text-slate-700'
            }`}
          >
             <ShieldCheck size={16} className="text-green-500 group-hover:scale-125 transition-transform" />
             <span className="text-[10px] uppercase tracking-wider font-bold">
               {language === 'fr' ? 'Système Certifié Sécurisé' : 'Secure Certified System'}
             </span>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md p-4 md:p-6 flex justify-center items-start md:items-center py-6 md:py-12"
            onClick={() => setModalType(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f1014] border border-cyber-blue/30 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setModalType(null)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-cyber-violet rounded-full text-white transition-colors cursor-pointer z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 text-white">
                {modalType === 'privacy' ? (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <ShieldCheck className="text-cyber-blue shrink-0" size={32} />
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{loc.privacyTitle}</h3>
                    </div>
                    <div className="h-0.5 w-20 bg-cyber-blue mb-6"></div>
                    <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar text-justify">
                      {language === 'fr' ? (
                        <>
                          <p className="font-bold text-white">1. Collecte de données</p>
                          <p>Nous collectons des informations uniquement lorsque vous utilisez nos formulaires de contact ou démarrez un projet. Les informations collectées incluent votre nom, adresse e-mail, sujet et les détails de votre projet.</p>
                          <p className="font-bold text-white">2. Utilisation des informations</p>
                          <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour vous contacter, traiter vos demandes de devis d'architecture numérique et personnaliser votre expérience utilisateur.</p>
                          <p className="font-bold text-white">3. Confidentialité d'Oliteck Studio</p>
                          <p>Hassane Olivier Franck Koné et Oliteck Studio sont les seuls propriétaires des informations collectées sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées ou données à une autre société pour n'importe quel motif sans votre consentement.</p>
                          <p className="font-bold text-white">4. Protection des données</p>
                          <p>Nous mettons en œuvre une variété de mesures de sécurité certifiées pour préserver la sécurité de vos données personnelles. Nous protégeons également vos informations hors ligne.</p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-white">1. Data Collection</p>
                          <p>We only collect data when you query our contact forms or start a digital project. Collected points include full name, email address, custom subject line, and project descriptions.</p>
                          <p className="font-bold text-white">2. Information Usage</p>
                          <p>Any details gathered can be processed to reach out to you, refine digital estimate sheets, or curate optimized user experiences throughout your project.</p>
                          <p className="font-bold text-white">3. Oliteck Studio Privacy</p>
                          <p>Hassane Olivier Franck Kone and Oliteck Studio represent sole ownership of any values stored. Your private metrics will not be transferred, sold, or distributed without absolute prior consent.</p>
                          <p className="font-bold text-white">4. Data Protection Guidelines</p>
                          <p>We implement specialized, end-to-end security protocols to preserve the stability of your digital identity both online and offline.</p>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <Globe className="text-cyber-violet shrink-0" size={32} />
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{loc.legalTitle}</h3>
                    </div>
                    <div className="h-0.5 w-20 bg-cyber-violet mb-6"></div>
                    <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar text-justify text-left">
                      {language === 'fr' ? (
                        <>
                          <p className="font-bold text-white">Éditeur du site</p>
                          <p className="text-gray-350">Le présent site est édité par <span className="text-cyber-blue font-bold">Hassane Olivier Franck Koné</span>, Fondateur de l'agence <span className="text-cyber-violet font-bold">Oliteck Studio</span>.</p>
                          <p className="font-bold text-white">Coordonnées professionnelles</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Siège Social : Bouaké, Côte d'Ivoire</li>
                            <li>E-mails : <a href="mailto:hassaneolivierfranckkone@gmail.com" className="text-cyber-blue font-bold">hassaneolivierfranckkone@gmail.com</a></li>
                            <li>Téléphones : +225 07 19 33 38 58 / +225 05 94 67 17 66</li>
                          </ul>
                          <p className="font-bold text-white">Hébergement</p>
                          <p>Ce site et ses services de calculs d'intelligence artificielle intelligents sont hébergés sur les infrastructures sécurisées de Google Cloud Platform (Cloud Run) via l'environnement sandbox d'AI Studio.</p>
                          <p className="font-bold text-white">Propriété Intellectuelle</p>
                          <p>Sauf mention contraire, tous les éléments accessibles sur le site (textes, images, graphismes, logo, icônes) restent la propriété exclusive de l'auteur, au titre des droits de propriété intellectuelle.</p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-white">Site Editor</p>
                          <p>This digital platform is curated by <span className="text-cyber-blue font-bold">Hassane Olivier Franck Kone</span>, Founder of <span className="text-cyber-violet font-bold">Oliteck Studio</span>.</p>
                          <p className="font-bold text-white">Professional Contacts</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Headquarters: Bouake, Ivory Coast</li>
                            <li>Email: <a href="mailto:hassaneolivierfranckkone@gmail.com" className="text-cyber-blue font-bold">hassaneolivierfranckkone@gmail.com</a></li>
                            <li>Tel: +225 07 19 33 38 58 / +225 05 94 67 17 66</li>
                          </ul>
                          <p className="font-bold text-white">Deployment Hosting</p>
                          <p>This web workspace and integrated predictive systems are hosted securely on Google Cloud Platform infrastructure (Cloud Run container modules).</p>
                          <p className="font-bold text-white">Intellectual Property</p>
                          <p>Unless indicated otherwise, all visual interfaces, custom animations, blueprints, and assets remain exclusive property of the author under global intellectual protections.</p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
