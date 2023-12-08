import dotenv from "dotenv";

dotenv.config();
export const mongodbConfig = JSON.parse(process.env.MONGODB_CONFIG);
export const port = process.env.PORT;
export const token = process.env.TOKEN;
