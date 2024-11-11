import jwt from "jsonwebtoken";
import environment from "../config/environment.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, environment.jwt_secret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;
