import { product } from "../models/index.js";

class ProductController {
  static async registerProduct(req, res, next) {
    try {
      const newProduct = await product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while registering the product.' });
    }
  }

  static async listProductById(req, res, next) {
    try {
      const id = req.params.id;
      const foundProduct = await product.findById(id);
      if (!foundProduct) {
        res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(foundProduct);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while registering the product.' });
    }
  }

}

export default ProductController;
