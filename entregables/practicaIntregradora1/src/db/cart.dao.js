const mongoose = require('mongoose');
require("dotenv").config();
const conection = process.env.db
const mongoDbProductContainer = require('./product.dao')
const productSchema = require('./model/product')
const productDAO = new mongoDbProductContainer('products', productSchema)

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
    async getCarts(){
        try{
            const carts = await this.cartCollection.find()
            return carts 
        }
        catch (err) {
            return { error: err.message }
        }
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
    async deletCartById(id){
        try {
            const cartId = await this.cartCollection.findOneAndRemove({ _id: id })
            if (!cartId) {
                return { error: `No existe un cart con id: ${id}` }
            }
            return {eliminado: `El cart con el id: ${id} ha sido eliminado correctamente`}
        }
        catch (err) {
            if (err.name === 'CastError') {
                return { error: `Id inválido: ${id}` }
            }
            return { error: err.message }
        }
    }
    async addProductInCart(id, productId) {
        try {
            
            const cart = await this.cartCollection.findOne({ _id: id });
            if (!cart) {
                return { error: `No existe un cart con id: ${id}` };
            }
            const productDetails = await productDAO.getById({_id: productId});
            if (!productDetails._id) {
                return { error: `No existe un producto con id: ${productId}` };
            }
            const productIndex = cart.products.findIndex(p => String(p.product) === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += 1
            } else {
                const newProduct = { product: productId}
                // el id que genera automaticamente es del objeto nuevo que se crea ? 
                cart.products.push(newProduct);
            }
            const updatedCart = await cart.save();
            return updatedCart.products;
            
        } catch (err) {
            return { error: err.message };
        }
    }
    async deleteProductInCart(id, productId) {
        try {
            
            const cart = await this.cartCollection.findOne({ _id: id });
            if (!cart) {
                return { error: `No existe un cart con id: ${id}` };
            }
            const productDetails = await productDAO.getById({_id: productId});
            console.log(productDetails)
            if (!productDetails._id) {
                return { error: `No existe un producto con id: ${productId}` };
            }
            const productIndex = cart.products.findIndex(p => String(p._id) === productId);
            console.log(productIndex)
            cart.products.splice(productIndex, 1);
            const updatedCart = await cart.save();
            return updatedCart.products;
            
        } catch (err) {
            return { error: err.message };
        }
    }
    

}

module.exports = mongoDbCartContainer;