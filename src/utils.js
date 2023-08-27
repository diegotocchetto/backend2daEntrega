import 'dotenv/config'
import logger from "./utils/logger.js";

//MULTER
import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });


//DIRNAME
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename= fileURLToPath(import.meta.url);

export const __dirname=dirname(__filename);



//CONECTION TO MONGO
import { connect } from "mongoose";
export async function connectMongo() {
    try {
      await connect(
        process.env.MONGOURL
      );
      //console.log("pluged to mongoCloud!");
      logger.info("pluged to mongoCloud!");
    } catch (e) {
      console.log(e);
      throw "can not connect to the db";
    }
  }

  //----------------bcrypt------------------------------
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);



//SOCKETS
import { Server } from 'socket.io';
import { messageModel } from './DAO/Mongo/models/messages.model.js';
export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);


socketServer.on('connection', async socket => {
  console.log('New client Connected', socket.id)



  socket.on('client:productDelete', async (pid, cid) => {
      const id = await manager.getProductById(parseInt(pid.id))

      if(id.id!=undefined) {
             await manager.deleteProduct(parseInt( pid.id ))
            const data = await manager.getProducts()
             return socketServer.emit('newList', data)
      }else{
            const dataError = {status: "error", message: id}
            return socket.emit('newList', dataError)
      }
  })


  socket.on('client:newProduct', async data => {

      const productAdd = await manager.addProduct(data)
      if(productAdd.status != 'error'){
          const newData = await manager.getProducts();
          return  socketServer.emit('server:productAdd', newData);
      }else{
           const dataError = {status: "error", message: productAdd.message}
           return socket.emit('server:productAdd', dataError)   
  } 
  })
})

socketServer.on('connection', (socket) => {
  socket.on('msg_front_to_back', async (msg) => {
    const msgCreated = await messageModel.create(msg);
    const msgs = await messageModel.find({});
    socketServer.emit('msg_back_to_front', msgs);
  });
});

}


export default __dirname;
