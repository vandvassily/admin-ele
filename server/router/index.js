const Router = require('koa-router')
const router = new Router()
const homeRouter = require('./home')

module.exports = (app) => {
  router.get('/', homeRouter.index)

  app.use(router.routes()).use(router.allowedMethods())
}
