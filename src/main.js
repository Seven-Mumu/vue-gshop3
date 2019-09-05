import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 退出登录按钮
import {
  Button
} from 'mint-ui';

Vue.component(Button.name, Button);

// 引入头部的公共组件
import Header from './components/Header/Header'
// 引入公共组件star
import Star from './components/Star/Star'
// 引入vuex
import store from './store'
// 引入vee-validate
import './validate'
// 引入mock文件
import './mock/mock.server'
// 声明使用公共组件
Vue.component('Header', Header)
Vue.component('Star', Star)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')