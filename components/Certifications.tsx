import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CERTIFICATIONS } from '../constants';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import { Award, Calendar, ChevronUp, GraduationCap, CheckCircle, Sparkles } from 'lucide-react';

const Certifications: React.FC = () => {
  const { theme, language, dynamic, t } = useThemeAndLanguage();
  const [filter, setFilter] = useState<'all' | 'degree' | 'certification'>('all');

  const translatedCertifications = dynamic.certifications.map(dc => {
    const original = CERTIFICATIONS.find(c => c.id === dc.id);
    return {
      ...dc,
      year: original?.year || '',
      institution: original?.institution || '',
      type: original?.type || 'certification',
      score: original?.score,
      mention: original?.mention,
    };
  });

  const filteredItems = translatedCertifications.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <section 
      id="certifications" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-cyber-black text-white' : 'bg-white text-slate-900 border-b border-slate-200'
      }`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3">
            {language === 'fr' ? (
              <>Diplômes & <span className="text-cyber-violet">Certifications</span></>
            ) : (
              <>Degrees & <span className="text-cyber-violet">Certifications</span></>
            )}
          </h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            {language === 'fr' ? 'Cursus Universitaire & Formations Professionnelles (CV)' : 'Academic Credentials & Professional Certifications'}
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {[
            { id: 'all', labelFr: 'Tous (8)', labelEn: 'All (8)' },
            { id: 'degree', labelFr: 'Diplômes Académiques (4)', labelEn: 'Academic Degrees (4)' },
            { id: 'certification', labelFr: 'Certifications Cursa (4)', labelEn: 'Cursa Certifications (4)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-cyber-violet text-white shadow-lg shadow-cyber-violet/30 scale-105'
                  : theme === 'dark'
                    ? 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'fr' ? tab.labelFr : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-violet to-purple-800 opacity-30"></div>

          <AnimatePresence mode="popLayout">
            {filteredItems.map((cert, index) => {
              const isDegree = cert.type === 'degree';
              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`relative mb-10 md:mb-16 flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } items-center`}
                >
                  {/* Dot */}
                  <div className={`absolute left-0 md:left-1/2 transform -translate-x-[5px] md:-translate-x-1/2 w-3.5 h-3.5 rounded-full z-10 shadow-lg ${
                    isDegree ? 'bg-cyber-blue shadow-[0_0_12px_#00f3ff]' : 'bg-cyber-violet shadow-[0_0_12px_#bc13fe]'
                  }`}></div>

                  {/* Content Card */}
                  <div className="md:w-1/2 pl-8 md:pl-0 md:px-8 w-full">
                    <div className={`border p-6 rounded-2xl transition-all duration-300 relative group overflow-hidden ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:border-cyber-violet/50'
                        : 'bg-slate-50 border-slate-200 hover:border-[#bc13fe] shadow-sm'
                    }`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {isDegree ? (
                            <GraduationCap className="text-cyber-blue shrink-0" size={20} />
                          ) : (
                            <Award className="text-cyber-violet shrink-0" size={20} />
                          )}
                          <h3 className={`text-lg font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                            {cert.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-cyber-blue font-mono mb-3">
                        <Calendar size={13} className="shrink-0" />
                        <span>{cert.year}</span>
                        <span className="text-gray-500">•</span>
                        <span className="truncate max-w-[200px] sm:max-w-none">{cert.institution}</span>
                      </div>

                      {(cert.score || cert.mention) && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
                          <Sparkles size={11} className="text-purple-400" />
                          <span>{cert.score ? `Note : ${cert.score}` : ''} {cert.mention ? `| ${cert.mention}` : ''}</span>
                        </div>
                      )}

                      <p className={`text-xs md:text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                        {cert.description}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Inline Back To Top */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`px-6 py-3 border rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2 cursor-pointer text-gray-400 group ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 hover:border-cyber-blue/50 hover:text-cyber-blue' 
                : 'bg-slate-100 border-slate-200 hover:border-[#bc13fe] hover:text-[#bc13fe]'
            }`}
          >
            <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-[#00f3ff]" />
            {t('about_btn_top')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
