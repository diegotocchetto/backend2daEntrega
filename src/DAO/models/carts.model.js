//@ts-check
import { Schema, model } from "mongoose";


const cartSchema = new Schema({
  products:[{
    product:{ type: Schema.Types.ObjectId, 
              ref: "products" 
            },
    quantity: { type: Number }


  }]
} )

export const CartModel = model("carts", cartSchema);


