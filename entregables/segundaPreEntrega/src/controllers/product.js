const {
    serviceAddProduct,
    serviceGetProducts,
    serviceGetById,
    serviceUpdateProduct,
    serviceDeleteById
} = require('../services/product.js')
const getProducts = async (req, res) => {
    try {
        const products = await serviceGetProducts(req.query);
        const hasNextPage = products.hasNextPage
        const hasPrevPage = products.hasPrevPage
        console.log(hasNextPage)
        const page = products.page
        res.render("homeProducts",{title:"Home",style:"index.css", products, hasPrevPage,  hasNextPage, page})

    }
    catch (err) {
        res.status(500).send(err.message);
    }
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