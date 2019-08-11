const redis = jest.genMockFromModule('redis')

const dataStore = {}
export const mockRedisClient = {
  hmset: jest.fn((hash,key,value) => {
    if (datastore[hash]) {
      datastore[hash][key] = value
    } else {
      datastore[hash] = {key: value}
    }
  }),
  hmget: jest.fn((hash,key,value) => {
    if (datastore[hash]) {
      return datastore[hash][key]
    } else {
      return undefined
    }
  })
}

redis.createClient = function createClient(port, client) {
  return mockRedisClient
}

export default redis
