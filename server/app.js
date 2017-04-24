var express = require('express');
var app = express();
var path = require('path');
var csv = require('express-csv');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// step 1: create the Schema
var personSchema = new Schema({
  name: {type: String, required: true},
  location: String
});

var Person = mongoose.model('Person', personSchema);

if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    databaseUri = process.env.MONGODB_URI;
} else {
    // use the local database server
    databaseUri = 'mongodb://localhost:27017/sigma';
}

mongoose.connect(databaseUri);


// Serve back static files
app.use(express.static('./server/public'));

// code from Christian Cupboard Sigma project
// Angular side
// https://github.com/jasunde/christian-cupboard/blob/64a5994f42042c9cd147c20eddcf382507b03bb3/public/app/services/distribution.factory.js#L148

// Server side
// https://github.com/jasunde/christian-cupboard/blob/64a5994f42042c9cd147c20eddcf382507b03bb3/server/routes/distributions.js#L191

app.get('/getcsv', function(req, res) {
  // this would be your returned find() object

  Person.findOne({}, function(err, result) {
    if(err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {
      var obj = result.toObject();
      obj.test = "hello";
      console.log('person: ', obj);

      // create an array from the mongo object so we can use .unshift() later
      var data = [obj];

      // create a header row from the object's keys/properties
      var headers = Object.keys(obj);

      // push keys array to the beginning of data array
      data.unshift(headers);

      console.log('data: ', data);

      res.attachment('testing.csv');   // not really used
      res.csv(data);
    }
  });
  //
  // var mongoObject = {
  //   _id: '1234',
  //   firstName: 'First',
  //   lastName: 'Last'
  // };


})


// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
