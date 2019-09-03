// 包含多个接口请求函数的模块
import ajax from './ajax'

const BASE = '/api'

// 1、根据经纬度获取位置详情   longitude--->经度   latitude--->纬度
export const reqAddress = (latitude, longitude) => ajax({
  method: 'GET',
  url: BASE + `/position/${latitude},${longitude}`
})
// export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`)

// 2、获取食品分类列表
export const reqCategorys = () => ajax({
  method: 'GET',
  url: BASE + `/index_category`
})

// 3、根据经纬度获取商铺列表
export const reqShops = ({
  latitude,
  longitude
}) => ajax({
  method: 'GET',
  url: BASE + `/shops`,
  params: {
    latitude,
    longitude
  }
})