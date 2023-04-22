const mongoDbUserContainer = require('../db/user.dao.js')
const userSchema = require('../db/model/user.js')
const userDAO = new mongoDbUserContainer('user', userSchema)
const { serviceAddCart } = require("./cart")
const createUserService = async (user) => {
    const newCart = await serviceAddCart();
    const newUser = await userDAO.createUser(user, newCart._id
    );
    return newUser;
};
const getUserByUsername = async (username) => {
    const user = await userDAO.getUserByUsername(username);
    return user;
};
const getUserByEmail = async (email) => {
    const user = await userDAO.getUserByEmail(email);
    return user;
}
const loginUserService = async (user) => {
    const userInDB = await userDAO.findUser(user);
    return userInDB;
};

module.exports = { createUserService, getUserByUsername, loginUserService, getUserByEmail }