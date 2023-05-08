const { getUserByEmail } = require("../services/user");

const getAllMessages = async (req, res) => {
    let user = getUserByEmail(req.session.user?.email)
    res.render("chat", {
        title: "Chat",
        style: "index.css",
        user
    });
};
const addMessages = async (req, res) => {
    try{     
        await require("../socket").addMessages(req.body);
        res.send({ status: "success", payload: "Message Added" });
    }catch(error){
        res.status(500).send({ status: "error", payload: error.message });
    }
};
module.exports = {
    getAllMessages,
    addMessages,
};

