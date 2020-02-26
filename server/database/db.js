require("dotenv").config();
const mongoose = require('mongoose');

const VoteBookSchema = require('./models/voteBook');

console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})

mongoose.connection.on('connected', () => {
    mongoose.model('voteBook',VoteBookSchema);
});