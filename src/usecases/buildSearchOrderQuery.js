function buildSearchOrderQuery(params, userId) {
  const { timeOrder } = params;

  let search = {};

  if (userId) search.userId = userId;
  if (timeOrder) {
    search.createdAt = timeOrder == "asc" ? 1 : -1;
  }

  return search;
}

export default buildSearchOrderQuery;
