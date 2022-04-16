import storageApi from "@/api/system/storageApi";
import global from '@/global/index'

const userModule = {
    // namespaced: true,
    state: {
        token: storageApi.get(storageApi.TOKEN),
        userInfo: global.userInfo
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
            this.global.userInfo = JSON.stringify(userInfo)
            // 更新state
            state.userInfo = userInfo
        }
    }
}

export default {
    userModule
}