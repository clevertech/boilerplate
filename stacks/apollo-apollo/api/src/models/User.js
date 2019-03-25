const { Model } = require('objection')
const { hashSync, compare } = require('bcrypt')

class User extends Model {
  static get tableName() {
    return 'users'
  }
}

module.exports = User
