const User = require('./db.js').User
const crypto = require('crypto')
const token = require('../token')

// 根据用户名查找用户
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

// 更新用户密码
const updatePassword = (username, password) => {
  const newPassword = crypto.createHash('sha1')
  newPassword.update(password)
  return new Promise((resolve, reject) => {
    User.update({username}, {password: newPassword.digest('hex'), update_time: new Date()}, (err, raw) => {
      if (err) reject(err)
      resolve(raw)
    })
  })
}

const Login = async (ctx) => {
  const hash = crypto.createHash('sha1')
  hash.update(ctx.request.body.password)
  // 拿到账号和密码
  let username = ctx.request.body.username
  let password = hash.digest('hex')

  let doc = await findUser(username)
  if (!doc) {
    ctx.status = 200
    ctx.body = {
      success: false,
      message: '检查到用户名不存在'
    }
  } else if (doc.password === password) {
    // 创建token
    let userToken = token.createToken(username)
    ctx.status = 200
    ctx.body = {
      success: true,
      username,
      token: userToken, // 登录成功要创建一个新的token,应该存入数据库
      create_time: doc.create_time,
      message: '登录成功'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      success: false,
      message: '密码错误'
    }
  }
}

// 注册
const Register = async (ctx) => {
  let username = ctx.request.body.username

  let doc = await findUser(username)
  if (doc) {
    ctx.status = 200
    ctx.body = {
      success: false,
      message: '用户名已存在'
    }
  } else {
    const hash = crypto.createHash('sha1')
    hash.update(ctx.request.body.password)
    let password = hash.digest('hex')
    ctx.status = 200

    let user = new User({
      username,
      password,
      create_time: new Date()
    })
    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    }).then(() => {
      ctx.status = 200
      ctx.body = {
        success: true,
        message: '注册成功'
      }
    }).catch((err) => {
      ctx.status = 500
      ctx.body = {
        success: false,
        message: err.message
      }
    })
  }
}

// 更改密码
const ChangePassword = async (ctx) => {
  const hash = crypto.createHash('sha1')
  hash.update(ctx.request.body.password)
  // 拿到账号和密码
  let username = ctx.request.body.username
  let password = hash.digest('hex')
  let newPassword = ctx.request.body.newPassword

  let doc = await findUser(username)
  if (!doc) {
    ctx.status = 200
    ctx.body = {
      success: false,
      message: '检查到用户名不存在'
    }
  } else if (doc.password === password) {
    // 更新密码
    let raw = await updatePassword(username, newPassword)
    console.log(raw)
    if (raw && raw.ok === 1) {
      ctx.status = 200
      ctx.body = {
        success: true,
        username,
        message: '密码修改成功'
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      success: false,
      message: '密码错误'
    }
  }
}

module.exports = {
  Login,
  Register,
  ChangePassword
}
