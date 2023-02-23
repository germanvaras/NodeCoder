const mongoDbCartContainer = require('../../db/cart.dao.js')
const cartSchema = require('../../db/model/cart.js')
const cartDAO = new mongoDbCartContainer('cart', cartSchema)

const serviceAddCart = async () => {
    let addCart = await cartDAO.createCart()
    return addCart;
}
const serviceGetProductsInCart = async (id) => {
    let getProducts = await cartDAO.getProductsInCart(id)
    return getProducts;
}
const serviceAddCartProduct = async (id, product)=>{
    let addCartProduct = await cartDAO.addProductInCart(id, product)
    return addCartProduct
}
module.exports = {serviceAddCart, serviceGetProductsInCart,serviceAddCartProduct}