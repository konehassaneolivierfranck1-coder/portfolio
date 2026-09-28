import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useThemeAndLanguage } from './components/ThemeAndLanguageContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Faq from './components/Faq';
import Contact from './components/Contact';
import IntermediaryCta from './components/IntermediaryCta';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import Chatbot from './components/Chatbot';
import SectionProgress from './components/SectionProgress';

const MainAppContent: React.FC = () => {
  const { theme } = useThemeAndLanguage();
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' 
        ? 'bg-cyber-black text-white selection:bg-cyber-blue selection:text-black' 
        : 'bg-slate-50 text-slate-900 selection:bg-cyber-blue/30 selection:text-slate-900'
    }`}>
       <SectionProgress />
       <Navbar />
       
       <main>
         <Hero />
         <About />
         <Skills />
         <Services />
         <Projects />
         <Certifications />
         <Testimonials />
         <Blog />
         <Faq />
         <Contact />
         <IntermediaryCta />
       </main>
       
       <Footer />
       
       <FloatingControls />
       <Chatbot />
    </div>
  );
};

const App: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <AppProvider>
      <MainAppContent />

      <AnimatePresence>
        {showPreloader && (
          <Preloader onLoadingComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>
    </AppProvider>
  );
};

export default App;
