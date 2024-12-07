import express from "express";
import ReviewController from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/reviews", authMiddleware(), ReviewController.createReview);
router.get("/:id/reviews", ReviewController.getReviewsByProduct);

export default router;