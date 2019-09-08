<template>
  <div>
    <router-view></router-view>
    <FooterGuide />
  </div>
</template>
<script>
import FooterGuide from "./components/FooterGuide/FooterGuide"
import { reqAutoLogin } from "./api"
import { RECEIVE_USER } from "./store/mutation-type"

export default {
  components: {
    FooterGuide
  },
  async mounted () {
    // 发送请求获取地址信息
    this.$store.dispatch("getAddress")
    // 调用自动登录的接口
    const result = await reqAutoLogin()
    if (result.code === 0) {
      // 更新vuex中的user
      const user = result.data;
      this.$store.commit(RECEIVE_USER, user);
    }

    // // 测试mock
    // const result4 = await reqGoods()
    // console.log(result4);
    // const result5 = await reqRatings()
    // console.log(result5);
    // const result6 = await reqInfo()
    // console.log(result6)
    this.$store.dispatch('getGoods')
    this.$store.dispatch('getRatings')
    this.$store.dispatch('getInfo')
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped></style>
