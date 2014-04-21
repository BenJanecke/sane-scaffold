global.chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon');
global.blanket = require("blanket");
function setup () {
  setupChai();
};

function setupChai() {
  chai.use(require('sinon-chai'));
  chai.use(require('chai-fs'));
}

module.exports = setup();