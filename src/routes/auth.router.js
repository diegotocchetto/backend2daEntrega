import express from 'express';
export const authRouter = express.Router();
import { isUser, isAdmin } from '../middlewares/auth.js';
import passport from 'passport';
import authController from '../controllers/auth.controller.js';

authRouter.get('/session', authController.renderSessionView);
authRouter.get('/login', authController.renderLoginView);
authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), authController.handleLogin);
authRouter.get('/faillogin', authController.renderFailLoginView);
authRouter.get('/register', authController.renderRegisterView);
authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), authController.handleRegister);
authRouter.get('/failregister', authController.renderFailRegisterView);
authRouter.get('/products', authController.renderProductsView);
authRouter.get('/profile', isUser, authController.renderProfileView);
authRouter.get('/logout', authController.handleLogout);
authRouter.get('/administration', isUser, isAdmin, authController.renderAdministrationView);
authRouter.get('/current', isUser, isAdmin, authController.renderAdministrationView);
authRouter.get( "/github",passport.authenticate("github", { scope: ["user:email"] })
);

export default authRouter;