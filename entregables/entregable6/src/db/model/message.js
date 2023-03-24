const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  user: {
    type: String,
    required:  [true, "El campo user es requerido"],
  },
  message: {
    type: String,
    required:[true, "El campo message es requerido"],
  },
});

module.exports = messageSchema;