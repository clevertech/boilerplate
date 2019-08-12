import jwt from 'jsonwebtoken'
import { signJwt } from './'
jest.mock('jsonwebtoken')
describe('Jwt Helper', () => {
  it('signs jwts', () => {
    signJwt('someJwt')
    expect(jwt.sign).toHaveBeenCalled()
  })
})