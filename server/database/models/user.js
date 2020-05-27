var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    roles: { type: Array, required: true },
    name: { type: String, required: true },
    profilePic: { type: String, default: "https://i.pravatar.cc/150?img=1" }
});

module.exports = UserSchema;