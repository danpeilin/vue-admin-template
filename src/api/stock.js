import request from '@/utils/request'

export function getallstock(currentPage, pageSize) {
  return request({
    url: `/stock/getallstock/${currentPage}/${pageSize}`,
    method: 'get'
  })
}

export function updatekucun(stockid, stocknum) {
    return request({
      url: `/stock/updatekucun/${stockid}/${stocknum}`,
      method: 'get'
    })
  }
  