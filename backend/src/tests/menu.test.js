import request from "supertest";
import app from "../app.js";

describe("Menu API", () => {
  it("should fetch menu items", async () => {
    const res = await request(app).get("/api/menu");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
