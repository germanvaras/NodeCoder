const getAllMessages = async (req, res) => {
    res.render("chat", {
        title: "Chat",
        style: "index.css",
    });
};
const addMessages = async (req, res) => {
    await require("../app").addMessages(req.body);
    res.send({ status: "success", payload: "Message Added" });
};
module.exports = {
    getAllMessages,
    addMessages,
};

