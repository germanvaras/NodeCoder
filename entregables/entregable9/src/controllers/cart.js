const {
    serviceAddCart,
    serviceGetProductsInCart,
    serviceAddCartProduct,
    serviceDeleteProductsInCart,
    serviceQuantityInCart,
    serviceDeleteCartProduct,
    serviceUpdateQuantityProduct
} = require('../services/cart')
const {
    serviceGetProductById
} = require('../services/product')
const { getUserByEmail } = require("../services/user");
const getQuantityInCart = async (req, res) => {
    const productsInCart = await serviceQuantityInCart(req.params.cid)
    res.send(productsInCart)
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
    let user = await getUserByEmail(req.session?.user?.email);
    res.render("cart", { style: "index.css", title: "Cart", productsInCart, user})
}
const deleteProductsInCart = async (req, res) => {
    const cartEmpty = await serviceDeleteProductsInCart(req.params.cid)
    res.send(cartEmpty)
}
const addProductInCart = async (req, res, next) => {
    try{
        let user = await getUserByEmail(req.session?.user?.email);
        const product = await serviceGetProductById(req.params.pid)
        const owner = user.email === product.owner
        if(owner || user.rol === "user"){
                const addProduct = await serviceAddCartProduct(req.params.cid, req.params.pid)
                res.send({status:"success", payload:`Producto agregado al carrito`, addProduct})
        }
        else{
            throw new Error("No posee la autorización para realizar esta acción");
        }
    }catch(error){
        next(error)
    }  
}
const deleteProductInCart = async (req, res) => {
    const deleteProduct = await serviceDeleteCartProduct(req.params.cid, req.params.pid)
    res.send(deleteProduct)
}
const updateQuantityProduct = async (req, res) => {
    const result = await serviceUpdateQuantityProduct(req.params, req.body);
    res.send(result);
};

module.exports = { getQuantityInCart, createCart, getProductsInCart, deleteProductsInCart, addProductInCart, deleteProductInCart, updateQuantityProduct }