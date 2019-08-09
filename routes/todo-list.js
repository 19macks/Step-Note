const app = require('express');
const router = app.Router();
const List = require('../models/list');

// view and edit list
router.get('/lists/:id', async (req, res) => {
    let list = await List.findById(req.params.id);
    console.log(list);
    res.render('list-details', { list })
});

// save list to database
router.post('/api/lists', async (req, res) => {
    let list = new List (req.body);
    await list.save((err) => {
        if (err) return console.error(err);
        res.redirect('/')
    })
});


module.exports = router;