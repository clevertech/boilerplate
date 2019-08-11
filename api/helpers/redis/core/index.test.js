import subject from './'
import redis from 'redis'
import redisMock, {mockRedisClient} from '../../../__mocks__/redis'

jest.mock('redis')

describe('Redis core helper', () => {
  beforeEach(async () => {
    await subject.disconnect()
  })
  it('creates and caches a redis client only once', () => {
    subject.connect()
    expect(redisMock.createClient).toHaveBeenCalled()
    subject.connect()
    expect(redisMock.createClient).not.toHaveBeenCalled()
  })
  it('can disconnect a redis client', () => {
    subject.connect()
    expect(redisMock.createClient).toHaveBeenCalled()
    subject.disconnect()
    subject.connect()
    expect(redisMock.createClient).toHaveBeenCalled()
  })
  it('can set a hash in redis', async () => {
    const hashName = 'someHashName'
    const hashField = 'someHashField'
    const hashProp = 'someHashProp'

    await subject.hmset(hashName, hashField, hashProp)
    expect(redisMock.createClient).toHaveBeenCalled()
    expect(mockRedisClient.hmset).toHaveBeenCalledWith(hashName, hashField, hashProp)
  })
  it('can get a hash from redis', async () => {
    const hashName = 'someHashName'
    const hashField = 'someHashField'

    await subject.hmget(hashName, hashField)
    expect(redisMock.createClient).toHaveBeenCalled()
    expect(mockRedisClient.hmset).toHaveBeenCalledWith(hashName, hashField)
  })
})
