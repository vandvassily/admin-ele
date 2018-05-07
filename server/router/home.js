module.exports = {
  index: async (ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`
  }
}
