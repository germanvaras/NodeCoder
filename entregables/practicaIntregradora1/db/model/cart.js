const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            autopopulate: true
        },
        quantity: { type: Number, default: 1 }
    }]
});
module.exports = cartSchema