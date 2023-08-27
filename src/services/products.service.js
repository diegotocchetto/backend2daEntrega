import { ProductDao } from '../DAO/modelFactory.js';
 const ProductDAO = new ProductDao();
import CustomError from '../services/errors/custom-error.js';
import EErros from '../services/errors/enums.js';
import logger from '../utils/logger.js';


export class ProductService{
    
    validate(title, description, price, thumbnail, code, stock, category){
        if (!title || !description || !price || !code || !stock || !category) {
          CustomError.createError({
            name: 'fields missing or incorrect',
            cause: 'fields missing or incorrect',
            message: 'validation error: please complete or correct all fields.',
            code: EErros.VALIDATION_ERROR,
        });        }
    }

    async getAll(page, limit, sort, category, status){
      try {
        const options = {}
        if(page){
            options.page = page || 1
        }
        if(limit){
            options.limit = limit || 10
        }
        if(sort){
            options.sort = { price: sort === 'desc' ? -1 : 1 };
        }

        const filter = {};
        if(category){
            filter.category = category || '';
        }
        if(status){
            filter.status = status || true;
        }

        const products = await ProductDAO.getAll(filter, options);

        return products;
    } catch (error) {
        throw error;
    }
    }

    async getProductById(id) {
      try {
        const productFiltered = await ProductDAO.findOne({ _id: id });
        return {
          status: 200,
          result: { succes: true, payload: productFiltered },
        };
      } catch (err) {
        logger.error(err)
        return {
          status: 500,
          result: { status: 'error', msg: 'Internal Server Error', payload: {} },
        };
      }
    }

    
    async createOne(title, description, price, thumbnail, code, stock, category){
        this.validate(title, description, price, thumbnail, code, stock, category);
        const productCreated = await ProductDAO.create({title, description, price, thumbnail, code, stock, category,status:true});
        return productCreated;
    }

    async deleteOne(_id){
        const deleted = await ProductDAO.deleteOne({_id});
        if (deleted.deletedCount === 1) {
            return true;
        } else {
          CustomError.createError({
            name: 'fields missing or incorrect',
            cause: 'fields missing or incorrect',
            message: 'validation error: please complete or correct all fields.',
            code: EErros.VALIDATION_ERROR,
        });
        }
    }

    async updateOne(_id, title, description, price,thumbnail,code,stock,category,status) {

      if (!_id) throw new Error('invalid _id');
      const prouctExist= await ProductDAO.findOne({_id});
      if (!prouctExist) throw new Error('product not exist');
      const productUptaded = await ProductDAO.updateOne({ _id: _id }, { title, description, price,thumbnail,code,stock,category,status });
      return productUptaded;
    }
  }

export default ProductService;