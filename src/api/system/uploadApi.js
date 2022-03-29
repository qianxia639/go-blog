import service from '@/utils/request'

/**
 * markdown文件上传
 */
export const uploadFile = (params) => {
    return service({
        url: '/upload/mdFile',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}