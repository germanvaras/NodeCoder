const mongoDbCartContainer = require('../db/cart.dao.js')
const cartSchema = require('../db/model/cart.js')
const cartDAO = new mongoDbCartContainer('cart', cartSchema)
const serviceGetCarts = async () => {
    let carts = await cartDAO.getCarts()
    return carts;
}
const serviceAddCart = async () => {
    let addCart = await cartDAO.createCart()
    return addCart;
}
const serviceGetProductsInCart = async (id) => {
    let getProducts = await cartDAO.getProductsInCart(id)
    return getProducts;
}
const serviceDeleteCart = async (id) => {
    let deleteProduct = await cartDAO.deletCartById(id)
    return deleteProduct;
}
const serviceAddCartProduct = async (id, product)=>{
    let addCartProduct = await cartDAO.addProductInCart(id, product)
    return addCartProduct
}
const serviceDeleteCartProduct = async (id, product)=>{
    let deleteCartProduct = await cartDAO.deleteProductInCart(id, product)
    return deleteCartProduct
}
module.exports = {serviceGetCarts, serviceAddCart, serviceGetProductsInCart, serviceDeleteCart, serviceAddCartProduct, serviceDeleteCartProduct}