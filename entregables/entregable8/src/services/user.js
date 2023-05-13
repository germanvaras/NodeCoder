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
const loginUserService = async (user) => {
    const userInDB = await userRepository.findUser(user);
    return userInDB;
};

module.exports = { createUserService, loginUserService, getUserByEmail, getUserByUsername }