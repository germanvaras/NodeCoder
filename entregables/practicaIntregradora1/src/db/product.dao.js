const mongoose = require('mongoose');
require("dotenv").config;
const conection = process.env.db
mongoose.connect(conection, error => {
    if (error) {
        console.log('Cannot connect to db')
        process.exit()
    }
})
class mongoDbProductContainer {
    constructor(collection, schema) {
        this.productCollection = mongoose.model(collection, schema)
    }
    async getProducts() {
        try {
            const allProducts = await this.productCollection.find().lean()
            return allProducts
        }
        catch (err) {
            return { error: err.message }
        }
    }
    async getById(id) {
        try {
            const product = await this.productCollection.findOne({ _id: id }).lean()
            if (!product) {
                return { error: `No existe un producto con el id: ${id}` }
            }
            return product
        }
        catch (err) {
            if (err.name === 'CastError') {
                return { error: `Id inválido: ${id}` }
            }
            return { error: err.message }
        }
    }
    async addProduct(product) {
        try {
            const newProduct = new this.productCollection(product)
            const validationError = newProduct.validateSync()
            if (validationError) {
                const errorMessages = []
                for (let errorField in validationError.errors) {
                    const errorMessage = validationError.errors[errorField].message
                    errorMessages.push(errorMessage)
                }
                return { error: errorMessages }
            }
            const createdProduct = await newProduct.save()
            return createdProduct
        } catch (err) {
            return { error: err.message }
        }
    }
    async updateProduct(id, product) {
        try {
            const updatedProduct = await this.productCollection.findOneAndUpdate(
                { _id: id },
                product,
                { new: true }
            )

            if (!updatedProduct) {
                return { error: `No existe producto con id: ${id}` }
            }
            return { Modificado: `El producto con el id: ${id} ha sido modificado correctamente` }
        } catch (err) {
            if (err.name === 'CastError') {
                return { error: `Id inválido: ${id}` }
            }
            return { error: err.message }
        }
    }
    async deleteById(id) {
        try {
            const deleteProduct = await this.productCollection.deleteOne({ _id: id })
            if (deleteProduct.deletedCount === 0) {
                return { error: `No existe producto con id:${id}` }
            }

            const deletedProduct = { Eliminado: `El producto con el id: ${id} ha sido elimnado correctamente` }
            return deletedProduct
        }
        catch (err) {
            if (err.name === 'CastError') {
                return { error: `Id inválido: ${id}` }
            }
            return { error: err.message }
        }
    }
}

module.exports = mongoDbProductContainer;