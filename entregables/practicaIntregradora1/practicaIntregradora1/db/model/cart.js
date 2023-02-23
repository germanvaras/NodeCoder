const mongoose = require('mongoose');
 const cartSchema = mongoose.Schema({
  products: [{
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      quantity:{type: Number, default: 1}
    }
  }]
});
module.exports = cartSchema