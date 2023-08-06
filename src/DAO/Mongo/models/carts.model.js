//@ts-check
import mongoose from "mongoose";



const  cartSchema = new mongoose.Schema({
  products:[{
    product:{ type: mongoose.Schema.Types.ObjectId, 
              ref: "products" 
            },
    quantity: { type: Number }


  }]
} )



export const CartModel = mongoose.model("carts", cartSchema);


