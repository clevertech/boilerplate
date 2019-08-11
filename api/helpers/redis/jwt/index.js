import subject from './'
import redis from 'redis'

jest.mock(redis)

const jwtString = ""+Math.random()

describe('Redis JWT Helper', () => {
   it('can write JWT', () => {
      subject.writeJwt(jwtString)
   })
})