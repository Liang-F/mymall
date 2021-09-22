import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import FastClick from 'fastclick'
import toast from 'components/common/toast'
import VueLazyload from "vue-lazyload";


Vue.use(toast)
Vue.use(VueLazyload)

//解决移动端300ms延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
