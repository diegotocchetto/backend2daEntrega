import express from 'express';
const productsRouter = express.Router();
import ProductsController from '../controllers/products.controller.js';
const productsController = new ProductsController();

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:pid', productsController.getProductById);
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:id', productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

export default productsRouter; 