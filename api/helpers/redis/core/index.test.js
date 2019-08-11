import subject from './'
import redis from 'redis'
import redisMock, {mockRedisClient} from '../../../__mocks__/redis'

jest.mock('redis')

describe('Redis core helper', () => {
  const OLD_ENV = process.env

  beforeEach(async () => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    await subject.disconnect()
  })
  it('creates and caches a redis client only once', async () => {
    subject.connect()
    expect(redisMock.createClient).toHaveBeenCalled()
    redisMock.createClient.mockClear()
    subject.connect()
    expect(redisMock.createClient).not.toHaveBeenCalled()
  })
  it('can disconnect a redis client', async () => {
    subject.connect()
    expect(redisMock.createClient).toHaveBeenCalled()
    subject.disconnect()
    subject.connect()
    expect(redisMock.createClient).toHaveBeenCalled()
  })
  it('can set a hash in redis', async () => {
    const hashName = 'someHashName'
    const hashObject = {'someKey': 'someVal', 'somekey2': 'someval2'}

    await subject.hmset(hashName, hashObject)
    expect(redisMock.createClient).toHaveBeenCalled()
    expect(mockRedisClient.hmset).toHaveBeenCalledWith(hashName, hashObject, expect.any(Function))
  })
  it('can get a hash field from redis', async () => {
    const hashName = 'someHashName'
    const hashField = 'someHashField'

    await subject.hmget(hashName, hashField)
    expect(redisMock.createClient).toHaveBeenCalled()
    expect(mockRedisClient.hmget).toHaveBeenCalledWith(hashName, hashField, expect.any(Function))
  })
  it('can get a hash from redis', async () => {
    const hashName = 'someHashName'

    await subject.hmgetall(hashName)
    expect(redisMock.createClient).toHaveBeenCalled()
    expect(mockRedisClient.hmgetall).toHaveBeenCalledWith(hashName, expect.any(Function))
  })
})
