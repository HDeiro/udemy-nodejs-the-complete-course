const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();

// Register a middleware to handle the body parameters as URL Encoded
app.use(bodyParser.urlencoded({ extended: false }));

// General Middlewares

app.use('/add-product', (req, res) => {
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title">
            <button type="submit">Add Product</button>
        </form>
    `)
});

app.use('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res) => {
    res.send('<h1>Hello from Express</h1>')
});

app.listen(3000);