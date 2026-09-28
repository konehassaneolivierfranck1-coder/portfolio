import { Router } from "express";
import { handleChat } from "../controllers/chatController";
import { chatLimiter } from "../middlewares/rateLimiter";
import { validateBody, chatSchema } from "../middlewares/validator";

const router = Router();

// POST /api/chat protected by rate limiting and schema validation
router.post("/", chatLimiter, validateBody(chatSchema), handleChat);

export default router;
