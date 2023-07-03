import { UserModel } from '../DAO/models/users.model.js';

export class UserService {
  validateUser(firstName, lastName, email, age,cartId) {
    if (!firstName || !lastName || !email || !age || !cartId) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw new Error('validation error: please complete firstName, lastname and email.');
    }
  }

  async getAll() {
    const users = await UserModel.find({});
    return users;
  }

  async createOne(firstName, lastName, email, age, cartId) {
    console.log(firstName);
    console.log(age);
    this.validateUser(firstName, lastName, email,age, cartId);
    const userCreated = await UserModel.create({ firstName, lastName, email, age, cartId });
    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(_id, firstName, lastName, email, age, cartId) {
    if (!_id) throw new Error('invalid _id');
    this.validateUser(firstName, lastName, email, age, cartId);
    const userUptaded = await UserModel.updateOne({ _id: id }, { firstName, lastName, email , age, cartId});
    return userUptaded;
  }
}