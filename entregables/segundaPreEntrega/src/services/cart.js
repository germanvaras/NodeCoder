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
const serviceDeleteProductsInCart = async (id) => {
    let deleteProduct = await cartDAO.deleteProductsInCart(id)
    return deleteProduct;
}
const serviceAddCartProduct = async ({ cid, pid })=>{
    let addCartProduct = await cartDAO.addProductInCart( cid, pid )
    return addCartProduct
}
const serviceDeleteCartProduct = async ({ cid, pid })=>{
    let deleteCartProduct = await cartDAO.deleteProductInCart( cid, pid )
    return deleteCartProduct
}
const updateQuantityProductService = async ( {cid, pid}, {quantity}) => {
    const result = await cartDAO.updateQuantityProduct(cid, pid, quantity);
    return result;
  };
module.exports = {serviceGetCarts, serviceAddCart, serviceGetProductsInCart, 
    serviceDeleteProductsInCart, serviceAddCartProduct, 
    serviceDeleteCartProduct, updateQuantityProductService}