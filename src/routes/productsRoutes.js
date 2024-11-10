import express from "express";
import ProductController from "../controllers/productController.js";


const routes = express.Router();

routes.post("/products", ProductController.registerProduct);
routes.get("/products", ProductController.listProduct);
routes.get("/products/:id", ProductController.listProductById);
// routes.patch("/products/:id", ProductController.updateProduct);
// routes.delete("/products/:id", ProductController.deleteProduct)

export default routes;