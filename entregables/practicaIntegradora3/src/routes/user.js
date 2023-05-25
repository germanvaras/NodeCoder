const { Router } = require('express');
const userRouter = Router();
const passport = require("passport");
const {
    loginUserForm,
    loginUser,
    formRegisterUser,
    createUser,
    logoutUser,
    formResetPassword,
    formForgotPassword,
    forgotPassword,
    resetPassword,
    updateRolUser
} = require("../controllers/user.js");
const isUser = require('../middlewares/isUser.js');
userRouter.get("/login", loginUserForm);
userRouter.post("/login", loginUser);
userRouter.get("/register", formRegisterUser);
userRouter.post("/register", createUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/forgotPassword", formForgotPassword)
userRouter.post("/forgotPassword", forgotPassword)
userRouter.get("/resetPassword", formResetPassword)
userRouter.post("/resetPassword", resetPassword)
userRouter.post("/premium/:uid",isUser,updateRolUser)
userRouter.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);
userRouter.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "api/login" }),
    async function (req, res) {
        req.session.user = req.user;
        res.redirect("/api/products");
    }
);
module.exports = userRouter;