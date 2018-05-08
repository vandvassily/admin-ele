import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import Layout from '@/pages/layout'
import Page404 from '@/pages/404'
import Login from '@/pages/login'
import Signup from '@/pages/signup'
import PasswordReset from '@/pages/password-reset'
import jwt from 'jsonwebtoken'

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
    name: 'page404',
    meta: { title: '404', icon: 'icon404' }
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { title: 'login', icon: 'login' }
  },
  {
    path: '/signup',
    component: Signup,
    name: 'signup',
    meta: { title: 'signup', icon: 'login' }
  },
  {
    path: '/password_reset',
    component: PasswordReset,
    name: 'passwordReset',
    meta: { title: 'passwordReset', icon: 'login' }
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
    if (window.localStorage.token) {
      let decoded = jwt.decode(window.localStorage.token)
      if (decoded.exp > new Date().getTime()) {
        Message({
          showClose: true,
          message: '登录状态信息过期,请重新登录',
          type: 'error'
        })
      } else {
        next()
      }
    } else {
      Message({
        showClose: true,
        message: '请登录',
        type: 'error'
      })
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
