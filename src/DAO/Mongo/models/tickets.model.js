//@ts-check
import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';



const ticketSchema = new Schema({
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  products: { productId: { type: Object }, _id: false, quantity: { type: Number }, totalPrice: { type: Number }  }
});


ticketSchema.plugin(mongoosePaginate);
export const TicketModel = model("Ticket", ticketSchema);