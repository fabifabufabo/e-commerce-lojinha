async function processOrder(productsToProcess, foundProducts) {
  let totalOrder = 0;

  const products = await Promise.all(
    productsToProcess.map(async (productToProcess) => {
      const productToUpdate = foundProducts.find(
        (foundProduct) => foundProduct.id === productToProcess.productId
      );

      if (!productToUpdate) {
        throw new Error("An error occurred while processing products");
      }

      productToUpdate.stock -= productToProcess.quantity;
      await productToUpdate.save();

      productToProcess.price = productToUpdate.price;
      productToProcess.totalProduct =
        productToProcess.price * productToProcess.quantity;
      totalOrder += productToProcess.totalProduct;

      return productToProcess;
    })
  );
  return { products, totalOrder };
}

export default processOrder;
