// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入对应的配置对象的模块
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'

// 注册声明使用
Vue.use(Vuex)



// 暴露store
export default new Vuex.Store({
  modules: {
    msite,
    shop,
    user
  }
})