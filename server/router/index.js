const Router = require('koa-router')
const router = new Router()
const homeRouter = require('./home')
const token = require('../token')

module.exports = (app) => {
  // router.get('/', homeRouter.index)
  router.post('/login', homeRouter.Login)
  router.post('/register', homeRouter.Register)
  router.post('/password-reset', token.checkToken, homeRouter.PasswordReset)

  app.use(router.routes()).use(router.allowedMethods())
}
