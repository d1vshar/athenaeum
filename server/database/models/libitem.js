var mongoose = require('mongoose');

var LibraryItemSchema = new mongoose.Schema({
    id: { type: Number },
    type: { type: String, required: true },
    name: { type: String, required: true },
    isbn: { type: String, required: true },
    author: { type: Array, required: true },
    subject: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    location: { type: String, default: '' }
})

module.exports = LibraryItemSchema;