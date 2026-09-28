import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import { ArrowRight, X, Calendar, User, Clock, ChevronUp } from 'lucide-react';

const Blog: React.FC = () => {
  const { theme, language, dynamic, t } = useThemeAndLanguage();
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [imageError, setImageError] = useState(false);
  const profileImageUrl = "/profile_circ_clean.png";

  // Merge dynamic translated posts with original static images & categories
  const translatedPosts = dynamic.blog_posts.map(dp => {
    const original = BLOG_POSTS.find(p => p.id === dp.id);
    return {
      ...dp,
      image: original?.image || '',
      category: original?.category || 'Dev',
      date: original?.date || '2026',
    };
  });

  return (
    <section 
      id="blog" 
      className={`py-24 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-cyber-black text-white' : 'bg-slate-100/60'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-5xl font-black mb-16 text-center uppercase tracking-tighter ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          {language === 'fr' ? (
            <>Derniers <span className="text-cyber-violet">Articles</span></>
          ) : (
            <>Latest <span className="text-cyber-violet">Articles</span></>
          )}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {translatedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden border group transition-all duration-300 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-cyber-dark border-white/10 hover:border-cyber-blue/50 text-white'
                  : 'bg-white border-slate-200 shadow-md hover:border-[#bc13fe] hover:shadow-lg hover:shadow-slate-200/50 text-slate-800'
              }`}
              onClick={() => setSelectedPost(post)}
            >
              <div className="h-48 overflow-hidden relative">
                 <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                 />
                 <span className="absolute top-4 left-4 bg-cyber-violet text-white text-xs font-bold px-2 py-1 rounded">
                    {post.category}
                 </span>
              </div>
              <div className="p-6 text-left">
                 <div className="text-gray-500 text-[11px] mb-2.5 font-mono flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="shrink-0" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="shrink-0" /> {language === 'fr' ? '3 min de lecture' : '3 min read'}</span>
                 </div>
                 <h3 className={`text-xl font-bold mb-3 transition-colors ${
                   theme === 'dark' ? 'text-white group-hover:text-cyber-blue' : 'text-slate-900 group-hover:text-[#bc13fe]'
                 }`}>{post.title}</h3>
                 <p className={`text-sm mb-4 line-clamp-3 ${
                   theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                 }`}>
                    {post.excerpt}
                 </p>
                 <button className={`flex items-center gap-2 font-bold text-sm hover:gap-3 transition-all cursor-pointer ${
                   theme === 'dark' ? 'text-cyber-blue' : 'text-[#bc13fe]'
                 }`}>
                    {t('blog_read_more')} <ArrowRight size={16} />
                 </button>
              </div>
            </motion.div>
          ))}
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

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] overflow-y-auto bg-black/95 backdrop-blur-md p-4 md:p-6 flex justify-center items-start md:items-center py-6 md:py-12"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl max-w-4xl w-full relative my-auto overflow-hidden shadow-2xl text-white text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky mobile back header */}
              <div className="flex md:hidden items-center justify-between px-6 py-4 border-b border-white/5 bg-[#141416]/90 backdrop-blur-sm sticky top-0 z-30">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-2 text-xs font-bold font-mono text-gray-400 hover:text-white uppercase tracking-wider"
                >
                  {language === 'fr' ? '← Retour au Blog' : '← Back to Blog'}
                </button>
                <span className="text-[10px] text-cyber-violet font-mono font-bold uppercase tracking-widest bg-cyber-violet/10 px-2 py-1 rounded">ARTICLE</span>
              </div>

              <div className="relative h-60 sm:h-80 md:h-96">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Desktop Absolute Close */}
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="hidden md:block absolute top-6 right-6 p-2 bg-black/50 border border-white/10 rounded-full text-white hover:bg-cyber-violet transition-colors cursor-pointer animate-pulse"
                  title="Fermer"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
              </div>

              <div className="px-6 sm:px-10 md:px-12 pb-10 sm:pb-12 -mt-10 relative text-left">
                <div className="flex gap-4 text-xs font-mono text-cyber-blue mb-4 flex-wrap">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {selectedPost.date}</span>
                  <span className="flex items-center gap-1"><User size={14}/> {t('blog_author')}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14}/> {t('blog_reading_time')} {selectedPost.id === '1' ? (language === 'fr' ? '4 min' : '4 min') : (language === 'fr' ? '3 min' : '3 min')}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 md:mb-8 leading-tight">{selectedPost.title}</h3>
                
                <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed space-y-6">
                  <p className="font-bold text-white text-base sm:text-x bg-white/5 border-l-2 border-cyber-blue pl-4 py-3 rounded-r-xl pr-2">
                    "{selectedPost.excerpt}"
                  </p>
                  <p>{selectedPost.content}</p>
                  <p>
                    {language === 'fr' ? (
                      `Chez Oliteck Studio, notre mission est de vous accompagner dans chaque étape de votre transformation numérique. Ce n'est que le début d'une longue aventure technologique. Restez connectés pour plus d'astuces et de guides pratiques sur le développement web, mobile et l'IA.`
                    ) : (
                      `At Oliteck Studio, our mission is to accompany you in every step of your digital transformation. This is only the beginning of a long technological adventure. Stay connected for more tips and practical guides on web, mobile, and AI development.`
                    )}
                  </p>
                </div>

                <div className="mt-10 sm:mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    {imageError ? (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-violet flex items-center justify-center font-bold text-white text-xs">
                        HK
                      </div>
                    ) : (
                      <img 
                        src={profileImageUrl} 
                        className="w-12 h-12 rounded-full border border-cyber-blue object-cover" 
                        alt="Hassane" 
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                      />
                    )}
                    <div>
                      <p className="text-white font-bold">Hassane O. F. Kone</p>
                      <p className="text-gray-500 text-sm">
                        {language === 'fr' ? "Fondateur d'Oliteck Studio" : "Founder of Oliteck Studio"}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="w-full sm:w-auto px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-cyber-blue hover:text-black hover:border-cyber-blue transition-all font-bold text-xs uppercase tracking-widest cursor-pointer text-center"
                  >
                    {t('blog_back')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
