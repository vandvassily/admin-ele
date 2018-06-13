import Vue from 'vue'
import Vuex from 'vuex'

import dialogStore from './modules/dialog'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dialog: dialogStore
  }
})
