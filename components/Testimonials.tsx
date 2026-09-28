import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import { Quote, Play, Pause, ChevronUp } from 'lucide-react';

// Audio Wave Animation Component
const AudioWave = ({ isPlaying }: { isPlaying: boolean }) => (
  <div className="flex items-end gap-[2px] h-4 mb-1">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[3px] bg-cyber-blue rounded-t-sm"
        animate={isPlaying ? {
          height: [4, 12, 6, 16, 8],
        } : {
          height: 4
        }}
        transition={{
          duration: 0.8,
          repeat: isPlaying ? Infinity : 0,
          repeatType: "reverse",
          delay: i * 0.1,
        }}
      />
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  const { theme, language, dynamic, t } = useThemeAndLanguage();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progresses, setProgresses] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playingId) {
      timer = setInterval(() => {
        setProgresses(prev => {
          const currentProgress = prev[playingId] || 0;
          if (currentProgress >= 100) {
            setPlayingId(null); // Arrêter quand c'est fini
            return { ...prev, [playingId]: 0 };
          }
          return { ...prev, [playingId]: currentProgress + 1.2 };
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [playingId]);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const translatedTestimonials = dynamic.testimonials.map(dt => {
    const original = TESTIMONIALS.find(t => t.id === dt.id);
    return {
      ...dt,
      name: dt.name || original?.name || '',
      image: original?.image || '',
      role: original?.role || '',
    };
  });

  return (
    <section 
      id="testimonials" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* Decorative blurry blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-violet/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyber-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
            {language === 'fr' ? (
              <>Témoignages <span className="text-cyber-violet">Clients</span></>
            ) : (
              <>Client <span className="text-cyber-violet">Testimonials</span></>
            )}
          </h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">{t('testimonials_desc')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {translatedTestimonials.map((testimonial, index) => {
            const isPlaying = playingId === testimonial.id;
            const progress = progresses[testimonial.id] || 0;

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5, boxShadow: theme === 'dark' ? '0 10px 30px -10px rgba(188, 19, 254, 0.1)' : '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                className={`border p-8 rounded-2xl relative group transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#0f1014] border-white/5'
                    : 'bg-white border-slate-200/90 shadow-md shadow-slate-100'
                }`}
              >
                {/* Top Border Gradient Line */}
                <div role="presentation" className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-cyber-violet/50 transition-all duration-500"></div>

                {/* Large Quote Icon Watermark */}
                <Quote className={`absolute top-6 right-6 w-20 h-20 rotate-180 transition-transform group-hover:rotate-12 duration-500 ${
                  theme === 'dark' ? 'text-white/5' : 'text-slate-200/40'
                }`} />
                
                <div className="flex items-start gap-4 mb-6 relative z-10 text-left">
                  <div className="relative border-none">
                     <div className="absolute inset-0 bg-cyber-violet rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                     <img 
                       src={testimonial.image} 
                       alt={testimonial.name} 
                       className="w-16 h-16 rounded-full border-2 border-white/10 group-hover:border-cyber-violet transition-colors object-cover relative z-10" 
                     />
                  </div>
                   
                   <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-bold text-lg group-hover:text-cyber-violet transition-colors ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>{testimonial.name}</h4>
                          <p className="text-gray-500 text-xs uppercase tracking-wider font-mono mb-1">{testimonial.role}</p>
                        </div>
                        {/* Audio Wave Visualizer simulating voice */}
                        <AudioWave isPlaying={isPlaying} />
                      </div>
                   </div>
                </div>
                
                <div className="relative z-10 text-left">
                  <p className={`italic leading-relaxed text-md ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    "{testimonial.text}"
                  </p>
                  
                  {/* Simulated Audio Player Line */}
                  <div className="mt-6 flex items-center gap-3">
                     <button 
                       onClick={() => togglePlay(testimonial.id)}
                       className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                         theme === 'dark' 
                           ? 'bg-white/5 text-white hover:bg-cyber-blue/20 hover:text-cyber-blue' 
                           : 'bg-slate-100 text-slate-700 hover:bg-cyber-violet/20 hover:text-cyber-violet'
                       }`}
                     >
                        {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current ml-0.5" />}
                     </button>
                     <div className={`flex-1 h-1 rounded-full overflow-hidden ${
                       theme === 'dark' ? 'bg-white/5' : 'bg-slate-200'
                     }`}>
                        <motion.div 
                          className="h-full bg-cyber-blue"
                          style={{ width: `${progress}%` }}
                          transition={{ type: "tween", ease: "linear" }}
                        />
                     </div>
                     <span className="text-[10px] text-gray-500 font-mono">
                       {isPlaying ? `0:${Math.floor((progress/100) * 24).toString().padStart(2, '0')}` : "0:24"}
                     </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Inline Back To Top */}
        <div className="flex justify-center mt-16">
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
    </section>
  );
};

export default Testimonials;
