const http   = require('http');
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Response!</h1>');
    res.end();
});

server.listen(3000);