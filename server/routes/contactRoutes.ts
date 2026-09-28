import { Router } from "express";
import { handleContact } from "../controllers/contactController";
import { contactLimiter } from "../middlewares/rateLimiter";
import { validateBody, contactSchema } from "../middlewares/validator";

const router = Router();

// POST /api/contact protected by rate limiting, anti-spam, and schema validation
router.post("/", contactLimiter, validateBody(contactSchema), handleContact);

export default router;
