const { gql } = require('apollo-server-express')
const jwtSign = require('../services/jwt/sign')
const checkPassword = require('../services/auth/checkPassword')
const hashPassword = require('../services/auth/hashPassword')
const { lowerCase } = require('lodash')

const typeDefs = gql`

  type AuthInfo {
    result: Boolean!
    authToken: String
    message: String
  }
  
  input RegisterUserInput {
    username: String!
    password: String!
    email: String!
    display: String
  }
  
  extend type Query {
    isLogin: Boolean!
  }

  extend type Mutation {
    login(username: String!, password: String!): AuthInfo!
    signup(user: RegisterUserInput): AuthInfo!
  }
`

const resolvers = {
  Query: {
    isLogin: (parent, args, { user }) => {
      return user ? true : false
    }
  },

  Mutation: {
    signup: async (parent, { user: registerUser }, { dataSources }) => {

      // check for existing user
      const existingUser = await dataSources.User.query()
        .whereRaw('lower(username) = ? or email = ?', [registerUser.username, registerUser.email ])
        .first()

      if (existingUser) {
        return {
          result: false,
          message: "A user with that username or email already exists."
        }
      }

      // try to create the user
      registerUser.password = hashPassword(registerUser.password)

      return dataSources.User.query().insertGraph(registerUser).then((newUser) => {
        const authToken = jwtSign(newUser)
        return {
          result: true,
          authToken
        }
      }).catch((e) => {
        return {
          result: false,
          message: e.message
        }
      })
    },

    login: async (parent, { username, password }, { dataSources }) => {
      // fetch users from storage
      username = lowerCase(username)

      const user = await dataSources.User.query()
        .whereRaw('lower(username) = ?', username)
        .first()

      if (user) {
        // check password
        if (checkPassword(password, user.password)) {
          // return the Authorization token used for the bearer token
          return {
            result: true,
            authToken: jwtSign(user)
          }
        }
      }

      // failed login, no user found or failed password check
      return {
        result: false
      }

    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
