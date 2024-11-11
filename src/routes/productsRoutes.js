import express from "express";
import ProductController from "../controllers/productController.js";


const router = express.Router();

router
    .post("/", ProductController.registerProduct)
    .get("/", ProductController.listProduct)
    .get("/:id", ProductController.listProductById);
// patch("/products/:id", ProductController.updateProduct);
// delete("/products/:id", ProductController.deleteProduct)

export default router;