const Koa = require("koa");

const router = require("./router");

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
const handler = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

// 挂载路由
app.use(handler);
router(app);

// 在端口3000监听:
app.listen(3000);
console.log("app started at port 3000...");