import  {UserModel}  from "../models/users.model.js";

export class userDao {

  async create(userData) {
    try {
      return await UserModel.create(userData);
    } catch (e) {
      throw e;
    }
  }

  async findById(userId) {
    try {
      return await UserModel.findById(userId);
    } catch (e) {
      throw e;
    }
  }

  async update(userId, updateData) {
    try {
      return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (e) {
      throw e;
    }
  }

  async delete(userId) {
    try {
      return await UserModel.findByIdAndDelete(userId);
    } catch (e) {
      throw e;
    }
  }
}

export default userDao;