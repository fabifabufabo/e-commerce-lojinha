import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    stock: { type: Number },
    description: { type: String },
    imageUrl: { type: String },
    category: { type: String },
    inStorePickup: { type: Boolean },
    deliveryAvailable: { type: Boolean },
  },
  { versionKey: false }
);

const product = mongoose.model("product", productSchema);

export default product;
