require('./database/db');
require("dotenv").config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var votingRouter = require('./routes/voting');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/voting', votingRouter);

console.log('Listening on port ' + process.env.PORT);

module.exports = app;
