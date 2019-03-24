const { gql } = require('apollo-server-express')

const typeDefs = gql`
  extend type Query {
    isLogin: Boolean!
  }

  extend type Mutation {
    login(username: String!, pwd: String!): Boolean!
    signup(username: String!, pwd: String!): Boolean!
  }
`

const resolvers = {
  Query: {
    isLogin: (parent, args, { user }) => {
      return user ? true : false
    }
  },

  Mutation: {
    signup: async (parent, {username, pwd}, context) => {
      // register users per app requirements
      return true
    },

    login: async (parent, {username, pwd}, {req}) => {
      // check a users credentials
      // return the Authorization token used for the bearer token
      return true
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
