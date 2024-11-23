import jwt from "jsonwebtoken";
import environment from "../config/environment.js";

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

      const isAdmin = req.userRole === "admin";
      if (!isAdmin) {
        const isRoleMismatch = requiredRole && requiredRole !== req.userRole;
        const isParamsUserIdMismatch =
          req.params?.userId && req.params.userId !== req.userId;
        const isQueryUserIdMismatch =
          req.query?.userId && req.query.userId !== req.userId;

        if (isRoleMismatch || isParamsUserIdMismatch || isQueryUserIdMismatch) {
          return res.status(403).json({ message: "Access denied." });
        }
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
