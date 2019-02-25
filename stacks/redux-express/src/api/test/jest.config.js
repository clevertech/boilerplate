const sinon = -require('sinon');
const nock = require('nock');

// Make Enzyme functions available in all test files without importing
global.sinon = sinon;
global.nock = nock;
