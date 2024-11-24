import { order } from "../models/index.js";
import validateProducts from "../usecases/validateProducts.js";
import processOrder from "../usecases/ProcessOrder.js";

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
      const { userId } = req.query;

      const search = userId ? { userId } : {};

      let { limit = 5, from = 0, timeOrder = "asc" } = req.query;
      limit = parseInt(limit);
      from = parseInt(from);
      const sortOrder = timeOrder == "desc" ? -1 : 1;

      if (limit > 0 && from >= 0) {
        const paginatedResults = await order
          .find(search)
          .sort({ createdAt: sortOrder })
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

  static async listOrderById(req, res, next) {
    try {
      const { userId, userRole } = req;

      const { orderId } = req.params;

      const foundOrder = await order.findOne({ _id: orderId });

      if (!foundOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      const userIdMismatch =
        userId !== foundOrder.userId && userRole !== "admin";

      if (userIdMismatch) {
        return res.status(403).json({ error: "Access denied" });
      }

      res.status(200).json(foundOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
export default OrderController;
