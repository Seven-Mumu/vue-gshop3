<template>
  <div>
    <router-view></router-view>
    <FooterGuide />
  </div>
</template>
<script>
import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
  components: {
    FooterGuide
  },
  mounted() {
    // 发送请求获取地址信息
    this.$store.dispatch('getAddress')
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped></style>
