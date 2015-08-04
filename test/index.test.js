var rewrite = require('../index.js');
var test = require('tape');

var Metalsmith = require('metalsmith');

function plugtest(options, fn) {
  Metalsmith('test/fixtures')
    .source('.')
    .destination('tmp')
    .use(rewrite(options)).build(function(err, files) {
      if(err) return console.log('err: ', err);
      fn(err, files);
    });
}