import express from "express";
import multer from "multer";
import {
  uploadMedia,
  getAllMediasByUser,
} from "../controllers/upload-controllers.js";
import { generateImageFromAIAndUploadToDB } from "../controllers/ai-image-controller.js";
import authenticatedRequest from "../middleware/auth-middleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: 10 * 1024 * 1024,
}).single("file");

router.post(
  "/upload",
  authenticatedRequest,

  (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file found",
        });
      }

      next();
    });
  },
  uploadMedia
);

router.get("/get", authenticatedRequest, getAllMediasByUser);
router.post(
  "/ai-image-generate",
  authenticatedRequest,
  generateImageFromAIAndUploadToDB
);

export default router;
