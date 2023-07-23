//@ts-check

import express from "express";
const viewsRouter = express.Router();
import ViewsController from '../controllers/views.controller.js';
const viewsController = new ViewsController();

//viewsRouter.get('/', viewsController.getHome);
viewsRouter.get('/realtimeproducts', viewsController.getRealTimeProducts);
viewsRouter.get('/products', viewsController.getProducts);
viewsRouter.get('/products/:pid', viewsController.getProduct);
viewsRouter.get('/cart/:cid', viewsController.getCart);
viewsRouter.get('/login', viewsController.getLogin);

export default viewsRouter;