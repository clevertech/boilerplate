const { gql } = require('apollo-server-express')
const { GraphQLDateTime } = require('graphql-iso-date')

// prettier-ignore
const typeDefs = gql`
  scalar DateTime
`

const resolvers = {
  DateTime: GraphQLDateTime
}

module.exports = {
  typeDefs,
  resolvers
}
