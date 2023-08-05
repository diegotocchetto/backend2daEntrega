import 'dotenv/config'
import mongoose from "mongoose";
export let MessagesDAO;
export let CartDao;
export let ProductsDAO; 
export let TicketsDAO;
export let UsersDAO;
switch (process.env.PERSISTENCE) {
  case 'MONGO':
    console.log('🍕Persistance with MongoDB');

     mongoose.connect(process.env.MONGOURL);

    //MessagesDAO = require('./messages/messages.mongo.dao');
     const {default: CartsMongo } =  await import ('./Mongo/classes/carts.dao.js');
     CartDao=CartsMongo;

     ProductsDAO = import ('./Mongo/classes/products.dao.js');
     TicketsDAO = import ('./Mongo/classes/tickets.dao.js');
     UsersDAO = import ('./Mongo/classes/users.dao.js');
    break;

  case 'FILESYSTEM':
 //falta agregar filesystem
    break;

  case 'MEMORY':
    console.log('🍕Persistance with Memory');
    break;

  default:
    throw new Error('Invalid persistence type');
}

export default { MessagesDAO, CartDao, ProductsDAO, TicketsDAO,UsersDAO };