import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';

interface FaqItem {
  q: string;
  a: string;
}

const Faq: React.FC = () => {
  const { theme, language, t } = useThemeAndLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FaqItem[] = language === 'fr' ? [
    {
      q: "Quel est le budget moyen pour un projet chez Oliteck Studio ?",
      a: "Chaque projet est unique. Nous concevons aussi bien des solutions MVP d'automatisation à partir de 500 € que des applications complexes de type SaaS ou plateformes sur-mesure nécessitant plusieurs semaines d'ingénierie avancée. Écrivez-nous pour une estimation sur-mesure gratuite sous 24h."
    },
    {
      q: "Quels sont vos délais typiques de livraison ?",
      a: "Une automatisation de workflow ou un site vitrine prend généralement 1 à 2 semaines de conception et déploiement. Pour une application web complète (SaaS) ou mobile (Flutter), comptez entre 4 à 8 semaines en moyenne selon la complexité de votre cahier des charges."
    },
    {
      q: "Proposez-vous un accompagnement et de la maintenance après la livraison ?",
      a: "Oui, absolument ! Nous assurons un support gratuit de 30 jours après mise en production pour corriger toute friction d'adaptation. Par la suite, nous proposons des forfaits de maintenance technique mensuels ou annuels pour garantir la sécurité et la scalabilité de votre plateforme."
    },
    {
      q: "Suis-je propriétaire complet du code source de mon application ?",
      a: "Oui, de manière absolue. Une fois le paiement final validé, l'intégralité du code source écrit sur-mesure vous est cédée avec ses droits exclusifs de propriété intellectuelle. Nous vous remettons des rapports documentés pour vous garantir une autonomie totale."
    }
  ] : [
    {
      q: "What is the average budget for a project at Oliteck Studio?",
      a: "Every project is distinct. We design lightweight automation MVPs starting from €500 up to complex web SaaS platforms or bespoke cross-platform systems requiring several weeks of high-end software engineering. Write to us for a custom free estimate within 24h."
    },
    {
      q: "What are your typical delivery periods?",
      a: "A dedicated workflow automation or custom landing page usually takes 1 to 2 weeks of implementation. Realizing a fully-featured bespoke web SaaS dashboard or Flutter application takes on average 4 to 8 weeks depending on specifications."
    },
    {
      q: "Do you supply support and software maintenance after launch?",
      a: "Yes, definitely. We carry a complimentary 30-day support period after rollout. Beyond that lifecycle, we offer continuous technical maintenance plans to sustain the stability, visual polish, and upgrades of your product."
    },
    {
      q: "Will I have full and ultimate ownership of the project source code?",
      a: "Yes, absolutely. Upon final project validation and delivery sign-off, full legal rights and copy-permissions of the customized written code transfers to you. We establish rich setup documentation so you always keep complete digital independence."
    }
  ];

  return (
    <section 
      id="faq" 
      className={`py-28 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#030305]' : 'bg-slate-50 border-t border-b border-rose-100/30'
      }`}
    >
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[450px] h-[450px] bg-cyber-violet/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        
        {/* Header section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-cyber-blue animate-pulse" />
            <span className="text-cyber-blue font-mono text-xs uppercase tracking-[0.3em]">{t('faq_sec_title')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            {language === 'fr' ? (
              <>Questions <span className="text-cyber-violet">Fréquentes</span></>
            ) : (
              <>Frequently Asked <span className="text-cyber-violet">Questions</span></>
            )}
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-mono max-w-md">
            {t('faq_sec_desc')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                  isOpen
                    ? theme === 'dark'
                      ? 'bg-white/[0.04] border-cyber-blue/50 shadow-[0_0_20px_rgba(0,243,255,0.05)]'
                      : 'bg-white border-cyber-violet hover:border-cyber-violet shadow-md'
                    : theme === 'dark'
                      ? 'bg-black/40 border-white/5 hover:border-white/10'
                      : 'bg-white border-slate-200 hover:border-slate-350'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer pointer-events-auto select-none"
                >
                  <div className="flex items-start gap-4 pr-4">
                    <HelpCircle className={`shrink-0 mt-0.5 transition-colors duration-300 ${
                      isOpen ? 'text-cyber-blue' : 'text-gray-500'
                    }`} size={18} />
                    <span className={`text-sm md:text-base font-bold transition-all ${
                      isOpen
                        ? theme === 'dark' ? 'text-white' : 'text-cyber-violet'
                        : theme === 'dark' ? 'text-gray-200' : 'text-slate-800'
                    }`}>
                      {item.q}
                    </span>
                  </div>
                  <div className={`shrink-0 p-1.5 rounded-full border transition-all duration-300 ${
                    isOpen 
                      ? 'bg-cyber-blue/10 border-cyber-blue text-cyber-blue' 
                      : 'bg-white/5 border-gray-600/30 text-gray-400'
                  }`}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className={`px-6 pb-6 pt-1 text-xs md:text-sm leading-relaxed font-normal ${
                        theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                      }`}>
                        <div className="h-px bg-white/5 mb-4" />
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Faq;
