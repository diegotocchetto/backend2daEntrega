import express from 'express';
const mailRoutes = express.Router();
import { isLogged, isUser } from '../middlewares/auth.js';
import mailController from '../controllers/mail.controller.js/index.js';

mailRoutes.get('/', checkLogin, isUser, mailController.getMail);
mailRoutes.post('/send', checkLogin, isUser, mailController.sendMail);

module.exports = mailRoutes;