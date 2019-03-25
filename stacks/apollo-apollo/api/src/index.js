const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')
const winston = require('winston')
const app = require('./app')
const path = '/graphql'
const port = +process.env.PORT

require('./error-tracking')

// setup data sources
const dataSourceModels = require('./services/models')

const apolloServerConfig = {
  typeDefs,
  resolvers,

  // define the data sources for our resolvers
  dataSources: () => dataSourceModels,

  // extract data from the express js request and/or express middleware
  context: ({ req }) => ({
    user: req.user
  })
}

const server = new ApolloServer(apolloServerConfig)

server.applyMiddleware({ app, path })

app.listen(port, () => {
  winston.info('NODE_ENV: ' + process.env.NODE_ENV)
  winston.info(`Api listening on port ${port}${server.graphqlPath}`)
})

module.exports = server
