import MockProducts from '../services/mock.services.js';
const Services = new MockProducts();
import logger from "../utils/logger.js";

export class MockController {
  getMockgingProducts = async (req, res) => {
    const response = await Services.getAllProducts();
    return res.status(response.status).json(response.result);
  };
}

export default new MockController();