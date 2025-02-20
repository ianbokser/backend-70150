import mongoose from "mongoose";
import { describe, it, before, after, beforeEach } from "mocha";
import { expect } from "chai";
import TicketDao from "../../src/daos/mongodb/ticket.dao.js";

const MONGO_TEST_URI = "mongodb+srv://ianbok2121:eivuQ6XXNh1N3T4t@backend-70150.fmiy3.mongodb.net/?retryWrites=true&w=majority&appName=backend-70150";

const ticketDAO = new TicketDao();

describe("➖➖➖➖➖➖➖➖ Pruebas DAO de Tickets ➖➖➖➖➖➖➖➖", function () {
  this.timeout(8000);

  before(async () => {
    await mongoose.connect(MONGO_TEST_URI);
  });

  beforeEach(async () => {
    await mongoose.connection.collection("tickets").deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("🟪 Debería crear un ticket en la base de datos", async () => {
    const ticketMock = {
      code: "TICKET123",
      amount: 100,
      purchaser: "comprador@example.com",
      purchaserId: new mongoose.Types.ObjectId(),
    };

    const result = await ticketDAO.createTicket(ticketMock);

    expect(result).to.be.an("object");
    expect(result).to.have.property("_id");
    expect(result.code).to.equal(ticketMock.code);
    expect(result.amount).to.equal(ticketMock.amount);
    expect(result.purchaser).to.equal(ticketMock.purchaser);
  });

  it("🟪 Debería obtener todos los tickets", async () => {
    await ticketDAO.createTicket({
      code: "TICKET1",
      amount: 50,
      purchaser: "user1@example.com",
      purchaserId: new mongoose.Types.ObjectId(),
    });

    await ticketDAO.createTicket({
      code: "TICKET2",
      amount: 150,
      purchaser: "user2@example.com",
      purchaserId: new mongoose.Types.ObjectId(),
    });

    const result = await ticketDAO.getTickets();

    expect(result).to.be.an("array");
    expect(result.length).to.equal(2);
  });

  it("🟪 Debería obtener un ticket por código", async () => {
    const ticketMock = {
      code: "UNICO123",
      amount: 200,
      purchaser: "unique@example.com",
      purchaserId: new mongoose.Types.ObjectId(),
    };

    await ticketDAO.createTicket(ticketMock);
    const result = await ticketDAO.getTicketByCode("UNICO123");

    expect(result).to.be.an("array");
    expect(result.length).to.equal(1);
    expect(result[0].code).to.equal(ticketMock.code);
    expect(result[0].amount).to.equal(ticketMock.amount);
  });
});
