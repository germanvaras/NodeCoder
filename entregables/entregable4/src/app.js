const express = require("express");
require("dotenv").config();
const handlebars = require('express-handlebars');
const path = require("path");
const {Server} = require("socket.io");
const { getProducts, addProduct, deleteById } = require('./productManager');
const productRouter = require('./routes/product');
const productsRealTime = require('./routes/productsRealTime');
const server = express();
const PORT = process.env.PORT || 4200;
let products = [];
(async () =>{
    products = await getProducts();
})();

server.engine('handlebars', handlebars.engine())
server.set('views', path.join(__dirname, "/../views"))
server.set('view engine', 'handlebars');

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, "/../public")));

server.use('/api/product', productRouter)
server.use('/api/products', productsRealTime)

server.get('/', async (req, res) => {
    res.render('home', { products, title:"Home", style: 'index.css',PORT})
})

const httpServer = server.listen(PORT, () => console.log(`Server listening on port ${httpServer.address().port}`))
httpServer.on("error", error => console.log(error))

const io = new Server(httpServer)
io.on("connection", socket => {
    console.log("a user connected")
    socket.emit("all products", products);
})
module.exports = {
    PORT,
    httpServer,
    emitProducts: async (product)=>{
      await addProduct(product);
    },
    emitDeleteProduct: async (id) => {
      await deleteById(id);
    }
}
