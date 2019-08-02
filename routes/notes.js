const app = require('express');
const router = app.Router();
const Note = require('../models/notes');

// create note template
router.get('/notes', (req, res) => {

    //render notes /views/index.ejs
    res.render('add-note');
});

// one note details
router.get('/notes/:id', (req, res) => {

    //render notes /views/index.ejs
    res.send('our clicked note');
});

// save note to database
router.post('/api/notes', async (req, res) => {

    let note = await new Note({
        title: req.body.title,
        text: req.body.text
    });
    await note.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        });
    res.redirect('/');
});

module.exports = router;