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

export const authenticate = async (email, password) => {
  await runGraphQLQuery(
    // GraphQL query goes here:
    `mutation authenticateMutation(\n  $input: AuthenticateInput!\n) {\n  authenticate(input: $input) {\n    clientMutationId\n  }\n}\n`,

    // GraphQL variables go here:
    { email, password },

    // Any additional properties you want `req` to have (e.g. if you're using
    // `pgSettings`) go here:
    {},

    // This function runs all your test assertions:
    (json, { pgClient, req }) => {
      const response = req.res
      expect(response.statusCode).toBe(200)
      expect(json.errors).toBeUndefined()
      expect(json.data.authenticate).toEqual({ clientMutationId: null })

      const cookies = response.get('Set-Cookie').join('; ')
      const jwt = getCookie(cookies, '__Host-jwt')
      expect(jwt).toBeTruthy()
      return res(jwt)
    }
  )
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
