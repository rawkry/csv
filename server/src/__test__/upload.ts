import supertest from "supertest";
import app from "../app";
import { token } from "../config";

describe(" GET /upload", () => {
  it(" should return unauthorize if access token is not provided", async () => {
    const response = await supertest(app).post("/datamodel/upload");

    expect(response.text).toEqual('{"message":"Unauthorized"}');
    expect(response.status).toEqual(401);
  });
});

describe(" GET /upload", () => {
  it(" should return unauthorize if access token is not valid", async () => {
    const response = await supertest(app)
      .post("/datamodel/upload")
      .set("access-token", "invalid");

    expect(response.text).toEqual('{"message":"Unauthorized"}');
    expect(response.status).toEqual(401);
  });
});

it("should handle the case when no file is provided", async () => {
  const response = await supertest(app)
    .post("/datamodel/upload")
    .set("access-token", token.split("").reverse().join(""));

  expect(response.status).toEqual(400);
});
