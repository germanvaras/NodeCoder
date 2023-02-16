const mongoose = require ('mongoose');
require("dotenv").config();
const conection = process.env.db
mongoose.connect( conection, error => {
    if(error){
        console.log('Cannot connect to db')
        process.exit()
    }
})
class mongoDbContainer {

    constructor(collection, schema){
        this.productCollection = mongoose.model(collection, schema)
    }
    async addProduct(product) {
        try {
            if (product.title && product.description && product.code && product.price && product.status && product.stock && product.category) {
                const newProduct = {
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    status: true,
                    category: product.category,
                    thumbnails: product.thumbnails
                }
                this.productCollection.create({ ...newProduct })
                return newProduct;
            }
            else {
                return "Error"
            }
        } catch (err) {
            return { error: err.message }
        }
    }
    async getProducts() {
        try {
            const allProducts = await this.productCollection.find()
            return allProducts
        }
        catch (err) {
            return { error: err.message }
        }
    }
    async getById(id) {
        try {
            const productId = await this.productCollection.findOne({ id: id })
            return productId
        }
        catch (err) {
            return { error: err.message }
        }
    }
    // async updateProduct(id, product) {
    //     try {
    //         const dataParse = await this.getProducts()
    //         const position = dataParse.findIndex((productId) => productId.id === id)
    //         product.id = id
    //         dataParse.splice(position, 1, product)
    //         await fs.promises.writeFile(this.file, JSON.stringify(dataParse, null, 2))
    //     }
    //     catch (err) {
    //         return { error: err.message }
    //     }
    // }
    async deleteById(id) {
        try {
            const deleteProduct = await this.productCollection.deleteOne({ id: id })
            return `Product with id ${deleteProduct.id}`
        }
        catch (err) {
            return { error: err.message }
        }
    }
}

module.exports = mongoDbContainer;