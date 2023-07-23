import express from 'express';
const cartsRouter = express.Router();
import CartsController  from '../controllers/carts.controller.js';
const cartsController = new CartsController();

cartsRouter.get('/:cid', cartsController.getCart);
cartsRouter.post('/', cartsController.createCart);
cartsRouter.post('/:cid/product/:pid', cartsController.addProductToCart);
cartsRouter.delete('/:cid/product/:pid', cartsController.removeProductFromCart);
cartsRouter.put('/:cid', cartsController.updateCart);
cartsRouter.put('/:cid/product/:pid', cartsController.updateProductQuantity);
cartsRouter.delete('/:cid', cartsController.clearCart);

export default cartsRouter;