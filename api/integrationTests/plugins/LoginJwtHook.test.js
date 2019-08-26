import { setup, teardown, truncate, runGraphQLQuery } from "../testHelpers/postgraphileTestHelper"
import { signup } from '../testHelpers/authHelper'

describe('LoginJwtHook Plugin', () => {
  beforeAll(setup)
  afterEach(truncate)
  afterAll(teardown)
  // no need to reinit db due to postgraphileTestHelper's use of transactions

  it("should return a JWT on successful login", async () => {
    const testUser = {
      displayName: 'TestUser',
      email: 'test@example.com',
      password: 'someTestPassword'
    }
    await signup(testUser)
    await runGraphQLQuery(
      // GraphQL query goes here:
      `mutation Login($input: LoginInput!){ login( input: $input ) { jwtToken  } }`,

      // GraphQL variables go here:
      {input: {username: testUser.email, password: testUser.password}},

      // Any additional properties you want `req` to have (e.g. if you're using
      // `pgSettings`) go here:
      {},

      // This function runs all your test assertions:
      (json, { req }) => {
        const result = json.data.login
        const authCookie = req.res.get('Set-Cookie')
        expect(json.errors).toBeUndefined()
        expect(result.jwtToken).toBeNull()
        expect(authCookie).toEqual(expect.stringMatching(/^__Host-jwt=[^;]*; HttpOnly; Secure; SameSite=Strict$/))
      }
    )
  })
})
