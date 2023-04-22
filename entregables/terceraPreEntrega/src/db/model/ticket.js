const mongoose = require('mongoose');
const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema({
    code:{type: String},
    purchase_dateTime:{type: Date},
    amount:{type: Number},
    purcharser:{type: String},
})
module.exports = ticketSchema