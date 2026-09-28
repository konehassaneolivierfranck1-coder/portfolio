import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { config } from "../config/env";

export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode = 500, code = "INTERNAL_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Standardized global error handling middleware
 * Hides raw stack traces in production to prevent information disclosure
 */
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Handle Zod Schema Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.issues.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }));

    res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      error: "Données de formulaire invalides.",
      details: formattedErrors
    });
    return;
  }

  // Handle Custom Known Application Errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      code: err.code,
      error: err.message
    });
    return;
  }

  // Generic Unhandled Exception
  console.error("Unhandled Backend Exception:", err);
  const status = typeof err?.status === 'number' ? err.status : 500;
  const message = config.isProduction 
    ? "Une erreur inattendue est survenue sur le serveur."
    : (err?.message || "Internal server error");

  res.status(status).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    error: message,
    ...(config.isProduction ? {} : { stack: err?.stack })
  });
};
