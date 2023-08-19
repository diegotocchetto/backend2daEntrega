import ViewsService from '../services/views.service.js';
import  {ProductService} from '../services/products.service.js';
const productService = new ProductService();
const viewsService = new ViewsService();
import logger from "../utils/logger.js";

 class ViewsController {

    async getRealTimeProducts(req, res) {
        try {
            const products = await viewsService.getRealTimeProducts();
            return res.status(200).render('realTimeProducts', { products });
        } catch (error) {
            return res.status(500).json({ status: 'error', msg: 'Error in server', products: {} });
        }
    }

    async getProducts(req, res) {
        try{
            console.log("llega aca")
            const { page, limit, sort, category, status }= req.query;
            const queryResult = await productService.getAll(page, limit, sort, category, status);
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
            response.hasPrevPage ? response.prevLink = `/products/?page=${prevPage}&limit=${limit}&sort=${sort}&category=${category}&status=${status}` : response.prevLink = null;
            const nextPage = parseInt(page) + 1;
            response.hasNextPage ? response.nextLink = `/products/?page=${nextPage}&limit=${limit}&sort=${sort}&category=${category}&status=${status}` : response.nextLink = null;
            if (parseInt(page) > paginationInfo.totalPages || parseInt(page) < 1) {
                throw new Error('La página solicitada no existe');
            }
            const user = req.session.user;
       

            const userCartId=req.session.user.cartId;
            console.log(userCartId)
            res.render('products', {prods, paginationInfo, sort, category, status, user,userCartId})
           
        } catch(error) {
            console.error(error);
            return res.status(400).json({
            status: 'error',
            msg: error.message,
            });
        }
    }

    async getProduct(req, res, next) {
        try {
            const { pid } = req.params;
            const product = await viewsService.getProduct(pid);
            res.render('product', { product });
        } catch (error) {
        next(error);
        }
    }

    async getCart(req, res, next) {
        try {
            const { cid } = req.params;
            const cart = await viewsService.getCart(cid);
            res.render('cart', { cart });
        } catch (error) {
            next(error);
        }
    }

    async getLogin(req, res) {
        res.render('login');
    }

    async loggerTest(req, res) {
        logger.debug('Debug log for testing');
        logger.info('Info log for testing');
        logger.warn('Warning log for testing');
        logger.error('Error log for testing');
        logger.fatal('Fatal log for testing');
    
        res.status(200).json({ message: 'Logs tested successfully' });
    }
}

export default ViewsController;