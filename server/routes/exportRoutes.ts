import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);
const router = Router();

const ZIP_FILENAME = "kone-hassane-portfolio-source.zip";
const ZIP_PATH = path.join(process.cwd(), "public", ZIP_FILENAME);

/**
 * Helper to ensure the ZIP archive is generated and up to date
 */
async function generateZipArchive(): Promise<string> {
  const pythonScript = `
import os, zipfile

EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.vite', '.cache', '__pycache__', 'migrated_prompt_history'}
EXCLUDE_EXTS = {'.zip', '.tar', '.gz'}

output_zip = '${ZIP_PATH.replace(/\\/g, "/")}'
os.makedirs(os.path.dirname(output_zip), exist_ok=True)

with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
        for file in files:
            if file == '${ZIP_FILENAME}':
                continue
            ext = os.path.splitext(file)[1]
            if ext in EXCLUDE_EXTS:
                continue
            full_path = os.path.join(root, file)
            arc_name = os.path.relpath(full_path, '.')
            if os.path.basename(file).startswith('.') and file not in ['.env.example', '.gitignore']:
                continue
            zipf.write(full_path, arc_name)
`;

  try {
    await execPromise(`python3 -c "${pythonScript.replace(/"/g, '\\"')}"`, {
      cwd: process.cwd(),
    });
  } catch (err) {
    console.error("[ExportService] Python ZIP generation error:", err);
  }

  return ZIP_PATH;
}

/**
 * GET /api/export/zip
 * Triggers full source code packaging and initiates direct file download
 */
router.get("/zip", async (_req: Request, res: Response): Promise<void> => {
  try {
    // Generate fresh ZIP if not present or older than 5 minutes
    let needsGen = true;
    if (fs.existsSync(ZIP_PATH)) {
      const stats = fs.statSync(ZIP_PATH);
      const ageMinutes = (Date.now() - stats.mtimeMs) / (1000 * 60);
      if (ageMinutes < 5 && stats.size > 10000) {
        needsGen = false;
      }
    }

    if (needsGen) {
      await generateZipArchive();
    }

    if (!fs.existsSync(ZIP_PATH)) {
      res.status(500).json({
        success: false,
        error: "Impossible de générer l'archive ZIP du code source.",
      });
      return;
    }

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${ZIP_FILENAME}"`);
    res.download(ZIP_PATH, ZIP_FILENAME);
  } catch (err: any) {
    console.error("[ExportController] Download failed:", err);
    res.status(500).json({
      success: false,
      error: "Erreur lors du téléchargement du code source.",
    });
  }
});

/**
 * GET /api/export/info
 * Returns metadata about the project export package
 */
router.get("/info", async (_req: Request, res: Response): Promise<void> => {
  try {
    let sizeMb = 0;
    if (fs.existsSync(ZIP_PATH)) {
      sizeMb = Number((fs.statSync(ZIP_PATH).size / (1024 * 1024)).toFixed(2));
    }

    res.status(200).json({
      success: true,
      filename: ZIP_FILENAME,
      downloadUrl: `/api/export/zip`,
      staticUrl: `/${ZIP_FILENAME}`,
      sizeMb,
      description: "Code source complet du Portfolio Hassane Olivier Franck Koné (React, TypeScript, Tailwind, Express, Node.js, Assets, Gemini AI).",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message });
  }
});

export default router;
