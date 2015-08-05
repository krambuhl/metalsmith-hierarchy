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

function plugin() {
  // options = extend({ }, options)

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      debug('Adding hierarchy data to metadata: ' + file)
      files[file].hierarchy = drill(files[file], files);
    });

    done();
  };
}

/**
 * takes a file and searches for parent files recursively
 * until a file without a parent metadata property is found.
 * Creates a list of files from root node to current node.
 * 
 * @param {Object} file metadata
 * @param {Object} files metasmith files object
 * @param {Object} list related files
 * @return {Array} list of file metadata
 */

function drill(file, files, memo) {
  if (arguments.length < 3) memo = [];
  memo.unshift(file);
  if (file.parent !== undefined && files[file.parent] !== undefined) {
    return drill(files[file.parent], files, memo);
  }

  return memo;
}