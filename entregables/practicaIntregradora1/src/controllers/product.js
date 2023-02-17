const {
    serviceAddProduct,
    serviceGetProducts,
    serviceGetById,
    serviceUpdateProduct,
    serviceDeleteById
} = require('../services/product.js')
const getProducts = async (req, res) => {
    const { limit } = req.query
    let responseProducts = await serviceGetProducts();
    if (!limit) {
        res.send(responseProducts);
    }
    else {
        const limitProducts = responseProducts.slice(0, limit)
        res.send(limitProducts)
    }
}
const getProductById = async (req, res) => {
    const id = req.params.pid
    let responseProduct = await serviceGetById(id)
    res.send(responseProduct);
}

const addProduct = async (req, res) => {
    const productAdded = await serviceAddProduct(req.body)
    res.send(productAdded)
}

const updateProductById = async (req, res) => {
    const id = req.params.pid
    let updateProduct = await serviceUpdateProduct(id, req.body)
    res.send(updateProduct)
}
const deleteById = async (req, res) => {
    const id = req.params.pid
    const deletedProduct = await serviceDeleteById(id);
    res.send(deletedProduct);
}
module.exports = { addProduct, getProducts,getProductById, updateProductById, deleteById};