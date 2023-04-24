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
    async getQuantityInCart(id) {
        try {
            const carts = await this.cartCollection.findOne({ _id: id })
            return carts.products
        }
        catch (err) {
            return { error: err.message }
        }
    }
    async getCartById(id) {
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
            const cartId = await this.cartCollection.findOne({ _id: id }).lean()
                .populate("products.product", {
                    description: 0,
                    code: 0,
                    status: 0
                })
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
            const cart = await this.cartCollection.create({});
            return cart;
        } catch (err) {
            return { error: err.message }
        }
    }
    async deleteProductsInCart(id) {
        try {
            const cartId = await this.cartCollection.findOne({ _id: id })
            if (!cartId) {
                return { error: `No existe un cart con id: ${id}` }
            }
            await this.cartCollection.updateOne({ _id: id }, { $set: { products: [] } })
            return { eliminado: `Los productos del carrito con id: ${id} han sido eliminados correctamente` }
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
            const productIndex = cart.products.findIndex(p => String(p.product) === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += 1
            } else {
                const newProduct = { product: productId }
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
            const productIndex = cart.products.findIndex(p => String(p.product) === productId);
            if (productIndex < 0) {
                return { error: `El producto con id: ${pid} no se encontró en el carrito` };
            }
            cart.products.splice(productIndex, 1);
            const updatedCart = await cart.save();
            return updatedCart.products;

        } catch (err) {
            return { error: err.message };
        }
    }
    async updateQuantityProduct(cid, pid, quantity) {
        try {
            const cart = await this.cartCollection.findOne({ _id: cid });
            if (!cart) {
                return { error: `No existe un carrito con id: ${cid}` };
            }

            const productIndex = cart.products.findIndex(p => String(p.product) === pid);

            if (productIndex < 0) {
                return { error: `El producto con id: ${pid} no se encontró en el carrito` };
            }

            if (quantity === 0) {
                cart.products.splice(productIndex, 1);

            } else {
                cart.products[productIndex].quantity = quantity;
            }
            const updatedCart = await cart.save();
            return updatedCart.products;
        } catch (err) {
            return { error: err.message };
        }
    }
}

module.exports = mongoDbCartContainer;