import Vue from 'vue'
import messageComponent from '@/components/Message.vue'


const messageConstructor = Vue.extend(messageComponent)
let instances = []
let seed = 1
function messageFun(obj) {
    let { message, type, duration } = obj
    const messageDom = new messageConstructor({
        el: document.createElement('div'),
        data() {
            return {
                message: message,
                type: type,
            }
        },
    })
    let id = 'my_message_' + seed++
    let styleTop = 20
    document.body.appendChild(messageDom.$el)
    messageDom.id = id
    instances.forEach(item => {
        styleTop += item.$el.offsetHeight + 16
    })
    messageDom.styleTop = styleTop
    messageDom.messageShow()
    instances.push(messageDom)
    // 过了 duration 时间后隐藏
    duration = duration ? duration : 3000
    setTimeout(() => {
        let len = instances.length
        messageDom.messageHide()
        let removedHeight = messageDom.$el.offsetHeight
        let index = instances.findIndex(e => e.id === messageDom.id)
        if (len > 1) {
            for (let i = index; i < len; i++) {
                let dom = instances[i].$el
                dom.style['top'] =
                    parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
            }
        }
        instances.splice(index, 1)
    }, duration)
}



function message() {
    window.$message = Vue.prototype.$message = messageFun
}
export default message
