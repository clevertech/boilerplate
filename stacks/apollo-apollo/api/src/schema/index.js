// pull in and build the type definitions and resolvers in this file
// other files in `/schema` can be limited to app objects/contexts

const {
  typeDefs: GlobalTypeDefs,
  resolvers: GlobalResolvers
} = require('./Global')

const {
  typeDefs: AuthTypeDefs,
  resolvers: AuthResolvers
} = require('./Auth')

const {
  typeDefs: DateTimeTypeDefs,
  resolvers: DateTimeResolvers
} = require('./DateTime')

const {
  typeDefs: BookTypeDefs,
  resolvers: BookResolvers
} = require('./Book')

// merge resolvers
const resolvers = {
  ...GlobalResolvers,
  ...DateTimeResolvers,
  Query: {
    ...AuthResolvers.Query,
    ...BookResolvers.Query
  },
  Mutation: {
    ...AuthResolvers.Mutation,
  }
}

// merge graphql type definitions
const typeDefs = [
  GlobalTypeDefs,
  AuthTypeDefs,
  DateTimeTypeDefs,
  BookTypeDefs
]

// export utils from the schema for use by the ApolloServer config
module.exports = {
  typeDefs,
  resolvers
}
