const { gql } = require('apollo-server-express')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
// prettier-ignore
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
    pubdate: DateTime
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  extend type Query {
    books: [Book]
  }
`


const resolvers = {
  Query: {
    books: (obj, args, context) => {
      if (!context.user) {
        throw new Error('Auth required')
      }
      const Book = context.dataSources.Book
      return Book.fetchAll()
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
