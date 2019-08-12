import { Pool } from 'pg'
import { logger } from '../log'

const pgConnectionString = process.env.DB_URI

export const pgPool = new Pool({ connectionString: pgConnectionString })

pgPool.on('connect', client => {
  client.query('SET statement_timeout TO 3000')
  client.on('notice', event => {
    logger.info(`[time:${new Date().toISOString()}]${event.message}`)
  })
})

export async function executeDbQuery(query, params = [], profileId = null ) {
  // Fetch a postgres client from the pool
  const dbClient = await pgPool.connect()
  let queryResult = null
  try {
    if (profileId) {
      // become the user to make the query
      await dbClient.query(`SELECT set_config('jwt.claims.profile_id', '${profileId}', false);`)
    }
    queryResult = await dbClient.query(query, params)
  } catch (e) {
    logger.error({ query, error: e, message: 'Error while executing a query' })
  } finally {
    // Release the dbClient back to the pool.
    await dbClient.release()
  }
  return queryResult
}
