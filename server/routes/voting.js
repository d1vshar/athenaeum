const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const axios = require("axios").default;

/* GET all books */
router.get("/", function(req, res) {
  const VoteBookModel = mongoose.model("voteBook");
  VoteBookModel.find().then(items => {
    return res.status(200).json(items);
  });
});

/* INSERT book */
router.post("/", function(req, res) {
  const VoteBookModel = mongoose.model("voteBook");

  var newBook = new VoteBookModel({
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
    votes: 1
  });

  newBook.save();

  return res.status(201).end();
});

//
router.get("/search/:isbn", function(req, res) {
  console.log(req.params.isbn);
  axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" + req.params.isbn
    )
    .then(resp => {
      return res.status(201).json(resp.data);
    });
});

router.post("/add/:isbn", function(req, res) {
  console.log(req.params.isbn);
  axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" + req.params.isbn
    )
    .then(resp => {
      const VoteBookModel = mongoose.model("voteBook");
      var book = resp.data.items[0];
      var newBook = new VoteBookModel({
        bookId: book.id,
        type: book.volumeInfo.printType,
        name: book.volumeInfo.title,
        isbn10: book.volumeInfo.industryIdentifiers[0].identifier,
        isbn13: book.volumeInfo.industryIdentifiers[1].identifier,
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        edition: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description,
        imgUrl: book.volumeInfo.imageLinks.thumbnail,
        votes: 1
      });

      console.log(newBook);

      newBook.save();

      return res.status(201).end();
    });
});

module.exports = router;
