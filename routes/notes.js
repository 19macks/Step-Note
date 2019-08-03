const app = require('express');
const router = app.Router();
const Note = require('../models/notes');

// create note template
router.get('/notes', (req, res) => {
    //render notes /views/add-note.ejs
    res.render('add-note');
});

// one note details
router.get('/notes/:id', async (req, res) => {
    let note = await Note.findById(req.params.id, (err, doc) => {});
    //render notes /views/note-details.ejs
    res.render('note-details', { note });
});

// save note to database
router.post('/api/notes', async (req, res) => {

    let note = new Note(req.body);
    await note.save((err, note) => {
        if (err) return console.error(err);
        res.redirect('/');
    })
});

//edit note
router.put('/api/notes/:id', async (req, res) => {
    await Note.updateOne({_id: req.body._id }, req.body);
    res.redirect('/');
});

//find note by ID and remove it
router.delete('/api/notes/:id', async (req, res) => {
    await Note.deleteOne({_id: req.body._id }, () => {});
    res.json({ deleted: true });
});

module.exports = router;

