const fs = require('fs');

const requestHandler = (req, res) => {
    const { url, method } = req;
    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        handleRoot(res);
    } else if (url === '/register' && method === 'POST') {
        handleUserRegistering(req, res);
    } else if (url === '/list') {
        handleUserList(res);
    } else {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
}

const handleRoot = res => {
    res.write(`
        <h1>Welcome!</h1>
        <form action="/register" method="POST">
            <input type="text" name="name">
            <button type="submit">Submit</button>
        </form>
    `);
    res.end();
}

const handleUserRegistering = (req, res) => {
    const body = [];

    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
        const content = Buffer.concat(body).toString().split('=')[1];

        fs.writeFile('users.txt', content, err => {
            if(err) {
                console.log('ERROR!');
            } else {
                res.statusCode = 302;
                res.setHeader('Location', '/list');
            }

            res.end();
        });
    });
}

const handleUserList = (res) => {
    fs.readFile('users.txt', (err, data) => {
        if (err) {
            throw err;
        }

        res.write(`
            <h1>Users</h1>
            ${data}
        `)
    });
}

module.exports.handle = requestHandler;