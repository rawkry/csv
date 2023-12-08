"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = require("./middlewares");
const mongoose_1 = __importDefault(require("./mongoose"));
const app = (0, express_1.default)();
(async () => {
    try {
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.use((0, middlewares_1.guard)(config_1.token));
        app.get("/", (req, res) => {
            res.status(200).send("Hello World");
        });
        app.use("/datamodel", routes_1.default);
        await (0, mongoose_1.default)();
        app.use((0, middlewares_1.abort)(true));
    }
    catch (err) {
        console.error("Error during application startup:", err);
        // Handle the error appropriately, e.g., log it or exit the application
    }
})();
exports.default = app;
//# sourceMappingURL=app.js.map