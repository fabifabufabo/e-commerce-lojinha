import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: { type: Number },
        price: { type: Number },
        totalProduct: { type: Number },
      },
    ],
    totalOrder: { type: Number },
  },
  { versionKey: false, timestamps: true }
);

const order = mongoose.model("order", orderSchema);

export default order;
