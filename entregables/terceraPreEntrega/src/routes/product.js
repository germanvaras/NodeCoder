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
productsRouter.post('/form', isAdmin, addProduct)
productsRouter.delete('/form/:pid',isAdmin, deleteById)
productsRouter.get('/:pid',isLogged, getProductById)
productsRouter.put('/:pid',isAdmin, updateProductById)


module.exports = productsRouter