// 包含了多个间接修改状态数据的异步的方法的对象
// 引入常量
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-type'
// 引入发送请求的方法
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqLogout,
  reqGoods,
  reqRatings,
  reqInfo
} from '../api'

export default {
  // 地址信息
  async getAddress({
    commit,
    state
  }) {
    const {
      longitude,
      latitude
    } = state
    const result = await reqAddress(longitude, latitude)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },
  // 食品分类信息
  async getCategorys({
    commit
  }) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },
  // 商家信息
  async getShops({
    commit,
    state
  }) {
    const {
      longitude,
      latitude
    } = state
    const result = await reqShops({
      latitude,
      longitude
    })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },






  // 退出登录
  async resetUser({
    commit
  }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER)
    }
  },






  // 点餐信息
  async getGoods({
    commit
  }) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {
        goods
      })
    }
  },
  // 评价信息
  async getRatings({
    commit
  }) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {
        ratings
      })
    }
  },
  // 商家信息
  async getInfo({
    commit
  }) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {
        info
      })
    }
  }
}