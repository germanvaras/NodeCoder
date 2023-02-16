const {
    serviceAddProduct,
    serviceGetProducts,
    serviceGetById,
    serviceDeleteById
} = require('../services/product.js')

const addProduct = async (req, res) => {
    let productAdded = await serviceAddProduct(req.body)
    res.send('Product added successfully')
}
const getProducts = async (req, res) => {
    const { limit } = req.query
    let response = await serviceGetProducts();
    if (!limit) {
        res.send(response);
    }
    else {
        const limitProducts = response.slice(0, limit)
        res.send(limitProducts)
    }
}
const getById = async (req, res) => {
    let response = await serviceGetById(req.params.id)
    res.send(response);
}
const deleteById = async (req, res) => {
    let productRemoved = await serviceDeleteById(req.params.id);
    res.send('Product removed successfully');
}
module.exports = { addProduct, getProducts, getById, deleteById};