import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingControls: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[95] flex flex-col gap-5 items-end pointer-events-none">
      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 30 }}
            onClick={scrollToTop}
            className="pointer-events-auto bg-black/60 backdrop-blur-xl text-white p-4 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-cyber-blue hover:text-black hover:border-cyber-blue transition-all group relative overflow-hidden cursor-pointer"
            title="Haut de page"
          >
            <div className="absolute inset-0 bg-cyber-blue/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
            <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingControls;
