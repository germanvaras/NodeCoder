class UserDto {
    constructor(_id, name, lastname, email,age, password, rol, cartId) {
        this._id = _id
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.rol = rol;
        this.age = age
        this.password = password
        this.cartId = cartId;
    }
}
module.exports = UserDto;