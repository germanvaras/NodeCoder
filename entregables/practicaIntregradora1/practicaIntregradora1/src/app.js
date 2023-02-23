const express = require ("express");
const app = express();
require("dotenv").config();
const path = require("path");
const handlebars = require('express-handlebars');
const { Server } = require('socket.io')

const PORT = process.env.PORT || 4200;
const productsRouter = require ('./routes/product');
const cartRouter = require('./routes/cart.js');
const messageRouter = require('./routes/message.js');


app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, "/../views"))
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"/../public")));
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use("/api/chat", messageRouter)

app.get("/", (req, res) =>{
    res.send("Benvenue")
})
const httpServer = app.listen(PORT, ()=> console.log(`Server listening on port ${httpServer.address().port}`))
httpServer.on("error", error => console.log(error))

// socket connection, TODO: separar de app
const io = new Server(httpServer);
const { getMessages, addMessages } = require("./controllers/message");
const recoverMessages = async () => {
    const messages = await getMessages();
    return messages;
  };
  
  io.on("connection", async (socket) => {
    socket.emit("all messages", await recoverMessages());

  });
  module.exports = {
    httpServer,
    addMessages: async function (message) {
      await addMessages(message);
      io.emit("all messages", await recoverMessages());
    },
  };
  