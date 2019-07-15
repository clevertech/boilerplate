import jwt from 'jsonwebtoken'
import ramda from 'ramda'
//import { redisUtils } from './redis'

function signJwt(rawJwt) {
  const jwtSignOptions = {
    expiresIn: '1 day'
  }
  return jwt.sign(rawJwt, process.env.JWT_SECRET, jwtSignOptions)
  // const profileId = rawPayload ? rawPayload.profile_id : null

  // redisUtils.removeKeyFromHash('jwt', profileId)
  // redisUtils.setKeyInHash('jwt', profileId, newJwt)
}


export { signJwt }
