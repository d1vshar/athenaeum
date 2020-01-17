const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

/* GET all books */
router.get('/', function(req, res, next) {
  const LibraryItemModel = mongoose.model('libitem');
  LibraryItemModel.find().then( (items) => {
    return res.status(200).json(items);
  })
});

module.exports = router;
