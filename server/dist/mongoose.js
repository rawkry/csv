"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const mongooseConnect = async () => await mongoose_1.default.connect(`${config_1.mongodbConfig.url}`, config_1.mongodbConfig.options);
exports.default = mongooseConnect;
//# sourceMappingURL=mongoose.js.map