import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const WORDS = [
  { text: "INNOVATE", translation: "INNOVER", percentage: 0 },
  { text: "DESIGN", translation: "CONCEVOIR", percentage: 18 },
  { text: "ENGINEER", translation: "DÉVELOPPER", percentage: 38 },
  { text: "OPTIMIZE", translation: "OPTIMISER", percentage: 58 },
  { text: "ELEVATE", translation: "ÉLEVER", percentage: 78 },
  { text: "EMPOWER", translation: "TRANSFORMER", percentage: 92 }
];

export const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    
    // Smooth progress counter with realistic slow/fast intervals for suspense
    const interval = setInterval(() => {
      let increment = 1;
      if (currentProgress < 20) {
        increment = Math.random() * 4 + 1.5;
      } else if (currentProgress < 50) {
        increment = Math.random() * 5 + 2;
      } else if (currentProgress < 85) {
        increment = Math.random() * 6 + 1.5;
      } else {
        increment = Math.random() * 3 + 0.8;
      }
      
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      // Determine active word idx based on current percentage range
      const matchingWordIdx = WORDS.reduce((acc, word, idx) => {
        if (currentProgress >= word.percentage) {
          return idx;
        }
        return acc;
      }, 0);
      
      setActiveWordIdx(matchingWordIdx);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Pause briefly at 100% for climax/impact, then initiate gorgeous curtain transition
        setTimeout(() => {
          setIsExiting(true);
          // Allow curtain transition to finish completely before unmounting the component
          setTimeout(onLoadingComplete, 1600);
        }, 850);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  // Cubic-bezier for premier studio feeling
  const easeTransition = [0.85, 0, 0.15, 1];

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none select-none">
      <AnimatePresence>
        {!isExiting && (
          <motion.div 
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-black pointer-events-auto"
          >
            {/* Tech grid mesh overlay */}
            <div 
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Glowing moving light orbs */}
            <motion.div 
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 40, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-cyber-blue/10 rounded-full blur-[100px] pointer-events-none" 
            />
            <motion.div 
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, 20, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/3 w-[320px] h-[320px] bg-cyber-violet/10 rounded-full blur-[125px] pointer-events-none" 
            />

            {/* TOP BAR: Luxury metadata */}
            <div className="flex justify-between items-center w-full z-10 font-mono text-[9px] text-gray-500 tracking-[0.25em] uppercase">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-ping"></span>
                <span>SYSTEM: RESPONSIVE</span>
              </div>
              <div className="hidden sm:block text-gray-400">
                <span>OLITECK STUDIO // CODENAME: GALAXY V3</span>
              </div>
            </div>

            {/* MAIN CENTER STAGE */}
            <div className="relative flex flex-col items-center justify-center flex-1 my-auto z-10">
              
              {/* Subtle tech background circle ring with spin */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] rounded-full border border-white/[0.03] flex items-center justify-center pointer-events-none"
              >
                <div className="absolute w-[98%] h-[98%] rounded-full border border-dashed border-white/[0.02]" />
                <div className="absolute w-3 h-3 bg-cyber-blue/20 rounded-full top-0 left-1/2 -ml-1.5" />
              </motion.div>

              {/* Large, high-end flowing glowing text container */}
              <div className="flex flex-col items-center justify-center text-center py-10 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWordIdx}
                    initial={{ y: 60, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -60, opacity: 0, filter: 'blur(15px)' }}
                    transition={{ duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] }}
                    className="flex flex-col items-center relative"
                  >
                    {/* Big Bold Headline */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 tracking-tight select-none">
                      {WORDS[activeWordIdx].text}
                    </h1>
                    
                    {/* Tiny Elegant subtitle translation */}
                    <span className="mt-4 font-mono text-[10px] sm:text-xs text-cyber-blue uppercase tracking-[0.55em]">
                      {WORDS[activeWordIdx].translation}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dynamic decorative radar crosshair lines */}
              <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none" />
            </div>

            {/* BOTTOM BAR: Premium progressive ticking status layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end w-full z-10 ">
              
              {/* Footer Part 1: Tech specifications */}
              <div className="font-mono text-[9px] text-gray-500 tracking-widest hidden md:block">
                <p>LATENCY: &lt; 0.02MS</p>
                <p className="mt-1">SECURE FRAMEWORK // ACTIVE_THREADS 12</p>
              </div>

              {/* Footer Part 2: Centered loading line and status */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex justify-between w-full text-[9px] font-mono text-gray-400 tracking-widest mb-2 px-1">
                  <span>{localStorage.getItem('language') === 'en' ? 'LOADING SYSTEM...' : 'CHARGEMENT EN COURS...'}</span>
                  <span className="text-cyber-violet font-bold">{Math.floor(progress)}%</span>
                </div>
                
                {/* Micro tech charging loader bar */}
                <div className="w-full h-[3px] bg-white/[0.04] rounded-full overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyber-blue to-cyber-violet"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Footer Part 3: Oversized luxury digital number overlay */}
              <div className="flex justify-end font-mono text-4xl sm:text-5xl md:text-6xl font-black text-white/5 tracking-tighter select-none-all leading-none items-end">
                {Math.floor(progress).toString().padStart(3, '0')}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LUXURY SLIDING MULTI-PANEL VERTICAL SHUTTERS (CURTAIN SHUTTERS STAGGER) */}
      <AnimatePresence>
        {isExiting && (
          <div className="absolute inset-0 flex z-[99999] pointer-events-none">
            {Array.from({ length: 4 }).map((_, idx) => (
              <motion.div
                key={idx}
                className="h-full bg-gradient-to-b from-[#060608] via-[#09090c] to-[#030304] relative border-r border-white/[0.02]"
                style={{
                  width: '25%',
                  transformOrigin: 'top',
                }}
                initial={{ y: '0%' }}
                animate={{ y: '-101%' }}
                transition={{
                  duration: 1.15,
                  ease: easeTransition,
                  delay: idx * 0.12,
                }}
              >
                {/* Reflective aesthetic glowing top edge */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-blue opacity-85 shadow-[0_-5px_35px_rgba(0,243,255,0.7)]" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Preloader;
