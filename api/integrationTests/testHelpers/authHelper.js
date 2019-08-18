import { Client } from 'pg'
import uuidv4 from 'uuid/v4'
import request from 'supertest'
import { app } from '../../../src/app'

const getCookie = (cookies, name) => {
  var match = cookies.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) {
    return match[2]
  }
  return null
}
export const authenticate = async (email, password, trackingId = uuidv4()) => {
  const data = {
    id: 'authenticateMutation',
    query:
      'mutation authenticateMutation(\n  $input: AuthenticateInput!\n) {\n  authenticate(input: $input) {\n    clientMutationId\n  }\n}\n',
    variables: {
      input: {
        email,
        password,
        trackingId
      }
    }
  }
  const response = await request(app)
    .post('/graphql')
    .send(data)

  expect(response.statusCode).toBe(200)
  expect(response.body.errors).toBeUndefined()
  expect(response.body.data.authenticate).toEqual({ clientMutationId: null })

  const cookies = response.header['set-cookie'].join('; ')
  const jwt = getCookie(cookies, '__Host-jwt')
  const nonce = getCookie(cookies, '__Host-nonce')
  expect(jwt).toBeTruthy()
  expect(nonce).toBeTruthy()
  return { jwt, nonce }
}

/**
 * Create basic test user email: test+uxXT3F68@test.com, password: 1
 * @returns {Promise<void>}
 */
export const createBasicUser = async ({
  displayName = 'Test uxXT3F68',
  email = 'test+uxXT3F68@test.com',
  password = '1'
} = {}) => {
  const client = new Client({
    connectionString
  })

  let res

  try {
    await client.connect()
    const r = await client.query(
      `insert into account.profile(display_name) values ('${displayName}') returning id`
    )
    res = r.rows[0]
    expect(res.id).toBeTruthy()
    await client.query(`insert into account_private.credentials(profile_id, email, password, is_verified)
     values ('${
       res.id
     }', '${email.toLowerCase()}', public.crypt('${password}', public.gen_salt('bf')), true)`)
  } catch (e) {
    console.error('Error', e.message, e.stack)
  } finally {
    await client.end()
  }
  return res
}
