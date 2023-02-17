const mongoose = require('mongoose');
require("dotenv").config();
const conection = process.env.db
mongoose.connect(conection, error => {
    if (error) {
        console.log('Cannot connect to db')
        process.exit()
    }
})
class mongoDbCartContainer {
    constructor(collection, schema) {
        this.cartCollection = mongoose.model(collection, schema)
    }
    async getCartById(id){
        try {
            const cartId = await this.cartCollection.findOne({ _id: id })
            if (!cartId) {
                return { error: `No existe un cart con id: ${id}` }
            }
            return cartId._id
        }
        catch (err) {
            if (err.name === 'CastError') {
                return { error: `Id inválido: ${id}` }
            }
            return { error: err.message }
        }
    }
    async getProductsInCart(id) {
        try {
            const cartId = await this.cartCollection.findOne({ _id: id })
            if (!cartId) {
                return { error: `No existe un cart con id: ${id}` }
            }
            const products = cartId.products
            return products
        }
        catch (err) {
            if (err.name === 'CastError') {
                return { error: `Id inválido: ${id}` }
            }
            return { error: err.message }
        }
    }
    async createCart() {
        try {
            const cart = new this.cartCollection()
            const cartAdded = cart.save()
            return cartAdded
        } catch (err) {
            return { error: err.message }
        }
    }
    
    async addProductInCart(id, productId) {
        try {
            const cart = await this.cartCollection.findOne({ _id: id });
            if (!cart) {
                return { error: `No existe un cart con id: ${id}` };
            }
            const productDetails = await this.cartCollection.findOne({_id: productId.id});
            if (!productDetails) {
                return { error: `No existe un producto con id: ${productId}` };
            }
            const productIndex = cart.products.findIndex(p => p.product === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += productId.quantity;
            } else {
                cart.products.push({
                    product: productId,
                    quantity: productId.quantity
                });
            }
            const updatedCart = await cart.save();
            return updatedCart.products;
            
        } catch (err) {
            return { error: err.message };
        }
    }
    

}

module.exports = mongoDbCartContainer;