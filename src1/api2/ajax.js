// 发送ajax请求的函数模块
/* 
1.处理post请求体参数，转换为urlencoded格式（默认是json格式）
2.让成功的结果不是response，而是response.data
3.统一处理错误请求
*/
import axios from 'axios'
import qs from 'qs'


// 请求拦截器
axios.interceptors.request.use(config => {
  if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
    config.data = qs.stringify(config.data)
  }

  return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  alert('请求异常', error.message)
  // 中断promise链
  return new Promise(() => {})
})

export default axios