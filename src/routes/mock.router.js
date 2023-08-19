import express from 'express';
import mockController from '../controllers/mock.controller.js';
const mockRouter = express.Router();

mockRouter.get('/', mockController.getMockgingProducts);

export default mockRouter;