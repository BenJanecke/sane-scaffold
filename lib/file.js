var fs = require('fs')
  , Q = require('q')
  , File;

File = (function FileGenerator() {

  function make(name, content, next) {
    var deffered = Q.defer();

    fs.writeFile(name, content || '', function () {
      deffered.resolve();
      next && next();
    });

    return deffered.promise;
  }

  return {
    make: make
  };
})();

module.exports = File;