const mongoDbContainer = require('../../db/product.dao.js')
const productSchema = require('../../db/model/product.js')
const productDAO = new mongoDbContainer('products', productSchema)
const serviceAddProduct = async (product) => {
    let addProduct = await productDAO.addProduct(product)
    return addProduct;
}

const serviceGetProducts = async () => {
    let getProducts = await productDAO.getProducts()
    return getProducts;
}

const serviceGetById = async (id) => {
    let getById = await productDAO.getById(id)
    return getById;
}

// const updateProduct = async (id, product) => {
//     let serviceAddProduct = await productDAO.updateProduct(id, product)
// }

const serviceDeleteById = async (id) => {
    let deleteById = await productDAO.deleteById(id)
    return deleteById;
}
module.exports = {serviceAddProduct, serviceGetProducts, serviceGetById, serviceDeleteById}
