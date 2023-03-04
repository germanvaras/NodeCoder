const mongoDbProductContainer = require('../db/product.dao')
const productSchema = require('../db/model/product.js')
const productDAO = new mongoDbProductContainer('products', productSchema)

const serviceGetProducts = async () => {
    let getProducts = await productDAO.getProducts()
    return getProducts;
}
const serviceGetById = async (id) => {
    let getById = await productDAO.getById(id)
    return getById;
}
const serviceAddProduct = async (product) => {
    let addProduct = await productDAO.addProduct(product)
    return addProduct;
}
const serviceUpdateProduct = async (id, product) => {
    let serviceAddProduct = await productDAO.updateProduct(id, product)
    return serviceAddProduct;
}
const serviceDeleteById = async (id) => {
    let deleteById = await productDAO.deleteById(id)
    return deleteById;
}
module.exports = {serviceAddProduct, serviceGetProducts, serviceGetById,serviceUpdateProduct, serviceDeleteById}
