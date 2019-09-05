// 引入常量
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from '../mutation-type'

// 引入发送请求的方法
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../../api'

const state = {
  // 经度
  longitude: "116.36867",
  // 纬度
  latitude: "40.10038",
  // 地址信息
  address: {},
  // 食品分类信息
  categorys: [],
  // 商家信息
  shops: [],
}
const mutations = {
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
}
const actions = {
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
}
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters
}