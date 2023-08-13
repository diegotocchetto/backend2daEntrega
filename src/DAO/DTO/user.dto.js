export class UserDTO{
    constructor(user){
        this.name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.role = user.role;
        this.cartID = user.cartID;
    };
};

export default UserDTO;