const { Router } = require('express');
const productsRouter = Router();
const ProductManager = require("../src/ProductManager");
const manager = new ProductManager("./entregables/products.json");
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const allProduct = await manager.getProducts()
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
productsRouter.get('/:bid', async (req, res) => {
    try {
        const id = Number(req.params.bid)
        const productId = await manager.getById(id)
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
productsRouter.post('/add', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body
        const newProduct = {
            id: await manager.incrementableId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
        }
        await manager.addProduct(newProduct);
        res.send(`producto:${newProduct.title} agregado`)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})
productsRouter.put('/:bid', async (req,res) => {
    try {
        const id = Number(req.params.bid)
        const productUpdate = req.body
        await manager.updateProduct(id, productUpdate);
        res.send(`Producto con id: ${productUpdate.id} actualizado correctamente`)
    }
    catch (err) {
        req.status(500).send({error:err.message})
    }
})
productsRouter.delete('/:bid', async (req, res) => {
    try {
        const id = Number(req.params.bid)
        await manager.deleteById(id)
        res.send(`Producto con id: ${id} eliminado correctamente`)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})
module.exports = productsRouter