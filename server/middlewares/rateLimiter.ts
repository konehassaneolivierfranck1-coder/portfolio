import rateLimit from "express-rate-limit";

/**
 * Standard global rate limiter (prevents aggressive scraping and denial of service)
 * Allows up to 150 requests per minute per IP
 */
export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Trop de requêtes détectées. Veuillez patienter une minute avant de réessayer.",
    code: "RATE_LIMIT_EXCEEDED"
  }
});

/**
 * Specific protection for the Chatbot API (prevents rapid-fire LLM token exhaustion)
 * Allows up to 40 questions per minute per IP
 */
export const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Ralentissez un instant ! ALICIA prépare votre réponse.",
    code: "CHAT_RATE_LIMIT_EXCEEDED"
  }
});

/**
 * Specific protection for the Contact Form (prevents spam bots and inbox flooding)
 * Allows up to 8 submissions per 15 minutes per IP
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Plusieurs messages ont été envoyés récemment. Votre message a bien été pris en compte.",
    code: "CONTACT_RATE_LIMIT_EXCEEDED"
  }
});
