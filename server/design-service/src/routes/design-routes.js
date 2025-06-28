import express from "express";
import designController from "../controllers/design-controller.js";
import authenticatedRequest from "../middleware/auth-middleware.js";

const router = express.Router();

router.use(authenticatedRequest);

router.get("/", designController.getUserDesigns);
router.get("/:id", designController.getUserDesignsByID);
router.post("/", designController.saveDesign);
router.delete("/:id", designController.deleteDesign);

export default router;
