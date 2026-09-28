import { Router } from "express";
import { handleCvRedirect, handleCvMetadata } from "../controllers/cvController";

const router = Router();

// GET /api/cv - Redirects to official Google Drive CV
router.get("/", handleCvRedirect);

// GET /api/cv/info - Metadata about CV
router.get("/info", handleCvMetadata);

export default router;
