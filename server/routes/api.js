const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const axios = require("axios").default;

/* GET all books */
router.get("/books/", function(req, res) {
  const LibraryItemModel = mongoose.model("libitem");
  LibraryItemModel.find().then(items => {
    return res.status(200).json(items);
  });
});

/* INSERT book */
router.post("/books/", function(req, res) {
  const LibraryItemModel = mongoose.model("libitem");

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

//
router.get("/books/new/:isbn", function(req, res) {
  console.log(req.params.isbn);
  axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" + req.params.isbn
    )
    .then(resp => {
      const LibraryItemModel = mongoose.model("libitem");
      var book = resp.data.items[0];
      var newBook = new LibraryItemModel({
        bookId: book.id,
        type: book.volumeInfo.printType,
        name: book.volumeInfo.title,
        isbn10: book.volumeInfo.industryIdentifiers[0].identifier,
        isbn13: book.volumeInfo.industryIdentifiers[0].identifier,
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        edition: book.volumeInfo.publishedDate,
        description: book.volumeInfo.publishedDate.description,
        imgUrl: book.volumeInfo.imageLinks.thumbnail,
        subject: '',
        amount: 1,
        location: ''
      });

      console.log(newBook);

      newBook.save();

      return res.status(201).end();
    });
});

module.exports = router;
