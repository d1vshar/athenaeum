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

app.listen(process.env.SERVERPORT);
console.log('Server is listening on port ' + process.env.SERVERPORT);

module.exports = app;
