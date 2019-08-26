import { wrapResolversPlugin } from '../LoginJwtHook'
import { signJwt } from '../../helpers/jwt'
import redisJwt from '../../helpers/redis/jwt'

jest.mock('../../helpers/jwt')
jest.mock('../../helpers/redis/jwt')


const mockJwt = {profileId: '1111-111-1111-111-11'}
const mockSignedJwt = 'signedjwt'
const mockSuccessfulResolver = async () => {
  return mockJwt
}

const mockUnsuccessfulResolver = async () => {
  return null
}

const mockResponseHelper = {
  setJwtCookie: jest.fn()
}

const mockResponseHelperWithError = {
  setJwtCookie: jest.fn(() => {throw new Error('BadError')})
}

describe("LoginJwtHook plugin", () => {
  it("hooks the login payload", async () => {
    await expect(wrapResolversPlugin.LoginPayload.jwtToken).toEqual(expect.any(Function))
  })
  it("signs the JWT", async () => {
    await wrapResolversPlugin.LoginPayload.jwtToken(mockSuccessfulResolver, {}, {}, {responseHelper: mockResponseHelper})
    expect(signJwt).toHaveBeenCalledWith(mockJwt)
  })
  it("saves the JWT to redis", async () => {
    signJwt.mockImplementationOnce(() => mockSignedJwt)
    await wrapResolversPlugin.LoginPayload.jwtToken(mockSuccessfulResolver, {}, {}, {responseHelper: mockResponseHelper})
    expect(redisJwt.whitelistJwt).toHaveBeenCalledWith(mockSignedJwt)
  })
  it("returns the JWT as an HTTP-only, SameSite, Secure cookie", async () => {
    signJwt.mockImplementationOnce(() => mockSignedJwt)
    await wrapResolversPlugin.LoginPayload.jwtToken(mockSuccessfulResolver, {}, {}, {responseHelper: mockResponseHelper})
    expect(mockResponseHelper.setJwtCookie).toHaveBeenCalledWith(mockSignedJwt)
  })
  it("throws an error when auth fails", () => {
    expect(() => {
      const result = wrapResolversPlugin.LoginPayload.jwtToken(mockUnsuccessfulResolver, {}, {}, {responseHelper: mockResponseHelper})
      expect(result).toBeUndefined()
    }).toThrow()
  })
  it("handles errors during JWT signing", () => {
    signJwt.mockImplementationOnce(() => { throw new Error("bad error")})
    expect (async () => {
      const result = await wrapResolversPlugin.LoginPayload.jwtToken(mockSuccessfulResolver, {}, {}, {responseHelper: mockResponseHelper})
      expect(result).toBeNull()
    }).not.toThrow()
  })
  it("handles errors during redis whitelisting", () => {
    redisJwt.whitelistJwt.mockImplementationOnce(() => { throw new Error("bad error")})
    expect(async () => {
      const result = await wrapResolversPlugin.LoginPayload.jwtToken(mockSuccessfulResolver, {}, {}, {responseHelper: mockResponseHelper})
      expect(result).toBeNull()
    }).not.toThrow()
  })
  it("handles errors during cookie setting", () => {
    expect(async () => {
      const result = await wrapResolversPlugin.LoginPayload.jwtToken(mockSuccessfulResolver, {}, {}, {responseHelper: mockResponseHelperWithError})
      expect(result).toBeNull()
    }).not.toThrow()
  })
})