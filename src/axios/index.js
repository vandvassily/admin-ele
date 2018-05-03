import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '../router'

const devUrl = 'http://localhost:8080/api'
const prodUrl = 'http://www.baidu.com'

const apiBaseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl
const Axios = axios.create({
  baseURL: apiBaseUrl, // 因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
})

Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      // 序列化
      config.data = qs.stringify(config.data)
    }

    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  error => {
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (res.data && !res.data.success) {
      Message({
        //  饿了么的消息弹窗组件,类似toast
        showClose: true,
        message: res.data.error.message.message
          ? res.data.error.message.message
          : res.data.error.message,
        type: 'error'
      })
      return Promise.reject(res.data.error.message)
    }
    return res
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem('loginUserBaseInfo')) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
      router.push({
        path: '/404'
      })
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime *
        1000
      let nowTime = new Date().getTime() // 当前时间的时间戳
      console.log(nowTime, lifeTime)
      console.log(nowTime > lifeTime)
      if (nowTime > lifeTime) {
        Message({
          showClose: true,
          message: '登录状态信息过期,请重新登录',
          type: 'error'
        })
        router.push({
          path: '/404'
        })
      } else {
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        if (error.response.status === 404) {
          router.push({
            path: '/404'
          })
        }
      }
    }
    // 返回 response 里的错误信息
    // let errorInfo = error.data.error ? error.data.error.message : error.data
    return Promise.reject(error)
  }
)

export default{
  install: function (Vue, option) {
    Vue.prototype.$http = Axios
    // Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}
