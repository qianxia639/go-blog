import axios from 'axios';
import storageApi from '@/api/system/storageApi';

const service = axios.create({
    baseURL: 'http://localhost:6754',
    timeout: 5 * 1000,
})

service.interceptors.request.use((config) => {
    // Object.assign(config.headers, { 'X-Token': `Bearer ${storageApi.get(storageApi.USER_TOKEN)}` })

    config.headers = {
        'X-Token': storageApi.get(storageApi.USER_TOKEN),
        ...config.headers
    }

    return config;
}, (error) => {
    return Promise.reject(error);
})

service.interceptors.response.use((resp) => {
    if (resp.data.code === 401) {
        this.$router.replace({ name: "Login" });
    }
    return resp
},(error) => {
    return Promise.reject(error)
})

export default service;