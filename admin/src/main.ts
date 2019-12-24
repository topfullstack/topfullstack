import Vue from 'vue'
import axios from 'axios'


import App from './App.vue'
import './plugins/element'
import './plugins/avue'

import router from './router'

// import EleForm from 'vue-ele-form'
// // 注册 vue-ele-form
// Vue.use(EleForm)

Vue.config.productionTip = false

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
Vue.prototype.$httpajax = http
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
