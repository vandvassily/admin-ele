const log4js = require('log4js')
const path = require('path')

log4js.configure({
  appenders: {
    error: {
      type: 'file',
      filename: path.join(__dirname, '/../../logs/error.log'),
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100 // 当文件内容超过文件存储空间时，备份文件的数量
    },
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: path.join(__dirname, '/../../logs/res.log'),
      pattern: 'yyyy-MM-dd.log', // 日志输出模式
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100
    },
    request: {
      type: 'dateFile',
      category: 'reqLogger',
      filename: path.join(__dirname, '/../../logs/req.log'),
      pattern: 'yyyy-MM-dd.log', // 日志输出模式
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100
    }
  },
  categories: {
    default: {
      appenders: ['request'],
      level: 'info'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    },
    response: {
      appenders: ['response'],
      level: 'info'
    },
    request: {
      appenders: ['request'],
      level: 'info'
    }
  }
})

let logger = {}

const formatError = (ctx, err, costTime) => {
  let method = ctx.method
  let url = ctx.url
  let body = ctx.request.body['username']
  let userAgent = ctx.header['user-agent']
  return {method, url, body, userAgent, costTime, err}
}
const formatRes = (ctx, costTime) => {
  let method = ctx.method
  let url = ctx.url
  let body = ctx.request.body['username']
  let response = ctx.response
  let userAgent = ctx.header['user-agent']
  return {method, url, body, costTime, userAgent, response}
}

const formatReq = (ctx) => {
  let method = ctx.method
  let url = ctx.url
  let body = ctx.request.body['username']
  let request = ctx.request
  let userAgent = ctx.header['user-agent']
  return {method, url, body, userAgent, request}
}

let errorLogger = log4js.getLogger('error')
let resLogger = log4js.getLogger('response')
let reqLogger = log4js.getLogger('request')
// 封装错误日志
logger.errLogger = (ctx, error, resTime) => {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime))
  }
}
// 封装响应日志
logger.resLogger = (ctx, resTime) => {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime))
  }
}

// 封装请求日志
logger.reqLogger = (ctx) => {
  if (ctx) {
    reqLogger.info(formatReq(ctx))
  }
}

module.exports = logger

// const logger = log4js.getLogger('cheese')
// logger.trace('Entering cheese testing')
// logger.debug('Got cheese.')
// logger.info('Cheese is Gouda.')
// logger.warn('Cheese is quite smelly.')
// logger.error('Cheese is too ripe!')
// logger.fatal('Cheese was breeding ground for listeria.')
