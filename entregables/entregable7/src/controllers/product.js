const {
    serviceAddProduct,
    serviceGetProducts,
    serviceGetProductById,
    serviceUpdateProduct,
    serviceDeleteById
} = require('../services/product.js')
const { getUserByEmail } = require("../services/user");
const getProducts = async (req, res) => {

    try {
        const products = await serviceGetProducts(req.query);
        let user = await getUserByEmail(req.session?.user?.email);
        const hasNextPage = products.hasNextPage
        const hasPrevPage = products.hasPrevPage
        const sort = products.sort
        const page = products.page
        const query = products.query
        const allCategories = products.docs.map(element => element.category);
        const categories = allCategories.filter((element, index, self) => self.indexOf(element) === index);
        res.render("homeProducts", {
            title: "Home", style: "index.css",
            products,
            hasPrevPage,
            hasNextPage,
            page,
            sort,
            query,
            categories,
            user
        });

    }
    catch (err) {
        res.status(500).send(err.message);
    }
}
const getProductById = async (req, res) => {
    const id = req.params.pid
    let product = await serviceGetProductById(id)
    let user = await getUserByEmail(req.session?.user?.email);
    res.render("detailProduct",
        {
            style: "index.css",
            title: "Detail",
            product,
            user
        });
}
const addProduct = async (req, res, next) => {
    try {
        const productAdded = await serviceAddProduct(req.body)
        if (!productAdded.error) {
            res.status(201).send({ status: "success", payload: `Producto: ${req.body.title} agregado ` })
        }
        else {
            throw new Error(JSON.stringify(productAdded.error))
        }
    }
    catch (error) {
        next(error)
    }
}

const updateProductById = async (req, res) => {
    const id = req.params.pid
    let updateProduct = await serviceUpdateProduct(id, req.body)
    res.send(updateProduct)
}
const deleteById = async (req, res) => {
    const id = req.params.pid
    let product = await serviceGetProductById(id)
    await serviceDeleteById(id);
    res.status(201).send({ status: "success", payload: ` Producto ${product.title} eliminado` });
}
const formCreate = async (req, res) => {
    let user = await getUserByEmail(req.session?.user?.email);
    const products = await serviceGetProducts(req.query);
    const hasNextPage = products.hasNextPage
    const hasPrevPage = products.hasPrevPage
    const page = products.page
    res.render("formCreate", { style: "index.css", title: "Form Create", products, user, page, hasPrevPage, hasNextPage })
}
module.exports = { addProduct, getProducts, getProductById, updateProductById, deleteById, formCreate };