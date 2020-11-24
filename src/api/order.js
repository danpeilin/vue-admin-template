import request from '@/utils/request'

export function orderList(data){
    return request({
        url:`/admin/order/orderList`,
        method: 'post',
        data: data
    })
}

export function deleteOrder(data){
    return request({
        url:`/admin/order/deleteOrder`,
        method: 'post',
        data: data
    })
}