const { Router } = require('express');
const productsRealTime = Router();

productsRealTime.get('/', (req,res)=>{
    res.render('realtimeProducts',{title:'Detail',style:"index.css"})
})

productsRealTime.post("/", async (req, res) => {
    require("../app").emitProducts(req.body);
    res.end();
  });
  
productsRealTime.delete("/:id", async (req, res) => {
    require("../app").emitDeleteProduct(req.params.id);
    res.end();
  });
module.exports = productsRealTime