const { Router } = require('express');
const messageRouter = Router();
const { addMessages} =  require('../controllers/message')
const isLogged = require('../middlewares/isLogged')
messageRouter.get("/",isLogged, async (req, res) => {
    try {
      res.render("chat", {
        style: "index.css",
        title: "Chat",
      });
    } catch (error) {
      res.send({ status: "error", error: error.message });
    }
  });
  messageRouter.post("/",isLogged, async (req, res) => {
      await require("../app").addMessages(req.body);
      res.send(await addMessages())
  
  });
  
  module.exports = messageRouter;