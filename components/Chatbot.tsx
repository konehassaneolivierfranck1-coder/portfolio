import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, Trash2, ArrowUpRight, MapPin, Globe, Compass, ExternalLink } from 'lucide-react';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';
import Markdown from 'react-markdown';

export interface GroundingSource {
  title: string;
  url: string;
  type: 'web' | 'maps';
}

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  sources?: GroundingSource[];
}

const Chatbot: React.FC = () => {
  const { theme, language, t } = useThemeAndLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen to the custom 'toggle-chatbot' event dispatched by Keyboard shortcuts
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(prev => !prev);
    };
    window.addEventListener('toggle-chatbot', handleToggle);
    return () => window.removeEventListener('toggle-chatbot', handleToggle);
  }, []);

  // Autofocus input when chatbot is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen]);

  // Initialize welcome message based on active language
  useEffect(() => {
    setMessages([
      { 
        id: 1, 
        text: t('bot_welcome'), 
        sender: 'bot' 
      }
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText?.trim() || input.trim();
    if (!textToSend || isTyping) return;

    const userMsg: Message = { id: Date.now(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsTyping(true);

    try {
      // Build updated list of messages to send to server for conversational context
      const updatedMessages = [...messages, userMsg];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Keep only relevant fields to minimize payload
        body: JSON.stringify({ 
          messages: updatedMessages.map(msg => ({ sender: msg.sender, text: msg.text })) 
        }),
      });

      let botResponse = "";
      let sources: GroundingSource[] = [];
      if (response.ok) {
        const data = await response.json();
        botResponse = data.text;
        sources = data.sources || [];
      } else {
        const errorData = await response.json().catch(() => null);
        botResponse = errorData?.text || errorData?.error || (language === 'fr' 
          ? "Bonjour ! Je reste disponible pour vous présenter les projets, compétences et services d'Hassane. Que souhaitez-vous savoir ?" 
          : "Hello! I am here to share Hassane's projects, skills, and services. What would you like to know?");
      }

      if (!botResponse) {
        botResponse = language === 'fr' 
          ? "Bonjour ! Je suis à votre écoute pour vous renseigner sur les réalisations et services d'Hassane." 
          : "Hello! I am ready to answer any questions regarding Hassane's work and digital services.";
      }

      const botMsg: Message = { id: Date.now() + 1, text: botResponse, sender: 'bot', sources };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.warn("Chatbot request fallback activated:", error);
      const fallbackMsg: Message = { 
        id: Date.now() + 1, 
        text: language === 'fr' 
          ? "Bonjour ! Je suis ALICIA, l'assistante IA officielle de Hassane Olivier Franck Koné. Je suis à votre entière disposition pour vous présenter ses réalisations, ses compétences full stack et automatisation IA, ou planifier un échange direct par WhatsApp (+225 07 19 33 38 58) ou email à konehassaneolivierfranck1@gmail.com."
          : "Hello! I am ALICIA, the official AI assistant of Hassane Olivier Franck Koné. I am at your service to present his achievements, full stack & AI automation skills, or connect you directly via WhatsApp (+225 07 19 33 38 58) or email at konehassaneolivierfranck1@gmail.com.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([{ 
      id: Date.now(), 
      text: language === 'fr' 
        ? "Conversation réinitialisée. Comment puis-je vous aider ?" 
        : "Conversation reset. How can I assist you today?", 
      sender: 'bot' 
    }]);
  };

  const suggestedPrompts = [
    { key: 'bot_suggest_projects' },
    { key: 'bot_suggest_location' },
    { key: 'bot_suggest_tech' },
    { key: 'bot_suggest_contact' },
    { key: 'bot_suggest_services' },
    { key: 'bot_suggest_skills' }
  ];

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-[100] bg-cyber-violet hover:bg-[#a60ee5] text-white p-4 rounded-full shadow-lg shadow-cyber-violet/30 hover:shadow-cyber-violet/50 transition-all cursor-pointer border border-[#c432ff]/20 flex items-center justify-center group"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={language === 'fr' ? "Discuter avec ALICIA (Assistante IA)" : "Chat with ALICIA (AI Assistant)"}
        aria-label="ALICIA AI Assistant"
      >
        {isOpen ? <X size={24} /> : (
          <div className="relative">
            <Bot size={24} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-purple-900 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-purple-900"></span>
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-24 left-6 z-[100] w-[90vw] md:w-96 border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] transition-colors duration-500 ${
              theme === 'dark' 
                ? 'bg-[#121212] border-white/10' 
                : 'bg-white border-slate-200 shadow-slate-300'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyber-violet to-purple-800 p-4 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{t('bot_title')}</h3>
                  <span className="flex items-center gap-1 text-[10px] text-gray-200">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> {t('bot_subtitle')}
                  </span>
                </div>
              </div>
              <button 
                onClick={clearChat}
                className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors cursor-pointer"
                title={language === 'fr' ? "Effacer la conversation" : "Clear conversation"}
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Messages Body */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar ${
              theme === 'dark' ? 'bg-black/50' : 'bg-slate-50'
            }`}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm text-left ${
                    msg.sender === 'user' 
                      ? 'bg-cyber-violet text-white rounded-tr-none' 
                      : theme === 'dark' 
                        ? 'bg-gray-800 text-gray-200 rounded-tl-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                  }`}>
                    <div className="markdown-body text-justify leading-relaxed prose prose-sm max-w-none">
                      <Markdown>{msg.text}</Markdown>
                    </div>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 text-xs">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold tracking-wider text-cyber-blue mb-1.5 opacity-90">
                          <Compass size={12} className="animate-spin-slow text-cyber-violet" />
                          <span>{language === 'fr' ? 'Données & Références Vérifiées :' : 'Grounded Data & References:'}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                                src.type === 'maps'
                                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400'
                                  : 'bg-cyber-blue/10 hover:bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 hover:border-cyber-blue'
                              }`}
                              title={src.title}
                            >
                              {src.type === 'maps' ? (
                                <MapPin size={11} className="shrink-0 text-emerald-400" />
                              ) : (
                                <Globe size={11} className="shrink-0 text-cyber-blue" />
                              )}
                              <span className="truncate max-w-[170px]">{src.title}</span>
                              <ExternalLink size={10} className="shrink-0 opacity-70" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                 <div className="flex justify-start">
                   <div className={`p-3 rounded-2xl rounded-tl-none flex gap-1 ${
                     theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-slate-200 shadow-sm'
                   }`}>
                     <span className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce delay-75"></span>
                     <span className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce delay-150"></span>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested quick questions */}
            <div className={`px-4 py-2 flex flex-wrap gap-2 justify-start border-t ${
              theme === 'dark' ? 'bg-black/30 border-white/5' : 'bg-slate-100/60 border-slate-100'
            }`}>
              {suggestedPrompts.map((p) => (
                <button
                  key={p.key}
                  disabled={isTyping}
                  onClick={() => handleSend(t(p.key))}
                  className={`text-[11px] font-sans px-2.5 py-1.5 rounded-full border text-left flex items-center gap-1 transition-all hover:scale-[1.02] cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/40' 
                      : 'bg-white border-slate-250 text-slate-600 hover:text-[#bc13fe] hover:border-[#bc13fe]/40 shadow-sm'
                  }`}
                >
                  {t(p.key)}
                  <ArrowUpRight size={10} className="opacity-70" />
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className={`p-3 border-t ${
              theme === 'dark' ? 'border-white/10 bg-[#121212]' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex gap-2">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('bot_placeholder')}
                  disabled={isTyping}
                  className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none disabled:opacity-50 ${
                    theme === 'dark'
                      ? 'bg-black/30 border-white/10 text-white focus:border-cyber-violet'
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#bc13fe]'
                  }`}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isTyping}
                  className="p-2 bg-cyber-violet rounded-lg text-white hover:bg-purple-600 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
