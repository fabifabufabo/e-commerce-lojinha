import express from "express";
import routes from "./routes/index.js";
import MongoDB from "./config/mongoDB.js";

const app = express();

app.use(express.json());

routes(app);

MongoDB.init();

export default app;
