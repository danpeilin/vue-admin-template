import request from '@/utils/request'

export function getallcolor() {
  return request({
    url: '/admin/color/getallcolor',
    method: 'get'
  })
}

export function getcolorbyid(id) {
    return request({
      url: `/admin/color/getcolorbyid/${id}`,
      method: 'get'
    })
}

export function addcolor(data) {
    return request({
      url: `/admin/color/addsize`,
      method: 'post',
      data: data
    })
}

export function deletecolor(data) {
    return request({
      url: `/admin/color/deletesize`,
      method: 'post',
      data:data
    })
}

export function allcolors(currentPage, pageSize) {
  return request({
    url: `/admin/color/allcolors/${currentPage}/${pageSize}`,
    method: 'get'
  })
}

export function addcolors(name) {
  return request({
    url: `/admin/color/addcolors`,
    method: 'post',
    params: {name}
  })
}

export function deletecolors(id) {
  return request({
    url: `/admin/color/deletecolors/${id}`,
    method: 'get'
  })
}

export function updatecolors(id, name) {
  return request({
    url: `/admin/color/updatecolors`,
    method: 'post',
    params: {id, name}
  })
}
