const { Router } = require('express');
const productsRealTime = Router();

productsRealTime.get('/', (req,res)=>{
    res.render('realtimeProducts')
})
module.exports = productsRealTime