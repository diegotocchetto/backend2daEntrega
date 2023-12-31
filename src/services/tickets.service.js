import MongoCarts from'../services/carts.service.js';
const CartService = new MongoCarts();
import mongoose from 'mongoose';
import { TicketDao, ProductDao, CartDao } from '../DAO/modelFactory.js';
const ticketsDAO = new TicketDao();
const productDAO = new ProductDao();
const cartsDAO = new CartDao();
import logger from '../utils/logger.js';


export class ticketsServices {
  async purchaseCart(cartId, cartList, userMail, userCartId) {
    try {
      console.log("LLEGA A TICKETSERVICES EN PURCHASECART")
      console.log(cartId)
      console.log(cartList)
      console.log(userMail)
      if (!Array.isArray(cartList)) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: '🛑 The cart list must be a valid array.',
          },
        };
      }

      if (!cartList || cartList.length === 0) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `🛑 Cart list is empty.`,
          },
        };
      }

      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `🛑 Invalid cart ID.`,
          },
        };
      }

      /* if (cartId !== userCartId) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `🛑 The cart ID does not match the user's cart ID.`,
          },
        };
      } */

      const cartFiltered = await cartsDAO.getById(cartId);

      if (!cartFiltered) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `🛑 Cart not found.`,
          },
        };
      }

      const productsNotPurchased = [];

      const products = await Promise.all(
        cartList.map(async (product) => {
          const productFiltered = await productDAO.getById(product.id);
          // console.log('FLAG: Product filtered: ', productFiltered);

          if (!productFiltered) {
            return {
              status: 400,
              result: {
                status: 'error',
                error: `🛑 Product not found.`,
              },
            };
          }

          if (productFiltered.stock >= product.quantity) {
            productFiltered.stock -= product.quantity;
            await productFiltered.save();
            return productFiltered;
          } else {
            productsNotPurchased.push(product); // Agrega el producto a la lista de productos no comprados
            return null;
          }
        })
      );

      // Filtra los productos que no se compraron
      const productsFiltered = products.filter((product) => product !== null);

      if (productsFiltered.length === 0) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `🛑 No products available.`,
          },
        };
      }

      // Calcula el total de la compra
      const totalAmount = cartList.reduce((acc, product) => {
        const productFiltered = productsFiltered.find((p) => p._id.equals(product.id));
        if (productFiltered) {
          acc += productFiltered.price * product.quantity;
        }
        return acc;
      }, 0);

      // console.log('FLAG Total amount: ', totalAmount);

      // Crea la orden
      const newOrder = {
        code: Math.floor(Math.random() * 1000000),
        purchase_datetime: new Date(),
        amount: +totalAmount,
        purchaser: userMail,
        products: productsFiltered.map((product) => ({
          id: product._id,
          quantity: cartList.find((p) => p.id === product._id.toString()).quantity,
        })),
      };

      const orderCreated = await ticketsDAO.add(newOrder); // dao listo PASAR

      // Borra los productos comprados del carrito
      if (productsFiltered.length > 0) {
        await CartService.deleteProduct(
          cartId,
          productsFiltered.map((product) => product._id)
        );
        // console.log('FLAG Productos comprados: ', productsFiltered);
        //Limpia carrito cuando se compra
        await CartService.deleteCart(cartId);
      }
      // Agrega los productos no comprados al carrito
      if (productsNotPurchased.length > 0) {
        await CartService.updateCart(cartId, productsNotPurchased);
        // console.log('FLAG Productos no comprados: ', productsNotPurchased);
      }

      return {
        status: 200,
        result: { status: 'success', payload: orderCreated },
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        result: { status: 'error', msg: 'Internal Server Error', payload: {} },
      };
    }
  }

  async getTicketById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `🛑 Invalid ticket ID.`,
          },
        };
      }

      const ticket = await ticketsDAO.getById(id);
      if (!ticket) {
        return {
          status: 404,
          result: {
            status: 'error',
            error: `🛑 Ticket not found.`,
          },
        };
      }

      return {
        status: 200,
        result: { status: 'success', payload: ticket },
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        result: { status: 'error', msg: 'Internal Server Error', payload: {} },
      };
    }
  }
}

export default ticketsServices;