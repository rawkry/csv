import mongoose from "mongoose";
import { mongodbConfig } from "./config";

const mongooseConnect = async () =>
  await mongoose.connect(`${mongodbConfig.url}`, mongodbConfig.options);

export default mongooseConnect;
