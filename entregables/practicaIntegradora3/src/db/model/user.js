const mongoose = require("mongoose");
const { createHash } = require("../../utils/hashPassword");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El campo nombre es requerido"],
    },
    lastname: {
        type: String,
        required: [true, "El campo apellido es requerido"],
    },
    username: {
        type: String,
        required: [true, "El campo username es requerido"],
    },
    email:{
        type: String,
        unique: [true, "Este mail ya existe"],
        required: [true, "El campo email es requerido"],
    },
    password: {type: String},
    rol: {
        type: String,
        enum: ['admin', 'premium', 'user'],
        default: "user",
    },
    cartId: {
        type: String,
    },
})
userSchema.pre("save", function (next) {
    const user = this;
    if (user.email === process.env.adminUser &&
        user.password === process.env.adminPassword) {
        user.rol = "admin";
    }
    user.password = createHash(this.password);
    next();
});
const User = mongoose.model('user', userSchema);
module.exports = User