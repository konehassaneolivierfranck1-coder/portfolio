import express, { Express } from "express";
import { securityHeaders, corsPolicy, sanitizeInputs } from "./middlewares/security";
import { globalLimiter } from "./middlewares/rateLimiter";
import { requestLogger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import apiRoutes from "./routes";

/**
 * Creates and configures the Express application with industry-standard
 * security, logging, rate limiting, and routing architecture.
 */
export function createApp(): Express {
  const app = express();

  // 1. Trust proxy headers (useful behind reverse proxies like Cloud Run / Google Cloud)
  app.set("trust proxy", 1);

  // 2. Security Headers & CORS
  app.use(securityHeaders);
  app.use(corsPolicy);

  // 3. Request Logging with Latency Measurement
  app.use(requestLogger);

  // 4. Global Rate Limiter
  app.use("/api", globalLimiter);

  // 5. Body Parsing with strict payload size limit (defense against buffer overflow/DoS)
  app.use(express.json({ limit: "150kb" }));
  app.use(express.urlencoded({ extended: true, limit: "150kb" }));

  // 6. Input Sanitization
  app.use(sanitizeInputs);

  // 7. API Routes Namespace
  app.use("/api", apiRoutes);

  // 8. Centralized Error Handler for API routes
  app.use("/api", errorHandler);

  return app;
}
