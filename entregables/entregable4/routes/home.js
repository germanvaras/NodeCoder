const { Router } = require('express');
const homeRouter = Router();
const ProductManager = require("../src/ProductManager");

const managerProduct = new ProductManager("./entregables/products.json")
homeRouter.get("/", async (req, res) => {
    const products = await managerProduct.getProducts()
    res.render('home', {products:products})
})
homeRouter.get("/detail/:pid", async (req, res) => {
    const id = Number(req.params.pid)
    const productId = await managerProduct.getById(id)
    if (!productId) {
        res.status(400).render('detail',{ status: "Not Found", error: "This id don't exist" })
    }
    else {
        res.render('detail',{productId: productId})
    }
})
module.exports = homeRouter