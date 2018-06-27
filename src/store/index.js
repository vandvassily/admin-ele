import Vue from 'vue'
import Vuex from 'vuex'

import dialog from './modules/dialog'
import user from './modules/user'
import permission from './modules/permission'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dialog,
    user,
    permission
  },
  getters
})
