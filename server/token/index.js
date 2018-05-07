const jwt = require('jsonwebtoken')
const secret = 'zhs' // 加密秘钥
const tokenTime = '1h' // token有效时间

const createToken = (username) => {
  const token = jwt.sign({
    username: username
  }, secret, {
    expiresIn: tokenTime // 秒到期时间
  })
  return token
}

const checkToken = (token) => {
  jwt.verify(token, secret, function (err, decoded) {
    if (!err) {
      console.log(decoded) // 会输出username
    } else {
      let error = {
        name: err.name,
        message: err.message
      }
      console.log(error)
    }
  })
}

module.exports = {
  createToken,
  checkToken
}
