const { Router } = require('express');
const cartRouter = Router();
const {
    createCart, 
    getProductsInCart, 
    addProductInCart} = require('../controllers/cart')
cartRouter.post('/', createCart)
cartRouter.get('/:cid', getProductsInCart)
cartRouter.post('/:cid/product/:pid', addProductInCart)

module.exports = cartRouter