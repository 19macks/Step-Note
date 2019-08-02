const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema({
    title:  String,
    text:   String,
    },
    //options
    {
        versionKey: false
    }
    );

module.exports = mongoose.model('notes', Note);