const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const port = process.env.PORT || 8080;
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, {
        useNewUrlParser: true
    })
    .then(() => console.log(`Connected to database: ${config.db}`))
    .catch((err) => console.log('Could not connect to database :', err));

app.use(express.static(__dirname + '/client/dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));