const { getUserByUsername } = require("../services/user");
const isAdmin = async (req, res, next) => {
    const user = await getUserByUsername(req.session?.user);
    if (user?.rol === "admin") {
        next();
    } else {
        res.status(401).send({
            status: "Unauthorized",
            message: "No posee la autorización para realizar esta acción",
            code: 401,
        });
    }
};
module.exports = isAdmin;