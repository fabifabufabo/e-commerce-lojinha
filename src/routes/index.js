import express from "express";
import product from "./productsRoutes.js"


const routes = (app) => {
  app
    .route("/")
    .get((req, res) => res.status(200).send("Welcome to our lojinha :)"));

  app.use(express.json(), product);
};

export default routes;
