<template>
  <div>
    <router-view></router-view>
    <FooterGuide />
  </div>
</template>
<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
// import { reqAddress,reqCategorys } from './api'
export default {
  components: {
    FooterGuide
  },
  // async mounted () {
  //   const result = await reqAddress(40.10038, 116.36867)
  //   const result1 =await reqCategorys()
  //   console.log(result);
  //   console.log(result1);
  // },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped></style>
 