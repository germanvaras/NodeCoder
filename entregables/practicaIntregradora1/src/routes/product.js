const { Router } = require('express');
const productsRouter = Router();
const {
    addProduct,
    getProducts,
    getProductsById,
    deleteById
} = require('../controllers/product.js');

productsRouter.get('/', getProducts)
productsRouter.get('/:pid', getProductsById)
productsRouter.post('/', addProduct)
productsRouter.delete('/:pid', deleteById)
module.exports = productsRouter