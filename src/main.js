import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
// scss style
import '@/assets/scss/custom.scss'
import message from '@/assets/js/message'

// app.js
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


// highlight
import Highlight from 'vue-markdown-highlight'
import "highlight.js/styles/atom-one-dark.css";
import showdown from 'showdown'
import 'animate.css';

Vue.config.productionTip = false
// 配置showdown，md转html需要的
Vue.prototype.converter = new showdown.Converter()

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(Highlight)
Vue.use(message)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
