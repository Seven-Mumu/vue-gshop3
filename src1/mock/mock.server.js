// 引入mock
import Mock from 'mockjs'
// 引入自定义的数据文件
import data from './data'

// 食品数据
Mock.mock('/goods', {
  code: 0,
  data: data.goods
})
// 评价数据
Mock.mock('/ratings', {
  code: 0,
  data: data.ratings
})
// 商家信息数据
Mock.mock('/info', {
  code: 0,
  data: data.info
})