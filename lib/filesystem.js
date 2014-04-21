var Directory = require('./directory')
  , File = require('./file')
  , filesystem
  , noop = function () {};

filesystem = (function Filesystem () {

  function start(path) {
    return {
      directory: directory(path),
      file: file(path)
    };
  }

  function directory(path) {
    return function (dir, next) {
      return _directory(path, dir, next);
    }
  }

  function _directory(path, directory, next) {
    var dir
      , todo = []
      , done
      , generator;

    generator = filesystem.start(path);
    dir = path + '/' + directory;

    Directory.make(dir, function () {
      var generator;
      generator = filesystem.start(dir);
      done = true;
      todo.forEach(function (callback) { callback(generator) });
      next && next(generator);
    });

    return {
      directory: generator.directory,
      file: generator.file,
      done: function (next) {
        done
          ? next(generator)
          : todo.push(next);
        return generator;
      }
    };
  }

  function file(path) {
    return function (name, content, next) {
      return _file(path, name, content, next);
    }
  }

  function _file(path, name, content, next) {
    var file
      , generator
      , todo
      , done;

    todo = [];
    file = path + '/' + name;
    generator = filesystem.start(path);

    File.make(file, content, function () {
      done = true;
      todo.forEach(function (callback) { callback(generator) });
      next && next(generator);
    })

    return {
      directory: generator.directory,
      file: generator.file,
      done: function (next) {
        done
          ? next(generator)
          : todo.push(next);
      }
    };
  }

  return {
    start: start
  };

})();

module.exports = filesystem;