import {TicketModel} from "../models/tickets.model.js";

class TicketsDao {
    async createTicket(purchaser, amount) {
      const code = shortid.generate();
      return await TicketModel.create({ purchaser, amount, code });
    }
  }
  
  const ticketsDao = new TicketsDao();
 export default ticketsDao;