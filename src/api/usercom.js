import request from '@/utils/request'

export function getuserbypage(data) {
  return request({
    url: `/admin/user/getalluser`,
    method: 'post',
    data: data
  })
}

export function getuserbyid(id) {
  return request({
    url: `/admin/user/getuserbyid/${id}`,
    method: 'get',
  })
}

export function getrolebytoken(token) {
  return request({
    url: `/admin/user/getrolebytoken/${token}`,
    method: 'get',
  })
}

export function edituserinfo(data) {
  return request({
    url: `/admin/user/eidtuserinfo`,
    method: 'post',
    data
  })
}

export function deleteuser(id) {
  return request({
    url: `/admin/user/delete/${id}`,
    method: 'get'
  })
}

export function deleteall(ids) {
  return request({
    url: `/admin/user/delete/`,
    method: 'post',
    data: ids
  })
}

export function adduser(user) {
  return request({
    url: `/admin/user/adduser/`,
    method: 'post',
    data: user
  })
}
