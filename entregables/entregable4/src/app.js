const express = require("express");
require("dotenv").config();
const handlebars = require('express-handlebars');
const path = require("path");
const { Server } = require('socket.io')
const { getProducts } = require('./productManager')
const productRouter = require('../routes/product');
const productsRealTime = require('../routes/productsRealTime');
const app = express();
const PORT = process.env.PORT || 4200;
let products = [];
(async function () {
    products = await getProducts();
})();
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, "/../views"))
app.set('view engine', 'handlebars');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/../public")));
app.use('/api/product', productRouter)
app.use('/api/products', productsRealTime)

app.get('/', async (req, res) => {
    res.render('home', { products: products })
})

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${httpServer.address().port}`))
httpServer.on("error", error => console.log(error))

const io = new Server(httpServer)
io.on("connection", socket => {
    console.log("a user connected")
    socket.emit("all products", products);
})
