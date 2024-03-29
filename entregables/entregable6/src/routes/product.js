const { Router } = require('express');
const productsRouter = Router();
const isAdmin = require('../middlewares/isAdmin')
const isLogged = require('../middlewares/isLogged')
const {
    addProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteById,
    formCreate
} = require('../controllers/product.js');

productsRouter.get('/', isLogged, getProducts)
productsRouter.get('/form',isAdmin, formCreate)
productsRouter.get('/:pid',isLogged, getProductById)
productsRouter.post('/' ,isAdmin, addProduct)
productsRouter.put('/:pid',isAdmin, updateProductById)
productsRouter.delete('/:pid',isAdmin, deleteById)

module.exports = productsRouter