import mongoose, { isValidObjectId } from "mongoose";
import { describe, it, before, after, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import ProductDao from "../../src/daos/mongodb/product.dao.js";
import { ProductModel } from "../../src/daos/mongodb/models/product.model.js";

const MONGO_TEST_URI = "mongodb+srv://ianbok2121:eivuQ6XXNh1N3T4t@backend-70150.fmiy3.mongodb.net/?retryWrites=true&w=majority&appName=backend-70150";

const productDAO = new ProductDao();

describe("➖➖➖➖➖➖➖➖ Pruebas DAO de Productos ➖➖➖➖➖➖➖➖", function () {
  this.timeout(8000);

  before(async () => {
    await mongoose.connect(MONGO_TEST_URI);
  });

  beforeEach(async () => {
    await mongoose.connection.collection("products").deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("🟪 Debería crear un producto en la base de datos", async () => {
    const productMock = {
      name: "Producto Test",
      description: "Descripción de prueba",
      price: 100,
      stock: 10,
    };

    const result = await productDAO.createProduct(productMock);
    
    expect(result).to.have.property("_id");
    expect(result.name).to.equal(productMock.name);
    expect(result.description).to.equal(productMock.description);
    expect(result.price).to.equal(productMock.price);
    expect(result.stock).to.equal(productMock.stock);
  });

  it("🟪 Debería obtener un producto por su ID", async () => {
    const productMock = await productDAO.createProduct({
      name: "Producto Test",
      description: "Descripción de prueba",
      price: 100,
      stock: 10,
    });

    const result = await productDAO.getProductById(productMock._id);

    expect(result).to.be.an("object");
    expect(result).to.have.property("_id");
    expect(result._id.toString()).to.equal(productMock._id.toString());
  });

  it("🟪 Debería obtener todos los productos con paginación", async () => {
    await productDAO.createProduct({
      name: "Producto 1",
      description: "Descripción 1",
      price: 50,
      stock: 5,
    });
    await productDAO.createProduct({
      name: "Producto 2",
      description: "Descripción 2",
      price: 100,
      stock: 10,
    });

    const result = await productDAO.getAllProducts(1, 10);

    expect(result).to.have.property("docs");
    expect(result.docs).to.be.an("array");
    expect(result.docs.length).to.be.greaterThan(0);
  });

  it("🟪 Debería actualizar un producto", async () => {
    const productMock = await productDAO.createProduct({
      name: "Producto Antiguo",
      description: "Descripción Antigua",
      price: 80,
      stock: 15,
    });

    const updatedData = {
      name: "Producto Actualizado",
      description: "Descripción Nueva",
      price: 120,
      stock: 5,
    };

    const result = await productDAO.updateProduct(productMock._id, updatedData);

    expect(result).to.be.an("object");
    expect(result.name).to.equal(updatedData.name);
    expect(result.description).to.equal(updatedData.description);
    expect(result.price).to.equal(updatedData.price);
    expect(result.stock).to.equal(updatedData.stock);
  });

  it("🟪 Debería eliminar un producto por ID", async () => {
    const productMock = await productDAO.createProduct({
      name: "Producto para Eliminar",
      description: "Descripción de eliminación",
      price: 60,
      stock: 8,
    });

    const deleted = await productDAO.deleteProduct(productMock._id);
    const found = await productDAO.getProductById(productMock._id);

    expect(deleted).to.be.an("object");
    expect(deleted._id.toString()).to.equal(productMock._id.toString());
    expect(found).to.be.null;
  });
});
