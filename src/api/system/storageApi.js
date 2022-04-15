// 本地缓存服务

const TOKEN = "token"
const INFO = "info"

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
    TOKEN,
    INFO
}