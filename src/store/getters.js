const getters = {
  roles: state => state.user.roles,
  token: state => state.user.token,
  username: state => state.user.username,
  addRouters: state => state.permission.addRouters,
  routes: state => state.permission.routers
}

export default getters
