// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由器,并注册
import router from './router'
// 引入store
import store from './store'
// 引入Header.vue组件,并注册成一个全局组件
import Header from './components/Header/Header.vue'
// 引入Star 组件,并注册成为一个全局组件
import Star from './components/Star/Star.vue'
// 引入validate.js文件
import './validate.js'
// 引入mock文件
import './mock/mock.server.js'
import {
  Button
} from 'mint-ui';
// 引入CartControl组件,并注册全局组件
import CartControl from './components/CartControl/CartControl.vue'
// 注册一个全局组件
Vue.component(Button.name, Button);
// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')