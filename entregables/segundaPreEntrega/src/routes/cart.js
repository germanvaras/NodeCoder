const { Router } = require('express');
const cartRouter = Router();
const {
    getCarts,
    createCart, 
    getProductsInCart, 
    deleteCart,
    addProductInCart,
    deleteProductInCart
} = require('../controllers/cart')
cartRouter.get('/', getCarts)
cartRouter.post('/', createCart)
cartRouter.get('/:cid', getProductsInCart)
cartRouter.delete('/:cid', deleteCart)
cartRouter.post('/:cid/product/:pid', addProductInCart)
cartRouter.delete('/:cid/product/:pid', deleteProductInCart)

module.exports = cartRouter