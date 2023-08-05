//@ts-check

import express from "express";
import { UserController } from "../controllers/users.controllers.js";

const usersController = new UserController();

export const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:uid', usersController.updateUser);
usersRouter.delete('/:uid', usersController.deleteUser);






