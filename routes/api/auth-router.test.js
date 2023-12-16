import mongoose from "mongoose";
import request from "supertest";

import app from "../../app.js";

import User from "../../models/User.js";

const { DB_TEST_HOST, PORT } = process.env;

describe("test /api/auth/signin route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test  /api/auth/signin with correctData", async () => {
    const signinData = {
      email: "user@gmail.com",
      password: "123456",
    };
    const { statusCode } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);

    expect(statusCode).toBe(200);

    const user = await User.findOne({ email: signinData.email });

    expect(user.token);
    expect(user.hasOwnProperty("email"));
    expect(tuser.hasOwnProperty("subscription"));
    expect(typeof user.email === String);
    expect(typeof user.subscription === String);
  });
});
