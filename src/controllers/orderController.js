import { order } from "../models/index.js";
import validateProducts from "../usecases/validateProducts.js";
import processOrder from "../usecases/ProcessOrder.js";
import buildSearchOrderQuery from "../usecases/buildSearchOrderQuery.js";

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

  static async listOrder(req, res, next) {
    try {
      const { userId } = req;

      const search = buildSearchOrderQuery(req.query, userId);

      let { limit = 5, from = 0 } = req.query;
      limit = parseInt(limit);
      from = parseInt(from);

      if (limit > 0 && from >= 0) {
        const paginatedResults = await order
          .find(search)
          .skip(from)
          .limit(limit)
          .exec();

        const totalOrders = await order.countDocuments(search);

        res.status(200).json({ total: totalOrders, data: paginatedResults });
      } else {
        res.status(400).json({ error: "Invalid pagination parameters." });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while searching orders." });
    }
  }
}
export default OrderController;
