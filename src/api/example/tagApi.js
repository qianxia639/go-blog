import service from '@/utils/request'

/**
 * 标签列表
 */
export const tagList = () => {
    return service({
        url: '/tag/list',
        method: 'get'
    })
}