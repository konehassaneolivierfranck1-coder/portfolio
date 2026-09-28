import path from "path";
import { createServer as createViteServer } from "vite";
import { createApp } from "./server/app";
import { config } from "./server/config/env";
import express from "express";

async function startServer(): Promise<void> {
  const app = createApp();
  const PORT = config.port;

  // Mount Vite Dev Server in development or serve production static build
  if (!config.isProduction) {
    console.log("[Server] Mounting Vite Development Server in middleware mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    console.log(`[Server] Production mode: Serving static files from ${distPath}`);
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n=============================================================`);
    console.log(`🚀 [Oliteck Studio Backend Architecture Online]`);
    console.log(`🌐 Environment : ${config.nodeEnv.toUpperCase()}`);
    console.log(`📡 URL         : http://localhost:${PORT}`);
    console.log(`🛡️  Security    : Helmet, CORS, RateLimiting, Zod Validation`);
    console.log(`⚡ API Routes  : /api/chat, /api/contact, /api/health, /api/cv`);
    console.log(`=============================================================\n`);
  });

  // Graceful shutdown handling
  const shutdown = (signal: string) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log("HTTP server closed. Exiting process.");
      process.exit(0);
    });

    // Force close if graceful shutdown hangs
    setTimeout(() => {
      console.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 5000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((err) => {
  console.error("FATAL: Failed to bootstrap backend server:", err);
  process.exit(1);
});
