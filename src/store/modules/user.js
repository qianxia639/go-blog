import storageApi from "@/api/system/storageApi";

const userModule = {
    namespaced: true,
    state: {
        token: storageApi.get(storageApi.TOKEN),
        userInfo: JSON.parse(storageApi.get(storageApi.INFO))
    },
    mutations: {
        SET_TOKEN(state,token) {
            // 更新本地缓存
            storageApi.set(storageApi.TOKEN,token)
            // 更新state
            state.token = token
        },
        SET_USERINFO(state,userInfo) {
            // 更新本地缓存
            storageApi.set(storageApi.INFO,JSON.stringify(userInfo))
            // 更新state
            state.userInfo = userInfo
        }
    }
}

export default {
    userModule
}