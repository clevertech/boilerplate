const { typeDefs: SampleTypeDefs, resolvers: SampleResolvers } = require('./Sample')

const typeDefs = [SampleTypeDefs]

const resolvers = {
  ...SampleResolvers
}

module.exports = {
  typeDefs,
  resolvers
}
