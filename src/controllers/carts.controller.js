import {CartService}  from '../services/carts.service.js';
import {ticketsServices}  from '../services/tickets.service.js';
import userDTO  from '../DAO/DTO/user.dto.js';
import logger from '../utils/logger.js';


const cartService = new CartService();
const ticketsService = new ticketsServices();

class CartsController {
    async createCart(req, res) {
        try {
            const newCart = await cartService.createOne();
            res.status(201).json(newCart);
        } catch (error) {
        logger.error('Error retrieving creating cart :', error);
        res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getCart(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await cartService.get(cartId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await cartService.addProductToCart(cid, pid);
            res.status(200).json(cart);
        } catch (error) {
            logger.error('Error retrieving creating product in cart :', error);
            res.status(404).json({ error: error.message });
        }
    }

    async removeProductFromCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await cartService.removeProduct(cid, pid);
            res.status(200).json({
                status: "success",
                message: "Product removed from cart",
                cart,
            });
        } catch (error) {
            logger.error('Error retrieving deleting product from cart :', error);
            res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }

    async updateCart(req, res) {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const cart = await cartService.updateCart(cid, products);
            res.status(200).json({
                status: "success",
                message: "Cart updated successfully",
                cart,
            });
        } catch (error) {
            logger.error('Error retrieving updating cart :', error);
            res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }

    async updateProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await cartService.updateProductQuantity(cid, pid, quantity);
            res.status(200).json({ status: "success", message: "Product quantity updated", cart });
        } catch (error) {
            logger.error('Error retrieving updating product quantity from cart :', error);
            res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }

    async clearCart(req, res) {
        try {
            const { cid } = req.params;
            await cartService.clearCart(cid);
            res.status(200).json({ status: "success", message: "Cart cleared successfully" });
        } catch (error) {
            logger.error('Error retrieving clearing  cart :', error);
            res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }

    purchaseCart = async (req, res) => {
        console.log("llega al purchaseCart del carts.controller")
        const id = req.params.cid;
        const cartList = req.body;
        const infoUser = new userDTO(req.session);
        console.log(infoUser)
       
        const response = await ticketsService.purchaseCart(id, cartList, infoUser.email, infoUser.cartID);
        return res.status(response.status).json(response.result);
      };
    
      getTicketById = async (req, res) => {
        const id = req.params.cid;
        //TODO DTO DE salida?
        const response = await ticketsService.getTicketById(id);
        return res.render('ticket', { ticket: response.result });
      };
}

export default CartsController;