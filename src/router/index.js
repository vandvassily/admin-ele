import Vue from 'vue'
import Router from 'vue-router'
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
    meta: { title: 'dashboard', icon: 'dashboard' }
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

export default new Router({
  routes: constantRouters,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
