const { getUserByEmail } = require("../services/user");
const isUser = async (req, res, next) => {
    const user = await getUserByEmail(req.session?.user?.email);
    if (user?.rol === "user") {
        next();
    } else {
        res.status(401).send({
            status: "error",
            payload: "No posee la autorización para realizar esta acción",
        });
    }
};
module.exports = isUser;