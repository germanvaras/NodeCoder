const handleValidationErrors = (err, res) => {
    const bodyError = JSON.parse(err.message);
    return res.status(400).send({ code: 400, ...bodyError });
};
const handleCredentialError = (err, res) => {
    res.status(403).send({
        status: "error",
        payload: err.message,
        code: 403
    });
};
const handleNotFoundError = (err, res) => {
    res.status(404).send({
        status: "error",
        payload: err.message,
        code: 404
    });
};
const ErrorEmptyFieldsError = (err, res) => {
    res.status(422).send({
        status: "error",
        payload: JSON.parse(err.message),
        code: 422
    });
};
const errorHandler = (err, req, res, next) => {
    
    try {
        if (err.message == "Contaseña Incorrecta") {
            return (err = handleCredentialError(err, res));
        }
        if(err.message == "Usuario Inexistente"){
            return (err = handleNotFoundError(err, res));
        }
        if (err.message.includes("requerido")) {
            return (err = ErrorEmptyFieldsError(err, res));
        }
        return (err = handleValidationErrors(err, res));
    } catch (error) {
        res.status(500).send({ status: "error", payload: err.message, code: 500 })
    }
}

module.exports = errorHandler