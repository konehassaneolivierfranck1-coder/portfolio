import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

/**
 * Higher-order middleware that validates incoming request body against a Zod schema
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Validation Schema for Chatbot requests
 */
export const chatSchema = z.object({
  messages: z.array(
    z.object({
      sender: z.enum(["user", "bot"]),
      text: z.string().min(1, "Le message ne peut pas être vide").max(2000, "Le message dépasse la limite de 2000 caractères"),
    })
  ).min(1, "Au moins un message est requis").max(50, "Historique de conversation trop long"),
});

/**
 * Validation Schema for Contact Form requests
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères").max(100, "Le nom est trop long"),
  email: z.string().email("Adresse email invalide").max(150, "L'email est trop long"),
  subject: z.string().min(2, "Le sujet doit comporter au moins 2 caractères").max(150, "Le sujet est trop long"),
  message: z.string().min(5, "Le message doit comporter au moins 5 caractères").max(5000, "Le message est trop long"),
  honeypot: z.string().optional(),
});
