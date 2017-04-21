var express = require('express');
var app = express();
var path = require('path');

// Serve back static files
app.use(express.static('./server/public'));

app.use(function(req, res, next) {
  var thing = "hello";
  req.message = "hi";
  console.log('middleware');
  next(thing);
});

app.use(function(newvar, req, res, next) {
  console.log('passed var: ', newvar);
  console.log('property on req: ', req.message);
  next();
});

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
