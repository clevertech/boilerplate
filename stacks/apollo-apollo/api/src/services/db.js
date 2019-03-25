const config = require('../../knexfile')

const db = require('knex')(config)

module.exports = db

