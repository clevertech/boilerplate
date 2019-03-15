const { gql } = require('apollo-server-express')

// prettier-ignore
const typeDefs = gql`
  # The _empty queries and mutations are necessary because
  # graphql-js cannot have empty root types and we only extend
  # these types later on
  # Ref: apollographql/graphql-tools#293
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

  # common enums

  enum OrderByDirection {
    asc
    desc
  }
  
  # application wide pagination input
  input PaginationInput {
    pageNum: Int!
    pageSize: Int
  }

  # application wide order by input
  input OrderByInput {
    field: String!
    direction: OrderByDirection!
  }

  type PageInfo {
    totalItems: Int
    totalPages: Int
  }

  interface Feed {
    pageInfo: PageInfo
  }
`

const resolvers = {
  Feed: {
    __resolveType() {
      return null
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
