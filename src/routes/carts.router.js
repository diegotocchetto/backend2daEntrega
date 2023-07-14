import { Router } from "express";
const routerCar = Router();
import { CartService } from '../services/carts.service.js';
import { ProductService } from '../services/products.service.js';

const ProdService= new ProductService();
const Service = new CartService();


//GET CART MONGO
routerCar.get('/:id', async (req, res) => {
    try {
      console.log("llega");
      const { id } = req.params;
      const carts = await Service.getCartById(id);
      return res.status(200).json({
        status: 'success',
        msg: 'cart',
        data: carts,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
  });


  //--------------------GET----------------------------- segunda entrega
  routerCar.get('/', async (req,res)=>{
  try {
      const allCarts = await Service.getCarts()
      res.send({status:'Success',payload:allCarts})
  } catch (error) {
      res.status(400).send({status:'Router error',error})
  }
})

 /////ADD CART MONGO
 routerCar.post('/', async (req, res)=>{
    try {
         let cart = await Service.createCart()
        if (!cart){
            return res.status(400).send({status:'error',mensaje:"No se pudo crear carrito"})
        }
        res.status(200).send({status:'success', payload: cart})
    } catch (error) {
        console.log(error)
    }
})


/*
routerCar.post('/:cid/product/:pid', async (req, res) => {
  try{
      const {cid, pid} = req.params;
      const cart = await Service.updateCart(cid, pid);
      res.status(200).json(cart);
  }catch (error){
      res.status(404).json({error: error.message})
  }
});
*/

//UPDATE CART MONGO
//PUT segunda entrega llega la cantidad por body
routerCar.put('/:cid/product/:pid', async(req, res) =>{
  try{
    console.log("llega y el i del carro es")

      const { cid, pid } = req.params
      console.log(cid)
      const quantity = req.body.quantity
      console.log("llega2")
      let cart = await Service.getCartById(cid);
      console.log("llega3")
      console.log(cart)
      if (cart !== null) {
        console.log("va para el service")
          let result = await Service.updateCart(cid, pid, quantity)
          console.log("salio del el service")
        //  console.log(result)
          res.status(200).send({
              status: 'success',
              payload: result})
          }
  } catch(error) {
      return new Error(error)
  }
})


//segunda entrga
routerCar.put("/:cid", async (req, res) => { 
  try {
    const cartId = req.params.cid;
    const newProds = req.body;
    await Service.replaceProductssInCart(cartId, newProds);
    return res.status(200).json({
      status: 'success',
      msg: 'Cart updated',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});


//segudna entrega borrar articulo de carrito
routerCar.delete("/:cid/products/:pid", async (req, res) => { 
  try {
    const idCart = req.params.cid;
    const idProd = req.params.pid;
    const cart = await Service.removeProductFromCart(idCart, idProd);
    return res.status(200).json({
      status: 'success',
      msg: 'Product removed from cart',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
  });


//segudna entrega 
routerCar.delete("/:cid", async (req, res) => { 
    try {
      const idCart = req.params.cid;
      const cart = await Service.deleteCartById(idCart);
      return res.status(200).json({
        status: 'success',
        msg: 'Cart deleted',
        payload: cart
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
    });


    routerCar.post('/:cid/product/:pid', async (req, res) => {
      try{
          const {cid, pid} = req.params;
          const cart = await Service.addProductToCart(cid, pid);
          res.status(200).json(cart);
      }catch (error){
          res.status(404).json({error: error.message})
      }
  });
  

export default routerCar;