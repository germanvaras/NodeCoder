const mongoDbCartContainer = require('../../db/cart.dao.js')
const mongoProductContainer = require('../../db/product.dao.js')
const cartSchema = require('../../db/model/cart.js')
const productSchema = require('../../db/model/product.js')
const cartDAO = new mongoDbCartContainer('cart', cartSchema)
const productDAO = new mongoProductContainer('product',productSchema)

const serviceAddCart = async () => {
    let addCart = await cartDAO.createCart()
    return addCart;
}
const serviceGetProductsInCart = async (id) => {
    let getProducts = await cartDAO.getProductsInCart(id)
    return getProducts;
}
const serviceAddCartProduct = async (id, product)=>{
    let cartId = await cartDAO.getCartById(id)
    let productId = await productDAO.getById(product)
    let addCartProduct = await cartDAO.addProductInCart(cartId, productId)
    return addCartProduct


}
module.exports = {serviceAddCart, serviceGetProductsInCart,serviceAddCartProduct}