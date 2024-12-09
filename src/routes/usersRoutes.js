import express from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/:userId", authMiddleware(), UserController.updateUser);

export default router;
