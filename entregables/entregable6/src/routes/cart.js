const { Router } = require('express');
const cartRouter = Router();
const isLogged = require('../middlewares/isLogged')
const {
    getCarts,
    createCart, 
    getProductsInCart, 
    deleteProductsInCart,
    addProductInCart,
    deleteProductInCart,
    updateQuantityProduct
} = require('../controllers/cart')
cartRouter.get('/',isLogged, getCarts)
cartRouter.post('/',isLogged, createCart)
cartRouter.get('/:cid',isLogged, getProductsInCart)
cartRouter.delete('/:cid',isLogged, deleteProductsInCart)
cartRouter.post('/:cid/product/:pid',isLogged, addProductInCart)
cartRouter.delete('/:cid/product/:pid',isLogged, deleteProductInCart)
cartRouter.put("/:cid/product/:pid",isLogged, updateQuantityProduct);

module.exports = cartRouter