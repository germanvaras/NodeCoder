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
            res.send({ status: "success", payload: "Login success", cartId: user.cartId});
        } else {
            res.status(404).send({ status: "error", payload: "Contraseña Incorrecta" });
        }
    } catch (error) {
        res.status(404).send({ status: "error", payload: "Usuario Inexistente" });
    }
};

const formRegisterUser = (req, res) => {
    res.render("register", { title: "Register", style: "index.css" });
};

const createUser = async (req, res,) => {
    try {
        let existEmailOrUser = await loginUserService(req.body)
        if(!existEmailOrUser.email && !existEmailOrUser.username) {
            await createUserService(req.body);
            res.status(201).send({ status: "success", payload: "Usuario creado correctamente" });
        }
        else if(existEmailOrUser.username === req.body.username){
            res.status(403).send({ status: "error", payload:"Usuario Ocupado"})
        }
        else{
            console.log(existEmailOrUser.username)
            res.status(403).send({ status: "error", payload:"Email Ocupado"})
        }
    } catch (error) {
        console.log(error)
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
