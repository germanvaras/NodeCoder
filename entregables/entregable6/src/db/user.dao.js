const mongoose = require("mongoose");
class UserDAO {
    constructor(collection, schema) {
        this.userCollection = mongoose.model(collection, schema);
    }
    async getUserByUsername(username) {
        const user = await this.userCollection
            .findOne({ username: username })
            .lean();
        return user;
    }
    async createUser(user, cid) {
        const newUser = await this.userCollection.create({
            ...user,
            cartId: cid
        });
        return newUser;
    }
    async findUser(user) {
        let existUser = await this.userCollection.findOne({ username: user.username });
        if (!existUser) return { Error: "Usuario inexistente" };
        return existUser;
    }
}

module.exports = UserDAO;