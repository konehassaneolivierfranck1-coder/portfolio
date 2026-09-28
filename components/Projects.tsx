import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import { 
  X, 
  ExternalLink, 
  ArrowUpRight, 
  ChevronUp, 
  Github, 
  Sparkles, 
  Layers, 
  Globe, 
  Smartphone, 
  Bot, 
  RotateCcw,
  SlidersHorizontal,
  LucideIcon 
} from 'lucide-react';

interface LocalTrans {
  title: string;
  subtitle: string;
  desc: string;
  backLab: string;
  initiate: string;
  demo: string;
  close: string;
  allFilter: string;
  webFilter: string;
  mobileFilter: string;
  aiFilter: string;
  resetFilter: string;
  filteredCount: (count: number) => string;
  noProjects: string;
  resetAll: string;
  msgTemplate: (name: string) => string;
}

const LOCAL_I18N: Record<'fr' | 'en', LocalTrans> = {
  fr: {
    title: "Lab",
    subtitle: "Créatif",
    desc: "Une sélection rigoureuse de réalisations complexes & innovantes.",
    backLab: "← Revenir au Lab",
    initiate: "Initier ce projet",
    demo: "Démo Live",
    close: "Fermer",
    allFilter: "Tous les projets",
    webFilter: "Web & SaaS",
    mobileFilter: "Mobile",
    aiFilter: "IA & Automatisation",
    resetFilter: "Réinitialiser le filtre",
    filteredCount: (count: number) => `${count} projet${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`,
    noProjects: "Aucun projet ne correspond à cette catégorie actuellement.",
    resetAll: "Voir tous les projets",
    msgTemplate: (name) => `Bonjour Hassane, j'ai vu votre projet "${name}" et j'aimerais réaliser quelque chose de similaire...`
  },
  en: {
    title: "Creative",
    subtitle: "Lab",
    desc: "A handpicked selection of complex & state-of-the-art developments.",
    backLab: "← Back to Lab",
    initiate: "Start Similar Project",
    demo: "Live Demo",
    close: "Close",
    allFilter: "All Projects",
    webFilter: "Web & SaaS",
    mobileFilter: "Mobile",
    aiFilter: "AI & Automation",
    resetFilter: "Reset filter",
    filteredCount: (count: number) => `${count} project${count > 1 ? 's' : ''} found`,
    noProjects: "No projects match this category at the moment.",
    resetAll: "View All Projects",
    msgTemplate: (name) => `Hello Hassane, I saw your project "${name}" and I would like to create something similar...`
  }
};

type FilterKey = 'all' | 'web' | 'mobile' | 'ai';

interface FilterTab {
  id: FilterKey;
  labelKey: 'allFilter' | 'webFilter' | 'mobileFilter' | 'aiFilter';
  shortLabelFr: string;
  shortLabelEn: string;
  icon: LucideIcon;
}

const FILTER_TABS: FilterTab[] = [
  { id: 'all', labelKey: 'allFilter', shortLabelFr: 'Tous', shortLabelEn: 'All', icon: Layers },
  { id: 'web', labelKey: 'webFilter', shortLabelFr: 'Web', shortLabelEn: 'Web', icon: Globe },
  { id: 'mobile', labelKey: 'mobileFilter', shortLabelFr: 'Mobile', shortLabelEn: 'Mobile', icon: Smartphone },
  { id: 'ai', labelKey: 'aiFilter', shortLabelFr: 'IA & Auto', shortLabelEn: 'AI & Auto', icon: Bot },
];

const matchesFilter = (project: { category?: string; tech?: string[] }, filter: FilterKey): boolean => {
  if (filter === 'all') return true;
  const cat = (project.category || '').toLowerCase();
  const techStr = (project.tech || []).join(' ').toLowerCase();

  if (filter === 'web') {
    return cat.includes('web') || cat.includes('saas') || techStr.includes('react') || techStr.includes('next');
  }
  if (filter === 'mobile') {
    return cat.includes('mobile') || techStr.includes('flutter') || techStr.includes('dart') || techStr.includes('react native');
  }
  if (filter === 'ai') {
    return (
      cat.includes('ia') || 
      cat.includes('ai') || 
      cat.includes('auto') || 
      techStr.includes('openai') || 
      techStr.includes('n8n') || 
      techStr.includes('ia') || 
      techStr.includes('ai') || 
      techStr.includes('biomédicale') || 
      techStr.includes('biomedical')
    );
  }
  return true;
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  onCategoryClick?: (category: string) => void;
  theme: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick, onCategoryClick, theme }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Specular glass shine effect
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineBg = useTransform(
    [shineX, shineY],
    ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 65%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      onClick={onClick}
      className={`relative group cursor-pointer h-[420px] w-full rounded-[24px] overflow-hidden transition-all duration-500 hover:shadow-cyber-violet/20 ${
        theme === 'dark' 
          ? 'bg-white/[0.03] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:border-cyber-blue/40' 
          : 'bg-white border border-slate-200/90 shadow-lg shadow-slate-100/50 hover:border-cyber-violet/40'
      }`}
    >
      {/* Background Image with Zoom */}
      <motion.img 
        src={project.image} 
        alt={project.title} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
          theme === 'dark' 
            ? 'opacity-60 group-hover:opacity-85' 
            : 'opacity-75 group-hover:opacity-95 bg-slate-100'
        }`}
      />
      
      {/* Specularity Highlight Overlay */}
      <motion.div 
        style={{ background: shineBg }}
        className="absolute inset-0 z-15 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      {/* Custom Cursor Overlay */}
      <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mix-blend-difference scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
          <ArrowUpRight className="text-black" size={20} />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Category clickable pill badge */}
      <div className="absolute top-4 left-4 z-20">
        <button
          type="button"
          onClick={(e) => {
            if (onCategoryClick) {
              e.stopPropagation();
              onCategoryClick(project.category);
            }
          }}
          className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider bg-black/80 text-cyber-blue backdrop-blur-md rounded-md border border-white/10 hover:border-cyber-blue hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          title={`Filtrer par ${project.category}`}
        >
          {project.category}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 p-6 z-20 w-full" style={{ transform: "translateZ(30px)" }}>
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded text-[9px] font-mono font-bold text-white/90 uppercase tracking-wider border border-white/5">
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-black text-white mb-1 leading-none uppercase tracking-tight italic group-hover:text-cyber-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-gray-300 line-clamp-2 max-w-[95%]">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { theme, language, dynamic, t } = useThemeAndLanguage();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const key = language === 'fr' ? 'fr' : 'en';
  const loc = LOCAL_I18N[key];

  const handleStartSimilarProject = () => {
    const projectName = selectedProject?.title;
    setSelectedProject(null);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        window.dispatchEvent(new CustomEvent('fill-contact-message', {
          detail: {
            message: loc.msgTemplate(projectName || ''),
            subject: 'Développement Web'
          }
        }));
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.focus();
        }
      }
    }, 150);
  };

  // Build translated projects array merging static properties
  const translatedProjects = dynamic.projects.map(dp => {
    const original = PROJECTS.find(p => p.id === dp.id);
    return {
      ...dp,
      image: original?.image || '',
      tech: original?.tech || [],
      link: original?.link || '#',
      category: original?.category || 'Dev',
      year: original?.year || '2025',
      context: dp.context || original?.context || '',
      solution: dp.solution || original?.solution || '',
      result: dp.result || original?.result || '',
      github: original?.github || '#'
    };
  });

  // Calculate dynamic count for each filter tab
  const getFilterCount = (filterId: FilterKey) => {
    return translatedProjects.filter(p => matchesFilter(p, filterId)).length;
  };

  // Handle clicking a category tag on any card
  const handleCategoryTagClick = (categoryStr: string) => {
    const cat = categoryStr.toLowerCase();
    if (cat.includes('mobile')) {
      setActiveFilter('mobile');
    } else if (cat.includes('ia') || cat.includes('ai') || cat.includes('auto')) {
      setActiveFilter('ai');
    } else if (cat.includes('web') || cat.includes('saas')) {
      setActiveFilter('web');
    } else {
      setActiveFilter('all');
    }
  };

  // Current active filtered list
  const filteredProjects = translatedProjects.filter((project) => matchesFilter(project, activeFilter));

  return (
    <section 
      id="projects" 
      className={`py-32 overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-cyber-black text-white' : 'bg-slate-100/60 text-slate-800'
      }`}
    >
      <div className="container mx-auto px-4">
        
        {/* Header section with sparkles */}
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-3"
          >
            <Sparkles size={16} className="text-cyber-violet animate-pulse" />
            <span className="text-cyber-violet font-mono text-xs uppercase tracking-[0.3em]">{t('projects_desc')}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4"
          >
            {loc.title} <span className="text-cyber-blue">{loc.subtitle}</span>
          </motion.h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm text-gray-500">
            {language === 'fr' ? "Filtrez par domaine pour explorer mes réalisations" : "Filter by technology stack to explore my projects"}
          </p>
        </div>

        {/* Futuristic Filter Tabs Bar */}
        <div className="flex justify-center mb-8 px-2">
          <div 
            role="tablist"
            aria-label="Filtres de projets"
            className={`inline-flex items-center p-1.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 max-w-full overflow-x-auto no-scrollbar gap-1.5 shadow-xl ${
              theme === 'dark'
                ? 'bg-[#0e1017]/90 border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
                : 'bg-white/95 border-slate-200/90 shadow-lg shadow-slate-200/60'
            }`}
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              const count = getFilterCount(tab.id);
              const Icon = tab.icon;
              const label = loc[tab.labelKey];
              const shortLabel = language === 'fr' ? tab.shortLabelFr : tab.shortLabelEn;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 select-none cursor-pointer whitespace-nowrap ${
                    isActive
                      ? theme === 'dark'
                        ? 'text-cyber-blue font-bold shadow-[0_0_25px_rgba(0,243,255,0.2)]'
                        : 'text-white font-bold shadow-md'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {/* Animated sliding active pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectsFilterPill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className={`absolute inset-0 rounded-xl ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-cyber-blue/20 via-cyber-violet/20 to-cyber-blue/20 border border-cyber-blue/70 shadow-[inset_0_0_15px_rgba(0,243,255,0.2)]'
                          : 'bg-slate-900 border border-slate-900'
                      }`}
                    />
                  )}

                  <Icon 
                    size={15} 
                    className={`relative z-10 transition-colors ${
                      isActive 
                        ? theme === 'dark' ? 'text-cyber-blue' : 'text-cyber-blue'
                        : theme === 'dark' ? 'text-gray-400' : 'text-slate-400'
                    }`} 
                  />

                  {/* Responsive text: short label on mobile, full label on tablet/desktop */}
                  <span className="relative z-10 hidden sm:inline">{label}</span>
                  <span className="relative z-10 inline sm:hidden">{shortLabel}</span>

                  {/* Dynamic item count badge */}
                  <span 
                    className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold transition-all ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-cyber-blue/25 text-cyber-blue border border-cyber-blue/50'
                          : 'bg-white/20 text-white'
                        : theme === 'dark'
                          ? 'bg-white/5 text-gray-500 border border-white/5'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter feedback status bar & reset button */}
        {activeFilter !== 'all' && (
          <motion.div 
            initial={{ opacity: 0, y: -6 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex justify-center items-center gap-3 mb-10 font-mono text-xs text-gray-500"
          >
            <div className="flex items-center gap-1.5 bg-cyber-blue/5 border border-cyber-blue/20 px-3 py-1 rounded-full text-cyber-blue">
              <SlidersHorizontal size={12} />
              <span>{loc.filteredCount(filteredProjects.length)}</span>
            </div>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-gray-400 hover:text-cyber-violet transition-colors cursor-pointer flex items-center gap-1.5 text-xs hover:underline"
            >
              <RotateCcw size={12} />
              <span>{loc.resetFilter}</span>
            </button>
          </motion.div>
        )}

        {/* Projects cards grid with fluid layout physics */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`text-center py-24 px-6 rounded-3xl border max-w-lg mx-auto ${
                theme === 'dark' 
                  ? 'bg-white/[0.02] border-white/10 text-gray-400' 
                  : 'bg-white border-slate-200 text-slate-600 shadow-sm'
              }`}
            >
              <Bot size={40} className="mx-auto mb-4 text-cyber-violet opacity-60" />
              <p className="font-mono text-sm mb-4">{loc.noProjects}</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="px-5 py-2.5 bg-cyber-blue text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-colors cursor-pointer"
              >
                {loc.resetAll}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project as any} 
                    index={index} 
                    theme={theme}
                    onClick={() => setSelectedProject(project)} 
                    onCategoryClick={handleCategoryTagClick}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inline Back To Top */}
        <div className="flex justify-center mt-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`px-6 py-3 border rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2 cursor-pointer text-gray-400 group ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 hover:border-cyber-violet/50 hover:text-cyber-violet' 
                : 'bg-slate-100 border-slate-200 hover:border-[#bc13fe]/50 hover:text-[#bc13fe]'
            }`}
          >
            <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-[#bc13fe]" />
            {t('about_btn_top')}
          </button>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-2xl p-4 md:p-6 flex justify-center items-start md:items-center py-6 md:py-12"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="bg-[#0b0c10] border border-white/10 rounded-[24px] md:rounded-[36px] max-w-4xl w-full overflow-hidden shadow-2xl relative my-auto text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Back Header Bar */}
              <div className="flex md:hidden items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0e0e11]/90 backdrop-blur-md sticky top-0 z-30">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 text-xs font-bold font-mono text-gray-300 hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  {loc.backLab}
                </button>
                <span className="text-[10px] text-cyber-blue font-mono font-bold uppercase tracking-widest bg-cyber-blue/10 px-2 py-1 rounded">PROJET</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Image Section */}
                <div className="col-span-1 md:col-span-5 h-60 md:h-auto min-h-[250px] relative overflow-hidden">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/30 to-transparent"></div>
                  
                  {/* Floating badge */}
                  <span className="absolute top-4 left-4 bg-cyber-violet text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border border-cyber-violet/40 backdrop-blur-md z-10">
                    {selectedProject.category} · {selectedProject.year}
                  </span>
                </div>
                
                {/* Content Section */}
                <div className="col-span-1 md:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between relative text-left">
                  {/* Close button for desktop */}
                  <button 
                    onClick={() => setSelectedProject(null)} 
                    className="hidden md:flex absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                    title={loc.close}
                  >
                    <X size={18} />
                  </button>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-cyber-blue font-mono text-[9px] font-bold uppercase tracking-[0.3em]">{selectedProject.category}</span>
                      <span className="text-gray-600 font-mono text-[9px]">•</span>
                      <span className="text-gray-400 font-mono text-[9px] font-medium">{selectedProject.year}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter leading-none italic">{selectedProject.title}</h3>
                    <div className="h-0.5 w-12 bg-cyber-blue rounded mb-6"></div>
                    
                    {/* Catchphrase */}
                    <p className="text-gray-300 text-[13px] md:text-sm mb-6 leading-relaxed italic border-l-2 border-cyber-violet pl-4 bg-white/[0.01] py-2 rounded-r-md">
                      "{selectedProject.description}"
                    </p>

                    {/* Detailed Metadata Problem / Solution / Result */}
                    <div className="space-y-4 mb-6 text-xs leading-relaxed">
                      {selectedProject.context && (
                        <div>
                          <h4 className="font-bold text-cyber-blue uppercase font-mono tracking-wider text-[10px] mb-1">
                            {language === 'fr' ? "⚠️ CONTEXTE (Problème résolu)" : "⚠️ CONTEXT (Problem Solved)"}
                          </h4>
                          <p className="text-gray-400 pl-3 border-l border-white/5">{selectedProject.context}</p>
                        </div>
                      )}
                      {selectedProject.solution && (
                        <div>
                          <h4 className="font-bold text-cyber-violet uppercase font-mono tracking-wider text-[10px] mb-1">
                            {language === 'fr' ? "🛠️ SOLUTION CONSTRUITE" : "🛠️ SOLUTION BUILT"}
                          </h4>
                          <p className="text-gray-400 pl-3 border-l border-white/5">{selectedProject.solution}</p>
                        </div>
                      )}
                      {selectedProject.result && (
                        <div>
                          <h4 className="font-bold text-emerald-400 uppercase font-mono tracking-wider text-[10px] mb-1">
                            {language === 'fr' ? "📈 RÉSULTATS & IMPACT MESURABLE" : "📈 RESULTS & MEASURABLE IMPACT"}
                          </h4>
                          <p className="text-emerald-300/90 font-medium pl-3 border-l border-emerald-500/20">{selectedProject.result}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Tech tag clouds */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {selectedProject.tech.map((t: string) => (
                        <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <button 
                      onClick={handleStartSimilarProject}
                      className="flex-1 py-3 px-5 bg-white text-black font-black uppercase tracking-wider text-[11px] rounded-lg hover:bg-cyber-blue hover:text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.25)] transition-all cursor-pointer text-center"
                    >
                      {loc.initiate}
                    </button>
                    
                    <div className="flex gap-2.5">
                      <a 
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:border-white hover:text-cyber-blue transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[11px] font-bold uppercase tracking-wider text-gray-300 hover:bg-white/5"
                        title={loc.demo}
                      >
                        <ExternalLink size={14} />
                        <span>{loc.demo}</span>
                      </a>

                      {selectedProject.github && (
                        <a 
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 border border-white/10 rounded-lg hover:border-white hover:text-cyber-violet transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[11px] font-bold uppercase tracking-wider text-gray-300 hover:bg-white/5"
                          title="GitHub Source"
                        >
                          <Github size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
