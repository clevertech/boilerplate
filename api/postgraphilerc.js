const POSTGRAPHILE_SCHEMAS = 'account'

const POSTGRAPHILE_OPTIONS = {
  ownerConnectionString: process.env.OWNER_CONNECTION_STRING,
  pgDefaultRole: 'appuser',
  jwtPgTypeIdentifier: 'account.jwt_token',
  jwtSecret: 'my-local-jwt-secret-for-development-only',
  legacyRelations: 'omit',
  simpleCollections: 'omit',
  bodySizeLimit: '100kB',
  extendedErrors: ['hint','detail','errcode'],
  ignoreRBAC: false,
  ignoreIndexes: false,
  showErrorStack: 'json',
  sortExport: true,
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  graphiqlRoute: '/graphiql',
  graphqlRoute: '/graphql',
  disableQueryLog: false,
  dynamicJson: false,
  retryOnInitFailure: true
}

export default {
  POSTGRAPHILE_OPTIONS,
  POSTGRAPHILE_SCHEMAS,
}
