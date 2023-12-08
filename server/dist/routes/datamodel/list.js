"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataModel_1 = __importDefault(require("../../model/DataModel"));
module.exports = async (req, res) => {
    try {
        const result = await DataModel_1.default.find();
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
//# sourceMappingURL=list.js.map