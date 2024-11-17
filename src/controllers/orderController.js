import { order } from "../models/index.js";
import validateProducts from "../usecases/validateProducts.js";
import processOrder from "../usecases/ProcessOrder.js";

const orderExample = {
  products: [
    {
      productId: "6730f61791eeecc59aa9b9cc",
      quantity: 50,
    },
  ],
};

class OrderController {
  static async registerOrder(req, res, next) {
    try {
      const { userId } = req;
      const { products } = req.body;

      if (!products) {
        return res.status(400).json({ error: "Missing products" });
      }

      const foundProducts = await validateProducts(products);
      const processedOrder = await processOrder(products, foundProducts);

      const newOrder = await order.create({
        userId,
        ...processedOrder,
      });
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default OrderController;
