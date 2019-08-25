import jwt from 'jsonwebtoken'
import { signJwt, parseJwt } from './'

const signSpy = jest.spyOn(jwt, 'sign')
const verifySpy = jest.spyOn(jwt, 'verify')
const rawJwt = {'someString': 'someValue'}

describe('Jwt Helper', () => {
  afterEach(jest.clearAllMocks)
  it('signs jwts', () => {
    const signedJwt = signJwt(rawJwt)
    expect(signSpy).toHaveBeenCalled()
    expect(signedJwt).toEqual(expect.any(String))
  })
  it('decodes valid jwts', () => {
    const validJwt = jwt.sign(rawJwt, process.env.JWT_SECRET)
    expect(() => {
      const parsedJwt = parseJwt(validJwt)
      expect(verifySpy).toHaveBeenCalled()
      expect(parsedJwt).toEqual(expect.objectContaining(rawJwt))
    }).not.toThrow()
  })
  it('does not decode invalid jwts', () => {
    const invalidJwt = jwt.sign(rawJwt, "badkey")
    expect(() => {
      expect(parseJwt(invalidJwt)).toEqual(null)
      expect(verifySpy).toHaveBeenCalled()
    }).not.toThrow()
  })
})