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

// 4.发送短信验证码
export const reqSendCode = (phone) => ajax({
  method: 'GET',
  url: BASE + '/sendcode',
  params: phone
})

// 5.用户名密码登录
export const reqPwdLogin = ({
  name,
  pwd,
  captcha
}) => ajax({
  method: 'POST',
  url: BASE + '/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})

// 6.手机号验证码登录
// export const reqSmsLogin = (phone, code) => ajax({
//   method: 'POST',
//   url: BASE + '/login_sms',
//   data: {
//     phone,
//     code
//   }
// })

export const reqSmsLogin = (phone, code) => ajax.post(BASE + '/login_sms', {
  phone,
  code
})

// 7.自动登录
export const reqAutoLogin = () => ajax({
  method: 'GET',
  url: BASE + '/userinfo'
})

// 8.用户登出
export const reqLogout = () => ajax({
  method: 'GET',
  url: BASE + '/logout'
})