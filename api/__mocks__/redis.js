const redis = jest.genMockFromModule('redis')

const dataStore = {}
export const mockRedisClient = {
  del: jest.fn(async (key, callback) => callback()),
  set: jest.fn(async (key, value, callback) => callback()),
  get: jest.fn(async (key, callback) => callback()),
  hmset: jest.fn(async (hash, object, callback) => callback()),
  hmget: jest.fn(async (hash, field, callback) => callback()),
  hmgetall: jest.fn(async (hash, callback) => callback()),
  quit: jest.fn(async () => {}),
}

redis.createClient = jest.fn(function createClient(port, client) {
  return mockRedisClient
})

export default redis
