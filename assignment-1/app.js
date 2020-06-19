const express = require('express');
const app = express();

app.use('/users', (req, res) => {
    res.send('Users Page');
});

app.use('/', (req, res) => {
    res.send('App!');
});

app.listen(3000);