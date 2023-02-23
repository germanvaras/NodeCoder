const mongoose = require('mongoose');
require("dotenv").config();
const conection = process.env.db
const mongoDbProductContainer = require('./product.dao')
const productSchema = require('./model/product')
const productDAO = new mongoDbProductContainer('products', productSchema)

mongoose.connect("mongodb+srv://gervaras97:JeW3nEpRCFwTxb2H@eccomerce.vfx9q1x.mongodb.net/?retryWrites=true&w=majority", error => {
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
            const cartId = await this.cartCollection.findOne({ _id: id }).populate("products.product")
            console.log(cartId)

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
                return { error: `No existe un cart con id: $id}` };
            }
            const productDetails = await productDAO.getById({_id: productId});

            if (!productDetails) {
                return { error: `No existe un producto con id: ${productId}` };
            }
        
            const productIndex = cart.products.findIndex(p => p.product === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += 1
            } else {
                cart.products.push(productId);

            }
            const updatedCart = await cart.save();
            return updatedCart.products;
            
        } catch (err) {
            return { error: err.message };
        }
    }
    

}

module.exports = mongoDbCartContainer;