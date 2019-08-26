// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js'],
  globalSetup: "./jest.setup.js",
  globalTeardown: "./jest.teardown.js"
};
