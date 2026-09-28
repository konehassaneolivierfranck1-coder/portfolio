import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { SERVICES } from '../constants';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import { ArrowRight, Sparkles, X, CheckCircle2, ChevronUp } from 'lucide-react';

interface LocalTrans {
  title: string;
  desc: string;
  details: string[];
  quote: string;
  close: string;
  back: string;
}

const LOCAL_I18N: Record<'fr' | 'en', LocalTrans> = {
  fr: {
    title: "Expertise Technique",
    desc: "Je transforme des concepts complexes en interfaces fluides et performantes.",
    details: ["Expertise sur-mesure", "Support 24/7", "Technologies de pointe", "Livraison rapide"],
    quote: "Demander un devis",
    close: "Fermer",
    back: "← Revenir aux Services",
  },
  en: {
    title: "Technical Expertise",
    desc: "I turn complex concepts into beautiful, seamless, and high-performance digital solutions.",
    details: ["Customized Expertise", "24/7 Premium Support", "Cutting-edge Tech", "Fast Turnaround"],
    quote: "Request a Quote",
    close: "Close",
    back: "← Back to Services",
  }
};

const ServiceCard: React.FC<{ 
  service: any; 
  index: number; 
  onOpen: (s: any) => void;
  theme: string;
  language: 'fr' | 'en';
}> = ({ service, index, onOpen, theme, language }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const opacity = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsFocused(true); opacity.set(1); }}
      onMouseLeave={() => { setIsFocused(false); opacity.set(0); }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative h-full rounded-3xl border px-8 py-10 overflow-hidden group backdrop-blur-sm cursor-pointer transition-all duration-500 ${
        theme === 'dark' 
          ? 'border-white/10 bg-gray-900/40 text-white' 
          : 'border-slate-200/85 bg-white text-slate-800 shadow-lg shadow-slate-100 hover:shadow-xl'
      }`}
      onClick={() => onOpen(service)}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity: isFocused ? 1 : 0,
          background: theme === 'dark'
            ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(188,19,254,0.15), transparent 40%)`
            : `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(188,19,254,0.06), transparent 40%)`,
        }}
      />
      
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: theme === 'dark'
            ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,243,255,0.4), transparent 40%)`
            : `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(188,19,254,0.3), transparent 40%)`,
          maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8 flex items-center justify-between">
          <motion.div 
            className={`relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner border transition-colors duration-500 ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 group-hover:border-cyber-blue/50' 
                : 'bg-slate-100 border-slate-200 group-hover:border-cyber-violet/50'
            }`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          >
            <div className="absolute inset-0 bg-cyber-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <service.icon size={32} className={`transition-colors duration-300 relative z-10 ${
              theme === 'dark' ? 'text-gray-300 group-hover:text-cyber-blue' : 'text-slate-500 group-hover:text-cyber-violet'
            }`} />
          </motion.div>
          <div className={`font-mono text-xl font-bold transition-colors ${
            theme === 'dark' ? 'text-white/20 group-hover:text-white/40' : 'text-slate-300 group-hover:text-slate-400'
          }`}>
            0{index + 1}
          </div>
        </div>

        <h3 className={`mb-4 text-2xl font-bold transition-all duration-300 ${
          theme === 'dark' 
            ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyber-blue' 
            : 'text-slate-800'
        }`}>
          {service.title}
        </h3>
        
        <p className={`mb-8 text-base leading-relaxed transition-colors flex-grow ${
          theme === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-slate-600 group-hover:text-slate-800'
        }`}>
          {service.description}
        </p>

        <div className="mt-auto">
          <button className={`flex items-center gap-2 text-sm font-bold transition-colors uppercase tracking-widest ${
            theme === 'dark' ? 'text-cyber-violet group-hover:text-cyber-blue' : 'text-[#bc13fe] group-hover:text-[#00f3ff]'
          }`}>
            {language === 'fr' ? 'En savoir plus' : 'Learn More'}
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { theme, language, dynamic, t } = useThemeAndLanguage();
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const handleDevisRequest = () => {
    const serviceTitle = selectedService?.title || '';
    setSelectedService(null);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        window.dispatchEvent(new CustomEvent('fill-contact-message', {
          detail: {
            message: language === 'fr'
              ? `Bonjour Hassane, je souhaite obtenir un devis pour votre expertise : "${serviceTitle}".`
              : `Hello Hassane, I would like to request a proposal for your service: "${serviceTitle}".`,
            subject: serviceTitle.toLowerCase().includes('mobile') 
              ? 'Application Mobile' 
              : serviceTitle.toLowerCase().includes('ia') || serviceTitle.toLowerCase().includes('intelligence') || serviceTitle.toLowerCase().includes('auto')
                ? 'Intelligence Artificielle'
                : 'Développement Web'
          }
        }));
        const textarea = document.querySelector('textarea');
        if (textarea) textarea.focus();
      }
    }, 150);
  };

  const translatedServices = dynamic.services.map(ds => {
    const original = SERVICES.find(s => s.id === ds.id);
    return {
      ...ds,
      icon: original?.icon || Sparkles,
    };
  });

  const loc = LOCAL_I18N[language];

  return (
    <section 
      id="services" 
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#030305]' : 'bg-slate-50'
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyber-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyber-violet/5 rounded-full blur-[120px]" />
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] ${
          theme === 'dark' ? 'opacity-20' : 'opacity-[0.03]'
        }`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={18} className="text-cyber-blue animate-pulse" />
                    <span className="text-cyber-blue font-mono text-sm uppercase tracking-widest">{loc.title}</span>
                </div>
                <h2 className={`text-4xl md:text-6xl font-black leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'fr' ? (
                      <>
                        Solutions <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet via-fuchsia-500 to-cyber-blue">
                            Digitales Avancées
                        </span>
                      </>
                    ) : (
                      <>
                        Advanced <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet via-fuchsia-500 to-cyber-blue">
                            Digital Solutions
                        </span>
                      </>
                    )}
                </h2>
            </motion.div>
            <motion.p 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`max-w-sm text-lg md:text-right ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}
            >
                {loc.desc}
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {translatedServices.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              onOpen={setSelectedService} 
              theme={theme}
              language={language}
            />
          ))}
        </div>

        {/* Inline Back To Top */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`px-6 py-3 border rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2 cursor-pointer text-gray-400 group ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 hover:border-cyber-violet/50 hover:text-cyber-violet' 
                : 'bg-slate-100 border-slate-200 hover:border-[#bc13fe] hover:text-[#bc13fe]'
            }`}
          >
            <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-[#bc13fe]" />
            {t('about_btn_top')}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md p-4 md:p-6 flex justify-center items-start md:items-center py-6 md:py-12"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a1a1a] border border-cyber-blue/30 rounded-3xl max-w-2xl w-full overflow-hidden relative my-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header */}
              <div className="flex md:hidden items-center justify-between px-6 py-4 border-b border-white/5 bg-[#141416]/90 backdrop-blur-sm sticky top-0 z-30 text-white">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="flex items-center gap-2 text-xs font-bold font-mono text-gray-400 hover:text-white uppercase tracking-wider"
                >
                  {loc.back}
                </button>
                <span className="text-[10px] text-cyber-violet font-mono font-bold uppercase tracking-widest bg-cyber-violet/10 px-2 py-1 rounded">SERVICE</span>
              </div>

              <div className="p-6 sm:p-10 md:p-12 relative text-white">
                {/* Desktop Close button */}
                <button 
                  onClick={() => setSelectedService(null)}
                  className="hidden md:block absolute top-6 right-6 p-2 bg-white/5 rounded-full text-white hover:bg-cyber-violet transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <X size={20} />
                </button>
                
                <div className="mb-6 md:mb-8">
                  <div className="inline-flex p-3 md:p-4 bg-cyber-blue/10 rounded-2xl text-cyber-blue mb-4 md:mb-6">
                    <selectedService.icon size={36} className="md:size-12" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-3 md:mb-4">{selectedService.title}</h3>
                  <div className="h-1 w-20 bg-cyber-blue rounded-full"></div>
                </div>

                <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4 mb-8 text-left">
                   <p>{selectedService.fullDescription}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 md:mb-10 text-left">
                   {loc.details.map((item) => (
                     <div key={item} className="flex items-center gap-3 text-white/80 font-medium text-sm md:text-base">
                       <CheckCircle2 size={18} className="text-cyber-blue shrink-0" />
                       {item}
                     </div>
                   ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleDevisRequest}
                    className="flex-1 py-4 bg-cyber-blue text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white hover:text-black transition-all cursor-pointer text-center"
                  >
                    {loc.quote}
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="py-4 px-6 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all text-center cursor-pointer"
                  >
                    {t('services_close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
