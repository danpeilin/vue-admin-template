import request from '@/utils/request'

export function uploading(data){
    return request({
        url: `/admin/commodity/uploading`,
        method:'post',
        data: data
    })
}

export function list(data){
    return request({
        url: `/admin/commodity/list`,
        method:'post',
        data: data
    })
}