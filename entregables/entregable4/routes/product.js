const { Router } = require('express');
const productRouter = Router();
const {getById} = require('../src/productManager')
productRouter.get("/:pid", async (req, res) => {
    const id = Number(req.params.pid)
    const product = await getById(id)
    if (!product) {
        res.status(400).render('detail',{ status: "Not Found", error: "This id don't exist" })
    }
    else {
        res.render('detail',{product: product})
    }
})
module.exports = productRouter