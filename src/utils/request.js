import axios from 'axios';
import storageApi from '@/api/system/storageApi';

const service = axios.create({
    baseURL: 'http://localhost:6754',
    timeout: 5 * 1000,
})

// 请求拦截器
service.interceptors.request.use((config) => {
    // Object.assign(config.headers, { 'X-Token': `Bearer ${storageApi.get(storageApi.TOKEN)}` })

    config.headers = {
        'X-Token': storageApi.get(storageApi.TOKEN),
        ...config.headers
    }

    return config;
}, (error) => {
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use((resp) => {
    return resp
}, (error) => {

    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = "请求出错"
                break;
            case 401:
                this.$message({message: "登录失败，请重新登录", type: 'error'})
                setTimeout(() => {
                    window.location.reload()
                },1000)
                break;
            case 403:
                err.message = "权限不足"
                break;
            case 404:
                err.message = "404 Not Found"
                break;
            case 500:
                err.message = "服务器连接失败"
                break;
        }
    }

    return Promise.reject(error)
})

export default service;