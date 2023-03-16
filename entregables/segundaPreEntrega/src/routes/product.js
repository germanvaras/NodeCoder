const { Router } = require('express');
const productsRouter = Router();
const {
    addProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteById,
    formCreate
} = require('../controllers/product.js');

productsRouter.get('/', getProducts)
productsRouter.get('/form', formCreate)
productsRouter.get('/:pid', getProductById)
productsRouter.post('/', addProduct)
productsRouter.put('/:pid', updateProductById)
productsRouter.delete('/:pid', deleteById)

module.exports = productsRouter