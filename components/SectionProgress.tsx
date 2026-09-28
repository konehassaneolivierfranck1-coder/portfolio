import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const SectionProgress: React.FC = () => {
  // Top horizontal reading scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[4px] z-[150] pointer-events-none">
      <motion.div 
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-blue origin-left shadow-[0_0_10px_rgba(0,243,255,0.5)]"
      />
    </div>
  );
};

export default SectionProgress;
