import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight,
  Home, User, Cpu, Briefcase, Grid, GraduationCap, MessageSquare, BookOpen, Mail,
  Sun, Moon
} from 'lucide-react';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';

const LINKS = [
  { translationKey: 'nav_home', id: 'home', icon: Home },
  { translationKey: 'nav_about', id: 'about', icon: User },
  { translationKey: 'nav_skills', id: 'skills', icon: Cpu },
  { translationKey: 'nav_services', id: 'services', icon: Briefcase },
  { translationKey: 'nav_projects', id: 'projects', icon: Grid },
  { translationKey: 'nav_certifications', id: 'certifications', icon: GraduationCap },
  { translationKey: 'nav_testimonials', id: 'testimonials', icon: MessageSquare },
  { translationKey: 'nav_blog', id: 'blog', icon: BookOpen },
  { translationKey: 'nav_contact', id: 'contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const { theme, language, toggleTheme, setLanguage, t } = useThemeAndLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Gestion du scroll pour le style et la détection de section active
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = LINKS.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 120;

      sections.forEach((section) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Hauteur de la navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  // Variantes d'animation pour le menu mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -15,
      scale: 0.95,
      transition: { 
        staggerChildren: 0.03, 
        staggerDirection: -1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: 0.05,
        type: "spring",
        stiffness: 250,
        damping: 24
      }
    }
  };

  const itemVariants = {
    closed: { scale: 0.9, opacity: 0 },
    open: { scale: 1, opacity: 1 }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? theme === 'dark'
            ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 py-3' 
            : 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/80 py-3 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo interactif */}
        <motion.button 
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-50 text-2xl sm:text-3xl font-black font-mono tracking-tighter cursor-pointer"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-violet">PORTFOLIO</span>
          <motion.div 
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyber-blue to-cyber-violet"
          />
        </motion.button>

        {/* Desktop Menu - Style International */}
        <div className={`hidden xl:flex items-center gap-1 border rounded-full px-2 py-1.5 backdrop-blur-md ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100/80 border-slate-300/60'
        }`}>
          {LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 relative rounded-full cursor-pointer ${
                  isActive 
                    ? theme === 'dark' ? 'text-white font-black' : 'text-slate-900 font-extrabold' 
                    : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-active-pill"
                    className={`absolute inset-0 rounded-full z-[-1] ${
                      theme === 'dark' ? 'bg-white/10' : 'bg-slate-300/50'
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {t(link.translationKey)}
              </button>
            );
          })}
        </div>

        {/* Bouton Recruter, Theme Toggle, Language Switcher */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Controls Container */}
          <div className={`flex items-center gap-2 border rounded-full px-2.5 py-1.5 backdrop-blur-sm ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100/80 border-slate-300/60'
          }`}>
            {/* Theme Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={toggleTheme}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                theme === 'dark' ? 'text-amber-400 hover:bg-white/10' : 'text-[#bc13fe] hover:bg-slate-300/50'
              }`}
              title={theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>

            <span className={`w-[1px] h-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-300'}`} />

            {/* Language Buttons */}
            <div className="flex items-center gap-1.5 text-sm">
              <button 
                onClick={() => setLanguage('fr')}
                title="Français"
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  language === 'fr' 
                    ? 'scale-110 filter none opacity-100 bg-white/10 shadow-sm border border-white/5' 
                    : 'opacity-55 hover:opacity-100 filter grayscale-[40%]'
                }`}
              >
                🇫🇷
              </button>
              <button 
                onClick={() => setLanguage('en')}
                title="English"
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  language === 'en' 
                    ? 'scale-110 filter none opacity-100 bg-white/10 shadow-sm border border-white/5' 
                    : 'opacity-55 hover:opacity-100 filter grayscale-[40%]'
                }`}
              >
                🇬🇧
              </button>
            </div>
          </div>

          <motion.button 
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05, boxShadow: theme === 'dark' ? "0 0 25px rgba(0, 243, 255, 0.4)" : "0 4px 15px rgba(188, 19, 254, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-cyber-blue/15 to-cyber-violet/15 border border-cyber-blue/30 text-white hover:border-cyber-blue' 
                : 'bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] text-white'
            }`}
          >
            {t('about_btn_collab')} <ArrowRight size={14} className={theme === 'dark' ? 'text-cyber-blue animate-pulse' : 'text-white animate-pulse'} />
          </motion.button>
        </div>

        {/* Mobile controls & Toggle */}
        <div className="xl:hidden flex items-center gap-2.5 relative z-50">
          {/* Quick theme toggler for mobile */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={toggleTheme}
            className={`w-11 h-11 flex items-center justify-center rounded-full border cursor-pointer ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 text-amber-400' 
                : 'bg-white border-slate-200 text-purple-700 shadow-sm'
            }`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>

          {/* Quick country toggler for mobile */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className={`w-11 h-11 flex items-center justify-center rounded-full border cursor-pointer text-lg ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}
            title={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
          >
            {language === 'fr' ? '🇬🇧' : '🇫🇷'}
          </motion.button>

          <motion.button 
            className={`w-11 h-11 flex items-center justify-center rounded-full border cursor-pointer ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.85 }}
          >
            {isOpen ? <X size={20} className="text-cyber-violet" /> : <Menu size={20} className="text-cyber-blue" />}
          </motion.button>
        </div>
      </div>

      {/* Menu Mobile - Dropdown Flottant Ultra-Optimisé pour petites fenêtres */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 xl:hidden"
            />
            
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed top-20 left-4 right-4 md:top-24 border rounded-2xl z-50 xl:hidden flex flex-col p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-lg mx-auto ${
                theme === 'dark' 
                  ? 'bg-[#0a0a0c]/95 border-white/10' 
                  : 'bg-white/95 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-500/10">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">Navigation Console</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-ping" />
                  <span className="text-[9px] font-mono text-cyber-blue uppercase">{theme === 'dark' ? 'Online' : 'Active'}</span>
                </div>
              </div>

              {/* Grid 2 colonnes pour optimiser l'espace vertical */}
              <div className="grid grid-cols-2 gap-2">
                {LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button 
                      key={link.id} 
                      variants={itemVariants}
                      onClick={() => scrollToSection(link.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyber-blue/10 to-cyber-violet/10 border border-cyber-blue/30 text-cyber-blue shadow-[0_0_15px_rgba(0,243,255,0.05)] font-black' 
                          : theme === 'dark'
                            ? 'bg-white/5 border border-white/5 text-gray-400 hover:text-white'
                            : 'bg-slate-100 border border-slate-200/50 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon size={14} className={isActive ? 'text-cyber-blue' : 'text-gray-400'} />
                      <span>{t(link.translationKey)}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Section Action Basse */}
              <div className="mt-4 pt-3 border-t border-slate-500/10 space-y-2">
                <motion.button 
                  variants={itemVariants}
                  onClick={() => {
                    scrollToSection('contact');
                    setIsOpen(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-violet text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyber-violet/15 hover:shadow-cyber-violet/30 transition-all cursor-pointer"
                >
                  <span>{t('about_btn_collab')}</span>
                  <ArrowRight size={13} />
                </motion.button>
                <p className="text-[8px] text-center text-gray-400 font-mono mt-3">© 2026 Oliteck Studio — Hassane K.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
