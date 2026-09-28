import { Request, Response, NextFunction } from "express";
import { contactService } from "../services/contactService";

export const handleContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, subject, message, honeypot } = req.body;
    const ip = req.ip || req.headers["x-forwarded-for"]?.toString();
    const userAgent = req.headers["user-agent"];

    const result = await contactService.submitInquiry({
      name,
      email,
      subject,
      message,
      honeypot,
      ip,
      userAgent,
    });

    res.status(201).json({
      success: true,
      message: "Votre message a été transmis avec succès à Hassane Olivier Franck Koné.",
      leadId: result.id,
      timestamp: result.receivedAt,
    });
  } catch (err) {
    next(err);
  }
};
