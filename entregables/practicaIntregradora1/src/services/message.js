const mongoDbMessageContainer = require('../db/message.dao')
const messageSchema = require('../db/model/message.js')
const chatDAO = new mongoDbMessageContainer('message', messageSchema)
const getMessagesServices = async () => {
  let response = await chatDAO.getAllMessages();
  return response;
};

const addMessageServices = async (message) => {
    let response = await chatDAO.createMessage(message);
    return response;
};
module.exports = { getMessagesServices, addMessageServices }
