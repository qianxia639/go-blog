import service from '@/utils/request'

/**
 * 获取归档列表
 */
export const getArchiveList = () => {
    return service({
        url: '/archive/list',
        method: 'get'
    })
}