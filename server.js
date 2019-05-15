var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.write("Veuillez saisir un mot clé: <br/>");
    res.end("Connection succeed.")
});
server.listen(8080);