const User = require("../model/user")
const UserDTO = require("../DTOs/user")
const createUserDtoFromObject = (obj) => {
    const {_id, name, lastname, email, age, password, rol, cartId} = obj;
    let userDto =  new UserDTO(_id, name, lastname, email, age, password, rol, cartId);
    return userDto
}
class UserDAO {
    async getUserByEmail(email) {
        const user = await User
            .findOne({ email: email})
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
        let existUser = await User.findOne({ email: user.email });
        if (!existUser) return { status:"error", payload: "Usuario inexistente" };
        return createUserDtoFromObject(existUser);
    }
}

module.exports = UserDAO;