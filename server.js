var connect = require('connect');
var serveStatic = require('serve-static');
var fs = require('fs');
var path = require('path');
var app = connect();

app.use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on http://localhost:8080/...');
});

app.use("/mubin", function fooMiddleware(req, res, next) {
    var fileLoc = path.resolve("./Static.json");
    fileLoc = path.join(fileLoc, req.url);

    var stream = fs.createReadStream(fileLoc);

    stream.on('error', function(error) {
        res.writeHead(404, 'Not Found');
        res.end();
    });

    stream.pipe(res);
});

