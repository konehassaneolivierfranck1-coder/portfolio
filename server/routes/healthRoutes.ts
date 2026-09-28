import { Router } from "express";
import { handleHealth } from "../controllers/healthController";

const router = Router();

// GET /api/health
router.get("/", handleHealth);

export default router;
