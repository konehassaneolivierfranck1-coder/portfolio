import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Download } from 'lucide-react';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';

const CV_DRIVE_URL = "https://drive.google.com/file/d/1mrnQTfe9so5dV8GfAGPpNsO78EEl5PM6/view?usp=drivesdk";

const Hero: React.FC = () => {
  const { theme, t, dynamic, language } = useThemeAndLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mouse tracking for parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typewriter Effect using translated hero titles
  useEffect(() => {
    const titles = dynamic.hero_titles;
    // Keep textIndex within bounds if length changes
    const currentIndex = textIndex % titles.length;
    const currentTitle = titles[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText.length === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, dynamic.hero_titles]);

  // Interactive 3D Terrain Wave Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let time = 0;
    let isVisible = true;
    
    // Mouse relative tracking for interactive grid distortions
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMoveGlobal);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw3DGrid = () => {
      if (!ctx || !canvas || !isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Interpolate mouse coordinates smoothly (spring-like physics)
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      time += 0.015;

      const isMobile = window.innerWidth < 768;
      const cols = isMobile ? 14 : 24;
      const rows = isMobile ? 12 : 18;
      const spacingX = canvas.width / (cols - 1) * 1.5;
      const spacingY = 32;
      const centerY = canvas.height * 0.65;
      const centerX = canvas.width / 2;

      // Projection values
      const fov = 350; // Focus distance
      const cameraY = -280; // Elevation

      ctx.lineWidth = 1;

      // Draw horizontal lines (rows)
      for (let r = 0; r < rows; r++) {
        // Calculate dynamic line alpha based on distance (depth fog)
        const depthRatio = r / rows; 

        // Apply futuristic gradient colors relative to depth
        const alpha = Math.max(0, (1 - depthRatio) * (depthRatio > 0.1 ? 0.35 : depthRatio * 3));
        
        ctx.strokeStyle = theme === 'dark' 
          ? `rgba(0, 243, 255, ${alpha * 0.7})` 
          : `rgba(188, 19, 254, ${alpha * 0.5})`;

        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const xPos = (c - cols / 2) * spacingX + currentMouseX * 120;
          const zPos = 80 + r * spacingY;
          
          // Wave height formula with interactive mouse distortion
          const distToCenter = Math.sqrt(Math.pow(c - cols / 2, 2) + Math.pow(r - rows / 2, 2));
          const wave = Math.sin(distToCenter * 0.25 - time * 2) * 22;
          const mouseDistortion = Math.max(0, 1 - distToCenter * 0.06) * Math.sin(time * 3) * currentMouseY * 45;
          const yPos = cameraY + wave + mouseDistortion;

          // Project 3D coordinate to 2D Screen
          const scale = fov / (fov + zPos);
          const screenX = centerX + xPos * scale;
          const screenY = centerY + yPos * scale;

          if (c === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      }

      // Draw longitudinal connecting lines (columns)
      for (let c = 0; c < cols; c++) {
        const cRatio = Math.abs(c - cols / 2) / (cols / 2);
        const colAlpha = Math.max(0, (1 - cRatio) * 0.25);
        
        ctx.strokeStyle = theme === 'dark' 
          ? `rgba(188, 19, 254, ${colAlpha * 0.6})` 
          : `rgba(0, 243, 255, ${colAlpha * 0.4})`;

        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const depthRatio = r / rows;
          const alphaModifier = Math.max(0, (1 - depthRatio) * (depthRatio > 0.1 ? 0.8 : depthRatio * 8));
          
          const xPos = (c - cols / 2) * spacingX + currentMouseX * 120;
          const zPos = 80 + r * spacingY;
          
          const distToCenter = Math.sqrt(Math.pow(c - cols / 2, 2) + Math.pow(r - rows / 2, 2));
          const wave = Math.sin(distToCenter * 0.25 - time * 2) * 22;
          const mouseDistortion = Math.max(0, 1 - distToCenter * 0.06) * Math.sin(time * 3) * currentMouseY * 45;
          const yPos = cameraY + wave + mouseDistortion;

          const scale = fov / (fov + zPos);
          const screenX = centerX + xPos * scale;
          const screenY = centerY + yPos * scale;

          if (r === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      }

      // Add neat holographic dust particles resting on the waves
      ctx.fillStyle = theme === 'dark' ? 'rgba(0, 243, 255, 0.6)' : 'rgba(188, 19, 254, 0.5)';
      const dustCount = isMobile ? 15 : 35;
      for (let i = 0; i < dustCount; i++) {
        const seed = i * 17.53;
        const colIndex = Math.floor(Math.abs(Math.sin(seed)) * cols) % cols;
        const rowIndex = Math.floor(Math.abs(Math.cos(seed)) * rows) % rows;
        
        const xPos = (colIndex - cols / 2) * spacingX + currentMouseX * 120;
        const zPos = 80 + rowIndex * spacingY;
        const distToCenter = Math.sqrt(Math.pow(colIndex - cols / 2, 2) + Math.pow(rowIndex - rows / 2, 2));
        const wave = Math.sin(distToCenter * 0.25 - time * 2) * 22;
        const yPos = cameraY + wave + Math.cos(time + seed) * 10;

        const scale = fov / (fov + zPos);
        const screenX = centerX + xPos * scale;
        const screenY = centerY + yPos * scale;
        const size = Math.max(0.5, scale * 3.5);

        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isVisible) {
        animationFrameId = requestAnimationFrame(draw3DGrid);
      }
    };

    // Low CPU Pause Observer: completely halts draw cycles when scrolled away limit
    const observer = new IntersectionObserver(
      ([entry]) => {
        const prevVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !prevVisible) {
          draw3DGrid();
        }
      },
      { threshold: 0.05 }
    );

    const section = document.getElementById('home');
    if (section) observer.observe(section);

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw3DGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  // Photo de profil officielle haute résolution locale
  const profileImageUrl = "/profile_circ_clean.png";

  const bannerTechnologies = [
    "React", "Next.js", "Node.js", "Flutter", "Python", "TypeScript", "PostgreSQL", 
    "MongoDB", "Docker", "Firebase", "AWS", "n8n", "OpenAI API", "LangChain", 
    "Tailwind CSS", "GraphQL", "Redis", "Supabase", "Figma", "GitHub Actions"
  ];

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-32 pb-16 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-cyber-black' : 'bg-slate-50'
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />
      
      {/* Content Container */}
      <div className="z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-auto">
        {/* Left: Text */}
        <div className="order-2 md:order-1 text-center md:text-left flex flex-col justify-center">
          
          {/* Badge de disponibilité */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="self-center md:self-start mb-6"
          >
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider border shadow-sm ${
              theme === 'dark' 
                ? 'bg-cyber-blue/5 border-cyber-blue/30 text-cyber-blue shadow-cyber-blue/5' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t('hero_badge')}
            </span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-mono mb-2 text-md font-bold ${
              theme === 'dark' ? 'text-cyber-blue/80' : 'text-[#bc13fe]'
            }`}
          >
            {t('hero_greeting')}
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-clip-text text-transparent leading-none uppercase tracking-tighter ${
              theme === 'dark' ? 'bg-gradient-to-r from-white via-gray-100 to-gray-500' : 'bg-gradient-to-r from-slate-950 to-slate-700'
            }`}
          >
            Hassane Olivier <br className="hidden md:block" /> Franck <span className="text-cyber-violet">Kone</span>
          </motion.h1>

          {/* Subtitle animated typewriter */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="h-12 flex items-center justify-center md:justify-start"
          >
            <span className={`text-xl md:text-2xl font-mono font-bold tracking-tight ${
              theme === 'dark' ? 'text-cyber-blue' : 'text-slate-800'
            }`}>
              {displayText}
              <span className="animate-pulse ml-0.5">|</span>
            </span>
          </motion.div>

          {/* Main catchphrase and secondary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 max-w-lg mt-4 mx-auto md:mx-0"
          >
            <p className={`text-base md:text-lg leading-relaxed font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              "{t('hero_desc')}"
            </p>
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              {t('hero_secondary')}
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-stretch sm:items-center"
          >
             {/* Bouton Simple et Élégant en Violet — Télécharger mon CV */}
             <motion.a 
               href="/cv-kone-hassane-olivier-franck.pdf"
               download="CV-Kone-Hassane-Olivier-Franck.pdf"
               whileHover={{ scale: 1.04, y: -2 }}
               whileTap={{ scale: 0.98 }}
               className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 border border-purple-400/30"
               title={language === 'fr' ? "Télécharger mon CV (PDF direct)" : "Download my CV (Direct PDF)"}
             >
                <Download size={16} className="text-white" />
                <span>{t('hero_cta_cv')}</span>
             </motion.a>

             {/* Bouton Démarrer un projet ensemble */}
             <button 
               onClick={() => scrollToSection('contact')}
               className={`px-8 py-4 bg-transparent border rounded-full transition-all duration-300 font-bold uppercase tracking-wider text-xs cursor-pointer ${
                 theme === 'dark' 
                   ? 'border-white/15 text-white hover:border-cyber-violet hover:text-cyber-violet hover:shadow-[0_0_20px_rgba(188,19,254,0.1)]' 
                   : 'border-slate-300 text-slate-700 hover:border-[#bc13fe] hover:text-[#bc13fe]'
               }`}
             >
                {t('hero_cta_contact')}
             </button>
          </motion.div>

          {/* Quick Credibility Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={`mt-10 pt-6 border-t font-mono text-xs tracking-wide flex justify-center md:justify-start ${
              theme === 'dark' ? 'border-white/5 text-gray-500' : 'border-slate-200 text-slate-500'
            }`}
          >
            {t('hero_credibility')}
          </motion.div>
        </div>

        {/* Right: Photo/Visual with 3D Parallax */}
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96" style={{ transform: "translateZ(50px)" }}>
            <div className="absolute inset-0 bg-cyber-violet/20 rounded-full blur-3xl animate-pulse"></div>
            
            <motion.div 
              className={`relative w-full h-full rounded-full border-2 overflow-hidden backdrop-blur-sm flex items-center justify-center ${
                theme === 'dark' ? 'border-cyber-blue/30 bg-white/5' : 'border-[#bc13fe]/30 bg-slate-300/10'
              }`}
              whileHover={{ scale: 1.05 }}
            >
               {/* Skeleton / Initial State */}
               {!imageLoaded && !imageError && (
                 <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
                    <span className="text-cyber-blue/30 font-mono text-xl">LOADING...</span>
                 </div>
               )}

               {/* Fallback IF image fails to load */}
               {imageError ? (
                  <div className="w-full h-full bg-gradient-to-br from-cyber-blue to-cyber-violet flex items-center justify-center">
                    <span className="text-white text-7xl md:text-9xl font-black italic select-none">HK</span>
                  </div>
               ) : (
                  <img 
                    src={profileImageUrl} 
                    alt="Hassane Olivier Franck Kone" 
                    className={`w-full h-full object-contain p-2 md:p-3 opacity-95 hover:opacity-100 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    referrerPolicy="no-referrer"
                  />
               )}
            </motion.div>

            {/* Spinning Rings */}
            <div className={`absolute top-0 left-0 w-full h-full animate-spin-slow border border-dashed rounded-full pointer-events-none ${
              theme === 'dark' ? 'border-cyber-blue/20' : 'border-[#bc13fe]/20'
            }`}></div>
            <div className={`absolute -inset-4 animate-reverse-spin border border-dotted rounded-full pointer-events-none ${
              theme === 'dark' ? 'border-cyber-violet/20' : 'border-cyber-blue/20'
            }`}></div>
          </div>
        </motion.div>
      </div>

      {/* SECTION 2 — BANDEAU TECHNOLOGIES (défilant) */}
      <div className={`z-10 w-full border-t border-b mt-12 py-6 relative overflow-hidden ${
        theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-white border-slate-200'
      }`}>
        <p className={`text-center text-xs font-mono font-bold uppercase tracking-[0.3em] mb-4 ${
          theme === 'dark' ? 'text-cyber-blue' : 'text-[#bc13fe]'
        }`}>
          {t('tech_marquee_title')}
        </p>
        
        <div className="flex overflow-hidden select-none">
          <div className="flex gap-16 md:gap-24 animate-marquee whitespace-nowrap py-1">
            {/* Repeat list twice to ensure seamless looping */}
            {[...bannerTechnologies, ...bannerTechnologies].map((tech, i) => (
              <span 
                key={i} 
                className={`text-sm md:text-base font-mono font-bold tracking-widest uppercase flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-blue inline-block"></span>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
