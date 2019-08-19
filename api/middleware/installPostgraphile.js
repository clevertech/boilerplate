import { postgraphile } from "postgraphile"
import postgraphileConfig from "../postgraphilerc.js"
import LoginJwtHook from '../plugins/LoginJwtHook'
import responseHelper from './postgraphileResponseContext'

const db = process.env.DATABASE_URL
export const schemas = postgraphileConfig.POSTGRAPHILE_SCHEMAS
export const options = postgraphileConfig.POSTGRAPHILE_OPTIONS
export const appendPlugins = [
  LoginJwtHook
]

export const additionalGraphQLContextFromRequest = function additionalGraphQLContextFromRequest(req) {
  const res = req.res;
  return {
    res,
    req,
    responseHelper: responseHelper(res)
  }
}

const postgraphileOptions = {
  // Import our shared options
  ...options,

  // our schema plugins
  appendPlugins,

  // The return value of this is added to `context` - the third argument of
  // GraphQL resolvers. This is useful for our custom plugins.
  additionalGraphQLContextFromRequest
}

function installPostgraphile(app) {
  app.use(postgraphile(db, schemas, postgraphileOptions))
}

export default installPostgraphile
