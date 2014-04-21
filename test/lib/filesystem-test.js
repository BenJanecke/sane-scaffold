var fsBuilder = require('../../lib/filesystem')
  , mockFs = require('mock-fs')
  , fs = require('fs')
  , rmdir = require('rmdir');

describe('filesystem', function () {
  var filesystem
    , fixutres;

  before(function () {
    var toMock = {};
    fixtures = __dirname + '/fixtures/filesystem-generator';
    toMock[fixtures]  = {};
    mockFs(toMock);
    filesystem = fsBuilder.start(fixtures);
  });

  after(function (done) {
    rmdir(fixtures, done);
  });

  describe('#start', function () {
    it('complains if the directory does not exist', function () {
      expect(function () {
        fsBuilder.start('idontexist');
      }).to.throw('That directory does not exist');
    });
  });

  describe('#directory', function () {
    it('expects a js directory to exist for "js"', function (done) {
      filesystem
      .directory('js', function () {
        expect(fixtures + '/js').to.be.a.directory();
        done();
      });
    });
    describe('#done', function () {
      it('expects a assets directory to exist for "assets"', function (done) {
        filesystem
        .directory('assets')
        .done(function () {
          expect(fixtures + '/assets').to.be.a.directory();
          done();
        });
      });
    });
    describe('#file', function () {
      it('expects /massets/file.moo to exist for "file.moo"', function (done) {
        filesystem
        .directory('massets', function (dir) {
          dir.file('file.moo', '', function () {
            expect(fixtures + '/massets/file.moo').to.be.a.file();
            done();
          });
        });
      });
    });
    describe('#directory', function () {
      it('expects /supremo/directory to exist for "directory"', function (done) {
        filesystem
        .directory('supremo', function (dir) {
          dir.directory('directory', function () {
            expect(fixtures + '/supremo/directory').to.be.a.directory();
            done();
          });
        });
      });
      it('expects /bwaaap/directory/directoryception to exist for "directoryception"', function (done) {
        filesystem
        .directory('bwaaap')
        .directory('directory', function (dir) {
          dir.directory('directoryception', function () {
            expect(fixtures + '/directory/directoryception').to.be.a.directory();
            done();
          });
        });
      });
    });
  });
  describe('#file', function () {
    it('expects a file.txt file to exist for "file.txt"', function (done) {
      filesystem
      .file('file.txt', '', function () {
        expect(fixtures + '/file.txt').to.be.a.file();
        done();
      });
    });
    describe('#done', function () {
      it('expects a another-file.txt file to exist for "another-file.txt"', function (done) {
        filesystem
        .file('another-file.txt')
        .done(function () {
          expect(fixtures + '/another-file.txt').to.be.a.file();
          done();
        });
      });
    });
    describe('#file', function () {
      it('expects bwaaaaaap.fileception to exist for "bwaaaaaap.fileception"', function (done) {
        filesystem
        .file('bwaa.aaap')
        .file('bwaaaaaap.fileception', '', function () {
          expect(fixtures + '/bwaaaaaap.fileception').to.be.a.file();
          done();
        });
      });
    });
  });
});