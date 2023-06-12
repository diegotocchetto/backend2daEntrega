import { CartModel } from '../DAO/models/carts.model.js';

export class CartService {



  async getCartById(_id) {
    console.log(_id)
    const cart = await CartModel.findOne({_id: _id });
    return cart;
  }

//-------------GET CARTS-----------------

async getCarts () {
    try {
        return await CartModel.find().populate('products.product').lean()
    } catch (error) {
        return new Error(error)
    }
}


  
  async createCart() {
    try {
        // first verify if there is a cart for the user
        const cart= {
            products: []
        }
        return await CartModel.create(cart)

    } catch (error) {
        return new Error(error)
    }
}

//segunda entrea llega la cantidad por body

async updateCart(cid, pid, quantity) {
    try {
        const cart= await CartModel.findOne({_id: cid });
       // console.log(cart)  
        if (!cart) return {status: "error", message: "Cart not found"}

        const productIndex = cart.products.findIndex(prod =>prod.product._id.toString()===pid)
        if (productIndex===-1){
            cart.products.push({product: pid, quantity}) //NO EXISTE
        } else {
            cart.products[productIndex].quantity+= quantity //YA EXISTE SUMO CANTIDAD
        }
        await cart.save();
        return {status: "success", message: "Product added succesfully", productsQty:cart.products.length }
    } catch (error) {
        return {status: 'error', message: error}
    }
}




async replaceProductssInCart(cartId, newProds){ //reemplaza todos los productos del carrito por un array
    try {
        const cart = await CartModel.findById(cartId);
       // cart = await getCartById(cartId);
       console.log("llego")
       console.log(cartId)
       console.log(cart)
        cart.products = [];
        cart.products.push(newProds);
        cart.save();
        return cart;
    } catch (error) {
        throw error;
    }
}

async removeProductFromCart(cartId, productId) {
    try {
        const cart = await CartModel.findById(cartId);
        console.log(cart.products)
        if (!cart) {
        throw new Error('Cart not found');
        }
        const prodIndex = cart.products.findIndex((product) => product.id.toString() === productId)
        if (prodIndex === -1) {
        throw new Error('Product not found in the cart');
        }
        if (cart.products[prodIndex].quantity > 1) {
        cart.products[prodIndex].quantity -= 1;
        } else {
        cart.products.splice(prodIndex, 1);
        }
    
        const savedCart = await cart.save();
        return savedCart;
    } catch (error) {
        throw error;
    }
}


async deleteCartById(cartId) { // borra todos los prods del carrito
    try {
        const cart = await CartModel.findById(cartId);
        cart = await getCartById(cartId);
        cart.products = [];
        cart.save();
        return cart;
    } catch (error) {
        throw error;
    }

}
} //clase