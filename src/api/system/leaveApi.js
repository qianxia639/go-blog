import service from '@/utils/request'

export const list = () => {
    return service({
        url: '/leave/all',
        method: 'get'
    })
}

export const save = (data) => {
    return service({
        url: '/leave/insert',
        method: 'post',
        data
    })
}

export const remove = (id) => {
    return service({
        url: `/leave/delete?id=${id}`,
        method: 'delete'
    })
}