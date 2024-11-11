import { cart, product } from "../models/index.js";

class CartController {
  static async addToCart(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    try {
      const foundProduct = await product.findById(productId);
      if (!foundProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      if (quantity > foundProduct.stock) {
        return res
          .status(400)
          .json({ error: "Requested quantity exceeds stock" });
      }

      let foundCart = await cart.findOne({ userId });
      if (!foundCart) {
        foundCart = await cart.create({ userId, items: [] });
      }

      const existingItemIndex = foundCart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );
      if (existingItemIndex >= 0) {
        const item = foundCart.items[existingItemIndex];

        if (item.quantity + quantity > foundProduct.stock) {
          return res
            .status(400)
            .json({ error: "Requested quantity exceeds stock" });
        }

        item.quantity += quantity;
      } else {
        foundCart.items.push({
          productId,
          quantity,
          price: foundProduct.price,
        });
      }

      foundCart.totalPrice += foundProduct.price * quantity;

      await foundCart.save();

      return res.status(200).json(foundCart);
    } catch (error) {
      return res.status(500).json({ error: "Ocurred an error on add to cart" });
    }
  }
}

export default CartController;
