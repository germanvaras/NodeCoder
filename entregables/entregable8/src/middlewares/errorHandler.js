const { Console } = require("winston/lib/winston/transports");

const handlerValidationErrors = (err, res) => {
    const bodyError = JSON.parse(err.message);
    return res.status(400).send({ code: 400, ...bodyError });
};
const handlerCredentialError = (err, res) => {
    res.status(403).send({
        status: "error",
        payload: err.message,
        code: 403
    });
};
const handlerNotFoundError = (err, res) => {
    res.status(404).send({
        status: "error",
        payload: err.message,
        code: 404
    });
};
const handlerEmptyFieldsError = (err, res) => {
    res.status(422).send({
        status: "error",
        payload: JSON.parse(err.message),
        code: 422
    });
};
const errorHandler = (err, req, res, next) => {
    
    try {
        if (err.message == "Contraseña Incorrecta") {
            req.logger.error(err)
            return (err = handlerCredentialError(err, res));
        }
        if(err.message == "Usuario Inexistente"){
            req.logger.error(err)
            return (err = handlerNotFoundError(err, res));
        }
        if (err.message.includes("requerido")) {
            req.logger.error(err)
            return (err = handlerEmptyFieldsError(err, res));
        }
        return (err = handlerValidationErrors(err, res));
    } catch (error) {
        req.logger.fatal(error.message)
        res.status(500).send({ status: "error", payload: err.message, code: 500 })
    }
}

module.exports = errorHandler