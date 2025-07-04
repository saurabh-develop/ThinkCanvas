import express from "express";
import getSubscription from "../controllers/subscription-controllers.js";
import {
  createOrder,
  capturePayment,
  verifyPayment,
} from "../controllers/payment-controller.js";

import authenticatedRequest from "../middleware/auth-middleware.js";

const router = express.Router();

router.use(authenticatedRequest);

router.get("/", getSubscription);
router.post("/create-order", createOrder);
router.post("/capture-order", capturePayment);

export default router;
