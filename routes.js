const fs = require('fs');

const requestHandler = (req, res) => {
    const { url, method } = req;
    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        res.write(`
            <form action="/message" method="POST">
                <input type="text" name="message">
                <button type="submit">Send</button>
            </form>`
        );
        res.end();
    } else if (url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', chunk => body.push(chunk));
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                if (err) {
                    console.log('Handling Error', err);
                } else {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                }
            });
        });
    } else {
        res.write(`<h1>It works!</h1>`);
        res.end();
    }
}

module.exports = {
    handler: requestHandler,
    customField: "Field"
};