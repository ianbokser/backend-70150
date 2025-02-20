import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../src/app.js";
import { userModel } from "../../src/daos/mongodb/models/user.model.js";

const requester = supertest(app);

describe("🔹 Pruebas de integración de Autenticación 🔹", function () {
  this.timeout(10000);

  let userToken = "";
  let testUserId = "";

  before(async () => {
    await mongoose.connect("mongodb+srv://ianbok2121:eivuQ6XXNh1N3T4t@backend-70150.fmiy3.mongodb.net/?retryWrites=true&w=majority&appName=backend-70150");
    await userModel.deleteMany({ email: "testuser@example.com" });
  });

  after(async () => {
    await userModel.deleteMany({ email: "testuser@example.com" });
    await mongoose.connection.close();
  });

  describe("🟦 Registro y Login", () => {
    it("Debe registrar un usuario", async () => {
      const res = await requester.post("/api/auth/register").send({
        first_name: "Test",
        last_name: "User",
        age: 25,
        email: "testuser@example.com",
        role: "user",
        password: "test1234",
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("_id");
      testUserId = res.body._id;
    });

    it("Debe loguear y devolver un token", async () => {
      const res = await requester.post("/api/auth/login").send({
        email: "testuser@example.com",
        password: "test1234",
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
      userToken = res.body.token;
    });
  });

  describe("🟦 Validación de Sesión", () => {
    it("Debe devolver los datos del usuario autenticado", async () => {
      const res = await requester
      .get("/api/auth/current")
      .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("user");
      expect(res.body.user).to.have.property("email", "testuser@example.com");
    });
  });

  describe("🟦 Logout", () => {
    it("Debe cerrar la sesión y eliminar la cookie", async () => {
      const res = await requester.get("/api/auth/logout");
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Sesion Finalizada");
    });
  });
});
