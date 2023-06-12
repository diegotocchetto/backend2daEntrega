import express from 'express';
//import ProductManager from '../DAO/managers/ProductManager.js';
import { ProductService } from '../services/products.service.js';
export const realTimeRouter = express.Router();

//const manager = new ProductManager("./products.json");
const Service= new ProductService();

realTimeRouter.get('/realTimeProducts', async (req, res) => {
  const limit = req.query.limit;
  let products=await Service.getAll();
  //const products = await manager.getProducts(limit)
  const data = {
      title: "PRODUCTS LIST",
      products
  }
  res.render('realTimeProducts', data)
})


export default realTimeRouter;