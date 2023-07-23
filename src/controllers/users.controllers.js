import  {UserService} from '../services/users.service.js';
const userService = new UserService();

export class UserController {
    async getAllUsers(req, res) {
        try {
           // const queryParams = req.query;
            const response = await userService.getAll();
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
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
            console.log (pid)
            const product = await userService.findUserByEmail(pid);
            return res.status(200).json({
                status: 'success',
                msg: 'producto',
                data: product,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    }
    
    async createUser(req, res) {
        try {
            console.log("llega al controler create")
            const { firstName, lastName, email, age} = req.body;
            const userCreated = await userService.createOne(firstName, lastName, email, age);
            console.log("sale del usercreated al controler create")
            return res.status(201).json({
                status: 'success',
                msg: 'user created',
                data: userCreated,
            });
        } catch (error) {
            console.log(error);
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
          console.log(uid)
          console.log("llega al user controler")
          const productUpdated= await userService.updateOne( {_id: uid}, firstName, lastName,email,age);
          return res.status(201).json({
            status: 'success',
            msg: 'user uptaded',
            data: {productUpdated},
          });
        } catch (e) {
          console.log(e);
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
            console.log(error);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    }
}

export default UserController;