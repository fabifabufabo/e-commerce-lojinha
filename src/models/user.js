import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  { versionKey: false }
);

const user = mongoose.model("user", userSchema);

export default user;
