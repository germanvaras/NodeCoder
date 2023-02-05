//#region imports
const express = require("express");
require("dotenv").config();
const handlebars = require('express-handlebars');
const path = require("path");
//#endregion
const app = express();
const PORT = process.env.PORT || 4200;
const {Server} = require('socket.io')
const productsRouter = require('../routes/home');

//#region handlebars configuration
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, "/../views"))
app.set('view engine', 'handlebars');
//#endregion
//#region middleware configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/public")));
//#endregion
app.use("/api/products", productsRouter)
const httpServer = app.listen(PORT, ()=> console.log(`Server listening on port ${httpServer.address().port}`))
httpServer.on("error", error => console.log(error))
const io = new Server(httpServer)
io.on("connection", socket => {
    console.log("a user connected")
})
