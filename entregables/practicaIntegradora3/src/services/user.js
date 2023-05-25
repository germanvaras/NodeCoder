const UserRepository = require('../db/repositories/user')
const userRepository = new UserRepository()
const { serviceAddCart } = require("./cart")
const createUserService = async (user) => {
    const newCart = await serviceAddCart();
    const newUser = await userRepository.createUser(user, newCart._id
    );
    return newUser;
};
const getUserByEmail = async (email) => {
    const user = await userRepository.getUserByEmail(email);
    return user;
}
const getUserByUsername = async (username) => {
    const user = await userRepository.getUserByEmail(username);
    return user;
}
const getUserById = async (id) => {
    const user = await userRepository.getUserById(id);
    return user;
}
const loginUserService = async (user) => {
    const userInDB = await userRepository.findUser(user);
    return userInDB;
};
const existUserService = async (userBody) => {
    const user = await loginUserService(userBody);
    if (!user) {
        throw new Error("Usuario Inexistente");
    }
    else {
        return user
    }
}
const updatePasswordService = async (userId, newPassword) => {
    const updatedUser = await userRepository.updatePassword(userId, newPassword);
    return updatedUser
}
const updateRolService = async (userId, newRol) => {
    const updatedUser = await userRepository.updateRol(userId, newRol);
    return updatedUser
}

module.exports = { createUserService, loginUserService, getUserByEmail, getUserByUsername, updatePasswordService, existUserService, updateRolService, getUserById }