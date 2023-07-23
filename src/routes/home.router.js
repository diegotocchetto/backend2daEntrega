import express from 'express';
export const router =express.Router();
import ProductManager from '../DAO/managers/ProductManager.js';
import { ProductService } from '../services/products.service.js';
const Service= new ProductService();



router.get("/", async (req, res) => {
    try {

        const { page } = req.query;
        const { payload, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = await Service.getAll(undefined, page);
        if (page && (page > totalPages || page <= 0 || !parseInt(page))) {
            return res.status(400).send({ status: "error", error: "Pagina inexistente" });
        }

        const object = {
            title: "Productos",
            products: payload,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        };
        const user = req.session.user;
        res.render("products", object);
    } catch (error) {}
  });


export default router;

