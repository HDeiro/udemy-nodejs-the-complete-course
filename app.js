const express     = require('express');
const bodyParser  = require('body-parser');
const path        = require('path');
const adminRouter = require('./routes/admin');
const adminShop   = require('./routes/shop');
const rootDir     = require('./utils/path');

const app = express();

// Register a middleware to handle the body parameters as URL Encoded
app.use(bodyParser.urlencoded({ extended: false }));

// App middlewares
app.use('/admin', adminRouter);
app.use(adminShop);

app.use((req, res) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000);