import {sign} from 'jsonwebtoken'
import subject, {redisJwtWhitelistPrefix} from './'
import redisCore from '../core'
jest.mock('../core')

let myRawJwt = {profileId: '1111-111-11-11-1111'}
let myJwt = sign(myRawJwt, process.env.JWT_SECRET)
describe('Redis JWT helper', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('allows whitelisting of the JWT', async () => {
    await subject.whitelistJwt(myJwt)
    expect(redisCore.set).toHaveBeenCalledWith('jwt-whitelist:'+myJwt, myRawJwt.profileId)
  })

  it('allows checking the JWT whitelist for a given JWT', async () => {
    redisCore.get.mockImplementation((checkJwt) => {
      return checkJwt === (redisJwtWhitelistPrefix+myJwt)
    })

    const badJwt = 'bad jwt'
    const isMyJwtValid = await subject.checkJwt(myJwt)
    expect(redisCore.get).toHaveBeenCalledWith('jwt-whitelist:'+ myJwt)
    expect(isMyJwtValid).toBe(true)
    redisCore.get.mockClear()

    const isBadJwtValid = await subject.checkJwt(badJwt)
    expect(redisCore.get).toHaveBeenCalledWith('jwt-whitelist:'+ badJwt)
    expect(isBadJwtValid).toBe(false)
  })

  it('allows removing a JWT from the whitelist', async () => {
    await subject.dewhitelistJwt(myJwt)
    expect(redisCore.del).toHaveBeenCalledWith('jwt-whitelist:'+ myJwt)
  })
})