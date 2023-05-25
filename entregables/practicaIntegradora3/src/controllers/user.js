const {
    createUserService,
    loginUserService,
    updatePasswordService,
    existUserService,
    updateRolService,
    getUserById,
} = require("../services/user");
const {
    findTokenByUserIdService,
    updateTokenService,
    deleteTokenByIdService,
    createTokenService,
} = require("../services/tokenReset")
const {
    isValidPassword,
    isValidToken,
    createHash
} = require("../utils/hashPassword");
const {
    generateNumericToken
} = require("../utils/generateToken");
const { sendEmailResetPassword } = require("../config/nodemailer");

const loginUserForm = (req, res) => {
    res.render("login", { title: "Login", style: "index.css" });
};
const loginUser = async (req, res, next) => {
    try {
        const user = await existUserService(req.body)
        const validPassword = isValidPassword(user, req.body.password);
        if (validPassword) {
            req.session.user = user;
            res.send({ status: "success", payload: "Login success", cartId: user.cartId });
        } else {
            throw new Error("Contraseña Incorrecta");
        }

    } catch (error) {
        next(error)
    }
};
const formForgotPassword = async (req, res) => {
    res.render("forgotPassword", { title: "Forgot Password", style: "index.css" })
}
const forgotPassword = async (req, res, next) => {
    try {
        const user = await existUserService(req.body)
        const token = generateNumericToken()
        const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
        const resetUrl = `${req.protocol}://${req.get('host')}/api/user/resetPassword`
        const tokenReset = await findTokenByUserIdService(user._id);
        if (tokenReset.error) {
            createTokenService(token, user._id, expirationDate);
        } else {
            tokenReset.token = createHash(token);
            tokenReset.expirationDate = expirationDate;
            await updateTokenService(tokenReset);
        }
        sendEmailResetPassword(token, user, resetUrl)
        const currentTime = new Date();
        const timeDifference = expirationDate - currentTime;
        setTimeout(() => {
            deleteTokenByIdService(tokenReset._id)
        }, timeDifference);
        res.status(201).send({ status: "success", payload: `El token de recuperacion ha sido enviado al email: ${user.email}` })
    } catch (error) {
        next(error)
    }
}
const formResetPassword = async (req, res) => {
    res.render("resetPassword", { title: "Reset Password", style: "index.css" })
}
const resetPassword = async (req, res, next) => {
    try {
        const user = await existUserService(req.body)
        const password = req.body.password
        const newPassword = req.body.repeatPassword
        const tokenReset = await findTokenByUserIdService(user._id);
        const validToken = tokenReset.error ? null : isValidToken(tokenReset, req.body.token)
        if (!validToken) {
            res.status(403).send({ status: "error", payload: "Token Invalido" })
        }
        else {
            const validPassword = isValidPassword(user, password);
            if (validPassword) {
                res.status(422).send({ status: "error", payload: "La contraseña no puede ser igual a la anterior" })
            }
            else if (password !== newPassword) {
                res.status(422).send({ status: "error", payload: "Las contraseñas no coinciden" })
            }
            else {
                await updatePasswordService(user._id, createHash(password))
                deleteTokenByIdService(tokenReset._id)
                res.status(200).send({ status: "success", payload: "Contraseña actualizada correctamente" })
            }
        }
    } catch (error) {
        next(error)
    }
}
const formRegisterUser = (req, res) => {
    res.render("register", { title: "Register", style: "index.css" });
};
const createUser = async (req, res) => {
    try {
        let existEmailOrUser = await loginUserService(req.body)
        if (!existEmailOrUser) {
            await createUserService(req.body);
            req.logger.info(req.body)
            res.status(201).send({ status: "success", payload: "Usuario creado correctamente" });
        }
        else if (existEmailOrUser.username === req.body.username) {
            res.status(403).send({ status: "error", payload: "Usuario Ocupado" })
        }
        else {
            res.status(403).send({ status: "error", payload: "Email Ocupado" })
        }
    } catch (error) {
        res.status(500).send({ status: "error", payload: error.message });
    }
};
const updateRolUser = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.uid)
        let userRol = user.rol
        if (userRol === "user") {
            userRol = "premium";
        } else if (userRol === "premium") {
            userRol = "user";
        }
        await updateRolService(user._id, userRol);
        res.send({ status: "success", payload: `${user.username} ha cambiado tu rol a ${userRol}` })
    } catch (error) {
        next(error)
    }
}
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
    formForgotPassword,
    formResetPassword,
    forgotPassword,
    resetPassword,
    updateRolUser,
};
