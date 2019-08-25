module.exports = async function() {
  process.env = {
    JWT_SECRET: 'some-test-secret'
  }
}