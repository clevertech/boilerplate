import request from "supertest"
import app from "../../app"

import { setup, teardown, runGraphQLQuery } from "../testHelpers/postgraphileTestHelper"


describe('LoginJwtHook Plugin', () => {
  beforeAll(setup)
  afterAll(teardown)
  // no need to reinit db due to postgraphileTestHelper's use of transactions

  test("should return a JWT", async () => {
    await runGraphQLQuery(
      // GraphQL query goes here:
      `{ nodeId }`,

      // GraphQL variables go here:
      {},

      // Any additional properties you want `req` to have (e.g. if you're using
      // `pgSettings`) go here:
      {
        // Assuming you're using Passport.js / pgSettings, you could pretend
        // to be logged in by setting `req.user` to `{id: 17}`:
        user: { id: 17 },
      },

      // This function runs all your test assertions:
      async (json, { pgClient }) => {
        expect(json.errors).toBeFalsy()
        expect(json.data.nodeId).toBeTruthy()

        // If you need to, you can query the DB within the context of this
        // function - e.g. to check that your mutation made the changes you'd
        // expect.
        const { rows } = await pgClient.query(
          `SELECT * FROM app_public.users WHERE id = $1`,
          [17]
        )
        if (rows.length !== 1) {
          throw new Error("User not found!")
        }
      }
    )
  })
})
