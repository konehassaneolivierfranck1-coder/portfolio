import React from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS, RADAR_DATA } from '../constants';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import { 
  Code, Smartphone, Bot, Database, 
  Globe, Cpu, Shield, Zap, Server, Tablet, ChevronUp
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const Skills: React.FC = () => {
  const { theme, language, t } = useThemeAndLanguage();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const planetVariants = {
    hover: {
      scale: 1.3,
      boxShadow: "0 0 25px rgba(0, 243, 255, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  // Translate Radar subjects dynamically
  const translatedRadarData = RADAR_DATA.map(item => {
    let subject = item.subject;
    if (language === 'en') {
      if (subject === 'IA & Auto') subject = 'AI & Auto';
      if (subject === 'Pédagogie') subject = 'Teaching';
    }
    return { ...item, subject };
  });

  return (
    <section 
      id="skills" 
      ref={ref} 
      className={`py-24 overflow-hidden relative min-h-[90vh] flex flex-col items-center justify-center transition-colors duration-500 ${
        theme === 'dark' ? 'bg-cyber-dark text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Background Grid */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(188,19,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(188,19,254,0.03)_1px,transparent_1px)] bg-[size:50px_50px] ${
        theme === 'dark' ? 'opacity-100' : 'opacity-20'
      }`}></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8 }}
           className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-3 uppercase tracking-tighter">
            {language === 'fr' ? (
              <>Maîtrise <span className="text-cyber-blue">Technique</span></>
            ) : (
              <>Technical <span className="text-cyber-blue">Mastery</span></>
            )}
          </h2>
          <p className="text-gray-500 font-mono text-[10px] tracking-[0.4em] uppercase">{t('skills_desc')}</p>
        </motion.div>

        {/* Solar System - Compact 2D Edition with 10 Icons */}
        <div className="relative w-full h-[450px] flex items-center justify-center mb-16 scale-75 md:scale-90 lg:scale-100">
           
          {/* Sun (Center) */}
          <div 
            className="absolute z-10 w-24 h-24 bg-gradient-to-br from-cyber-blue via-cyber-violet to-purple-900 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(188,19,254,0.4)] animate-glow-pulse"
          >
            <span className="text-3xl font-black text-white italic drop-shadow-lg">HK</span>
          </div>

          {/* Orbit 1: Core Web & Mobile (Smallest) */}
          <div 
            className={`absolute w-[180px] h-[180px] border rounded-full flex items-center justify-center animate-orbit-1 ${
              theme === 'dark' ? 'border-cyber-blue/20' : 'border-[#00f3ff]/40'
            }`}
          >
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3.5 border rounded-xl cursor-pointer shadow-lg text-cyber-blue ${
                theme === 'dark' ? 'bg-black/95 border-cyber-blue' : 'bg-white border-[#00f3ff]'
              }`}
            >
               <Code size={18} />
             </motion.div>
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3.5 border rounded-xl cursor-pointer shadow-lg text-cyber-blue ${
                theme === 'dark' ? 'bg-black/95 border-cyber-blue' : 'bg-white border-[#00f3ff]'
              }`}
            >
               <Globe size={18} />
            </motion.div>
          </div>

          {/* Orbit 2: Specialized Dev (Medium) */}
          <div 
            className={`absolute w-[290px] h-[290px] border rounded-full flex items-center justify-center animate-orbit-2 ${
              theme === 'dark' ? 'border-cyber-violet/20' : 'border-[#bc13fe]/30'
            }`}
          >
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-3.5 border rounded-xl cursor-pointer shadow-lg text-cyber-violet ${
                theme === 'dark' ? 'bg-black/95 border-cyber-violet' : 'bg-white border-[#bc13fe]'
              }`}
            >
               <Smartphone size={20} />
            </motion.div>
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 p-3.5 border rounded-xl cursor-pointer shadow-lg text-cyber-violet ${
                theme === 'dark' ? 'bg-black/95 border-cyber-violet' : 'bg-white border-[#bc13fe]'
              }`}
            >
               <Tablet size={20} />
            </motion.div>
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3.5 border rounded-xl cursor-pointer shadow-lg animate-pulse ${
                theme === 'dark' ? 'bg-black/95 border-white text-white' : 'bg-white border-slate-400 text-slate-800'
              }`}
            >
               <Cpu size={20} />
            </motion.div>
          </div>

          {/* Orbit 3: AI, Data & Infrastructure (Large) */}
          <div 
            className={`absolute w-[420px] h-[420px] border rounded-full flex items-center justify-center animate-orbit-3 ${
              theme === 'dark' ? 'border-white/5' : 'border-slate-300'
            }`}
          >
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 border rounded-xl cursor-pointer shadow-lg ${
                theme === 'dark' ? 'bg-black/95 border-white text-white' : 'bg-white border-slate-400 text-slate-800'
              }`}
            >
               <Bot size={22} />
            </motion.div>
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-4 border rounded-xl cursor-pointer shadow-lg text-gray-400 ${
                theme === 'dark' ? 'bg-black/95 border-gray-500' : 'bg-white border-slate-300'
              }`}
            >
               <Database size={20} />
            </motion.div>
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-4 border rounded-xl cursor-pointer shadow-lg text-green-500 ${
                theme === 'dark' ? 'bg-black/95 border-green-500' : 'bg-white border-green-500'
              }`}
            >
               <Shield size={18} />
            </motion.div>
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 p-4 border rounded-xl cursor-pointer shadow-lg text-orange-500 ${
                theme === 'dark' ? 'bg-black/95 border-orange-500' : 'bg-white border-orange-500'
              }`}
            >
               <Server size={18} />
            </motion.div>
            <motion.div 
              variants={planetVariants} 
              whileHover="hover" 
              className={`absolute bottom-[10%] right-[15%] p-4 border rounded-xl cursor-pointer shadow-lg text-yellow-400 ${
                theme === 'dark' ? 'bg-black/95 border-yellow-400' : 'bg-white border-yellow-400'
              }`}
            >
               <Zap size={18} />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Progress Bars */}
          <div className="space-y-6">
            {SKILLS.map((skill, index) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className={`font-mono font-bold uppercase text-[10px] tracking-widest ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {skill.name}
                  </span>
                  <span className="text-cyber-blue font-mono text-[10px] font-bold">{skill.percentage}%</span>
                </div>
                <div className={`w-full rounded-full h-1 overflow-hidden ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-slate-200'
                }`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.percentage}%` } : {}}
                    transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${
                        skill.category === 'ia' || skill.category === 'data' 
                        ? 'from-cyber-violet to-purple-500' 
                        : 'from-cyber-blue to-cyan-500'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Radar Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className={`h-[350px] w-full backdrop-blur-md rounded-[32px] border p-6 flex items-center justify-center relative overflow-hidden group transition-all duration-500 ${
              theme === 'dark' 
                ? 'bg-white/[0.02] border-white/5' 
                : 'bg-slate-50 border-slate-200 shadow-lg shadow-slate-100'
            }`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={translatedRadarData}>
                <PolarGrid stroke={theme === 'dark' ? '#222' : '#ddd'} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ 
                    fill: theme === 'dark' ? '#aaa' : '#444', 
                    fontSize: 9, 
                    fontWeight: 'bold', 
                    fontFamily: 'Fira Code' 
                  }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Expertise"
                  dataKey="A"
                  stroke="#bc13fe"
                  strokeWidth={2}
                  fill="#bc13fe"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Inline Back To Top */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`px-6 py-3 border rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2 cursor-pointer text-gray-400 group ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 hover:border-cyber-blue/50 hover:text-cyber-blue' 
                : 'bg-slate-100 border-slate-200 hover:border-[#13bec4] hover:text-[#13bec4]'
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

export default Skills;
