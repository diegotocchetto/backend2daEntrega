import 'dotenv/config'
import mongoose from 'mongoose';
import logger from '../utils/logger.js';
export let MessagesDAO;
export let CartDao;
export let ProductDao; 
export let TicketDao;
export let UserDao;

switch (process.env.PERSISTENCE) {
  case 'MONGO':
    logger.info('🍕Persistance with MongoDB');

     mongoose.connect(process.env.MONGOURL);

     const {default: CartsMongo } =  await import ('./Mongo/classes/carts.dao.js');
     CartDao=CartsMongo;

     const {default: productsMongo } =  await import ('./Mongo/classes/products.dao.js');
     ProductDao=productsMongo;

     const {default: ticketsMongo } =  await import ('./Mongo/classes/tickets.dao.js');
     TicketDao=ticketsMongo;

     const {default: usersMongo } =  await import ('./Mongo/classes/users.dao.js');
     UserDao=usersMongo;

    break;

  case 'FILESYSTEM':
 //falta agregar filesystem
    break;

  case 'MEMORY':
    logger.info('🍕Persistance with Memory');
    break;

  default:
    logger.error('Invalid persistence type');
    throw new Error('Invalid persistence type');
}

export default { MessagesDAO, CartDao, ProductDao, TicketDao,UserDao};