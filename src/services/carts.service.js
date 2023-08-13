
import { CartDao,ProductDao,TicketDao } from "../DAO/modelFactory.js";
import mongoose from "mongoose";
import CustomError from "../services/errors/custom-error.js";
import EErros from "../services/errors/enums.js";

 const ProductDAO = new ProductDao();
 const CartDAO = new CartDao();
 const TicketDAO = new TicketDao();

export class CartService{

    async createOne(){
        console.log("LLEGA")
        const cartCreated = await CartDAO.create({});
     
        return cartCreated;
    }

    async get(cartId){
        console.log("LLEGA al get")
       // const cart = await CartDAO.findById(cartId).populate('products.product');
        const cart = await CartDAO.findById(cartId);
        if(!cart){
            CustomError.createError({
                name: '404 not found error',
                cause: cart,
                message: 'Not Found',
                code: EErros.NOT_FOUND_ERROR,
            });
        }
        return cart;
    }

    async addProductToCart(cartId, productId) {
        try {
           
            const cart = await CartDAO.findById(cartId);
            const product = await ProductDAO.findById(productId);
            if (!cart) {
                CustomError.createError({
                    name: '404 not found error',
                    cause: cart,
                    message: 'Cart not Found',
                    code: EErros.NOT_FOUND_ERROR,
                });
            }
            if (!product) {
                CustomError.createError({
                    name: '404 not found error',
                    cause: cart,
                    message: 'product not Found',
                    code: EErros.NOT_FOUND_ERROR,
                });
            }
           // console.log(cart)
           const productoEncontrado = cart.products.find(producto => producto.product._id.toString() === productId);
           if(productoEncontrado){
           for (let i = 0; i < cart.products.length; i++)
            {
                   if (cart.products[i].product._id.toString() === productId){
                    cart.products[i].quantity += 1;
                   console.log("Cantidad del producto aumentada:", cart.products[i].quantity);
                   break; 
                    }
            }
                    }else{
                    cart.products.push({product: product._id, quantity: 1});
                    }
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
/////








    async updateCart(cartId, products) {
        try {
            const cart = await CartDAO.findByIdAndUpdate(cartId, {products}, {new: true});
            return cart;
        } catch (error) {
            throw new Error('Error updating cart in database');
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await CartDAO.findById(cartId);
            const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
            if (productIndex === -1) {
                throw new Error('Product not found in cart');
            }
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error updating product quantity in cart');
        }
    }

    async removeProduct(cartId, productId) {
        try {
            const cart = await CartDAO.findById(cartId);
            const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
            if (productIndex === -1) {
                throw new Error('Product not found in cart');
            }
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error removing product from cart');
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await CartDAO.findById(cartId);
            cart.products = [];
            await cart.save();
        } catch (error) {
            throw new Error('Error clearing cart');
        }
    }
    async deleteProductFromCart(cartID, productID) {
        try {
            console.log("entra a borrar en deleteProductFromCart")
          const cart = await findById.findCart(cartID);
          const productInCartIndex = cart.products.findIndex((product) => product.idProduct.toString() === productID);
          cart.products.splice(productInCartIndex, 1);
          await CartDAO.update(cartID, cart);
          return { code: 200, result: { status: "success", message: "Product deleted from cart", payload: cart } };
        } catch (error) {
          return { code: 500, result: { status: "error", message: "Couldn't delete product from cart." } };
        }
      }

    async purchase(purchaser, cartID) {
        try {
          const cart = await CartDAO.findById(cartID);
          if (cart.products.length < 1) return { code: 404, result: { status: "empty", message: "Cart is empty" } };
          let totalAmount = 0;


          for (const cartProduct of cart.products) {
            const productDB =  await ProductDAO.findById(cartProduct.product._id);
        
            if (productDB.stock < cartProduct.quantity) {
              return {
                code: 404,
                result: {
                  status: "nostock",
                  message: `Not enough stock for product ${productDB.title}`,
                  payload: productDB,
                },
              };
            }
            totalAmount += productDB.price * cartProduct.quantity;
            productDB.stock -= cartProduct.quantity;
            console.log("va a entrar a ProductDAO.updateOn")
            await ProductDAO.updateOne(productDB._id , productDB);
            console.log("sale de entrar a ProductDAO.updateOn")
            console.log("borra producto del carro")
            await this.deleteProductFromCart(cartID, cartProduct.product._id);
          }
          const ticket = await TicketDAO.createTicket(purchaser, totalAmount);
          return { code: 200, result: { status: "success", message: "Purchase successful", payload: ticket } };
        } catch (error) {
          console.log(error)
          return { code: 500, result: { status: "error", message: "Couldn't purchase products." } };
        }
      }
}

export default CartService;