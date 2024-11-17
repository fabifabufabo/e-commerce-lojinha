import { product } from "../models/index.js";

async function validateProducts(productsToValidate) {
  const foundProducts = await Promise.all(
    productsToValidate.map(async ({ productId, quantity }) => {
      if (!productId) {
        throw new Error("Missing productId");
      }
      if (quantity <= 0) {
        throw new Error("Quantity should be greater than zero");
      }

      const foundProduct = await product.findById(productId);

      if (!foundProduct) {
        throw new Error("Can't find some products");
      }

      if (quantity > foundProduct.stock) {
        throw new Error("Some products are out of stock");
      }

      return foundProduct;
    })
  );

  return foundProducts;
}

export default validateProducts;
