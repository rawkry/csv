"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataModel_1 = __importDefault(require("../model/DataModel"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const uploadhandler = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const csvData = req.file.buffer.toString("utf8");
        const jsonObj = await (0, csvtojson_1.default)().fromString(csvData);
        const options = {};
        await DataModel_1.default.deleteMany({});
        const result = await DataModel_1.default.insertMany(jsonObj, options);
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.default = uploadhandler;
//# sourceMappingURL=upload.js.map