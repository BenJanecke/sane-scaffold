# sane-scaffold

[![Build Status](https://travis-ci.org/BenJanecke/sane-scaffold.svg?branch=master)](https://travis-ci.org/BenJanecke/sane-scaffold)[![Dependency Status](https://gemnasium.com/BenJanecke/sane-scaffold.svg)](https://gemnasium.com/BenJanecke/sane-scaffold)

Sane composable filesystem scaffolding.

Code that looks like this

```javascript
  var scaffold = require('sane-scaffold');

  scaffold
    .start('/usr/local/lets-do-this')
    .directory('empty-directory')
    .directory('put-things-inside-me', function (dir) {
      dir.directory('im-a-subdirectory', function (dir) {
        dir.directory('directoryception');
      })
      .file('files-inside-directories.ext');
    })
    .file('files-are-simple.txt', 'And can have content')
    .done(function () {
      // I get called when the last command finishes
    });

```


Ends up creating a directory structure that looks like this

```shell
/usr/local/lets-do-this
|empty-directory
|put-things-inside-me
 -|im-a-subdirectory
  -|directoryception 
 -files-inside-directories.ext
-files-are-simple.txt
```


# Basic Usage

## #directory(name, next)

```javascript
  var scaffold = require('sane-scaffold')
    , base;

  // Start scaffolding from a path
  base = scaffold.start('/some-path');

  // creates /some-path/some-directory
  base.directory('some-directory'); 

  // Commands can be chained
  base.directory('dir')
      .directory('moar');

  // Creating subdirectories is easy

  base.directory('moredirectories', function (subdir) {
    subdir
      .directory('i-am-a-subdirectory')
      .directory('chaining-still-works')
      .file('files-also-work')
      .directory('we-can-go-deeper', function (subdir) {
        subdir.directory('and-deeper', function (supersupdir) {
          supersupdir.directory('as-far-as-you-think-is-sane');
        });
      });
  });

  // Optionally use done instead of callbacks 

  base.directory('dir')
      .done(function (dir) {
        dir.directory('subdir');  
      })
```

## #file(name, content, next)

```javascript

  var scaffold = require('sane-scaffold')
    , base;

  // Start scaffolding from a path
  base = scaffold.start('/some-path');

  // Create /some-path/empty-file.txt
  base.file('empty-file.txt'); 
  // Create /some-path/empty-file.txt with 'now some content' as its contents
  base.file('file.txt', 'now some content'); 

  // Chain commands 

  base.file('one.hahaha')
      .file('two.hahaha')
      .file('three.hahaha')
      .directory('and a directory for fair measure');

 // wait for a write to finish

base.file('file.txt', 'bigstring', function () {
  // im done
});

base
  .file('file.txt', 'bigstring')
  .done(function () {
    // im done
  });
```
