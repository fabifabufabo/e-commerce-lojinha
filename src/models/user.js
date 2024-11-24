import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
  },
  { versionKey: false }
);

const user = mongoose.model("user", userSchema);

export default user;
