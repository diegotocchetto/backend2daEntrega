
import { UserDao} from "../DAO/modelFactory.js";
import { CartDao} from "../DAO/modelFactory.js";
const UsersDAO = new UserDao();


export class UserService {
  validateUser(firstName, lastName, email, age) {
    if (!firstName || !lastName || !email || !age) {
      throw new Error('validation error: please complete firstName, lastname and email.');
    }
  }

  async getAll() {
    const users = await UsersDAO.find({});
    return users;
  }


  async findUserByEmail(email) {
    const user = await UsersDAO.findOne(
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
   //const cartId="64baa345205099bd1de3b646";
    const userCreated = await UsersDAO.create({ firstName, lastName, email, age,role, cartId });
    return userCreated;
  }

  async deleteOne(uid) {
    const deleted = await UsersDAO.deleteOne({ _id: uid });
    return deleted;
  }

  async updateOne(uid, firstName, lastName, email, age) {
    if (!uid) throw new Error('invalid _id');
    const prouctExist= await UsersDAO.findOne({uid});
    this.validateUser(firstName, lastName, email, age);
    const userUptaded = await UsersDAO.updateOne({ _id: uid }, { firstName, lastName, email , age});
    return userUptaded;
  }
}