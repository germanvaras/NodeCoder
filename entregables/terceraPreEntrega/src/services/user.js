const mongoDbUserContainer = require('../db/daos/user.dao.js')
const userSchema = require('../db/model/user.js')
const userDAO = new mongoDbUserContainer('user', userSchema)
const { serviceAddCart } = require("./cart")
const createUserService = async (user) => {
    const newCart = await serviceAddCart();
    const newUser = await userDAO.createUser(user, newCart._id
    );
    return newUser;
};
const getUserByEmail = async (email) => {
    const user = await userDAO.getUserByEmail(email);
    return user;
}
const loginUserService = async (user) => {
    const userInDB = await userDAO.findUser(user);
    return userInDB;
};

module.exports = { createUserService, loginUserService, getUserByEmail }