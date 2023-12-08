"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const config_1 = require("../config");
describe(" GET /datamodel", () => {
    it(" should return unauthorize if access token is not provided", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/datamodel");
        expect(response.text).toEqual('{"message":"Unauthorized"}');
        expect(response.status).toEqual(401);
    });
});
describe(" GET /datamodel", () => {
    it(" should return unauthorize if access token is not valid", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get("/")
            .set("access-token", "invalid");
        expect(response.text).toEqual('{"message":"Unauthorized"}');
        expect(response.status).toEqual(401);
    });
});
describe(" GET /datamodel", () => {
    it(" should return datamodel if access token is valid", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get("/datamodel")
            .set("access-token", config_1.token.split("").reverse().join(""));
        expect(response.data);
        expect(response.status).toEqual(200);
    });
});
describe("GET /datamodel", () => {
    it("should have age,earning,expenses and id as keys", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get("/datamodel")
            .set("access-token", config_1.token.split("").reverse().join(""));
        expect(response.body[0]).toHaveProperty("age");
        expect(response.body[0]).toHaveProperty("earning");
        expect(response.body[0]).toHaveProperty("expenses");
        expect(response.body[0]).toHaveProperty("_id");
    });
});
//# sourceMappingURL=datamodel.js.map