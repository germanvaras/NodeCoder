const { Router } = require('express');
const userRouter = Router();
const passport = require("passport");
const {
    loginUserForm,
    loginUser,
    formRegisterUser,
    createUser,
    logoutUser,
} = require("../controllers/user.js")
userRouter.get("/login", loginUserForm);
userRouter.post("/login", loginUser);
userRouter.get("/register", formRegisterUser);
userRouter.post("/register", createUser);
userRouter.get("/logout", logoutUser);
userRouter.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);
userRouter.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "api/login" }),
    async function (req, res) {
        req.session.user = req.user;
        console.log("route", req.session.user)
        res.redirect("/api/products");
    }
);
module.exports = userRouter;