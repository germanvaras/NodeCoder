require("./db/daos/index");
const express = require("express");
const app = express();
const path = require("path");
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const initPassport = require("./config/passport");
const passport = require("passport");
const { getMockProducts } = require("../src/utils/mockingProducts")
const errorHandler = require("../src/middlewares/errorHandler")

const MONGO_URL = process.env.db
const secret = process.env.secret
const routes = require("./routes/index")
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
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/../public")));

initPassport();
app.use(passport.initialize());
app.use("", routes);
app.get("/", (req, res) => {
  res.redirect("api/products");
})
app.get("/mockingproducts", (req, res) => {
  res.send({ status: "success", payload: getMockProducts() });
});
app.use(errorHandler);  
module.exports = app;
