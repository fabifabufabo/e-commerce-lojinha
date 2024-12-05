import express from 'express';
import ReviewController from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/products/:id/reviews', authMiddleware, ReviewController.createReview);
router.get('/products/:id/reviews', ReviewController.getReviewsByProduct);

export default router;
