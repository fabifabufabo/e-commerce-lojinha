import express from "express";
import routes from "./routes/index.js";
import MongoDB from "./config/mongoDB.js";
import cors from 'cors';
import jwt from "jsonwebtoken"

const app = express();

app.use(cors());

app.use(express.json());

routes(app);

MongoDB.init();

export default app;
