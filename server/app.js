var express = require('express');
var app = express();
var path = require('path');

// Serve back static files
app.use(express.static('./server/public'));

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
