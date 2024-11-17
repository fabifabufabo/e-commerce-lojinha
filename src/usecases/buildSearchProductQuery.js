function buildSearchProductQuery(params) {
  const { name, priceMin, priceMax, category } = params;

  let search = {};

  if (name) search.name = { $regex: name, $options: "i" };
  if (priceMin || priceMax) {
    search.price = {};
    if (priceMin) search.price.$gte = priceMin;
    if (priceMax) search.price.$lte = priceMax;
  }
  if (category) search.category = category;

  return search;
}

export default buildSearchProductQuery;
