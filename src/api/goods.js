import request from '@/utils/request'

export function getallcate() {
  return request({
    url: '/admin/category/getallcate',
    method: 'get'
  })
}

export function addgoods(data) {
    return request({
      url: '/admin/goods/addgoods',
      method: 'post',
      data: data
    })
}

export function getallgoods(data) {
    return request({
      url: '/admin/goods/getallgoods',
      method: 'post',
      data: data
    })
}

export function getgoodsbyid(id) {
  return request({
    url: `/admin/goods/getgoodsbyid/${id}`,
    method: 'get'
  })
}

export function updateGoods(data) {
  return request({
    url: `/admin/goods/updateGoods`,
    method: 'post',
    data: data
  })
}

export function deletegoods(id) {
  return request({
    url: `/admin/goods/deletegoods/${id}`,
    method: 'get'
  })
}

export function deleteallgoods(ids) {
  return request({
    url: `/admin/goods/deleteallgoods/`,
    method: 'post',
    data: ids
  })
}