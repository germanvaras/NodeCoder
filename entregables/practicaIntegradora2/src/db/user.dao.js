const mongoose = require("mongoose");
class UserDAO {
    constructor(collection, schema) {
        this.userCollection = mongoose.model(collection, schema);
    }
    async getUserByEmail(email) {
        const user = await this.userCollection
            .findOne({ email: email})
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
        let existUser = await this.userCollection.findOne({ email: user.email });
        if (!existUser) return { status:"error", payload: "Usuario inexistente" };
        return existUser;
    }
}

module.exports = UserDAO;