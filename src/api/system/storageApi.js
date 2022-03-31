// 本地缓存服务

const USER_TOKEN = "user_token"
const USER_INFO = "user_info"

// 存储
const set = (key, data) => {
    localStorage.setItem(key, data)
}

// 获取
const get = (key) => localStorage.getItem(key)

// 删除
const clear = () => {
    localStorage.removeItem(USER_TOKEN)
    localStorage.removeItem(USER_INFO)
}

export default {
    set,
    get,
    clear,
    USER_TOKEN,
    USER_INFO
}