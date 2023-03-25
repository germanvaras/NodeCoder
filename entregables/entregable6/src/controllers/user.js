const {
    createUserService,
    loginUserService,
} = require("../services/user");
const { isValidPassword } = require("../utils/hashPassword");

const loginUserForm = (req, res) => {
    res.render("login", { title: "Login", style: "index.css" });
};
const loginUser = async (req, res) => {
    try {
        const user = await loginUserService(req.body);
        const validPassword = isValidPassword(user, req.body.password);

        if (validPassword) {
            req.session.user = user;
            res.send({ status: "success", payload: "login success" });
        } else {
            res.send({ status: "error", payload: "login error" });
        }
    } catch (error) {
        res.status(500).send({ status: "No se pudo loguear el usuario" });
    }
};

const formRegisterUser = (req, res) => {
    res.render("register", { title: "Register", style: "index.css" });
};

const createUser = async (req, res,) => {
    try {
        await createUserService(req.body);
        res.status(201)
            .send({ status: "success", payload: "Usuario creado correctamente" });
    } catch (error) {
        res.status(500).send({ status: "No se pudo crear el usuario" });
    }
};
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.redirect("/api/user/login");
        } else res.send({ status: "Logout Error", body: err });
    });
};

module.exports = {
    loginUserForm,
    loginUser,
    formRegisterUser,
    createUser,
    logoutUser,
};
