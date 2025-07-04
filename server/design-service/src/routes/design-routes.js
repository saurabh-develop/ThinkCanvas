import express from "express";
import {
  getUserDesigns,
  getUserDesignsByID,
  saveDesign,
  deleteDesign,
} from "../controllers/design-controllers.js";
import authenticatedRequest from "../middleware/auth-middleware.js";

const router = express.Router();

router.use(authenticatedRequest);

router.get("/", getUserDesigns);
router.get("/:id", getUserDesignsByID);
router.post("/", saveDesign);
router.delete("/:id", deleteDesign);

export default router;
