import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const cart = mongoose.model("cart", cartSchema);

export default cart;
