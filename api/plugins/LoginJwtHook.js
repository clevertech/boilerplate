import { makeWrapResolversPlugin } from 'graphile-utils'
import { signJwt } from '../helpers/jwt'
import redisJwtHelper from '../helpers/redis/jwt'

export default makeWrapResolversPlugin({
  LoginPayload: {
    async jwtToken(resolve, source, args, context, resolveInfo) {
      const signedJwt = signJwt(await resolve())
      redisJwtHelper.whitelistJwt(signedJwt)
      responseHelper.setJwtCookie(signedJwt)
      return null
    },
  },
});
