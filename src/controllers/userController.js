import { user } from "../models/index.js";

class UserController {
  static async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const { name } = req.body;

      const existingUser = await user.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      existingUser.name = name;
      const updatedUser = await existingUser.save();

      if (!updatedUser) {
        return res.status(400).json({ error: "Failed to update the user" });
      }

      return res.status(200).json(updatedUser.name);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "An error occurred while updating the user.", err });
    }
  }
}

export default UserController;
