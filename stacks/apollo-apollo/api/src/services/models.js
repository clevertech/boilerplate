const { Model } = require('objection')

const models = require('../models')
const db = require('./db')

// tie the models to the database
Model.knex(db)

module.exports = models
