import { makeWrapResolversPlugin } from 'graphile-utils'
import { signJwt } from '../helpers/jwt'

export default makeWrapResolversPlugin({
  LoginPayload: {
    async jwtToken(resolve, source, args, context, resolveInfo) {
      const oldJwt = await resolve()
      return signJwt(await resolve())
      //return null
    },
  },
});
