import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/adminlogin',
    method: 'post',
    params: {username, password}
  })
}

export function getInfo(token) {
  return request({
    url: `/adminuserinfo/${token}`,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/adminlogout',
    method: 'post'
  })
}
