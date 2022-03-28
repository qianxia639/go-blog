import service from '@/utils/request'

/**
 * 用户注册
 */
export const register = ({ ...data }) => {
    return service({
        url: '/user/register',
        method: 'post',
        data
    })
}

/**
 * 登录
 */
export const login = ({ ...data }) => {
    return service({
        url: '/user/login',
        method: 'post',
        data
    })
}

/**
 * 用户信息
 */
export const info = () => {
    return service({
        url: '/user/info',
        method: 'get'
    })
}

/**
 * 修改用户名
 */
export const updateUsername = ({ ...data }) => {
    return service({
        url: '/user/updateName',
        method: 'put',
        data
    })
}