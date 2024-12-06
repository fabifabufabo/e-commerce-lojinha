import auth from "./authenticationRoutes.js";
import orders from "./ordersRoutes.js";
import products from "./productsRoutes.js";
import review from "./reviewsRoutes.js";

const routes = (app) => {
  app
    .route("/")
    .get((req, res) => res.status(200).send("Welcome to our lojinha :)"));

  app.use("/products", products);
  app.use("/auth", auth);
  app.use("/orders", orders);
  app.use("/reviews", review);

};

export default routes;
