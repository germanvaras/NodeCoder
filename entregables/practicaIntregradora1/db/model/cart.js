const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    products: {
        type: [{
            quantity: { type: Number, default: 1, requirded: true },
        }],
        default: []
    }
}, 
{
    versionKey: false,
})
module.exports = cartSchema