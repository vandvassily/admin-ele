// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Axios from './axios'
import store from './store'

import 'normalize.css/normalize.css' // 引入normalize.css初始化浏览器css

import ElementUI from 'element-ui'// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'

// Vue.use(Axios)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
