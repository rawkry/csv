import { Request, Response } from "express";
import DataModel, { IData } from "../model/DataModel";
import csvtojson from "csvtojson";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      file: any;
    }
  }
}
const uploadhandler = async (req: Request, res: Response, next: Function) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const csvData = req.file.buffer.toString("utf8");
    const jsonObj = await csvtojson().fromString(csvData);

    const options: mongoose.InsertManyOptions = {};

    await DataModel.deleteMany({});

    const result = await DataModel.insertMany(jsonObj as IData[], options);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default uploadhandler;
