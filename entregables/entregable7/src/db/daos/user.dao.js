const User = require("../model/user")
const UserDTO = require("../DTOs/user")
const createUserDtoFromObject = (obj) => {
    if(!obj){
        return null
    }
    else{
        const {_id, name, lastname, username, email, password, rol, cartId} = obj;
        let userDto =  new UserDTO(_id, name, lastname,username, email, password, rol, cartId);
        return userDto
    } 
}
class UserDAO {
    async getUserByEmail(email) {
        const user = await User
            .findOne({ email: email})
            .lean();
        return createUserDtoFromObject(user);
    }
    async getUserByUsername(username) {
        const user = await User
            .findOne({ username: username})
            .lean();
        return createUserDtoFromObject(user);
    }
    async createUser(user, cid) {
        const newUser = await User.create({
            ...user,
            cartId: cid
        });
        return createUserDtoFromObject(newUser);
    }
    async findUser(user) {
        let existUser = await User.findOne({$or: [{ username: user.username }, { email: user.email },]});
        if (!existUser) return { status:"error", payload: "Usuario inexistente" };
        return createUserDtoFromObject(existUser);
    }
}

module.exports = UserDAO;