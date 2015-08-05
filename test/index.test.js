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

test('should recognize self', function(t) {
  t.plan(1);
  plugtest({ }, function(err, files) {
    t.equal(files['home.html'].hierarchy[0].slug, files['home.html'].slug);
  });
})

test('should list self only when no parent defined', function(t) {
  t.plan(2);
  plugtest({ }, function(err, files) {
    t.equal(files['home.html'].parent === undefined, true);
    t.equal(files['home.html'].hierarchy.length, 1);
  });
})

test('should recognize parent', function(t) {
  t.plan(2);
  plugtest({ }, function(err, files) {
    t.equal(files['p/archive.js'].hierarchy[0].slug, 'home');
    t.equal(files['p/archive.js'].hierarchy[1].slug, 'archive');
  });
})

test('should recognize deep parent', function(t) {
  t.plan(3);
  plugtest({ }, function(err, files) {
    t.equal(files['p/deep/page.html'].hierarchy[0].slug, 'home');
    t.equal(files['p/deep/page.html'].hierarchy[1].slug, 'archive');
    t.equal(files['p/deep/page.html'].hierarchy[2].slug, 'page');
  });
})

test('should recognize weird parent', function(t) {
  t.plan(4);
  plugtest({ }, function(err, files) {
    t.equal(files['weird.html'].hierarchy[0].slug, 'home');
    t.equal(files['weird.html'].hierarchy[1].slug, 'archive');
    t.equal(files['weird.html'].hierarchy[2].slug, 'page');
    t.equal(files['weird.html'].hierarchy[3].slug, 'weird');
  });
})