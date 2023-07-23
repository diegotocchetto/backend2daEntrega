import { UserModel } from '../DAO/models/users.model.js';

export class UserService {
  validateUser(firstName, lastName, email, age) {
    if (!firstName || !lastName || !email || !age) {
      throw new Error('validation error: please complete firstName, lastname and email.');
    }
  }

  async getAll() {
    const users = await UserModel.find({});
    return users;
  }


  async findUserByEmail(email) {
    const user = await UserModel.findOne(
      { email: email },
      {
        _id: true,
        email: true,
        firstName: true,
        password: true,
        rol: true,
      }
    );
    return user || false;
  }


  async createOne(firstName, lastName, email, age) {

    this.validateUser(firstName, lastName, email,age);
    const existUser = await this.findUserByEmail(email);
    if(existUser){
      throw ("user already exist")
   }
   //agregar crear carrito
   const role="user";
   const cartId="64baa345205099bd1de3b646";
   console.log("quiere agregarlo")
    const userCreated = await UserModel.create({ firstName, lastName, email, age,role, cartId });
    return userCreated;
  }

  async deleteOne(uid) {
    const deleted = await UserModel.deleteOne({ _id: uid });
    return deleted;
  }

  async updateOne(uid, firstName, lastName, email, age) {
    console.log(uid)
    console.log("llega al user service")
    if (!uid) throw new Error('invalid _id');
    const prouctExist= await UserModel.findOne({uid});
    console.log("pasa el buscar user")
    this.validateUser(firstName, lastName, email, age);
    const userUptaded = await UserModel.updateOne({ _id: uid }, { firstName, lastName, email , age});
    return userUptaded;
  }
}