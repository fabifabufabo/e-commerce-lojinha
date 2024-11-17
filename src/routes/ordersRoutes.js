import express from "express";
import OrderController from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware(), OrderController.registerOrder);

export default router;
