var scaffold = require('../../index.js')
  , mockFs = require('mock-fs');

describe('Scaffolding an example directory', function () {
  var fixtures;

  before(function (done) {
    var toMock = {};
    fixtures = __dirname + '/fixturess/scaffolding-with-done';
    toMock[fixtures]  = {};
    mockFs(toMock);
    scaffold
      .start(fixtures)
      .directory('empty-directory')
      .directory('put-things-inside-me')
      .done(function (dir) {

        dir
          .directory('im-a-subdirectory')
          .done(function (dir) {
            dir.directory('directoryception');
          })
          .file('files-inside-directories.ext');

        scaffold
          .start(fixtures)
          .file('files-are-simple.txt', 'And can have content')
          .done(function () {
            done();
          });

      });
  });

  after(function () {
    mockFs.restore();
  });

  describe('scaffolding-with-callbacks', function () {
    describe('/empty-directory', function () {
      it('exists', function () {
        expect(fixtures + '/empty-directory').to.be.a.directory();
      });
    });
    describe('/put-things-inside-me', function () {
      it('exists', function () {
        expect(fixtures + '/put-things-inside-me').to.be.a.directory();
      });
      describe('files-inside-directories.ext', function () {
        it('exists', function () {
          expect(fixtures + '/put-things-inside-me/files-inside-directories.ext').to.be.a.file();
        });
      });
      describe('/im-a-subdirectory', function () {
        it('exists', function () {
          expect(fixtures + '/put-things-inside-me/im-a-subdirectory').to.be.a.directory();
        });
        describe('/directoryception', function () {
          it('exists', function () {
            expect(fixtures + '/put-things-inside-me/im-a-subdirectory/directoryception').to.be.a.directory();
          });
        });
      });
    });
    describe('files-are-simple.txt', function () {
      it('exists', function () {
        expect(fixtures + '/files-are-simple.txt').to.be.a.file();
      });
      it('has the right contents', function () {
        expect(fixtures + '/files-are-simple.txt').to.have.content('And can have content');
      });
    });
  });
});