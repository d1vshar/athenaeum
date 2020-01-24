const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

/* GET all books */
router.get('/books/', function (req, res, next) {
  const LibraryItemModel = mongoose.model('libitem');
  LibraryItemModel.find().then((items) => {
    return res.status(200).json(items);
  })
});

/* INSERT book */
router.post('/books/', function (req, res, next) {
  const LibraryItemModel = mongoose.model('libitem');
  
  var newBook = new LibraryItemModel({
    bookId: req.body.bookId,
    type: req.body.type,
    name: req.body.name,
    isbn10: req.body.isbn10,
    isbn13: req.body.isbn13,
    authors: req.body.authors,
    publisher: req.body.publisher,
    edition: req.body.edition,
    description: req.body.description,
    subject: req.body.subject,
    amount: req.body.amount,
    location: req.body.location
  });

  newBook.save();

  return res.status(201).end();
});

module.exports = router;
