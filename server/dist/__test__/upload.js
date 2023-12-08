"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const config_1 = require("../config");
describe(" GET /upload", () => {
    it(" should return unauthorize if access token is not provided", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/datamodel/upload");
        expect(response.text).toEqual('{"message":"Unauthorized"}');
        expect(response.status).toEqual(401);
    });
});
describe(" GET /upload", () => {
    it(" should return unauthorize if access token is not valid", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/datamodel/upload")
            .set("access-token", "invalid");
        expect(response.text).toEqual('{"message":"Unauthorized"}');
        expect(response.status).toEqual(401);
    });
});
it("should handle the case when no file is provided", async () => {
    const response = await (0, supertest_1.default)(app_1.default)
        .post("/datamodel/upload")
        .set("access-token", config_1.token.split("").reverse().join(""));
    expect(response.status).toEqual(400);
});
//# sourceMappingURL=upload.js.map