const mongoose = require("mongoose");
const { createHash } = require("../../utils/hashPassword");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Este usuario ya existe"],
        required: [true, "El campo usuario es requerido"],
    },
    email: {
        type: String,
        unique: [true, "Este mail ya existe"],
        required: [true, "El campo email es requerido"],
    },
    password: { type: String, required: [true, "Ingresa un password"] },
    rol: {
        type: String,
        default: "usuario",
    },
    // cartId: {
    //     type: String,
    // },
})
userSchema.pre("save", function (next) {
    const user = this;
    console.log(this)
    if (user.email === "adminCoder@coder.com" &&
        user.password === "adminCod3r123") {
        user.rol = "admin";
    }
    user.password = createHash(this.password);
    next();
});
module.exports = userSchema