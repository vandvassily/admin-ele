import request from '@/axios'

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: 'api/login',
    method: 'post',
    data
  })
}

export function getUserInfo () {
  return request({
    url: 'api/user/info',
    method: 'post'
  })
}

export function signupUser (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: 'api/register',
    method: 'post',
    data
  })
}
