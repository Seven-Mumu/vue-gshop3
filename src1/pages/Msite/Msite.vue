<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name||'正在定位中...'">
      <span class="header_search"
            slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_title">
        <span class="header_title_text ellipsis"></span>
      </span>
      <span class="header_login"
            slot="right">
        <span class="header_login_text">{{user._id?(user.name?(user.name):(user.phone?user.phone:'登录|注册')):('登录|注册')}}</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               v-for="(categorys,index) in categoryArr2"
               :key="index">
            <a href="javascript:"
               class="link_to_food"
               v-for="(category,index) in categorys"
               :key="index">
              <div class="food_container">
                <img :src="`https://fuss10.elemecdn.com`+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopLists />
  </section>
</template>
<script>
// 引入chunk -- 转换二维数组
import chunk from 'lodash/chunk'
// 引入vuex
import { mapState } from 'vuex'
// 引入商家列表信息组件
import ShopLists from '../../components/ShopLists/ShopLists'
// 引入swiper和其css样式 --- 轮播图
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
  components: {
    ShopLists
  },
  computed: {
    ...mapState({
      address: state => state.msite.address,
      categorys: state => state.msite.categorys,
      user: state => state.user.user
    }),
    // ...mapState(['address', 'categorys', 'user']),
    // 将请求回来的食品分类数据转换成二维数组 --- 原因：一共16个数据，两页轮播图，每页8个。需要先遍历大数组出两个div，在遍历小数组出a标签
    /* categoryArr () {
      // 定义一个大的数组，和一个小的数组，组成二维数组
      let bigArr = []
      let smallArr = []
      // 取出请求回来的数据的数组
      const { categorys } = this
      // 遍历请求回来的数据的数组
      categorys.forEach(category => {
        // 当小数组里面没有数据的时候，把小数组放入大数组中，成为大数组中的第一个数据
        if (smallArr.length === 0) {
          bigArr.push(smallArr)
        }
        // 将遍历出来的每一个食品分类信息添加到小数组中
        smallArr.push(category)
        // 当小数组中的数据为8个的时候，清空现有的数组（相当于又重新创建了一个新的空的小数组）
        if (smallArr.length === 8) {
          smallArr = []
        }
      })
      // 最后返回制作好的大的二维数组
      return bigArr
    } */
    categoryArr2 () {
      return chunk(this.categorys, 8)
    }
  },
  async mounted () {
    // 发送ajax请求获取食品分类信息
    await this.$store.dispatch('getCategorys')
    // 由于请求食品分类是异步请求数据，有很大可能数据还没有请求回来，就已经new swiper了，这样的话轮播图效果就会不显示分页。
    // 所以可以调用vm实例上的方法 ----> $nextTick（callback），此方法将回调延迟到下次dom更新循环之后执行。也就是界面更新后执行回调函数，可以等请求有了结果再执行swiper代码
    this.$nextTick(() => {
      // 创建swiper对象 ---> 必须在列表数据显示之后创建
      new Swiper('.swiper-container', {
        // 无限轮播
        loop: true,
        // 分页器
        pagination: {
          el: '.swiper-pagination'
        }
      })
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.msite // 首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
</style>
 