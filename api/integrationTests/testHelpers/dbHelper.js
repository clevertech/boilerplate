import { Client } from 'pg'
import { logger } from '../../../src/helpers/log'

const connectionString = process.env.DB_URI

export const flushDatabase = async () => {
  const client = new Client({
    connectionString: connectionString
  })
  try {
    await client.connect()
    await client.query(
      `truncate table organization.organization, account.profile, room.liveroom cascade`
    )
  } catch (e) {
    console.error('Error', e.message, e.stack, e)
  } finally {
    await client.end()
  }
}

export const executeQuery = async (sqlQuery, values = []) => {
  const client = new Client({
    connectionString
  })

  client.on('notice', event => {
    logger.info(`[time:${new Date().toISOString()}]${event.message}`)
  })

  let res
  try {
    await client.connect()
    const r = await client.query(sqlQuery, values)
    res = r.rows
  } catch (e) {
    console.error('Error', e.message, e.stack)
  } finally {
    await client.end()
  }
  return res
}
