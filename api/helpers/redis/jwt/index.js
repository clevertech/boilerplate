import subject from './'
import redisCore from '../core'

const redisJwtHelper = {}
export const redisJwtWhitelistPrefix = 'jwt-whitelist:'

redisJwtHelper.whitelistJwt = async function redisJwtHelperWhitelistJwt(jwt) {
  return redisCore.set(redisJwtWhitelistPrefix+jwt)
}
redisJwtHelper.dewhitelistJwt = async function redisJwtHelperDewhitelistJwt(jwt) {
  return redisCore.del(redisJwtWhitelistPrefix+jwt)
}
redisJwtHelper.checkJwt = async function redisJwtHelperCheckJwt(jwt) {
  return redisCore.get(redisJwtWhitelistPrefix+jwt)
}

export default redisJwtHelper
