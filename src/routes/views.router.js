
import express from 'express';
import { ProductService } from '../services/products.service.js';
import { CartService } from '../services/carts.service.js';
import { ProductModel } from '../DAO/models/products.model.js';
import { query, validationResult } from 'express-validator';

export  const router = express.Router();
const Service= new ProductService();
/*router.get('/',(req,res)=>{
res.render('index',{});
})
*/

//GET
//Vista Products

router.get('/products', async (req, res)=> {
    try{
        console.log("llega al viws router")
        const { page, limit, sort, category, status }= req.query;
        const queryResult = await Service.getAll(page, limit, sort, category, status);
        const {docs, ...paginationInfo} = queryResult;
        const prods = docs.map((product) => {
            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                category: product.category,
                status: product.status              
            }
        });
        const response = {
            status: 'success',
            payload: prods,
            totalPages: paginationInfo.totalPages,
            prevPage: paginationInfo.prevPage,
            nextPage: paginationInfo.nextPage,
            page: parseInt(paginationInfo.page),
            hasPrevPage: paginationInfo.hasPrevPage,
            hasNextPage: paginationInfo.hasNextPage,
        };
        const prevPage = parseInt(page) - 1;
        response.hasPrevPage ? response.prevLink = `localhost:8080/products/?page=${prevPage}&limit=${limit}&sort=${sort}&category=${category}&status=${status}` : response.prevLink = null;
        const nextPage = parseInt(page) + 1;
        response.hasNextPage ? response.nextLink = `localhost:8080/products/?page=${nextPage}&limit=${limit}&sort=${sort}&category=${category}&status=${status}` : response.nextLink = null;
        if (parseInt(page) > paginationInfo.totalPages || parseInt(page) < 1) {
            throw new Error('La página solicitada no existe');
        }
        const nextPageUrl = `/?page=${nextPage}&limit=${limit}&sort=${sort}&category=${category}&status=${status}`;
        res.render('products', {prods, paginationInfo, nextPageUrl, sort, category, status})
        console.log(response);
    } catch(error) {
        console.error(error);
        return res.status(400).json({
        status: 'error',
        msg: error.message,
        });
    }
})


//vista del carro segunda entrega
router.get('/carts/:cid',  async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartService.getCartById(cid);
        const object = {
            title: "Productos",
            products: cart.product,
            id: cart._id,
        };
        res.render("cart", object);
    } catch (error) {}
  });

export default router;