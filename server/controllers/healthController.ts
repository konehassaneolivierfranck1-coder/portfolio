import { Request, Response } from "express";
import { config } from "../config/env";
import { contactService } from "../services/contactService";

const startTime = Date.now();

export const handleHealth = (_req: Request, res: Response): void => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    status: "healthy",
    environment: config.nodeEnv,
    uptimeSeconds,
    uptimeHuman: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${uptimeSeconds % 60}s`,
    timestamp: new Date().toISOString(),
    metrics: {
      heapUsedMb: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
      heapTotalMb: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
      rssMb: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
      totalLeadsProcessed: contactService.getLeadsCount(),
    },
    version: "3.5.0",
  });
};
