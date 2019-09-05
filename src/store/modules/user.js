// 引入常量
import {
  RESET_USER,
  RECEIVE_USER
} from '../mutation-type'
// 引入发送请求的方法
import {
  reqLogout
} from '../../api'

const state = {
  // 保存登录的用户信息
  user: {},
}
const mutations = {
  // 用户信息
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  // 退出登录清空用户信息
  [RESET_USER](state) {
    state.user = {}
  },
}
const actions = {
  // 退出登录
  async resetUser({
    commit
  }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER)
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}