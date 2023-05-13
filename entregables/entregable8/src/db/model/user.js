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
        default: "user",
    },
    cartId: {
        type: String,
    },
})
userSchema.pre("save", function (next) {
    const user = this;
    if (user.email === "adminCoder@coder.com" &&
        user.password === "adminCod3r123") {
        user.rol = "admin";
    }
    user.password = createHash(this.password);
    next();
});
const User = mongoose.model('user', userSchema);
module.exports = User