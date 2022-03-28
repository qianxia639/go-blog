import service from '@/utils/request'

/**
 * markdown文件上传
 */
export const mdFile = ( {...data}) => {
    return service({
        url: '/upload/mdFile',
        method: 'post',
        data: {...data},
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}