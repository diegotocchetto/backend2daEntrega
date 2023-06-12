import { existsSync, writeFileSync, readFileSync, promises } from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async loadData() {
    try {
      const data = await promises.readFile(this.path, "utf-8");
      const parsedData = JSON.parse(data);
      this.products = parsedData.products;
    } catch (error) {
      console.log("Error loading data!");
      console.log("Creating new data file...");
      try {this
        await promises.writeFile(this.path, JSON.stringify({products: [] }, null, 2), "utf-8");
        console.log("Data file created");
      } catch (error) {
        console.log("Error creating data file!");
      }
    }
  }

  async saveData() {
    try {
      await promises.writeFile(
        this.path,
        JSON.stringify({ products: this.products }, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log("Error saving data!");
    }
  }

  async addProduct(product) {
    await this.loadData();
    if (this.products.some((item) => item.code === product.code)) {
      return { status: "error", message: 'Product already exists ' };
    }
    console.log(product)
    if (
     
      !product.title ||
      !product.description ||
      !product.price ||
     // !product.thumbnails ||
      !product.code ||
      !product.stock ||
      !product.category
    ) {
      return "Product is missing required properties";
    }
    const maxId= this.products.length>0?Math.max(...this.products.map((p)=>p.id)):0;
    this.id=maxId;
    product = { id: ++this.id, ...product };

    this.products.push(product);
    await this.saveData();
    return {status: "success", message: "Product added successfully" };

  }

  async getProductById(id) {
    await this.loadData();
    return this.products.find((product) => product.id === id) ?? "Not Found";
  
  }

  async getProducts() {
    await this.loadData();
    return this.products.length > 0 ? this.products : "No products";
  }

  async updateProduct(id, product) {
    await this.loadData();
  
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return "Product not found";
    }
    this.products[productIndex] = { ...this.products[productIndex], ...product, id: this.products[productIndex].id };
    await this.saveData();
    return "Product updated successfully";
  }
  
  async deleteProduct(id) {

    await this.loadData();
  
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return "Product not found";
    }
   
    this.products.splice(productIndex, 1);
    await this.saveData();
    return "Product deleted successfully";
  }
}



export default ProductManager;