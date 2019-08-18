import { makeWrapResolversPlugin } from 'graphile-utils'
import { signJwt } from '../../helpers/jwt'
import redisJwtHelper from '../../helpers/redis/jwt'

export const wrapResolversPlugin = {
  LoginPayload: {
    async jwtToken(resolve, source, args, context, resolveInfo) {
      const signedJwt = signJwt(await resolve())
      try {
        await redisJwtHelper.whitelistJwt(signedJwt)
        context.responseHelper.setJwtCookie(signedJwt)
        return null
      } catch (e) {
        console.error(e)
      }
    },
  }
}

export default makeWrapResolversPlugin(wrapResolversPlugin);
