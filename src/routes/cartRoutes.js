import express from "express";
import CartController from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, CartController.addToCart);

export default router;
