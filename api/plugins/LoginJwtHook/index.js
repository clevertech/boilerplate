import { makeWrapResolversPlugin } from 'graphile-utils'
import { signJwt } from '../../helpers/jwt'
import redisJwtHelper from '../../helpers/redis/jwt'

export const wrapResolversPlugin = {
  LoginPayload: {
    async jwtToken(resolve, source, args, context, resolveInfo) {
      const jwt = await resolve()
      if (!jwt) {
        throw new Error("Authentication failed")
      }
      try {
        const signedJwt = signJwt(jwt)
        await redisJwtHelper.whitelistJwt(signedJwt)
        context.responseHelper.setJwtCookie(signedJwt)
      } catch (e) {
        console.error(e)
      }
      return null
    },
  }
}

export default makeWrapResolversPlugin(wrapResolversPlugin);
