const { gql } = require('apollo-server-express')
const jwtSign = require('../services/jwt/sign')
const jwtCheck = require('../services/jwt/check')
const getUsers = require('../services/getUsers')
const { find, lowerCase } = require('lodash')

const typeDefs = gql`

  type AuthInfo {
    result: Boolean!
    authToken: String
  }
  
  extend type Query {
    isLogin: Boolean!
  }

  extend type Mutation {
    login(username: String!, password: String!): AuthInfo!
    signup(username: String!, password: String!): AuthInfo!
  }
`

const resolvers = {
  Query: {
    isLogin: (parent, args, { user }) => {
      return user ? true : false
    }
  },

  Mutation: {
    signup: async (parent, { username, password }, context) => {
      // TODO register users per app requirements, use the saved user here
      const user = {
        id: 2,
        username,
        password
      }

      const authToken = jwtSign(user)

      return {
        result: true,
        authToken
      }
    },

    login: async (parent, { username, password }, {req}) => {
      // fetch users from storage
      const users = await getUsers()
      const user = find(users, { username: lowerCase(username), password })

      // failed login
      if (!user) {
        return {
          result: false
        }
      }

      const authToken = jwtSign(user)

      // return the Authorization token used for the bearer token
      return {
        result: true,
        authToken
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
