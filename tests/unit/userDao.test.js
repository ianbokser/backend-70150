import mongoose from "mongoose";
import { describe, it, before, after, beforeEach } from "mocha";
import { expect } from "chai";
import UserDao from "../../src/daos/mongodb/user.dao.js";

const MONGO_TEST_URI = "mongodb+srv://ianbok2121:eivuQ6XXNh1N3T4t@backend-70150.fmiy3.mongodb.net/?retryWrites=true&w=majority&appName=backend-70150";

const userDAO = new UserDao();

describe("➖➖➖➖➖➖➖➖ Pruebas DAO de Usuarios ➖➖➖➖➖➖➖➖", function () {
  this.timeout(8000);

  before(async () => {
    await mongoose.connect(MONGO_TEST_URI);
  });

  beforeEach(async () => {
    await mongoose.connection.collection("users").deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("🟪 Debería crear un usuario en la base de datos", async () => {
    const userMock = {
      first_name: "Juan",
      last_name: "Pérez",
      email: "juanperez@example.com",
      age: 30,
      password: "securepassword",
      role: "user",
    };

    const result = await userDAO.createUser(userMock);

    expect(result).to.be.an("object");
    expect(result).to.have.property("_id");
    expect(result.first_name).to.equal(userMock.first_name);
    expect(result.last_name).to.equal(userMock.last_name);
    expect(result.email).to.equal(userMock.email);
    expect(result.age).to.equal(userMock.age);
    expect(result.password).to.equal(userMock.password);
    expect(result.role).to.equal(userMock.role);
  });

  it("🟪 Debería obtener todos los usuarios", async () => {
    await userDAO.createUser({
      first_name: "Carlos",
      last_name: "López",
      email: "carloslopez@example.com",
      age: 25,
      password: "password123",
      role: "admin",
    });

    await userDAO.createUser({
      first_name: "Maria",
      last_name: "Gomez",
      email: "mariagomez@example.com",
      age: 28,
      password: "mypassword",
      role: "user",
    });

    const result = await userDAO.getUsers();

    expect(result).to.be.an("array");
    expect(result.length).to.equal(2);
  });

  it("🟪 Debería obtener un usuario por email", async () => {
    const userMock = {
      first_name: "Lucia",
      last_name: "Fernández",
      email: "luciafernandez@example.com",
      age: 35,
      password: "luciapass",
      role: "user",
    };

    await userDAO.createUser(userMock);
    const result = await userDAO.getUserByEmail("luciafernandez@example.com");

    expect(result).to.be.an("array");
    expect(result.length).to.equal(1);
    expect(result[0].email).to.equal(userMock.email);
    expect(result[0].first_name).to.equal(userMock.first_name);
    expect(result[0].last_name).to.equal(userMock.last_name);
  });
});
