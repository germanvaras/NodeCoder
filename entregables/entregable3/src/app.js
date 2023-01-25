//#region imports
const express = require("express");
const ProductManager = require("./ProductManager");
require("dotenv").config();
//#endregion
//#region declarations
const app = express();
const manager = new ProductManager("./entregables/products.json");
const PORT = process.env.PORT || 4200;
//#endregion
//#region middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//#endregion
app.get('/', (_req, res) => {
    res.send("Bienvenido a la Página de Inicio")
})
app.get('/products', async (req, res) => {
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
app.get('/product/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid)
        const productId = await manager.getById(id)
        if (!productId) {
            res.status(400).send({status:"Not Found", error:"This id don't exist"})
        }
        else {
            res.send(productId)
        }
    }
    catch(e) {
        res.status(500).send({error: e})
    }

})
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
server.on("error", error => console.log(error));