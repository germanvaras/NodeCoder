class UserDto {
    constructor(username, email, rol, cartId) {
        this.username = username;
        this.email = email;
        this.rol = rol;
        this.cartId = cartId;
    }
}
module.exports = UserDto;