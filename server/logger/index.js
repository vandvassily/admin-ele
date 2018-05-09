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
    }
  },
  categories: {
    default: {
      appenders: ['response'],
      level: 'info'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    },
    response: {
      appenders: ['response'],
      level: 'info'
    }
  }
})

const logger = log4js.getLogger('cheese')
logger.trace('Entering cheese testing')
logger.debug('Got cheese.')
logger.info('Cheese is Gouda.')
logger.warn('Cheese is quite smelly.')
logger.error('Cheese is too ripe!')
logger.fatal('Cheese was breeding ground for listeria.')
