process.env.DEBUG = '*';


var fs = require('fs');
var path = require('path');
var getAll = require('./get_all');
var download = require('./download');

var argv = require('minimist')(process.argv.slice(2));
var dest = argv.dest || path.join(__dirname, 'photos');
var token = argv.token;

if (!token) {
  throw new Error('Please provide the token');
}

getAll(token, argv.tagged, function (err, result) {

  if (err) {throw err; }

  fs.writeFileSync('result.json', JSON.stringify(result, null, 4));

  download(result, dest);
});