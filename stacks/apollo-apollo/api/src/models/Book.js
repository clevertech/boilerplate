const { Model } = require('objection')

class Book extends Model {
  static get tableName() {
    return 'books'
  }
}

module.exports = Book
