import service from '@/utils/request'

/**
 * 搜索所有博客
 */
export const searchBlog = ({ ...data }) => {
    return service.get('/search/blog', { ...data })
}

/**
 * 搜索个人博客列表
 */
export const searchPriBlog = ({ ...data }) => {
    return service.get('search/priblog', { ...data })
}