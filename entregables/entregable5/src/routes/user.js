const { Router } = require('express');
const userRouter = Router();
const { authMiddleware, sessionValidation } = require('../middlewares/isLogged')
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

module.exports = userRouter;