import request from '@/utils/request'

export function count(){
    return request({
        url: `/admin/dashboard/count`,
        method: 'get'
    })
}