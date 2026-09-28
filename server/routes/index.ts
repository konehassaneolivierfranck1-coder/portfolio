import { Router } from "express";
import chatRoutes from "./chatRoutes";
import contactRoutes from "./contactRoutes";
import healthRoutes from "./healthRoutes";
import cvRoutes from "./cvRoutes";
import exportRoutes from "./exportRoutes";

const router = Router();

// Mount individual domain routers
router.use("/chat", chatRoutes);
router.use("/contact", contactRoutes);
router.use("/health", healthRoutes);
router.use("/cv", cvRoutes);
router.use("/export", exportRoutes);

// Fallback for unmatched API routes
router.use((req, res) => {
  res.status(404).json({
    success: false,
    code: "NOT_FOUND",
    error: `Route API introuvable : ${req.method} ${req.originalUrl}`,
  });
});

export default router;
