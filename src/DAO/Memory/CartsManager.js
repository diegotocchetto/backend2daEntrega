import fs from 'fs';

class CartManager {
    constructor() {
        this.carts = [];
        this.path = './carts.json';
    }

    addCart = async (newCart) => {
        try {
            const carts = await this.getCarts();
            
          this.carts = carts;

            if (this.carts.length === 0) {
                newCart.id = 1
            } else {
                newCart.id= this.carts[this.carts.length - 1].id+ 1
            }
     
            if (Object.values(newCart).every(value => value)) {
                this.carts.push(newCart);
                const cartJSON = JSON.stringify(this.carts, null, 2);
                await fs.promises.writeFile(this.path, cartJSON)
            }

            return [];
        }
        catch (err) {
            return(err);
        }

    }

    getCarts = async () => {
        try {
            const fileCarts = await fs.promises.readFile(this.path, 'utf-8')
            if (fileCarts.length === 0) return [];
            return JSON.parse(fileCarts)
        } catch (err) {
            //console.log(err);
            return { status: "Error", error: err }
        }
    };

    getCartById = async (id) => {
        try {
            const fileCarts = await fs.promises.readFile(this.path, 'utf-8')
            const parsCarts = JSON.parse(fileCarts);
            
            if (!parsCarts[id - 1]) return { error: 'Cart does not exist' }

            return parsCarts[id - 1]
        }
        catch (err) {
            return(err);
        }
    }

        async updateCart(id, productId) {
            try {
                const data = await this.getCarts()
                const cart = data.find((cart) => cart.id == id);
                if (cart) {
                    const product = cart.products.find((product) => product.idProduct == productId);
                    if (product) {

                        //add 1 quantity
                        product.quantity = product.quantity + 1;
                        const index = cart.products.indexOf(product);
                        cart.products.splice(index, 1, product);
                        const indexCart = data.indexOf(cart);
                        data.splice(indexCart, 1, cart);
                        const updateData = JSON.stringify(data, null, 2);
                        fs.writeFileSync(this.path, updateData);
                        return product

                    } else {
                        //if not exists product
                        cart.products.push({idProduct: productId, quantity: 1});
                        const indexCart = data.indexOf(cart);
                        data.splice(indexCart, 1, cart);
                        const updateData = JSON.stringify(data, null, 2);
                        fs.writeFileSync(this.path, updateData);
                    }
                } else {

                }
            } catch (err) {
                console.log(err)
            }
        }

    }


export default CartManager;