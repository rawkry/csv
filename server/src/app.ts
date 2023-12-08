import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongodbConfig, token } from "./config";
import routes from "./routes";
import { abort, guard } from "./middlewares";
import mongooseConnect from "./mongoose";

const app: Express = express();

(async () => {
  try {
    app.use(express.json());
    app.use(cors());
    app.use(guard(token));

    app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Hello World");
    });

    app.use("/datamodel", routes);

    await mongooseConnect();
    app.use(abort(true));
  } catch (err) {
    console.error("Error during application startup:", err);
    // Handle the error appropriately, e.g., log it or exit the application
  }
})();

export default app;
