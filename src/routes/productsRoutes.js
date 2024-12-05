import express from "express";
import ProductController from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .post("/", authMiddleware("admin"), ProductController.registerProduct)
  .get("/", ProductController.listProduct)
  .get("/:id", ProductController.listProductById)
  .patch("/:id" ,ProductController.updateProduct)
  .delete("/:id", ProductController.deleteProduct);

export default router;
