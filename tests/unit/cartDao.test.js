import mongoose from "mongoose";
import { describe, it, before, after, beforeEach } from "mocha";
import { expect } from "chai";
import CartDao from "../../src/daos/mongodb/cart.dao.js";
import ProductDao from "../../src/daos/mongodb/product.dao.js";

const MONGO_TEST_URI = "mongodb+srv://ianbok2121:eivuQ6XXNh1N3T4t@backend-70150.fmiy3.mongodb.net/?retryWrites=true&w=majority&appName=backend-70150";

const cartDAO = new CartDao();
const productDAO = new ProductDao();

describe("➖➖➖➖➖➖➖➖ Pruebas DAO de Carritos ➖➖➖➖➖➖➖➖", function () {
  this.timeout(8000);

  before(async () => {
    await mongoose.connect(MONGO_TEST_URI);
  });

  beforeEach(async () => {
    await mongoose.connection.collection("carts").deleteMany({});
    await mongoose.connection.collection("products").deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("🟪 Debería crear un carrito vacío", async () => {
    const cart = await cartDAO.createCart();
    expect(cart).to.have.property("_id");
    expect(cart.products).to.be.an("array").that.is.empty;
  });

  it("🟪 Debería obtener un carrito por su ID", async () => {
    const cart = await cartDAO.createCart();
    const result = await cartDAO.getCartById(cart._id);
    expect(result).to.be.an("object");
    expect(result._id.toString()).to.equal(cart._id.toString());
  });

  it("🟪 Debería agregar un producto al carrito", async () => {
    const cart = await cartDAO.createCart();
    const product = await productDAO.createProduct({
      name: "Producto Test",
      description: "Descripción de prueba",
      price: 100,
      stock: 10,
    });

    const updatedCart = await cartDAO.addProductToCart(cart._id, product._id);
    expect(updatedCart.products).to.be.an("array").that.has.lengthOf(1);
    expect(updatedCart.products[0].product.toString()).to.equal(product._id.toString());
  });

  it("🟪 Debería actualizar la cantidad de un producto en el carrito", async () => {
    const cart = await cartDAO.createCart();
    const product = await productDAO.createProduct({
      name: "Producto Test",
      description: "Descripción de prueba",
      price: 100,
      stock: 10,
    });

    await cartDAO.addProductToCart(cart._id, product._id);
    const updatedCart = await cartDAO.updateProdQuantity(cart._id, product._id, 5);

    expect(updatedCart.products[0].quantity).to.equal(5);
  });

  it("🟪 Debería eliminar un producto del carrito", async () => {
    const cart = await cartDAO.createCart();
    const product = await productDAO.createProduct({
      name: "Producto Test",
      description: "Descripción de prueba",
      price: 100,
      stock: 10,
    });

    await cartDAO.addProductToCart(cart._id, product._id);
    const updatedCart = await cartDAO.removefromCart(cart._id, product._id);

    expect(updatedCart.products).to.be.an("array").that.is.empty;
  });

  it("🟪 Debería vaciar completamente el carrito", async () => {
    const cart = await cartDAO.createCart();
    const product1 = await productDAO.createProduct({
      name: "Producto 1",
      description: "Descripción 1",
      price: 50,
      stock: 5,
    });
    const product2 = await productDAO.createProduct({
      name: "Producto 2",
      description: "Descripción 2",
      price: 100,
      stock: 10,
    });

    await cartDAO.addProductToCart(cart._id, product1._id);
    await cartDAO.addProductToCart(cart._id, product2._id);

    const clearedCart = await cartDAO.clearCart(cart._id);
    expect(clearedCart.products).to.be.an("array").that.is.empty;
  });
});
