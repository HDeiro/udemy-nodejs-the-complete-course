const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
const adminRouter = require('./routes/admin');
const adminShop   = require('./routes/shop');

// Register a middleware to handle the body parameters as URL Encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(adminRouter);
app.use(adminShop);

app.listen(3000);