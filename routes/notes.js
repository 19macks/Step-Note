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
    let note = Note.findById(req.params._id, (err, doc) => {});
    console.log(note);

    //render notes /views/index.ejs
    let path = req.params._id;
    // res.redirect('/notes/' + path);
    res.send('our clicked note');
});

// save note to database
router.post('/api/notes', async (req, res) => {

    let note = new Note({
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

//find note by ID and remove it
router.delete('/api/notes/:id', (req, res) => {
    let id = req.body._id;
    Note.findByIdAndRemove(id, () => {})
});


module.exports = router;

