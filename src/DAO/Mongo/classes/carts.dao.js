import {CartModel } from "../models/carts.model.js";
import mongoose from 'mongoose';

export class CartDao {

  async create(cartData) {
    try {
      console.log("LLEGA AL CARTS.DAO")
      return await CartModel.create(cartData);
    } catch (e) {
      throw e;
    }
  }

  async findById(cartId) {
    try {
      return await CartModel.findById(cartId).populate('products.product');
    } catch (e) {
      throw e;
    }
  }

  async update(cartId, updateData) {
    try {
      return await CartModel.findByIdAndUpdate(cartId, updateData, { new: true });
    } catch (e) {
      throw e;
    }
  }

  async delete(cartId) {
    try {
      return await CartModel.findByIdAndDelete(cartId);
    } catch (e) {
      throw e;
    }
  }
}

export default CartDao;