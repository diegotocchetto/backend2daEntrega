import MockProducts from '../services/mock.services.js';
const Services = new MockProducts();

export class MockController {
  getMockgingProducts = async (req, res) => {
    const response = await Services.getAllProducts();
    return res.status(response.status).json(response.result);
  };
}

export default new MockController();