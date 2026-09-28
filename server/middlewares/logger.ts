import { Request, Response, NextFunction } from "express";

/**
 * Clean and informative HTTP request logger with latency metrics
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  // Log on response completion
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    // Filter out internal noisy Vite asset requests in dev
    if (originalUrl.startsWith("/@") || originalUrl.startsWith("/node_modules") || originalUrl.includes(".")) {
      return;
    }

    const timestamp = new Date().toISOString();
    const statusColor = status >= 500 ? "\x1b[31m" : status >= 400 ? "\x1b[33m" : status >= 300 ? "\x1b[36m" : "\x1b[32m";
    const reset = "\x1b[0m";

    console.log(`[${timestamp}] ${method} ${originalUrl} ${statusColor}${status}${reset} - ${duration}ms (${ip || "unknown-ip"})`);
  });

  next();
};
