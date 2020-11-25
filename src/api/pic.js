import request from '@/utils/request'

export function getallpicbyid(id) {
  return request({
    url: `/admin/pic/getallpicbyid/${id}`,
    method: 'get'
  })
}

export function deletepic(id) {
    return request({
      url: `/admin/pic/deletepic/${id}`,
      method: 'get'
    })
}

export function savepic(url, name, goodsid) {
    return request({
      url: `/admin/pic/savepic`,
      method: 'post',
      params: {url, name, goodsid}
    })
}

