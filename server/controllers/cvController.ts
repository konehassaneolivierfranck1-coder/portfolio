import { Request, Response } from "express";
import { config } from "../config/env";

export const handleCvRedirect = (req: Request, res: Response): void => {
  const ip = req.ip || req.headers["x-forwarded-for"]?.toString();
  const userAgent = req.headers["user-agent"];
  
  console.log(`[CV Audit] CV download requested from IP ${ip || "unknown"} (User-Agent: ${userAgent || "unknown"})`);
  
  // 302 Found redirect directly to Google Drive official CV
  res.redirect(302, config.officialCvUrl);
};

export const handleCvMetadata = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    cvUrl: config.officialCvUrl,
    author: "Hassane Olivier Franck Koné",
    degree: "Licence Mathématiques & Informatique (UAO)",
    updatedAt: "2026-09",
  });
};
