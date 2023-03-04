const { Router } = require('express');
const productsRouter = Router();
const {
    addProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteById
} = require('../controllers/product.js');

productsRouter.get('/', getProducts)
productsRouter.get('/:pid', getProductById)
productsRouter.post('/', addProduct)
productsRouter.put('/:pid', updateProductById)
productsRouter.delete('/:pid', deleteById)
module.exports = productsRouter