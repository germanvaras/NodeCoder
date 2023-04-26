const { Router } = require('express');
const messageRouter = Router();
const { addMessages, getAllMessages} =  require('../controllers/message')
const isLogged = require('../middlewares/isLogged')
messageRouter.get("/",isLogged, getAllMessages)
messageRouter.post("/",isLogged, addMessages)  
module.exports = messageRouter;