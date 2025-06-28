import express from "express";
import subscriptionController from "../controllers/subscription-controller.js";
import paymentController from "../controllers/payment-controller.js";

import authenticatedRequest from "../middleware/auth-middleware.js";

const router = express.Router();

router.use(authenticatedRequest);

router.get("/", subscriptionController.getSubscription);
router.post("/create-order", paymentController.createOrder);
router.post("/capture-order", paymentController.capturePayment);

export default router;
