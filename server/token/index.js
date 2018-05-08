const jwt = require('jsonwebtoken')
const secret = 'zhs' // 加密秘钥
const tokenTime = '1h' // token有效时间

const createToken = (username) => {
  const token = jwt.sign({
    username: username
  }, secret, {
    expiresIn: tokenTime // 到期时间
  })
  return token
}

const checkToken = (token) => {
  jwt.verify(token, secret, function (err, decoded) {
    let result = {
      success: false,
      username: '',
      message: ''
    }
    if (!err) {
      console.log(decoded) // 会输出username
      result.success = true
      result.username = decoded.username
    } else {
      result.message = err.message
    }
    return result
  })
}

module.exports = {
  createToken,
  checkToken
}
