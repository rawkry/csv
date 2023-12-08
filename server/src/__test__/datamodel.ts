import supertest from "supertest";
import app from "../app";
import { token } from "../config";

describe(" GET /datamodel", () => {
  it(" should return unauthorize if access token is not provided", async () => {
    const response = await supertest(app).get("/datamodel");

    expect(response.text).toEqual('{"message":"Unauthorized"}');
    expect(response.status).toEqual(401);
  });
});

describe(" GET /datamodel", () => {
  it(" should return unauthorize if access token is not valid", async () => {
    const response = await supertest(app)
      .get("/")
      .set("access-token", "invalid");

    expect(response.text).toEqual('{"message":"Unauthorized"}');
    expect(response.status).toEqual(401);
  });
});

describe(" GET /datamodel", () => {
  it(" should return datamodel if access token is valid", async () => {
    const response = await supertest(app)
      .get("/datamodel")
      .set("access-token", token.split("").reverse().join(""));

    expect(response.data);
    expect(response.status).toEqual(200);
  });
});

describe("GET /datamodel", () => {
  it("should have age,earning,expenses and id as keys", async () => {
    const response = await supertest(app)
      .get("/datamodel")
      .set("access-token", token.split("").reverse().join(""));

    expect(response.body[0]).toHaveProperty("age");
    expect(response.body[0]).toHaveProperty("earning");
    expect(response.body[0]).toHaveProperty("expenses");
    expect(response.body[0]).toHaveProperty("_id");
  });
});
