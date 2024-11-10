import { product } from "../models/index.js";
import buildSearchQuery from "../usecases/buildSearchQuery.js";


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
      res.status(500).json({ error: 'An error occurred while searching the product.' });
    }
  }

  static async listProduct(req, res, next) {
    try {
      const search = buildSearchQuery(req.query);

      let { limit = 5, from = 0 } = req.query;
      limit = parseInt(limit);
      from = parseInt(from);

      if (limit > 0 && from >= 0) {
        const paginatedResults = await product
          .find(search)
          .skip(from)
          .limit(limit)
          .exec();

        const totalProducts = await product.countDocuments(search);

        res.status(200).json({ total: totalProducts, data: paginatedResults });
      } else {
        res.status(400).json({ error: 'Bad Request: Invalid pagination parameters.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while searching products.' });
    }
  }

}

export default ProductController;
