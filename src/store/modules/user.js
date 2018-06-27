import { loginByUsername, getUserInfo, signupUser } from '@/api/login'
export default {
  state: {
    username: '',
    token: '',
    roles: ''
  },
  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const data = res
          commit('SET_TOKEN', data.token)
          commit('SET_ROLES', data.roles)
          commit('SET_USERNAME', data.username)
          window.localStorage.token = data.token
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    LoginByUsername ({ commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.username, userInfo.password).then(res => {
          const data = res
          commit('SET_TOKEN', data.token)
          window.localStorage.token = data.token
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SignUpUser ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        signupUser(userInfo.username, userInfo.password).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
