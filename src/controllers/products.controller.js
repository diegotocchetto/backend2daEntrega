import  {ProductService} from '../services/products.service.js';
const productService = new ProductService();

class ProductsController {

    async getAllProducts(req, res) {
        try {
    const queryParams  = req.query;
    const products = await productService.getAll(queryParams);
    return res.status(200).json({
      status: 'success',
      msg: 'products list',
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
    }

    async getProductById(req, res) {
        try {
            const { pid } = req.params;
            const product = await productService.getProductById(pid);
            return res.status(200).json({
                status: 'success',
                msg: 'producto',
                data: product,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    }
    
    async createProduct(req, res) {
        try {
            const { title, description, price, thumbnail, code, stock, category } = req.body;
            const productCreated = await productService.createOne(title, description, price, thumbnail, code, stock, category);
            return res.status(201).json({
                status: 'success',
                msg: 'product created',
                data: productCreated,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    }
    
    async updateProduct(req, res) {
        try {
          const { id } = req.params;
          console.log(id)
          const { title, description, price,thumbnail,code,stock ,category,status } = req.body;
          const productUpdated= await productService.updateOne( {_id: id}, title, description, price,thumbnail,code,stock,category,status);
          return res.status(201).json({
            status: 'success',
            msg: 'product uptaded',
            data: {productUpdated},
          });
        } catch (e) {
          return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {e},
        });
    }
}

    
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const productDeleted = await productService.deleteOne(id);
            return res.status(200).json({
                status: 'success',
                msg: 'product deleted',
                data: {},
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    }
}

export default ProductsController;