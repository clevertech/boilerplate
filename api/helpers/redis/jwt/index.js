import redisCore from '../core'
import { parseJwt } from '../../jwt'

const redisJwtHelper = {}
export const redisJwtWhitelistPrefix = 'jwt-whitelist:'

redisJwtHelper.whitelistJwt = async function redisJwtHelperWhitelistJwt(jwt) {
  const parsedJwt = parseJwt(jwt)
  return await redisCore.set(redisJwtWhitelistPrefix+jwt, parsedJwt.profileId)
}
redisJwtHelper.dewhitelistJwt = async function redisJwtHelperDewhitelistJwt(jwt) {
  return await redisCore.del(redisJwtWhitelistPrefix+jwt)
}
redisJwtHelper.checkJwt = async function redisJwtHelperCheckJwt(jwt) {
  return await redisCore.get(redisJwtWhitelistPrefix+jwt)
}

export default redisJwtHelper
