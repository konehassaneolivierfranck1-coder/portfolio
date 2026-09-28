import { Request, Response, NextFunction } from "express";
import { aiService } from "../services/aiService";

export const handleChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { messages } = req.body;
    const reply = await aiService.generateChatResponse(messages);
    
    res.status(200).json({
      success: true,
      text: reply.text,
      sources: reply.sources || [],
    });
  } catch (err) {
    next(err);
  }
};
