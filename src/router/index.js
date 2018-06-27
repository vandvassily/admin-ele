import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import Layout from '@/pages/layout'
import Page404 from '@/pages/404'
import Login from '@/pages/login'
import Signup from '@/pages/signup'
import PasswordReset from '@/pages/password-reset'
import Form from '@/pages/form'
import { checkToken } from '@/utils/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

import store from '@/store'

Vue.use(Router)

export const constantRouters = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard'
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
  }
]

export const asyncRouters = [
  {
    path: '/dashboard',
    component: Layout,
    name: 'dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', requireLogin: true, roles: ['admin', 'developer', 'user'] }
  },
  {
    path: '/form',
    component: Form,
    name: 'form',
    meta: { title: 'form', icon: 'form', requireLogin: true, roles: ['admin', 'developer'] }
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
  NProgress.start()
  if (window.localStorage.token && checkToken()) { // 有token
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (store.getters.roles === '') {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.roles
          store.dispatch('GenerateRouters', roles).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        next()
      }
    }
    // NProgress.done()
  } else { // 没有token
    if (to.path === '/login' || to.path === '/signup') {
      next()
    } else {
      Message({
        showClose: true,
        message: '登录状态信息过期,请重新登录',
        type: 'error'
      })
      next({ path: '/login' }) // 否则全部重定向到登录页
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
