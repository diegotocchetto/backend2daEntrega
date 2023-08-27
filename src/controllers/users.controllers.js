import  {UserService} from '../services/users.service.js';
const userService = new UserService();
import logger from '../utils/logger.js';
import {sendMailRegister} from '../utils/mail.js';

export class UserController {
    async getAllUsers(req, res) {
        try {
           // const queryParams = req.query;
            const response = await userService.getAll();
            return res.status(200).json(response);
        } catch (error) {
            logger.error('Error retrieving users :', error);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    }

    async findUserByEmail(req, res) {
        try {
            const { pid } = req.params;
            const product = await userService.findUserByEmail(pid);
            return res.status(200).json({
                status: 'success',
                msg: 'producto',
                data: product,
            });
        } catch (error) {
            logger.error('Error retrieving users :', error);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    }
    
    async createUser(req, res) {
        try {
            const { firstName, lastName, email, age} = req.body;
            const userCreated = await userService.createOne(firstName, lastName, email, age);
            return res.status(201).json({
                status: 'success',
                msg: 'user created',
                data: userCreated,
            });
            sendMailRegister(email);
        } catch (error) {
            logger.error('Error retrieving creating users :', error);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :( ' ,
                data: {error},
            });
        }
    }
    
    async updateUser(req, res) {
        try {
          const { uid } = req.params;
          const { firstName, lastName, email,age} = req.body;
          const productUpdated= await userService.updateOne( {_id: uid}, firstName, lastName,email,age);
          return res.status(201).json({
            status: 'success',
            msg: 'user uptaded',
            data: {productUpdated},
          });
        } catch (e) {
            logger.error('Error retrieving updating users :', error);
          return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {e},
        });
    }
}

    
    async deleteUser(req, res) {
        try {
            const { uid } = req.params;
            const productDeleted = await userService.deleteOne(uid);
            return res.status(200).json({
                status: 'success',
                msg: 'user deleted',
                data: {},
            });
        } catch (error) {
            logger.error('Error retrieving deleting users :', error);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    }
}

export default UserController;