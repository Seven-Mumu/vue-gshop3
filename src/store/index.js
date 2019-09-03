// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入对应的配置对象
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 注册声明使用
Vue.use(Vuex)



// 暴露store
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})