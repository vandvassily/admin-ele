const jwt = require('jsonwebtoken')
const secret = 'zhs' // 加密秘钥
const tokenTime = '600s' // token有效时间

const createToken = (username) => {
  const token = jwt.sign({
    username: username
  }, secret, {
    expiresIn: tokenTime // 到期时间
  })
  return token
}

const checkToken = async (ctx, next) => {
  if (ctx.request.header['authorization']) {
    const token = ctx.request.header['authorization']
    try {
      await jwt.verify(token, secret)
    } catch (error) {
      ctx.throw(401, 'invalid token')
    }
  } else {
    ctx.throw(401, 'no token')
  }
}

module.exports = {
  createToken,
  checkToken
}
