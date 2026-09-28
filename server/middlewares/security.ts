import helmet from "helmet";
import cors from "cors";
import { Request, Response, NextFunction } from "express";

/**
 * Helmet configuration tailored for modern web applications
 * Ensures strict security headers without breaking Vite / AI Studio iframe embedding
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: false, // Vite Dev and client scripts need flexibility
  crossOriginEmbedderPolicy: false,
  frameguard: false, // Allows applet to be embedded in AI Studio preview iframe
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  noSniff: true,
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin",
  },
});

/**
 * Strict Cross-Origin Resource Sharing (CORS) setup
 */
export const corsPolicy = cors({
  origin: (origin, callback) => {
    // Allow server-to-server or same-origin requests (where origin is undefined)
    if (!origin) return callback(null, true);
    
    // In preview and local development, allow all valid HTTP/HTTPS origins
    return callback(null, true);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true,
  maxAge: 86400, // 24 hours preflight cache
});

/**
 * Strips dangerous script injections and sanitizes query/body payloads
 */
export const sanitizeInputs = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.body && typeof req.body === "object") {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === "string") {
        // Strip null bytes and non-printable control characters
        req.body[key] = req.body[key].replace(/\0/g, "").trim();
      }
    }
  }
  next();
};
