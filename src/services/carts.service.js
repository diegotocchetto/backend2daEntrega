//import {CartDao} from "../DAO/Mongo/classes/carts.dao.js";
//import  {ProductDao} from "../DAO/Mongo/classes/products.dao.js";

import { CartDao,ProductsDAO } from "../DAO/modelFactory.js";

export class CartService{

    async createOne(){
        console.log("LLEGA")
        const cartCreated = await CartDao.create({});
     
        return cartCreated;
    }

    async get(cartId){
        const cart = await CartDao.findById(cartId).populate('products.product');
        if(!cart){
            throw new Error('Cart not found');
        }
        return cart;
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await CartDao.findById(cartId);
            const product = await ProductsDAO.findById(productId);
            if (!cart) {
                throw new Error('Cart not found');
            }
            if (!product) {
                throw new Error('Product not found');
            }
            cart.products.push({product: product._id, quantity: 1});
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cartId, products) {
        try {
            const cart = await CartDao.findByIdAndUpdate(cartId, {products}, {new: true});
            return cart;
        } catch (error) {
            throw new Error('Error updating cart in database');
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await CartDao.findById(cartId);
            const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
            if (productIndex === -1) {
                throw new Error('Product not found in cart');
            }
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error updating product quantity in cart');
        }
    }

    async removeProduct(cartId, productId) {
        try {
            const cart = await CartDao.findById(cartId);
            const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
            if (productIndex === -1) {
                throw new Error('Product not found in cart');
            }
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error removing product from cart');
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await CartDao.findById(cartId);
            cart.products = [];
            await cart.save();
        } catch (error) {
            throw new Error('Error clearing cart');
        }
    }
}

export default CartService;