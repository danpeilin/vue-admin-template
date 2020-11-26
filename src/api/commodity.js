import request from '@/utils/request'
import { data } from 'autoprefixer'

export function uploading(data){
    return request({
        url: `/admin/commodity/uploading`,
        method:'post',
        data: data
    })
}

export function list(currentPage,pagesize){
    return request({
        url: `/admin/commodity/list/${currentPage}/${pagesize}`,
        method:'get'
    })
}
export function deleteRow(row){
    return request({
        url: `/admin/commodity/deleteRow/${row}`,
        method:'get'
    })
}

export function updateRow(data){
    return request({
        url: `/admin/commodity/updateRow`,
        method:'post',
        data: data
    })
}
