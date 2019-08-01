const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
// const db = require('/mongoose');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded( {
    extended: true
}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('server start ar port: ' + port);
});