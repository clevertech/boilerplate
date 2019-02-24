import ApolloClient from 'apollo-boost'

const GRAPHQL_PORT = 8080

const config = {
  uri: window.location.protocol + '//' + window.location.hostname + ':' + GRAPHQL_PORT + '/graphql'
}

export const getClient = (customConfig) => {
  return new ApolloClient({ ...config, ...customConfig })
}
