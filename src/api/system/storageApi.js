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
const remove = (key) => localStorage.removeItem(key)

export default {
    set,
    get,
    remove,
    USER_TOKEN,
    USER_INFO
}