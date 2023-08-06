import express from 'express';
const productsRouter = express.Router();
import ProductsController from '../controllers/products.controller.js';
const productsController = new ProductsController();
import { checkLogin,isAdmin }  from '../middlewares/auth.js';

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:pid',checkLogin, productsController.getProductById);
productsRouter.post('/',checkLogin,isAdmin, productsController.createProduct);
productsRouter.put('/:id',checkLogin,isAdmin, productsController.updateProduct);
productsRouter.delete('/:id',checkLogin,isAdmin, productsController.deleteProduct);

export default productsRouter; 