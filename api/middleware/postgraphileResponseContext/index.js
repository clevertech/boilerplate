export default function responseHelper(res) {
  return {
    setJwtCookie: function responseHelperSetJwtCookie(jwt) {
      res.cookie('__Host-jwt', jwt, {httpOnly: true, secure: true, sameSite: true})
    }
  }
}
