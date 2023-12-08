"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = exports.port = exports.mongodbConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.mongodbConfig = JSON.parse(process.env.MONGODB_CONFIG);
exports.port = process.env.PORT;
exports.token = process.env.TOKEN;
//# sourceMappingURL=config.js.map