const {
    createUserService,
    loginUserService,
    updatePasswordService,
    existUserService,
    updateRolService,
    getUserById,
    deleteUserService,
    updatedUserConectionService,
    updateDocumentsStatusService,
    generateDocumentURL
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
const path = require('path');

const loginUserForm = (req, res) => {
    res.render("login", { title: "Login", style: "index.css" });
};
const loginUser = async (req, res, next) => {
    try {
        const user = await existUserService(req.body)
        const validPassword = isValidPassword(user, req.body.password);
        if (validPassword) {
            req.session.user = user;
            res.send({ status: "success", payload: "Login success", cartId: user.cartId, data: user });
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
            const newUser = await createUserService(req.body);
            req.logger.info(req.body)
            res.status(201).send({ status: "success", payload: "Usuario creado correctamente", data: newUser });
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

const uploadDocuments = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await getUserById(uid);
        const files = req.files;
        if (files && files.length > 0) {
            const documentStatus = files.map(file => ({
                name: path.parse(file.originalname).name,
                reference: generateDocumentURL(file, user.username),
            }));
            const updatedUser = await updateDocumentsStatusService(uid, documentStatus);
            res.send({ status: "success", payload: `Documentos cargados correctamente`, data: updatedUser });
        } else {
            res.status(400).send({
                status: "error",
                payload: "No se proporcionaron archivos",
            });
        }
    } catch (error) {
        next(error);
    }
};
const renderUploadForm = (req, res) => {
    const user = req.session.user;
    res.render('upload', { user, style: "index.css" });
};
const updateRolUser = async (req, res, next) => {
    try {
        const user = await updateRolService(req.params.uid);
        res.send({
            status: "success",
            payload: `${user.username} ha cambiado tu rol a ${user.rol}`,
            data: user.rol,
        });
    } catch (error) {
        next(error);
    }
};

const logoutUser = (req, res, next) => {
    try {
        let userId = req.session.user._id;
        req.session.destroy(async (err) => {
            if (!err) {
                await updatedUserConectionService(userId)
                res.redirect("/api/user/login");
            } else res.send({ status: "Logout Error", body: err });
        });
    }
    catch (error) {
        next(error)
    }
};
const deleteUser = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.uid)
        const deleteUser = await deleteUserService(req.params.uid)

        if (deleteUser.error) {
            throw new Error("Usuario Inexistente")
        }
        else {
            res.send({ status: "success", payload: `${user.username} ha sido eliminado`, data: deleteUser })
        }
    }
    catch {
        next(error)
    }
}
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
    deleteUser,
    uploadDocuments,
    renderUploadForm
};
