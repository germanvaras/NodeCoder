//#region imports
const express = require("express");
require("dotenv").config();
//#endregion
//#region declarations
const app = express();
const PORT = process.env.PORT || 4200;
const productsRouter = require('../routes/products');
const cartRouter = require('../routes/cart');
//#endregion
//#region middlewares
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//#endregion

const server = app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
server.on("error", error => console.log(error))