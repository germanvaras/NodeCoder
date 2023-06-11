const User = require("../model/user")
const UserDTO = require("../DTOs/user")
const createUserDtoFromObject = (obj) => {
    if (!obj) {
        return null
    }
    else {
        const { _id, name, lastname, username, email, password, rol, cartId } = obj;
        let userDto = new UserDTO(_id, name, lastname, username, email, password, rol, cartId);
        return userDto
    }
}
class UserDAO {
    async getUserByEmail(email) {
        const user = await User
            .findOne({ email: email })
            .lean();
        return createUserDtoFromObject(user);
    }
    async getUserByUsername(username) {
        const user = await User
            .findOne({ username: username })
            .lean();
        return createUserDtoFromObject(user);
    }
    async getUserById(id) {
        const user = await User
        .findOne({ _id: id })
        .lean()
        return createUserDtoFromObject(user);
    }
    async findUser(user) {
        let existUser = await User.findOne({ $or: [{ username: user.username }, { email: user.email },] })
            .lean();
        return createUserDtoFromObject(existUser);
    }
    async updatePassword(userId, newPassword) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { password: newPassword },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error('Usuario Inexistente');
            }
            return updatedUser;
        } catch (error) {
            return { error: error.message };
        }
    }
    async updateRol(userId, newRol) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { rol: newRol },
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            return { error: error.message };
        }
    }
    async createUser(user, cid) {
        const newUser = await User.create({
            ...user,
            cartId: cid
        });
        return createUserDtoFromObject(newUser);
    }
    async deleteUser(uid) {
        const deleteUser = await User.deleteOne({_id: uid})
        return createUserDtoFromObject(deleteUser)
    }
}

module.exports = UserDAO;