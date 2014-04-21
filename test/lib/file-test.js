var File = require('../../lib/file')
  , fs = require('fs')
  , rmdir = require('rmdir');

describe('File', function () {
  var file
    , fixutres;

  before(function (done) {
    fixtures = __dirname + '/fixtures/file-generator';
    fs.mkdir(fixtures, done);
  });

  after(function (done) {
    rmdir(fixtures, done);
  });

  describe('#make', function () {
    it('expects somefile.txt to exist for "somefile.txt"', function (done) {
      File.make(fixtures + '/somefile.txt', '', function () {
        expect(fixtures + '/somefile.txt').to.be.a.file();
        done();
      });
    });
    it('expects someother-file.txt to exist for "someother-file.txt"', function (done) {
      File.make(fixtures + '/someother-file.txt', '').then(function () {
        expect(fixtures + '/someother-file.txt').to.be.a.file();
        done();
      });
    });
  });
});