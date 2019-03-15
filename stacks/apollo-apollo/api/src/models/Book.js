// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    pubdate: '2017-01-10T21:33:15.233Z'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    // pubdate: '2017-01-10T21:33:15.233Z'
    pubdate: '2017-01-10T21:33:15.233Z'
  }
]

class Book {
  static fetchAll() {
    return books
  }
}

module.exports = Book
