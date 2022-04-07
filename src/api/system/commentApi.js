import service from '@/utils/request'

export const save = ({...data}) => {
    return service({
        url: '/comment/save',
        method: 'post',
        data
    })
}