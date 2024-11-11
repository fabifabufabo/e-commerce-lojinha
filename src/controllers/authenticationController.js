import { user } from "../models/index.js";
import jwt from "jsonwebtoken";
import environment from "../config/environment.js";

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const foundUser = await user.findOne({ email });

      if (foundUser && foundUser.password === password) {
        const token = jwt.sign({ id: foundUser._id }, environment.jwt_secret);
        return res
          .status(200)
          .json({ auth: true, token: token, message: "Login successful" });
      }
      res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
}

export default AuthController;
