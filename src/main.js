import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入头部的公共组件
import Header from './components/Header/Header'
Vue.component('Header', Header)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
