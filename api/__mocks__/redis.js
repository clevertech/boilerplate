const redis = jest.genMockFromModule('redis')

const dataStore = {}
redis.createClient = function createClient(port, client) {
  return {
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
}

export default redis
