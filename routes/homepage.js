const app = require('express');
let router = app.Router();
const Note = require('../models/notes');

router.get('/',  async (req, res) => {
    // get notes collections
    let notes = await Note.find({});
    //render notes /views/homepage.ejs
    res.render('homepage', { notes });
});

module.exports = router;