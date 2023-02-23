const mongoose = require('mongoose');
require("dotenv").config();
const conection = process.env.db
mongoose.connect("mongodb+srv://gervaras97:JeW3nEpRCFwTxb2H@eccomerce.vfx9q1x.mongodb.net/?retryWrites=true&w=majority", error => {
  if (error) {
    console.log('Cannot connect to db')
    process.exit()
  }
})
class MongoDbMessageContainer {

  constructor(collection, schema) {
    this.messageCollection = mongoose.model(collection, schema)
  }
  async getAllMessages() {
    let messages = await this.messageCollection.find().lean();
    return messages;
  }

  async createMessage(message) {
    try {
      const newProduct = new this.messageCollection(message)
      const validationError = newProduct.validateSync()
      if (validationError) {
        const errorMessages = []
        for (let errorField in validationError.errors) {
          const errorMessage = validationError.errors[errorField].message
          errorMessages.push(errorMessage)
        }
        return { error: errorMessages }
      }
      const createdProduct = await newProduct.save()
      return createdProduct
    } catch (err) {
      return { error: err.message }
    }
  }
}


module.exports = MongoDbMessageContainer;