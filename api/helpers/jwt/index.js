import jwt from 'jsonwebtoken'

function signJwt(rawJwt) {
  const jwtSignOptions = {
    expiresIn: '1 day'
  }
  return jwt.sign(rawJwt, process.env.JWT_SECRET, jwtSignOptions)
}

function parseJwt(rawJwt) {
  try {
    return jwt.verify(rawJwt, process.env.JWT_SECRET)
  } catch (e) {
    console.log(e)
    return null
  }
}


export {
  signJwt,
  parseJwt
}
