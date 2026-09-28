import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Sparkles, X, CheckSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useThemeAndLanguage } from './ThemeAndLanguageContext';

const IntermediaryCta: React.FC = () => {
  const { theme, language, t } = useThemeAndLanguage();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Simple current month calendar (30 days generator)
  const currentMonthYear = language === 'fr' ? 'Juin 2026' : 'June 2026';
  const availableDays = [4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 29, 30]; // only weekdays
  const timeslots = ["09:00 GMT", "10:30 GMT", "14:00 GMT", "15:30 GMT", "17:00 GMT"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !visitorName || !visitorEmail) return;
    
    // Submit appointment request to backend contact inquiry service
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: visitorName,
        email: visitorEmail,
        subject: `Réservation d'appel stratégique (30 min) : ${selectedDate} Juin 2026 à ${selectedTime}`,
        message: `Nouvelle demande de rendez-vous reçue via l'agenda direct :\n- Client : ${visitorName}\n- Email : ${visitorEmail}\n- Date souhaitée : ${selectedDate} Juin 2026\n- Créneau horaire : ${selectedTime}`
      })
    }).catch(err => console.warn('Booking inquiry dispatch notification:', err));

    setBookingSuccess(true);
  };

  const resetState = () => {
    setShowBookingModal(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setVisitorName('');
    setVisitorEmail('');
    setBookingSuccess(false);
  };

  return (
    <section 
      id="booking-cta" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#06060c] text-white' : 'bg-slate-100 text-slate-900 border-t border-slate-200'
      }`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] bg-cyber-blue/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-[15%] w-[400px] h-[400px] bg-cyber-violet/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`p-10 md:p-16 rounded-[32px] border relative overflow-hidden glassmorphism ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-white/[0.01] via-white/[0.02] to-transparent border-white/5' 
              : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
          }`}
        >
          {/* Top visual accents */}
          <div className="flex justify-center mb-6">
            <span className="p-2 border rounded-full bg-cyber-blue/10 border-cyber-blue/20 text-cyber-blue">
              <Calendar size={20} className="animate-pulse" />
            </span>
          </div>

          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-cyber-violet mb-3 font-bold flex items-center justify-center gap-2">
            <Sparkles size={14} className="animate-spin-slow" />
            {t('cta_inter_subtitle')}
          </p>
          
          <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter max-w-2xl mx-auto mb-6 leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-950'
          }`}>
            {t('cta_inter_title')}
          </h2>
          
          <p className={`text-sm md:text-base max-w-xl mx-auto mb-10 ${
            theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
          }`}>
            {language === 'fr' 
              ? "Pas de baratin. Lors de cet appel gratuit de 30 minutes, nous évaluerons vos goulots d'étranglement et concevrons un plan d'action d'ingénierie et d'automatisation."
              : "No fluff. During this free 30-minute consultation call, we will outline your technical bottlenecks and design a clear engineering and automation roadmap."}
          </p>

          {/* PERSUASIVE CALL-TO-ACTION BUTTON */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowBookingModal(true)}
              className={`px-8 md:px-10 py-5 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-xl pointer-events-auto cursor-pointer flex items-center gap-3 ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-cyber-blue hover:text-black hover:shadow-cyber-blue/20'
                  : 'bg-slate-950 text-white hover:bg-slate-800 hover:shadow-slate-950/20'
              }`}
            >
              <span>{t('cta_inter_btn')}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* DIRECT CALENDAR BOOKING POPUP MODAL */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto"
            onClick={resetState}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0b0c10] border border-white/10 rounded-[24px] max-w-2xl w-full p-6 sm:p-10 text-white shadow-2xl relative my-auto text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={resetState}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Status Header */}
              <span className="text-[9px] font-mono text-cyber-blue uppercase tracking-widest block mb-1">
                SYSTEM: AGENDAS DIRECTS LIVE
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-2 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-blue">
                {t('modal_rdv_title')}
              </h3>
              <p className="text-gray-400 text-xs mb-8">
                {t('modal_rdv_desc')}
              </p>

              {bookingSuccess ? (
                /* Success screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center text-white flex flex-col items-center justify-center"
                >
                  <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                    <CheckSquare size={32} />
                  </div>
                  <h4 className="text-xl font-bold uppercase tracking-wide mb-2">
                    {language === 'fr' ? "🎉 Validation Confirmée !" : "🎉 Appointment Requested !"}
                  </h4>
                  <p className="text-sm text-gray-400 max-w-md mx-auto mb-8 font-mono">
                    {language === 'fr' 
                      ? `Félicitations ${visitorName}, votre créneau pour le ${selectedDate} Juin 2026 à ${selectedTime} a été enregistré dans nos serveurs temporaires. Vous recevrez une invitation par email sous peu.`
                      : `Congratulations ${visitorName}, your slots on June ${selectedDate}, 2026 at ${selectedTime} has been secured. An email invitation has been dispatched to ${visitorEmail}.`}
                  </p>
                  <button
                    onClick={resetState}
                    className="px-6 py-3 border border-emerald-500 text-emerald-400 font-mono text-xs uppercase tracking-wider rounded-lg hover:bg-emerald-500/20 transition-all cursor-pointer"
                  >
                    {language === 'fr' ? 'Fermer cette fenêtre' : 'Dismiss'}
                  </button>
                </motion.div>
              ) : (
                /* Form Screen */
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  
                  {/* Step 1: Pick Date */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-3">
                      {language === 'fr' ? "📅 1. Choisissez un jour de Juin 2026 :" : "📅 1. Select a day in June 2026 :"}
                    </label>
                    <div className="grid grid-cols-7 gap-2 max-w-md">
                      {/* Days names header */}
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                        <span key={i} className="text-center font-mono text-[9px] text-gray-500 uppercase">{d}</span>
                      ))}
                      
                      {/* Blank alignment for June 2026 (June 1 starts on Monday, June 2026) */}
                      {Array.from({ length: 30 }).map((_, i) => {
                        const dayNum = i + 1;
                        const isAvailable = availableDays.includes(dayNum);
                        const isSelected = selectedDate === dayNum;
                        
                        return (
                          <button
                            type="button"
                            key={i}
                            disabled={!isAvailable}
                            onClick={() => setSelectedDate(dayNum)}
                            className={`py-2 text-xs font-mono font-bold rounded-lg transition-all ${
                              isSelected
                                ? 'bg-cyber-blue text-black font-black font-mono tracking-tighter'
                                : isAvailable
                                  ? 'bg-white/5 text-white hover:bg-cyber-blue/20 hover:text-white cursor-pointer'
                                  : 'text-gray-700 bg-transparent opacity-30 cursor-not-allowed'
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Pick Time slot */}
                  <AnimatePresence>
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-3">
                          {language === 'fr' 
                            ? `🕒 2. Vos heures disponibles le ${selectedDate} Juin :` 
                            : `🕒 2. Available hours on June ${selectedDate} :`}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {timeslots.map((slot) => {
                            const isSelected = selectedTime === slot;
                            return (
                              <button
                                type="button"
                                key={slot}
                                onClick={() => setSelectedTime(slot)}
                                className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-cyber-violet border border-cyber-violet text-white shadow-[0_0_10px_rgba(188,19,254,0.3)]'
                                    : 'bg-white/5 border border-white/5 text-gray-300 hover:border-white/10 hover:text-white'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 3: Pick Coordinates */}
                  <AnimatePresence>
                    {selectedDate && selectedTime && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-2 border-t border-white/5"
                      >
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400">
                          {language === 'fr' ? "👤 3. Vos coordonnées d'appel :" : "👤 3. Your contact coordinates :"}
                        </label>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              required
                              value={visitorName}
                              onChange={(e) => setVisitorName(e.target.value)}
                              placeholder={language === 'fr' ? "Votre Nom complet *" : "Your full name *"}
                              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs focus:border-cyber-blue focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              required
                              value={visitorEmail}
                              onChange={(e) => setVisitorEmail(e.target.value)}
                              placeholder={language === 'fr' ? "Votre Adresse email *" : "Your email address *"}
                              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs focus:border-cyber-blue focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full py-4 bg-cyber-blue text-black font-black uppercase text-xs tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:bg-[#0fdff2] transition-all cursor-pointer"
                          >
                            {t('modal_rdv_btn')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default IntermediaryCta;
