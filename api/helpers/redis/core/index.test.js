import subject from './'
import redis from 'redis'

jest.mock('redis')

describe('Redis core helper', () => {
  beforeEach(async () => {
    await subject.disconnect()
  })
  it('creates and caches a redis client only once', () => {
    subject.connect()
    expect(redis.createClient).toHaveBeenCalled()
    subject.connect()
    expect(redis.createClient).not.toHaveBeenCalled()
  })
  it('can disconnect a redis client', () => {
    subject.connect()
    expect(redis.createClient).toHaveBeenCalled()
    subject.disconnect()
    subject.connect()
    expect(redis.createClient).toHaveBeenCalled()
  })
  it('can set a hash in redis', async () => {
    const hashName = 'someHashName'
    const hashField = 'someHashField'
    const hashProp = 'someHashProp'

    await subject.hmset(hashName, hashField, hashProp)
    expect(redis.createClient).toHaveBeenCalled()
    expect(redis.hmset).toHaveBeenCalledWith(hashName, hashField, hashProp)
  })
})
