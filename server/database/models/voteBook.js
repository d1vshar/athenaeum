var mongoose = require('mongoose');

var VoteBookSchema = new mongoose.Schema({
    bookId: { type: String },
    type: { type: String, required: true },
    name: { type: String, required: true },
    isbn10: { type: String, required: true },
    isbn13: { type: String, required: true },
    authors: { type: Array, required: true },
    publisher: { type: String, required: true },
    edition: { type: String },
    description: { type: String },
    imgUrl: { type: String, default:'https://via.placeholder.com/116x180?text=No%20Book%20Cover'},
    votes: { type: Number, default: 0 }
});

module.exports = VoteBookSchema;