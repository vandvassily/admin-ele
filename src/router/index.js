import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import Layout from '@/pages/layout'
import Page404 from '@/pages/404'
import Login from '@/pages/login/index.vue'

Vue.use(Router)

const constantRouters = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard'
  },
  {
    path: '/dashboard',
    component: Layout,
    name: 'dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', requireLogin: true }
  },
  {
    path: '/404',
    component: Page404,
    name: '404',
    meta: { title: '404', icon: 'icon404' }
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { title: 'login', icon: 'login' }
  },
  {
    path: '*',
    redirect: '404'
  }
]

const router = new Router({
  routes: constantRouters,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
  // 判断是否需要登录权限
    Message({
      showClose: true,
      message: '登录状态信息过期,请重新登录',
      type: 'error'
    })
    next()
    // if (window.localStorage.getItem('loginUserBaseInfo')) {
    // // 判断是否登录
    //   let lifeTime =
    //   JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime *
    //   1000
    //   let nowTime = (new Date()).getTime() // 当前时间的时间戳
    //   if (nowTime < lifeTime) {
    //     next()
    //   } else {
    //     Message({
    //       showClose: true,
    //       message: '登录状态信息过期,请重新登录',
    //       type: 'error'
    //     })
    //     alert('haha')
    //     next({
    //       path: '/login'
    //     })
    //   }
    // } else {
    //   // 没登录则跳转到登录界面
    //   next({
    //     path: '/login'
    //   })
    // }
  } else {
    next()
  }
})

export default router
