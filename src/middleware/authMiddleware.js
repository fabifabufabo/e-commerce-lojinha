import jwt from "jsonwebtoken";
import environment from "../config/environment.js";
import { user } from "../models/index.js";

const authMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: "No token provided." });

    try {
      const decoded = jwt.verify(token, environment.jwt_secret);
      req.userId = decoded.id;
      req.userRole = decoded.role;

      if (requiredRole && req.userRole !== requiredRole) {
        return res.status(403).json({ message: "Access denied." });
      }

      next();
    } catch (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }
  };
};

export default authMiddleware;
