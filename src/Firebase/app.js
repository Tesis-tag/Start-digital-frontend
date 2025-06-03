const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 4500);

const routes = require('./firebase');

app.use(express.json());
app.use(cors());


//app.use(require('./routes/index'));

app.use('/', routes)

console.log('Hello World!!!!!!');

app.get('/', (req, res) => {
    res.send('Hello Tocuyo!');
})

module.exports = app;