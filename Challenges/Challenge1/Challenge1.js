var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Zorawar so cool la');
}).listen(3008, () => {
    console.log('Server running at http://localhost:3008/');
});
