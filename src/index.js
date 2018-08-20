const http = require('http');

const hostname = '127.0.0.1';
const post = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(post, hostname, () =>{
    console.log(`Sever running at http://${hostname}:${post}`);
});