const {
    serviceAddCart,
    serviceGetProductsInCart,
    serviceAddCartProduct,
} = require('../services/cart')

const createCart = async (req, res) => {
    const cartAdded = await serviceAddCart()
    res.send(cartAdded)
}
const getProductsInCart = async (req, res) => {
    const productInCart = await serviceGetProductsInCart(req.params.cid)
    res.send(productInCart)
}
const addProductInCart = async(req,res) => {
    const addProduct = await serviceAddCartProduct(req.params.cid, req.params.pid)
    res.send(addProduct)
}
module.exports = { createCart, getProductsInCart, addProductInCart}