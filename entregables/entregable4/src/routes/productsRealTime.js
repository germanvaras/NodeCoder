const { Router } = require('express');
const productsRealTime = Router();
const {PORT} = require("../app")
productsRealTime.get('/', (req,res)=>{
    res.render('realtimeProducts',{title:'Real Time Products',style:"index.css", PORT})
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