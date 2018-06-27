import jwt from 'jsonwebtoken'

export function checkToken () {
  let decoded = jwt.decode(window.localStorage.token)
  return decoded.exp > Math.round(new Date().getTime() / 1000)
}

export function hasPermission (roles, permissionRoles) {
  if (roles === 'admin') return true
  if (!permissionRoles) return true
  return permissionRoles.indexOf(roles) >= 0
}
