const UserController = require('../db/user.js')
module.exports = {
  index: async (ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`
  },
  Login: UserController.Login,
  Register: UserController.Register,
  PasswordReset: UserController.ChangePassword
}
