const {
    serviceAddProduct,
    serviceGetProducts,
    serviceGetById,
    serviceUpdateProduct,
    serviceDeleteById
} = require('../services/product.js')
const getProducts = async (req, res) => {
    let products = await serviceGetProducts();
    res.render('homeProducts', {
        style: "index.css",
        title: "Home",
        products
    });

}

const getProductById = async (req, res) => {
    const id = req.params.pid
    let product = await serviceGetById(id)
    res.render("detailProduct",
        {
            style: "index.css",
            title: "Detail",
            product
        });
}

const addProduct = async (req, res) => {
    const productAdded = await serviceAddProduct(req.body)
    res.send(productAdded)
}

const updateProductById = async (req, res) => {
    const id = req.params.pid
    let updateProduct = await serviceUpdateProduct(id, req.body)
    res.send(updateProduct)
}
const deleteById = async (req, res) => {
    const id = req.params.pid
    const deletedProduct = await serviceDeleteById(id);
    res.send(deletedProduct);
}
module.exports = { addProduct, getProducts, getProductById, updateProductById, deleteById };