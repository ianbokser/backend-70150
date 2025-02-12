import { TicketModel } from "./models/ticket.model.js";

export default class TicketDao {
  
    async getTickets() {
        try {
            return await TicketModel.find({});
        } catch (error) {
            console.error("Error al obtener los tickets:", error);
            throw error;
        }
    }

    async createTicket(ticket) {
        try {
            const newTicket = await TicketModel.create(ticket);
            return newTicket;
        } catch (error) {
            console.error("Error al crear el ticket:", error);
            throw error;
        }
    }
    

    async getTicketByCode(code) {
        return await TicketModel.find({ code }).lean();
    }
    
    
}