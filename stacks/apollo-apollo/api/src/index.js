const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')
const winston = require('winston')
const app = require('./app')
const path = '/graphql'
const port = +process.env.PORT

require('./error-tracking')

// setup data sources, e.g. knex Models
const Book = require('./models/Book')

const apolloServerConfig = {
  typeDefs,
  resolvers,

  // passed into the context of resolvers
  dataSources: () => {
    return {
      Book
    }
  },

  // extract data from the express js request and/or express middleware
  // context: ({ res }) => ({
  //   accessToken: res.locals.accessToken || null,
  //   user: res.locals.user || null
  // })
}

const server = new ApolloServer(apolloServerConfig)

server.applyMiddleware({ app, path })

app.listen(port, () => {
  winston.info('NODE_ENV: ' + process.env.NODE_ENV)
  winston.info(`Api listening on port ${port}${server.graphqlPath}`)
})

module.exports = server
