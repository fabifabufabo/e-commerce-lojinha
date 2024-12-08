import { product } from "../models/index.js";
import buildSearchProductQuery from "../usecases/buildSearchProductQuery.js";

class ProductController {
  static async registerProduct(req, res, next) {
    try {
      const newProduct = await product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while registering the product." });
    }
  }

  static async listProductById(req, res, next) {
    try {
      const id = req.params.id;
      const foundProduct = await product.findById(id);
      if (!foundProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(foundProduct);
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while searching the product." });
    }
  }

  static async listProduct(req, res, next) {
    try {
      const search = buildSearchProductQuery(req.query);

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
        res
          .status(400)
          .json({ error: "Bad Request: Invalid pagination parameters." });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while searching products." });
    }
  }
  

  static async updateProduct(req, res, next) {
    try {
        const id = req.params.id;

        const existingProduct = await product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const updatedProduct = await product.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedProduct) {
            return res.status(400).json({ error: 'Failed to update the product' });
        }

        return res.status(200).json(updatedProduct);

    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while updating the product.' });
    }
  }

  static async deleteProduct(req, res, next) {
    try {
        const id = req.params.id;
        const deletedProduct = await product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(204).end();
  
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while deleting the product.' });
    }
  }
}

export default ProductController;
