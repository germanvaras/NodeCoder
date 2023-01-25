const {Router} = require('express');
const productsRouter = Router();
const ProductManager = require("../src/ProductManager");
const manager = new ProductManager("./entregables/products.json");
productsRouter.get('/', async (req, res) => {
    try{
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
    catch(e){
        res.status(500).send({error: e})
    }
})
productsRouter.get('/:bid', async (req, res) => {
    try {
        const id = Number(req.params.bid)
        const productId = await manager.getById(id)
        if (!productId) {
            res.status(400).send({status:"Not Found", error:"This id don't exist"})
        }
        else {
            res.send(productId)
        }
    }
    catch(err) {
        res.status(500).send({error: err})
    }
})
productsRouter.post('/add', async (req, res)=>{
    try{
        const newProduct = {
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            status: req.body.status,
            stock: req.body.stock,
            category:req.body.category,
            thumbnails:req.body.thumbnails
        }
        const productAdd = await manager.addProduct(newProduct);
        res.send(`producto:${productAdd.title} agregado`)
    }
    catch(err){
        res.status(500).send({error:err.message})
    }

})
module.exports = productsRouter