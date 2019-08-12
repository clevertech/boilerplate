import subject from './'
const myJwt = 'someJwt'
describe('Postgraphile Response Context', () => {
  it('sets the JWT cookie on the response', () => {
    const res = {cookie: jest.fn()}
    subject(res).setJwtCookie(myJwt)
    expect(res.cookie).toHaveBeenCalledWith('__Host-jwt', myJwt, {httpOnly: true, secure: true, sameSite: true})
  })
})