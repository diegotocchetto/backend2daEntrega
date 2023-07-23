import express from 'express';
import passport from'passport';
export const sessionsRouter = express.Router();
import sessionsController from '../controllers/sessions.controller.js';

sessionsRouter.get('/login/github', sessionsController.renderGitHubLogin);
sessionsRouter.get('/githubcallback', sessionsController.handleGitHubCallback);
sessionsRouter.get('/show', sessionsController.renderSessionView);
sessionsRouter.get('/current', sessionsController.getCurrentUser);

export default sessionsRouter;