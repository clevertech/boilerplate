import { setup, teardown, runGraphQLQuery } from "../testHelpers/postgraphileTestHelper"
import { signup } from '../testHelpers/authHelper'

describe('LoginJwtHook Plugin', () => {
  beforeAll(setup)
  afterAll(teardown)
  // no need to reinit db due to postgraphileTestHelper's use of transactions

  it("should return a JWT", async () => {
    const testUser = {
      displayName: 'TestUser',
      email: 'test@example.com',
      password: 'someTestPassword'
    }
    await signup(testUser)
    await runGraphQLQuery(
      // GraphQL query goes here:
      `mutation Login($input: LoginInput!){ login( input: $input ) { clientMutationId jwtToken  } }`,

      // GraphQL variables go here:
      {input: {username: testUser.email, password: testUser.password}},

      // Any additional properties you want `req` to have (e.g. if you're using
      // `pgSettings`) go here:
      {},

      // This function runs all your test assertions:
      (json, { req }) => {
        expect(json.errors).toBeFalsy()
        console.log(req.res.get('Set-Cookie'))
        expect(json.data.clientMutationId).toBeTruthy()
        expect(json.data.jwtToken).toBeFalsy()
      }
    )
  })
})
