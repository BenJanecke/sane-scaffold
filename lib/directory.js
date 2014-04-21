var fs = require('fs')
  , Q = require('q')
  , Directory;

Directory = (function DirectoryGenerator() {

  function make(directory, next) {
    var deffered = Q.defer();
    fs.mkdir(directory, function () {
      next && next();
      deffered.resolve();
    });

    return deffered.promise;
  }

  return {
    make: make
  };
})();

module.exports = Directory;