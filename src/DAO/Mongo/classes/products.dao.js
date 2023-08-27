import  {ProductModel}  from '../models/products.model.js';


export class ProductDao {

  async getAll(queryOptions, options) {
    try {
      const queryResult = await ProductModel.paginate(queryOptions, options);
      return queryResult;
    } catch (e) {
      throw e;
    }
  }

  async createOne(title, description, price, thumbnail, code, stock, status, category){
    const productData = { title, description, price, thumbnail, code, stock, status, category }
    const product = new ProductModel(productData);
    await product.save();
    return product;
  }

/*
  async updateOne(id, title, description, price, thumbnail, code, stock, status, category) {
    //this.validate(title, description, price, thumbnail, code, stock, status, category);
    const productUpdated = await ProductModel.findOneAndUpdate(
    
      { _id: id },
      {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      },
      { new: true }
    );
    return productUpdated;
  }
*/
async updateOne(pid, productAttributes) {
  await ProductModel.updateOne({ _id: pid }, productAttributes);
}

  async deleteOne(id) {
    const productDeleted = await ProductModel.findOneAndRemove({ _id: id });
    return productDeleted;
  }

  async findById(productId) {
    const product = await ProductModel.findById(productId);
    return product;
  }
}


export default ProductDao;