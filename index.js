var debug = require('debug')('metalsmith-hierarchy');
// var extend = require('extend');


/**
 * Expose `plugin`.
 */

module.exports = plugin;


/**
 * Metalsmith plugin that adds relativity path metadata to files
 *
 * @param {Object|Array} options
 *   @property {String} 
 * @return {Function}
 */

function plugin(options) {
  // options = extend({ }, options)

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];
      debug('Adding relativity to metadata: ' + file)

    });

    done();
  };
}