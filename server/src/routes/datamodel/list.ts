import { Request, Response } from "express";
import DataModel, { IData } from "../../model/DataModel";

module.exports = async (req: Request, res: Response) => {
  try {
    const result = await DataModel.find();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
