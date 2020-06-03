const http   = require('http');
const fs     = require('fs');
const server = http.createServer((req, res) => {
    const { url, method } = req;

    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        res.write(`
            <form action="/message" method="POST">
                <input type="text" name="message">
                <button type="submit">Send</button>
            </form>`
        );
    } else if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'Dummy!');
        res.statusCode = 302;
        res.setHeader('Location', '/')
    } else {
        res.write(`<h1>It works!</h1>`);
    }

    res.end();
});

server.listen(3000);