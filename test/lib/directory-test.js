var Directory = require('../../lib/directory')
  , mockFs = require('mock-fs')
  , fs = require('fs')
  , rmdir = require('rmdir');

describe('Directory', function () {
  var dir
    , fixutres;

  before(function () {
    var toMock = {};
    fixtures = __dirname + '/fixtures/directory-generator';
    toMock[fixtures]  = {};
    mockFs(toMock);
  });

  after(function (done) {
    rmdir(fixtures, done);
  });

  describe('#make', function () {
    it('expects a "things" directory for "things"', function (done) {
      Directory.make(fixtures + '/things', function () {
        expect(fixtures + '/things').to.be.a.directory();
        done();
      })
    });
    it('expects a "moar-things" directory for "moar-things"', function (done) {
      Directory.make(fixtures + '/moar-things').then(function () {
        expect(fixtures + '/moar-things').to.be.a.directory();
        done();
      })
    });
  });
});