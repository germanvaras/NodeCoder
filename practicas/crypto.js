let crypto = require("crypto");
let usuario1 = {
    nombre: "nombre",
    password: "password"
}
let hash = crypto.createHash("sha256",usuario1.password)
.digest("hex")
console.log(hash)