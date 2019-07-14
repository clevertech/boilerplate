import { postgraphile } from "postgraphile"
import postgraphileConfig from "../postgraphilerc.js"

console.log({postgraphileConfig})

const db = process.env.DATABASE_URL
const schemas = postgraphileConfig.POSTGRAPHILE_SCHEMAS
const options = postgraphileConfig.POSTGRAPHILE_OPTIONS

console.log('OPTIONS:' + options)

function installPostgraphile(app, additionalContext) {
    app.use(postgraphile(db, schemas, {
      // Import our shared options
      ...options,

      // The return value of this is added to `context` - the third argument of
      // GraphQL resolvers. This is useful for our custom plugins.
      additionalGraphQLContextFromRequest(req) {
        return {
          ...additionalContext,
        }
      },
    })
  )
}

export default installPostgraphile
