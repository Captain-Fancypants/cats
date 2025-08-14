// vulnerable_server.js
const http = require('http');
const url = require('url');
const { exec } = require('child_process');

http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    if (queryObject.cmd) {
        // BAD: Command injection vulnerability
        exec(queryObject.cmd, (err, stdout, stderr) => {
            if (err) {
                res.writeHead(500);
                res.end(`Error: ${stderr}`);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(stdout);
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Send a ?cmd= parameter in the query string.');
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
