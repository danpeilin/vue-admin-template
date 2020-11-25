import request from '@/utils/request'

export function getallsize() {
  return request({
    url: '/admin/size/getallsize',
    method: 'get'
  })
}

export function getsizebyid(id) {
    return request({
      url: `/admin/size/getsizeById/${id}`,
      method: 'get'
    })
}

export function addsize(data) {
    return request({
      url: `/admin/size/addsize`,
      method: 'post',
      data: data
    })
}

export function deletesize(data) {
    return request({
      url: `/admin/size/deletesize`,
      method: 'post',
      data:data
    })
}

export function allsize(currentPage, pageSize) {
  return request({
    url: `/admin/size/allsize/${currentPage}/${pageSize}`,
    method: 'get'
  })
}

export function addsizes(name) {
  return request({
    url: `/admin/size/addsizes`,
    method: 'post',
    params: {name}
  })
}

export function deletesizes(id) {
  return request({
    url: `/admin/size/deletesizes/${id}`,
    method: 'get'
  })
}

export function updatesizes(id, name) {
  return request({
    url: `/admin/size/updatesizes`,
    method: 'post',
    params: {id, name}
  })
}


