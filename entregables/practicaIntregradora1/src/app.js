const express = require ("express");
const app = express();
require("dotenv").config();
const path = require("path");
const handlebars = require('express-handlebars');

const PORT = process.env.PORT || 4200;
const productsRouter = require ('./routes/product');
const cartRouter = require('./routes/cart.js');

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, "/../views"))
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// server.use(express.static(path.join(__dirname, "/../public")));
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

app.get("/", (req, res) =>{
    res.send("Benvenue")
})
const server = app.listen(PORT, ()=> console.log(`Server listening on port ${server.address().port}`))
server.on("error", error => console.log(error))