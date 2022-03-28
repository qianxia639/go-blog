import service from '@/utils/request'

/**
 * 分类排序列表
 */
export const listOrder = () => {
    return service({
        url: '/type/listOrder',
        method: 'get'
    })
}

/**
 * 分类列表
 */
export const typeList = () => {
    return service({
        url: '/type/list',
        method: 'get'
    })
}

// export const typePageList = ({...data}) => {
//     return service({
//         url: '/type/page',
//         method: 'get',
//         data: {...data}
//     })
// }

/**
 * 分类博客分页
 */
export const typePageList = ({...data}) => {
    return service.get('/type/page',{...data})
}