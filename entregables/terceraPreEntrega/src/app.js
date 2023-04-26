require("./db/daos/index");
const express = require ("express");
const app = express();
require("dotenv").config();
const path = require("path");
const handlebars = require('express-handlebars');
const { Server } = require('socket.io')
const MongoStore = require('connect-mongo');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const initPassport = require("./config/passport");
const passport = require("passport");
initPassport();
app.use(passport.initialize());

const PORT = process.env.PORT || 4200;
const MONGO_URL = process.env.db
const secret = process.env.secret
const productsRouter = require ('./routes/product');
const cartRouter = require('./routes/cart.js');
const messageRouter = require('./routes/message.js');
const userRouter = require('./routes/user.js');

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useUnifiedTopology: true },
    }),
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser("sublimeTienda"));
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, "/../views"))
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"/../public")));

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use("/api/chat", messageRouter)
app.use("/api/user", userRouter)

initPassport();
app.use(passport.initialize());

app.get("/", (req, res) =>{
    res.redirect("api/products");
})
const httpServer = app.listen(PORT, ()=> console.log(`Server listening on port ${httpServer.address().port}`))
httpServer.on("error", error => console.log(error))

// socket connection, TODO: separar de app
const io = new Server(httpServer);
const { getMessagesServices, addMessageServices } = require("./services/message");
const recoverMessages = async () => {
    const messages = await getMessagesServices();
    return messages;
  };
  
  io.on("connection", async (socket) => {
    socket.emit("all messages", await recoverMessages());

  });
  module.exports = {
    httpServer,
    addMessages: async function (message) {
      await addMessageServices(message);
      io.emit("all messages", await recoverMessages());
    },
};
  