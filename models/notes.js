const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema({
    title:  {type: String, required: true},
    text:   {type: String, required: true},
    },
    //options
    {
        versionKey: false
    }
    );

module.exports = mongoose.model('notes', Note);