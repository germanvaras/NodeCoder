class UserDto {
    constructor(_id, name, lastname, username, email,  password, rol, cartId) {
        this._id = _id
        this.name = name;
        this.lastname = lastname;
        this.username =  username
        this.email = email;
        this.rol = rol;
        this.password = password
        this.cartId = cartId;
    }
}
module.exports = UserDto;