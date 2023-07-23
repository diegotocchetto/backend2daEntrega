import { ProductModel } from '../DAO/models/products.model.js';
import ProductService from '../services/products.service.js';
import CartService from'../services/carts.service.js';

const productService = new ProductService();
const cartService = new CartService();

class ViewsService {
    /*
    async getHome(queryParams) {
        try {
            const products = await productService.get(queryParams);
            return products;
        } catch (error) {
            console.error(error);
            throw new Error('Error in server');
        }
    }
*/
    async getRealTimeProducts() {
        try {
            const products = await productService.get();
            return products;
        } catch (error) {
            throw new Error('Error in server');
        }
    }

    async getProducts(queryParams) {
        try {
            console.log("llega al vies service getproducts")
            const {
                payload: products,
                totalPages,
                prevPage,
                nextPage,
                page: currentPage,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink,
            } = await productService.get(queryParams);
            let productsSimplified = products.map((item) => ({
                _id: item._id.toString(),
                title: item.title,
                description: item.description,
                price: item.price,
                thumbnail: item.thumbnail,
                code: item.code,
                stock: item.stock,
                category: item.category,
            }));
            return {
                products: productsSimplified,
                totalPages,
                prevPage,
                nextPage,
                currentPage,
                hasPrevPage,
                hasNextPage,
                prevLink: prevLink?.substring(4) || '',
                nextLink: nextLink?.substring(4) || '',
            };
        } catch (error) {
            throw new Error('Error in server');
        }
    }

    async getProduct(pid) {
        try {
            const product = await ProductModel.findById(pid);
            const productSimplified = {
                _id: product._id.toString(),
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                category: product.category,
            };
            return productSimplified;
        } catch (error) {
            throw error;
        }
    }

    async getCart(cid) {
        try {
            const cart = await cartService.get(cid);
            console.log("llega al get cart de view service")
            console.log(cart)
            const simplifiedCart = cart.products.map((item) => ({
                title: item.product.title,
                price: item.product.price,
                quantity: item.quantity,
            }));
            return simplifiedCart;
        } catch (error) {
            throw error;
        }
    }
}

export default ViewsService;