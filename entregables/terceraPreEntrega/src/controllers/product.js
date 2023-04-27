const {
    serviceAddProduct,
    serviceGetProducts,
    serviceGetById,
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
        res.render("homeProducts",{title:"Home",style:"index.css", 
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
    let product = await serviceGetById(id)
    let user = await getUserByEmail(req.session?.user?.email);
    res.render("detailProduct",
        {
            style: "index.css",
            title: "Detail",
            product,
            user
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
const formCreate = async(req, res) =>{
    let user = await getUserByEmail(req.session?.user?.email);
    const products = await serviceGetProducts(req.query);
    res.render("formCreate", {style:"index.css", title:"Form Create", products, user})
}
module.exports = { addProduct, getProducts, getProductById, updateProductById, deleteById, formCreate };