import { product } from "../models/index.js";

class ProductController {
  static async registerProduct(req, res, next) {
    try {
      const newProduct = await product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while registering the product.' });
    }
  }
}

export default ProductController;
