import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CubeFace {
  text: string;
  subtext?: string;
  gradient: string;
}

interface Cube3DProps {
  front: CubeFace;
  back: CubeFace;
  left: CubeFace;
  right: CubeFace;
  top: CubeFace;
  bottom: CubeFace;
  size?: number; // Size in px
}

export const Cube3D: React.FC<Cube3DProps> = ({
  front,
  back,
  left,
  right,
  top,
  bottom,
  size = 140
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const distance = size / 2;

  // React mouse position values to dynamically twist the Cube on mouse-over
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse movement to dynamic 3D rotational offsets
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [35, -35]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);

  // Handle subtle offset of dynamic glow shadow
  const shadowX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const shadowY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const getPrimaryHexColor = () => {
    const gradStr = front.gradient.toLowerCase();
    if (gradStr.includes('blue') || gradStr.includes('cyan')) return '#00f3ff';     // Cyber Blue
    if (gradStr.includes('violet') || gradStr.includes('purple') || gradStr.includes('fuchsia')) return '#bc13fe'; // Cyber Violet
    return '#f59e0b'; // Amber / Gold
  };

  const hexColor = getPrimaryHexColor();

  const faceStyle = (transformString: string) => ({
    width: `${size}px`,
    height: `${size}px`,
    transform: transformString,
    position: 'absolute' as const,
    backfaceVisibility: 'hidden' as const,
    transformStyle: 'preserve-3d' as const,
  });

  return (
    <div 
      className="flex flex-col items-center justify-center relative cursor-pointer pt-6"
      style={{ width: `${size + 110}px`, height: `${size + 110}px`, perspective: '1200px' }}
    >
      {/* Dynamic Ambient Background Glow Shadow */}
      <motion.div 
        className="absolute rounded-full pointer-events-none blur-3xl opacity-40 transition-opacity duration-300"
        style={{
          width: `${size + 40}px`,
          height: `${size + 40}px`,
          backgroundColor: hexColor,
          x: shadowX,
          y: shadowY,
          filter: 'blur(60px)',
          opacity: isHovered ? 0.55 : 0.25,
        }}
      />

      {/* Holographic Pedestal Platform underneath the floating Cube */}
      <div 
        className="absolute pointer-events-none select-none"
        style={{
          width: `${size + 80}px`,
          height: `${size + 80}px`,
          transform: 'rotateX(72deg) translateY(45px)',
          transformStyle: 'preserve-3d',
          bottom: '-12px',
          opacity: isHovered ? 0.95 : 0.5,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Outermost dotted radar projection ring */}
        <div
          className="absolute inset-0 rounded-full border border-dashed animate-spin-cw-slow"
          style={{ borderColor: `${hexColor}33` }}
        />
        
        {/* Inner reverse rotating technical dashed ring */}
        <div
          className="absolute inset-3 rounded-full border border-dotted animate-spin-ccw-slow"
          style={{ borderColor: `${hexColor}1a` }}
        />

        {/* Core spotlight upwards projection bloom anchor */}
        <div 
          className="absolute inset-10 rounded-full blur-xl transition-all duration-300"
          style={{
            background: `radial-gradient(circle, ${hexColor}55 0%, transparent 70%)`,
            transform: isHovered ? 'scale(1.25)' : 'scale(1)',
          }}
        />
        
        {/* Digital alignment lines */}
        <div className="absolute top-1/2 left-1/6 right-1/6 h-[1px] opacity-35" style={{ background: `linear-gradient(95deg, transparent, ${hexColor}, transparent)` }} />
        <div className="absolute left-1/2 top-1/6 bottom-1/6 w-[1px] opacity-35" style={{ background: `linear-gradient(185deg, transparent, ${hexColor}, transparent)` }} />
      </div>

      {/* Rotating and Floating 3D Cube Core */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transformStyle: 'preserve-3d',
          ...(isHovered ? {
            rotateX: rotateX,
            rotateY: rotateY,
          } : {}),
        }}
        className={`relative z-10 transition-all duration-500 ${!isHovered ? 'animate-cube-idle' : ''}`}
      >
        
        {/* INNER FUSION LIGHT CORE (Visible through semi-transparent glass faces) */}
        <div 
          className="absolute rounded-full pointer-events-none transition-transform duration-500"
          style={{
            width: `${size * 0.42}px`,
            height: `${size * 0.42}px`,
            background: `radial-gradient(circle, #ffffff 0%, ${hexColor}dd 40%, transparent 80%)`,
            transform: isHovered 
              ? 'translate3d(0, 0, 0) scale(1.15) translateZ(0)' 
              : 'translate3d(0, 0, 0) scale(0.95) translateZ(0)',
            opacity: isHovered ? 0.9 : 0.65,
            left: `calc(50% - ${size * 0.21}px)`,
            top: `calc(50% - ${size * 0.21}px)`,
            filter: 'blur(8px)',
            mixBlendMode: 'plus-lighter',
          }}
        />

        {/* 1. FRONT FACE */}
        <div 
          className="group flex flex-col items-center justify-center p-3 rounded-2xl border bg-black/85 backdrop-blur-md text-white text-center shadow-[inset_0_0_25px_rgba(255,255,255,0.06)] overflow-hidden"
          style={{
            ...faceStyle(`rotateY(0deg) translateZ(${distance}px)`),
            borderColor: `${hexColor}66`,
          }}
        >
          {/* Futuristic Corner Anchors */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l opacity-80" style={{ borderColor: hexColor }} />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r opacity-80" style={{ borderColor: hexColor }} />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l opacity-80" style={{ borderColor: hexColor }} />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r opacity-80" style={{ borderColor: hexColor }} />

          {/* Glowing gradient back-disk */}
          <div className="absolute inset-2 rounded-full opacity-[0.08] blur-xl" style={{ backgroundColor: hexColor }} />

          {/* Heading Text */}
          <span className="text-sm font-black font-mono tracking-[0.18em] uppercase mb-1.5 drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)] select-none">
            {front.text}
          </span>
          {front.subtext && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider relative px-2.5 py-0.5 bg-white/5 rounded border border-white/5">
              <span className="relative z-10 opacity-80">{front.subtext}</span>
            </span>
          )}
        </div>

        {/* 2. BACK FACE */}
        <div 
          className="group flex flex-col items-center justify-center p-3 rounded-2xl border bg-black/85 backdrop-blur-md text-white text-center shadow-[inset_0_0_25px_rgba(255,255,255,0.05)] overflow-hidden"
          style={{
            ...faceStyle(`rotateY(180deg) translateZ(${distance}px)`),
            borderColor: `${hexColor}2b`,
          }}
        >
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l opacity-40" style={{ borderColor: hexColor }} />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r opacity-40" style={{ borderColor: hexColor }} />

          <span className="text-sm font-black font-mono tracking-widest mb-1.5" style={{ color: hexColor }}>
            {back.text}
          </span>
          {back.subtext && <span className="text-[9px] text-gray-400 font-mono font-medium uppercase tracking-wider">{back.subtext}</span>}
        </div>

        {/* 3. LEFT FACE */}
        <div 
          className="group flex flex-col items-center justify-center p-3 rounded-2xl border bg-black/85 backdrop-blur-md text-white text-center shadow-[inset_0_0_25px_rgba(255,255,255,0.05)] overflow-hidden"
          style={{
            ...faceStyle(`rotateY(-90deg) translateZ(${distance}px)`),
            borderColor: `${hexColor}2b`,
          }}
        >
          <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r opacity-40" style={{ borderColor: hexColor }} />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l opacity-40" style={{ borderColor: hexColor }} />

          <span className="text-sm font-black font-mono tracking-widest mb-1.5 text-white/90">
            {left.text}
          </span>
          {left.subtext && <span className="text-[9px] text-gray-400 font-mono font-medium uppercase tracking-wider">{left.subtext}</span>}
        </div>

        {/* 4. RIGHT FACE */}
        <div 
          className="group flex flex-col items-center justify-center p-3 rounded-2xl border bg-black/85 backdrop-blur-md text-white text-center shadow-[inset_0_0_25px_rgba(255,255,255,0.05)] overflow-hidden"
          style={{
            ...faceStyle(`rotateY(90deg) translateZ(${distance}px)`),
            borderColor: `${hexColor}2b`,
          }}
        >
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l opacity-40" style={{ borderColor: hexColor }} />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r opacity-40" style={{ borderColor: hexColor }} />

          <span className="text-sm font-black font-mono tracking-widest mb-1.5 text-white/95">
            {right.text}
          </span>
          {right.subtext && <span className="text-[9px] text-gray-400 font-mono font-semibold uppercase tracking-wider">{right.subtext}</span>}
        </div>

        {/* 5. TOP FACE */}
        <div 
          className="group flex flex-col items-center justify-center p-3 rounded-2xl border bg-black/85 backdrop-blur-md text-white text-center shadow-[inset_0_0_25px_rgba(255,255,255,0.05)] overflow-hidden"
          style={{
            ...faceStyle(`rotateX(90deg) translateZ(${distance}px)`),
            borderColor: `${hexColor}2b`,
          }}
        >
          <span className="text-xs font-black font-mono tracking-widest uppercase mb-1" style={{ color: hexColor }}>
            {top.text}
          </span>
          {top.subtext && <span className="text-[9px] text-gray-400 font-mono font-medium uppercase tracking-wider">{top.subtext}</span>}
        </div>

        {/* 6. BOTTOM FACE */}
        <div 
          className="group flex flex-col items-center justify-center p-3 rounded-2xl border bg-black/85 backdrop-blur-md text-white text-center shadow-[inset_0_0_25px_rgba(255,255,255,0.05)] overflow-hidden"
          style={{
            ...faceStyle(`rotateX(-90deg) translateZ(${distance}px)`),
            borderColor: `${hexColor}2b`,
          }}
        >
          <span className="text-xs font-black font-mono tracking-widest uppercase mb-1 text-white/90">
            {bottom.text}
          </span>
          {bottom.subtext && <span className="text-[9px] text-gray-400 font-mono font-medium uppercase tracking-wider">{bottom.subtext}</span>}
        </div>

      </motion.div>
    </div>
  );
};

export default Cube3D;
