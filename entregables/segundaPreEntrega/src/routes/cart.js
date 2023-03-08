const { Router } = require('express');
const cartRouter = Router();
const {
    getCarts,
    createCart, 
    getProductsInCart, 
    deleteProductsInCart,
    addProductInCart,
    deleteProductInCart,
    updateQuantityProduct
} = require('../controllers/cart')
cartRouter.get('/', getCarts)
cartRouter.post('/', createCart)
cartRouter.get('/:cid', getProductsInCart)
cartRouter.delete('/:cid', deleteProductsInCart)
cartRouter.post('/:cid/product/:pid', addProductInCart)
cartRouter.delete('/:cid/product/:pid', deleteProductInCart)
cartRouter.put("/:cid/product/:pid", updateQuantityProduct);

module.exports = cartRouter