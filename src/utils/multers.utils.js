import multer from 'multer';
const pathname = new URL('../', import.meta.url)
import logger from '../utils/logger.js';

const path = pathname.pathname.slice(1, pathname.pathname.length)+'public/img'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path)
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const uploader = multer({
    storage,
    onError: function(err, next){
        logger.error(err);
        next()
    }
})

export default uploader