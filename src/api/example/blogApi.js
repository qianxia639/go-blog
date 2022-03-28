import service from '@/utils/request'

/**
 * 博客发布
 */
export const saveBlog = ({ ...data }) => {
    return service({
        url: '/blog/save',
        method: 'post',
        data
    })
}

/**
 * 个人博客列表展示
 */
export const blogList = ({ ...data }) => {
    return service.get('blog/list', { ...data })
}

/**
 * 博客展示及分页
 */
export const pageList = ({ ...data }) => {
    return service.get('blog/pageList', { ...data })
}

/**
 * 删除博客
 */
export const remove = ({ id }) => {
    return service({
        url: `/blog/${id}`,
        method: 'delete'
    })
}

/**
 * 最新推荐
 */
export const latestList = () => {
    return service({
        url: '/blog/latestList',
        method: 'get'
    })
}

/**
 * 获取博客信息
 */
export const getBlog = ({ id }) => {
    return service({
        url: `/blog/${id}`,
        method: 'get'
    })
}

/**
 * 获取要编辑的博客信息
 */
export const getUpdateBlog = ({ id }) => {
    return service({
        url: `/blog/update/${id}`,
        method: 'get'
    })
}

/**
 * 编辑博客
 */
export const update = ({ ...data }) => {
    return service({
        url: '/blog/update',
        method: 'put',
        data
    })
}