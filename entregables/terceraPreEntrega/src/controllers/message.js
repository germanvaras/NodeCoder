const {
    getMessagesServices,
    addMessageServices,
} = require("../services/message");

const getMessages = async () => {
    const messages = await getMessagesServices();
    return messages;
};

const addMessages = async (message) => {

    const result = await addMessageServices(message);
    return result;
};

module.exports = { getMessages, addMessages };

