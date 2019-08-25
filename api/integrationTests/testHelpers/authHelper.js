import { setup, teardown, runGraphQLQuery } from "../testHelpers/postgraphileTestHelper"
jest.unmock('pg')

const pg = require('pg')
const getCookie = (cookies, name) => {
  var match = cookies.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) {
    return match[2]
  }
  return null
}

/**
 * Create basic test user email: test+uxXT3F68@test.com, password: 1
 * @returns {Promise<void>}
 */
export const signup = async ({
  displayName,
  email,
  password
} = {}) => {
  const rootPgPool = new pg.Pool({
    connectionString: process.env.TEST_ROOT_DATABASE_URL,
  });
  const client = await rootPgPool.connect()
  await client.query('select account.signup($1,$2,$3);', [
    displayName,
    email,
    password
  ])
}
