import products from "./productsRoutes.js";
import auth from "./authenticationRoutes.js";

const routes = (app) => {
  app
    .route("/")
    .get((req, res) => res.status(200).send("Welcome to our lojinha :)"));

  app.use("/products", products);
  app.use("/auth", auth);
};

export default routes;
