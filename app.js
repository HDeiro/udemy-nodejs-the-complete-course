const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
const adminRouter = require('./routes/admin');
const adminShop   = require('./routes/shop');

// Register a middleware to handle the body parameters as URL Encoded
app.use(bodyParser.urlencoded({ extended: false }));

// App middlewares
app.use(adminRouter);
app.use(adminShop);

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3000);