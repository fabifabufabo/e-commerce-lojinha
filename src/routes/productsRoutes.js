import express from "express";
import ProductController from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .post("/", ProductController.registerProduct)
  .get("/", ProductController.listProduct)
  .get("/:id", ProductController.listProductById)
  .patch("/:id", authMiddleware("admin"), ProductController.updateProduct)
  .delete("/:id",authMiddleware("admin") ,ProductController.deleteProduct);

export default router;
