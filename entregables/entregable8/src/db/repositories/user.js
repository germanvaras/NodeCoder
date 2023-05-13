const UserDAO = require('../daos/user.dao')
const userDAO = new UserDAO()
    class UserRepository {
        createUser = async (user, cartId) => {
            const newUser = await userDAO.createUser(user, cartId);
            return newUser;
        };
        getUserByEmail = async (email) => {
            const user = await userDAO.getUserByEmail(email);
            return user;
        }
        getUserByUsername = async (username) => {
            const user = await userDAO.getUserByUsername(username);
            return user;
        }
        findUser = async (user) => {
            const userInDB = await userDAO.findUser(user);
            return userInDB;
        };
    }


module.exports = UserRepository