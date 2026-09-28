import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Award, Mail, ChevronRight, ChevronUp, Briefcase, Calendar, CheckCircle2, Globe2, Sparkles, Download, Layers } from 'lucide-react';
import { Cube3D } from './Cube3D';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import { EXPERIENCES, CANDIDATE_PROFILE } from '../constants';

const About: React.FC = () => {
  const { theme, t, language } = useThemeAndLanguage();
  const [selectedExp, setSelectedExp] = useState<string>(EXPERIENCES[0]?.id || 'exp-1');

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="about" 
      className={`py-32 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-cyber-black' : 'bg-slate-100/60'
      }`}
    >
      {/* Background Decorative Text */}
      <div className={`absolute top-20 left-10 text-9xl font-black select-none pointer-events-none uppercase hidden lg:block ${
        theme === 'dark' ? 'text-white/[0.02]' : 'text-slate-800/[0.02]'
      }`}>
        Architect
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 mb-12 text-center">
            <div className="flex items-center gap-3 justify-center">
              <div className="h-px w-8 bg-cyber-violet"></div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                {t('about_title')}
              </h2>
              <div className="h-px w-8 bg-cyber-violet"></div>
            </div>
            <p className={`text-sm md:text-base font-medium max-w-xl italic ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              "{t('about_subtitle')}"
            </p>
          </motion.div>

          <div className={`backdrop-blur-2xl p-8 md:p-14 rounded-[32px] relative overflow-hidden group border transition-all duration-500 ${
            theme === 'dark' 
              ? 'bg-white/[0.02] border-white/5 text-gray-400' 
              : 'bg-white border-slate-200/85 text-slate-700 shadow-xl shadow-slate-200/50'
          }`}>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            
            <motion.div variants={itemVariants} className="text-base leading-relaxed mb-12 space-y-6 text-justify">
              <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {t('about_p1')}
              </p>
              
              <p className={`border-l-4 border-cyber-blue pl-6 italic py-4 pr-4 rounded-r-lg font-medium text-lg ${
                theme === 'dark' ? 'bg-white/[0.02]' : 'bg-slate-100/50'
              }`}>
                "{t('about_quote')}"
              </p>

              <p className="text-sm md:text-base">
                {t('about_p2')}
              </p>
            </motion.div>

            {/* Atout Majeur Banner from CV */}
            <motion.div 
              variants={itemVariants}
              className={`p-6 rounded-2xl border mb-12 relative overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-cyber-blue/10 via-cyber-violet/10 to-transparent border-cyber-blue/30'
                  : 'bg-gradient-to-r from-cyan-50 via-purple-50 to-white border-cyan-200 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyber-blue/20 rounded-xl shrink-0 text-cyber-blue mt-1">
                  <Sparkles size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-cyber-blue block mb-1">
                    {language === 'fr' ? 'Atout Majeur Relevé du CV' : 'Major Competitive Advantage'}
                  </span>
                  <p className={`text-sm md:text-base font-semibold leading-relaxed ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {CANDIDATE_PROFILE.majorAsset}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Grid of 6 Core CV Qualities */}
            <motion.div variants={itemVariants} className="mb-14">
              <h4 className={`text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                <span className="h-2 w-2 rounded-full bg-cyber-violet inline-block"></span>
                {language === 'fr' ? 'Qualités Professionnelles (CV)' : 'Professional Qualities & Strengths'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CANDIDATE_PROFILE.qualities.map((q, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border text-center font-mono text-xs font-bold transition-all ${
                      theme === 'dark' 
                        ? 'border-white/10 bg-white/[0.02] text-gray-300 hover:border-cyber-violet hover:text-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-[#bc13fe] hover:text-[#bc13fe]'
                    }`}
                  >
                    <CheckCircle2 size={14} className="mx-auto mb-1.5 text-cyber-blue" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Expériences Professionnelles - Timeline Interactive issue du CV */}
            <motion.div variants={itemVariants} className="mb-16">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h4 className={`text-xl font-bold uppercase tracking-wider flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  <Briefcase size={20} className="text-cyber-blue" />
                  {language === 'fr' ? 'Parcours & Expériences Professionnelles' : 'Career & Professional Experiences'}
                </h4>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  Bouaké · Côte d'Ivoire
                </span>
              </div>

              {/* Experience Selector Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {EXPERIENCES.map((exp) => {
                  const isSelected = selectedExp === exp.id;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setSelectedExp(exp.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? theme === 'dark'
                            ? 'bg-cyber-violet/15 border-cyber-violet shadow-lg shadow-cyber-violet/10'
                            : 'bg-purple-50 border-[#bc13fe] shadow-md shadow-purple-100'
                          : theme === 'dark'
                            ? 'bg-black/30 border-white/5 hover:border-white/20'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? 'text-cyber-violet' : 'text-gray-400'
                        }`}>
                          {exp.period}
                        </span>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Actif
                          </span>
                        )}
                      </div>
                      <h5 className={`font-bold text-sm leading-tight mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {exp.title}
                      </h5>
                      <p className="text-xs text-cyber-blue font-medium">
                        {exp.company}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Experience Detail Card */}
              <AnimatePresence mode="wait">
                {(() => {
                  const active = EXPERIENCES.find(e => e.id === selectedExp) || EXPERIENCES[0];
                  return (
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-6 md:p-8 rounded-2xl border text-left ${
                        theme === 'dark' 
                          ? 'bg-black/40 border-white/10' 
                          : 'bg-white border-slate-200 shadow-md'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-500/10">
                        <div>
                          <h5 className={`text-lg font-black uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {active.title}
                          </h5>
                          <p className="text-xs font-mono text-cyber-blue mt-0.5 flex items-center gap-2">
                            <span>{active.company}</span>
                            <span>•</span>
                            <span className="text-gray-500">{active.location}</span>
                          </p>
                        </div>
                        <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                          {active.period}
                        </span>
                      </div>

                      <p className={`text-sm mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        {active.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold">
                          {language === 'fr' ? 'Missions & Responsabilités Clés :' : 'Core Responsibilities :'}
                        </p>
                        {active.tasks.map((task, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-justify">
                            <span className="text-cyber-violet font-bold mt-0.5">▹</span>
                            <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>{task}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {active.tech.map((t, idx) => (
                          <span 
                            key={idx}
                            className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </motion.div>

            {/* OLITECK STUDIO Block */}
            <motion.div 
              variants={itemVariants} 
              className={`p-6 md:p-8 rounded-2xl border mb-16 text-left relative overflow-hidden ${
                theme === 'dark' 
                  ? 'border-cyber-violet/20 bg-gradient-to-br from-cyber-black to-purple-950/20' 
                  : 'border-slate-300 bg-slate-200/30'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-violet/10 blur-2xl pointer-events-none rounded-full" />
              <h4 className={`text-xl font-black uppercase tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet to-cyber-blue`}>
                {t('oliteck_title')}
              </h4>
              <p className={`text-sm md:text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                {t('oliteck_desc')}
              </p>
            </motion.div>

            {/* Custom Interactive 3D Cube Showcase Title */}
            <motion.div variants={itemVariants} className="mt-16 mb-8 text-center md:text-left">
              <p className="text-[10px] font-mono text-cyber-blue uppercase tracking-[0.4em] mb-2">{t('about_3d_title')}</p>
              <h4 className={`text-xl font-black uppercase tracking-wider flex items-center justify-center md:justify-start gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {t('about_3d_subtitle')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-violet font-mono">[ 3D_STATS ]</span>
              </h4>
              <p className="text-xs text-gray-500 mt-1">{t('about_3d_desc')}</p>
            </motion.div>

            {/* Grid of 3D Cubes */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 items-center justify-items-center mb-16 py-12 border rounded-3xl relative overflow-visible ${
              theme === 'dark' ? 'bg-black/30 border-white/10' : 'bg-slate-100/50 border-slate-200'
            }`}>
              <div className="absolute top-2 left-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest hidden lg:block">System Status: Holograms Live</div>
              
              <Cube3D 
                size={120}
                front={{ text: t('cube_exp_front'), subtext: t('cube_exp_sub'), gradient: "from-cyber-blue/40 to-cyan-900/60" }}
                back={{ text: t('cube_exp_back'), subtext: t('cube_exp_full'), gradient: "from-cyan-900 to-black" }}
                left={{ text: "Flutter", subtext: t('skills_mobile'), gradient: "from-blue-900 to-cyan-900" }}
                right={{ text: "React", subtext: "Web SPA", gradient: "from-cyan-900 to-cyber-blue/80" }}
                top={{ text: "Python", subtext: "AI / Data", gradient: "from-cyber-violet/30 to-blue-950" }}
                bottom={{ text: "NodeJS", subtext: "Architecture", gradient: "from-slate-900 to-black" }}
              />

              <Cube3D 
                size={120}
                front={{ text: t('cube_crea_front'), subtext: t('cube_crea_sub'), gradient: "from-cyber-violet/40 to-fuchsia-950/60" }}
                back={{ text: t('cube_crea_back'), subtext: t('cube_crea_back_sub'), gradient: "from-fuchsia-900 to-black" }}
                left={{ text: "SaaS Apps", subtext: "Cloud Run", gradient: "from-purple-900 to-cyber-violet/70" }}
                right={{ text: "Solos", subtext: "Sur-mesure", gradient: "from-purple-900 to-fuchsia-950" }}
                top={{ text: "Oliteck", subtext: "Studio", gradient: "from-fuchsia-950 to-purple-950" }}
                bottom={{ text: "API REST", subtext: "Microservices", gradient: "from-slate-950 to-black" }}
              />

              <Cube3D 
                size={120}
                front={{ text: t('cube_ia_front'), subtext: t('cube_ia_sub'), gradient: "from-amber-500/10 to-purple-950/40" }}
                back={{ text: t('cube_ia_back'), subtext: t('cube_ia_back_sub'), gradient: "from-purple-950 to-black" }}
                left={{ text: "n8n / Flow", subtext: "Automation", gradient: "from-purple-950 to-purple-900" }}
                right={{ text: "RAG / LLM", subtext: "Gemini", gradient: "from-purple-900 to-amber-950" }}
                top={{ text: "ALICIA", subtext: "Assistant", gradient: "from-purple-950 to-black" }}
                bottom={{ text: "Scalable", subtext: "Performant", gradient: "from-teal-950 to-black" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
               {[
                 { icon: MapPin, label: t('about_info_base'), value: "Bouaké, CI", color: "text-cyber-blue" },
                 { icon: Award, label: t('about_info_focus'), value: "Full Stack & IA", color: "text-cyber-violet" },
                 { icon: ChevronRight, label: t('about_info_studio'), value: "Oliteck Studio", color: "text-white" }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   variants={itemVariants}
                   whileHover={{ y: -5 }}
                   className={`p-6 rounded-2xl border transition-all font-mono ${
                     theme === 'dark' 
                       ? 'bg-white/5 border-white/10 hover:border-white/20 text-white' 
                       : 'bg-slate-100/50 border-slate-200 hover:border-slate-300 text-slate-800'
                   }`}
                 >
                   <item.icon size={24} className={`${item.color} mb-3`} />
                   <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">{item.label}</p>
                   <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.value}</p>
                 </motion.div>
               ))}
            </div>

             <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-cyber-blue to-cyber-violet text-white font-black rounded-full flex items-center justify-center gap-3 shadow-xl shadow-cyber-violet/20 hover:shadow-cyber-violet/40 transition-all cursor-pointer text-xs uppercase tracking-wider"
              >
                <Mail size={18} /> {t('about_btn_collab')}
                <ChevronRight size={18} />
              </motion.button>

              <motion.a
                href={CANDIDATE_PROFILE.cvDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full sm:w-auto px-8 py-5 border rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'border-white/15 text-white hover:border-cyber-blue hover:text-cyber-blue'
                    : 'border-slate-300 text-slate-800 hover:border-cyber-violet hover:text-cyber-violet'
                }`}
              >
                <Download size={16} />
                <span>{language === 'fr' ? 'Consulter le CV (Drive)' : 'View Official CV'}</span>
              </motion.a>
            </motion.div>

            {/* Inline Back To Top */}
            <div className="flex justify-center mt-12 pt-6 border-t border-slate-500/10">
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
        </motion.div>
      </div>
    </section>
  );
};

export default About;
