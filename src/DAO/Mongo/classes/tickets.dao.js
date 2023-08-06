import { TicketModel } from '../models/tickets.model.js';
import { v4 as uuidGenerator } from "uuid";

export class TicketsDao {
  async createTicket(purchaser, amount) {
    const code = uuidGenerator();
    console.log("llega al tickt dao")
    console.log(purchaser);
    console.log(amount);
    console.log(code);
    return await TicketModel.create({ purchaser, amount, code });
  }
}

export default TicketsDao;