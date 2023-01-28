const { Router } = require('express');
const productsRouter = Router();
const ProductManager = require("../src/ProductManager");
const managerProduct = new ProductManager("./entregables/products.json");
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const allProduct = await managerProduct.getProducts()
        if (!limit) {
            res.send(allProduct)
        }
        else {
            const limitProducts = allProduct.slice(0, limit)
            res.send(limitProducts)
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})
productsRouter.get('/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid)
        const productId = await managerProduct.getById(id)
        if (!productId) {
            res.status(400).send({ status: "Not Found", error: "This id don't exist" })
        }
        else {
            res.send(productId)
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})
productsRouter.post('/', async (req, res) => {
    try {
        const productAdd = await managerProduct.addProduct(req.body);
        if(productAdd === "Error"){
            res.send({error: "Faltan datos por completar"})
        }
        else{
            res.send(`producto:${req.body.title} agregado`)
        } 
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})
productsRouter.put('/:pid', async (req,res) => {
    try {
        const id = Number(req.params.pid)
        const productUpdate = req.body
        await managerProduct.updateProduct(id, productUpdate);
        res.send(`Producto con id: ${productUpdate.id} actualizado correctamente`)
    }
    catch (err) {
        req.status(500).send({error:err.message})
    }
})
productsRouter.delete('/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid)
        const deleteById = await managerProduct.deleteById(id)
        if(deleteById === 'Error'){
            res.status(404).send({error:`El producto con el id: ${id} no existe`})
        }
        else{
            res.send(`Producto con id: ${id} eliminado correctamente`)
        }
   
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})
module.exports = productsRouter