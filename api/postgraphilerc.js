const POSTGRAPHILE_SCHEMAS = 'account'

const POSTGRAPHILE_OPTIONS = {
  ownerConnectionString: process.env.OWNER_CONNECTION_STRING,
  pgDefaultRole: 'anonymous',
  jwtPgTypeIdentifier: 'account.jwt_token',
  jwtSecret: process.env.JWT_SECRET,
  legacyRelations: 'omit',
  simpleCollections: 'omit',
  bodySizeLimit: '100kB',
  extendedErrors: process.env.EXTENDED_ERRORS,
  ignoreRBAC: false,
  ignoreIndexes: false,
  showErrorStack: 'json',
  sortExport: true,
  watchPg: true,
  graphiql: true,
  classicIds: true,
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
