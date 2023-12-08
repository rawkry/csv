import mongoose, { Schema, Document } from "mongoose";

export interface IData extends Document {
  age: string;
  expenses: number;
  earning: number;
}

const dataSchema = new Schema<IData>({
  age: { type: String, required: true },
  expenses: { type: Number, required: true },
  earning: { type: Number, required: true },
});

const DataModel = mongoose.model<IData>("Data", dataSchema);

export default DataModel;
