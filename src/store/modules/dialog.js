export default {
  state: {
    show: false
  },
  mutations: {
    switchDialog (state) {
      state.show = !state.show
    }
  },
  actions: {
    switchDialog (context) {
      context.commit('switchDialog')
    }
  }
}
