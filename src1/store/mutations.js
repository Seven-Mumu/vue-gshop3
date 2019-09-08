// 包含了多个直接修改状态数据的同步方法的对象
// 引入常量
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-type'

export default {
  // 获取地址信息
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },
  // 获取食品分类信息
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  // 获取商铺信息
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },



  // 用户信息
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  // 退出登录清空用户信息
  [RESET_USER](state) {
    state.user = {}
  },




  // 点餐信息
  [RECEIVE_GOODS](state, {
    goods
  }) {
    state.goods = goods
  },
  // 评价信息
  [RECEIVE_RATINGS](state, {
    ratings
  }) {
    state.ratings = ratings
  },
  // 商家信息
  [RECEIVE_INFO](state, {
    info
  }) {
    state.info = info
  }
}