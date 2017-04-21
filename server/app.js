var express = require('express');
var app = express();
var path = require('path');
var csv = require('express-csv');

// Serve back static files
app.use(express.static('./server/public'));

app.get('/getcsv', function(req, res) {
  var mongoObject = {
    _id: '1234',
    firstName: 'First',
    lastName: 'Last'
  };

  // create an array from the mongo object so we can use .unshift() later
  var data = [mongoObject];

  // create a header row from the object's keys/properties
  var headers = Object.keys(mongoObject);

  // push keys array to the beginning of data array
  data.unshift(headers);

  console.log('data: ', data);

  res.attachment('testing.csv');   // not really used
  res.csv(data);
})

// app.use(function(req, res, next) {
//   var thing = "hello";
//   req.message = "hi";
//   console.log('middleware');
//   next(thing);
// });
//
// app.use(function(newvar, req, res, next) {
//   console.log('passed var: ', newvar);
//   console.log('property on req: ', req.message);
//   next();
// });

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
