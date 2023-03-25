const {
    serviceAddCart,
    serviceGetProductsInCart,
    serviceAddCartProduct,
    serviceDeleteProductsInCart,
    serviceGetCarts,
    serviceDeleteCartProduct,
    updateQuantityProductService
} = require('../services/cart')
const getCarts = async (req, res) => {
    const carts = await serviceGetCarts()
    res.send(carts)
}
const createCart = async (req, res) => {
    try {
        const cartAdded = await serviceAddCart();
        res.status(201).send(cartAdded);
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }
};

const getProductsInCart = async (req, res) => {
    const productsInCart = await serviceGetProductsInCart(req.params.cid)
    res.render("cart", { style: "index.css", title: "Cart", productsInCart })
}
const deleteProductsInCart = async (req, res) => {
    const cartEmpty = await serviceDeleteProductsInCart(req.params.cid)
    res.send(cartEmpty)
}
const addProductInCart = async (req, res) => {
    const addProduct = await serviceAddCartProduct(req.params)
    res.send(addProduct)
}
const deleteProductInCart = async (req, res) => {
    const deleteProduct = await serviceDeleteCartProduct(req.params)
    res.send(deleteProduct)
}
const updateQuantityProduct = async (req, res) => {
    const result = await updateQuantityProductService(req.params, req.body);
    res.send(result);
};
module.exports = { getCarts, createCart, getProductsInCart, deleteProductsInCart, addProductInCart, deleteProductInCart, updateQuantityProduct }