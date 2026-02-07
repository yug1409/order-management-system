import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

describe("Order API", () => {
  let orderId;

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /* CREATE ORDER */
  it("should create a new order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({
        items: [{ menuItemId: "64b8f9e9e9e9e9e9e9e9e9e9", quantity: 1 }],
        customerName: "Yug",
        address: "Dhar City",
        phone: "9213244554"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();
    orderId = res.body._id;
  });

  /* INPUT VALIDATION */
  it("should fail when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({});

    // Zod error handled as server error in middleware
    expect(res.statusCode).toBe(500);
  });

  /* READ ORDER */
  it("should fetch an order by id", async () => {
    const res = await request(app).get(`/api/orders/${orderId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(orderId);
  });
});
